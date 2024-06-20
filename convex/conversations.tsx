import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";
import { QueryCtx, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized User!!");
    }
    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
    if (!currentUser) {
      throw new ConvexError("User not found");
    }
    const conversatonMemberShip = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", currentUser._id))
      .collect();

    const conversations = await Promise.all(
      conversatonMemberShip?.map(async (membership) => {
        const conversation = await ctx.db.get(membership.conversationId);
        if (!conversation) {
          throw new ConvexError("Conversation could not found");
        }
        return conversation;
      })
    );
    const conversationWithDetails = await Promise.all(
      conversations.map(async (conversation, index) => {
        const allConversationMemberships = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversationId", (q) =>
            q.eq("conversationId", conversation?._id)
          )
          .collect();
          
        const lastMsg = await lastMsgDetail({
          ctx,
          id: conversation.lastMsgId,
        });

        if (conversation.isGroup) {
          return { conversation, lastMsg };
        } else {
          const otherMembership = allConversationMemberships.filter(
            (membership) => membership.memberId !== currentUser._id
          )[0];
          const otherMember = await ctx.db.get(otherMembership.memberId);
          return {
            conversation,
            otherMember,
            lastMsg,
          };
        }
      })
    );
    return conversationWithDetails;
  },
});

const lastMsgDetail = async ({
  ctx,
  id,
}: {
  ctx: QueryCtx | MutationCtx;
  id: Id<"messages"> | undefined;
}) => {
  if (!id) return null;
  const message = await ctx.db.get(id);
  if (!message) return null;
  const sender = await ctx.db.get(message.senderId);
  if (!sender) return null;
  const content = getMessageContent(
    message.type,
    message.msg as unknown as string
  );
  return {
    sender: sender.username,
    content,
  };
};

const getMessageContent = (type: string, msg: string) => {
  switch (type) {
    case "text":
      return msg;
    default:
      return "[Non-text]";
  }
};
