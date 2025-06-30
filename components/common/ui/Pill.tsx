export default function Pill({
  text,
  variant,
  pillBg,
}: {
  text: string;
  variant?: "dark";
  pillBg?: string;
}) {
  return (
    <div className="rounded-full bg-gradient-to-r from-[#2E6BCE] via-[#D0DFF8] to-[#0043BE] p-0.5 w-fit mx-auto">
      <div
        style={{ backgroundColor: pillBg }}
        className="rounded-full px-3 py-2"
      >
        <h3 className="text-primary-400 font-medium text-sm">{text}</h3>
      </div>
    </div>
  );
}
