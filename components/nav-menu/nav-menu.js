// nav-menu.js
import rawHTML from './nav-menu.html?raw';

class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = rawHTML;

    const template = templateWrapper.querySelector('template');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        console.log('Navigating to:', e.target.href);
      });
    });
  }
}

customElements.define('nav-menu', NavMenu);
