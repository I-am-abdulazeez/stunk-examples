export default function Heading({ text }: { text: string }) {
  return (
    <div className="text-center mb-3">
      <h1 className="text-4xl font-bold text-indigo-300 mb-2">{text}</h1>
      <div className="h-1 w-24 bg-indigo-500 mx-auto rounded"></div>
    </div>
  );
}
