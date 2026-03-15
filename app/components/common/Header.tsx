"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export const Header = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="sticky top-0 z-50 backdrop-blur-sm">
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col sm:flex-row justify-center sm:justify-center items-center py-2.5 dark:bg-primary bg-black text-white dark:text-black text-sm gap-1.5 font-medium tracking-wide"
          >
            <p className="text-center sm:text-left">
              Get your recipe ideas from the top chefs!
            </p>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="mt-1 sm:mt-0"
            >
              <ArrowRightIcon size={16} />
            </motion.span>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setBannerVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-0.5 rounded-full opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Dismiss banner"
            >
              <XIcon size={15} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="py-4 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.h2
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="text-primary text-2xl font-extrabold tracking-tight cursor-pointer select-none"
            >
              Chefalio
            </motion.h2>
            <nav className="hidden lg:flex gap-x-7 gap-y-4 text-muted-foreground items-center">
              <ToggleThemeButton />
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                  whileHover={{ y: -1 }}
                  className="text-sm font-medium relative group transition-colors hover:text-foreground"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.35 }}
                className="flex items-center gap-2"
              >
                <Button variant="outline" size="lg">
                  Login
                </Button>
                <Button size="lg">Register</Button>
              </motion.div>
            </nav>

            <div className="lg:hidden flex items-center gap-3">
              <ToggleThemeButton />
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.08 }}
                    className="p-1.5 rounded-md hover:bg-accent transition-colors"
                    aria-label="Open menu"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {sheetOpen ? (
                        <motion.span
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <XIcon size={26} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                        >
                          <ListIcon size={26} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="px-0 pb-8 bg-white/85 dark:bg-black/85 backdrop-blur-sm"
                >
                  <SheetHeader className="px-6 pt-6 pb-2">
                    <SheetTitle className="text-2xl font-extrabold tracking-tight text-primary">
                      Chefalio
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col px-6 mt-2 gap-1">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.07,
                          duration: 0.3,
                          ease: "easeOut",
                        }}
                        onClick={() => setSheetOpen(false)}
                        className="py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/40 last:border-none transition-colors"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="flex flex-col gap-3 px-6 mt-6"
                  >
                    <SheetClose asChild>
                      <Button variant="outline" size="lg" className="w-full">
                        Login
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button size="lg" className="w-full">
                        Register
                      </Button>
                    </SheetClose>
                  </motion.div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
