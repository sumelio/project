import React from 'react';
import styles from './ThumbnailStrip.module.css';

interface ThumbnailStripProps {
  images: string[];
  onSelect: (index: number) => void;
  selectedIndex: number;
}

const ThumbnailStrip: React.FC<ThumbnailStripProps> = ({ images, onSelect, selectedIndex }) => {
  return (
    <div className={styles.thumbnailStrip}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.thumbnail} ${index === selectedIndex ? styles.selected : ''}`}
          onClick={() => onSelect(index)}
          onMouseOver={() => onSelect(index)}
        >
          <img src={image} alt={`Thumbnail ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default ThumbnailStrip; 