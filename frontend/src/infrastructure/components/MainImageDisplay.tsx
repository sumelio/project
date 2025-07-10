import React from 'react';
import styles from './MainImageDisplay.module.css';

interface MainImageDisplayProps {
  image: string;
  title: string;
}

const MainImageDisplay: React.FC<MainImageDisplayProps> = ({ image, title }) => {
  return (
    <div className={styles.mainImageDisplay}>
      <img src={image} alt={title} className={styles.mainImage} />
    </div>
  );
};

export default MainImageDisplay; 