import { asyncChunk, chunk, computed, select } from "stunk";
import { useAsyncChunk, useChunk } from "stunk/react";

export type Country = {
  name: string;
  code: string;
};

export type State = {
  name: string;
  cities: string[];
};

type WithEmoji = Country & { emoji: string };

export type Address = {
  country: Country;
  city: string;
};

export const pickerChunk = chunk<Address>({} as Address);
export const country = select(pickerChunk, (ch) => ch.country);

export const countriesChunk = asyncChunk<WithEmoji[]>(() =>
  fetch(
    "https://cdn.jsdelivr.net/gh/Yerikmiller/Countries-States-Cities-JSON@latest/all_only_countries.json",
  ).then(async (res) => {
    if (!res.ok) throw new Error("Error loading countries!!!");
    const countryArr = (await res.json()) as {
      name: string;
      iso3: string;
      emoji: string;
    }[];

    return countryArr.map(({ emoji, iso3, name }) => {
      return {
        name,
        code: iso3,
        emoji,
      };
    });
  }),
);

export const states = asyncChunk<State[]>(async () => {
  const code = country.get()?.code;
  if (!code) return Promise.resolve([]);

  const res = await fetch(
    `https://cdn.jsdelivr.net/gh/Yerikmiller/Countries-States-Cities-JSON@latest/countries/${code}.json`,
  );
  if (!res.ok) throw new Error("Error loading states!!!");
  const countryArr = (await res.json()) as {
    states: State[];
  };
  return countryArr.states.map(({ name, cities }) => {
    return {
      name,
      cities,
    };
  });
});

// pickerChunk.derive(({ country: {code} })=>{
//    // code

// })

// export function useStates(): string[] {
//   const {data, loading} = useAsyncChunk(states);

//   return [];
// }

// export function useCountries() {
//   // const countries = useChunk();
//   return useAsyncChunk(countriesChunk);
// }

export function setCountry(country: Country) {
  const state = { ...pickerChunk.get() };

  state.country = country;
  state.city = "";
  pickerChunk.set(state);
  states.reload();
}
