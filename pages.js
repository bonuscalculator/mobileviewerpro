/* ===========================
   pages.js – Shared inner-page logic
   TOC active states, scroll behavior,
   smooth section tracking
=========================== */
(function () {

  /* ─── Table of Contents Active State ─── */
  const tocLinks = document.querySelectorAll('.toc-list a');
  const headings = document.querySelectorAll('.article h2[id], .article h3[id]');

  if (tocLinks.length && headings.length) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tocLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    }, {
      rootMargin: '-15% 0px -75% 0px',
      threshold: 0
    });

    headings.forEach(h => headingObserver.observe(h));
  }

  /* ─── Smooth scroll for TOC links ─── */
  document.querySelectorAll('.toc-list a, .page-breadcrumb a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    }
  });

  /* ─── Entry animations for article sections ─── */
  const animTargets = document.querySelectorAll(
    '.article h2, .value-card, .asr-card, .team-card, .contact-info-card, .policy-intro'
  );
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });

  animTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = `opacity 0.4s ease ${(i % 5) * 50}ms, transform 0.4s ease ${(i % 5) * 50}ms`;
    animObserver.observe(el);
  });

  /* ─── Update header nav for inner pages ─── */
  // Wait for header to render then update links to point to homepage sections
  requestAnimationFrame(() => {
    const navLinks = document.querySelectorAll('.header-nav .nav-link, .mobile-menu .nav-link');
    const isInnerPage = !window.location.pathname.endsWith('index.html') &&
                        window.location.pathname !== '/' &&
                        window.location.pathname !== '';

    if (isInnerPage) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.setAttribute('href', 'index.html' + href);
        }
        link.classList.remove('active');
      });

      // Mark active by page
      const page = window.location.pathname.split('/').pop();
      const pageNavMap = {
        'about.html': null,
        'contact.html': null,
        'privacy-policy.html': null,
        'terms-of-use.html': null,
        'disclaimer.html': null
      };

      // Header Try Free button
      const tryFreeBtn = document.querySelector('.header-actions .btn-primary');
      if (tryFreeBtn) tryFreeBtn.setAttribute('href', 'index.html#viewer');

      const mobileTryFree = document.querySelector('.mobile-menu .btn-primary');
      if (mobileTryFree) mobileTryFree.setAttribute('href', 'index.html#viewer');
    }
  });

  /* ─── Read time estimator for articles ─── */
  const article = document.querySelector('.article');
  if (article) {
    const wordCount = article.innerText.trim().split(/\s+/).length;
    const readMins = Math.ceil(wordCount / 220);
    const metaArea = document.querySelector('.page-meta');
    if (metaArea && readMins > 1) {
      const readItem = document.createElement('div');
      readItem.className = 'page-meta-item';
      readItem.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        ${readMins} min read
      `;
      metaArea.appendChild(readItem);
    }
  }

})();
