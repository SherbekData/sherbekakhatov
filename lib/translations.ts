export type Language = 'en' | 'ru' | 'uz';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      rooms: 'Rooms',
      restaurant: 'Restaurant',
      garden: 'Garden Experience',
      gallery: 'Gallery',
      booking: 'Booking',
      contact: 'Contact',
      bookNow: 'Book Now',
    },
    // Hero
    hero: {
      title: 'Miraki Garden',
      subtitle: 'Luxury Mountain Garden Retreat in Shahrisabz',
      description: 'Discover an exclusive sanctuary atop the mountains, where 500 hectares of pristine gardens, vineyards, and lavender fields meet refined hospitality and fresh mountain air.',
      explore: 'Explore the Resort',
      scroll: 'Scroll to discover',
    },
    // About
    about: {
      subtitle: 'Our Story',
      title: 'A Sanctuary Above the Clouds',
      description: 'Perched atop the majestic mountains of Shahrisabz, Miraki Garden is more than a resort—it is a philosophy of living in harmony with nature. Our 500-hectare estate encompasses lush vineyards, fragrant orchards, and endless lavender fields, creating an atmosphere of unparalleled tranquility.',
      features: {
        mountain: {
          title: 'Mountain Summit',
          description: 'Located on the peak, offering panoramic views and pristine fresh air',
        },
        garden: {
          title: 'Garden Paradise',
          description: '500 hectares of vineyards, orchards, and lavender fields',
        },
        accommodation: {
          title: 'Unique Accommodations',
          description: 'Underground bunkers and above-ground luxury suites',
        },
        dining: {
          title: 'Fine Dining',
          description: '120-seat restaurant with mountain views and garden-fresh cuisine',
        },
      },
    },
    // Rooms
    rooms: {
      subtitle: 'Accommodations',
      title: 'Luxury Retreats',
      description: 'Each room is a sanctuary designed to immerse you in nature while providing world-class comfort and elegance.',
      bookRoom: 'Book This Room',
      perNight: 'per night',
      types: {
        standard: {
          name: 'Standard Room',
          description: 'Elegant comfort with garden views and premium amenities for a serene mountain escape.',
        },
        suite: {
          name: 'Suite',
          description: 'Spacious luxury with private terrace overlooking the vineyards and lavender fields.',
        },
        president: {
          name: 'President Suite',
          description: 'Unique underground retreat offering complete privacy and natural temperature control.',
        },
      },
      amenities: {
        wifi: 'Free WiFi',
        ac: 'Climate Control',
        view: 'Mountain View',
        minibar: 'Mini Bar',
        terrace: 'Private Terrace',
        underground: 'Underground',
      },
    },
    // Restaurant
    restaurant: {
      subtitle: 'Culinary Excellence',
      title: 'Garden-to-Table Dining',
      description: 'Our 120-seat restaurant celebrates the bounty of our gardens with refined cuisine that honors local traditions while embracing contemporary artistry.',
      features: {
        views: 'Panoramic Mountain Views',
        fresh: 'Garden-Fresh Ingredients',
        wine: 'Estate Vineyard Wines',
        atmosphere: 'Refined Atmosphere',
      },
      cta: 'Reserve a Table',
    },
    // Garden Experience
    garden: {
      subtitle: 'Nature Immersion',
      title: 'The Garden Experience',
      description: 'Wander through 500 hectares of natural beauty, where every path leads to a new discovery.',
      experiences: {
        vineyard: {
          title: 'Vineyard Walks',
          description: 'Stroll through our estate vineyards and taste wines crafted from our own grapes.',
        },
        orchard: {
          title: 'Orchard Harvest',
          description: 'Pick seasonal fruits from our abundant orchards and taste nature at its purest.',
        },
        lavender: {
          title: 'Lavender Fields',
          description: 'Feel the calm and fragrant atmosphere of lavender fields.',
        },
        nature: {
          title: 'Mountain Trails',
          description: 'Explore scenic paths with breathtaking views of the surrounding peaks.',
        },
      },
    },
    // Amenities
    amenities: {
      subtitle: 'Resort Features',
      title: 'Elevated Experiences',
      items: {
        air: {
          title: 'Fresh Mountain Air',
          description: 'Enjoy the clean mountain air.',
        },
        walks: {
          title: 'Relax in Nature',
          description: 'Enjoy your time among gardens and vineyards.',
        },
        relaxation: {
          title: 'Garden Relaxation',
          description: 'Experience the serenity of nature.',
        },
        lavender: {
          title: 'Lavender Wellness',
          description: 'Experience calming aromatherapy surrounded by lavender fields.',
        },
        dining: {
          title: 'Fine Dining',
          description: 'Savor exquisite cuisine crafted from our garden-fresh ingredients.',
        },
        privacy: {
          title: 'Ultimate Privacy',
          description: 'Exclusive rooms designed for peace and relaxation.',
        },
        photo: {
          title: 'Photo-Perfect',
          description: 'Capture memories in our stunning natural landscapes.',
        },
        quiet: {
          title: 'Quiet Luxury',
          description: 'Experience refined hospitality in serene surroundings.',
        },
      },
    },
    // Gallery
    gallery: {
      subtitle: 'Visual Journey',
      title: 'Moments at Miraki',
      categories: {
        all: 'All',
        exterior: 'Exterior',
        rooms: 'Rooms',
        restaurant: 'Restaurant',
        vineyard: 'Vineyard',
        orchard: 'Orchard',
        lavender: 'Lavender',
        views: 'Mountain Views',
      },
    },
    // Testimonials
    testimonials: {
      subtitle: 'Guest Experiences',
      title: 'Guest Reviews',
    },
    // Booking
    booking: {
      subtitle: 'Book your room now',
      title: 'Book Your Stay',
      description: 'Begin your journey to tranquility. Complete the form below and our concierge will confirm your reservation.',
      form: {
        checkIn: 'Check-in Date',
        checkOut: 'Check-out Date',
        guests: 'Number of Guests',
        roomType: 'Room Type',
        selectRoom: 'Select a room',
        fullName: 'Full Name',
        phone: 'Phone Number',
        submit: 'Request Booking',
        submitting: 'Submitting...',
        success: 'Thank you! Your booking request has been received. We will contact you shortly.',
        error: 'Something went wrong. Please try again.',
        required: 'This field is required',
      },
    },
    // Contact
    contact: {
      subtitle: 'Get in Touch',
      title: 'Contact Us',
      address: 'Uloch MFY, Shahrisabz District, Uzbekistan',
      phone: '+998 87 337 88 88',
      email: 'info@mirakigarden.com',
      cta: 'Send Message',
    },
    // Footer
    footer: {
      tagline: 'Luxury Mountain Garden Retreat',
      copyright: 'All rights reserved.',
      links: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
    },
  },
  ru: {
    // Navigation
    nav: {
      home: 'Главная',
      rooms: 'Номера',
      restaurant: 'Ресторан',
      garden: 'Сад',
      gallery: 'Галерея',
      booking: 'Бронирование',
      contact: 'Контакты',
      bookNow: 'Забронировать',
    },
    // Hero
    hero: {
      title: 'Miraki Garden',
      subtitle: 'Роскошный горный курорт в Шахрисабзе',
      description: 'Откройте для себя эксклюзивное убежище на вершине гор, где 500 гектаров первозданных садов, виноградников и лавандовых полей встречаются с изысканным гостеприимством и свежим горным воздухом.',
      explore: 'Исследовать курорт',
      scroll: 'Листайте вниз',
    },
    // About
    about: {
      subtitle: 'Наша история',
      title: 'Убежище над облаками',
      description: 'Расположенный на вершине величественных гор Шахрисабза, Miraki Garden — это больше, чем курорт, это философия жизни в гармонии с природой. Наше поместье площадью 500 гектаров включает пышные виноградники, ароматные сады и бескрайние лавандовые поля, создающие атмосферу непревзойденного спокойствия.',
      features: {
        mountain: {
          title: 'Горная вершина',
          description: 'Расположен на пике с панорамными видами и чистым свежим воздухом',
        },
        garden: {
          title: 'Райский сад',
          description: '500 гектаров виноградников, садов и лавандовых полей',
        },
        accommodation: {
          title: 'Уникальное размещение',
          description: 'Подземные бункеры и наземные люксовые номера',
        },
        dining: {
          title: 'Изысканная кухня',
          description: 'Ресторан на 120 мест с видом на горы и свежими продуктами из сада',
        },
      },
    },
    // Rooms
    rooms: {
      subtitle: 'Размещение',
      title: 'Роскошные номера',
      description: 'Каждый номер — это убежище, созданное для погружения в природу с комфортом мирового класса.',
      bookRoom: 'Забронировать',
      perNight: 'за ночь',
      types: {
        standard: {
          name: 'Стандарт',
          description: 'Элегантный комфорт с видом на сад и премиум удобствами для спокойного горного отдыха.',
        },
        suite: {
          name: 'Сюит',
          description: 'Просторный номер с частной террасой с видом на виноградники и лавандовые поля.',
        },
        president: {
          name: 'Президентский сюит',
          description: 'Уникальное подземное убежище с полной приватностью и естественной терморегуляцией.',
        },
      },
      amenities: {
        wifi: 'Бесплатный WiFi',
        ac: 'Климат-контроль',
        view: 'Вид на горы',
        minibar: 'Мини-бар',
        terrace: 'Частная терраса',
        underground: 'Подземный',
      },
    },
    // Restaurant
    restaurant: {
      subtitle: 'Кулинарное мастерство',
      title: 'Кухня из сада',
      description: 'Наш ресторан на 120 мест прославляет богатство наших садов изысканной кухней, которая чтит местные традиции, принимая современное мастерство.',
      features: {
        views: 'Панорамные виды на горы',
        fresh: 'Свежие продукты из сада',
        wine: 'Вина из собственного виноградника',
        atmosphere: 'Изысканная атмосфера',
      },
      cta: 'Забронировать столик',
    },
    // Garden Experience
    garden: {
      subtitle: 'Погружение в природу',
      title: 'Опыт сада',
      description: 'Прогуляйтесь по 500 гектарам природной красоты, где каждая тропинка ведет к новому открытию.',
      experiences: {
        vineyard: {
          title: 'Прогулки по виноградникам',
          description: 'Прогуляйтесь по нашим виноградникам и попробуйте вина из нашего винограда.',
        },
        orchard: {
          title: 'Сбор урожая',
          description: 'Собирайте сезонные фрукты из наших обильных садов.',
        },
        lavender: {
          title: 'Лавандовые поля',
          description: 'Почувствуйте спокойствие и ароматную атмосферу лавандовых полей.',
        },
        nature: {
          title: 'Горные тропы',
          description: 'Исследуйте живописные тропы с захватывающими видами.',
        },
      },
    },
    // Amenities
    amenities: {
      subtitle: 'Услуги курорта',
      title: 'Возвышенный опыт',
      items: {
        air: {
          title: 'Свежий горный воздух',
          description: 'Насладитесь чистым горным воздухом.',
        },
        walks: {
          title: 'Отдых на лоне природы',
          description: 'Насладитесь отдыхом среди садов и виноградников.',
        },
        relaxation: {
          title: 'Отдых в саду',
          description: 'Насладитесь спокойствием в объятиях природы',
        },
        lavender: {
          title: 'Лавандовый велнес',
          description: 'Испытайте успокаивающую ароматерапию среди лавандовых полей.',
        },
        dining: {
          title: 'Изысканная кухня',
          description: 'Наслаждайтесь кухней из свежих продуктов нашего сада.',
        },
        privacy: {
          title: 'Полная приватность',
          description: 'Эксклюзивные номера для спокойного и комфортного отдыха.',
        },
        photo: {
          title: 'Фотогеничность',
          description: 'Создавайте воспоминания в наших потрясающих ландшафтах.',
        },
        quiet: {
          title: 'Тихая роскошь',
          description: 'Испытайте изысканное гостеприимство в спокойной обстановке.',
        },
      },
    },
    // Gallery
    gallery: {
      subtitle: 'Визуальное путешествие',
      title: 'Моменты в Miraki',
      categories: {
        all: 'Все',
        exterior: 'Экстерьер',
        rooms: 'Номера',
        restaurant: 'Ресторан',
        vineyard: 'Виноградник',
        orchard: 'Сад',
        lavender: 'Лаванда',
        views: 'Горные виды',
      },
    },
    // Testimonials
    testimonials: {
      subtitle: 'Отзывы гостей',
      title: 'Отзывы гостей',
    },
    // Booking
    booking: {
      subtitle: 'Забронируйте свой номер прямо сейчас',
      title: 'Забронировать',
      description: 'Начните свой путь к спокойствию. Заполните форму, и наш консьерж подтвердит бронирование.',
      form: {
        checkIn: 'Дата заезда',
        checkOut: 'Дата выезда',
        guests: 'Количество гостей',
        roomType: 'Тип номера',
        selectRoom: 'Выберите номер',
        fullName: 'Полное имя',
        phone: 'Номер телефона',
        submit: 'Отправить запрос',
        submitting: 'Отправка...',
        success: 'Спасибо! Ваш запрос на бронирование получен. Мы свяжемся с вами в ближайшее время.',
        error: 'Что-то пошло не так. Пожалуйста, попробуйте снова.',
        required: 'Это поле обязательно',
      },
    },
    // Contact
    contact: {
      subtitle: 'Свяжитесь с нами',
      title: 'Контакты',
      address: 'Улоч МФЙ, Шахрисабзский район, Узбекистан',
      phone: '+998 87 337 88 88',
      email: 'info@mirakigarden.com',
      cta: 'Отправить сообщение',
    },
    // Footer
    footer: {
      tagline: 'Роскошный горный курорт',
      copyright: 'Все права защищены.',
      links: {
        privacy: 'Политика конфиденциальности',
        terms: 'Условия использования',
      },
    },
  },
  uz: {
    // Navigation
    nav: {
      home: "Bosh sahifa",
      rooms: "Xonalar",
      restaurant: "Restoran",
      garden: "Bog' tajribasi",
      gallery: "Galereya",
      booking: "Bron qilish",
      contact: "Aloqa",
      bookNow: "Bron qilish",
    },
    // Hero
    hero: {
      title: "Miraki Garden",
      subtitle: "Shahrisabzda hashamatli tog' bog' dam olish maskani",
      description: "Tog'lar cho'qqisidagi eksklyuziv boshpanani kashf eting, bu yerda 500 gektar toza bog'lar, uzumzorlar va lavanda dalalari nafis mehmondo'stlik va toza tog' havosi bilan uyg'unlashadi.",
      explore: "Kurortni ko'rish",
      scroll: "Pastga aylantiring",
    },
    // About
    about: {
      subtitle: "Bizning hikoyamiz",
      title: "Bulutlar ustidagi boshpana",
      description: "Shahrisabzning ulug'vor tog'lari cho'qqisida joylashgan Miraki Garden — bu shunchaki kurort emas, balki tabiat bilan uyg'unlikda yashash falsafasidir. Bizning 500 gektarlik mulkimiz yam-yashil uzumzorlar, xushbo'y bog'lar va cheksiz lavanda dalalarini o'z ichiga oladi.",
      features: {
        mountain: {
          title: "Tog' cho'qqisi",
          description: "Panoramik manzaralar va toza havo bilan cho'qqida joylashgan",
        },
        garden: {
          title: "Jannat bog'i",
          description: "500 gektar uzumzorlar, bog'lar va lavanda dalalari",
        },
        accommodation: {
          title: "Noyob turar joy",
          description: "Yer osti bunkerlari va ustki hashamatli xonalar",
        },
        dining: {
          title: "Nafis taom",
          description: "Tog' manzarasi va bog'dan yangi mahsulotlar bilan 120 o'rinli restoran",
        },
      },
    },
    // Rooms
    rooms: {
      subtitle: "Turar joy",
      title: "Hashamatli xonalar",
      description: "Har bir xona tabiatga singib ketish uchun yaratilgan boshpana, jahon darajasidagi qulaylik va nafosatni taqdim etadi.",
      bookRoom: "Bron qilish",
      perNight: "bir kecha",
      types: {
        standard: {
          name: "Standart",
          description: "Bog' manzarasi va premium qulayliklar bilan nafis qulaylik.",
        },
        suite: {
          name: "Suite",
          description: "Uzumzorlar va lavanda dalalariga qaragan shaxsiy terassa bilan keng xona.",
        },
        president: {
          name: "Prezident Suite",
          description: "To'liq maxfiylik va tabiiy harorat nazorati bilan noyob yer osti boshpanasi.",
        },
      },
      amenities: {
        wifi: "Bepul WiFi",
        ac: "Iqlim nazorati",
        view: "Tog' manzarasi",
        minibar: "Mini bar",
        terrace: "Shaxsiy terassa",
        underground: "Yer osti",
      },
    },
    // Restaurant
    restaurant: {
      subtitle: "Pazandachilik mahorati",
      title: "Bog'dan dasturxonga",
      description: "Bizning 120 o'rinli restoranımız bog'larimizning mo'lligini zamonaviy san'atni qabul qilgan holda mahalliy an'analarni hurmat qiladigan nafis oshxona bilan nishonlaydi.",
      features: {
        views: "Panoramik tog' manzaralari",
        fresh: "Bog'dan yangi mahsulotlar",
        wine: "Uzumzor vinolari",
        atmosphere: "Nafis muhit",
      },
      cta: "Stol bron qilish",
    },
    // Garden Experience
    garden: {
      subtitle: "Tabiatga singib ketish",
      title: "Bog' tajribasi",
      description: "500 gektar tabiiy go'zallik bo'ylab sayr qiling, har bir yo'l yangi kashfiyotga olib boradi.",
      experiences: {
        vineyard: {
          title: "Uzumzor sayohati",
          description: "Mulk uzumzorlarimizda sayr qiling va o'zimiz yetishtirgan uzumdan tayyorlangan vinolarni tatib ko'ring.",
        },
        orchard: {
          title: "Hosil yig'ish",
          description: "Mo'l-ko'l bog'larimizdan mavsumiy mevalarni yig'ing.",
        },
        lavender: {
          title: "Lavanda dalalari",
          description: "Keng lavanda yaylovlarimizning tinchlantiruvchi binafsha tumaniga cho'ming.",
        },
        nature: {
          title: "Tog' yo'llari",
          description: "Hayratlanarli manzaralar bilan go'zal yo'llarni o'rganing.",
        },
      },
    },
    // Amenities
    amenities: {
      subtitle: "Kurort xususiyatlari",
      title: "Yuqori tajribalar",
      items: {
        air: {
          title: "Musaffo tog' havosi",
          description: "Tog'larning musaffo havosidan bahramand bo'ling.",
        },
        walks: {
          title: "Tabiat qo'ynida dam olish",
          description: "Bog'lar va uzumzorlar orasida maroqli vaqt o'tkazing.",
        },
        relaxation: {
          title: "Bog'da dam olish",
          description: "Tabiat qo‘ynidagi osoyishtalikdan bahramand bo‘ling.",
        },
        lavender: {
          title: "Lavanda salomatligi",
          description: "Lavanda dalalari o'rtasida tinchlantiruvchi aromaterapiyani his qiling.",
        },
        dining: {
          title: "Nafis ovqatlanish",
          description: "Bog'dan yangi mahsulotlardan tayyorlangan ajoyib taomlardan bahramand bo'ling.",
        },
        privacy: {
          title: "To'liq maxfiylik",
          description: "Tinchlik uchun mo'ljallangan eksklyuziv xonalar.",
        },
        photo: {
          title: "Fotogenlik",
          description: "Ajoyib tabiiy manzaralarimizda xotiralar yarating.",
        },
        quiet: {
          title: "Sokin hashamat",
          description: "Sokin muhitda nafis mehmondo'stlikni his qiling.",
        },
      },
    },
    // Gallery
    gallery: {
      subtitle: "Vizual sayohat",
      title: "Mirakidagi lahzalar",
      categories: {
        all: "Hammasi",
        exterior: "Tashqi ko'rinish",
        rooms: "Xonalar",
        restaurant: "Restoran",
        vineyard: "Uzumzor",
        orchard: "Bog'",
        lavender: "Lavanda",
        views: "Tog' manzaralari",
      },
    },
    // Testimonials
    testimonials: {
      subtitle: "Mehmonlar tajribasi",
      title: "Mehmonlar fikri",
    },
    // Booking
    booking: {
      subtitle: "Xonangizni hoziroq bron qiling",
      title: "Bron qilish",
      description: "Tinchlikka sayohatingizni boshlang. Quyidagi shaklni to'ldiring va konsyerjimiz broningizni tasdiqlaydi.",
      form: {
        checkIn: "Kelish sanasi",
        checkOut: "Ketish sanasi",
        guests: "Mehmonlar soni",
        roomType: "Xona turi",
        selectRoom: "Xona tanlang",
        fullName: "To'liq ism",
        phone: "Telefon raqami",
        submit: "Bron so'rovi",
        submitting: "Yuborilmoqda...",
        success: "Rahmat! Bron so'rovingiz qabul qilindi. Tez orada siz bilan bog'lanamiz.",
        error: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
        required: "Bu maydon talab qilinadi",
      },
    },
    // Contact
    contact: {
      subtitle: "Biz bilan bog'laning",
      title: "Aloqa",
      address: "Uloch MFY, Shahrisabz tumani, O'zbekiston",
      phone: "+998 87 337 88 88",
      email: "info@mirakigarden.com",
      cta: "Xabar yuborish",
    },
    // Footer
    footer: {
      tagline: "Hashamatli tog' va bog' dam olish maskani",
      copyright: "Barcha huquqlar himoyalangan.",
      links: {
        privacy: "Maxfiylik siyosati",
        terms: "Xizmat shartlari",
      },
    },
  },
};

export type Translations = typeof translations.en;
