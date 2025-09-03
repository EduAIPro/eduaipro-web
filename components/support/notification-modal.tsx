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

interface AddTicketModalProps {
  triggerButtonText?: React.ReactNode;
  onSend: (title: string, body: string) => void;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({
  triggerButtonText = "Add Ticket",
  onSend,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [requester, setRequester] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleSend = () => {
    onSend(name, description);
    setPriority("");
    setDescription("");
    setRequester("");
    setAssignee("");
    setOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{triggerButtonText}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[669px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#141414]">
            Create Ticket
          </DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="add-ticket"
              className="text-sm font-medium text-[#141414]">
              Ticket Name
            </label>
            <input
              type="text"
              id="add-ticket"
              placeholder='e.g., "Login issue"'
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565] font-normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="priority"
              className="text-sm font-medium text-[#141414]">
              Priority
            </label>
            <select
              id="priority"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}>
              <option value="">Set Ticket Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-[#141414]">
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder='e.g., "Hands-on session for 15 teachers"'
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="requester"
              className="text-sm font-medium text-[#141414]">
              Requester
            </label>
            <select
              id="requester"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={requester}
              onChange={(e) => setRequester(e.target.value)}>
              <option value="">Select Requester</option>
              <option value="all">All Teachers</option>
              <option value="active">Active Teachers</option>
              <option value="inactive">Inactive Teachers</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="assignee"
              className="text-sm font-medium text-[#141414]">
              Assignee
            </label>
            <select
              id="assignee"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#656565]"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}>
              <option value="">Select Assignee</option>
              <option value="all">All Teachers</option>
              <option value="active">Active Teachers</option>
              <option value="inactive">Inactive Teachers</option>
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
            Create Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTicketModal;
