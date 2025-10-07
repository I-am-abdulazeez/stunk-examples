import GoBack from "@/components/shared/go-back";
import {
  countriesChunk,
  countryCode,
  setCountry,
  states,
  type State,
  setCity,
  pickerChunk,
  setState,
  validationResponse,
  validateAndSubmitAddress,
  clearValidationError,
} from "@/store/country-state-store";
import { ArrowRightIcon, InfoIcon, LoaderCircleIcon } from "lucide-react";
import { ChangeEvent, useMemo } from "react";
import { useAsyncChunk, useChunk } from "stunk/react";

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
  const [code, setCode] = useChunk(countryCode);
  const [state] = useChunk(pickerChunk, (ch) => ch.state);
  const [city] = useChunk(pickerChunk, (ch) => ch.city);
  const [[isLoading, error]] = useChunk(validationResponse);
  // const [isLoading] = useChunk(validationLoading);

  useMemo(() => {
    const country = countries?.find((c) => c.code == code);
    if (!country) return;
    setCountry({ name: country.name, code: country.code });
  }, [code]);

  const cities = useMemo<State["cities"]>(() => {
    if (!state) return [];
    const res = _states?.find((s) => s.name == state)?.cities || [];
    return res;
  }, [state]);

  function selectCountry(e: ChangeEvent) {
    if (loading) return;
    const selected = (e.target as HTMLSelectElement).value;
    setCode(selected);
    clearValidationError();
  }

  function selectState(e: ChangeEvent) {
    if (stLoad) return;
    const selected = (e.target as HTMLSelectElement).value;
    setState(selected);
    clearValidationError();
  }

  function selectCity(e: ChangeEvent) {
    const selected = (e.target as HTMLSelectElement).value;
    setCity(selected);
    clearValidationError();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex w-9/10 min-w-[320px] md:w-fit flex-col gap-5 bg-base-200 px-7.5 py-10">
        <div className="flex flex-col md:flex-row justify-around gap-5">
          <select
            disabled={isLoading}
            value={code}
            name="country"
            className="custom-select border border-slate-50 p-2.5 w-full md:w-[200px]"
            onChange={selectCountry}
          >
            <option className="bg-base-100 text-white" value={""}>
              Select a Country
            </option>
            {countries
              ? countries.map(({ code, name, emoji }, idx) => (
                  <option
                    className="bg-base-100 text-white"
                    key={idx}
                    value={code}
                  >
                    {`${emoji} ${name}`}
                  </option>
                ))
              : null}
            {loading ? (
              <option className="bg-base-100 text-white">Loading...</option>
            ) : null}
          </select>

          <select
            disabled={isLoading}
            value={state}
            name="state"
            className="custom-select border border-slate-50 p-2.5 w-full md:w-[200px]"
            onChange={selectState}
          >
            <option value={""} className="custom-select bg-base-100 text-white">
              Select a State
            </option>
            {_states
              ? _states.map(({ name }, idx) => (
                  <option className="bg-base-100 text-white" key={idx}>
                    {name}
                  </option>
                ))
              : null}
            {stLoad ? (
              <option className="bg-base-100 text-white">Loading...</option>
            ) : null}
          </select>

          <select
            disabled={isLoading}
            value={city}
            name="city"
            className="custom-select border border-slate-50 p-2.5 w-full md:w-[200px]"
            onChange={selectCity}
          >
            <option value={""} className="bg-base-100 text-white">
              Select a City
            </option>
            {cities.map((el, idx) => (
              <option value={el} className="bg-base-100 text-white" key={idx}>
                {el}
              </option>
            ))}
          </select>
        </div>

        {error.length ? (
          <div className="flex gap-2.5 items-center text-red-700">
            <InfoIcon />
            {error}
          </div>
        ) : null}

        <button
          className="cursor-pointer inline-flex justify-center gap-2.5 bg-[#2af4c2] text-black p-5"
          onClick={validateAndSubmitAddress}
        >
          {isLoading ? (
            <LoaderCircleIcon className="spin" />
          ) : (
            <>
              Submit
              <ArrowRightIcon />
            </>
          )}
        </button>
      </div>

      <div className="mt-6">
        <GoBack />
      </div>
    </div>
  );
}
