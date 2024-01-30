import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}${path}`
  return `http://localhost:${
    process.env.PORT ?? 3000
  }${path}`
}

export const isValidEmail = (email:string) => {
  // Regular expression for basic email validation
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // Regular expression for advanced email validation
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone:string) => {
  // Regular expression for basic phone number validation
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneRegex.test(phone);
};



 