/* ===========================
   Header Component – header.js
=========================== */
{
  "file": "header.js",
  "description": "Header component with integrated navigation, mobile menu, and a new Tools dropdown menu.",
  "type": "Component/UI"
}


(function () {
  const headerHTML = `
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
            <button class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Tools
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="margin-left:4px; transition: transform 0.2s;">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div class="dropdown-menu">
              <a href="/qr-generator" class="dropdown-item">QR Generator</a>
              <a href="/image-resizer" class="dropdown-item">Image Resizer & Compressor</a>
              <a href="/device-detector" class="dropdown-item">Mobile Device Detector</a>
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
      <div style="padding: 10px 20px; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted);">Tools</div>
      <a href="/qr-generator" class="nav-link" style="padding-left: 32px;">QR Generator</a>
      <a href="/image-resizer" class="nav-link" style="padding-left: 32px;">Image Resizer & Compressor</a>
      <a href="/device-detector" class="nav-link" style="padding-left: 32px;">Mobile Device Detector</a>
      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 8px 20px;">
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
  const navLinks = document.querySelectorAll('.header-nav .nav-link:not(.dropdown-toggle)');
  const sections = ['home', 'viewer', 'features', 'devices', 'use-cases', 'faq'];

  const observerOpts = { rootMargin: '-20% 0px -70% 0px', threshold: 0 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          const href = l.getAttribute('href');
          l.classList.toggle('active', href === `#${id}` || href === `/#${id}`);
          l.toggleAttribute('aria-current', href === `#${id}` || href === `/#${id}`);
        });
      }
    });
  }, observerOpts);

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href').replace(/^\//, ''); // handle /#id
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
          // Close mobile menu
          document.getElementById('mobileMenu').classList.remove('open');
          document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
        }
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

  // Dropdown ARIA handling
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
      dropdownToggle.setAttribute('aria-expanded', !expanded);
    });
  }
})();
