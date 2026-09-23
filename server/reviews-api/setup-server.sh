#!/usr/bin/env bash
set -euo pipefail

APP_DIR=/opt/miraki-reviews
DEPLOY_DIR=/tmp/miraki-reviews-deploy
SERVICE_USER=miraki-reviews
DB_USER=miraki_reviews
DB_NAME=miraki_reviews
ADMIN_EMAIL=admin@miraki-garden.uz

id "$SERVICE_USER" >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$SERVICE_USER"
install -d -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0750 "$APP_DIR"
install -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0640 "$DEPLOY_DIR/index.js" "$APP_DIR/index.js"
install -o "$SERVICE_USER" -g "$SERVICE_USER" -m 0640 "$DEPLOY_DIR/package.json" "$APP_DIR/package.json"

cd "$APP_DIR"
npm install --omit=dev --no-audit --no-fund

DB_PASSWORD="$(openssl rand -hex 24)"
JWT_SECRET="$(openssl rand -hex 48)"
ADMIN_PASSWORD="$(openssl rand -base64 18 | tr -dc 'A-Za-z0-9' | head -c 20)"
ADMIN_PASSWORD_HASH="$(ADMIN_PASSWORD="$ADMIN_PASSWORD" node -e "import('bcryptjs').then(({default:b})=>process.stdout.write(b.hashSync(process.env.ADMIN_PASSWORD,12)))")"

if sudo -u postgres psql -Atc "select 1 from pg_roles where rolname='$DB_USER'" | grep -q 1; then
  sudo -u postgres psql -c "alter role $DB_USER with password '$DB_PASSWORD'"
else
  sudo -u postgres psql -c "create role $DB_USER login password '$DB_PASSWORD'"
fi
if ! sudo -u postgres psql -Atc "select 1 from pg_database where datname='$DB_NAME'" | grep -q 1; then
  sudo -u postgres createdb -O "$DB_USER" "$DB_NAME"
fi
PGPASSWORD="$DB_PASSWORD" psql -h 127.0.0.1 -U "$DB_USER" -d "$DB_NAME" -f "$DEPLOY_DIR/schema.sql"

umask 077
cat > /etc/miraki-reviews.env <<EOF
PORT=3200
DATABASE_URL=postgresql://$DB_USER:$DB_PASSWORD@127.0.0.1:5432/$DB_NAME
JWT_SECRET=$JWT_SECRET
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD_HASH=$ADMIN_PASSWORD_HASH
EOF
cat > /root/miraki-reviews-credentials.txt <<EOF
Admin URL: https://miraki-garden.uz/admin/reviews
Email: $ADMIN_EMAIL
Temporary password: $ADMIN_PASSWORD
EOF

install -m 0644 "$DEPLOY_DIR/miraki-reviews.service" /etc/systemd/system/miraki-reviews.service
install -m 0644 "$DEPLOY_DIR/nginx.conf" /etc/nginx/sites-available/miraki-reviews
ln -sfn /etc/nginx/sites-available/miraki-reviews /etc/nginx/sites-enabled/miraki-reviews
nginx -t
systemctl daemon-reload
systemctl enable --now miraki-reviews
systemctl reload nginx
certbot --nginx -d reviews.miraki-garden.uz --non-interactive --agree-tos --register-unsafely-without-email --redirect
systemctl is-active miraki-reviews nginx postgresql
curl --fail --silent http://127.0.0.1:3200/health

