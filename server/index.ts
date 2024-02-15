
import { z } from 'zod';

import { getAllAdmins } from '@/lib/actions/admin.actions';
import { TRPCError } from '@trpc/server';
import { fetchAdmin } from '@/lib/actions/fetchadmin.actions';
import { fetchRole } from '@/lib/actions/role.actions';
import { privateProcedure, router } from './trpc';
import { IRole } from '@/lib/models/role.models';
import { IAdmin } from '@/lib/models/admin.models';
import { getStudentAttendances } from '@/lib/helpers/attendance';



export const appRouter = router({
    getAdmins: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;

        if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

        return await getAllAdmins()
    }),
    getCurrentRole: privateProcedure.input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {

            const { userId } = ctx;

            if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

            const user: IAdmin = await fetchAdmin({ id: input.id });

            if (!user) throw new TRPCError({ code: 'NOT_FOUND' });

            const role: IRole = await fetchRole({ value: user?.role });

            if (!role) throw new TRPCError({ code: 'NOT_FOUND' });

            return role;

        }),
    getStudentAttendance: privateProcedure.input(z.object({ classId: z.string()}))
        .query(async ({ input, ctx }) => {

            const { userId } = ctx;

            if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            const isoString = currentDate.toISOString() ;

            const attendance = await getStudentAttendances({
                classId: input.classId,
                searchDate: isoString,
            });

            if (!attendance) throw new TRPCError({ code: 'NOT_FOUND' });

            console.log(JSON.parse(JSON.stringify(attendance)),"trpc")
            return JSON.parse(JSON.stringify(attendance));


        }),
    // authCallback: publicProcedure.query(async () => {

    //     const user = await currentUser();

    //     if (!user?.id || !user.emailAddresses[0].emailAddress) throw new TRPCError({ code: 'UNAUTHORIZED' })
    //     //check if user is in the database?
    //     const dbUser = await fetchUser({
    //         id: user?.id
    //     });

    //     if (!dbUser) {
    //         //create user in db
    //         await createUser({
    //             id: user?.id,
    //             name:`${user?.firstName}  ${user?.lastName}`,
    //             email: user?.emailAddresses[0].emailAddress,
    //             // phone:user?.phoneNumbers[0].phoneNumber
    //         })
    //     }
    //     return { success: true }
    // }),
    // getUserFiles: privateProcedure.query(async ({ ctx }) => {
    //     const { userId } = ctx;

    //     return await fetchUserFiles({ userId })
    // }),
    // getFileMessages: privateProcedure
    // .input(
    //   z.object({
    //     limit: z.number().min(1).max(100).nullish(),
    //     cursor: z.string().nullish(),
    //     fileId: z.string(),
    //   })
    // )
    // .query(async ({ ctx, input }) => {
    //   const { userId } = ctx
    //   const { fileId, cursor } = input
    //   const limit = input.limit ?? INFINITE_QUERY_LIMIT

    //   const file = await fetchPDF({
    //     id:fileId,
    //     userId
    //   });

    //   if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

    //   const messages = await fetchMessages({
    //     fileId,
    //     limit,
    //     cursor
    //   })
    //   if(!messages) throw new TRPCError({ code: 'NOT_FOUND' })


    //   return {messages}
    // }),
    // getConversations: privateProcedure
    // .input(
    //   z.object({
    //     limit: z.number().min(1).max(100).nullish(),
    //     cursor: z.string().nullish(),
    //     userId: z.string(),
    //   })
    // )
    // .query(async ({ ctx, input }) => {
    //   const { userId } = ctx
    //   const {  cursor } = input
    //   const limit = input.limit ?? INFINITE_QUERY_LIMIT

    //   const conversations = await fetchConversations({
    //     userId,
    //     limit,
    //     cursor
    //   })
    //   if(!conversations) throw new TRPCError({ code: 'NOT_FOUND' })


    //   return {conversations}
    // }),
    // getFileUploadStatus: privateProcedure.input(z.object({ id: z.string() }))
    //     .query(async ({ input, ctx }) => {
    //         const { userId } = ctx;
    //         const file = await fetchFileById({
    //             id: input.id,
    //             userId
    //         })
    //         if (!file) return { status: 'PENDING' as const }

    //         return { status: file.uploadStatus }

    //     }),
    // getFile: privateProcedure.input(z.object({ key: z.string() }))
    //     .mutation(async ({ ctx, input }) => {
    //         const { userId } = ctx

    //         const file = await fetchFileByKey({
    //             key: input.key,
    //             userId
    //         });

    //         if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

    //         console.log("in trpc",file)
    //         return file;
    //     }),
    // deleteFile: privateProcedure
    //     .input(z.object({ id: z.string() }))
    //     .mutation(async ({ ctx, input }) => {
    //         const { userId } = ctx

    //         const file = await deleteFile({
    //             id: input.id,
    //             userId,
    //         })
    //         return file
    //     }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;