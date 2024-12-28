import React from "react";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
      <div className="border-t border-slate-900/5 py-10">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-5 text-center text-sm leading-6 text-slate-500">
          © 2025 Luxe en bois. Tous droits réservés..
        </p>
        <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <Link href="/privacy-policy">Politique de confidentialité</Link>
          <div className="h-4 w-px bg-slate-500/20" />
          <Link href="/changelog">À propos</Link>
          <div className="h-4 w-px bg-slate-500/20" />
          <Link href="/changelog">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
