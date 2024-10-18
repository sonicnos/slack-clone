"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { UserButton } from "./features/auth/components/user-button";

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuthActions();
  return (
    <div className="h-full">
      <p>log in</p>
      <UserButton />
    </div>
  );
}
