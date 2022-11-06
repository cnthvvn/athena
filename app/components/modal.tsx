import React from "react";

import { Dialog } from "@headlessui/react";
import { twMerge as tw } from "tailwind-merge";

export function Modal({
  children,
  fullScreen,
}: {
  children: React.ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <Dialog onClose={() => null} open>
      <div
        className={tw(
          "fixed inset-0",
          fullScreen ? "bg-neutral-50" : "bg-black/25"
        )}
        aria-hidden="true"
      />
      <div className="fixed inset-0">
        <div className="flex min-h-full justify-center lg:items-center lg:rounded-3xl lg:py-4">
          <Dialog.Panel className="space-y-3 bg-neutral-50 p-3 lg:max-w-3xl lg:rounded-2xl">
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export function ModalHeader({
  closeButton,
  img,
}: {
  closeButton?: React.ReactNode;
  img?: string;
}) {
  return (
    <div className="relative">
      <img src={img} alt="" className={img ? "h-80 w-full object-cover" : ""} />
      <div className="absolute top-2 right-3">{closeButton}</div>
    </div>
  );
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <div className="overflow-auto">{children}</div>;
}

export function ModalContentTitleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center py-6">{children}</div>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
