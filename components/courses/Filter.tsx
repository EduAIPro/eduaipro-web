"use client";

import React from "react";
import FormInput from "../common/ui/FormInput";
import Typography from "../common/ui/Typography";
import { Button } from "@radix-ui/themes";

export default function Filter() {
  return (
    <div>
      <div>
        <Typography.H3 weight="semibold">Filter by</Typography.H3>
        <div className="flex items-center gap-x-3 mt-3">
          <FormInput name="" placeholder="Browse by name" />
          <Button size="3">Search</Button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
