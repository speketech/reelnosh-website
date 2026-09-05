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
}

export const InterestDetailForm: React.FC<InterestDetailFormProps> = ({
  mealId,
  mealTitle,
  sessionId,
  onSuccess,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InterestDetailInput>({
    resolver: zodResolver(interestDetailSchema),
    defaultValues: {
      meal_id: mealId,
      session_id: sessionId || '',
      amount_willing_to_pay: null,
      contact: '',
    },
  });

  const currentAmount = watch('amount_willing_to_pay');

  const pricingOptions = [
    { label: '₦8,000 - ₦10,000', value: 9000 },
    { label: '₦12,000 - ₦15,000', value: 13500 },
    { label: '₦18,000 - ₦22,000', value: 20000 },
    { label: '₦25,000+', value: 25000 },
  ];

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

  if (isSuccess) {
    return (
      <div className="py-6 text-center space-y-3">
        <div className="w-10 h-10 bg-surface-successTint text-feedback-success rounded-full flex items-center justify-center mx-auto text-lg font-bold">
          ✓
        </div>
        <h4 className="font-serif text-xl font-bold text-neutral-charcoal">
          Thank you for the feedback!
        </h4>
        <p className="font-sans text-sm text-neutral-clayGray max-w-xs mx-auto">
          Your input helps creators decide pricing and schedule this drop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
      <div className="flex items-center gap-2 rounded-lg bg-surface-successTint px-3 py-2">
        <span className="text-feedback-success text-sm font-bold">✓</span>
        <p className="font-sans text-sm font-medium text-feedback-success">
          Thanks — you&apos;re already counted.
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[1.2px] font-semibold text-clay mb-1">
          Demand Feedback
        </p>
        <h4 className="font-serif text-lg font-bold text-neutral-charcoal">
          {mealTitle}
        </h4>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-[1.2px] text-neutral-charcoal mb-2">
          What is a fair price for this meal? (Optional)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {pricingOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValue('amount_willing_to_pay', opt.value)}
              className={`p-2.5 text-xs font-semibold rounded-brand border text-center transition-colors ${
                currentAmount === opt.value
                  ? 'bg-clay text-white border-clay'
                  : 'bg-neutral-softCream text-neutral-charcoal border-neutral-lightClay hover:border-clay/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Input
        label="Phone or WhatsApp for Drop Alerts (Optional)"
        placeholder="+234 800 000 0000"
        {...register('contact')}
        error={errors.contact?.message}
      />

      {serverError && (
        <p className="text-xs text-feedback-error font-medium">{serverError}</p>
      )}

      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Submit Feedback
        </Button>
      </div>
    </form>
  );
};
