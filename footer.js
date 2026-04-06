/* ===========================
   Footer Component – footer.js
=========================== */
(function () {
  const year = new Date().getFullYear();

  const footerHTML = `
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="header-logo" style="text-decoration:none;" aria-label="Mobile Viewer Pro">
              <div class="logo-mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                  <rect x="5" y="2" width="14" height="20" rx="2"/>
                  <path d="M12 18h.01"/>
                </svg>
              </div>
              Mobile Viewer<span style="color:var(--accent-2)">Pro</span>
            </a>
            <p>The fastest, easiest way to view any website on any mobile device. Test responsive designs, preview layouts, and validate mobile experiences — all free, all in your browser.</p>
          </div>

          <div class="footer-col">
            <h5>Tool</h5>
            <ul>
              <li><a href="/#viewer">Mobile Viewer</a></li>
              <li><a href="/#features">Features</a></li>
              <li><a href="/#devices">Device Library</a></li>
              <li><a href="/mobile-device-detector">Mobile Device Detector</a></li>
              <li><a href="/image-resizer-compressor">Image Resizer & Compressor</a></li>
              <li><a href="/qr-code-generator">QR Generator</a></li>              
            </ul>
          </div>

          <div class="footer-col">
            <h5>Use Cases</h5>
            <ul>
              <li><a href="/#use-cases">For Developers</a></li>
              <li><a href="/#use-cases">For Designers</a></li>
              <li><a href="/#use-cases">For QA Teams</a></li>
              <li><a href="/#use-cases">For Marketers</a></li>
              <li><a href="/#use-cases">For SEO</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Resources</h5>
            <ul>             
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-use">Terms of Use</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; ${year} <a href="/">MobileViewer.pro</a>. All rights reserved.</p>
          <p>Built for developers, designers &amp; anyone who needs to <strong style="color:var(--text-2)">view websites on mobile</strong>.</p>
        </div>
      </div>
    </footer>
  `;

  document.getElementById('footer-root').innerHTML = footerHTML;
})();
