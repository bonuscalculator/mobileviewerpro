/* ===========================
   Header Component – header.js
=========================== */
(function () {
  const headerHTML = `
    <style>
      /* Dropdown Styles */
      .nav-dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-trigger {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }

      .dropdown-trigger svg {
        transition: transform 0.2s ease;
      }

      .nav-dropdown:hover .dropdown-trigger svg {
        transform: rotate(180deg);
      }

      .dropdown-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: var(--bg-card, #1a1a1a);
        min-width: 220px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        border: 1px solid var(--border-color, #333);
        border-radius: 8px;
        z-index: 1000;
        padding: 8px 0;
        margin-top: 10px;
      }

      .nav-dropdown:hover .dropdown-content {
        display: block;
      }

      .dropdown-content .nav-link {
        display: block;
        padding: 10px 20px;
        margin: 0 !important;
        white-space: nowrap;
      }

      .dropdown-content .nav-link:hover {
        background-color: var(--accent-1, #333);
      }

      /* Mobile Adjustment */
      @media (max-width: 768px) {
        .dropdown-content {
          position: static;
          display: block;
          background: transparent;
          border: none;
          box-shadow: none;
          padding-left: 20px;
        }
        .dropdown-trigger svg {
          display: none;
        }
      }
    </style>

    <header class="site-header" id="siteHeader" role="banner">
      <div class="container" style="width:100%;max-width:100%;display:flex;align-items:center;justify-content:space-between;padding:0 32px;">
        <a href="/" class="header-logo" aria-label="Mobile Viewer pro Home">
          <div class="logo-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="2"/>
              <path d="M12 18h.01"/>
            </svg>
          </div>
          Mobile Viewer<span style="color:var(--accent-2)">Pro</span>
        </a>

        <nav class="header-nav" role="navigation" aria-label="Main navigation">
          <a href="/" class="nav-link active" aria-current="page">Home</a>
          
          <div class="nav-dropdown">
            <a href="#" class="nav-link dropdown-trigger">Tools 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </a>
            <div class="dropdown-content">
              <a href="/qr-generator" class="nav-link">1. QR Generator</a>
              <a href="/image-resizer" class="nav-link">2. Image Resizer & Compressor</a>
              <a href="/device-detector" class="nav-link">3. Mobile Device Detector</a>
            </div>
          </div>

          <a href="/#viewer" class="nav-link">Viewer</a>
          <a href="#features" class="nav-link">Features</a>
          <a href="/#devices" class="nav-link">Devices</a>
          <a href="/#use-cases" class="nav-link">Use Cases</a>
          <a href="#faq" class="nav-link">FAQ</a>
          <a href="/blog" class="nav-link">Blog</a>
        </nav>

        <div class="header-actions">
          <a href="/#viewer" class="btn btn-primary" style="padding:9px 20px;font-size:0.85rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
            Try Free
          </a>
        </div>

        <button class="hamburger" id="hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>

    <nav class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation" role="navigation">
      <a href="/" class="nav-link">Home</a>
      <a href="/qr-generator" class="nav-link">QR Generator</a>
      <a href="/image-resizer" class="nav-link">Image Resizer & Compressor</a>
      <a href="/device-detector" class="nav-link">Mobile Device Detector</a>
      <a href="/#viewer" class="nav-link">Viewer</a>
      <a href="#features" class="nav-link">Features</a>
      <a href="/#devices" class="nav-link">Devices</a>
      <a href="/#use-cases" class="nav-link">Use Cases</a>
      <a href="#faq" class="nav-link">FAQ</a>
      <a href="/#viewer" class="btn btn-primary" style="margin-top:8px;justify-content:center;">Try Free</a>
    </nav>
  `;

  document.getElementById('header-root').innerHTML = headerHTML;

  // Scroll effect
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active nav link highlight
  const navLinks = document.querySelectorAll('.header-nav .nav-link');
  const sections = ['home', 'viewer', 'features', 'devices', 'use-cases', 'faq'];

  const observerOpts = { rootMargin: '-20% 0px -70% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          l.toggleAttribute('aria-current', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOpts);

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
        // Close mobile menu
        document.getElementById('mobileMenu').classList.remove('open');
        document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });
})();
