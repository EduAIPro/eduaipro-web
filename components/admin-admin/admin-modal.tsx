"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link2Icon } from "lucide-react";
import { Input } from "../ui/input";

interface AdminModalProps {
  triggerButtonText?: React.ReactNode;
  onSend: (title: string, body: string) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({
  triggerButtonText = "Invite Admin",
  onSend,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");

  const handleSend = () => {
    onSend(title, body);
    setTitle("");
    setBody("");
    setRecipient("");
    setCategory("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{triggerButtonText}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[669px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#141414]">
            Invite Admin
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <div className="relative w-full">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="h-11"
              // disabled={isMutating}
            />
            <Button
              size="sm"
              disabled={!email}
              // loading={isMutating}
              // onClick={handleSendInvite}
              className="absolute right-1 top-1 bottom-0.5 !scale-100">
              Send invite
            </Button>
          </div>
          <Button
            variant="ghost"
            // loading={isLoading}
            onClick={() => {
              // navigator.clipboard.writeText(
              //   `${process.env.NEXT_PUBLIC_SCHOOL_SIGNUP_LINK}&token=${data?.token}`
              // );
              // toast.success("Invite link copied successfully");
            }}>
            <div className="flex items-center gap-1 text-primary-400 hover:underline cursor-pointer">
              <Link2Icon className="-rotate-45 size-4" />
              <p className="text-sm">Copy invite link</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminModal;
