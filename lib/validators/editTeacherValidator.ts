import * as z from "zod"

export const EditTeacherSchema = z.object({
    firstName: z.string().min(2,{
        message:"first name is require"
    }),
    userName: z.string().min(2,{
        message:"first name is require"
    }),
    password: z.string().min(2,{
        message:"first name is require"
    }),
    middleName:  z.string().optional().or(z.literal('')),
    lastName: z.string().min(2,{
        message:"first name is require"
    }),
    email: z.string().min(2,{
        message:"first name is require"
    }),
    dob:z.string().min(2,{
        message:"first name is require"
    }), // Initialize dob as a Date,
    gender: z.string().min(2,{
        message:"first name is require"
    }),
    phone: z.string().min(2,{
        message:"first name is require"
    }),
    maritalStatus: z.string().min(2,{
        message:"first name is require"
    }),
    country: z.string().min(2,{
        message:"first name is require"
    }),
    state: z.string().min(2,{
        message:"first name is require"
    }),
    city: z.string().min(2,{
        message:"first name is require"
    }),
    permanentAddress:z.string().optional().or(z.literal('')),
    currentAddress: z.string().min(2,{
        message:"first name is require"
    }),
    kin: z.string().min(2,{
        message:"first name is require"
    }),
    kinPhone: z.string().min(2,{
        message:"first name is require"
    }),
    kinRelationship: z.string().min(2,{
        message:"first name is require"
    }),
    idCard: z.string().min(2,{
        message:"first name is require"
    }),
    occupation: z.string().min(2,{
        message:"first name is require"
    }),
    accountType: z.string().min(2,{
        message:"first name is require"
    }),
    accountName: z.string().min(2,{
        message:"first name is require"
    }),
    accountNumber: z.string().min(2,{
        message:"first name is require"
    }),
    stage:z.string().min(2,{
        message:"first name is require"
    }),
    level:z.string().min(2,{
        message:"first name is require"
    }),
})