"use client";
import { SendMessageModal } from "@/components/admin/modals";

export default function AdminMessagesPage() {
  return (
    <section>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold sm:font-bold text-2xl sm:text-3xl">
            Messages
          </h1>
          <SendMessageModal />
        </div>
      </div>
    </section>
  );
}
