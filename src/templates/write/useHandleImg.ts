import { useState } from 'react';

export const useHandleImg = (setImages) => {
  const [imageArray, setImageArray] = useState<File[]>([]);

  const updateFileList = () => {
    const dataTransfer = new DataTransfer();
    imageArray.forEach((file) => dataTransfer.items.add(file));
    setImages(dataTransfer.files);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(URL.createObjectURL(imageArray[index]));
    const updatedImages = [...imageArray];
    updatedImages.splice(index, 1);
    setImageArray(updatedImages);
    updateFileList();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImageArray([...imageArray, ...newImages]);
    }
    updateFileList();
  };

  return {
    imageArray,
    removeImage,
    handleImageChange,
  };
};
