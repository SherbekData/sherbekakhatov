import { NextResponse } from 'next/server';

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  fullName: string;
  phone: string;
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json();

    // Validate required fields
    if (!data.checkIn || !data.checkOut || !data.guests || !data.roomType || !data.fullName || !data.phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return NextResponse.json(
        { error: 'Booking service temporarily unavailable' },
        { status: 500 }
      );
    }

    // Format the message for Telegram
    const message = `
🏨 *Hotel: Miraki Gardens*
━━━━━━━━━━━━━━━━━━
📋 *New Booking Request*
━━━━━━━━━━━━━━━━━━

👤 *Guest:* ${escapeMarkdown(data.fullName)}
📱 *Phone:* ${escapeMarkdown(data.phone)}

📅 *Check-in:* ${escapeMarkdown(data.checkIn)}
📅 *Check-out:* ${escapeMarkdown(data.checkOut)}
👥 *Guests:* ${data.guests}
🛏️ *Room Type:* ${escapeMarkdown(data.roomType)}

━━━━━━━━━━━━━━━━━━
🕐 *Submitted:* ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Tashkent' })}
    `.trim();

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to process booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Escape special Markdown characters
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}
