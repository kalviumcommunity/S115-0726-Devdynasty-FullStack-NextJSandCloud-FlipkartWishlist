"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Package, Heart, ShoppingCart, MapPin, CreditCard, 
  Settings, LogOut, Edit3, ShieldCheck, Bell, 
  Lock, User, Star, ChevronRight, Activity, Calendar, Key
} from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  Button, Badge, Avatar, AvatarFallback, Separator, Skeleton
} from "../../components/ui/shadcn";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

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

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1F3F6] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-red-200 shadow-lg bg-white rounded-xl">
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-4">
              <Activity size={24} />
            </div>
            <p className="text-red-600 font-medium">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) return null;

  const stats = [
    { label: "Total Orders", value: "24", icon: Package, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Wishlist Items", value: "12", icon: Heart, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Cart Items", value: "3", icon: ShoppingCart, color: "text-[#2874F0]", bg: "bg-blue-50" },
    { label: "Reviews", value: "8", icon: Star, color: "text-[#2874F0]", bg: "bg-blue-50" },
  ];

  const quickActions = [
    { label: "My Orders", icon: Package, href: "/profile/orders" },
    { label: "Wishlist", icon: Heart, href: "/wishlist" },
    { label: "Cart", icon: ShoppingCart, href: "/cart" },
    { label: "Saved Addresses", icon: MapPin, href: "/profile/addresses" },
    { label: "Payment Methods", icon: CreditCard, href: "/profile/payments" },
    { label: "Settings", icon: Settings, href: "/profile/settings" },
  ];

  const accountSettings = [
    { title: "Change Password", desc: "Update your account password", icon: Key },
    { title: "Privacy & Security", desc: "Manage your data and security", icon: Lock },
    { title: "Notification Preferences", desc: "Manage email and SMS alerts", icon: Bell },
  ];

  const recentOrders = [
    { id: "OD1234567890", name: "Apple MacBook Air M2", price: "₹89,990", date: "Oct 24, 2026", status: "Delivered", image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=150&q=80" },
    { id: "OD0987654321", name: "Sony WH-1000XM5", price: "₹29,990", date: "Oct 18, 2026", status: "In Transit", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150&q=80" },
  ];

  const memberSinceDate = new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#F1F3F6] py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Hero Profile Section */}
        <Card className="border-none shadow-sm bg-white rounded-xl overflow-hidden">
          <CardContent className="p-8 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 text-center sm:text-left">
              <Avatar className="h-32 w-32 border-4 border-white shadow-md bg-white">
                <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-blue-50 to-blue-100 text-[#2874F0]">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-slate-900 flex justify-center sm:justify-start items-center gap-2">
                  {user.name}
                  <Badge variant="secondary" className="bg-[#2874F0]/10 text-[#2874F0] hover:bg-[#2874F0]/20 rounded-sm px-2">
                    <ShieldCheck size={14} className="mr-1" /> Verified
                  </Badge>
                </h1>
                <p className="text-lg text-slate-500 font-medium">{user.email}</p>
                <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                  <Calendar size={14} /> Member since {memberSinceDate}
                </p>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-0 flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#2874F0] hover:bg-[#1d5bbd] text-white shadow-sm rounded-md h-11 px-6 font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md">
                <Edit3 size={18} className="mr-2" /> Edit Profile
              </Button>
              <Button variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm rounded-md h-11 px-6 font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md" onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}>
                <LogOut size={18} className="mr-2" /> Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm bg-white rounded-xl hover:shadow-xl transition-all duration-300 ease-in-out cursor-default group hover:-translate-y-1">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-slate-900 leading-none">{stat.value}</h3>
                </div>
                <div className={`p-4 rounded-full ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                  <stat.icon size={28} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Personal Information Card */}
            <Card className="border-none shadow-sm bg-white rounded-xl">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-lg font-bold text-slate-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-y-6">
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
                    <p className="text-base font-semibold text-slate-900">{user.name}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                    <p className="text-base font-semibold text-slate-900">{user.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                    <p className="text-base font-semibold text-slate-900">{user.phone || "+91 98765 43210"}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">User ID</p>
                    <p className="text-sm font-bold text-slate-700">#{user.id || "USR-9938"}</p>
                  </div>
                  <div className="col-span-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role</p>
                    <Badge variant="outline" className="uppercase tracking-wider text-[10px] border-[#2874F0]/30 text-[#2874F0] font-bold bg-[#2874F0]/5">
                      {user.role}
                    </Badge>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Member Since</p>
                    <p className="text-sm font-semibold text-slate-700">{memberSinceDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="border-none shadow-sm bg-white rounded-xl">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-lg font-bold text-slate-800">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {accountSettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-[#F1F3F6] transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="text-slate-400 group-hover:text-[#2874F0] transition-colors">
                        <setting.icon size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{setting.title}</p>
                        <p className="text-xs text-slate-500">{setting.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-[#2874F0] transition-colors" />
                  </div>
                ))}
                <div 
                  onClick={() => {
                    localStorage.removeItem("token");
                    router.push("/login");
                  }}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-red-50 transition-colors cursor-pointer group mt-2 border-t border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-red-400 group-hover:text-red-600 transition-colors">
                      <LogOut size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-red-600 text-sm">Logout</p>
                      <p className="text-xs text-red-400">Sign out of your account</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Actions */}
            <Card className="border-none shadow-sm bg-white rounded-xl">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                <CardTitle className="text-lg font-bold text-slate-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {quickActions.map((action, index) => (
                    <Link href={action.href} key={index} className="flex flex-col items-center justify-center p-4 rounded-xl hover:bg-[#F1F3F6] transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 group">
                      <div className="h-14 w-14 rounded-full bg-[#F1F3F6] text-slate-600 flex items-center justify-center mb-3 group-hover:bg-[#2874F0] group-hover:text-white transition-all shadow-sm">
                        <action.icon size={24} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 text-center group-hover:text-[#2874F0]">{action.label}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="border-none shadow-sm bg-white rounded-xl flex flex-col">
              <CardHeader className="px-6 pt-6 pb-4 flex flex-row items-center justify-between border-b border-slate-100">
                <CardTitle className="text-lg font-bold text-slate-800">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="text-[#2874F0] font-semibold hover:text-[#1d5bbd] hover:bg-blue-50">View All</Button>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-[#2874F0]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-in-out gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <img src={order.image} alt={order.name} className="w-20 h-20 rounded-md object-cover border border-slate-100" />
                          <div>
                            <h4 className="font-semibold text-slate-900 text-base">{order.name}</h4>
                            <p className="text-sm text-slate-500 mb-1">Order #{order.id}</p>
                            <Badge variant="secondary" className={`text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                              {order.status} on {order.date}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-2">
                          <p className="font-bold text-lg text-slate-900">{order.price}</p>
                          <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-[#F1F3F6] font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-20 w-20 rounded-full bg-[#F1F3F6] flex items-center justify-center mb-6">
                      <Package size={40} className="text-slate-400" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">No recent orders</h4>
                    <p className="text-slate-500 mb-6 max-w-sm">You haven't placed any orders recently. Discover our latest products and offers!</p>
                    <Link 
                      href="/" 
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 bg-[#2874F0] text-white hover:bg-[#1d5bbd] hover:shadow-md h-11 px-8 shadow-sm"
                    >
                      Start Shopping
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#F1F3F6] py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <Card className="border-none shadow-sm bg-white rounded-xl">
          <CardContent className="p-8 sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
              <Skeleton className="h-32 w-32 rounded-full" />
              <div className="space-y-3 text-center sm:text-left">
                <Skeleton className="h-8 w-48 mx-auto sm:mx-0" />
                <Skeleton className="h-5 w-64 mx-auto sm:mx-0" />
                <Skeleton className="h-4 w-40 mx-auto sm:mx-0" />
              </div>
            </div>
            <div className="mt-8 sm:mt-0 flex gap-4">
              <Skeleton className="h-11 w-36 rounded-md" />
              <Skeleton className="h-11 w-32 rounded-md" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="border-none shadow-sm bg-white rounded-xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="h-14 w-14 rounded-full flex-shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm bg-white rounded-xl">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-y-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={i <= 3 ? "col-span-2 space-y-2" : "col-span-1 space-y-2"}>
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-none shadow-sm bg-white rounded-xl h-64">
              <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="p-6">
                <Skeleton className="h-full w-full rounded-xl" />
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}


