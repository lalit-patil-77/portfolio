import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ContentRow = ({ title, subtitle, accentColor = '#E50914', children }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 400, behavior: 'smooth' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="py-10 md:py-16 px-4 md:px-8 lg:px-16"
    >
      {/* Title */}
      <div
        className="mb-6 md:mb-8 pl-4"
        style={{ borderLeft: `4px solid ${accentColor}` }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-400 mt-1 text-sm md:text-base">{subtitle}</p>
        )}
      </div>

      {/* Scroll container wrapper */}
      <div className="relative group">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 hover:bg-white/20 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 hover:bg-white/20 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 pb-4 overflow-x-auto"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'thin',
            scrollbarColor: `${accentColor}80 transparent`,
          }}
        >
          <style>{`
            .content-row-scroll::-webkit-scrollbar {
              height: 6px;
            }
            .content-row-scroll::-webkit-scrollbar-track {
              background: transparent;
            }
            .content-row-scroll::-webkit-scrollbar-thumb {
              background: ${accentColor}80;
              border-radius: 9999px;
            }
          `}</style>
          {React.Children.map(children, (child) =>
            child
              ? React.cloneElement(child, {
                  style: {
                    ...child.props?.style,
                    scrollSnapAlign: 'start',
                  },
                })
              : null
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ContentRow;
