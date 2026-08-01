import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container mx-auto px-4 py-10">

        <div className="grid gap-8 md:grid-cols-3">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-600 p-2">
                <Wrench className="text-white" size={22} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                FixItNow
              </h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Trusted home service platform connecting customers
              with skilled professionals.
            </p>
          </div>


          {/* Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-cyan-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/services" className="hover:text-cyan-400">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-cyan-400">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-3 text-sm">

              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-500" />
                Dhaka, Bangladesh
              </p>

              <p className="flex items-center gap-2">
                <Phone size={18} className="text-cyan-500" />
                +880 1700-000000
              </p>

              <p className="flex items-center gap-2">
                <Mail size={18} className="text-cyan-500" />
                support@fixitnow.com
              </p>

            </div>
          </div>

        </div>


        {/* Bottom */}
        <div className="mt-8 border-t border-slate-800 pt-5 text-center text-sm text-slate-500">
          © 2026 FixItNow. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;