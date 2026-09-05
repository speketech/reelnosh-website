import { z } from 'zod';

export const creatorSignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  instagram_handle: z.string().min(2, 'Instagram handle is required'),
  phone_or_email: z.string().min(3, 'Phone or email is required'),
  what_they_cook: z.string().optional().or(z.literal('')),
});

export type CreatorSignupInput = z.infer<typeof creatorSignupSchema>;
