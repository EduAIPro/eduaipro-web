import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import useSchoolStore from "@/store/school";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ConfirmLogoutModal = () => {
  const [open, setOpen] = useState(false);
  const { setSchool } = useSchoolStore();
  const router = useRouter();
  function logout() {
    window.localStorage.clear();
    setSchool(null);
    router.push("/login/school");
  }
  return (
    <Modal
      open={open}
      toggleModal={setOpen}
      title="Logout"
      containerClassName="max-w-[400px]"
      trigger={
        <Button
          variant="outline"
          className="shadow-none max-md:border-none min-w-fit hover:bg-red-100/50 hover:border-red-300"
        >
          <LogOutIcon className="text-red-500" />
        </Button>
      }
      footer={
        <>
          <Button variant="outline" className="max-sm:w-full">
            Cancel
          </Button>
          <Button
            className="max-sm:w-full"
            onClick={logout}
            variant="destructive"
          >
            Proceed
          </Button>
        </>
      }
    >
      <p className="text-[15px] text-grey-500">
        Are you sure you want to logout?
      </p>
    </Modal>
  );
};
