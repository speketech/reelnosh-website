'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { Modal } from '@/components/ui/Modal';
import { FoodieSignupForm } from '@/components/forms/FoodieSignupForm';

export const HeaderWrapper: React.FC = () => {
  const [isEarlyAccessOpen, setIsEarlyAccessOpen] = useState(false);

  return (
    <>
      <Header onOpenEarlyAccess={() => setIsEarlyAccessOpen(true)} />
      <Modal
        isOpen={isEarlyAccessOpen}
        onClose={() => setIsEarlyAccessOpen(false)}
        title="Join Early Access"
      >
        <FoodieSignupForm onSuccess={() => {}} />
      </Modal>
    </>
  );
};
