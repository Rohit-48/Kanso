"use client";

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/utils";

/** Shared easing: fast start, long soft landing. */
export const ease = [0.22, 1, 0.36, 1] as const;
export const spring = {
  type: "spring",
  stiffness: 380,
  damping: 32,
  mass: 0.8,
} as const;

/** Fades and lifts its children in, on mount or when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 12,
  blur = true,
  inView = false,
  className,
  ...props
}: HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  blur?: boolean;
  inView?: boolean;
}) {
  const hidden = { opacity: 0, y, filter: blur ? "blur(6px)" : "blur(0px)" };
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <motion.div
      initial={hidden}
      {...(inView
        ? { whileInView: shown, viewport: { once: true, margin: "-80px" } }
        : { animate: shown })}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: (stagger: number = 0.06) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
};

/** Staggers any <StaggerItem> children when the group scrolls into view. */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  inView = true,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number; inView?: boolean }) {
  return (
    <motion.div
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-60px" } }
        : { animate: "show" })}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={itemVariants} className={className} {...props} />
  );
}

/** Splits a line into words and blurs each one in, in sequence. */
export function WordReveal({
  text,
  className,
  delay = 0,
  wordClassName,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          className={cn("inline-block will-change-transform", wordClassName)}
          initial={{ opacity: 0, y: "0.35em", filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: delay + i * 0.06 }}
        >
          {w}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}

/** Counts up to `to` once visible. */
export function CountUp({
  to,
  duration = 1.4,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease,
      onUpdate: (v) => (node.textContent = Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      0
    </span>
  );
}

/** A soft light that follows the pointer across its area. */
export function Spotlight({
  children,
  className,
  size = 420,
}: {
  children?: React.ReactNode;
  className?: string;
  size?: number;
}) {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${sx}px ${sy}px, color-mix(in oklab, var(--foreground) 7%, transparent), transparent 70%)`;
  return (
    <div
      className={cn("relative", className)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        x.set(-1000);
        y.set(-1000);
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background }}
      />
      {children}
    </div>
  );
}

/** Card that lifts slightly and tilts toward the pointer. Subtle by design. */
export function HoverCard({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      whileHover={{ y: -3 }}
      transition={spring}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 4);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 4);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Technical-style primitives                                          */
/* ------------------------------------------------------------------ */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#_-+:";

/**
 * Text that resolves from random glyphs, left to right.
 * Writes straight to the DOM node, so it never re-renders React.
 */
export function ScrambleText({
  text,
  className,
  trigger = "mount",
  duration = 600,
  delay = 0,
}: {
  text: string;
  className?: string;
  /** mount: on first render · hover: on pointer enter · view: when scrolled into view */
  trigger?: "mount" | "hover" | "view";
  duration?: number;
  delay?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const frame = React.useRef(0);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const play = React.useCallback(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(frame.current);
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      const revealed = Math.floor(t * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out +=
          i < revealed || ch === " "
            ? ch
            : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      node.textContent = out;
      if (t < 1) frame.current = requestAnimationFrame(tick);
      else node.textContent = text;
    };
    frame.current = requestAnimationFrame(tick);
  }, [text, duration, delay]);

  React.useEffect(() => {
    if (trigger === "mount") play();
  }, [trigger, play]);
  React.useEffect(() => {
    if (trigger === "view" && inView) play();
  }, [trigger, inView, play]);
  React.useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <span
      ref={ref}
      aria-label={text}
      className={className}
      onPointerEnter={trigger === "hover" ? play : undefined}
    >
      {text}
    </span>
  );
}

/** Four registration marks in the corners of the nearest positioned parent. */
export function Brackets({
  className,
  size = 9,
  animated = true,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
}) {
  const corners = [
    "top-0 left-0 border-t border-l",
    "top-0 right-0 border-t border-r",
    "bottom-0 left-0 border-b border-l",
    "right-0 bottom-0 border-r border-b",
  ];
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
    >
      {corners.map((c, i) => (
        <motion.span
          key={c}
          className={cn("absolute border-foreground/50", c)}
          style={{ width: size, height: size }}
          initial={animated ? { opacity: 0, scale: 1.8 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.05 }}
        />
      ))}
    </span>
  );
}

/** `[01] —— LABEL` in small mono caps. */
export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string;
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase",
        className,
      )}
    >
      <span className="text-foreground">[{index}]</span>
      <motion.span
        className="h-px w-10 origin-left bg-foreground/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      />
      <ScrambleText text={children} trigger="view" />
    </div>
  );
}

/** A thin bright line that sweeps down its container on a loop. */
export function ScanLine({
  duration = 6,
  className,
}: {
  duration?: number;
  className?: string;
}) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--foreground)_35%,transparent),transparent)]",
        className,
      )}
      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.9, 1],
      }}
    />
  );
}

/** Crosshair lines that follow the pointer, with a coordinate readout. */
export function Crosshair({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const readout = React.useRef<HTMLSpanElement>(null);
  const [active, setActive] = React.useState(false);
  return (
    <div
      className={cn("relative", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = e.clientX - r.left;
        const py = e.clientY - r.top;
        x.set(px);
        y.set(py);
        if (readout.current)
          readout.current.textContent = `X ${String(Math.round(px)).padStart(4, "0")} · Y ${String(Math.round(py)).padStart(4, "0")}`;
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="absolute top-0 bottom-0 w-px bg-foreground/15"
          style={{ x: sx }}
        />
        <motion.span
          className="absolute right-0 left-0 h-px bg-foreground/15"
          style={{ y: sy }}
        />
        <motion.span
          className="absolute -mt-[3px] -ml-[3px] size-[7px] border border-foreground/60"
          style={{ x: sx, y: sy }}
        />
        <motion.span
          ref={readout}
          className="absolute mt-3 ml-3 font-mono text-[10px] tracking-wider whitespace-nowrap text-muted-foreground"
          style={{ x: sx, y: sy }}
        />
      </motion.div>
      {children}
    </div>
  );
}
