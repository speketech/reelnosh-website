import { z } from 'zod';

export const creatorSignupSchema = z.object({
  name: z.string().min(2, 'Please let us know your name.'),
  instagram_handle: z.string().min(2, 'Please share your Instagram handle so we can see your food.'),
  phone_or_email: z.string().min(3, 'Please provide the best way to reach you.'),
  what_they_cook: z.string().optional().or(z.literal('')),
});

export type CreatorSignupInput = z.infer<typeof creatorSignupSchema>;
