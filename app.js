/* ══════════════════════════════════════════
   PLAY ZONE — app.js
   All application logic, routing, rendering
   ══════════════════════════════════════════ */

/* ── App State ─────────────────────────────── */
const state = {
  currentPage:  "login",
  user:         null,
  sportFilter:  "all",
  booking: {
    sportId:    null,
    date:       null,
    timeSlotId: null,
    venue:      null,
  },
  selectedVenueId: null,
  payMethod:    "cash",
  bookings:     [...SAMPLE_BOOKINGS],
  bookingsTab:  "upcoming",
};

/* ── Toast ─────────────────────────────────── */
let toastTimer = null;
function showToast(msg, type = "success") {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.className = type === "error" ? "error show" : "show";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.className = ""; }, 3000);
}

/* ── Router ─────────────────────────────────── */
function navigate(pageId, addToHistory = true) {
  // Hide all pages
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  // Show target page
  const target = document.getElementById("page-" + pageId);
  if (!target) return;

  target.classList.add("active");
  state.currentPage = pageId;
  window.scrollTo(0, 0);

  // ✅ Add to browser history
  if (addToHistory) {
    history.pushState({ page: pageId }, "", "#" + pageId);
  }

  // Page init
  const inits = {
    login: initLogin,
    home: initHome,
    book: initBook,
    venues: initVenues,
    payment: initPayment,
    ticket: initTicket,
    bookings: initBookings,
    profile: initProfile,
  };

  if (inits[pageId]) inits[pageId]();
}

/* ══════════════════════════════════════════
   LOGIN
   ══════════════════════════════════════════ */
function initLogin() {
  renderFloatBalls();
}

function renderFloatBalls() {
  const container = document.getElementById("float-balls");
  if (!container) return;
  const balls = ["⚽","🏀","🎾","♟️","🤸","🏊"];
  container.innerHTML = balls.map((b, i) => `
    <span class="float-ball" style="
      top:${10 + i * 13}%;
      left:${5 + i * 15}%;
      animation-delay:${i * 0.6}s;
      font-size:${28 + (i % 3) * 6}px
    ">${b}</span>
  `).join("");
}

function handleLogin() {
  const email = document.getElementById("login-email").value.trim();
  const pass  = document.getElementById("login-pass").value.trim();
  if (!email || !pass) { showToast("الرجاء إدخال البريد وكلمة المرور", "error"); return; }
  state.user = { name: "أحمد وليد", email, avatar: "أ" };
  navigate("home");
}

function togglePassword() {
  const input = document.getElementById("login-pass");
  const btn   = document.getElementById("toggle-pass");
  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
  } else {
    input.type = "password";
    btn.textContent = "👁️";
  }
}

/* ══════════════════════════════════════════
   REGISTER
   ══════════════════════════════════════════ */
function handleRegister() {
  const name  = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const phone = document.getElementById("reg-phone").value.trim();
  const pass  = document.getElementById("reg-pass").value.trim();
  if (!name || !email || !phone || !pass) { showToast("الرجاء تعبئة جميع الحقول", "error"); return; }
  showToast("تم إنشاء الحساب بنجاح! 🎉");
  navigate("login");
}

/* ══════════════════════════════════════════
   HOME
   ══════════════════════════════════════════ */
function initHome() {
  // Update greeting & avatar
  const firstName = state.user?.name?.split(" ")[0] || "رياضي";
  document.getElementById("hero-greeting").textContent = `مرحباً 👋`;
  const avatarEl = document.getElementById("home-avatar");
  if (avatarEl) avatarEl.textContent = state.user?.avatar || "أ";

  renderFilters();
  renderSports();
  renderHomeBookings();
}

function renderFilters() {
  const container = document.getElementById("filter-row");
  container.innerHTML = FILTERS.map(f => `
    <button
      class="filter-btn ${state.sportFilter === f.id ? "active" : ""}"
      onclick="setFilter('${f.id}')">
      ${f.label}
    </button>
  `).join("");
}

function setFilter(filterId) {
  state.sportFilter = filterId;
  renderFilters();
  renderSports();
}

function renderSports() {
  const list = state.sportFilter === "all"
    ? SPORTS
    : SPORTS.filter(s => s.target === state.sportFilter);

  document.getElementById("sports-grid").innerHTML = list.map(sport => `
    <div class="sport-card" onclick="selectSport('${sport.id}')"
         style="border-color: ${sport.color}40">
      <div class="sport-icon" style="background:${sport.color}20; color:${sport.color}">
        ${sport.icon}
      </div>
      <div class="sport-info">
        <span class="sport-name">${sport.name}</span>
        <span class="sport-en">${sport.nameEn}</span>
        <span class="sport-players">${sport.players}</span>
      </div>
      <div class="sport-arrow" style="color:${sport.color}">←</div>
    </div>
  `).join("");
}

function renderHomeBookings() {
  const upcoming = state.bookings.filter(b => b.status === "confirmed");
  const container = document.getElementById("home-bookings");
  if (upcoming.length === 0) {
    container.innerHTML = `<p style="color:var(--muted);font-size:14px;padding:8px 0">لا توجد حجوزات قادمة</p>`;
    return;
  }
  container.innerHTML = upcoming.map(b => bookingCardHTML(b)).join("");
}

function bookingCardHTML(b) {
  const sport = SPORTS.find(s => s.id === b.sport);
  const isConfirmed = b.status === "confirmed";
  return `
    <div class="booking-card">
      <div class="booking-icon" style="background:${sport?.color || "#333"}20; font-size:24px">
        ${sport?.icon || "🏅"}
      </div>
      <div class="booking-info">
        <span class="booking-venue">${b.venueName}</span>
        <span class="booking-meta">${b.date} · ${b.time}</span>
        <span class="booking-price">${b.price} د.أ</span>
      </div>
      <span class="badge" style="
        background: ${isConfirmed ? "rgba(34,197,94,.12)" : "rgba(107,114,128,.12)"};
        color: ${isConfirmed ? "#22c55e" : "#9ca3af"}">
        ${isConfirmed ? "مؤكد" : "مكتمل"}
      </span>
    </div>
  `;
}

function selectSport(sportId) {
  state.booking = { sportId, date: null, timeSlotId: null, venue: null };
  state.selectedVenueId = null;
  navigate("book");
}

/* ══════════════════════════════════════════
   BOOK (Date & Time Wizard Step)
   ══════════════════════════════════════════ */
function initBook() {
  const sport = SPORTS.find(s => s.id === state.booking.sportId);
  document.getElementById("book-sport-title").textContent = sport?.name || "حجز";

  updateWizardDots(1);
  renderDatePicker();
  renderTimeSlots();
  updateNextButton();
}

function updateWizardDots(activeStep) {
  [1, 2, 3].forEach(i => {
    const dot = document.getElementById(`wdot-${i}`);
    dot.className = "wizard-dot";
    if (i < activeStep)  dot.classList.add("done");
    if (i === activeStep) dot.classList.add("active");
    dot.textContent = i < activeStep ? "✓" : i;
  });
}

function renderDatePicker() {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      iso: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("ar-JO", { weekday: "short" }),
      num: d.getDate(),
    };
  });

  document.getElementById("date-row").innerHTML = days.map(d => `
    <div class="date-card ${state.booking.date === d.iso ? "active" : ""}"
         onclick="selectDate('${d.iso}')">
      <span class="date-day">${d.day}</span>
      <span class="date-num">${d.num}</span>
    </div>
  `).join("");
}

function selectDate(iso) {
  state.booking.date = iso;
  renderDatePicker();
  updateNextButton();
}

function renderTimeSlots() {
  document.getElementById("time-grid").innerHTML = TIME_SLOTS.map(t => `
    <div class="time-card
      ${state.booking.timeSlotId === t.id ? "active" : ""}
      ${!t.available ? "disabled" : ""}"
      onclick="${t.available ? `selectTime('${t.id}')` : ""}">
      <span class="time-period">${t.period}</span>
      <span class="time-val">${t.time}</span>
      ${!t.available ? `<span class="time-full">محجوز</span>` : ""}
    </div>
  `).join("");
}

function selectTime(slotId) {
  state.booking.timeSlotId = slotId;
  renderTimeSlots();
  updateNextButton();
}

function updateNextButton() {
  const btn = document.getElementById("btn-to-venues");
  if (btn) btn.disabled = !(state.booking.date && state.booking.timeSlotId);
}

function goToVenues() {
  if (!state.booking.date || !state.booking.timeSlotId) return;
  navigate("venues");
}

/* ══════════════════════════════════════════
   VENUES
   ══════════════════════════════════════════ */
function initVenues() {
  updateWizardDots(2);
  state.selectedVenueId = null;
  renderVenueList();
}

function renderVenueList() {
  const venues = VENUES[state.booking.sportId] || [];
  document.getElementById("venues-list").innerHTML = venues.map(v => `
    <div class="venue-card
      ${state.selectedVenueId === v.id ? "active" : ""}
      ${!v.available ? "disabled" : ""}"
      onclick="${v.available ? `selectVenue('${v.id}')` : ""}">
      <div class="venue-emoji">${v.icon}</div>
      <div class="venue-info">
        <span class="venue-name">${v.name}</span>
        <span class="venue-meta">📍 ${v.area} · ${v.distance}</span>
        <div class="venue-row">
          <span class="venue-rating">⭐ ${v.rating}</span>
          <span class="venue-capacity">👥 سعة ${v.capacity}</span>
        </div>
      </div>
      <div class="venue-price">
        <span class="venue-price-num">${v.price === 0 ? "مجاني" : v.price + " د.أ"}</span>
        ${!v.available ? `<span class="venue-full">ممتلئ</span>` : ""}
      </div>
    </div>
  `).join("");

  document.getElementById("btn-to-payment").disabled = !state.selectedVenueId;
}

function selectVenue(venueId) {
  state.selectedVenueId = venueId;
  const allVenues = VENUES[state.booking.sportId] || [];
  state.booking.venue = allVenues.find(v => v.id === venueId);
  renderVenueList();
  document.getElementById("btn-to-payment").disabled = false;
}

function goToPayment() {
  if (!state.selectedVenueId) return;
  navigate("payment");
}

/* ══════════════════════════════════════════
   PAYMENT
   ══════════════════════════════════════════ */
function initPayment() {
  updateWizardDots(3);
  renderBookingSummary();
  renderPayMethods();
}

function renderBookingSummary() {
  const sport   = SPORTS.find(s => s.id === state.booking.sportId);
  const slot    = TIME_SLOTS.find(t => t.id === state.booking.timeSlotId);
  const venue   = state.booking.venue;
  const priceLabel = venue?.price === 0 ? "مجاني" : `${venue?.price} د.أ`;

  document.getElementById("booking-summary").innerHTML = `
    <div class="summary-header">ملخص الحجز</div>
    <div class="summary-row">
      <span class="summary-key">الرياضة</span>
      <span class="summary-val">${sport?.icon} ${sport?.name}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">الملعب</span>
      <span class="summary-val">${venue?.name}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">التاريخ</span>
      <span class="summary-val">${state.booking.date}</span>
    </div>
    <div class="summary-row">
      <span class="summary-key">الوقت</span>
      <span class="summary-val">${slot?.time}</span>
    </div>
    <div class="summary-row summary-total">
      <span class="summary-key">الإجمالي</span>
      <span class="summary-val price">${priceLabel}</span>
    </div>
  `;
}

function renderPayMethods() {
  document.getElementById("pay-methods").innerHTML = PAY_METHODS.map(m => `
    <div class="pay-card ${state.payMethod === m.id ? "active" : ""}"
         onclick="selectPayMethod('${m.id}')">
      <span class="pay-icon">${m.icon}</span>
      <span class="pay-label">${m.label}</span>
      <span class="radio-circle ${state.payMethod === m.id ? "active" : ""}"></span>
    </div>
  `).join("");

  // Show / hide card form
  document.getElementById("card-form").style.display =
    state.payMethod === "visa" ? "flex" : "none";
}

function selectPayMethod(methodId) {
  state.payMethod = methodId;
  renderPayMethods();
}

function confirmBooking() {
  const btn = document.getElementById("btn-confirm");
  btn.disabled = true;
  btn.textContent = "⏳ جاري التأكيد...";
  btn.classList.add("loading-btn");

  setTimeout(() => {
    // Add to bookings list
    const sport = SPORTS.find(s => s.id === state.booking.sportId);
    const slot  = TIME_SLOTS.find(t => t.id === state.booking.timeSlotId);
    state.bookings.push({
      id:        "b" + Date.now(),
      sport:     state.booking.sportId,
      venueName: state.booking.venue?.name,
      date:      state.booking.date,
      time:      slot?.time,
      status:    "confirmed",
      price:     state.booking.venue?.price || 0,
    });

    showToast("تم تأكيد الحجز بنجاح! 🎉");
    navigate("ticket");
  }, 1800);
}

/* ══════════════════════════════════════════
   TICKET
   ══════════════════════════════════════════ */
function initTicket() {
  const sport  = SPORTS.find(s => s.id === state.booking.sportId);
  const slot   = TIME_SLOTS.find(t => t.id === state.booking.timeSlotId);
  const venue  = state.booking.venue;
  const ticketId = "PZ" + (Math.floor(Math.random() * 90000) + 10000);
  const priceLabel = venue?.price === 0 ? "مجاني" : `${venue?.price} د.أ`;

  document.getElementById("ticket-card").innerHTML = `
    <div class="ticket-header">
      <span class="ticket-sport">${sport?.icon} ${sport?.name}</span>
      <span class="ticket-id">#${ticketId}</span>
    </div>
    <div class="ticket-divider">✂</div>
    <div class="ticket-body">
      <div class="ticket-row">
        <span class="ticket-key">📍 الملعب</span>
        <span class="ticket-val">${venue?.name}</span>
      </div>
      <div class="ticket-row">
        <span class="ticket-key">📅 التاريخ</span>
        <span class="ticket-val">${state.booking.date}</span>
      </div>
      <div class="ticket-row">
        <span class="ticket-key">🕐 الوقت</span>
        <span class="ticket-val">${slot?.time}</span>
      </div>
      <div class="ticket-row">
        <span class="ticket-key">💰 المبلغ</span>
        <span class="ticket-val price">${priceLabel}</span>
      </div>
    </div>
    <div class="ticket-barcode">████ ██ ████ ████ ██</div>
  `;
}

/* ══════════════════════════════════════════
   BOOKINGS
   ══════════════════════════════════════════ */
function initBookings() {
  renderBookingsList();
}

function switchTab(tab) {
  state.bookingsTab = tab;
  document.getElementById("tab-upcoming").classList.toggle("active", tab === "upcoming");
  document.getElementById("tab-past").classList.toggle("active", tab === "past");
  renderBookingsList();
}

function renderBookingsList() {
  const list = state.bookings.filter(b =>
    state.bookingsTab === "upcoming"
      ? b.status === "confirmed"
      : b.status === "completed"
  );
  const container = document.getElementById("bookings-list");

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📋</span>
        <p class="empty-text">لا توجد حجوزات ${state.bookingsTab === "upcoming" ? "قادمة" : "سابقة"}</p>
        <button class="btn-primary" style="width:auto;padding:12px 32px" onclick="navigate('home')">
          احجز الآن
        </button>
      </div>
    `;
    return;
  }
  container.innerHTML = list.map(b => bookingCardHTML(b)).join("");
}

/* ══════════════════════════════════════════
   PROFILE
   ══════════════════════════════════════════ */
function initProfile() {
  if (state.user) {
    document.getElementById("profile-name").textContent  = state.user.name;
    document.getElementById("profile-email").textContent = state.user.email;
    document.getElementById("profile-avatar").textContent = state.user.avatar;
  }
  renderProfileMenu();
}

function renderProfileMenu() {
  document.getElementById("profile-menu").innerHTML = PROFILE_MENU.map(item => `
    <div class="profile-row"
         onclick="${item.action === "logout"
           ? "navigate('login')"
           : item.action
             ? `navigate('${item.action}')`
             : "showToast('قريباً!')"
         }">
      <span class="profile-row-icon">${item.icon}</span>
      <span class="profile-row-label">${item.label}</span>
      <span class="profile-row-arrow">←</span>
    </div>
  `).join("");
}

/* ══════════════════════════════════════════
   BOOT
   ══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  navigate("login", false);
  history.replaceState({ page: "login" }, "", "#login");
});

window.addEventListener("popstate", (event) => {
  const page = event.state?.page || "login";
  navigate(page, false); // 🔥 don't push again
});