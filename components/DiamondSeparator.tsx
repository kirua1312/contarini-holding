export default function DiamondSeparator() {
  return (
    <div
      className="flex w-full max-w-52 items-center justify-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-navy" />
      <span className="text-[0.6rem] leading-none text-navy">♦</span>
      <span className="h-px flex-1 bg-navy" />
    </div>
  );
}
