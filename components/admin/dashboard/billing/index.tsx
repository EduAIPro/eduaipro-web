"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemosTab } from "./demos-tab";
import { InvoicesTab } from "./invoices-tab";
import { PlansTab } from "./plans-tab";
import { TransactionsTab } from "./transactions-tab";

export const AdminBilling = () => (
  <div className="space-y-5">
    <div>
      <h1 className="text-2xl font-semibold sm:text-3xl sm:font-bold">
        Billing
      </h1>
      <p className="mt-1 text-sm text-grey-500">
        Manage plan prices, confirm invoices, extend school demos and review every payment on the platform.
      </p>
    </div>
    <Tabs defaultValue="plans" className="space-y-4">
      <TabsList>
        <TabsTrigger value="plans">Plans &amp; pricing</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="demos">School demos</TabsTrigger>
        <TabsTrigger value="transactions">Transactions</TabsTrigger>
      </TabsList>
      <TabsContent value="plans">
        <PlansTab />
      </TabsContent>
      <TabsContent value="invoices">
        <InvoicesTab />
      </TabsContent>
      <TabsContent value="demos">
        <DemosTab />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab />
      </TabsContent>
    </Tabs>
  </div>
);
