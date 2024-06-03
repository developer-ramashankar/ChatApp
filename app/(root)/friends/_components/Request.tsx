import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutationState } from "@/hooks/useMutationState";
import { ConvexError } from "convex/values";
import { Check, User, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  id: Id<"requests">;
  imageUrl: string;
  username: string;
  email: string;
};

const Request = ({ id, imageUrl, username, email }: Props) => {
  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny
  );
  return (
    <Card className="w-full p-2 flex justify-between items-center gap-2">
      <div className="flex item-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className=" truncate">{username}</h4>
          <p className="text-sm text-muted-foreground truncate">{email}</p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button size="icon" disabled={denyPending} onClick={() => {}}>
          <Check />
        </Button>
        <Button
          size="icon"
          disabled={denyPending}
          variant={"destructive"}
          onClick={() => {
            denyRequest({ id })
              .then(() => {
                toast.success("Friend Request denied");
              })
              .catch((error) => {
                toast.error(
                  error instanceof ConvexError
                    ? error.data
                    : "Something went wrong"
                );
              });
          }}
        >
          <X />
        </Button>
      </div>
    </Card>
  );
};

export default Request;
