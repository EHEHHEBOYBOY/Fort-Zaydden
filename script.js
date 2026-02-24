(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    /* Close menu when a link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }

  const youtubeUrl = 'https://www.youtube.com/watch?v=4JSphPAmvlE';

  /* Prevent F12 and other developer tools shortcuts */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'C') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
      e.preventDefault();
      window.location.href = youtubeUrl;
    }
  });

  /* Prevent right-click context menu */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    window.location.href = youtubeUrl;
  });

  const revealEls = document.querySelectorAll(
    '.service-card, .stat-card, .req-item, .stage, .hicom-card, .link-card, .prop-card'
  );

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease ' + (i % 4) * 0.08 + 's, transform 0.5s ease ' + (i % 4) * 0.08 + 's';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  /* Profile & Verify Modal Functionality */
  const profileBtn = document.getElementById('profileBtn');
  const verifyLink = document.getElementById('verifyLink');
  const verifyModal = document.getElementById('verifyModal');
  const verifyModalClose = document.getElementById('verifyModalClose');
  const verifyModalCancel = document.getElementById('verifyModalCancel');
  const verifyModalSubmit = document.getElementById('verifyModalSubmit');
  const verifyModalOverlay = document.getElementById('verifyModalOverlay');
  const robloxProfileInput = document.getElementById('robloxProfileInput');

  function openVerifyModal() {
    if (verifyModal) {
      verifyModal.classList.add('open');
      if (robloxProfileInput) {
        setTimeout(function () {
          robloxProfileInput.focus();
        }, 100);
      }
    }
  }

  function closeVerifyModal() {
    if (verifyModal) {
      verifyModal.classList.remove('open');
    }
    if (robloxProfileInput) {
      robloxProfileInput.value = '';
    }
  }

  function validateRobloxLink(link) {
    const robloxRegex = /^https?:\/\/(www\.)?roblox\.com\/users\/\d+\/?/;
    return robloxRegex.test(link.trim());
  }

  function submitRobloxProfile() {
    const profileLink = robloxProfileInput.value.trim();
    
    if (!profileLink) {
      alert('Пожалуйста, введите ссылку на профиль.');
      return;
    }

    if (!validateRobloxLink(profileLink)) {
      alert('Пожалуйста, введите корректную ссылку на Roblox профиль.\nПример: https://www.roblox.com/users/123456/profile');
      return;
    }

    // Store the profile link (you can do whatever you want with it)
    const username = prompt('Введите ваше имя пользователя для верификации:', '');
    
    if (username === null) {
      return; // User cancelled
    }

    if (username.trim() === '') {
      alert('Пожалуйста, введите имя пользователя.');
      return;
    }

    // Success message
    alert('Спасибо! Ваш профиль отправлен на проверку.\nRoblox: ' + profileLink + '\nИмя: ' + username);
    console.log('Submitted profile:', { robloxLink: profileLink, username: username });
    
    closeVerifyModal();
  }

  if (profileBtn) {
    profileBtn.addEventListener('click', openVerifyModal);
  }

  if (verifyLink) {
    verifyLink.addEventListener('click', function (e) {
      e.preventDefault();
      openVerifyModal();
    });
  }

  if (verifyModalClose) {
    verifyModalClose.addEventListener('click', closeVerifyModal);
  }

  if (verifyModalCancel) {
    verifyModalCancel.addEventListener('click', closeVerifyModal);
  }

  if (verifyModalSubmit) {
    verifyModalSubmit.addEventListener('click', submitRobloxProfile);
  }

  if (verifyModalOverlay) {
    verifyModalOverlay.addEventListener('click', closeVerifyModal);
  }

  if (robloxProfileInput) {
    robloxProfileInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        submitRobloxProfile();
      }
    });
  }

})();
