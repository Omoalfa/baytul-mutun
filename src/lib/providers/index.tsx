'use client';

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient } from '@tanstack/query-core'
import { QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isPrivateRoute = pathname.startsWith('/instructor') || pathname.startsWith('/dashboard');

    return <>
    <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {!isPrivateRoute && <Navbar />}
                <>{children}</>
            {!isPrivateRoute && <Footer />}
          </AuthProvider>
        </QueryClientProvider>
    </>
}
