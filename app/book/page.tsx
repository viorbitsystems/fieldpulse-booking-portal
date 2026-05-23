"use client";

import { useState } from "react";
import { BookingCalendar } from "@/components/BookingCalendar";
import { RightColumnPlaceholder } from "@/components/RightColumnPlaceholder";
import { WindowSelector } from "@/components/WindowSelector";
import { BlockSelector } from "@/components/BlockSelector";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedWindow, setSelectedWindow] = useState<"morning" | "afternoon" | "evening" | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleSelectDate(date: number) {
    setSelectedDate(date);
    setSelectedWindow(null);
    setSelectedBlock(null);
  }

  function handleSelectWindow(w: "morning" | "afternoon" | "evening") {
    setSelectedWindow(w);
    setSelectedBlock(null);
  }

  const canReview = !!(selectedDate && selectedWindow && selectedBlock);

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex items-start justify-center py-10">
      <div className="relative w-full max-w-[780px] bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden">

        {/* PortalHeader */}
        <div className="h-16 w-full border-b border-[#ebebeb] bg-white flex items-center justify-between" style={{ padding: '14px 24px' }}>
          <div className="flex items-center gap-2">
            <span className="text-brand-coral font-bold tracking-[0.08em]" style={{ fontSize: 13 }}>KNOX</span>
            <div className="w-px bg-[#e0e0e0]" style={{ height: 16 }} />
            <span className="text-neutral-900 font-medium" style={{ fontSize: 14 }}>Knox Plumbing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  className={s <= 4 ? 'bg-brand-navy' : s === 5 ? 'bg-brand-green' : 'bg-neutral-200'}
                  style={{ width: 28, height: 3, borderRadius: 2 }}
                />
              ))}
            </div>
            <span className="text-neutral-500" style={{ fontSize: 11 }}>step 5 of 7</span>
          </div>
        </div>

        {/* StepMeta */}
        <div className="w-full border-b border-[#ebebeb] bg-[#f9f9f9]" style={{ padding: '14px 24px' }}>
          <p className="text-neutral-900 font-medium" style={{ fontSize: 22 }}>Pick a time</p>
          <p className="text-neutral-500" style={{ fontSize: 13, marginTop: 2 }}>Plumbing · Routine</p>
        </div>

        {/* PortalBody */}
        <div className="flex min-h-[480px]">
          <div className="flex-1 border-r border-[#ebebeb]">
            <BookingCalendar selectedDate={selectedDate} onSelectDate={handleSelectDate} />
          </div>
          {selectedDate === null ? (
            <RightColumnPlaceholder />
          ) : (
            <div className="flex-1 p-6 bg-neutral-50">
              <WindowSelector
                selectedWindow={selectedWindow}
                onSelectWindow={handleSelectWindow}
              />
              {selectedWindow !== null && (
                <BlockSelector
                  selectedBlock={selectedBlock}
                  onSelectBlock={setSelectedBlock}
                />
              )}
            </div>
          )}
        </div>

        {/* PortalFooter */}
        <div
          className="w-full border-t border-[#ebebeb] bg-white flex items-center justify-between"
          style={{ padding: '12px 24px' }}
        >
          <span className="text-neutral-400" style={{ fontSize: 11 }}>
            Verified FieldPulse Business
          </span>
          <div className="flex items-center gap-4">
            <button className="text-neutral-500 cursor-pointer" style={{ fontSize: 13 }}>
              Back
            </button>
            <button
              disabled={!canReview}
              onClick={() => canReview && setShowModal(true)}
              className="font-medium rounded-full transition-colors"
              style={{
                fontSize: 13,
                padding: '8px 20px',
                ...(canReview
                  ? { background: '#1a2e4a', color: '#fff', cursor: 'pointer' }
                  : { background: '#ebebeb', color: '#bbb', cursor: 'not-allowed' }),
              }}
            >
              Review &rsaquo;
            </button>
          </div>
        </div>

        {/* Confirmation modal — overlays the portal card */}
        <ConfirmationModal isOpen={showModal} onClose={() => setShowModal(false)} />

      </div>
    </div>
  );
}
