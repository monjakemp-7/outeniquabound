import type { FitNote as FitCopy } from "@/lib/fit";

export function FitNote({ note }: { note: FitCopy }) {
  return (
    <div className="border border-mountain/15 bg-sand p-4">
      <p className="stamp text-forest">{note.kicker}</p>
      <p className="mt-3 font-serif text-sm leading-relaxed text-mountain/75">
        {note.model}
      </p>
      <p className="mt-2 font-serif text-sm leading-relaxed text-mountain/80">
        {note.fit}
      </p>
    </div>
  );
}
