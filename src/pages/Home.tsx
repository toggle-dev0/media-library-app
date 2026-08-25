import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getPopularPhotos, getCategoryPhotos } from "../api";
import { Featured } from "../components/Featured";
import { Thumbnail } from "../components/Thumbnail";
import { Categories } from "../components/Categories";
import { Favorites } from "../components/Favorites";
import { Loading } from "../components/Loading";
import { AuthContext } from "../auth/AuthContext";

interface Photo {
  id: string;
  urls: {
    thumb: string;
  };
  [key: string]: any;
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [tab, setTab] = useState("featured");
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[] | null>(null);
  const { categories, favorites, updateCategories, updateFavorites } =
    useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const searchHandler = () => {
    setResult(query);
  };

  // fetch from API Functions
  const fetchPopularPhotos = async () => {
    try {
      const photos = await getPopularPhotos();
      if (photos) {
        setFeaturedPhotos(photos);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    }
  };
  const fetchCategoryPhotos = async () => {
    try {
      const naturePhotos = await getCategoryPhotos("nature");
      const summerPhotos = await getCategoryPhotos("summer");
      const filmPhotos = await getCategoryPhotos("film");
      const wallpaperPhotos = await getCategoryPhotos("wallpapers");
      const photos = [naturePhotos, summerPhotos, filmPhotos, wallpaperPhotos];
      if (photos) {
        // structures shape of response to Photo[] interface
        const photosData = photos.map((photoSet: any) => {
          return {
            slug: photoSet?.slug,
            favorite: false,
            photoUrls: photoSet?.preview_photos.map(
              (samples: any) => samples.urls.thumb,
            ),
          };
        });
        updateCategories(photosData);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  // const fetchPhotoInfo = async () => {
  //   try {
  //     const photo = await getRandomPhoto();
  //     console.log(photo.urls.thumb);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // fetchPhotoInfo();
    fetchPopularPhotos();
    fetchCategoryPhotos();
  }, []);

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSubmit(searchHandler)}>
          <input
            type="search"
            {...register("query")}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for photos..."
          />
        </form>
      </div>
      <main>
        <section className="tabs">
          <div>
            <button onClick={() => setTab("featured")}>Featured</button>
            <button onClick={() => setTab("categories")}>Categories</button>
            <button onClick={() => setTab("favorites")}>Favorites</button>
          </div>
        </section>
        <p>{result}</p>
        <section className="active-tab">
          {!loading ? (
            <>
              {tab == "featured" && (
                <Featured>
                  {featuredPhotos?.map((photo) => (
                    <Thumbnail
                      key={photo.id}
                      thumbnail={photo.urls.thumb}
                      reactionId={photo.id}
                      onFavorite={(isFavorite) =>
                        updateFavorites(photo, isFavorite)
                      }
                    />
                  ))}
                </Featured>
              )}
              {tab == "categories" && (
                <Categories>
                  {categories?.map((category: any) => (
                    <div key={category.slug}>
                      <h2>{category.slug}</h2>
                      <div className="gallery-grid">
                        {category.photoUrls?.map((url: string) => (
                          <Thumbnail
                            key={url}
                            thumbnail={url}
                            reactionId={url}
                            onFavorite={(isFavorite) =>
                              updateFavorites(
                                {
                                  id: url,
                                  urls: { thumb: url },
                                },
                                isFavorite,
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </Categories>
              )}
              {tab == "favorites" && (
                <Favorites favorites={favorites} onFavorite={updateFavorites} />
              )}
            </>
          ) : (
            <Loading error={error} />
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
