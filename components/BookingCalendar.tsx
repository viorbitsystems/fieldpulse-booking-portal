"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const DOW_LABELS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const TODAY_MONTH = 4; // May (0-indexed)
const TODAY_DAY = 27;
const YEAR = 2026;

function buildGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = new Array(firstDow).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

interface BookingCalendarProps {
  selectedDate: number | null;
  onSelectDate: (date: number) => void;
}

export function BookingCalendar({ selectedDate, onSelectDate }: BookingCalendarProps) {
  const [displayMonth, setDisplayMonth] = useState(4); // May

  const grid = buildGrid(YEAR, displayMonth);

  function prev() { setDisplayMonth((m) => (m === 0 ? 11 : m - 1)); }
  function next() { setDisplayMonth((m) => (m === 11 ? 0 : m + 1)); }

  return (
    <div className="p-6">
      {/* Month header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-neutral-900 font-medium" style={{ fontSize: 17 }}>
          {MONTH_NAMES[displayMonth]} {YEAR}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="flex items-center justify-center bg-neutral-100 hover:bg-[#e0e0e0] border border-neutral-200 rounded-lg text-neutral-500 transition-colors duration-150"
            style={{ width: 30, height: 30 }}
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center bg-neutral-100 hover:bg-[#e0e0e0] border border-neutral-200 rounded-lg text-neutral-500 transition-colors duration-150"
            style={{ width: 30, height: 30 }}
          >
            <ChevronRight size={14} />
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

          const today = displayMonth === TODAY_MONTH && day === TODAY_DAY;
          const selected = day === selectedDate;

          return (
            <div key={i} className="flex items-center justify-center">
              <span
                onClick={() => onSelectDate(day)}
                className={clsx(
                  "flex items-center justify-center p-[7px] min-w-[30px] text-center leading-none text-[14px]",
                  selected && "bg-brand-navy text-white font-semibold rounded-[6px]",
                  !selected && today && "border border-[#1a2e4a] text-neutral-900 rounded-[6px] cursor-pointer",
                  !selected && !today && "text-neutral-900 rounded-[6px] cursor-pointer hover:bg-neutral-100"
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
