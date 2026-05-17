import { AdminSidebar } from "@/components/admin/admin-sidebar";
// In a real app, you would verify the session and role here
// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*
  const session = await auth();
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "STAFF")) {
    redirect("/login");
  }
  */

  return (
    <div className="flex min-h-screen bg-[var(--background-secondary)]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
