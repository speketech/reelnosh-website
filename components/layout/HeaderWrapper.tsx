'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Header } from './Header';
import { Modal } from '@/components/ui/Modal';

const FoodieSignupForm = dynamic(
  () => import('@/components/forms/FoodieSignupForm').then((mod) => mod.FoodieSignupForm),
  { ssr: false }
);

export const HeaderWrapper: React.FC = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  return (
    <>
      <Header onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <Modal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        title="Get on the list"
        subTitle="Be first to know when a Drop goes live near you."
      >
        <FoodieSignupForm onSuccess={() => {}} />
      </Modal>
    </>
  );
};
