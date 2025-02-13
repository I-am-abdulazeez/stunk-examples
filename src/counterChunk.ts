import { chunk, computed } from "stunk";

type counterArgs = {
  counterBtn: HTMLButtonElement,
  count: HTMLParagraphElement;
  doubledCount: HTMLParagraphElement
}

export function setupCounter({ counterBtn, count, doubledCount }: counterArgs) {
  const counter = chunk(0);
  const doubledCounter = counter.derive((value) => value * 2);
  const isDisabled = counter.derive((value) => value >= 20)



  counter.subscribe((value) => {
    count.textContent = `Count: ${value}`
  });
  doubledCounter.subscribe((value) => {
    doubledCount.textContent = `Double: ${value}`
  });

  isDisabled.subscribe((disabled) => {
    counterBtn.disabled = disabled;
  });

  counterBtn.addEventListener('click', () => {
    counter.update((value) => value + 1);
  });

  const firstNameChunk = chunk('John');
  const lastNameChunk = chunk('Doe');
  const ageChunk = chunk(30);

  const fullInfoChunk = computed(
    [firstNameChunk, lastNameChunk, ageChunk],
    (firstName, lastName, age) => ({
      fullName: `${firstName} ${lastName}`,
      isAdult: age >= 18,
    })
  );

  firstNameChunk.set("Jane");
  ageChunk.set(10)

  console.log(fullInfoChunk.get()); // ✅ Prints: { fullName: "Jane Doe", isAdult: true }

}
