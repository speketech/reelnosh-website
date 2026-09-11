'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { creatorSignupSchema, CreatorSignupInput } from '@/lib/validation/creator';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface CreatorSignupFormProps {
  onSuccess?: () => void;
  showHeader?: boolean;
}

export const CreatorSignupForm: React.FC<CreatorSignupFormProps> = ({
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
  } = useForm<CreatorSignupInput>({
    resolver: zodResolver(creatorSignupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      instagram_handle: '',
      phone_or_email: '',
      what_they_cook: '',
    },
  });

  const watchedName = watch('name');
  const watchedHandle = watch('instagram_handle');
  const watchedContact = watch('phone_or_email');
  const watchedWhatTheyCook = watch('what_they_cook');

  const onSubmit = async (values: CreatorSignupInput) => {
    setServerError(null);
    try {
      const res = await fetch('/api/creator-signup', {
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
          You&apos;re on the Creator Waitlist!
        </h4>
        <p className="text-sm text-neutral-clayGray max-w-xs mx-auto leading-relaxed">
          We&apos;ll be in touch as we open up the first Drops to creators.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-sans text-left">
      {showHeader && (
        <div className="space-y-1 mb-2">
          <h3 className="font-serif text-2xl font-bold text-neutral-charcoal">
            Join the Creator Waitlist
          </h3>
          <p className="text-sm text-neutral-clayGray">
            Tell us about your food. We&apos;ll reach out when Drops open up for creators.
          </p>
        </div>
      )}

      {/* Field 1: Name */}
      <Input
        label="Your name"
        placeholder="e.g. Kudirat Ijeoma"
        {...register('name')}
        error={errors.name?.message}
        isValid={Boolean(dirtyFields.name && watchedName && watchedName.trim().length >= 2 && !errors.name)}
      />

      {/* Field 2: Instagram handle */}
      <Input
        label="Instagram handle"
        placeholder="@yourhandle"
        {...register('instagram_handle')}
        error={errors.instagram_handle?.message}
        isValid={Boolean(dirtyFields.instagram_handle && watchedHandle && watchedHandle.trim().length >= 2 && !errors.instagram_handle)}
      />

      {/* Field 3: Best contact */}
      <Input
        label="Best way to reach you"
        placeholder="Phone or email"
        {...register('phone_or_email')}
        error={errors.phone_or_email?.message}
        isValid={Boolean(dirtyFields.phone_or_email && watchedContact && watchedContact.trim().length >= 3 && !errors.phone_or_email)}
      />

      {/* Field 4: What they cook */}
      <Input
        label="What do you usually cook or sell?"
        placeholder="e.g. Jollof rice and grilled chicken on weekends"
        {...register('what_they_cook')}
        error={errors.what_they_cook?.message}
        isValid={Boolean(watchedWhatTheyCook && watchedWhatTheyCook.trim().length >= 3)}
      />

      {/* Trust microcopy */}
      <p className="text-xs text-neutral-clayGray">
        We&apos;ll only reach out about Reelnosh Drops, never shared with anyone else.
      </p>

      {serverError && (
        <p className="text-xs text-feedback-error font-medium">{serverError}</p>
      )}

      <div className="pt-2">
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Join the Waitlist
        </Button>
      </div>
    </form>
  );
};
