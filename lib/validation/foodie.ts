import { z } from 'zod';

export const foodieSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().or(z.literal('')),
  location: z.string().optional().or(z.literal('')),
});

export type FoodieSignupInput = z.infer<typeof foodieSignupSchema>;
