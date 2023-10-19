import { useState } from 'react';

export const useHandleImg = () => {
  const [imageArray, setImageArray] = useState<File[]>([]);

  const removeImage = (index: number) => {
    URL.revokeObjectURL(URL.createObjectURL(imageArray[index]));
    const updatedImages = [...imageArray];
    updatedImages.splice(index, 1);
    setImageArray(updatedImages);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageArray([...imageArray, ...newImages]);
    }
  };

  return {
    imageArray,
    removeImage,
    handleImageChange,
  };
};
