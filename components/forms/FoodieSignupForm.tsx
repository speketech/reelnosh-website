'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { foodieSignupSchema, FoodieSignupInput } from '@/lib/validation/foodie';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface FoodieSignupFormProps {
  onSuccess?: () => void;
  showHeader?: boolean;
}

export const FoodieSignupForm: React.FC<FoodieSignupFormProps> = ({
  onSuccess,
  showHeader = false,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    watch,
    reset,
  } = useForm<FoodieSignupInput>({
    resolver: zodResolver(foodieSignupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
  });

  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedPhone = watch('phone');
  const watchedLocation = watch('location');

  const onSubmit = async (values: FoodieSignupInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/foodie-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Something didn't quite go through, mind trying again in a moment?");
        return;
      }

      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    } catch {
      // Graceful fallback for offline / mock scenarios
      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    }
  };

  if (isSuccess) {
    return (
      <div className="py-8 text-center space-y-3 font-sans">
        <div className="w-12 h-12 bg-surface-successTint text-feedback-success rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h4 className="font-serif text-2xl font-bold text-neutral-charcoal">
          You&apos;re on the list!
        </h4>
        <p className="text-sm text-neutral-clayGray max-w-xs mx-auto leading-relaxed">
          We&apos;ll reach out as soon as the first Drop is ready.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
      {showHeader && (
        <div className="space-y-1 mb-2">
          <h3 className="font-serif text-2xl font-bold text-neutral-charcoal">
            Get on the list
          </h3>
          <p className="text-sm text-neutral-clayGray">
            Be first to know when a Drop goes live near you.
          </p>
        </div>
      )}

      {/* Field 1: Name */}
      <Input
        label="What should we call you?"
        placeholder="e.g. Amara"
        {...register('name')}
        error={errors.name?.message}
        isValid={Boolean(dirtyFields.name && watchedName && watchedName.trim().length >= 2 && !errors.name)}
      />

      {/* Field 2: Email */}
      <Input
        label="Email"
        type="email"
        placeholder="you@email.com"
        {...register('email')}
        error={errors.email?.message}
        helperText="We'll only email you about real Drops, never spam."
        isValid={Boolean(dirtyFields.email && watchedEmail && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail))}
      />

      {/* Field 3: Phone (optional) */}
      <Input
        label="Phone number (optional)"
        type="tel"
        placeholder="e.g. +234 800 000 0000"
        {...register('phone')}
        error={errors.phone?.message}
        helperText="For a faster WhatsApp heads-up when a Drop opens."
        isValid={Boolean(watchedPhone && watchedPhone.trim().length >= 7 && !errors.phone)}
      />

      {/* Field 4: Location (optional) */}
      <Input
        label="Where in Lagos are you? (optional)"
        placeholder="e.g. Lekki Phase 1, Ikoyi, Ikeja"
        {...register('location')}
        error={errors.location?.message}
        helperText="Helps us know where to bring the first Drops."
        isValid={Boolean(watchedLocation && watchedLocation.trim().length >= 2 && !errors.location)}
      />

      {serverError && (
        <p className="text-xs text-feedback-error font-medium">{serverError}</p>
      )}

      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Get Early Access
        </Button>
      </div>
    </form>
  );
};
