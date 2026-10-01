import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function PageContainer({ children, className }: { children: ReactNode; className?: string }) { return <main className={cn("mx-auto w-full max-w-5xl px-6 py-16", className)}>{children}</main>; }
