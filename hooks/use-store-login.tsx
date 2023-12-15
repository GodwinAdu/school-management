// // your-zustand-store.js
// import {create} from 'zustand';

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   login: async (username, password) => {
//     const response = await fetch('/api/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       const { user, token } = await response.json();

//       // Update the Zustand store state after a successful login
//       set({ user, token });

//       return true;
//     } else {
//       return false;
//     }
//   },
// }));

// export default useAuthStore;
