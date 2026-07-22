import { redirect } from "next/navigation";
import { getCurrentUser, isAdmin } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) redirect("/login?redirect=/admin");
  if (!isAdmin(user)) redirect("/unauthorized");

  return children;
}
