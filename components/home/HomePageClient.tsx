'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { HowItWorksWrapper } from '@/components/sections/HowItWorksWrapper';
import { FoodiesClub } from '@/components/sections/FoodiesClub';
import { Faq } from '@/components/sections/Faq';
import { ForCreators } from '@/components/sections/ForCreators';
import { FounderNoteTeaser } from '@/components/sections/FounderNoteTeaser';
import { Modal } from '@/components/ui/Modal';
import { FounderNoteItem } from '@/lib/constants';

const FoodieSignupForm = dynamic(
  () => import('@/components/forms/FoodieSignupForm').then((mod) => mod.FoodieSignupForm),
  { ssr: false }
);

const CreatorSignupForm = dynamic(
  () => import('@/components/forms/CreatorSignupForm').then((mod) => mod.CreatorSignupForm),
  { ssr: false }
);

const InterestDetailForm = dynamic(
  () => import('@/components/forms/InterestDetailForm').then((mod) => mod.InterestDetailForm),
  { ssr: false }
);

interface HomePageClientProps {
  hero: React.ReactNode;
  exploring: React.ReactNode;
  founderNotes: FounderNoteItem[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  hero,
  exploring,
  founderNotes,
}) => {
  const [isFoodieModalOpen, setIsFoodieModalOpen] = useState(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [detailModal, setDetailModal] = useState<{
    isOpen: boolean;
    mealId: string;
    mealTitle: string;
  }>({
    isOpen: false,
    mealId: '',
    mealTitle: '',
  });

  useEffect(() => {
    const handleOpenCreator = () => setIsCreatorModalOpen(true);
    const handleOpenFoodie = () => setIsFoodieModalOpen(true);
    const handleOpenDetail = (e: Event) => {
      const customEvent = e as CustomEvent<{ mealId: string; mealTitle: string }>;
      if (customEvent.detail) {
        setDetailModal({
          isOpen: true,
          mealId: customEvent.detail.mealId,
          mealTitle: customEvent.detail.mealTitle,
        });
      }
    };

    window.addEventListener('open-creator-modal', handleOpenCreator);
    window.addEventListener('open-foodie-modal', handleOpenFoodie);
    window.addEventListener('open-detail-modal', handleOpenDetail as EventListener);

    return () => {
      window.removeEventListener('open-creator-modal', handleOpenCreator);
      window.removeEventListener('open-foodie-modal', handleOpenFoodie);
      window.removeEventListener('open-detail-modal', handleOpenDetail as EventListener);
    };
  }, []);

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero (Server Component) */}
      {hero}

      {/* 2 & 3. How It Works (The Gap & The Drop) */}
      <HowItWorksWrapper />

      {/* 4. What We're Exploring (Server Component) */}
      {exploring}

      {/* 5. FAQ */}
      <Faq />

      {/* 6. Foodies Club */}
      <FoodiesClub onOpenFoodieWaitlist={() => setIsFoodieModalOpen(true)} />

      {/* 6. For Creators */}
      <ForCreators
        onOpenCreatorWaitlist={() => setIsCreatorModalOpen(true)}
      />

      {/* 7. Founder's Note Teaser */}
      <FounderNoteTeaser notes={founderNotes} />

      {/* Modals */}
      <Modal
        isOpen={isFoodieModalOpen}
        onClose={() => setIsFoodieModalOpen(false)}
        title="Get on the list"
        subTitle="Be first to know when a Drop goes live near you."
      >
        {isFoodieModalOpen && <FoodieSignupForm onSuccess={() => {}} />}
      </Modal>

      <Modal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        title="Join the Creator Waitlist"
        subTitle="Tell us about your food, we'll reach out when Drops open up for creators."
      >
        {isCreatorModalOpen && <CreatorSignupForm onSuccess={() => {}} />}
      </Modal>

      <Modal
        isOpen={detailModal.isOpen}
        onClose={() =>
          setDetailModal({ isOpen: false, mealId: '', mealTitle: '' })
        }
        title="Thanks, you're already counted."
        subTitle="Want to help us plan the real thing? Totally optional."
      >
        {detailModal.isOpen && (
          <InterestDetailForm
            mealId={detailModal.mealId}
            mealTitle={detailModal.mealTitle}
            onSuccess={() =>
              setDetailModal({ isOpen: false, mealId: '', mealTitle: '' })
            }
          />
        )}
      </Modal>
    </main>
  );
};
