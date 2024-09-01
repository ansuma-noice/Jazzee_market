"use client";

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';
import { User2, LogOut, CircleUserRound } from 'lucide-react';
import axios from 'axios'; // Import axios for API requests
import { useRegistration } from './RegistrationContext';

interface JobTuple {
    sector: string;
    jobOpenings: number;
}

interface Campus {
    universityName: string;
    universitySite: string;
    collegeAddress: string;
    pinCode: string;
    jobTuples: JobTuple[];
    coordinatorPhoneNumber: string;
    coordinatorEmail: string;
}

interface Student {
    name: string;
    resume: string;
    collegeName: string;
    sector: string;
    jobRole: string;
    phoneNumber: string;
    email: string;
}

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showCard, setShowCard] = useState(false); // State for showing the card
    const [campusData, setCampusData] = useState<Campus[]>([]);
    const [studentData, setStudentData] = useState<Student[]>([]); // Changed to single student data
    const { registrationType } = useRegistration();

    // Fetch data based on user type
    const fetchData = async (registrationType: 'Campus' | 'Student') => {
        try {
            const response = await axios.get(`/pages/api/${registrationType}`); // Update URL to /api/campus or /api/student
            if(registrationType === 'Campus'){
                setCampusData(response.data);
            }
            if(registrationType === 'Student'){
                setStudentData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Call fetchData when a user is logged in
    useEffect(() => {
        // fetchData(registrationType);
    }, [registrationType]);

    const handleUserClick = () => {
        setShowCard(prev => !prev); // Toggle the card visibility
    };

    const handleLogout = () => {
        // Handle logout logic here
        console.log("Logged out");
    };

    return (
        <nav className={`${scrolled ? styles.scrolled : styles.navbar}`}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src="/jazzee2.png" alt="Company Logo" />
                </Link>
            </div>
            <div className={styles.userIcon} onClick={handleUserClick}>
                <User2 />
            </div>
            {showCard && (
                <div className={styles.userCard}>
                    <div className={styles.userContent}>
                        <div className={styles.userImageWrapper}>
                            <CircleUserRound className={styles.userImage} />
                        </div>
                        <div className={styles.userInfo}>
                        {registrationType === 'Campus' && campusData.length > 0 ? (
                            campusData.map((campus, index) => (
                                <div key={index}>
                                    <div className={styles.userName}>{campus.universityName}</div>
                                    <div className={styles.userEmail}>{campus.coordinatorEmail}</div>
                                </div>
                            ))
                        ) : registrationType === 'Student' && studentData.length > 0 ? (
                            studentData.map((student, index) => (
                                <div key={index}>
                                    <div className={styles.userName}>{student.name}</div>
                                    <div className={styles.userEmail}>{student.email}</div>
                                </div>
                            ))
                        ) : (
                            <div>No data available</div>
                        )}
                            <button className={styles.logoutButton} onClick={handleLogout}>
                                <LogOut /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
