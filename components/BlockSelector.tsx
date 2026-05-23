"use client";

import clsx from "clsx";

const BLOCKS = [
  { id: "8:00 – 10:00 am",      label: "8:00 – 10:00 am",      availability: "2 slots available" },
  { id: "10:00 am – 12:00 pm",  label: "10:00 am – 12:00 pm",  availability: "1 slot available"  },
];

interface BlockSelectorProps {
  selectedBlock: string | null;
  onSelectBlock: (block: string) => void;
}

export function BlockSelector({ selectedBlock, onSelectBlock }: BlockSelectorProps) {
  return (
    <div style={{ marginTop: 16 }}>
      <p
        className="uppercase text-neutral-400 font-medium tracking-[0.08em]"
        style={{ fontSize: 10, marginBottom: 10 }}
      >
        Choose a 2-hour block
      </p>

      <div className="grid grid-cols-2 gap-2">
        {BLOCKS.map(({ id, label, availability }) => {
          const active = selectedBlock === id;
          return (
            <button
              key={id}
              onClick={() => onSelectBlock(id)}
              className={clsx(
                "flex flex-col items-start rounded-xl border cursor-pointer text-left transition-colors",
                { "px-[14px] py-3": true },
                active
                  ? "border-brand-navy bg-[#f0f4f8]"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              )}
            >
              <span
                className={clsx("font-medium", active ? "text-brand-navy" : "text-neutral-900")}
                style={{ fontSize: 13 }}
              >
                {label}
              </span>
              <span className="text-neutral-500" style={{ fontSize: 11, marginTop: 3 }}>
                {availability}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
