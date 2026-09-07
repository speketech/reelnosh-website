import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const TheDrop: React.FC = () => {
  const stations = [
    {
      glyph: 'spark',
      title: 'A Drop goes live',
      description: 'Meal details, price, and portions are announced.',
      isConcluded: false,
    },
    {
      glyph: 'box',
      title: 'Order your servings',
      description: 'Reserve one or more portions in a few taps.',
      isConcluded: false,
    },
    {
      glyph: 'check',
      title: 'We confirm your order',
      description: 'Order details and delivery timing are locked in.',
      isConcluded: false,
    },
    {
      glyph: 'close',
      title: 'The Drop closes',
      description: 'Orders close when sold out or window ends.',
      isConcluded: true,
    },
  ];

  const StationGlyph = ({ glyph }: { glyph: string }) => {
    if (glyph === 'check') {
      return <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>;
    }
    if (glyph === 'box') {
      return <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="2" /></svg>;
    }
    if (glyph === 'close') {
      return <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 7l10 10M17 7 7 17" /></svg>;
    }
    return <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7" /></svg>;
  };

  return (
    <section id="the-drop" className="scroll-mt-[var(--nav-height)] bg-neutral-warmWhite py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-0">

        {/* Header Row */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-spicePop inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-clay">
                THE DROP
              </span>
            </div>

            {/* H2: 36px Lora Title */}
            <h2 className="font-serif text-[32px] sm:text-[36px] font-semibold leading-[1.2] text-neutral-charcoal">
              Food content becomes a real experience in four steps.
            </h2>
          </div>

          <div className="lg:col-span-5 lg:flex lg:justify-end">
            <p className="font-sans text-base text-neutral-clayGray leading-relaxed max-w-md text-left">
              A Reelnosh Drop brings a creator&apos;s meal to interested diners through a small, defined experience.
            </p>
          </div>
        </div>

        {/* Contained Timeline Panel , Soft Cream (#F7F3ED), 24px radius, Elevation 1 */}
        <div className="relative overflow-hidden rounded-[24px] border border-neutral-lightClay/70 bg-[#F7F3ED] p-8 shadow-elevation1 sm:p-12">

          {/* Desktop Layout (lg:block) */}
          <div className="hidden lg:block relative">
            {/* Connecting Track: continuous 6px path through vertical center of all 4 badges */}
            <div
              className="absolute top-[32px] -translate-y-1/2 left-[12.5%] right-[12.5%] h-[6px] rounded-full bg-clay z-0"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-4 gap-6 text-center">
              {stations.map((station, idx) => (
                <ScrollReveal
                  key={station.title}
                  delay={idx * 80}
                  className="flex flex-col items-center"
                >
                  {/* 64�,64 Station Badge */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-sm ring-8 ring-[#F7F3ED] mb-5 ${
                      station.isConcluded ? 'bg-[#5A2418]' : 'bg-clay'
                    }`}
                  >
                    <span className="text-[24px] leading-none select-none font-medium">
                      <StationGlyph glyph={station.glyph} />
                    </span>
                  </div>

                  {/* Station Title , Lora Subtitle-Small 20px */}
                  <h3 className="font-serif text-[20px] font-semibold text-neutral-charcoal leading-snug mb-2">
                    {station.title}
                  </h3>

                  {/* Station Description , Figtree Body-Small 14px, 220px max width */}
                  <p className="font-sans text-[14px] text-neutral-clayGray leading-relaxed max-w-[220px]">
                    {station.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Mobile Layout (< lg) */}
          <div className="lg:hidden relative">
            {/* Vertical Connecting Track: 6px path through badges */}
            <div
              className="absolute left-[31px] top-8 bottom-12 w-[6px] -translate-x-1/2 rounded-full bg-clay z-0"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col gap-8">
              {stations.map((station, idx) => (
                <ScrollReveal
                  key={station.title}
                  delay={idx * 80}
                  className="flex items-start gap-5"
                >
                  {/* 64�,64 Station Badge */}
                  <div
                    className={`w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-white shadow-sm ring-4 ring-[#F7F3ED] ${
                      station.isConcluded ? 'bg-[#5A2418]' : 'bg-clay'
                    }`}
                  >
                    <span className="text-[24px] leading-none select-none font-medium">
                      <StationGlyph glyph={station.glyph} />
                    </span>
                  </div>

                  {/* Text Container */}
                  <div className="pt-1.5">
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-neutral-charcoal leading-snug mb-1">
                      {station.title}
                    </h3>
                    <p className="font-sans text-[14px] text-neutral-clayGray leading-relaxed max-w-[260px]">
                      {station.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Closing Line , Lora Editorial-Quote 24px italic, Clay-Gray, centered */}
          <div className="relative z-10 mt-12 text-center">
            <p className="font-serif text-[20px] sm:text-[24px] italic text-neutral-clayGray">
              &ldquo;A limited meal from a creator, made available to you.&rdquo;
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
