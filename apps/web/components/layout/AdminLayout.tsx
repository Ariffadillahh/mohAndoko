import AdminSidebar from "./Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-softSilver">
      <AdminSidebar />
      
      <main className="flex-1 w-full lg:ml-64 p-6 md:p-10 pt-20 lg:pt-10 transition-all">
        {children}
      </main>
    </div>
  );
}