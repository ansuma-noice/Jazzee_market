import React, { useEffect, useState } from 'react';
import styles from './RegisterForms.module.css';
import { Cross, PlusCircleIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SectorOption {
    value: string;
    label: string;
}

interface CampusTuple {
    sector: string;
    jobOpenings: string;
}

interface RecruiterTuple {
    sector: string;
    jobOpenings: string;
    jobDescription: string;
    experienceRequired: string;
}

interface StudentData {
    name: string;
    email: string;
    phoneNumber: string;
    collegeName: string;
    sector: string;
    jobRole: string;
    resume?: any; // Correctly define the type
    password: string;
    designation: string;
}

const sectorOptions: SectorOption[] = [
    { value: 'Software & IT services', label: 'Software & IT services' },
    { value: 'Analytics & Consulting', label: 'Analytics & Consulting' },
    { value: 'Pharmaceutical & medical', label: 'Pharmaceutical & medical' },
    { value: 'Power', label: 'Power & Heavy' },
];

const RegisterForms: React.FC = () => {
    const [activeForm, setActiveForm] = useState<'student' | 'recruiter' | 'campus' | null>('student');
    const [campusTuples, setCampusTuples] = useState<CampusTuple[]>([{ sector: '', jobOpenings: '' }]);
    const [recruiterTuples, setRecruiterTuples] = useState<RecruiterTuple[]>([{ sector: '', jobOpenings: '', jobDescription: '', experienceRequired: '' }]);

    const router=useRouter();

    // Form data states
    const [studentData, setStudentData] = useState({ designation: 'student' ,name: '', email: '', phoneNumber: '', collegeName: '', sector: '', jobRole: '', resume: '', password: '' });
    const [recruiterData, setRecruiterData] = useState({ designation: 'recruiter' ,name: '', workEmail: '', phoneNumber: '', companyName: '', companySite: '', jobTuples: recruiterTuples, password: '' });
    const [campusData, setCampusData] = useState({designation: 'campus' ,universityName: '', universitySite: '', coordinatorEmail: '', coordinatorName: '', coordinatorPhoneNumber: 0, address: '', pinCode: '', jobTuples: campusTuples, password: '' });

    const handleCampusTupleChange = (index: number, key: keyof CampusTuple, value: string) => {
        const newTuples = [...campusTuples];
        newTuples[index][key] = value;
        setCampusTuples(newTuples);
        setCampusData({ ...campusData, jobTuples: newTuples });
    };

    const handleRecruiterTupleChange = (index: number, key: keyof RecruiterTuple, value: string) => {
        const newTuples = [...recruiterTuples];
        newTuples[index][key] = value;
        setRecruiterTuples(newTuples);
        setRecruiterData({ ...recruiterData, jobTuples: newTuples });
    };

    const addCampusTuple = () => {
        setCampusTuples([...campusTuples, { sector: '', jobOpenings: '' }]);
    };

    const addRecruiterTuple = () => {
        setRecruiterTuples([...recruiterTuples, { sector: '', jobOpenings: '', jobDescription: '', experienceRequired: '' }]);
    };

    const removeCampusTuple = (index: number) => {
        const newTuples = campusTuples.filter((_, i) => i !== index);
        setCampusTuples(newTuples);
        setCampusData({ ...campusData, jobTuples: newTuples });
    };

    const removeRecruiterTuple = (index: number) => {
        const newTuples = recruiterTuples.filter((_, i) => i !== index);
        setRecruiterTuples(newTuples);
        setRecruiterData({ ...recruiterData, jobTuples: newTuples });
    };

    // Submission handlers
    const handleStudentSubmit = async () => {
        // if(!router)return;
        try {
            const response = await fetch('/pages/api/Student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register student.');
            alert('Student registered successfully!');
            router.push('/recruitee')
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering the student.');
        }
    };

    const handleRecruiterSubmit = async () => {
        // if(!router)return;
        try {
            const response = await fetch('/pages/api/Recruiter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recruiterData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register recruiter.');
            alert('Recruiter registered successfully!');
            router.push('/recruiter')
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering the recruiter.');
        }
    };

    const handleCampusSubmit = async () => {
        // if(!router)return;                                 
        try {
            const response = await fetch('/pages/api/Campus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campusData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register campus.');
            alert('Campus registered successfully!');
            router.push('/recruitee')
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering the campus.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <button
                    className={`${styles.title} ${activeForm === 'student' ? styles.activeTitle : ''}`}
                    onClick={() => setActiveForm('student')}
                >
                    Student
                </button>
                <button
                    className={`${styles.title} ${activeForm === 'recruiter' ? styles.activeTitle : ''}`}
                    onClick={() => setActiveForm('recruiter')}
                >
                    Recruiter
                </button>
                <button
                    className={`${styles.title} ${activeForm === 'campus' ? styles.activeTitle : ''}`}
                    onClick={() => setActiveForm('campus')}
                >
                    Campus
                </button>
            </div>

            <div className={`${styles.form} ${activeForm === 'student' ? styles.active : ''}`}>
                {activeForm === 'student' && (
                    <>  
                        <input className={styles.formField} type="text" placeholder="Name" onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Email" onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" onChange={(e) => setStudentData({ ...studentData, phoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="College Name" onChange={(e) => setStudentData({ ...studentData, collegeName: e.target.value })} />
                        <select className={styles.formField} onChange={(e) => setStudentData({ ...studentData, sector: e.target.value })}>
                            <option value="">Select Sector</option>
                            {sectorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input className={styles.formField} type="text" placeholder="Job Role" onChange={(e) => setStudentData({ ...studentData, jobRole: e.target.value })} />
                        {/* <span className={styles.uploadCon}> */}
                            {/* <span className={styles.uploadText}>Upload your resume url</span> */}
                            <input className={styles.formField} type="url" placeholder="resume url (e.g. google drive link, portfolio)" onChange={(e) => setStudentData({ ...studentData, resume: e.target.value })} />
                        {/* </span> */}
                        <input className={styles.formField} type="password" placeholder="Password" onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleStudentSubmit}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'recruiter' ? styles.active : ''}`}>
                {activeForm === 'recruiter' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="Name" onChange={(e) => setRecruiterData({ ...recruiterData, name: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Work Email" onChange={(e) => setRecruiterData({ ...recruiterData, workEmail: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" onChange={(e) => setRecruiterData({ ...recruiterData, phoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="Company Name" onChange={(e) => setRecruiterData({ ...recruiterData, companyName: e.target.value })} />
                        <input className={styles.formField} type="url" placeholder="Company Website" onChange={(e) => setRecruiterData({ ...recruiterData, companySite: e.target.value })} />
                        {recruiterTuples.map((tuple, index) => (
                            <div key={index} className={styles.tuple1}>
                            <select className={styles.formField} onChange={(e) => handleRecruiterTupleChange(index, 'sector', e.target.value)}>
                                <option value="">Select Sector</option>
                                {sectorOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                                <input className={styles.formField} type="number" placeholder="Job Openings" value={tuple.jobOpenings} onChange={(e) => handleRecruiterTupleChange(index, 'jobOpenings', e.target.value)} />
                                <input className={styles.formField} type="text" placeholder="Job Description" value={tuple.jobDescription} onChange={(e) => handleRecruiterTupleChange(index, 'jobDescription', e.target.value)} />
                                <input className={styles.formField} type="number" placeholder="Experience Required" value={tuple.experienceRequired} onChange={(e) => handleRecruiterTupleChange(index, 'experienceRequired', e.target.value)} />
                                <button className={styles.removeButton} onClick={() => removeRecruiterTuple(index)}><X /></button>
                            </div>
                        ))}
                        <PlusCircleIcon className={styles.plusIcon} onClick={addRecruiterTuple}/>
                        <input className={styles.formField} type="password" placeholder="Password" onChange={(e) => setRecruiterData({ ...recruiterData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleRecruiterSubmit}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'campus' ? styles.active : ''}`}>
                {activeForm === 'campus' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="University Name" onChange={(e) => setCampusData({ ...campusData, universityName: e.target.value })} />
                        <input className={styles.formField} type="url" placeholder="University Website" onChange={(e) => setCampusData({ ...campusData, universitySite: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Coordinator Email" onChange={(e) => setCampusData({ ...campusData, coordinatorEmail: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="Coordinator Name" onChange={(e) => setCampusData({ ...campusData, coordinatorName: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Coordinator Phone Number" onChange={(e) => setCampusData({ ...campusData, coordinatorPhoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="University Address" onChange={(e) => setCampusData({ ...campusData, address: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="Pincode" onChange={(e) => setCampusData({ ...campusData, pinCode: e.target.value })} />
                        {campusTuples.map((tuple, index) => (
                            <div key={index} className={styles.tuple2}>
                                  <select className={styles.formField} onChange={(e) => handleRecruiterTupleChange(index, 'sector', e.target.value)}>
                                <option value="">Select Sector</option>
                                {sectorOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                                <input className={styles.formField} type="number" placeholder="Job Openings" value={tuple.jobOpenings} onChange={(e) => handleCampusTupleChange(index, 'jobOpenings', e.target.value)} />
                                <button className={styles.removeButton} onClick={() => removeCampusTuple(index)}><X /></button>
                            </div>
                        ))}
                        <PlusCircleIcon className={styles.plusIcon} onClick={addCampusTuple}/> 
                        <input className={styles.formField} type="password" placeholder="Password" onChange={(e) => setCampusData({ ...campusData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleCampusSubmit}>Submit</button>
                    </>
                )}
            </div>
            <Link href="/login" className={styles.link}>
                existing user?Login →
            </Link>
        </div>
    );
};

export default RegisterForms;
