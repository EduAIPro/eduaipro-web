import { Wrench } from "lucide-react";

export default function Maintenance() {
  return (
    <main className="min-h-screen w-full bg-[linear-gradient(180deg,_#E1EAFF_0%,_#FFFFFF_100%)] flex flex-col items-center justify-center px-5 text-center">
      {/* <Image
        src="/assets/images/logo-outline.png"
        alt="EduAI Pro"
        width={160}
        height={40}
        className="mb-10"
      /> */}

      <div className="size-16 rounded-full bg-primary-100 border border-primary-150 flex items-center justify-center mb-6">
        <Wrench className="size-7 text-primary-400" />
      </div>

      <h1 className="text-grey-800 font-semibold text-3xl md:text-4xl mb-3">
        We&apos;ll be right back
      </h1>

      <p className="text-base text-grey-500 font-medium max-w-md">
        EduAI Pro is currently undergoing scheduled maintenance to improve your
        experience. We&apos;ll be back online shortly. Thank you for your
        patience.
      </p>
    </main>
  );
}
