
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

import { setupCounter } from './counterChunk';

import './style.css';


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript + Stunk</h1>
    <div class="card">
      <button id="countbtn" type="button">Click Me</button>
      <p id="counter"></p>
      <p id="double"></p>
    </div>
  </div>
`;

// Get the button element
const counterBtn = document.querySelector<HTMLButtonElement>('#countbtn');
const count = document.querySelector<HTMLParagraphElement>('#counter');
const doubledCount = document.querySelector<HTMLParagraphElement>('#double');


if (counterBtn && count && doubledCount) {
  setupCounter({ counterBtn, count, doubledCount })
}
