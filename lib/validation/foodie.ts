import { z } from 'zod';

export const foodieSignupSchema = z.object({
  name: z.string().min(2, 'What should we call you? Please enter your name.'),
  email: z.string().email("That email doesn't look quite right. Mind double-checking?"),
  phone: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
});

export type FoodieSignupInput = z.infer<typeof foodieSignupSchema>;
