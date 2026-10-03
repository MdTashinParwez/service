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

            <h2 className="text-2xl font-bold">Helper</h2>
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
        <p>© 2026 Helper Technologies Pvt. Ltd. All rights reserved.</p>

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
