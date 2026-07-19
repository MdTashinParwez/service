// import {
//   Share2,
//   Link2,
//   Code2,
// } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="border-t bg-white">
//       <div className="max-w-7xl mx-auto px-6 py-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
//           {/* Logo */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//                 ⚡
//               </div>

//               <h2 className="text-xl font-bold">ServiceHub</h2>
//             </div>

//             <p className="mt-5 text-gray-500 leading-7 max-w-sm">
//               The modern marketplace for every service need. Trusted by
//               providers and customers across India.
//             </p>

//             <div className="flex gap-4 mt-8">
//               <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
//                 <Share2 size={18} />
//               </button>

//               <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
//                 <Link2 size={18} />
//               </button>

//               <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
//                 <Code2 size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Platform */}
//           <div>
//             <h3 className="font-semibold mb-5">Platform</h3>

//             <ul className="space-y-4 text-gray-600">
//               <li>
//                 <a href="#">Browse Services</a>
//               </li>
//               <li>
//                 <a href="#">Become a Provider</a>
//               </li>
//               <li>
//                 <a href="#">Pricing</a>
//               </li>
//               <li>
//                 <a href="#">Enterprise</a>
//               </li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-semibold mb-5">Company</h3>

//             <ul className="space-y-4 text-gray-600">
//               <li>
//                 <a href="#">About</a>
//               </li>
//               <li>
//                 <a href="#">Blog</a>
//               </li>
//               <li>
//                 <a href="#">Careers</a>
//               </li>
//               <li>
//                 <a href="#">Press</a>
//               </li>
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="font-semibold mb-5">Support</h3>

//             <ul className="space-y-4 text-gray-600">
//               <li>
//                 <a href="#">Help Center</a>
//               </li>
//               <li>
//                 <a href="#">Contact</a>
//               </li>
//               <li>
//                 <a href="#">Privacy</a>
//               </li>
//               <li>
//                 <a href="#">Terms</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-gray-500">
//           <p>
//             © 2026 ServiceHub Technologies Pvt. Ltd. All rights reserved.
//           </p>

//           <div className="flex gap-8">
//             <a href="#">Privacy Policy</a>
//             <a href="#">Terms of Service</a>
//             <a href="#">Cookie Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {/* Logo */}

        <div className="lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Zap size={20} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold">ServiceHub</h2>
          </div>

          <p className="max-w-sm leading-7 text-muted-foreground">
            The modern marketplace for every service need. Trusted by providers
            and customers across India.
          </p>
        </div>

        {/* Platform */}

        <div>
          <h3 className="mb-4 font-semibold">Platform</h3>

          <ul className="space-y-3 text-muted-foreground">
            <li><Link to="/">Browse Services</Link></li>
            <li><Link to="/">Become Provider</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">Enterprise</Link></li>
          </ul>
        </div>

        {/* Company */}

        <div>
          <h3 className="mb-4 font-semibold">Company</h3>

          <ul className="space-y-3 text-muted-foreground">
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Press</Link></li>
          </ul>
        </div>

        {/* Support */}

        <div>
          <h3 className="mb-4 font-semibold">Support</h3>

          <ul className="space-y-3 text-muted-foreground">
            <li><Link to="/">Help Center</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border pt-8 px-4 text-sm text-muted-foreground lg:flex-row lg:px-8">
        <p>© 2026 ServiceHub Technologies Pvt. Ltd. All rights reserved.</p>

        <div className="flex gap-6">
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Cookies</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
