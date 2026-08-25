import { Thumbnail } from "./Thumbnail";

interface FavoritePhoto {
  id: string;
  urls: {
    thumb: string;
  };
}

interface Props {
  favorites: FavoritePhoto[];
  onFavorite: (photo: FavoritePhoto, isFavorite: boolean) => void;
}

export const Favorites = ({ favorites, onFavorite }: Props) => {
  return (
    <div>
      <h1>Favorites</h1>
      <div className="gallery-grid">
        {favorites.map((photo) => {
          if (!photo?.id || !photo.urls?.thumb) {
            return null;
          }

          return (
            <Thumbnail
              key={photo.id}
              thumbnail={photo.urls.thumb}
              reactionId={photo.id}
              onFavorite={(isFavorite) => onFavorite(photo, isFavorite)}
            />
          );
        })}
      </div>
    </div>
  );
};
