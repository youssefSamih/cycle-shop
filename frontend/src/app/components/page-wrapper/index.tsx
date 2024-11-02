import React, { ReactNode } from 'react';

import Header, { NavType } from '../header';
import Footer from '../footer';

// ~~~~~~ Constants

const MAIN_NAV: NavType[] = [
  {
    link: '/#about',
    text: 'About',
  },
  {
    link: '/products',
    text: 'Products',
  },
  {
    link: '/#contact',
    text: 'Contact',
  },
  {
    link: '/variants',
    text: 'Variants',
  },
];

// ~~~~~~ Types

interface Props {
  keepHeaderSolid?: boolean;
  children: ReactNode;
}

// ~~~~~~ Component

export function PageWrapper({ children, keepHeaderSolid }: Props) {
  // ~~~~~~ Render

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header keepHeaderSolid={keepHeaderSolid} mainNavLinks={MAIN_NAV} />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
