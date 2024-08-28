// components/Carousel.tsx
import React from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

const companies = [
  { name: 'Company 1', svgPath: '/images/google.svg' },
  { name: 'Company 2', svgPath: '/images/adobe.svg' },
  { name: 'Company 3', svgPath: '/images/ibm2.svg' },
  { name: 'Company 4', svgPath: '/images/tata.svg' },
  { name: 'Company 5', svgPath: '/images/samsung.svg' },
  { name: 'Company 6', svgPath: '/images/zoom.svg' },
  { name: 'Company 7', svgPath: '/images/nissan.svg' },
  { name: 'Company 8', svgPath: '/images/netflix.svg' },
  { name: 'Company 9', svgPath: '/images/apple.svg' },
  { name: 'Company 10', svgPath: '/images/activision.svg' },
  { name: 'Company 11', svgPath: '/images/heroku.svg' },
  { name: 'Company 12', svgPath: '/images/telegram.svg' },
  { name: 'Company 13', svgPath: '/images/ey.svg' },
  { name: 'Company 14', svgPath: '/images/qualcomm.svg' },
  { name: 'Company 15', svgPath: '/images/hsbc.svg' },
];

export const Carousel: React.FC = () => {
  return (
    <div className={styles.carousel}>
      <div className={styles.carouselTrack}>
        {companies.concat(companies).map((company, index) => (
          <div key={index} className={styles.carouselItem}>
            <Image 
              src={company.svgPath} 
              alt={company.name} 
              width={40} 
              height={40} 
              style={{ backgroundColor: 'transparent' }} // Ensure transparency
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
