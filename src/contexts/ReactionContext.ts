import { createContext } from "react";

interface ReactionContextValue {
  isReacted: (reactionId: string) => boolean;
  toggleReaction: (reactionId: string) => void;
}

export const ReactionContext = createContext<ReactionContextValue | null>(null);
