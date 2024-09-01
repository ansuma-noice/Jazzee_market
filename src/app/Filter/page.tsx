"use client";

import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import styles from './Filter.module.css'; // Import the CSS module
import { Link, Mail, Phone, UniversityIcon, Loader } from 'lucide-react';
import Navbar from '../component/Navbar';

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

const FilterPage: NextPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<'Campus' | 'Student'>('Campus');
    const [campusData, setCampusData] = useState<Campus[]>([]);
    const [studentData, setStudentData] = useState<Student[]>([]);
    const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading

    const handleMouseEnter = (text: string, e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setTooltip({
            text,
            x: rect.left + rect.width / 2,
            y: rect.top - 20 
        });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    const fetchData = async (filter: 'Campus' | 'Student') => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const response = await axios.get(`/pages/api/${filter}`);
            if (filter === 'Campus') {
                setCampusData(response.data);
            } else {
                setStudentData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        fetchData(selectedFilter);
    }, [selectedFilter]);

    const handlePhoneCopy = (phoneNumber: string, e: React.MouseEvent) => {
        navigator.clipboard.writeText(phoneNumber);
        setTooltip({ text: 'Phone number copied', x: e.clientX, y: e.clientY });
        setTimeout(() => setTooltip(null), 2000);
    };

    const handleEmailCopy = (email: string, e: React.MouseEvent) => {
        window.location.href = `mailto:${email}`;
        setTooltip({ text: 'Mail client opened', x: e.clientX, y: e.clientY });
        setTimeout(() => setTooltip(null), 2000);
    };

    // Handle search term update
    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredCampusData = campusData.filter((campus) =>
        campus.universityName.toLowerCase().includes(searchTerm)
    );

    const filteredStudentData = studentData.filter((student) =>
        student.name.toLowerCase().includes(searchTerm)
    );

    if (loading) return <div className={styles.loader}><Loader /></div>; // Show loader when loading

    return (
        <div className={styles.filterPage}>
            <Navbar onSearch={handleSearch} /> {/* Pass handleSearch to Navbar */}
            <div className={styles.filterButtons}>
                <button
                    className={`${selectedFilter === 'Campus' ? styles.selectedButton : styles.button1}`}
                    onClick={() => setSelectedFilter('Campus')}
                >
                    Campus
                </button>
                <button
                    className={`${selectedFilter === 'Student' ? styles.selectedButton : styles.button1}`}
                    onClick={() => setSelectedFilter('Student')}
                >
                    Student
                </button>
            </div>

            {tooltip && (
                <div
                    className={styles.tooltip}
                    style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
                >
                    {tooltip.text}
                </div>
            )}
        
            {selectedFilter === 'Campus' && (
                <div className={styles.details}>
                    {filteredCampusData.map((campus, index) => (
                        <div key={index} className={styles.campusBlock}>
                            <div className={styles.h1}>
                                <strong>{campus.universityName}</strong>
                            </div>
                            <div>
                                <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(campus.universitySite)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.resumeLink}
                                >
                                    <Link /><strong>University Website</strong>
                                </a>
                            </div>
                            <div className={styles.jobTuple1}>
                                <div className={styles.tuplu}>
                                    <div>
                                        <strong>College Address:</strong> {campus.collegeAddress}
                                    </div>
                                    <div>
                                        <strong>Pin Code:</strong> {campus.pinCode}
                                    </div>
                                </div>
                                <div className={styles.jobTuple}>
                                    {campus.jobTuples.map((job, jobIndex) => (
                                        <div key={jobIndex} className={styles.jobDetail}>
                                            <p> <strong>Sector:</strong> {job.sector}</p>
                                            <p><strong>Talent Pool:</strong> {job.jobOpenings}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.contactButton1}>
                                    <button
                                        className={styles.contactButton}
                                        onClick={(e) => handlePhoneCopy(campus.coordinatorPhoneNumber, e)}
                                        onMouseEnter={(e) => handleMouseEnter('Copy phone number', e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Phone />
                                    </button>
                                    <button
                                        className={styles.contactButton}
                                        onClick={(e) => handleEmailCopy(campus.coordinatorEmail, e)}
                                        onMouseEnter={(e) => handleMouseEnter('Send email', e)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <Mail />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedFilter === 'Student' && (
                <div className={styles.details}>
                    {filteredStudentData.map((student, index) => (
                        <div key={index} className={styles.campusBlock}>
                            <h1 className={styles.h1}><strong>{student.name}</strong></h1>
                            <div className={styles.studentCard}>
                                <div className={styles.uni}><UniversityIcon /><strong>{student.collegeName}</strong></div>
                                <div>
                                    <strong>
                                        <a
                                            href={`https://www.google.com/search?q=${encodeURIComponent(student.resume)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.resumeLink}
                                        >
                                            <Link />Resume
                                        </a>
                                    </strong>
                                </div>
                            </div>

                            <div className={styles.jobTuple}>
                                <div><strong>Sector:</strong>{student.sector}</div>
                                <div><strong>Job Role:</strong>{student.jobRole}</div>
                            </div>
                            <div className={styles.contactButton1}>
                                <button
                                    className={styles.contactButton}
                                    onClick={(e) => handlePhoneCopy(student.phoneNumber, e)}
                                    onMouseEnter={(e) => handleMouseEnter('Copy phone number', e)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Phone />
                                </button>
                                <button
                                    className={styles.contactButton}
                                    onClick={(e) => handleEmailCopy(student.email, e)}
                                    onMouseEnter={(e) => handleMouseEnter('Send mail', e)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Mail />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterPage;
