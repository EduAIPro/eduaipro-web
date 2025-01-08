import Typography from "../common/ui/Typography";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

export function LoginComp() {
  return (
    <div className="flex items-center gap-x-3">
      <Typography.H3 className="text-center" weight="medium" size="base">
        Already have an account?{" "}
      </Typography.H3>
      <Link href="/login">
        <Button className="btn" size="2">
          <h3 className="font-medium">Login</h3>
        </Button>
      </Link>
    </div>
  );
}
