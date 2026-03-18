"use client";

import { usePathname } from "next/navigation";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

export function CursorWrapper() {
  const pathname = usePathname();

  // Do not render on /admin or its subpages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <SmoothCursor />;
}
