"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { invalidateSeats } from "@/lib/school-invalidate";
import { SeatPurchaseFlow } from "./seat-purchase-flow";

type BuySeatsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BuySeatsModal = ({ open, onOpenChange }: BuySeatsModalProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-xl">
      <DialogHeader>
        <DialogTitle>Buy seats</DialogTitle>
        <DialogDescription>
          Each seat covers one teacher on all five pathways for 24 months.
          Nothing renews by itself.
        </DialogDescription>
      </DialogHeader>
      {/* remount on open so the flow always starts at the first step */}
      {open ? (
        <SeatPurchaseFlow
          onCancel={() => onOpenChange(false)}
          onInvoiceDone={() => {
            invalidateSeats();
            onOpenChange(false);
          }}
        />
      ) : null}
    </DialogContent>
  </Dialog>
);
