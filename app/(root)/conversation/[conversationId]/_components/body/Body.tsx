"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConversation } from "@/hooks/useConversation";
import { useQuery } from "convex/react";
import React from "react";
import Message from "./Message";

type Props = {};

const Body = (props: Props) => {
  const { conversationId } = useConversation();
  const messages = useQuery(api.messages.get, {
    id: conversationId as Id<"conversations">,
  });
  return (
    <div className="w-full flex-1 flex overflow-y-scroll flex-col-reverse gap-2 p-3 no-scrollbar">
      {messages?.map(
        ({ message, senderImage, senderName, isCurrentUser }, index) => {
          const lastByUser = messages[index-1]?.message.senderId === messages[index].message.senderId

          return (
            <Message
              key={message._id}
              fromCurrentUser={isCurrentUser}
              content={message.msg}
              senderImage={senderImage}
              lastByUser={lastByUser}
              senderName={senderName}
              createdAt={message._creationTime}
              type={message.type}
            />
          );
        }
      )}
    </div>
  );
};

export default Body;
