import * as z from "zod"

export const AdminFormSchema = z.object({

    userName: z.string().min(2,{
        message:"first name is require"
    }),
    firstName: z.string().min(2,{
        message:"first name is require"
    }),
    middleName: z.string().optional().or(z.literal('')),
    lastName: z.string().min(2,{
        message:"last name is require"
    }),
    email: z.string().min(2,{
        message:"Email name is require"
    }),
    dob: z.string().min(2,{
        message:"date of birth is require"
    }),
    gender: z.string().min(2,{
        message:"gender is require"
    }),
    phone: z.string().min(2,{
        message:"phone number is require"
    }),
    role: z.string().min(2,{
        message:"select a valid role for user"
    }),
    maritalStatus: z.string().optional().or(z.literal('')),
    country: z.string().min(2,{
        message:"country is require"
    }),
    state: z.string().min(2,{
        message:"state is require"
    }),
    city: z.string().min(2,{
        message:"city is require"
    }),
    permanentAddress: z.string().optional().or(z.literal('')),
    currentAddress: z.string().min(2,{
        message:"current address is require"
    }),
    kin:z.string().min(2,{
        message:"current address is require"
    }),
    kinPhone:z.string().min(2,{
        message:"current address is require"
    }),
    kinRelationship:z.string().min(2,{
        message:"current address is require"
    }),
    idCard:z.string().min(2,{
        message:"current address is require"
    }),
    occupation:z.string().min(2,{
        message:"current address is require"
    }),
    accountType:z.string().min(2,{
        message:"current address is require"
    }),
    accountName:z.string().min(2,{
        message:"current address is require"
    }),
    accountNumber:z.string().min(2,{
        message:"current address is require"
    }),
})