export default function AppLink({
  to,
  text,
  icon: Icon,
  index,
}: {
  to: string;
  text: string;
  icon: any;
  index: number;
}) {
  return (
    <a href={to}>
      <div
        className="card bg-base-200 hover:bg-base-300 border border-base-300 hover:border-[#2af4c2] transition-all duration-300 cursor-pointer group"
        style={{
          animation: `fadeInUp 0.5s ease-out ${index * 0.05}s both`,
        }}
      >
        <div className="card-body items-center text-center p-6">
          <div className="p-4 rounded-2xl bg-[#2af4c2]/10 text-#2af4c2 group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} strokeWidth={2} />
          </div>
          <h3 className="card-title text-base mt-2">{text}</h3>
        </div>
      </div>
    </a>
  );
}
