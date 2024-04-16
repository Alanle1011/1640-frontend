import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(2, { message: "Invalid Password" }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const ContributionValidation = z.object({
  title: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  content: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  image: z.custom<File[]>(),
  file: z.custom<File[]>(),
});
export const UserProfileEditValidation = z.object({
  image: z.custom<File[]>(),
  name: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  oldPassword: z.string(),
  newPassword: z.string(),
});
export const UserValidation = z.object({
  name: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  oldPassword: z.string(),
  newPassword: z.string(),
  email: z.string(),
  userRole: z.string(),
  faculty: z.string()
});
export const CreateUserValidation = z.object({
  name: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
  email: z.string(),
  userRole: z.string(),
  faculty: z.string()
});

