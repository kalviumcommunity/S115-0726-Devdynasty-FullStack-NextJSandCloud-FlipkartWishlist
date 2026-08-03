"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="empty-state-wrapper">
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 my-8 mx-auto w-full max-w-md bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 text-center relative overflow-hidden group">
        
        {/* Icon Section */}
        <div className="relative mb-6 cursor-pointer">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[#2874F0]/20 rounded-full blur-xl group-hover:bg-[#2874F0]/30 transition-all duration-500 ease-in-out transform group-hover:scale-110"></div>
          
          <div className="relative flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-50 to-[#F1F3F6] border-2 border-white rounded-full shadow-sm transform group-hover:-translate-y-2 transition-all duration-500 ease-in-out">
            <ShoppingBag 
              className="w-10 h-10 text-[#2874F0] transition-all duration-300 ease-in-out group-hover:scale-110" 
              strokeWidth={1.5} 
            />
          </div>
        </div>
        
        {/* Text Section */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
          Your Cart is Empty!
        </h2>
        <p className="text-gray-500 text-base mb-8 max-w-[90%] leading-relaxed">
          Looks like you haven't added anything yet. Discover our latest products and find something you love.
        </p>
        
        {/* CTA Button */}
        <Link 
          href="/" 
          className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#2874F0] to-[#1b5cc2] rounded-full shadow-[0_4px_14px_rgba(40,116,240,0.3)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(40,116,240,0.4)] active:translate-y-0"
        >
          <span>Explore Trending Deals</span>
        </Link>
      </div>

      <style jsx>{`
        .empty-state-wrapper {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
