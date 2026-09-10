import React from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const TheDrop: React.FC = () => {
  const stations = [
    {
      icon: '/icons/the-drop/drop-goes-live.svg',
      title: 'A Drop goes live',
      description: 'Meal details, price, and portions are announced.',
      isConcluded: false,
    },
    {
      icon: '/icons/the-drop/order-your-servings.svg',
      title: 'Order your servings',
      description: 'Reserve one or more portions in a few taps.',
      isConcluded: false,
    },
    {
      icon: '/icons/the-drop/we-confirm-your-order.svg',
      title: 'We confirm your order',
      description: 'Order details and delivery timing are locked in.',
      isConcluded: false,
    },
    {
      icon: '/icons/the-drop/drop-closes.svg',
      title: 'The Drop closes',
      description: 'Orders close when sold out or window ends.',
      isConcluded: true,
    },
  ];

  return (
    <section id="the-drop" className="scroll-mt-[var(--nav-height)] bg-neutral-softCream py-16 md:py-[120px]">
      <div className="mx-auto max-w-[1120px] px-5 md:px-12 min-[1120px]:px-0">

        {/* Header Row */}
        <div className="mb-12 grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {/* Eyebrow with amber dot */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F4A11A] inline-block shrink-0" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[1.2px] text-[#8B3A2A] dark:text-[#F4A11A]">
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

        {/* Contained Timeline Panel */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-neutral-lightClay/70 bg-neutral-warmWhite px-8 py-14 sm:px-12 sm:py-16 md:py-20 lg:px-14 lg:py-24 shadow-elevation1">
          <div className="relative">
            {/* Connecting Track (Desktop): continuous horizontal path through vertical center of badges */}
            <div
              className="hidden md:block absolute top-[28px] lg:top-[32px] -translate-y-1/2 left-[12.5%] right-[12.5%] h-[6px] rounded-full bg-clay dark:bg-[#D79A8A] z-0"
              aria-hidden="true"
            />

            {/* Connecting Track (Mobile): continuous vertical path through badges */}
            <div
              className="md:hidden absolute left-[28px] top-7 bottom-10 w-[6px] -translate-x-1/2 rounded-full bg-clay dark:bg-[#D79A8A] z-0"
              aria-hidden="true"
            />

            {/* Single Consolidated Station List across all breakpoints */}
            <div className="relative z-10 flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-4 lg:gap-6">
              {stations.map((station, idx) => (
                <ScrollReveal
                  key={station.title}
                  delay={idx * 80}
                  className="flex items-start md:flex-col md:items-center text-left md:text-center gap-5 md:gap-0"
                >
                  {/* Station Badge with outer masking ring and inner accent ring */}
                  <div className="relative shrink-0 mb-0 md:mb-5">
                    <div
                      className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-white shadow-sm ring-4 lg:ring-8 ring-neutral-warmWhite ${
                        station.isConcluded ? 'bg-[#5A2418]' : 'bg-clay'
                      }`}
                    >
                      {/* Inner concentric ring in each circle */}
                      <div className="absolute inset-[3px] rounded-full border border-white/30 pointer-events-none" />
                      <img
                        src={station.icon}
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-6 lg:w-7 lg:h-7 object-contain select-none"
                      />
                    </div>
                  </div>

                  {/* Text Container */}
                  <div className="pt-1.5 md:pt-0">
                    <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-neutral-charcoal leading-snug mb-1 md:mb-2">
                      {station.title}
                    </h3>
                    <p className="font-sans text-[14px] text-neutral-clayGray leading-relaxed max-w-[260px] md:max-w-[220px]">
                      {station.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

