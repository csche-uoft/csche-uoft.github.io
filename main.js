// --- Dynamic Header Injection (Favicon/Apple Icon) ---
(function() {
  // Check if it already exists to avoid duplicates
  if (!document.querySelector("link[rel='apple-touch-icon']")) {
    const link = document.createElement('link');
    link.rel = 'apple-touch-icon';
    link.href = 'images/logochat.png';
    document.head.appendChild(link);
  }
})();

class CscheHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <div class="header-inner">
          <div class="logo-area">
            <a href="index.html">
              <img src="images/logochat.png" alt="CSChE Logo" class="logo" />
            </a>
            <div class="logo-text">
              <h1>CSChE</h1>
              <h2>U of Toronto Chapter</h2>
            </div>
          </div>
          
          <button class="menu-toggle" aria-label="Toggle Menu">☰</button>
          
          <nav class="main-nav">
            <ul>
              <li><a href="index.html">Home</a></li>
              <li class="has-dropdown">
                <a href="#">What We Do</a>
                <ul class="dropdown">
                  <li><a href="pd.html">Professional Development</a></li>
                  <li><a href="industry.html">Industry Mentorship</a></li>
                  <li><a href="outreach.html">Outreach Events</a></li>
                </ul>
              </li>
              <li><a href="ccec.html">CCEC</a></li>
              <li class="has-dropdown">
                <a href="#">Opportunities</a>
                <ul class="dropdown">
                  <li><a href="scholarships.html">Scholarships</a></li>
                  <li><a href="research.html">Research</a></li>
                  <li><a href="pey.html">PEY</a></li>
                </ul>
              </li>
              <li><a href="team.html">Meet the Team</a></li>
              <li><a href="contactus.html">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;

    this.initMobileLogic();
    this.highlightActivePage();
  }

  initMobileLogic() {
    const toggle = this.querySelector('.menu-toggle');
    const nav = this.querySelector('.main-nav');
    
    // Toggle menu
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.innerHTML = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scrolling when menu is open
    });

    // Mobile Dropdown Expand
    const dropdowns = this.querySelectorAll('.has-dropdown > a');
    dropdowns.forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          link.parentElement.classList.toggle('active');
        }
      });
    });
  }

  highlightActivePage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = this.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('href') === path) {
        link.classList.add('active');
        // If it's inside a dropdown, highlight the parent too
        if(link.closest('.dropdown')) {
          link.closest('.has-dropdown').querySelector('a').classList.add('active');
        }
      }
    });
  }
}

class CscheFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <p class="footer-text">Canadian Society for Chemical Engineering &mdash; University of Toronto Chapter</p>
        <p style="font-size: 0.8rem;">Wallberg Memorial Building, 184–200 College St, Toronto, ON</p>
        <div class="social-icons">
          <a href="https://instagram.com/csche_uoft" target="_blank" aria-label="Instagram"><img src="images/instagram.webp" alt="Instagram" /></a>
          <a href="https://www.linkedin.com/company/cscheuoft/" target="_blank" aria-label="LinkedIn"><img src="images/linkedin.webp" alt="LinkedIn" /></a>
        </div>
      </footer>
    `;
  }
}

customElements.define('csche-header', CscheHeader);
customElements.define('csche-footer', CscheFooter);