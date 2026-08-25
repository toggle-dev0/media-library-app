import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ReactionContext } from "../contexts/ReactionContext";

export const Thumbnail = ({ thumbnail, reactionId, onFavorite }: Props) => {
  const reactionContext = useContext(ReactionContext);
  if (!reactionContext) {
    throw new Error(
      "Thumbnail must be rendered inside ReactionContext.Provider",
    );
  }

  const liked = reactionContext.isReacted(reactionId);
  const handleReaction = () => {
    reactionContext.toggleReaction(reactionId);
    onFavorite(!liked);
  };
  return (
    <div className="thumbnail">
      <img src={`${thumbnail}`} alt="An unsplash image" />
      <div className="like-icon" onClick={handleReaction}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>
    </div>
  );
};

interface Props {
  thumbnail: string | null;
  reactionId: string;
  onFavorite: (isFavorite: boolean) => void;
}
