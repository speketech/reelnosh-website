import { z } from 'zod';

export const interestTapSchema = z.object({
  meal_id: z.string().min(1, 'Meal ID is required'),
  session_id: z.string().optional(),
});

export type InterestTapInput = z.infer<typeof interestTapSchema>;

export const interestDetailSchema = z.object({
  meal_id: z.string().min(1, 'Meal ID is required'),
  session_id: z.string().optional(),
  amount_willing_to_pay: z.number().optional().nullable(),
  contact: z.string().optional().or(z.literal('')),
});

export type InterestDetailInput = z.infer<typeof interestDetailSchema>;
