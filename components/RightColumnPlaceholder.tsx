import { Calendar } from "lucide-react";

export function RightColumnPlaceholder() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50">
      <div className="flex flex-col items-center gap-3">
        <Calendar size={32} className="text-neutral-300" />
        <p
          className="text-neutral-400 text-center"
          style={{ fontSize: 13, maxWidth: 180, lineHeight: 1.6 }}
        >
          Your available time windows will appear here after you pick a date
        </p>
      </div>
    </div>
  );
}
