import { useState, useEffect } from 'react';

async function urlToFile(
  url: string,
  filename: string,
  mimeType: string,
): Promise<File> {
  const res = await fetch(url, { mode: 'no-cors' });
  const buf = await res.arrayBuffer();
  return new File([buf], filename, { type: mimeType });
}

// const urlToFile = async (
//   url: string,
//   filename: string,
//   mimeType: string,
// ): Promise<File> => {
//   const res = await fetch(url, { mode: 'no-cors' });
//   const blob = await res.blob();
//   return new File([blob], filename, { type: mimeType });
// };

export const useHandleImg = (initialFiles?: (File | string)[]) => {
  const [imageArray, setImageArray] = useState<(File | string)[]>(
    initialFiles || [],
  );
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (initialFiles) {
      const filePromises = initialFiles.map(async (item, index) => {
        if (typeof item === 'string') {
          return urlToFile(item, `file-${index}.jpg`, 'image/jpeg');
        }
        return item;
      });

      Promise.all(filePromises).then((files) => {
        setImageArray(files);
      });
    }
  }, [initialFiles]);

  useEffect(() => {
    if (imageArray.length === 0) {
      setImages(null);
      return;
    }

    const fileArray = imageArray.filter(
      (item): item is File => item instanceof File,
    );

    const dataTransfer = new DataTransfer();
    fileArray.forEach((file) => dataTransfer.items.add(file));
    setImages(dataTransfer.files);
  }, [imageArray]);

  const removeImage = (index: number) => {
    const target = imageArray[index];
    if (target instanceof File) {
      URL.revokeObjectURL(URL.createObjectURL(target));
    }

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
