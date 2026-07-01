/* ===================================================
   희망손잡이 — 스크립트
   - 모바일 메뉴 토글
   - 스크롤 시 네비 그림자 / 맨위로 버튼
   - 스크롤 등장 애니메이션 (reveal)
   - 통계 숫자 카운트업
   - 신청 폼 처리 (기본: 이메일 보내기)
   =================================================== */

(function () {
  "use strict";

  /* ---------- 연락 정보 (✏️ 실제 값으로 바꿔주세요) ---------- */
  var CONTACT_EMAIL = "hope@example.com"; // 신청 폼이 이 주소로 메일을 엽니다

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------- 모바일 메뉴 ---------- */
  var nav       = $("#nav");
  var navMenu   = $("#navMenu");
  var navToggle = $("#navToggle");

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "메뉴 열기");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    });
  }
  // 메뉴 링크 클릭 시 닫기
  $$(".nav__link").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* ---------- 스크롤: 네비 그림자 + 맨위로 버튼 ---------- */
  var toTop = $("#toTop");
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    nav.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 통계 숫자 카운트업 ---------- */
  var counters = $$(".stat__num");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      // easeOutCubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("ko-KR");
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString("ko-KR");
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(function (el) {
      el.textContent = (parseInt(el.getAttribute("data-count"), 10) || 0).toLocaleString("ko-KR");
    });
  }

  /* ---------- 신청 폼 처리 ----------
     기본 동작: 입력한 내용을 담아 이메일 작성 창을 엽니다.
     나중에 Formspree 같은 서비스로 바꾸려면 아래 handleSubmit 안내를 참고하세요. */
  var form = $("#joinForm");
  var note = $("#formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name    = ($("#name").value    || "").trim();
      var phone   = ($("#phone").value   || "").trim();
      var type    = ($("#type").value    || "").trim();
      var message = ($("#message").value || "").trim();

      if (!name || !phone) {
        note.textContent = "이름과 연락처를 입력해 주세요.";
        note.className = "join__note";
        return;
      }

      var subject = "[희망손잡이] " + type + " - " + name;
      var body =
        "이름: " + name + "\n" +
        "연락처: " + phone + "\n" +
        "참여 유형: " + type + "\n" +
        "남기실 말씀:\n" + message + "\n";

      var mailto = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      note.textContent = "감사합니다! 이메일 작성 창이 열립니다. 그대로 보내주시면 확인 후 연락드리겠습니다.";
      note.className = "join__note ok";
      form.reset();
    });
  }

  /* ---------- 현재 연도 반영(선택) ---------- */
  // 필요 시 푸터 연도를 자동으로 바꾸고 싶으면 아래 주석을 해제하세요.
  // var yearEl = $("#year"); if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
