"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Heart, ShoppingCart, Power, ShieldCheck, 
  ChevronRight, HelpCircle, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { get } from "@/services/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Session expired or not logged in.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        // Fetch User
        const userData = await get("/api/auth/me");
        if (userData && userData.user) {
           setUser(userData.user);
        } else {
           throw new Error("User data not found");
        }

        // Fetch Wishlist count
        try {
          const wishlistData = await get("/api/wishlist");
          setWishlistCount(Array.isArray(wishlistData) ? wishlistData.length : 0);
        } catch (e) {
          console.error("Failed to load wishlist", e);
        }

        // Fetch Cart count
        try {
          const cartData = await get("/api/cart");
          const totalItems = Array.isArray(cartData) ? cartData.reduce((acc, item) => acc + item.quantity, 0) : 0;
          setCartCount(totalItems);
        } catch (e) {
          console.error("Failed to load cart", e);
        }

      } catch (err) {
        if (err.status === 401 || err.status === 403) {
           setError("Session expired. Please login again.");
           localStorage.removeItem("token");
           setTimeout(() => router.push("/login"), 2000);
        } else {
           setError("Failed to load profile. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow border border-gray-200 p-8 flex flex-col items-center animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-red-100 p-8 flex flex-col items-center text-center">
           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
              <Power size={32} />
           </div>
           <p className="text-red-600 font-semibold text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const nameParts = user.name ? user.name.split(' ') : ["", ""];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(' ') || "Not added";
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently";
  const avatarLetter = firstName ? firstName.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
            
            {/* Profile Hero Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 group hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center text-center relative">
                <button className="absolute top-0 right-0 text-[#2874F0] text-sm font-semibold hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   Edit
                </button>
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-[#2874F0] to-[#60a5fa] flex items-center justify-center text-white text-4xl font-bold shadow-inner ring-4 ring-blue-50 mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  {avatarLetter}
                </div>
                
                <h2 className="text-[22px] font-bold text-[#172337] flex items-center gap-1.5 justify-center">
                  {user.name}
                  <ShieldCheck className="w-5 h-5 text-[#2874F0]" />
                </h2>
                <p className="text-[15px] text-[#64748B] mt-1 font-medium">{user.email}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#f1f5f9] text-[#475569] rounded-full text-xs font-bold tracking-wide uppercase">
                  Member since {joinDate}
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
              
              {/* ACCOUNT */}
              <div className="border-b border-[#E5E7EB] py-2">
                <div className="px-6 py-4 flex items-center gap-4">
                  <User className="w-5 h-5 text-[#2874F0]" />
                  <span className="text-sm font-bold text-[#64748B] uppercase tracking-wider">Account</span>
                </div>
                <div className="flex flex-col pb-2">
                  <Link href="/profile" className="py-3 pl-14 pr-6 bg-[#eff6ff] text-[#2874F0] text-[15px] font-semibold transition-all duration-200 border-l-[4px] border-[#2874F0] flex items-center justify-between group">
                    Profile Information
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/wishlist" className="py-3 pl-14 pr-6 text-[#172337] text-[15px] font-medium hover:bg-[#F5F7FA] hover:text-[#2874F0] transition-all duration-200 border-l-[4px] border-transparent flex items-center justify-between group">
                    Wishlist
                  </Link>
                  <Link href="/cart" className="py-3 pl-14 pr-6 text-[#172337] text-[15px] font-medium hover:bg-[#F5F7FA] hover:text-[#2874F0] transition-all duration-200 border-l-[4px] border-transparent flex items-center justify-between group">
                    Cart
                  </Link>
                </div>
              </div>

              {/* SUPPORT & LOGOUT */}
              <div className="flex flex-col py-2">
                <Link href="#" className="px-6 py-4 flex items-center gap-4 group hover:bg-[#F5F7FA] transition-all duration-200">
                  <HelpCircle className="w-5 h-5 text-[#64748B] group-hover:text-[#2874F0]" />
                  <span className="text-[15px] font-semibold text-[#172337] group-hover:text-[#2874F0] transition-colors">Help Center</span>
                </Link>
                <button onClick={handleLogout} className="px-6 py-4 flex items-center gap-4 group hover:bg-red-50 transition-all duration-200 w-full text-left">
                  <Power className="w-5 h-5 text-red-500" />
                  <span className="text-[15px] font-semibold text-red-600 transition-colors">Logout</span>
                </button>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            
            {/* Quick Actions / Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Link href="/wishlist" className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-md hover:border-[#2874F0]/30 transition-all duration-300 group cursor-pointer">
                 <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-full bg-blue-50 text-[#2874F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                       <Heart className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-[28px] font-extrabold text-[#172337] leading-none mb-1">{wishlistCount}</h3>
                       <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Wishlist Items</p>
                    </div>
                 </div>
                 <ChevronRight className="w-6 h-6 text-[#E5E7EB] group-hover:text-[#2874F0] group-hover:translate-x-1 transition-all" />
              </Link>
              
              <Link href="/cart" className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 flex items-center justify-between hover:-translate-y-1 hover:shadow-md hover:border-[#2874F0]/30 transition-all duration-300 group cursor-pointer">
                 <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-full bg-blue-50 text-[#2874F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                       <ShoppingCart className="w-7 h-7" />
                    </div>
                    <div>
                       <h3 className="text-[28px] font-extrabold text-[#172337] leading-none mb-1">{cartCount}</h3>
                       <p className="text-sm font-semibold text-[#64748B] uppercase tracking-wide">Cart Items</p>
                    </div>
                 </div>
                 <ChevronRight className="w-6 h-6 text-[#E5E7EB] group-hover:text-[#2874F0] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
              <div className="p-8 lg:p-10">
                {/* Personal Information */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
                    <h2 className="text-xl font-bold text-[#172337]">Personal Information</h2>
                    <button className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] font-semibold text-[#2874F0] hover:bg-blue-50 hover:border-[#2874F0] transition-colors">Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                    <div className="flex flex-col">
                       <label className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">First Name</label>
                       <p className="text-[17px] font-medium text-[#172337]">{firstName}</p>
                    </div>
                    <div className="flex flex-col">
                       <label className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Last Name</label>
                       <p className={`text-[17px] font-medium ${lastName === 'Not added' ? 'text-[#64748B] italic' : 'text-[#172337]'}`}>{lastName}</p>
                    </div>
                    <div className="flex flex-col">
                       <label className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Role</label>
                       <div className="inline-flex items-center self-start">
                          <span className="px-3 py-1 bg-[#F5F7FA] border border-[#E5E7EB] rounded-md text-[14px] font-semibold text-[#172337]">
                            {user.role}
                          </span>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E7EB]">
                    <h2 className="text-xl font-bold text-[#172337]">Contact Information</h2>
                    <button className="px-4 py-2 border border-[#E5E7EB] rounded-lg text-[14px] font-semibold text-[#2874F0] hover:bg-blue-50 hover:border-[#2874F0] transition-colors">Edit</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
                    <div className="flex flex-col">
                      <label className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Email Address</label>
                      <div className="flex items-center gap-2">
                        <p className="text-[17px] font-medium text-[#172337]">{user.email}</p>
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans flex flex-col">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-white border-b border-[#E5E7EB] w-full"></div>
      
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-32 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-full w-32 animate-pulse"></div>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#E5E7EB] h-[300px] animate-pulse"></div>
          </div>
          
          {/* Main Content Skeleton */}
          <div className="flex-1 min-w-0 flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
               <div className="h-[106px] bg-white rounded-2xl border border-[#E5E7EB] animate-pulse"></div>
               <div className="h-[106px] bg-white rounded-2xl border border-[#E5E7EB] animate-pulse"></div>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#E5E7EB] h-[500px] animate-pulse p-10">
               <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
               <div className="h-px bg-gray-100 w-full mb-8"></div>
               
               <div className="grid grid-cols-2 gap-8 mb-12">
                 <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                 </div>
                 <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                 </div>
               </div>
               
               <div className="h-8 w-64 bg-gray-200 rounded mb-8 mt-12"></div>
               <div className="h-px bg-gray-100 w-full mb-8"></div>
               
               <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
               <div className="h-6 w-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
