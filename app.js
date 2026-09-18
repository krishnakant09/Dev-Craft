/**
 * DEVCRAFT — INTERACTIVE SCRIPTS
 * Handles theme toggling, mobile navigation drawer,
 * tutorial category filtering, newsletter submission, and scroll interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initCategoryFilters();
  initNewsletterForm();
  initBackToTop();
  initCurrentYear();
  initLoadMore();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve stored theme or system preference
  const savedTheme = localStorage.getItem('devcraft-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('devcraft-theme', theme);
}

/* --------------------------------------------------------------------------
   2. RESPONSIVE MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (!mobileToggle || !primaryNav) return;

  function toggleMenu(isOpen) {
    const willOpen = typeof isOpen === 'boolean' ? isOpen : !primaryNav.classList.contains('open');
    mobileToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    primaryNav.classList.toggle('open', willOpen);

    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = willOpen ? 'hidden' : '';
  }

  mobileToggle.addEventListener('click', () => {
    toggleMenu();
  });

  // Close mobile menu when any nav link is clicked
  const navLinks = primaryNav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close mobile menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && primaryNav.classList.contains('open')) {
      toggleMenu(false);
      mobileToggle.focus();
    }
  });

  // Close when resized back up to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && primaryNav.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   3. CATEGORY FILTERS (INTERACTIVE TUTORIAL CARDS)
   -------------------------------------------------------------------------- */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const tutorialCards = document.querySelectorAll('.tutorial-card');
  const categorySidebarLinks = document.querySelectorAll('[data-filter-target]');

  if (!filterButtons.length || !tutorialCards.length) return;

  function filterCategory(category) {
    // Update button states
    filterButtons.forEach(btn => {
      const isMatch = btn.dataset.filter === category;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    // Filter cards with smooth opacity transition
    tutorialCards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => {
          if (btnActiveCategory() !== 'all' && card.dataset.category !== btnActiveCategory()) {
            card.style.display = 'none';
          }
        }, 180);
      }
    });
  }

  function btnActiveCategory() {
    const activeBtn = document.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterCategory(filter);
    });
  });

  // Connect sidebar category links to filter buttons
  categorySidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCategory = link.dataset.filterTarget;
      if (targetCategory) {
        filterCategory(targetCategory);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. NEWSLETTER FORM VALIDATION & FEEDBACK
   -------------------------------------------------------------------------- */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('subscriber-email');
  const feedback = document.getElementById('newsletter-feedback');
  if (!form || !emailInput || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      showFeedback('Please enter your email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!emailRegex.test(email)) {
      showFeedback('Please provide a valid email format.', 'error');
      emailInput.focus();
      return;
    }

    // Success response simulation
    showFeedback('🎉 Welcome aboard! Please check your inbox for confirmation.', 'success');
    emailInput.value = '';
  });

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
  }
}

/* --------------------------------------------------------------------------
   5. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   6. LOAD MORE BUTTON INTERACTION
   -------------------------------------------------------------------------- */
function initLoadMore() {
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!loadMoreBtn) return;

  loadMoreBtn.addEventListener('click', () => {
    loadMoreBtn.disabled = true;
    loadMoreBtn.innerHTML = `
      <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Loading Articles...</span>
    `;

    setTimeout(() => {
      loadMoreBtn.innerHTML = `<span>All 120+ Guides Available in Archive</span>`;
      loadMoreBtn.classList.remove('btn-outline');
      loadMoreBtn.classList.add('btn-secondary');
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   7. COPYRIGHT YEAR AUTO-UPDATE
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
