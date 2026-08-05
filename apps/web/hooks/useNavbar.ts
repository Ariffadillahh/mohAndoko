import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserProfile } from "../server/auth.server";
import { customToast } from "../lib/toast";
import { logoutUser } from "../services/auth.service";

function getClientCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export const useNavbar = (initialUser: UserProfile | null) => {
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("individu");
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setIsMounted(true);
    const savedTab = getClientCookie("cerdas_keuangan_tab");
    if (savedTab) setActiveTab(savedTab);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();

      setUser(null);
      setIsProfileDropdownOpen(false);
      setIsMobileMenuOpen(false);

      router.push("/auth/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  return {
    user,
    isMounted,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    isServicesDropdownOpen,
    setIsServicesDropdownOpen,
    isProfileDropdownOpen,
    setIsProfileDropdownOpen,
    activeTab,
    handleLogout,
    isActive,
    pathname,
  };
};
