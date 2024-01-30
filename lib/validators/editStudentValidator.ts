import * as z from "zod"

export const EditStudentSchema = z.object({

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
    guardianName:z.string().min(2,{
        message:"current address is require"
    }),
    guardianPhone:z.string().min(2,{
        message:"current address is require"
    }),
    guardianRelationship:z.string().min(2,{
        message:"current address is require"
    }),
    stage:z.string().min(2,{
        message:"current address is require"
    }),
    level:z.string().min(2,{
        message:"current address is require"
    }),
    session:z.string().min(2,{
        message:"current address is require"
    }),
    term:z.string().min(2,{
        message:"current address is require"
    }),
    // accountNumber:z.string().min(2,{
    //     message:"current address is require"
    // }),
})