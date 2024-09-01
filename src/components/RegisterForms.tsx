import React, { useEffect, useState } from 'react';
import styles from './RegisterForms.module.css';
import { Cross, PlusCircleIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegistration } from '@/app/component/RegistrationContext';

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
    const { setRegistrationType } = useRegistration();

    const router = useRouter();

    // Form data states
    const [studentData, setStudentData] = useState<StudentData>({ designation: 'student', name: '', email: '', phoneNumber: '', collegeName: '', sector: '', jobRole: '', resume: '', password: '' });
    const [recruiterData, setRecruiterData] = useState({ designation: 'recruiter', name: '', workEmail: '', phoneNumber: '', companyName: '', companySite: '', jobTuples: recruiterTuples, password: '' });
    const [campusData, setCampusData] = useState({ designation: 'campus', universityName: '', coordinatorName: '', coordinatorEmail: '', universitySite: '', coordinatorPhoneNumber: '', collegeAddress: '', pinCode: '', jobTuples: campusTuples, password: '' });

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

    const handleStudentSubmit = async () => {
        try {
            const response = await fetch('/pages/api/Student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register student.');
            alert('Student registered successfully!');
            router.push('/Recruiterio');
            setRegistrationType('Student');
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering the student.');
        }
    };

    const handleRecruiterSubmit = async () => {
        try {
            const response = await fetch('/pages/api/Recruiter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recruiterData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register recruiter.');
            alert('Recruiter registered successfully!');
            router.push('/Filter');
        } catch (error) {
            console.error(error);
            alert('An error occurred while registering the recruiter.');
        }
    };

    const handleCampusSubmit = async () => {
        try {
            const response = await fetch('/pages/api/Campus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campusData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to register campus.');
            alert('Campus registered successfully!');
            setRegistrationType('Campus');
            router.push('/Recruiterio');
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
                        <input className={styles.formField} type="text" placeholder="Name" value={studentData.name} onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Email" value={studentData.email} onChange={(e) => setStudentData({ ...studentData, email: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" value={studentData.phoneNumber} onChange={(e) => setStudentData({ ...studentData, phoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="College Name" value={studentData.collegeName} onChange={(e) => setStudentData({ ...studentData, collegeName: e.target.value })} />
                        <select className={styles.formField} value={studentData.sector} onChange={(e) => setStudentData({ ...studentData, sector: e.target.value })}>
                            <option value="">Select Sector</option>
                            {sectorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input className={styles.formField} type="text" placeholder="Job Role" value={studentData.jobRole} onChange={(e) => setStudentData({ ...studentData, jobRole: e.target.value })} />
                        <input className={styles.formField} type="url" placeholder="Resume URL (e.g. Google Drive link, portfolio)" value={studentData.resume} onChange={(e) => setStudentData({ ...studentData, resume: e.target.value })} />
                        <input className={styles.formField} type="password" placeholder="Password" value={studentData.password} onChange={(e) => setStudentData({ ...studentData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleStudentSubmit}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'recruiter' ? styles.active : ''}`}>
                {activeForm === 'recruiter' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="Name" value={recruiterData.name} onChange={(e) => setRecruiterData({ ...recruiterData, name: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Work Email" value={recruiterData.workEmail} onChange={(e) => setRecruiterData({ ...recruiterData, workEmail: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" value={recruiterData.phoneNumber} onChange={(e) => setRecruiterData({ ...recruiterData, phoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="Company Name" value={recruiterData.companyName} onChange={(e) => setRecruiterData({ ...recruiterData, companyName: e.target.value })} />
                        <input className={styles.formField} type="url" placeholder="Company Site" value={recruiterData.companySite} onChange={(e) => setRecruiterData({ ...recruiterData, companySite: e.target.value })} />

                        {recruiterTuples.map((tuple, index) => (
                            <div key={index}>
                                <select
                                    className={styles.formField}
                                    value={tuple.sector}
                                    onChange={(e) => handleRecruiterTupleChange(index, 'sector', e.target.value)}
                                >
                                    <option value="">Select Sector</option>
                                    {sectorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className={styles.formField}
                                    type="number"
                                    placeholder="Job Openings"
                                    value={tuple.jobOpenings}
                                    onChange={(e) => handleRecruiterTupleChange(index, 'jobOpenings', e.target.value)}
                                />
                                <input
                                    className={styles.formField}
                                    type="text"
                                    placeholder="Job Description"
                                    value={tuple.jobDescription}
                                    onChange={(e) => handleRecruiterTupleChange(index, 'jobDescription', e.target.value)}
                                />
                                <input
                                    className={styles.formField}
                                    type="text"
                                    placeholder="Experience Required"
                                    value={tuple.experienceRequired}
                                    onChange={(e) => handleRecruiterTupleChange(index, 'experienceRequired', e.target.value)}
                                />
                                <button type="button" onClick={() => removeRecruiterTuple(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} type="button" onClick={addRecruiterTuple}>
                            Add Tuple
                        </button>

                        <input className={styles.formField} type="password" placeholder="Password" value={recruiterData.password} onChange={(e) => setRecruiterData({ ...recruiterData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleRecruiterSubmit}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'campus' ? styles.active : ''}`}>
                {activeForm === 'campus' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="University Name" value={campusData.universityName} onChange={(e) => setCampusData({ ...campusData, universityName: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="Coordinator Name" value={campusData.coordinatorName} onChange={(e) => setCampusData({ ...campusData, coordinatorName: e.target.value })} />
                        <input className={styles.formField} type="email" placeholder="Coordinator Email" value={campusData.coordinatorEmail} onChange={(e) => setCampusData({ ...campusData, coordinatorEmail: e.target.value })} />
                        <input className={styles.formField} type="url" placeholder="University Site" value={campusData.universitySite} onChange={(e) => setCampusData({ ...campusData, universitySite: e.target.value })} />
                        <input className={styles.formField} type="tel" placeholder="Coordinator Phone Number" value={campusData.coordinatorPhoneNumber} onChange={(e) => setCampusData({ ...campusData, coordinatorPhoneNumber: e.target.value })} />
                        <input className={styles.formField} type="text" placeholder="College Address" value={campusData.collegeAddress} onChange={(e) => setCampusData({ ...campusData, collegeAddress: e.target.value })} />
                        <input className={styles.formField} type="number" placeholder="Pin Code" value={campusData.pinCode} onChange={(e) => setCampusData({ ...campusData, pinCode: e.target.value })} />

                        {campusTuples.map((tuple, index) => (
                            <div key={index}>
                                <select
                                    className={styles.formField}
                                    value={tuple.sector}
                                    onChange={(e) => handleCampusTupleChange(index, 'sector', e.target.value)}
                                >
                                    <option value="">Select Sector</option>
                                    {sectorOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className={styles.formField}
                                    type="number"
                                    placeholder="Job Openings"
                                    value={tuple.jobOpenings}
                                    onChange={(e) => handleCampusTupleChange(index, 'jobOpenings', e.target.value)}
                                />
                                <button type="button" onClick={() => removeCampusTuple(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button className={styles.button} type="button" onClick={addCampusTuple}>
                            Add Tuple
                        </button>

                        <input className={styles.formField} type="password" placeholder="Password" value={campusData.password} onChange={(e) => setCampusData({ ...campusData, password: e.target.value })} />
                        <button className={styles.button} onClick={handleCampusSubmit}>Submit</button>
                    </>
                )}
            </div>
            <Link href="/login" className={styles.link}>
          Existing user? Login →
        </Link>
        </div>
    );
};

export default RegisterForms;
