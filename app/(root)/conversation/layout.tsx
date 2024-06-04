"use client";
import ItemList from "@/components/shared/item-list/ItemList";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Loader2 } from "lucide-react";
import React from "react";
import DMConversationItem from "./_components/DMConversationItem";

type Props = React.PropsWithChildren<{}>;

const ConversationLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  return (
    <>
      <ItemList title="Conversation">
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex justify-center  items-center">
              {" "}
              No Conversation Found
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                  username={conversations.otherMember?.username || ""}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </ItemList>
      {children}
    </>
  );
};

export default ConversationLayout;
