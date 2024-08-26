"use client"

import { useState } from 'react';
import Image from 'next/image';
import styles from './SecondPage.module.css';

export default function SecondPage() {
  const [clicked, setClicked] = useState<number | null>(null);

  const colleges = [
    { id: 1, name: 'College 1', logo: '/IITkgp.jpeg' ,url:'https://www.iitkgp.ac.in'},
    { id: 2, name: 'College 2', logo: '/IITRopar.jpeg',url:'https://www.iitrpr.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in'},
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    { id: 3, name: 'College 3', logo: '/DU.jpeg',url:'https://www.du.ac.in' },
    // Add more colleges here
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        {colleges.map((college) => (
          <a key={college.id} href={college.url} target="_blank" rel="noopener noreferrer" className={styles.circle}>
          <Image src={college.logo} alt={college.name} width={100} height={100} />
        </a>
        ))}
      </div>
      <div className={styles.rightHalf}>
        <h1>Students recruited from premium colleges via Zazzee</h1>
      </div>
    </div>
  );
}
