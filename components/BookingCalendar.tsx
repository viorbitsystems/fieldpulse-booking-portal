"use client";

import clsx from "clsx";

const DOW_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const UNAVAILABLE = new Set([5, 12, 19, 26]);
const TODAY = 2;
const START_DOW = 1; // June 1, 2026 = Monday
const DAYS_IN_MONTH = 30;

function buildGrid(): (number | null)[] {
  const cells: (number | null)[] = new Array(START_DOW).fill(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const grid = buildGrid();

interface BookingCalendarProps {
  selectedDate: number | null;
  onSelectDate: (date: number) => void;
}

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  return (
    <div className="p-6">
      {/* Month header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-neutral-900 font-medium" style={{ fontSize: 17 }}>
          June 2026
        </span>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-500"
            style={{ width: 30, height: 30 }}
          >
            ‹
          </button>
          <button
            className="flex items-center justify-center bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-500"
            style={{ width: 30, height: 30 }}
          >
            ›
          </button>
        </div>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 pb-2">
        {DOW_LABELS.map((label, i) => (
          <div
            key={i}
            className="text-center text-neutral-400 uppercase tracking-[0.06em]"
            style={{ fontSize: 10 }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7">
        {grid.map((day, i) => {
          if (day === null) return <div key={i} />;

          const unavailable = UNAVAILABLE.has(day);
          const today = day === TODAY;
          const selected = day === selectedDate;

          return (
            <div key={i} className="flex items-center justify-center">
              <span
                onClick={() => !unavailable && onSelectDate(day)}
                className={clsx(
                  "flex items-center justify-center p-[7px] min-w-[30px] text-center leading-none",
                  { "text-[14px]": true },
                  selected && "bg-brand-navy text-white font-semibold rounded-full",
                  !selected && unavailable && "text-neutral-300 cursor-default",
                  !selected && !unavailable && today && "bg-neutral-100 font-medium text-neutral-900 rounded-[6px] cursor-pointer",
                  !selected && !unavailable && !today && "text-neutral-900 rounded-[6px] cursor-pointer hover:bg-neutral-100"
                )}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
