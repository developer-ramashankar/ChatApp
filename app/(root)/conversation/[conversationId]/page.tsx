"use client";
import ConversationContainer from "@/components/shared/conversation/ConversationContainer";
import ConversationFallback from "@/components/shared/conversation/ConversationFallback";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import Header from "./_components/Header";
import ChatInput from "./_components/input/ChatInput";
import Body from "./_components/body/Body";
import RemoveFriendDialog from "./_components/dialogs/RemoveFriendDialog";

type Props = {
  params: {
    conversationId: Id<"conversations">;
  };
};

const ConversationPerson = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId });
  const [removeFriendDiloge, setRemoveFriendDiloge] = React.useState(false);
  const [deleteGroupdilogOpen, setDeleteGroupdilogOpen] = React.useState(false);
  const [leaveGroupDilogeOpen, setLeaveGroupDilogeOpen] = React.useState(false);
  const [callType, setCallType] = React.useState<"audio" | "video"| null>(null);
  return conversation === undefined ? (
    <div className="h-full w-full flex items-center justify-center">
      {" "}
      <Loader2 className="w-8 h-8" />
    </div>
  ) : conversation === null ? (
    <p className="w-full h-full flex justify-center  items-center">
      Conversation not Found
    </p>
  ) : (
    <ConversationContainer>
      <RemoveFriendDialog conversationId={conversationId} open={removeFriendDiloge} setOpen={setRemoveFriendDiloge}/>
      <Header
        imageUrl={
          conversation.isGroup ? undefined : conversation.otherMember?.imageUrl
        }
        name={
          (conversation.isGroup
            ? conversation.name
            : conversation.otherMember?.username) || ""
        }
        options={conversation.isGroup? [
          {
            label:"Leave Group",
            destructive: false,
            onClick: () => setLeaveGroupDilogeOpen(true),
          },
          {
            label:"Delete Group",
            destructive: true,
            onClick: () => setDeleteGroupdilogOpen(true),
          },
        ]: [
          {
            label:"Remove Friend",
            destructive: true,
            onClick: () => setRemoveFriendDiloge(true),
          },
        ]}
      />
      <Body />
      <ChatInput />
    </ConversationContainer>
  );
};

export default ConversationPerson;
