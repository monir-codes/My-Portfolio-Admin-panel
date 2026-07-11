"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { Loader } from "lucide-react";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser && currentUser.email) {
        // Fetch JWT from our server
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://portfolio-server-ten-fawn.vercel.app"}/api/jwt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: currentUser.email })
          });
          const data = await res.json();
          if (data.token) {
            localStorage.setItem('access-token', data.token);
          }
        } catch (error) {
          console.error("JWT fetch error", error);
        }
      } else {
        localStorage.removeItem('access-token');
      }

      setUser(currentUser);
      setLoading(false);
      
      // Handle redirect if not logged in
      if (!currentUser && pathname !== "/login" && pathname !== "/setup-admin") {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const logout = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem('access-token');
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader className="w-10 h-10 text-[#00FF00] animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
