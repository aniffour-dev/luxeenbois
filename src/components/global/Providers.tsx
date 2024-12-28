// components/global/Providers.tsx
"use client";
import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';

export function Providers({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}