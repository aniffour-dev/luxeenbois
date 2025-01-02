import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaDribbble,
} from "react-icons/fa";
import Image from "next/image";
import LogoFooter from "../../../public/LuxeenBois.png"

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between gap-20">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src={LogoFooter}
                className="h-5 me-40 mb-3"
                alt="Luxeenbois Logo"
                width={0}
                height={0}
              />
            </Link>
            <p className="mb-6 text-sm text-slate-900 font-semibold max-w-[400px]">Luxeenbois est une entreprise spécialisée dans la décoration intérieure et les dernières tendances déco</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Informations
              </h2>
              <ul className="text-gray-500 font-medium">
              <li className="mb-2">
                  <Link href="/" className="text-sm text-slate-900 font-semibold">
                  Quartier Industriel Sidi Ghanem, 40000 Marrakech, Safi-Marrakech
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="tel:+212626487883" className="text-sm text-slate-900 font-semibold">
                    +212 6 26 48 78 83
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:contact@luxeenbois.com"
                    className="text-sm text-slate-900 font-semibold"
                  >
                    contact@luxeenbois.com
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Quick Links
              </h2>
              <ul className="">
                <li className="mb-1">
                  <Link
                    href="/about"
                    className="text-sm text-slate-900 font-semibold uppercase"
                  >
                    A Propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-slate-900 font-semibold uppercase"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-1">
                  <Link href="/privacy-policy" className="text-sm text-slate-900 font-semibold uppercase">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-slate-900 font-semibold uppercase">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2025{" "}
            <Link href="/" className="hover:underline">
              LuxeEnBois™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FaFacebookF className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <FaDiscord className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Discord community</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <FaTwitter className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <FaGithub className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <FaDribbble className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
