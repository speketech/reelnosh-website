'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/sections/Hero';
import { HowItWorksWrapper } from '@/components/sections/HowItWorksWrapper';
import { Exploring } from '@/components/sections/Exploring';
import { FoodiesClub } from '@/components/sections/FoodiesClub';
import { ForCreators } from '@/components/sections/ForCreators';
import { FounderNoteTeaser } from '@/components/sections/FounderNoteTeaser';
import { Modal } from '@/components/ui/Modal';
import { FoodieSignupForm } from '@/components/forms/FoodieSignupForm';
import { CreatorSignupForm } from '@/components/forms/CreatorSignupForm';
import { InterestDetailForm } from '@/components/forms/InterestDetailForm';
import { FeaturedContentItem, FounderNoteItem } from '@/lib/constants';

interface HomePageClientProps {
  heroItem: FeaturedContentItem;
  exploringItems: FeaturedContentItem[];
  founderNotes: FounderNoteItem[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  heroItem,
  exploringItems,
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

  const handleOpenDetailModal = (mealId: string, mealTitle: string) => {
    setDetailModal({
      isOpen: true,
      mealId,
      mealTitle,
    });
  };

  return (
    <main className="min-h-screen bg-neutral-warmWhite">
      {/* 1. Hero */}
      <Hero
        content={heroItem}
        onOpenCreatorWaitlist={() => setIsCreatorModalOpen(true)}
      />

      {/* 2 & 3. How It Works (The Gap & The Drop) */}
      <HowItWorksWrapper />

      {/* 4. What We're Exploring */}
      <Exploring
        items={exploringItems}
        onOpenDetailModal={handleOpenDetailModal}
      />

      {/* 5. Foodies Club */}
      <FoodiesClub />

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
        title="Join Early Access"
      >
        <FoodieSignupForm onSuccess={() => {}} />
      </Modal>

      <Modal
        isOpen={isCreatorModalOpen}
        onClose={() => setIsCreatorModalOpen(false)}
        title="Join the Creator Waitlist"
      >
        <CreatorSignupForm onSuccess={() => {}} />
      </Modal>

      <Modal
        isOpen={detailModal.isOpen}
        onClose={() =>
          setDetailModal({ isOpen: false, mealId: '', mealTitle: '' })
        }
        title="Meal Demand"
      >
        <InterestDetailForm
          mealId={detailModal.mealId}
          mealTitle={detailModal.mealTitle}
          onSuccess={() => {}}
        />
      </Modal>
    </main>
  );
};
