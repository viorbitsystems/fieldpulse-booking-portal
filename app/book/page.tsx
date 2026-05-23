"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { PortalHeader } from "@/components/PortalHeader";
import { BookingCalendar } from "@/components/BookingCalendar";
import { RightColumnPlaceholder } from "@/components/RightColumnPlaceholder";
import { WindowSelector } from "@/components/WindowSelector";

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
        <PortalHeader
          selectedDate={selectedDate}
          selectedWindow={selectedWindow}
          selectedBlock={selectedBlock}
        />

        {/* StepMeta */}
        <div className="w-full border-b border-[#ebebeb] bg-[#f9f9f9]" style={{ padding: '14px 24px' }}>
          <p className="text-neutral-900 font-medium" style={{ fontSize: 22 }}>When works best for you?</p>
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
            <div className="flex-1 p-6 bg-white flex flex-col h-full">
              <WindowSelector
                selectedWindow={selectedWindow}
                onSelectWindow={handleSelectWindow}
                selectedBlock={selectedBlock}
                onSelectBlock={setSelectedBlock}
              />
            </div>
          )}
        </div>

        {/* PortalFooter */}
        <div
          className="w-full border-t border-[#ebebeb] bg-white flex items-center justify-between"
          style={{ padding: '12px 24px' }}
        >
          <span className="flex items-center text-neutral-400" style={{ fontSize: 11, gap: 5 }}>
            <Lock size={12} color="#bbb" />
            Verified FieldPulse Business
          </span>
          <div className="flex items-center gap-4">
            <button className="text-neutral-500 cursor-pointer" style={{ fontSize: 13 }}>
              Back
            </button>
            <button
              disabled={!canReview}
              onClick={() => canReview && setShowModal(true)}
              className={
                canReview
                  ? "font-medium rounded-xl transition-colors bg-brand-navy text-white cursor-pointer hover:bg-[#243d61] active:bg-[#142236]"
                  : "font-medium rounded-xl transition-colors bg-[#ebebeb] text-[#bbb] cursor-not-allowed"
              }
              style={{ fontSize: 13, padding: '8px 20px' }}
            >
              Review &rsaquo;
            </button>
          </div>
        </div>

        {/* Confirmation modal — overlays the portal card */}
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onReset={() => {
            setSelectedDate(null);
            setSelectedWindow(null);
            setSelectedBlock(null);
            setShowModal(false);
          }}
        />

      </div>
    </div>
  );
}
