import React, { useState } from 'react';
import { X } from 'lucide-react'; // Optional: Replace with any close icon you like

const ProductImage = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOverlayClick = (e) => {
    // Close only if clicking the background, not the image
    if (e.target.id === 'lightbox-overlay') {
      setIsOpen(false);
    }
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer object-contain h-80 w-full rounded shadow"
      />

      {isOpen && (
        <div
          id="lightbox-overlay"
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-0 right-0 m-2 text-white bg-black bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImage;
