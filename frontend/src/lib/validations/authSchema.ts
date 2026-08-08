import {z} from 'zod'

export const loginSchema = z.object({
    email: z.email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters')
})

export const signupSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Enter a valid email'),
    password: z.string()
    .min(8, 'Minimum 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
    agreeToTerms: z.literal(true, {
        error: 'You must agree to the terms',
    }),
})

export const forgotPassword = z.object({
    email: z.email('Enter a valid email'),
})


export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>