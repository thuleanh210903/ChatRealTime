import React, { useEffect, useRef, useState } from 'react';

interface IUploadImage {
  className?: string;
  cover?: string;
  onChange?: (file: File) => void;
  defaultImage?: string;
}

export const UploadImage: React.FC<IUploadImage> = ({
  className,
  onChange,
  defaultImage,
  cover,
}) => {
  const [imagePreview, setImagePreview] = useState<string>(
    cover || defaultImage || ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cover && cover !== imagePreview) {
      setImagePreview(cover);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);

      if (onChange) {
        onChange(file);
      }
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const handleChooseImage = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <label className="form-upload">
      <div className="form-preview form-dashed">
        <img src={imagePreview} alt="Preview" className="" />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
      <div className="form-action">
        <span className="form-btn" onClick={handleChooseImage}>
          Choose Image
        </span>
      </div>
    </label>
  );
};
