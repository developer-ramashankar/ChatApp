import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  id: Id<"conversations">;
  imageUrl: string;
  username: string;
  lastMsgSender?: string;
  lastMsgContent?: string;
};

const DMConversationItem = ({
  id,
  imageUrl,
  username,
  lastMsgContent,
  lastMsgSender,
}: Props) => {
  return (
    <Link href={`/conversation/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <div className="flex flex-row gap-4 items-center truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          {lastMsgContent && lastMsgSender ? (
            <span className="text-sm text-muted-foreground flex truncate overflow-ellipsis">
              <p className="font-semibold">
                {lastMsgSender} {":"}&nbsp;
              </p>
              <p className="truncate overflow-ellipsis">{lastMsgContent}</p>
            </span>
          ) : (
            <p className="text-sm text-muted-foreground">
              Start the conversation!!
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default DMConversationItem;
