import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Modal = ({
  trigger,
  children,
  toggleModal,
  open,
  title,
  footer,
  fullScreen,
  containerClassName,
  className,
  modal = true,
  hideTitle = false,
}: {
  trigger?: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  toggleModal?(open: boolean): void;
  containerClassName?: string;
  className?: string;
  fullScreen?: boolean;
  title: React.ReactNode;
  hideTitle?: boolean;
  modal?: boolean;
  hideCloseButton?: boolean;
  footer?: React.ReactNode;
}) => {
  return (
    <Dialog
      modal={modal}
      onOpenChange={(v) => {
        toggleModal?.(v);
      }}
      open={open}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        // disableOutsideClick={!autoClose}
        onEscapeKeyDown={fullScreen ? (e) => e.preventDefault() : undefined}
        // showCloseButton={!hideCloseButton}
        className={cn(
          "flex flex-col justify-between overflow-auto",
          fullScreen
            ? "h-svh w-svw rounded-none sm:rounded-none"
            : "max-h-svh w-full max-w-2xl sm:max-h-[calc(100svh-2rem)]",
          containerClassName
        )}
      >
        {title && (
          <DialogHeader
            className={cn(
              "text-grey-800 text-left",
              hideTitle ? "sr-only" : ""
            )}
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="sr-only">{title}</DialogDescription>
          </DialogHeader>
        )}

        <div className={cn("flex-1 overflow-auto sm:min-h-0", className)}>
          {children}
        </div>
        {/* <div className={cn("flex-1 overflow-auto sm:min-h-0 min-h-[30vh]", className)}>{children}</div> */}

        {footer && (
          <DialogFooter className="text-grey-800 flex items-center justify-between gap-3 max-sm:flex-col-reverse">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
