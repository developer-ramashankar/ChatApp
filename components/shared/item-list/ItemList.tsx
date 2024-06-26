"use client"
import { Card } from "@/components/ui/card";
import { useConversation } from "@/hooks/useConversation";
import { cn } from "@/lib/utils";
import React from "react";

type Props = React.PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const ItemList = ({ children, title, action: Action }: Props) => {
  const { isActive } = useConversation();
  return (
    <Card
      className={cn("h-full w-full bg- red-300 lg:flex-none lg:w-80", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between ">
        <h1 className="text-2xl font-semibold tracking-tight  p-2">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col p-2 items-center justify-start">
        {children}
      </div>
    </Card>
  );
};

export default ItemList;
