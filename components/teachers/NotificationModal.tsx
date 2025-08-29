"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NotificationModalProps {
  triggerButtonText?: React.ReactNode;
  onSend: (title: string, body: string) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  triggerButtonText = "Send Notification",
  onSend,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");

  const handleSend = () => {
    onSend(title, body);
    setTitle("");
    setBody("");
    setRecipient("");
    setCategory("");
    setOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const schools = [
    { value: "all", label: "All Schools" },
    { value: "sunnydale", label: "Sunnydale High School" },
    { value: "riverview", label: "Riverview Academy" },
    { value: "greenvalley", label: "Green Valley High" },
    { value: "lakeside", label: "Lakeside Academy" },
    { value: "oakridge", label: "Oak Ridge School" },
  ];

  const filteredSchools = schools.filter((school) =>
    school.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{triggerButtonText}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[669px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#141414]">
            Send Notification
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label
              htmlFor="notification-title"
              className="text-sm font-medium text-[#141414]">
              Notification Title
            </label>
            <input
              type="text"
              id="notification-title"
              placeholder='e.g., "Reminder: Certification Renewal"'
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565] font-normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          
          <div className="flex flex-col gap-2">
            <label
              htmlFor="notification-body"
              className="text-sm font-medium text-[#141414]">
              Notification Body
            </label>
            <input
              type="text"
              id="notification-body"
              placeholder='e.g., "Your certification is overdue as of 03/12/2025. Please renew soon."'
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

      
          <div className="flex flex-col gap-2">
            <label
              htmlFor="notification-recipient"
              className="text-sm font-medium text-[#141414]">
              Recipient
            </label>
            <select
              id="notification-recipient"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}>
              <option value="">Select Recipient</option>
              <option value="all">All Teachers</option>
              <option value="active">Active Teachers</option>
              <option value="inactive">Inactive Teachers</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="notification-category"
              className="text-sm font-medium text-[#141414]">
              Select Category of Schools
            </label>

            <input
              type="text"
              id="school-search"
              placeholder="Search school..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              id="notification-category"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category of Schools</option>
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <option key={school.value} value={school.value}>
                    {school.label}
                  </option>
                ))
              ) : (
                <option disabled>No schools found</option>
              )}
            </select>
          </div>
        </form>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="shadow-md"
            type="button">
            Cancel
          </Button>

          <Button variant="default" onClick={handleSend} type="button">
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
