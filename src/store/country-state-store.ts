import { delay } from "@/utils";
import { asyncChunk, chunk } from "stunk";

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
  state: string;
};

export type ValidationResponse = [loading: boolean, error: string];

export const pickerChunk = chunk<Address>({
  country: { code: "", name: "" } as Country,
  city: "",
  state: "",
});
export const countryCode = chunk<string>("");
export const stateChunk = chunk<string>("");
// export const validationResponse = chunk<ValidationResponse>([true, ""])
export const validationResponse = chunk<ValidationResponse>([false, ""]);
export const validationLoading = chunk(false);

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
  const code = countryCode.get();
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

export function setCountry(country: Country) {
  pickerChunk.set({ country, state: "", city: "" });
  states.reload();
}

export function setState(_state: string) {
  pickerChunk.set({ ...pickerChunk.get(), state: _state, city: "" });
}

export function setCity(city: string) {
  pickerChunk.set({ ...pickerChunk.get(), city });
}

export async function validateAndSubmitAddress() {
  const fields: string[] = [];
  validationResponse.set([true, validationResponse.get()[1]]);
  try {
    const state = pickerChunk.get();

    if (
      state.country?.code?.trim() == "" ||
      state.country?.name?.trim() == ""
    ) {
      fields.push("Country");
    }

    if (state.state.trim() == "") {
      fields.push("State");
    }

    if (state.city.trim() == "") {
      fields.push("City");
    }
    await delay(1000); // Simulate network delay
    if (fields.length == 0) {
      validationResponse.set([validationResponse.get()[0], ""]);
    } else {
      validationResponse.set([
        validationResponse.get()[0],
        `${fields.join(", ")} field${fields.length == 1 ? " is" : "s are"} required!!!`,
      ]);
    }
  } finally {
    validationResponse.set([false, validationResponse.get()[1]]);
  }

  if (!fields.length) {
    alert(JSON.stringify(pickerChunk.get()));
  }
}

export function clearValidationError() {
  validationResponse.set([false, ""]);
}
