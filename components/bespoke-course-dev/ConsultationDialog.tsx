"use client";

import { createConsultationKey } from "@/api/keys";
import { ConsultationError, createConsultation } from "@/api/mutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

// Bots fill every field and submit instantly; people don't.
const MIN_FILL_MS = 3000;

const todayLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

export const ConsultationDialog = () => {
  const [open, setOpen] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [date, setDate] = useState("");
  const [size, setSize] = useState("");
  // honeypot: hidden from people, so only a bot fills it
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const openedAt = useRef(0);

  const { trigger, isMutating } = useSWRMutation(
    createConsultationKey,
    createConsultation,
  );

  const reset = () => {
    setSchoolName("");
    setEmail("");
    setDate("");
    setSize("");
    setWebsite("");
    setErrors([]);
  };

  const sizeNum = Number(size);
  const valid =
    schoolName.trim() !== "" &&
    schoolName.trim().length <= 255 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    email.trim().length <= 255 &&
    date !== "" &&
    date >= todayLocal() &&
    Number.isInteger(sizeNum) &&
    sizeNum >= 1 &&
    sizeNum <= 1_000_000;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || isMutating) return;
    setErrors([]);

    const tooFast = Date.now() - openedAt.current < MIN_FILL_MS;
    if (website !== "" || tooFast) {
      // Pretend it worked so the bot learns nothing; send nothing.
      if (website !== "") {
        setSentTo(email.trim());
        setDone(true);
        reset();
      } else {
        setErrors(["Please take a moment to check your details and try again."]);
      }
      return;
    }

    try {
      await trigger({
        schoolName: schoolName.trim(),
        email: email.trim(),
        consultationDate: date,
        schoolSize: sizeNum,
      });
      setSentTo(email.trim());
      setDone(true);
      reset();
    } catch (err) {
      const { status, messages } = err as ConsultationError;
      if (status === 429) {
        setErrors(["Please wait a minute and try again."]);
      } else if (status === 400 && messages.length) {
        setErrors(messages);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) {
          openedAt.current = Date.now();
          setDone(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <p>Schedule a consultation</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        {done ? (
          <>
            <DialogHeader>
              <DialogTitle>Consultation requested</DialogTitle>
              <DialogDescription>
                Thanks, we’ll be in touch at {sentTo}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <DialogHeader>
              <DialogTitle>Schedule a consultation</DialogTitle>
              <DialogDescription>
                Tell us about your school and when you’d like to talk.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1.5">
              <Label htmlFor="c-school">School name</Label>
              <Input
                id="c-school"
                required
                maxLength={255}
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email</Label>
              <Input
                id="c-email"
                type="email"
                required
                maxLength={255}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-date">Preferred date</Label>
              <Input
                id="c-date"
                type="date"
                required
                min={todayLocal()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-size">Number of teachers / school size</Label>
              <Input
                id="c-size"
                type="number"
                required
                min={1}
                max={1_000_000}
                step={1}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>

            {/* Honeypot: off-screen, unfocusable, ignored by assistive tech */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                width: 1,
                height: 1,
                overflow: "hidden",
              }}
            >
              <label htmlFor="c-website">Leave this field empty</label>
              <input
                id="c-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {errors.length ? (
              <ul className="list-disc space-y-0.5 rounded-lg bg-red-50 p-3 pl-6 text-xs text-red-700">
                {errors.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : null}

            <DialogFooter>
              <Button type="submit" disabled={!valid} loading={isMutating}>
                Request consultation
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
