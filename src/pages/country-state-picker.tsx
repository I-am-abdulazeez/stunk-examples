import {
  countriesChunk,
  Country,
  setCountry,
  states,
} from "@/store/country-state-store";
import { useAsyncChunk } from "stunk/react";

export default function CountryStatePicker() {
  const {
    data: countries,
    loading,
    // error
  } = useAsyncChunk(countriesChunk);
  const {
    data: _states,
    loading: stLoad,
    // error: stErr,
  } = useAsyncChunk(states);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[500px] flex justify-around bg-base-200 px-7.5 py-10">
        <select
          name="country"
          className="border border-slate-50 p-2.5 w-[200px]"
        >
          <option onSelect={() => setCountry({} as Country)}>
            Select a Country
          </option>
          {countries
            ? countries.map(({ code, name, emoji }, idx) => (
                <option
                  key={idx}
                  onSelect={() => (
                    console.log("yo"),
                    setCountry({ name, code })
                  )}
                >
                  {`${emoji} ${name}`}
                </option>
              ))
            : null}
          {loading ? <option>Loading...</option> : null}
        </select>

        <select name="city" className="border border-slate-50 p-2.5 w-[200px]">
          <option>Select a State</option>
          {_states
            ? _states.map(({ name }, idx) => <option key={idx}>{name}</option>)
            : null}
          {stLoad ? <option>Loading...</option> : null}
        </select>
      </div>
    </div>
  );
}
