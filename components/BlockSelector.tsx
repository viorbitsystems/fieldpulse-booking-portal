"use client";

import clsx from "clsx";

type Window = "morning" | "afternoon" | "evening";

const BLOCKS: Record<Window, { id: string; label: string; availability: string }[]> = {
  morning: [
    { id: "8 – 10 am",   label: "8 – 10 am",   availability: "2 slots available" },
    { id: "10 am – 12 pm", label: "10 am – 12 pm", availability: "1 slot available"  },
  ],
  afternoon: [
    { id: "12 – 2 pm", label: "12 – 2 pm", availability: "3 slots available" },
    { id: "2 – 4 pm",  label: "2 – 4 pm",  availability: "2 slots available" },
    { id: "4 – 5 pm",  label: "4 – 5 pm",  availability: "1 slot available"  },
  ],
  evening: [
    { id: "5 – 7 pm", label: "5 – 7 pm", availability: "1 slot available" },
    { id: "7 – 8 pm", label: "7 – 8 pm", availability: "2 slots available" },
  ],
};

interface BlockSelectorProps {
  selectedWindow: Window;
  selectedBlock: string | null;
  onSelectBlock: (block: string) => void;
}

export function BlockSelector({ selectedWindow, selectedBlock, onSelectBlock }: BlockSelectorProps) {
  const blocks = BLOCKS[selectedWindow];
  const cols = selectedWindow === "afternoon" ? "grid-cols-3" : "grid-cols-2";

  return (
    <div style={{ marginTop: 16 }}>
      <p
        className="uppercase text-neutral-400 font-medium tracking-[0.08em]"
        style={{ fontSize: 10, marginBottom: 10 }}
      >
        Choose a 2-hour block
      </p>

      <div className={clsx("grid gap-2", cols)}>
        {blocks.map(({ id, label, availability }) => {
          const active = selectedBlock === id;
          return (
            <button
              key={id}
              onClick={() => onSelectBlock(id)}
              className={clsx(
                "flex flex-col items-start rounded-xl border cursor-pointer text-left transition-colors px-[14px] py-3",
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
