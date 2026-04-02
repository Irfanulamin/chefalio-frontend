"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/thumbs";
// @ts-ignore
import "swiper/css/free-mode";
import { useState } from "react";

export function ImageCarousel({
  images,
  title,
  difficulty,
}: {
  images: string[];
  title: string;
  difficulty: string;
}) {
  const DIFF: Record<string, { label: string; dot: string; pill: string }> = {
    beginner: {
      label: "Beginner",
      dot: "bg-emerald-400",
      pill: "text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 ring-emerald-300 dark:ring-emerald-700",
    },
    easy: {
      label: "Easy",
      dot: "bg-sky-400",
      pill: "text-sky-800 dark:text-sky-200 bg-sky-100 dark:bg-sky-900/60 ring-sky-300 dark:ring-sky-700",
    },
    medium: {
      label: "Medium",
      dot: "bg-amber-400",
      pill: "text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/60 ring-amber-300 dark:ring-amber-700",
    },
    advance: {
      label: "Advanced",
      dot: "bg-rose-400",
      pill: "text-rose-800 dark:text-rose-200 bg-rose-100 dark:bg-rose-900/60 ring-rose-300 dark:ring-rose-700",
    },
  };
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const diff = DIFF[difficulty] ?? DIFF.advance;

  return (
    <div className="mb-10">
      {/* White card — visually pops off the parchment page bg */}
      <div className="bg-[#eeeae4] dark:bg-[#1a1714] text-[#1a1714] dark:text-[#f0ede8] rounded-3xl p-3 shadow-sm border border-[#e2ddd8] dark:border-[#35312c]">
        {/* Main image */}
        <div className="relative rounded-2xl overflow-hidden w-full aspect-square mb-3">
          <Swiper
            modules={[Pagination, Thumbs]}
            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
            pagination={{
              clickable: true,
              bulletClass:
                "swiper-pagination-bullet !bg-white/50 !w-1.5 !h-1.5 !rounded-full !transition-all !duration-300",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !w-5 !h-1.5 !rounded-full",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            className="w-full h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <Image
                    src={img}
                    alt={`${title} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}

            {/* Difficulty badge */}
            <span
              className={`absolute top-3 left-3 z-10 text-[11px] font-bold px-3 py-1.5 rounded-xl ring-1 backdrop-blur-md flex items-center gap-1.5 ${diff.pill}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
              {diff.label}
            </span>
          </Swiper>
        </div>

        {/* Thumbnail strip — manual active state via activeIndex */}
        <Swiper
          modules={[FreeMode, Thumbs]}
          onSwiper={setThumbsSwiper}
          freeMode
          watchSlidesProgress
          slidesPerView="auto"
          spaceBetween={8}
        >
          {images.map((img, i) => (
            <SwiperSlide
              key={i}
              style={{ width: 64, height: 64, flexShrink: 0 }}
            >
              <div
                className={`w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                  activeIndex === i
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-70"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
