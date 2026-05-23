interface PortalHeaderProps {
  selectedDate: number | null;
  selectedWindow: string | null;
  selectedBlock: string | null;
}

export function PortalHeader({ selectedDate, selectedWindow, selectedBlock }: PortalHeaderProps) {
  // Determine current step index (1-indexed)
  // Step 8 = all complete (all navy, no green)
  const step =
    selectedDate && selectedWindow && selectedBlock ? 8 :
    selectedDate && selectedWindow               ? 7 :
    selectedDate                                 ? 6 :
                                                   5;

  const label = `step ${Math.min(step, 7)} of 7`;

  function segmentClass(s: number): string {
    if (s < step)  return "bg-brand-navy";
    if (s === step) return "bg-brand-green";
    return "bg-neutral-200";
  }

  return (
    <div
      className="h-16 w-full border-b border-[#ebebeb] bg-white flex items-center justify-between"
      style={{ padding: "14px 24px" }}
    >
      {/* Left: brand + divider + company name */}
      <div className="flex items-center gap-2">
        <span className="text-brand-coral font-bold tracking-[0.08em]" style={{ fontSize: 13 }}>KNOX</span>
        <div className="w-px bg-[#e0e0e0]" style={{ height: 16 }} />
        <span className="text-neutral-900 font-medium" style={{ fontSize: 14 }}>Knox Plumbing</span>
      </div>

      {/* Right: progress segments + label */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <div
              key={s}
              className={`${segmentClass(s)} transition-colors duration-300`}
              style={{ width: 28, height: 3, borderRadius: 2 }}
            />
          ))}
        </div>
        <span className="text-neutral-500" style={{ fontSize: 11 }}>{label}</span>
      </div>
    </div>
  );
}
