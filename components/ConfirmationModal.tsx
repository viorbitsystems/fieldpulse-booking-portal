"use client";

import { useState, useEffect } from "react";
import { Check, CalendarPlus } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export function ConfirmationModal({ isOpen, onClose, onReset }: ConfirmationModalProps) {
  const [step, setStep] = useState<"review" | "confirmed">("review");
  const [visible, setVisible] = useState(true);

  // Reset to review state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("review");
      setVisible(true);
    }
  }, [isOpen]);

  // Auto-reset 8 seconds after entering confirmed state
  useEffect(() => {
    if (step !== "confirmed") return;
    const timer = setTimeout(() => {
      onClose();
      onReset();
    }, 8000);
    return () => clearTimeout(timer);
  }, [step]);

  function handleConfirm() {
    setVisible(false);
    setTimeout(() => {
      setStep("confirmed");
      setVisible(true);
    }, 200);
  }

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center"
      style={{ background: "rgba(15,20,30,0.45)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden"
        style={{ width: 520 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          {step === "review" ? (
            <ReviewContent onConfirm={handleConfirm} onClose={onClose} />
          ) : (
            <ConfirmedContent />
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewContent({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Header */}
      <div className="border-b border-[#ebebeb]" style={{ padding: "22px 24px 18px" }}>
        <p className="text-neutral-900 font-medium" style={{ fontSize: 18 }}>
          Everything look right?
        </p>
        <p className="text-neutral-500" style={{ fontSize: 12, marginTop: 4 }}>
          Knox Plumbing will confirm your appointment within 2 hours
        </p>
      </div>

      {/* Body */}
      <div className="grid grid-cols-2" style={{ padding: "0 24px", marginTop: 18 }}>
        <div style={{ paddingRight: 20, borderRight: "1px solid #f0f0f0" }}>
          <SummaryRow label="Service"  value="Plumbing · Routine"              showEdit />
          <SummaryRow label="Issue"    value="Water pooling under kitchen sink" showEdit />
          <SummaryRow label="Address"  value="1409 Falken Court, Rockwall TX"   showEdit isLast />
        </div>
        <div style={{ paddingLeft: 20 }}>
          <SummaryRow label="Preferred time" value="Tue, June 9 · 8 – 10 am"  showEdit />
          <SummaryRow label="Contact"        value="Tyler · text preferred"     showEdit />
          <SummaryRow label="Confirmation"   value="Within 2 hours by text"     isLast />
        </div>
      </div>

      {/* SLA note */}
      <div
        className="text-neutral-600 bg-[#f4fdf7] rounded-lg border border-[#16a34a]"
        style={{ margin: "14px 24px 0", padding: "8px 12px", fontSize: 12 }}
      >
        No card required today. Keep an eye out for a text or email.
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center" style={{ padding: "16px 24px 22px", gap: 10 }}>
        <button
          onClick={onConfirm}
          className="w-full bg-brand-navy text-white font-medium rounded-[10px]"
          style={{ fontSize: 14, padding: 12 }}
        >
          Request Appointment
        </button>
        <button
          onClick={onClose}
          className="text-neutral-400 underline cursor-pointer bg-transparent border-none"
          style={{ fontSize: 12 }}
        >
          Back and edit
        </button>
      </div>
    </>
  );
}

function ConfirmedContent() {
  return (
    <div
      className="flex flex-col items-center"
      style={{ padding: "40px 32px" }}
    >
      {/* Checkmark circle */}
      <div
        className="flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          background: "#f4fdf7",
          border: "1.5px solid #4ade80",
          borderRadius: "50%",
          marginBottom: 20,
        }}
      >
        <Check size={24} color="#4ade80" />
      </div>

      {/* Headline */}
      <p
        className="text-neutral-900 font-medium text-center"
        style={{ fontSize: 22, marginBottom: 8 }}
      >
        You're all set
      </p>

      {/* Subtext */}
      <p
        className="text-neutral-500 text-center"
        style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 300, margin: "0 auto 20px" }}
      >
        Knox Plumbing will confirm your appointment within 2 hours. We'll reach out by text.
      </p>

      {/* Reference pill */}
      <div
        className="inline-flex items-center bg-neutral-100 border border-neutral-200"
        style={{ borderRadius: 999, padding: "6px 16px", marginBottom: 28 }}
      >
        <span className="text-neutral-700 font-medium" style={{ fontSize: 12 }}>
          Request #KP-2847
        </span>
      </div>

      {/* Add to calendar */}
      <button
        className="w-full bg-white border border-neutral-200 font-medium text-neutral-700 flex items-center justify-center rounded-[10px]"
        style={{ fontSize: 13, padding: 10, gap: 6, marginBottom: 10 }}
      >
        <CalendarPlus size={14} />
        Add to calendar
      </button>

      {/* Phone link */}
      <span
        className="text-neutral-400 text-center cursor-pointer"
        style={{ fontSize: 12 }}
      >
        Or call us: (214) 555-0182
      </span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  showEdit = false,
  isLast = false,
}: {
  label: string;
  value: string;
  showEdit?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        padding: "10px 0",
        borderBottom: isLast ? "none" : "0.5px solid #f4f4f4",
      }}
    >
      <p className="uppercase text-neutral-400 tracking-[0.07em]" style={{ fontSize: 10 }}>
        {label}
      </p>
      <div className="flex items-center justify-between" style={{ marginTop: 3 }}>
        <p className="text-neutral-900 font-medium" style={{ fontSize: 12 }}>
          {value}
        </p>
        {showEdit && (
          <span
            className="text-brand-navy underline cursor-pointer shrink-0"
            style={{ fontSize: 11, marginLeft: 8 }}
          >
            Edit
          </span>
        )}
      </div>
    </div>
  );
}
