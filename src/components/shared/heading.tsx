export default function Heading({ text }: { text: string }) {
  return (
    <div className="text-center my-8">
      <h1 className="text-4xl md:text-5xl font-black mb-3">{text}</h1>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-8 bg-[#2af4c2]/30 rounded-full"></div>
        <div className="h-1 w-16 bg-[#2af4c2] rounded-full"></div>
        <div className="h-1 w-8 bg-[#2af4c2]/30 rounded-full"></div>
      </div>
    </div>
  );
}
