import { chunk } from 'stunk';

import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

import './style.css';


const count = chunk(5);
const doubleCount = count.derive((value) => value * 2);

const userChunk = chunk({
  name: "Olamide",
  age: 30,
  email: "olamide@example.com",
});

userChunk.set({
  ...userChunk.get(),
  age: 30
})


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
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

// Get the button element
const counterButton = document.querySelector<HTMLButtonElement>('#countbtn')!;
const counter = document.querySelector<HTMLButtonElement>('#counter')!;
const double = document.querySelector<HTMLButtonElement>('#double')!;

if (counterButton) {
  count.subscribe((value) => {
    counter.textContent = `Count: ${value}`
  });
  doubleCount.subscribe((value) => {
    double.textContent = `Double: ${value}`
  });

  counterButton.addEventListener('click', () => {
    let curr_value = count.get()
    count.set(curr_value + 1)
  });

  // Initialize the button text
  count.set(0)
}
