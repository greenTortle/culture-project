import { Info } from "lucide-react";

export function InfoTip({ text }: { text: string }) {
  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        className="peer inline-flex size-7 items-center justify-center rounded-full text-muted hover:bg-raised hover:text-fg"
        aria-label="About this setting"
      >
        <Info className="size-3.5" strokeWidth={1.75} />
      </button>
      <span className="pointer-events-none absolute left-0 top-8 z-30 hidden w-64 rounded-md border border-border bg-raised px-3 py-2 text-xs leading-relaxed text-fg shadow-lg peer-hover:block peer-focus:block">
        {text}
      </span>
    </span>
  );
}
