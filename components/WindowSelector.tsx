"use client";

import { Sunrise, Sun, Moon } from "lucide-react";
import clsx from "clsx";

type Window = "morning" | "afternoon" | "evening";

const WINDOWS: { id: Window; label: string; range: string; Icon: React.ElementType }[] = [
  { id: "morning",   label: "Morning",   range: "8am – 12pm", Icon: Sunrise  },
  { id: "afternoon", label: "Afternoon", range: "12pm – 5pm", Icon: Sun      },
  { id: "evening",   label: "Evening",   range: "5pm – 8pm",  Icon: Moon     },
];

interface WindowSelectorProps {
  selectedWindow: Window | null;
  onSelectWindow: (w: Window) => void;
}

export function WindowSelector({ selectedWindow, onSelectWindow }: WindowSelectorProps) {
  return (
    <div>
      <p
        className="uppercase text-neutral-400 font-medium tracking-[0.08em]"
        style={{ fontSize: 10, marginBottom: 10 }}
      >
        Choose a window
      </p>

      <div className="grid grid-cols-3 gap-2">
        {WINDOWS.map(({ id, label, range, Icon }) => {
          const active = selectedWindow === id;
          return (
            <button
              key={id}
              onClick={() => onSelectWindow(id)}
              className={clsx(
                "flex flex-col items-center border rounded-xl cursor-pointer transition-colors",
                { "py-3 px-2": true },
                active
                  ? "bg-brand-navy border-brand-navy"
                  : "bg-white border-neutral-200 hover:border-neutral-300"
              )}
            >
              <Icon
                size={20}
                className={clsx(active ? "text-white" : "text-neutral-400")}
                style={{ marginBottom: 6 }}
              />
              <span
                className={clsx("font-medium", active ? "text-white" : "text-neutral-900")}
                style={{ fontSize: 12 }}
              >
                {label}
              </span>
              <span
                className={clsx(active ? "text-white/60" : "text-neutral-500")}
                style={{ fontSize: 10, marginTop: 2 }}
              >
                {range}
              </span>
            </button>
          );
        })}
      </div>

      {/* SLA note */}
      <div
        className="bg-[#f4fdf7] text-neutral-600 rounded-lg"
        style={{
          borderLeft: "2px solid #4ade80",
          padding: "8px 12px",
          fontSize: 12,
          marginTop: 16,
        }}
      >
        We'll confirm your appointment within 2 hours
      </div>
    </div>
  );
}
