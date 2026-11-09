import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Portal gateway: two architectural panels part, the destination is announced,
 * then navigation happens. Cancellation-safe and reduced-motion aware.
 */
export default function PortalLink({ to, children, className, ariaLabel, label }) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    if (reduce) {
      navigate({ to });
      return;
    }
    setOpening(true);
    timer.current = window.setTimeout(() => navigate({ to }), 820);
  };

  return (
    <>
      <Link to={to} onClick={handleClick} className={className} aria-label={ariaLabel}>
        {children}
      </Link>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
            onClick={() => {
              window.clearTimeout(timer.current);
              setOpening(false);
            }}
          >
            <motion.span
              className="absolute inset-y-0 start-0 w-1/2 bg-[#04060F]"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              className="absolute inset-y-0 end-0 w-1/2 bg-[#04060F]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.span
              className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/80 to-transparent"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.4 }}
            />
            <motion.span
              className="relative z-10 px-6 text-center font-display text-lg text-gold/90"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.35 }}
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}