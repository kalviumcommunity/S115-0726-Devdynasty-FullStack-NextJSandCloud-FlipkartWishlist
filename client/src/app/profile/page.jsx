"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, User, CreditCard, Folder, Power, ChevronRight,
  MapPin, Heart, ShoppingCart, Star, Bell, HelpCircle, Phone, Lock, Edit3, ShieldCheck, Mail, ChevronDown, CheckCircle2, RotateCcw, Truck, Ticket
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  
  // States for FAQs
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Session expired or not logged in.");
          setTimeout(() => router.push("/login"), 2000);
          return;
        }

        const res = await fetch("/api/auth/me", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else if (res.status === 401 || res.status === 403) {
          setError("Session expired. Please login again.");
          localStorage.removeItem("token");
          setTimeout(() => router.push("/login"), 2000);
        } else {
          setError("Failed to load profile. Please try again later.");
        }
      } catch (err) {
        setError("Network failure. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) return <ProfileSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-red-200 p-6 flex flex-col items-center text-center">
           <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <Power size={24} />
           </div>
           <p className="text-red-600 font-medium">{error}</p>
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
  const lastName = nameParts.slice(1).join(' ') || "";
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Recently";
  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=F1F3F6&color=2874F0&size=150`;

  // Mock data for new sections
  const stats = [
    { label: "Total Orders", value: "12", icon: Package, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Wishlist Items", value: "8", icon: Heart, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Cart Items", value: "3", icon: ShoppingCart, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Reviews", value: "5", icon: Star, color: "text-[#2874F0]", bg: "bg-blue-50" },
  ];

  const faqs = [
    { q: "What happens when I update my email address (or mobile number)?", a: "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number)." },
    { q: "When will my account be updated with the new email address?", a: "It happens as soon as you confirm the verification code sent to your email and save the changes." },
    { q: "What happens to my existing account when I update details?", a: "Updating details doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details." }
  ];

  return (
    <div className="min-h-screen bg-[#F1F3F6] py-8 font-sans">
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Sidebar */}
        <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
          
          {/* Profile Card */}
          <div className="bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] p-5 hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="relative group cursor-pointer mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex items-center justify-center">
                  <img src={avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Edit3 className="text-white w-6 h-6" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-[#212121] flex items-center gap-1 justify-center">
                {user.name}
                <ShieldCheck className="w-4 h-4 text-[#2874F0]" />
              </h2>
              <p className="text-sm text-[#878787] mt-1">{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                Member since {joinDate}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] py-2">
            
            {/* MY ORDERS */}
            <div className="border-b border-gray-100">
              <div className="p-4 flex items-center gap-4 group cursor-pointer">
                <Package className="w-6 h-6 text-[#2874F0]" />
                <span className="text-base font-semibold text-[#878787] uppercase">My Orders</span>
              </div>
              <div className="flex flex-col pb-2">
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Package className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> My Orders</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><RotateCcw className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Returns</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Truck className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Track Orders</Link>
              </div>
            </div>

            {/* ACCOUNT */}
            <div className="border-b border-gray-100">
              <div className="p-4 flex items-center gap-4">
                <User className="w-6 h-6 text-[#2874F0]" />
                <span className="text-base font-semibold text-[#878787] uppercase">Account</span>
              </div>
              <div className="flex flex-col pb-2">
                <Link href="#" className="py-2.5 pl-14 pr-4 bg-[#F5FAFF] text-[#2874F0] text-[14.5px] font-medium transition-all duration-300 border-l-[3px] border-[#2874F0] flex items-center gap-2"><User className="w-4 h-4"/> Profile Information</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><MapPin className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Saved Addresses</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Heart className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Wishlist</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><ShoppingCart className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Cart</Link>
              </div>
            </div>

            {/* PAYMENTS */}
            <div className="border-b border-gray-100">
              <div className="p-4 flex items-center gap-4">
                <CreditCard className="w-6 h-6 text-[#2874F0]" />
                <span className="text-base font-semibold text-[#878787] uppercase">Payments</span>
              </div>
              <div className="flex flex-col pb-2">
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><CreditCard className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Saved Cards</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><CreditCard className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Saved UPI</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex justify-between items-center group border-l-[3px] border-transparent hover:border-[#2874F0]">
                   <span className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Gift Cards</span>
                   <span className="text-[#388E3C] font-bold text-xs bg-green-50 px-2 py-0.5 rounded-sm">₹0</span>
                </Link>
              </div>
            </div>

            {/* MY ACTIVITY */}
            <div className="border-b border-gray-100">
              <div className="p-4 flex items-center gap-4">
                <Folder className="w-6 h-6 text-[#2874F0]" />
                <span className="text-base font-semibold text-[#878787] uppercase">My Activity</span>
              </div>
              <div className="flex flex-col pb-2">
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Star className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Reviews & Ratings</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Bell className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Notifications</Link>
                <Link href="#" className="py-2.5 pl-14 pr-4 text-[#212121] text-[14.5px] hover:bg-[#F5FAFF] hover:text-[#2874F0] transition-all duration-300 flex items-center gap-2 group border-l-[3px] border-transparent hover:border-[#2874F0]"><Ticket className="w-4 h-4 text-gray-400 group-hover:text-[#2874F0]"/> Coupons</Link>
              </div>
            </div>

            {/* SUPPORT & LOGOUT */}
            <div className="flex flex-col">
              <Link href="#" className="p-4 flex items-center gap-4 group hover:bg-[#F5FAFF] transition-all duration-300">
                <HelpCircle className="w-6 h-6 text-[#2874F0]" />
                <span className="text-base font-semibold text-[#878787] group-hover:text-[#2874F0] uppercase transition-colors">Help Center</span>
              </Link>
              <button onClick={handleLogout} className="p-4 flex items-center gap-4 group hover:bg-red-50 transition-all duration-300 w-full text-left">
                <Power className="w-6 h-6 text-red-500" />
                <span className="text-base font-semibold text-[#878787] group-hover:text-red-500 uppercase transition-colors">Logout</span>
              </button>
            </div>

          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          
          {/* Shopping Statistics - New Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] p-4 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer group">
                 <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-[#212121]">{stat.value}</h3>
                    <p className="text-xs font-medium text-[#878787] uppercase tracking-wide">{stat.label}</p>
                 </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.1)] p-6 md:p-8">
            
            {/* Personal Information */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-[#212121]">Personal Information</h2>
                <button className="text-[#2874F0] text-sm font-medium hover:underline flex items-center gap-1">Edit</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-6">
                <div className="flex flex-col">
                   <label className="text-xs font-medium text-[#878787] uppercase mb-1">First Name</label>
                   <input type="text" value={firstName} disabled className="w-full bg-[#f9f9f9] border border-[#E0E0E0] text-[#212121] px-4 h-12 rounded-sm text-sm focus:outline-none focus:border-[#2874F0] transition-colors cursor-not-allowed" />
                </div>
                <div className="flex flex-col">
                   <label className="text-xs font-medium text-[#878787] uppercase mb-1">Last Name</label>
                   <input type="text" value={lastName} disabled className="w-full bg-[#f9f9f9] border border-[#E0E0E0] text-[#212121] px-4 h-12 rounded-sm text-sm focus:outline-none focus:border-[#2874F0] transition-colors cursor-not-allowed" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#878787] uppercase mb-3 block">Your Gender</label>
                <div className="flex items-center gap-8">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="gender" value="Male" checked={user.gender === 'Male'} disabled className="w-[18px] h-[18px] text-[#2874F0] accent-[#2874F0] cursor-not-allowed" />
                    <span className="text-sm text-[#212121]">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="gender" value="Female" checked={user.gender === 'Female'} disabled className="w-[18px] h-[18px] text-[#2874F0] accent-[#2874F0] cursor-not-allowed" />
                    <span className="text-sm text-[#212121]">Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-lg font-semibold text-[#212121]">Contact Information</h2>
                <button className="text-[#2874F0] text-sm font-medium hover:underline flex items-center gap-1">Edit</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-[#878787] uppercase mb-1">Email Address</label>
                  <input type="email" value={user.email} disabled className="w-full bg-[#f9f9f9] border border-[#E0E0E0] text-[#212121] px-4 h-12 rounded-sm text-sm focus:outline-none cursor-not-allowed" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-[#878787] uppercase mb-1">Mobile Number</label>
                  <input type="tel" value={user.phone || ""} disabled className="w-full bg-[#f9f9f9] border border-[#E0E0E0] text-[#212121] px-4 h-12 rounded-sm text-sm focus:outline-none cursor-not-allowed placeholder:text-gray-400" placeholder="Not added yet" />
                </div>
              </div>
            </div>

            {/* Delivery Address - New Section */}
            <div className="mb-10 border border-[#E0E0E0] rounded-md p-5 bg-white relative overflow-hidden group hover:border-[#2874F0]/30 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#2874F0]"></div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-[#878787] text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">Default</span>
                  <h3 className="font-semibold text-[#212121]">{user.name}</h3>
                </div>
                <button className="text-[#2874F0] hover:bg-[#F5FAFF] p-1.5 rounded-full transition-colors"><Edit3 className="w-4 h-4"/></button>
              </div>
              <p className="text-sm text-[#212121] mb-1">123 E-commerce Street, Tech Park Area, Block B</p>
              <p className="text-sm text-[#212121] mb-2">Mumbai, Maharashtra - 400001</p>
              <p className="text-sm text-[#212121]">Mobile: <span className="font-medium">{user.phone || "Not added"}</span></p>
            </div>

            {/* Account Security - New Section */}
            <div className="mb-10">
               <h2 className="text-lg font-semibold text-[#212121] mb-4">Account Security</h2>
               <div className="flex flex-wrap gap-4 max-w-3xl">
                  <div className="flex-1 min-w-[200px] border border-[#E0E0E0] rounded-md p-4 flex items-center justify-between bg-white hover:shadow-sm transition-shadow">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                           <CheckCircle2 className="w-5 h-5 text-green-600"/>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-[#212121]">Email</p>
                           <p className="text-xs text-[#878787]">Verified</p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex-1 min-w-[200px] border border-[#E0E0E0] rounded-md p-4 flex items-center justify-between bg-white hover:shadow-sm transition-shadow">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
                           <Phone className="w-5 h-5 text-yellow-600"/>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-[#212121]">Phone</p>
                           <p className="text-xs text-[#878787]">Pending Verification</p>
                        </div>
                     </div>
                     <button className="text-xs font-semibold text-[#2874F0] hover:underline">Verify</button>
                  </div>
                  
                  <div className="flex-1 min-w-[200px] border border-[#E0E0E0] rounded-md p-4 flex items-center justify-between bg-white hover:shadow-sm transition-shadow">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                           <Lock className="w-5 h-5 text-[#2874F0]"/>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-[#212121]">Password</p>
                           <p className="text-xs text-[#878787]">Last changed 3 months ago</p>
                        </div>
                     </div>
                     <button className="text-xs font-semibold text-[#2874F0] hover:underline">Update</button>
                  </div>
               </div>
            </div>

            {/* FAQs Accordion */}
            <div>
              <h2 className="text-lg font-semibold text-[#212121] mb-4">FAQs</h2>
              <div className="border border-[#E0E0E0] rounded-md divide-y divide-[#E0E0E0]">
                 {faqs.map((faq, index) => (
                    <div key={index} className="bg-white">
                       <button 
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
                       >
                          <span className="text-sm font-medium text-[#212121]">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-[#878787] transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                       </button>
                       <div className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="text-sm text-[#878787] leading-relaxed">{faq.a}</p>
                       </div>
                    </div>
                 ))}
              </div>
              
              <div className="mt-8">
                 <button className="text-[#2874F0] text-sm font-semibold hover:underline">Deactivate Account</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F1F3F6] py-8 font-sans">
      <div className="w-full max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-4 items-start">
        
        {/* Left Sidebar Skeleton */}
        <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4">
          <div className="bg-white rounded-md shadow-sm p-5 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mb-4"></div>
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-40 animate-pulse mb-3"></div>
            <div className="h-5 bg-gray-200 rounded-full w-24 animate-pulse"></div>
          </div>
          
          <div className="bg-white rounded-md shadow-sm pb-4 h-[500px] animate-pulse">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="p-4 border-b border-gray-100 flex gap-4">
                 <div className="h-6 w-6 bg-gray-200 rounded"></div>
                 <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-md p-4 flex items-center gap-4 h-20 animate-pulse">
                   <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                   <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-12 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                   </div>
                </div>
             ))}
          </div>
          
          <div className="bg-white rounded-md shadow-sm p-6 md:p-8 h-[700px] animate-pulse">
             <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
             <div className="flex gap-4 max-w-2xl mb-10">
               <div className="h-12 w-full bg-gray-200 rounded"></div>
               <div className="h-12 w-full bg-gray-200 rounded"></div>
             </div>
             
             <div className="h-6 w-40 bg-gray-200 rounded mb-6"></div>
             <div className="flex gap-4 max-w-2xl mb-10">
               <div className="h-12 w-full bg-gray-200 rounded"></div>
               <div className="h-12 w-full bg-gray-200 rounded"></div>
             </div>
             
             <div className="h-28 w-full bg-gray-200 rounded mb-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
