'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { interestDetailSchema, InterestDetailInput } from '@/lib/validation/interest';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface InterestDetailFormProps {
  mealId: string;
  mealTitle: string;
  sessionId?: string;
  onSuccess?: () => void;
  showHeader?: boolean;
}

export const InterestDetailForm: React.FC<InterestDetailFormProps> = ({
  mealId,
  mealTitle,
  sessionId,
  onSuccess,
  showHeader = false,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InterestDetailInput>({
    resolver: zodResolver(interestDetailSchema),
    mode: 'onChange',
    defaultValues: {
      meal_id: mealId,
      session_id: sessionId || '',
      amount_willing_to_pay: '',
      contact: '',
    },
  });

  const watchedAmount = watch('amount_willing_to_pay');
  const watchedContact = watch('contact');

  const onSubmit = async (values: InterestDetailInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/interest-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Failed to record details.');
        return;
      }

      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    } catch {
      setIsSuccess(true);
      reset();
      if (onSuccess) onSuccess();
    }
  };

  const handleMaybeLater = () => {
    reset();
    if (onSuccess) onSuccess();
  };

  if (isSuccess) {
    return (
      <div className="py-8 text-center space-y-3 font-sans">
        <div className="w-12 h-12 bg-surface-successTint text-feedback-success rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h4 className="font-serif text-2xl font-bold text-neutral-charcoal">
          Thank you for the feedback!
        </h4>
        <p className="text-sm text-neutral-clayGray max-w-xs mx-auto leading-relaxed">
          Your input helps creators decide pricing and schedule this drop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
      {showHeader && (
        <div className="space-y-1 mb-2">
          <h3 className="font-serif text-2xl font-bold text-neutral-charcoal">
            Thanks , you&apos;re already counted.
          </h3>
          <p className="text-sm text-neutral-clayGray">
            Want to help us plan the real thing? Totally optional.
          </p>
        </div>
      )}

      {/* Selected Meal Indicator */}
      <div className="rounded-brand bg-neutral-softCream/80 border border-neutral-lightClay/60 px-3.5 py-2.5">
        <p className="text-[11px] uppercase tracking-[1.2px] font-semibold text-clay">
          Selected Meal
        </p>
        <p className="font-serif text-base font-semibold text-neutral-charcoal">
          {mealTitle}
        </p>
      </div>

      {/* Field 1 , Amount (Open-ended) */}
      <Input
        label="What would you pay for this?"
        placeholder="₦"
        {...register('amount_willing_to_pay')}
        error={errors.amount_willing_to_pay?.message}
        isValid={Boolean(watchedAmount && String(watchedAmount).trim().length > 0)}
      />

      {/* Field 2 , Contact (optional) */}
      <Input
        label="Contact (optional)"
        placeholder="Phone or email"
        {...register('contact')}
        error={errors.contact?.message}
        helperText="Only if you'd like to know when it's ready to order for real."
        isValid={Boolean(watchedContact && watchedContact.trim().length >= 3)}
      />

      {serverError && (
        <p className="text-xs text-feedback-error font-medium">{serverError}</p>
      )}

      {/* Two equally-weighted buttons */}
      <div className="flex items-center gap-3 pt-3">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="flex-1 h-[48px] text-sm font-semibold rounded-brand"
        >
          Send
        </Button>
        <button
          type="button"
          onClick={handleMaybeLater}
          className="flex-1 h-[48px] text-sm font-semibold rounded-brand border border-neutral-lightClay bg-white text-neutral-charcoal hover:bg-neutral-softCream transition-colors flex items-center justify-center"
        >
          Maybe later
        </button>
      </div>
    </form>
  );
};
