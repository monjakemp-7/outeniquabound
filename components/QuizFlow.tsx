"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { CONTACT } from "@/lib/constants";
import {
  QUIZ_STEPS,
  kitAddNote,
  quizSummary,
  recommendKit,
  type QuizAnswers,
} from "@/lib/quiz";
import { variationIdForKit, type ShoppablePiece } from "@/lib/shoppable";

const APPAREL_SIZES = ["s", "m", "l", "xl"] as const;
const SOCK_SIZES = ["4-7", "8-12"] as const;

function emptyAnswers(): Partial<QuizAnswers> {
  return {};
}

export function QuizFlow({ shelf }: { shelf: ShoppablePiece[] }) {
  const { addItem } = useCart();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>(emptyAnswers);
  const [done, setDone] = useState(false);
  const [apparelSize, setApparelSize] = useState<string>("m");
  const [sockSize, setSockSize] = useState<string>("8-12");
  const [email, setEmail] = useState("");
  const [kitStatus, setKitStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [kitMessage, setKitMessage] = useState("");

  const complete = Boolean(
    answers.who && answers.weather && answers.distance && answers.vibe,
  );
  const current = QUIZ_STEPS[step];
  const kit = useMemo(() => {
    if (!complete) return [];
    return recommendKit(answers as QuizAnswers, shelf);
  }, [answers, complete, shelf]);

  function choose(value: string) {
    const key = current.key;
    const next = { ...answers, [key]: value };
    setAnswers(next);
    if (step < QUIZ_STEPS.length - 1) {
      setStep(step + 1);
      return;
    }
    setDone(true);
  }

  function restart() {
    setAnswers(emptyAnswers());
    setStep(0);
    setDone(false);
    setKitStatus("idle");
    setKitMessage("");
    setEmail("");
  }

  async function addKit() {
    if (!kit.length) return;
    setKitStatus("loading");
    setKitMessage("");
    const failed: string[] = [];
    for (const piece of kit) {
      const id = variationIdForKit(piece, apparelSize, sockSize);
      const result = await addItem(id, 1);
      if (!result.ok) failed.push(piece.name);
    }
    if (failed.length === kit.length) {
      setKitStatus("error");
      setKitMessage("Could not pack the kit. Open a piece and add it from there.");
      return;
    }
    if (failed.length) {
      setKitStatus("error");
      setKitMessage(`Packed most of it. Couldn’t add: ${failed.join(", ")}.`);
      return;
    }
    setKitStatus("done");
    setKitMessage("Packed in the cart.");
  }

  const mailto = useMemo(() => {
    if (!complete) return `mailto:${CONTACT.email}`;
    const summary = quizSummary(answers as QuizAnswers);
    const lines = [
      "Kit from the Start where you are quiz.",
      summary,
      "",
      ...kit.map((piece) => `${piece.name} — /product/${piece.slug}`),
      "",
      email ? `Write me at: ${email}` : "No email left — that’s fine.",
    ];
    const params = new URLSearchParams({
      subject: "Field Notes · quiz kit",
      body: lines.join("\n"),
    });
    return `mailto:${CONTACT.email}?${params.toString()}`;
  }, [answers, complete, email, kit]);

  if (!done) {
    return (
      <div>
        <p className="font-display text-sm tracking-[0.18em] text-mountain/50">
          {String(step + 1).padStart(2, "0")} / {String(QUIZ_STEPS.length).padStart(2, "0")}
        </p>
        <p className="mt-4 stamp text-forest">{current.kicker}</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">{current.title}</h2>
        <p className="mt-4 max-w-xl font-serif text-lg text-mountain/75">
          {current.support}
        </p>
        <div className="mt-8 grid gap-3">
          {current.options.map((option) => {
            const selected = answers[current.key] === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => choose(option.value)}
                className={`border px-4 py-4 text-left ${
                  selected
                    ? "border-earth bg-earth text-sand"
                    : "border-mountain/20 bg-sand hover:border-mountain"
                }`}
              >
                <span className="font-display text-2xl tracking-[0.08em]">
                  {option.label}
                </span>
                <span
                  className={`mt-1 block font-serif text-sm ${selected ? "text-sand/80" : "text-mountain/65"}`}
                >
                  {option.hint}
                </span>
              </button>
            );
          })}
        </div>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((n) => Math.max(0, n - 1))}
            className="mt-8 font-display tracking-[0.16em] text-earth hover:underline"
          >
            Back
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <p className="stamp text-sky">Your kit</p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl">Start where you are</h2>
      <p className="mt-4 max-w-xl font-serif text-lg text-mountain/75">
        {complete ? quizSummary(answers as QuizAnswers) : null} Packed from
        what’s on the shelf today.
      </p>

      {kit.length ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {kit.map((piece) => (
            <li key={piece.slug}>
              <Link
                href={`/product/${piece.slug}`}
                className="group block border border-mountain/15 hover:border-earth"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-mountain/10">
                  {piece.image ? (
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="(min-width: 640px) 40vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : null}
                </div>
                <div className="flex items-baseline justify-between gap-3 p-3">
                  <p className="font-display text-xl tracking-[0.06em]">
                    {piece.name}
                  </p>
                  {piece.price ? (
                    <p className="font-serif text-sm text-earth">{piece.price}</p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 border border-mountain/15 p-5 font-serif text-mountain/75">
          The shelf is quiet for that path right now.{" "}
          <Link href="/shop" className="text-earth underline underline-offset-4">
            Shop Baseline
          </Link>{" "}
          instead.
        </p>
      )}

      {kit.length ? (
        <div className="mt-10 border border-mountain/15 p-5">
          <p className="font-display text-2xl">Add the kit</p>
          <p className="mt-2 font-serif text-sm leading-relaxed text-mountain/70">
            {kitAddNote(kit)}
          </p>
          {kit.some((p) =>
            p.variations.some((v) => !/^(os|ns|4-7|8-12)$/i.test(v.size)),
          ) ? (
            <fieldset className="mt-4">
              <legend className="font-display text-sm tracking-[0.2em] text-forest">
                Hoodie &amp; tee size
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {APPAREL_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setApparelSize(size)}
                    className={`min-w-12 border px-3 py-2 font-display text-sm tracking-[0.14em] ${
                      apparelSize === size
                        ? "border-earth bg-earth text-sand"
                        : "border-mountain/25 bg-sand hover:border-mountain"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}
          {kit.some((p) =>
            p.variations.some((v) => /^(4-7|8-12)$/i.test(v.size)),
          ) ? (
            <fieldset className="mt-4">
              <legend className="font-display text-sm tracking-[0.2em] text-forest">
                Sock size
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {SOCK_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSockSize(size)}
                    className={`min-w-12 border px-3 py-2 font-display text-sm tracking-[0.14em] ${
                      sockSize === size
                        ? "border-earth bg-earth text-sand"
                        : "border-mountain/25 bg-sand hover:border-mountain"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>
          ) : null}
          <button
            type="button"
            onClick={() => void addKit()}
            disabled={kitStatus === "loading"}
            className="mt-5 w-full bg-earth px-6 py-3 font-display text-lg tracking-[0.18em] text-sand hover:bg-mountain disabled:opacity-60"
          >
            {kitStatus === "loading" ? "Packing…" : "Add kit to cart"}
          </button>
          {kitMessage ? (
            <p
              className={`mt-3 font-serif text-sm ${kitStatus === "error" ? "text-earth" : "text-forest"}`}
            >
              {kitMessage}{" "}
              {kitStatus === "done" ? (
                <Link href="/cart" className="underline underline-offset-4">
                  Open the cart
                </Link>
              ) : null}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-10 border border-mountain/15 p-5">
        <p className="stamp text-forest">Field notes</p>
        <h3 className="mt-3 font-display text-2xl">Leave the kit at the bench</h3>
        <p className="mt-2 font-serif text-sm leading-relaxed text-mountain/70">
          No mailing list on this page yet. This opens a mail to{" "}
          {CONTACT.email} with your kit. We’ll write back. Skip it if you’d
          rather just shop.
        </p>
        <label className="mt-4 block font-serif text-sm text-mountain/70">
          Your email (optional)
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@place.co.za"
            className="mt-2 w-full border border-mountain/25 bg-sand px-3 py-2 font-serif text-mountain"
          />
        </label>
        <a
          href={mailto}
          className="mt-4 inline-block bg-mountain px-6 py-3 font-display tracking-[0.18em] text-sand hover:bg-earth"
        >
          Email this kit
        </a>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={restart}
          className="font-display tracking-[0.16em] text-earth hover:underline"
        >
          Start again
        </button>
        <Link
          href="/lookbook"
          className="font-display tracking-[0.16em] text-forest hover:underline"
        >
          On the hill lookbook →
        </Link>
      </div>
    </div>
  );
}
