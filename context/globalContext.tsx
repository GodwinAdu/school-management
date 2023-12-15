// "use client";

// import { fetchAdmin } from "@/lib/actions/fetchadmin.actions";
// import { fetchRole } from "@/lib/actions/role.actions";
// import { useParams } from "next/navigation";
// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// interface GlobalContextType {
//   userRole: any; // Update this with the actual type of userRole
//   setUserRole: Dispatch<SetStateAction<any>>; // Update this with the actual type of setUserRole
//   currentUser:any,
//   setCurrentUser:Dispatch<SetStateAction<any>>
// }

// export const GlobalContext = createContext<GlobalContextType>({
//   userRole: {}, // Provide an initial value here
//   setUserRole: () => {}, // Provide an initial value here
//   currentUser: {},
//   setCurrentUser: () => {},
// });

// export const GlobalContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   const [userRole, setUserRole] = useState({});
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const params = useParams();
//   const id:string = params.adminId;
//   console.log(id)

//   useEffect(() => {
//     const fetchRoleData = async () => {
//       try {
//         setIsLoading(true);
//         const user = await fetchAdmin({ id });
//         if (!user) {
//           console.log("User does not exist");
//           return null;
//         }
//         setCurrentUser(user);
//         const role = await fetchRole({ value: user?.role });
//         if (!userRole) {
//           console.log("cant find User role");
//           return;
//         }
//         setIsLoading(false);
//         setUserRole(role);
//       } catch (error) {
//         console.log("Error happen while fetching role in context", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchRoleData();
//   }, [setUserRole]);

//   return (
//     <GlobalContext.Provider
//       value={{
//         userRole,
//         setUserRole,
//         isLoading,
//       }}
//     >
//       {children}
//     </GlobalContext.Provider>
//   );
// };
