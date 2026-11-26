"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 font-semibold tracking-tight"
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="size-5"
        aria-hidden
        whileHover={{ rotate: 90 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <motion.rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5"
          className="fill-none stroke-current"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="3.25"
          className="fill-current"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            delay: 0.5,
          }}
        />
      </motion.svg>
      <span>kanso</span>
      <span className="font-normal text-muted-foreground">/ui</span>
    </Link>
  );
}
