import { cookies } from "next/headers";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export async function getSSRUser(): Promise<UserProfile | null> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) return null;

    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
    ).replace("localhost", "127.0.0.1");


    const refreshRes = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
        "Content-Type": "application/json", 
      },
      cache: "no-store",
    });


    if (!refreshRes.ok) return null;

    const refreshData = await refreshRes.json();
    const accessToken = refreshData.data?.accessToken;

    if (!accessToken) return null;


    const userRes = await fetch(`${apiUrl}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });


    if (!userRes.ok) return null;

    const userData = await userRes.json();

    return userData.data;
  } catch (error) {
    console.error("💥 GAGAL TOTAL KONEKSI SSR:", error);
    return null;
  }
}
