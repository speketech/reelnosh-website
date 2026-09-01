import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative w-full bg-warmWhite overflow-hidden py-12 md:py-20 lg:py-24 border-b border-lightClay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Attention Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-softCream border border-lightClay text-charcoal text-ui-label font-sans font-medium">
              <span className="w-2 h-2 rounded-full bg-spicePop" aria-hidden="true" />
              <span>Limited Meal Drops • Authentic Local Creators</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-editorial-title font-semibold text-charcoal tracking-tight leading-[1.15]">
              Where Food Content <br className="hidden sm:inline" />
              <span className="text-clay">Becomes Meals.</span>
            </h1>

            {/* Subtitle / Body */}
            <p className="font-sans text-ui-body text-clayGray max-w-xl leading-relaxed">
              Reelnosh turns viral food moments from your favorite local creators into limited-run meal Drops you can discover, crave, and have delivered fresh to your door.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <a href="#drops">Explore Current Drops</a>
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <a href="#gap">How It Works</a>
              </Button>
            </div>

            {/* Trust / Community Indicators */}
            <div className="pt-4 flex items-center gap-6 text-ui-label text-clayGray font-sans">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                <span>Small batch preparation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-clay" />
                <span>Direct creator collaboration</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Feature */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-card bg-softCream p-3 sm:p-4 border border-lightClay shadow-sm">
              
              {/* Image Frame with Aspect Ratio */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-lightClay">
                <Image
                  src="/images/hero/hero-kudirat-jollof.avif"
                  alt="Smokey party jollof rice prepared fresh by Chef Kudirat"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 500px"
                  className="object-cover transition-opacity duration-300"
                />

                {/* Scrim Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent pointer-events-none" />

                {/* Featured Drop Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-warmWhite/95 backdrop-blur-sm border border-lightClay text-charcoal">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-sans font-semibold uppercase tracking-wider text-clay">
                      Live Drop
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-urgency">
                      <span className="w-1.5 h-1.5 rounded-full bg-urgency" />
                      Limited Portions
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-charcoal leading-snug">
                    Smokey Party Jollof & Slow-Braised Beef
                  </h3>

                  <p className="mt-0.5 text-ui-label text-clayGray font-sans">
                    By Chef Kudirat • Lagos Style
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
