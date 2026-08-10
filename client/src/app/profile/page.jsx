"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Power, Calendar, Phone } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

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
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow border border-red-200 p-8 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                <Power size={24} />
             </div>
             <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently joined";
  const avatarUrl = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=2563eb&color=fff&size=128`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      <div className="flex-1 flex justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
          
          {/* Header Banner */}
          <div className="h-32 bg-blue-600 w-full relative">
            <div className="absolute -bottom-12 w-full flex justify-center">
              <img 
                src={avatarUrl} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-sm bg-white"
              />
            </div>
          </div>
          
          {/* Main Info */}
          <div className="pt-16 pb-8 px-8 flex flex-col items-center text-center border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-1.5 text-sm">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
          </div>

          {/* Details Section */}
          <div className="p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">Profile Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-base text-gray-900 font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Mobile Number</p>
                  <p className="text-base text-gray-900 font-medium">{user.phone || "Not added yet"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-base text-gray-900 font-medium">{joinDate}</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 font-semibold rounded-lg transition-colors"
              >
                <Power className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
