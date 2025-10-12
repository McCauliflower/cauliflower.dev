// nav-menu.js
import rawHTML from './index.html?raw';
import rawCSS from  './nav-menu.css?raw';

class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Inject HTML
    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = rawHTML;
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = rawCSS;
    this.shadowRoot.appendChild(style);

    const template = templateWrapper.querySelector('template');
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      console.log('templateWrapper', templateWrapper);
      console.log('template', template);
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
