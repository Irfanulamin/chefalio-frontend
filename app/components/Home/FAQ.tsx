"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const QnA = [
  {
    question: "How quickly can I get started?",
    answer:
      "You can be up and running in under 5 minutes. Simply sign up, connect your data sources, and our onboarding wizard walks you through every step. No credit card required for the free tier.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. Your data is stored in isolated, SOC 2 Type II certified infrastructure. We never share or sell your data — ever.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes. We support 100+ native integrations including Slack, Notion, GitHub, Linear, Salesforce, and more. Our open REST API and webhooks let you connect virtually any tool in your stack.",
  },
  {
    question: "Do you offer enterprise or custom plans?",
    answer:
      "Yes. Enterprise plans include SSO, audit logs, dedicated support, custom SLAs, and volume pricing. Reach out to our sales team and we'll tailor a plan around your team's exact needs.",
  },
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Get full access to every Pro feature for 14 days, no credit card required. At the end of the trial you choose a plan — or stay on the free tier with no pressure and no surprise charges.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden">
      <div className="w-full max-w-300">
        {/* Heading — animate when scrolled into view */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <h2 className="text-7xl font-bold text-primary leading-[1.15] tracking-tight mb-4">
            Questions, <br />
            <em className="not-italic text-black dark:text-white">
              Answered honestly.
            </em>
          </h2>

          <p className="text-base text-black/90 dark:text-white/90 font-light leading-relaxed max-w-md mx-auto">
            Everything you need to know before you commit. Still have questions?
            Contact our support team — we're here to help!
          </p>
        </motion.div>

        {/* Body row */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
          {/* Image — sticky/centered on the left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24 shrink-0 flex justify-center lg:justify-start"
          >
            <Image
              src="/about-us.png"
              alt="FAQ illustration"
              width={260}
              height={260}
              className="object-contain w-[200px] lg:w-[260px] h-auto rounded-2xl"
            />
          </motion.div>

          {/* Accordion list */}
          <div className="flex flex-col gap-2.5 flex-1">
            {QnA.map((qa, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`rounded-2xl border transition-colors duration-300 cursor-pointer overflow-hidden
                  ${
                    isOpen
                      ? "border-black/10 bg-black/4 dark:border-white/10 dark:bg-white/4"
                      : "border-black/6 bg-black/2 dark:border-white/6 dark:bg-white/2 hover:dark:border-white/10 hover:dark:bg-white/[0.035]"
                  }`}
                  onClick={() => toggle(i)}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`shrink-0 text-[11px] font-semibold tabular-nums transition-colors duration-300 ${isOpen ? "text-black/50 dark:text-white/50" : "text-black/20 dark:text-white/20"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-[15px] font-medium leading-snug transition-colors duration-200 ${isOpen ? "text-black dark:text-white" : "text-black/65 dark:text-white/65"}`}
                      >
                        {qa.question}
                      </span>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
                      ${isOpen ? "border-black/20 bg-black/8 dark:border-white/20 dark:bg-white/8" : "border-black/10 dark:border-white/10"}`}
                    >
                      <XIcon
                        size={12}
                        weight="bold"
                        className={`transition-colors duration-300 ${isOpen ? "text-black/50 dark:text-white/50" : "text-black/20 dark:text-white/20"}`}
                      />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.36,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 flex flex-col gap-4">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              duration: 0.38,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="h-px bg-linear-to-r from-primary to-transparent origin-left"
                          />
                          <div className="flex gap-3.5">
                            <div className="w-0.5 self-stretch rounded-full bg-linear-to-b from-primary to-transparent shrink-0" />
                            <p className="text-[14px] text-black/90 dark:text-white/90 leading-[1.75] font-light">
                              {qa.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
