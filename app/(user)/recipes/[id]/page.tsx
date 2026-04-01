"use client";
import { use, useState, useRef, useEffect } from "react";
import { useRecipes } from "@/hooks/useRecipe";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  HeartIcon,
  ShareIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Author {
  fullName: string;
  username: string;
  email: string;
  userId: string;
  _id: string;
}
interface Instruction {
  step: number;
  instruction: string;
  _id: string;
}
interface Recipe {
  _id: string;
  title: string;
  description: string;
  author: Author;
  ingredients: string[];
  instructions: Instruction[];
  tags: string[];
  difficulty: string;
  images: string[];
  lovedCount: number;
  savedCount: number;
  createdAt: string;
  updatedAt: string;
}

/* ─────────────────────────────────────────────
   Difficulty config
───────────────────────────────────────────── */
const DIFF: Record<string, { label: string; cls: string }> = {
  beginner: {
    label: "Beginner",
    cls: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 ring-emerald-200 dark:ring-emerald-800",
  },
  easy: {
    label: "Easy",
    cls: "text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 ring-sky-200 dark:ring-sky-800",
  },
  medium: {
    label: "Medium",
    cls: "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 ring-amber-200 dark:ring-amber-800",
  },
  advance: {
    label: "Advanced",
    cls: "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 ring-rose-200 dark:ring-rose-800",
  },
};

/* ─────────────────────────────────────────────
   useDragScroll hook
───────────────────────────────────────────── */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const s = useRef({
    down: false,
    startX: 0,
    scrollLeft: 0,
    velX: 0,
    lastX: 0,
    raf: 0,
    dragged: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const px = (e: MouseEvent | TouchEvent) =>
      (e as MouseEvent).pageX ?? (e as TouchEvent).touches?.[0]?.pageX ?? 0;

    const down = (e: MouseEvent | TouchEvent) => {
      const r = s.current;
      r.down = true;
      r.dragged = false;
      r.startX = px(e) - el.offsetLeft;
      r.scrollLeft = el.scrollLeft;
      r.lastX = px(e);
      r.velX = 0;
      cancelAnimationFrame(r.raf);
      el.style.cursor = "grabbing";
    };
    const move = (e: MouseEvent | TouchEvent) => {
      const r = s.current;
      if (!r.down) return;
      const x = px(e) - el.offsetLeft;
      const delta = x - r.startX;
      if (Math.abs(delta) > 5) r.dragged = true;
      r.velX = px(e) - r.lastX;
      r.lastX = px(e);
      el.scrollLeft = r.scrollLeft - delta;
    };
    const up = () => {
      const r = s.current;
      if (!r.down) return;
      r.down = false;
      el.style.cursor = "grab";
      const glide = () => {
        if (Math.abs(r.velX) < 0.6) return;
        el.scrollLeft -= r.velX;
        r.velX *= 0.91;
        r.raf = requestAnimationFrame(glide);
      };
      glide();
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseup", up);
    el.addEventListener("mouseleave", up);
    el.addEventListener("touchstart", down, { passive: true });
    el.addEventListener("touchmove", move, { passive: true });
    el.addEventListener("touchend", up);
    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseup", up);
      el.removeEventListener("mouseleave", up);
      el.removeEventListener("touchstart", down);
      el.removeEventListener("touchmove", move);
      el.removeEventListener("touchend", up);
    };
  }, []);

  const wasDragging = () => s.current.dragged;
  return { ref, wasDragging };
}

/* ─────────────────────────────────────────────
   Step card
───────────────────────────────────────────── */
function StepCard({
  step,
  instruction,
  done,
  total,
  onToggle,
  wasDragging,
}: {
  step: number;
  instruction: string;
  done: boolean;
  total: number;
  onToggle: () => void;
  wasDragging: () => boolean;
}) {
  return (
    <div
      onClick={() => {
        if (!wasDragging()) onToggle();
      }}
      style={{
        scrollSnapAlign: "start",
        minHeight: 180,
        width: 248,
        flexShrink: 0,
      }}
      className={`rounded-3xl p-5 border select-none transition-all duration-300 cursor-pointer active:scale-[0.96] ${
        done
          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900"
          : "bg-white dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-300 ${
            done
              ? "bg-emerald-500 text-white scale-110"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
          }`}
        >
          {done ? <CheckIcon /> : step}
        </div>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-xl ${
            done
              ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600"
          }`}
        >
          {done ? "Done" : `${step} of ${total}`}
        </span>
      </div>
      <p
        className={`text-[10px] uppercase tracking-widest font-bold mb-2 ${
          done ? "text-emerald-500" : "text-neutral-300 dark:text-neutral-700"
        }`}
      >
        Step {step}
      </p>
      <p
        className={`text-sm leading-relaxed transition-all duration-200 ${
          done
            ? "line-through text-neutral-400 dark:text-neutral-600"
            : "text-neutral-700 dark:text-neutral-300"
        }`}
      >
        {instruction}
      </p>
      <p
        className={`text-[10px] font-medium mt-4 ${
          done
            ? "text-emerald-400 dark:text-emerald-600"
            : "text-neutral-300 dark:text-neutral-700"
        }`}
      >
        {done ? "Tap to undo" : "Tap to mark done"}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Skeleton loader
───────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-pulse space-y-4">
      <div className="h-4 w-32 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      <div
        className="rounded-3xl bg-neutral-200 dark:bg-neutral-800"
        style={{ aspectRatio: "4/3" }}
      />
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-1 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
            style={{ aspectRatio: "1" }}
          />
        ))}
      </div>
      <div className="h-10 w-48 rounded-2xl bg-neutral-200 dark:bg-neutral-800" />
      <div className="h-4 w-64 rounded-full bg-neutral-200 dark:bg-neutral-800" />
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-20 rounded-2xl bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Recipe Detail UI
───────────────────────────────────────────── */
function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [loved, setLoved] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { ref: scrollRef, wasDragging } = useDragScroll();

  const toggleStep = (step: number) =>
    setCompletedSteps((prev) => {
      const n = new Set(prev);
      n.has(step) ? n.delete(step) : n.add(step);
      return n;
    });

  const toggleLove = () =>
    setLoved((p) => {
      return !p;
    });
  const toggleSave = () =>
    setSaved((p) => {
      return !p;
    });

  const initials = recipe.author.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const diff = DIFF[recipe.difficulty] ?? DIFF.advance;
  const progress = Math.round(
    (completedSteps.size / recipe.instructions.length) * 100,
  );
  const allDone = completedSteps.size === recipe.instructions.length;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0d0d0d] text-neutral-900 dark:text-neutral-100 antialiased">
      <style>{`.steps-rail::-webkit-scrollbar{display:none}.steps-rail{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      <div className=" mx-auto px-4 py-8 pb-24">
        {/* ── Nav ── */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeftIcon />
            Back
          </button>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-600 font-medium">
            <span>Recipes</span>
            <ArrowRightIcon />
            <span className="text-neutral-700 dark:text-neutral-300 truncate max-w-[140px]">
              {recipe.title}
            </span>
          </div>
        </div>

        {/* ── Hero ── */}
        <div
          className="relative mb-3 rounded-3xl overflow-hidden bg-neutral-200 dark:bg-neutral-800"
          style={{ aspectRatio: "4/3" }}
        >
          <Image
            src={recipe.images[activeImg]}
            alt={recipe.title}
            fill
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {/* difficulty */}
          <span
            className={`absolute top-4 left-4 text-[11px] font-semibold px-3 py-1 rounded-full ring-1 backdrop-blur-sm ${diff.cls}`}
          >
            {diff.label}
          </span>
          {/* actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            {(
              [
                {
                  fn: toggleLove,
                  on: loved,
                  ac: "bg-rose-500",
                  icon: <HeartIcon weight={loved ? "fill" : "bold"} />,
                },
                {
                  fn: toggleSave,
                  on: saved,
                  ac: "bg-violet-500",
                  icon: <BookmarkSimpleIcon weight={saved ? "fill" : "bold"} />,
                },
              ] as const
            ).map(({ fn, on, ac, icon }, i) => (
              <button
                key={i}
                onClick={fn}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-90 backdrop-blur-sm ${on ? `${ac} text-white` : "bg-black/25 text-white hover:bg-black/40"}`}
              >
                {icon}
              </button>
            ))}
          </div>
          {/* dot nav */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {recipe.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`rounded-full transition-all duration-300 ${i === activeImg ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </div>

        {/* ── Thumbnails ── */}
        <div className="flex gap-2 mb-8">
          {recipe.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              style={{ aspectRatio: "1" }}
              className={`flex-1 rounded-2xl overflow-hidden transition-all duration-200 ${
                i === activeImg
                  ? "ring-2 ring-neutral-900 dark:ring-white ring-offset-2 ring-offset-neutral-50 dark:ring-offset-[#0d0d0d]"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <Image
                src={img}
                alt=""
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* ── Title ── */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h1
            className="text-4xl font-black tracking-tight leading-none text-neutral-900 dark:text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {recipe.title}
          </h1>
          <button className="shrink-0 w-9 h-9 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mt-1">
            <ShareIcon />
          </button>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed mb-7">
          {recipe.description}
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed mb-5">
          Published by {recipe.author.fullName}
        </p>

        {/* ── Author ── */}
        <div className="flex items-center gap-4 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 p-4 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-violet-100 dark:bg-violet-950 flex items-center justify-center text-sm font-black text-violet-700 dark:text-violet-300 flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
              {recipe.author.fullName}
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-600 truncate">
              @{recipe.author.username} · {recipe.author.email}
            </p>
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {recipe.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 tracking-wide"
            >
              #{t}
            </span>
          ))}
          <span
            className={`text-xs font-semibold px-4 py-1.5 rounded-full ring-1 ${diff.cls}`}
          >
            {diff.label}
          </span>
        </div>

        {/* ── Ingredients ── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">
              Ingredients
            </h2>
            <span className="text-xs text-neutral-400 dark:text-neutral-600 font-medium">
              {recipe.ingredients.length} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {recipe.ingredients.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl px-4 py-3.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Instructions — drag scroll ── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-black text-neutral-900 dark:text-white tracking-tight">
              Instructions
            </h2>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-600">
              {completedSteps.size}/{recipe.instructions.length} done
            </span>
          </div>

          {/* progress */}
          <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-3 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[11px] text-neutral-300 dark:text-neutral-700 font-medium mb-4 select-none">
            drag to scroll · tap card to complete
          </p>

          {/* drag rail — bleed to screen edge */}
          <div
            ref={scrollRef}
            className="steps-rail flex gap-3 overflow-x-auto -mx-4 px-4 pb-2"
            style={{
              cursor: "grab",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling:
                "touch" as React.CSSProperties["WebkitOverflowScrolling"],
            }}
          >
            {recipe.instructions.map(({ step, instruction, _id }) => (
              <StepCard
                key={_id}
                step={step}
                instruction={instruction}
                done={completedSteps.has(step)}
                total={recipe.instructions.length}
                onToggle={() => toggleStep(step)}
                wasDragging={wasDragging}
              />
            ))}
            <div style={{ flexShrink: 0, width: 16 }} />
          </div>

          {allDone && (
            <div className="mt-4 rounded-3xl bg-emerald-500 px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 text-xl">
                🎉
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  All steps complete!
                </p>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Your {recipe.title} is ready to serve.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page — drop-in replacement
───────────────────────────────────────────── */
export default function SingleRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { singleRecipe } = useRecipes({ id });

  const recipe = singleRecipe?.data as Recipe | undefined;

  if (!recipe) return <Skeleton />;

  return <RecipeDetail recipe={recipe} />;
}
