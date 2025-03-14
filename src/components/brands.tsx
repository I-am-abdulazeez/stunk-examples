import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";
import stunkLogo from "../assets/stunk.svg";

export default function Brands() {
  return (
    <div className="flex items-center justify-center mb-4">
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <a href="https://stunk.vercel.app" target="_blank">
        <img src={stunkLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}
