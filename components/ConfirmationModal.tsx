"use client";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center"
      style={{ background: "rgba(15,20,30,0.45)", backdropFilter: "blur(3px)" }}
    >
      <div
        className="bg-white border border-[#e0e0e0] rounded-2xl overflow-hidden"
        style={{ width: 520 }}
      >
        {/* Header */}
        <div className="border-b border-[#ebebeb]" style={{ padding: "22px 24px 18px" }}>
          <p
            className="uppercase text-brand-green font-medium tracking-[0.1em]"
            style={{ fontSize: 10 }}
          >
            Review your request
          </p>
          <p className="text-neutral-900 font-medium" style={{ fontSize: 18, marginTop: 6 }}>
            Everything look right?
          </p>
          <p className="text-neutral-500" style={{ fontSize: 12, marginTop: 4 }}>
            Knox Plumbing will confirm your appointment within 2 hours
          </p>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2" style={{ padding: "0 24px", marginTop: 18 }}>
          {/* Left column */}
          <div style={{ paddingRight: 20, borderRight: "1px solid #f0f0f0" }}>
            <SummaryRow label="Service"  value="Plumbing · Routine"                  showEdit />
            <SummaryRow label="Issue"    value="Water pooling under kitchen sink"     showEdit />
            <SummaryRow label="Address"  value="1409 Falken Court, Rockwall TX"       showEdit isLast />
          </div>
          {/* Right column */}
          <div style={{ paddingLeft: 20 }}>
            <SummaryRow label="Preferred time" value="Tue, June 9 · 8:00 – 10:00 am" showEdit />
            <SummaryRow label="Contact"        value="Tyler · text preferred"         showEdit />
            <SummaryRow label="Confirmation"   value="Within 2 hours by text"         isLast />
          </div>
        </div>

        {/* SLA note */}
        <div
          className="text-neutral-600 bg-[#f4fdf7] rounded-lg"
          style={{
            margin: "14px 24px 0",
            borderLeft: "2px solid #4ade80",
            padding: "8px 12px",
            fontSize: 12,
          }}
        >
          No card required today. Payment is collected after your appointment is confirmed.
        </div>

        {/* Footer */}
        <div
          className="flex flex-col items-center"
          style={{ padding: "16px 24px 22px", gap: 10 }}
        >
          <button
            className="w-full bg-brand-navy text-white font-medium rounded-[10px]"
            style={{ fontSize: 14, padding: 12 }}
          >
            Confirm and submit
          </button>
          <button
            onClick={onClose}
            className="text-neutral-400 underline cursor-pointer bg-transparent border-none"
            style={{ fontSize: 12 }}
          >
            Back and edit
          </button>
        </div>
      </div>
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
      <p
        className="uppercase text-neutral-400 tracking-[0.07em]"
        style={{ fontSize: 10 }}
      >
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
