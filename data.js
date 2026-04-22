/* ══════════════════════════════════════════
   PLAY ZONE — data.js
   All static data used by the app
   ══════════════════════════════════════════ */

const SPORTS = [
  { id: "football",    name: "كرة القدم",  nameEn: "Football",    icon: "⚽", color: "#22c55e", target: "youth",   players: "5v5 / 7v7 / 11v11" },
  { id: "basketball",  name: "كرة السلة",  nameEn: "Basketball",  icon: "🏀", color: "#f97316", target: "youth",   players: "3v3 / 5v5" },
  { id: "chess",       name: "الشطرنج",    nameEn: "Chess",       icon: "♟️", color: "#8b5cf6", target: "seniors", players: "1v1" },
  { id: "yoga",        name: "يوغا",       nameEn: "Yoga",        icon: "🧘", color: "#ec4899", target: "women",   players: "Group" },
  { id: "gymnastics",  name: "جمباز",      nameEn: "Gymnastics",  icon: "🤸", color: "#06b6d4", target: "women",   players: "Group" },
  { id: "walking",     name: "المشي",      nameEn: "Walking",     icon: "🚶", color: "#84cc16", target: "seniors", players: "Group" },
  { id: "swimming",    name: "سباحة",      nameEn: "Swimming",    icon: "🏊", color: "#3b82f6", target: "youth",   players: "Individual" },
  { id: "tennis",      name: "تنس",        nameEn: "Tennis",      icon: "🎾", color: "#eab308", target: "youth",   players: "1v1 / 2v2" },
];

const VENUES = {
  football: [
    { id: "v1", name: "ملعب الرياضي الوطني",   area: "عبدون",         distance: "1.2 كم", rating: 4.8, price: 35, icon: "🏟️", capacity: 22, available: true },
    { id: "v2", name: "ملعب النادي الجامعي",   area: "الجبيهة",       distance: "2.5 كم", rating: 4.5, price: 25, icon: "⚽", capacity: 14, available: true },
    { id: "v3", name: "ملعب الأمير محمد",       area: "الصويفية",      distance: "3.8 كم", rating: 4.7, price: 40, icon: "🌟", capacity: 22, available: false },
  ],
  basketball: [
    { id: "v4", name: "صالة النادي الأهلي",    area: "شميساني",       distance: "0.9 كم", rating: 4.9, price: 30, icon: "🏀", capacity: 10, available: true },
    { id: "v5", name: "صالة الدوار الثالث",    area: "الدوار الثالث", distance: "2.1 كم", rating: 4.3, price: 20, icon: "🏅", capacity: 10, available: true },
  ],
  yoga: [
    { id: "v6", name: "مركز أنا سبا",          area: "عبدون",         distance: "0.5 كم", rating: 5.0, price: 15, icon: "🧘", capacity: 12, available: true },
    { id: "v7", name: "مركز اللوتس",           area: "الرابية",       distance: "1.8 كم", rating: 4.6, price: 18, icon: "🌸", capacity: 8,  available: true },
  ],
  chess: [
    { id: "v8", name: "نادي الفكر",            area: "الجاردنز",      distance: "1.0 كم", rating: 4.7, price: 10, icon: "♟️", capacity: 20, available: true },
  ],
  gymnastics: [
    { id: "v9", name: "أكاديمية الحركة",       area: "طبربور",        distance: "4.2 كم", rating: 4.4, price: 22, icon: "🤸", capacity: 15, available: true },
  ],
  walking: [
    { id: "v10", name: "حديقة الحسين",         area: "الحسين",        distance: "2.0 كم", rating: 4.9, price: 0,  icon: "🌳", capacity: 50, available: true },
  ],
  swimming: [
    { id: "v11", name: "مسبح الجامعة الأردنية", area: "الجبيهة",      distance: "3.0 كم", rating: 4.6, price: 12, icon: "🏊", capacity: 30, available: true },
  ],
  tennis: [
    { id: "v12", name: "نادي التنس الملكي",    area: "عبدون",         distance: "1.5 كم", rating: 4.8, price: 28, icon: "🎾", capacity: 4,  available: true },
  ],
};

const TIME_SLOTS = [
  { id: "t1", time: "07:00 - 08:30", period: "صباح",     available: true  },
  { id: "t2", time: "09:00 - 10:30", period: "صباح",     available: true  },
  { id: "t3", time: "11:00 - 12:30", period: "ظهر",      available: false },
  { id: "t4", time: "14:00 - 15:30", period: "بعد الظهر",available: true  },
  { id: "t5", time: "16:00 - 17:30", period: "عصر",      available: true  },
  { id: "t6", time: "18:00 - 19:30", period: "مساء",     available: false },
  { id: "t7", time: "20:00 - 21:30", period: "مساء",     available: true  },
  { id: "t8", time: "21:45 - 23:00", period: "ليل",      available: true  },
];

// Sample existing bookings
const SAMPLE_BOOKINGS = [
  {
    id: "b1",
    sport:     "football",
    venueName: "ملعب الرياضي الوطني",
    date:      "2025-04-22",
    time:      "20:00 - 21:30",
    status:    "confirmed",
    price:     35,
  },
  {
    id: "b2",
    sport:     "yoga",
    venueName: "مركز أنا سبا",
    date:      "2025-04-14",
    time:      "09:00 - 10:30",
    status:    "completed",
    price:     15,
  },
];

const PAY_METHODS = [
  { id: "cash",   label: "كاش عند الوصول",      icon: "💵" },
  { id: "visa",   label: "فيزا / ماستركارد",    icon: "💳" },
  { id: "wallet", label: "المحفظة الإلكترونية", icon: "📱" },
];

const FILTERS = [
  { id: "all",     label: "الكل" },
  { id: "youth",   label: "الشباب" },
  { id: "women",   label: "النساء" },
  { id: "seniors", label: "كبار السن" },
];

const PROFILE_MENU = [
  { icon: "📋", label: "حجوزاتي",       action: "bookings" },
  { icon: "🔔", label: "الإشعارات",    action: null },
  { icon: "💳", label: "طرق الدفع",    action: null },
  { icon: "⭐", label: "تقييماتي",     action: null },
  { icon: "❓", label: "المساعدة",     action: null },
  { icon: "🚪", label: "تسجيل الخروج", action: "logout" },
];
