import React, { useState } from 'react';
import styles from './ImageGallery.module.css';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Default images if none provided
  const defaultImages = [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
  };

  const handleMainImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      setSelectedImageIndex((prev) => 
        prev === 0 ? displayImages.length - 1 : prev - 1
      );
    } else if (event.key === 'ArrowDown') {
      setSelectedImageIndex((prev) => 
        prev === displayImages.length - 1 ? 0 : prev + 1
      );
    } else if (event.key === 'Escape') {
      setIsZoomed(false);
    }
  };

  return (
    <>
      {/* Thumbnail Strip - First Column */}
      {displayImages.length > 1 && (
        <div className={styles.thumbnailColumn}>
          <div className={styles.thumbnailStrip}>
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  index === selectedImageIndex ? styles.activeThumbnail : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className={styles.thumbnailImage}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Image - Second Column */}
      <div className={styles.mainImageColumn} onKeyDown={handleKeyDown} tabIndex={0}>
        <div className={styles.mainImageContainer}>
          {/* Main Image */}
          <div 
            className={`${styles.mainImageWrapper} ${isZoomed ? styles.zoomed : ''}`}
            onClick={handleMainImageClick}
          >
            <img
              src={displayImages[selectedImageIndex]}
              alt={`${title} - Image ${selectedImageIndex + 1}`}
              className={styles.mainImage}
              loading="lazy"
            />
          </div>

          {/* Zoom Indicator */}
          <div className={styles.zoomIndicator}>
            <span className={styles.zoomIcon}>🔍</span>
          </div>
        </div>

        {/* Zoom Modal */}
        {isZoomed && (
          <div className={styles.zoomModal} onClick={() => setIsZoomed(false)}>
            <div className={styles.zoomContainer}>
              <button 
                className={styles.closeButton}
                onClick={() => setIsZoomed(false)}
                aria-label="Close zoom"
              >
                <span className={styles.closeIcon}>✕</span>
              </button>
              <img
                src={displayImages[selectedImageIndex]}
                alt={`${title} - Zoomed view`}
                className={styles.zoomedImage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallery; 