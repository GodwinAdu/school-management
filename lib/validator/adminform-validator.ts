import z from "zod";

const AdminFormSchema = z.object({
    userName: z.string().min(2, {
      message: "fill is required.",
    }),
    firstName: z.string().min(2, {
      message: "fill is required.",
    }),
    userName: z.string().min(2, {
      message: "fill is required.",
    }),
    middleName: z.string().min(2, {
      message: "fill is required.",
    }),
    lastName: z.string().min(2, {
      message: "fill is required.",
    }),
    email: z.string().min(2, {
      message: "fill is required.",
    }),
    dob: , // Initialize dob as a Date,
    gender: z.string().min(2, {
      message: "fill is required.",
    }),
    phone: z.string().min(2, {
      message: "fill is required.",
    }),
    password: z.string().min(2, {
      message: "fill is required.",
    }),
    role: z.string().min(2, {
      message: "fill is required.",
    }),
    maritalStatus: z.string().min(2, {
      message: "fill is required.",
    }),
    country: z.string().min(2, {
      message: "fill is required.",
    }),
    state: z.string().min(2, {
      message: "fill is required.",
    }),
    city: z.string().min(2, {
      message: "fill is required.",
    }),
    permanentAddress: z.string().min(2, {
      message: "fill is required.",
    }),
    currentAddress: z.string().min(2, {
      message: "fill is required.",
    }),
  });