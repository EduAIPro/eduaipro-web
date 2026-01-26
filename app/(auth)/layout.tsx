import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="lg:flex flex-row justify-between">
      <section className="w-full p-4 xs:p-6 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="/assets/images/logo-outline.png"
              width={150}
              height={70}
              alt=""
            />
          </Link>
        </div>

        <div className="h-full">{children}</div>
      </section>
      <section className="w-full min-h-screen bg-auth-bg bg-cover max-lg:hidden" />
    </main>
  );
}
