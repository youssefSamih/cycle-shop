import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

// ~~~~~~ Component

export default function Footer() {
  // ~~~~~~ Render

  return (
    <footer className="bg-[rgb(27,31,27)] text-white pt-8">
      {/* Top contact bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="border p-4 flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
          <div className="w-full md:w-auto h-px md:h-auto bg-white my-4 md:my-0"></div>
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-1/3">
            <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
            <div>
              <div className="font-semibold">Write to us</div>
              <div>bicycle-shop@gmail.com</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white mx-4"></div>
          <div className="w-full md:w-auto h-px md:h-auto bg-white my-4 md:my-0"></div>
          <div className="flex items-center w-full md:w-1/3">
            <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
            <div>
              <div className="font-semibold">Address</div>
              <div>Lisboa</div>
              <div>Portugal</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Company info */}
        <div className="">
          <Link href="/" className="text-2xl font-bold text-[#18ff6d]">
            Bicycle shop
          </Link>

          <p className="text-sm mb-4">
            Bicycle shop is a trusted and established bicycle retailer, offering
            top-quality bikes and cycling gear. We are passionate about
            promoting a healthy and sustainable lifestyle through cycling.
          </p>

          <div className="flex space-x-4">
            <Facebook className="w-5 h-5" />
            <Twitter className="w-5 h-5" />
            <Youtube className="w-5 h-5" />
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-sm mb-4">
            Subscribe for Biking Adventures: Unlock Exclusive Offers, Tips, and
            Updates!
          </p>

          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-grow px-4 py-2 text-[#285238] text-sm border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#2db53f]"
            />
            <button
              type="submit"
              className="bg-[#2db53f] px-4 py-2 text-sm hover:bg-[#2db53f] transition-colors rounded-r-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#285238] text-center">
        <div className="container mx-auto px-4 text-xs border-t border-[#285238] py-4 md:flex md:justify-between items-center">
          <div>Copyright © 2024 Bicycle shop. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
