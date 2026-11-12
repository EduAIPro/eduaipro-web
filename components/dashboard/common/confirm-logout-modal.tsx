import WarningIcon from "@/components/svgs/warning.svg";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/utils/auth";
import { deleteAccessToken } from "@/utils/auth/helpers";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ConfirmLogoutModal = ({
  isAdmin = false,
}: {
  isAdmin?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  function onClose(v: boolean) {
    setIsOpen(v);
  }

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      const { error } = await logoutAction();
      if (error) console.error("[logout] /auth/logout failed:", error);
    } catch (error) {
      console.error("[logout] logoutAction failed:", error);
    }
    setIsLoggingOut(false);
    deleteAccessToken();
    sessionStorage.clear();
    router.push("/login");
  }
  return (
    <Modal
      hideCloseButton
      footer={
        <>
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button onClick={onLogout} loading={isLoggingOut}>
            Logout
          </Button>
        </>
      }
      open={isOpen}
      toggleModal={onClose}
      trigger={
        <Button
          variant={isAdmin ? "ghost" : "outline"}
          size={isAdmin ? "default" : "icon"}
          className={cn(
            "py-3 text-[#FF0000]",
            isAdmin ? "justify-start hover:scale-100" : "min-w-14"
          )}
        >
          <LogOutIcon />
          {isAdmin ? <p>Logout</p> : null}
        </Button>
      }
      title="Logout"
    >
      <div>
        <div className="w-fit mx-auto">
          <WarningIcon />
        </div>
        <div className="space-y-1 text-center max-w-sm mx-auto mt-4">
          <h2 className="font-semibold text-grey-800 text-xl">
            Are you sure you want to logout?
          </h2>
          <p className="font-medium text-grey-650 text-base">
            Your session will be terminated when you logout.
          </p>
        </div>
      </div>
    </Modal>
  );
};
