import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./auth/Login";
import NavBar from "./components/NavBar";
import "./App.css";
import { useState } from "react";
import { AuthContext } from "./auth/AuthContext";
import Footer from "./components/Footer";
import { ReactionContext } from "./contexts/ReactionContext";

interface Photo {
  slug: string;
  photoUrls: string[];
  favorite: boolean;
}

interface FavoritePhoto {
  id: string;
  urls: {
    thumb: string;
  };
}

function App() {
  const [user, setUser] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [categories, setCategories] = useState<Photo[] | null>(null);
  const [favorites, setFavorites] = useState<FavoritePhoto[]>([]);
  const [reactions, setReactions] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const login = (user: string) => {
    setUser(user);
  };
  const changeImage = (imageString: string) => {
    setUpdatedImage(imageString);
  };

  const logout = () => {
    setUser("");
    setUpdatedImage("");
    navigate("/");
  };

  const updateCategories = (args: Photo[]) => {
    setCategories(args);
  };

  const updateFavorites = (photo: FavoritePhoto, isFavorite: boolean) => {
    if (!photo?.id || !photo.urls?.thumb) {
      return;
    }

    setFavorites((currentFavorites) => {
      if (isFavorite) {
        return currentFavorites.some((favorite) => favorite.id === photo.id)
          ? currentFavorites
          : [...currentFavorites, photo];
      }

      return currentFavorites.filter((favorite) => favorite.id !== photo.id);
    });
  };

  const isReacted = (reactionId: string) => reactions[reactionId] === true;
  const toggleReaction = (reactionId: string) => {
    setReactions((currentReactions) => ({
      ...currentReactions,
      [reactionId]: !currentReactions[reactionId],
    }));
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          updatedImage,
          changeImage,
          categories,
          updateCategories,
          favorites,
          updateFavorites,
        }}
      >
        <ReactionContext.Provider value={{ isReacted, toggleReaction }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
          <Footer />
        </ReactionContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
