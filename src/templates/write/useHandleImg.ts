import { useState, useEffect } from 'react';

export const useHandleImg = () => {
  const [imageArray, setImageArray] = useState<File[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (imageArray.length === 0) {
      setImages(null);
      return;
    }

    const dataTransfer = new DataTransfer();
    imageArray.forEach((file) => dataTransfer.items.add(file));
    setImages(dataTransfer.files);
  }, [imageArray]);

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
      const totalImages = imageArray.length + newImages.length;

      if (totalImages > 10) {
        alert('이미지는 10개 이하로 첨부해주세요');
        return;
      }

      setImageArray([...imageArray, ...newImages]);
    }
  };

  return {
    imageArray,
    images,
    removeImage,
    handleImageChange,
  };
};
