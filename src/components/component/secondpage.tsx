"use client"

import { useState } from 'react';
import Image from 'next/image';
import styles from './SecondPage.module.css';

export default function SecondPage() {
  const [clicked, setClicked] = useState<number | null>(null);

  const colleges = [
    { id: 9, name: 'College 3', logo: '/AMU.png',url:'https://www.amu.ac.in' },
    { id: 10, name: 'College 3', logo: '/IITM.png',url:'https://www.iitm.ac.in' },
    { id: 11, name: 'College 3', logo: '/ru.png',url:'https://www.uniraj.ac.in' },
    { id: 12, name: 'College 3', logo: '/bitsp.png',url:'https://www.bits-pilani.ac.in' },
    { id: 13, name: 'College 3', logo: '/nitt.png',url:'https://www.nitt.edu' },
    { id: 7, name: 'College 3', logo: '/IITK.jpeg',url:'https://www.iitk.ac.in' },
    { id: 13, name: 'College 3', logo: '/lpu.png',url:'https://www.lpu.in' },
    { id: 4, name: 'College 3', logo: '/IITB.jpeg',url:'https://www.iitb.ac.in' },
    { id: 6, name: 'College 3', logo: '/IITG.jpeg',url:'https://www.iitg.ac.in' },
    { id: 13, name: 'College 3', logo: '/nitr.jpeg',url:'https://www.nitr.ac.in' },
    { id: 1, name: 'IIT Kgp', logo: '/IITkgp.jpeg' ,url:'https://www.iitkgp.ac.in'},
    { id: 2, name: 'IIT Ropar', logo: '/IITRopar.jpeg',url:'https://www.iitrpr.ac.in' },
    { id: 3, name: 'Delhi University', logo: '/DU.jpeg',url:'https://www.du.ac.in'},
    { id: 5, name: 'College 3', logo: '/IITBHU.jpeg',url:'https://www.iitbhu.ac.in' },
    { id: 14, name: 'College 3', logo: '/amity.png',url:'https://www.amity.edu' },
    // Add more colleges here
  ];

  return (
    <div className={styles.container}>
      <div className={styles.leftHalf}>
        {colleges.map((college) => (
          <a key={college.id} href={college.url} target="_blank" rel="noopener noreferrer" className={styles.circle}>
          <Image src={college.logo} alt={college.name} width={150} height={150} />
        </a>
        ))}
      </div>
      <div className={styles.rightHalf}>
        <h1>Students recruited from premium colleges via Jazzee</h1>
      </div>
    </div>
  );
}
