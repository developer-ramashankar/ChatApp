"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DestopNavbar = () => {
  const paths = useNavigation();
  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav className="flex flex-col items-center gap-4">
        <ul>
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative py-1">
                <Link href={path.href}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button size={"icon"} variant={path.active ? "default" : "outline"}>
                        {path.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{path.name}</TooltipContent>
                  </Tooltip>
                  </TooltipProvider>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToggle/>
        <UserButton />
      </div>
    </Card>
  );
};

export default DestopNavbar;
