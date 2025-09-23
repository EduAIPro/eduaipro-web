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
  autoClose = true,
  containerClassName,
  className,
  modal = true,
  hideTitle = false,
  hideCloseButton = false,
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
  autoClose?: boolean;
  modal?: boolean;
  hideCloseButton?: boolean;
  footer?: React.ReactNode;
}) => {
  return (
    <Dialog
      modal={modal}
      onOpenChange={(v) => {
        // flushSync(() => {
        toggleModal?.(v);
        // });
      }}
      open={open}
    >
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        onFocusOutside={(e) => {
          e.stopPropagation();
        }}
        // disableOutsideClick={!autoClose}
        onEscapeKeyDown={fullScreen ? (e) => e.preventDefault() : undefined}
        // showCloseButton={!hideCloseButton}
        className={cn(
          "flex flex-col justify-between overflow-auto p-0",
          fullScreen
            ? "h-svh w-svw rounded-none sm:rounded-none"
            : "max-h-svh max-w-screen-sm sm:max-h-[calc(100svh-2rem)]",
          containerClassName
        )}
      >
        {title && (
          <DialogHeader
            className={cn(
              "border-b border-divider-primary px-5 py-4 text-left text-grey-800",
              hideTitle ? "sr-only" : ""
            )}
          >
            <DialogTitle className="max-sm:text-base">{title}</DialogTitle>
            <DialogDescription className="sr-only">{title}</DialogDescription>
          </DialogHeader>
        )}

        <div
          className={cn(
            "min-h-[20vh] flex-1 overflow-auto px-5 py-3 sm:min-h-0",
            className
          )}
        >
          {children}
        </div>

        {footer && (
          <DialogFooter className="flex flex-col gap-2 border-t border-divider-primary px-5 py-3 text-left text-grey-800">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
