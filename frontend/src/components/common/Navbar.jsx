// // import { Link, NavLink } from "react-router-dom";

// // const navLinks = [
// //   { name: "Services", path: "/services" },
// //   { name: "Providers", path: "/providers" },
// //   { name: "Become a Provider", path: "/become-provider" },
// //   { name: "About", path: "/about" },
// // ];

// // const Navbar = () => {
// //   return (
// //     <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
// //       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
// //         {/* Logo */}
// //         <Link
// //           to="/"
// //           className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
// //         >
// //           ServiceHub
// //         </Link>

// //         {/* Navigation */}
// //         <ul className="flex items-center gap-8">
// //           {navLinks.map((link) => (
// //             <li key={link.path}>
// //               <NavLink
// //                 to={link.path}
// //                 className={({ isActive }) =>
// //                   `text-sm font-medium transition-colors duration-200 ${
// //                     isActive
// //                       ? "text-blue-600"
// //                       : "text-gray-600 hover:text-blue-600"
// //                   }`
// //                 }
// //               >
// //                 {link.name}
// //               </NavLink>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Auth Buttons */}
// //         <div className="flex items-center gap-3">
// //           <Link
// //             to="/login"
// //             className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
// //           >
// //             Sign in
// //           </Link>

// //           <Link
// //             to="/signup"
// //             className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
// //           >
// //             Get Started
// //           </Link>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const navLinks = [
//   { name: "Services", path: "/services" },
//   { name: "Providers", path: "/providers" },
//   { name: "Become a Provider", path: "/become-provider" },
//   { name: "About", path: "/about" },
// ];

// const Navbar = () => {
//   const { user, loading } = useAuth();

//   return (
//     <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

//         {/* Logo */}

//         <Link
//           to="/"
//           className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
//         >
//           ServiceHub
//         </Link>

//         {/* Navigation */}

//         <ul className="flex items-center gap-8">
//           {navLinks.map((link) => (
//             <li key={link.path}>
//               <NavLink
//                 to={link.path}
//                 className={({ isActive }) =>
//                   `text-sm font-medium transition-colors duration-200 ${
//                     isActive
//                       ? "text-blue-600"
//                       : "text-gray-600 hover:text-blue-600"
//                   }`
//                 }
//               >
//                 {link.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>

//         {/* Auth */}

//         <div className="flex items-center gap-3">

//           {loading ? (
//             <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100" />
//           ) : user ? (
//             <>
//               <span className="text-sm font-medium text-gray-700">
//                 Hi, {user.username}
//               </span>

//               <button
//                 className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
//               >
//                 Sign in
//               </Link>

//               <Link
//                 to="/signup"
//                 className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
//               >
//                 Get Started
//               </Link>
//             </>
//           )}

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";

const navLinks = [
  { name: "Services", path: "/services" },
  { name: "Providers", path: "/providers" },
  { name: "Become a Provider", path: "/become-provider" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const { user, loading, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();

      // frontend state clear
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 transition hover:text-blue-700"
        >
          ServiceHub
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100" />
          ) : user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.username}
              </span>

             <button
             type="button"
              onClick={handleLogout}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Logout
            </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;