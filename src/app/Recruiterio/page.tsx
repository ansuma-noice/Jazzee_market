"use client";
import React, { useEffect, useState } from "react";
import styles from "./AllCampusTuples.module.css"; // Ensure the CSS module exists
import axios from "axios";
import { Building2, ExternalLink, Loader, Mail } from "lucide-react";
import Recruiter from "@/models/Recruiter";
import Navbar from "../component/Navbar";

// Define the interface for Job Tuple
interface JobTuple {
  sector: string;
  jobOpenings: number;
  jobDescription: string;
  experienceRequired: number;
}

// Define the interface for Recruiter
interface Recruiter {
  name: string;
  designation: string;
  workEmail: string;
  phoneNumber: string;
  companyName: string;
  companySite: string;
  jobTuples: JobTuple[];
}

const AllCampusTuples: React.FC = () => {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]); // State to hold the fetched data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null);

  const handleMouseEnter = (text: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      text,
      x: rect.left + rect.width / 2, // Center horizontally
      y: rect.top - 20 // Position above the button
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };


  const getRecruiters = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/pages/api/Recruiter');
      if (res.data) {
        setRecruiters(res.data); // Assuming res.data.data is an array of recruiters
      } else {
        setError("Recruiter data is null");
        console.error(error);
      }
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      window.Error(error.message);
    }
  }



  useEffect(() => {
    // Fetch all campus job tuples
    getRecruiters();
  }, []);
  const handleEmailCopy = (email: string, e: React.MouseEvent) => {
    window.location.href = `mailto:${email}`;
    setTooltip({ text: 'Mail client opened', x: e.clientX, y: e.clientY });
    setTimeout(() => setTooltip(null), 2000);
  };

  if (loading) return <div className={styles.loadi}><Loader /></div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {recruiters.map((recruiter, index) => (
          <div key={index} className={styles.recruiterBlock}>
            <div className={styles.h1}><Building2 />
              <strong>{recruiter.companyName}</strong>
            </div>
            <div className={styles.companyDetails}>
              <div>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(recruiter.companySite)}`}
                  target="_blank" rel="noopener noreferrer"
                  className={styles.resumeLink}><strong>Company Website</strong><ExternalLink /></a>

              </div>
            </div>
            {tooltip && (
              <div
                className={styles.tooltip}
                style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
              >
                {tooltip.text}
              </div>
            )}
            {recruiter.jobTuples.map((jobTuple, jobIndex) => (
              <div key={jobIndex} className={styles.jobTuple}>
                <div className={styles.jobDetails}>
                  <div>
                    <strong>Sector:</strong> {jobTuple.sector}
                  </div>
                  <div>
                    <strong>Openings:</strong> {jobTuple.jobOpenings}
                  </div>
                  <div>
                    <strong>Experience Required:</strong> {jobTuple.experienceRequired} years
                  </div>
                </div>
                <div className={styles.jobDescription}>
                  <strong>Description:</strong> {jobTuple.jobDescription}
                </div>
              </div>
            ))}
            <button
              className={styles.contactButton}
              onClick={(e) => handleEmailCopy(recruiter.workEmail, e)}
              onMouseEnter={(e) => handleMouseEnter('Send mail', e)}
              onMouseLeave={handleMouseLeave}
            >
              <Mail />
            </button>
          </div>
        ))}

      </div>
    </>
  );
};

export default AllCampusTuples;
