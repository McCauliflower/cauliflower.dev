// head.js
import rawHTML from './head.html?raw';

class HeadComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const templateWrapper = document.createElement('div');
    templateWrapper.innerHTML = rawHTML;

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

customElements.define('head', HeadComponent);
