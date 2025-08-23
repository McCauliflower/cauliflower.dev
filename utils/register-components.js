// example 
// // component-name.js

// import template from './component-name.html?raw';

// class ComponentName extends HTMLElement {
//   constructor() {
//     super();
//     const shadow = this.attachShadow({ mode: 'open' });
//     const tpl = document.createElement('template');
//     tpl.innerHTML = template;
//     shadow.appendChild(tpl.content.cloneNode(true));
//   }

//   connectedCallback() {
//     // Example: add events or run setup logic here
//     const root = this.shadowRoot;
//     root.querySelectorAll('[data-click]').forEach(el => {
//       el.addEventListener('click', () => {
//         console.log('Clicked:', el.dataset.click);
//       });
//     });
//   }
// }

// customElements.define('component-name', ComponentName);
