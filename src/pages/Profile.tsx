import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../auth/AuthContext";
import { Favorites } from "../components/Favorites";

function Profile() {
  const { user, login, updatedImage, changeImage, favorites, updateFavorites } =
    useContext(AuthContext);
  const [text, setText] = useState("");
  const [editing, setEditing] = useState(false);
  const [imageEditing, setImageEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const updateProfileInfo = () => {
    login(text);
    setEditing(false);
  };

  const updateProfilePicture = () => {
    changeImage(imagePreview);
    console.log(imagePreview);
    setImageEditing(false);
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
    }
  };

  return (
    <div className="profile-page">
      <div className="flex-wrapper">
        <div>
          {imageEditing ? (
            <form onSubmit={handleSubmit(updateProfilePicture)}>
              <input
                type="file"
                accept="image/*"
                {...register("profilePicture")}
                onChange={handleImageChange}
                style={{ marginBottom: "20px" }}
              />
              {imagePreview && (
                <div className="display-picture">
                  <img src={imagePreview} alt="User uploaded preview" />
                </div>
              )}
              <button type="submit">Update</button>
            </form>
          ) : (
            <>
              <div className="display-picture">
                {updatedImage && (
                  <img src={updatedImage} alt="User uploaded preview" />
                )}
              </div>
              <button
                className="button"
                onClick={() => setImageEditing(!imageEditing)}
              >
                Edit
              </button>
            </>
          )}
        </div>
        {/* Text part */}
        <div className="display-info">
          {editing ? (
            <form onSubmit={handleSubmit(updateProfileInfo)}>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                })}
                onChange={(e) => setText(e.target.value)}
                placeholder="John Doe / Jane Doe"
              />
              <br />
              {errors.username && (
                <span style={{ color: "crimson" }}>
                  {String(errors.username.message)} <br />
                </span>
              )}
              <button type="submit">Update</button>
            </form>
          ) : (
            <div className="display-info-text">
              <p>{user}</p>
              <button onClick={() => setEditing(!editing)}>Edit</button>
            </div>
          )}
        </div>
      </div>
      <div className="bio">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt iste
          nemo unde dolore nihil. Iste accusantium alias, nobis harum aliquid
          asperiores sit error veritatis veniam, porro, numquam quia ipsum
          nulla.
        </p>
      </div>
      <section className="favorites">
        <Favorites favorites={favorites} onFavorite={updateFavorites} />
      </section>
    </div>
  );
}

export default Profile;
