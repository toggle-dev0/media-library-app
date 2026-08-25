export const getRandomPhoto = async () => {
  try {
    const randomPhoto = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${import.meta.env.VITE_API_KEY}`,
    );
    if (!randomPhoto.ok) {
      throw new Error(`An error occured: ${randomPhoto.status}`);
    }
    const response = await randomPhoto.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPopularPhotos = async () => {
  try {
    const popularPhotos = await fetch(
      `https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_API_KEY}`,
    );
    if (!popularPhotos.ok) {
      throw new Error(`An error occured: ${popularPhotos.status}`);
    }
    const response = await popularPhotos.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const getCategoryPhotos = async (category: string = "") => {
  try {
    const categoryPhotos = await fetch(
      `https://api.unsplash.com/topics/${category}?client_id=${import.meta.env.VITE_API_KEY}`,
    );
    if (!categoryPhotos.ok) {
      throw new Error(`An error occured: ${categoryPhotos.status}`);
    }
    const response = await categoryPhotos.json();
    return response;
  } catch (error) {
    throw error;
  }
};

// TODO: Verify the endpoint - should return single photo info
export const getSinglePhoto = async () => {
  try {
    const singlePhoto = await fetch(
      `https://api.unsplash.com/photos?client_id=${import.meta.env.VITE_API_KEY}`,
    );
    const response = await singlePhoto.json();
    return response;
  } catch (error) {
    return error;
  }
};
