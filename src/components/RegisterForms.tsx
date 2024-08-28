import React, { useState } from 'react';
import styles from './RegisterForms.module.css';
import { PlusCircleIcon, PlusIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
    jobOpenings: string[];
    jobDescription: string;
    experienceRequired: string;
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
    const [recruiterTuples, setRecruiterTuples] = useState<RecruiterTuple[]>([{ sector: '', jobOpenings: [], jobDescription: '', experienceRequired: '' }]);

    const handleCampusTupleChange = (index: number, key: keyof CampusTuple, value: string) => {
        const newTuples = [...campusTuples];
        newTuples[index][key] = value;
        setCampusTuples(newTuples);
    };

    const handleRecruiterTupleChange = (index: number, key: keyof RecruiterTuple, value: string | string[]) => {
        const newTuples = [...recruiterTuples];
        newTuples[index][key] = value;
        setRecruiterTuples(newTuples);
    };

    const addCampusTuple = () => {
        setCampusTuples([...campusTuples, { sector: '', jobOpenings: '' }]);
    };

    const addRecruiterTuple = () => {
        setRecruiterTuples([...recruiterTuples, { sector: '', jobOpenings: [], jobDescription: '', experienceRequired: '' }]);
    };

    const removeCampusTuple = (index: number) => {
        setCampusTuples(campusTuples.filter((_, i) => i !== index));
    };

    const removeRecruiterTuple = (index: number) => {
        setRecruiterTuples(recruiterTuples.filter((_, i) => i !== index));
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
                        <input className={styles.formField} type="text" placeholder="Name" />
                        <input className={styles.formField} type="email" placeholder="Email" />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" />
                        <input className={styles.formField} type="text" placeholder="College Name" />
                        <select className={styles.formField}>
                            <option value="">Select Sector</option>
                            {sectorOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <input className={styles.formField} type="text" placeholder="Job Role" />
                        <span className={styles.uploadCon}>
                            <span className={styles.uploadText}>Upload your resume</span>
                            <input className={styles.formField} type="file" />
                        </span>
                        <button className={styles.button}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'recruiter' ? styles.active : ''}`}>
                {activeForm === 'recruiter' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="Name" />
                        <input className={styles.formField} type="email" placeholder="Work Email" />
                        <input className={styles.formField} type="tel" placeholder="Phone Number" />
                        <input className={styles.formField} type="text" placeholder="Company Name" />
                        <input className={styles.formField} type="url" placeholder="Company official website" />
                        <div className={styles.tupleContainer}>
                            {recruiterTuples.map((tuple, index) => (
                                <div key={index} className={styles.tuple}>
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
                                        placeholder="Job Openings (in number)"
                                        value={tuple.jobOpenings.join(', ')}
                                        onChange={(e) => handleRecruiterTupleChange(index, 'jobOpenings', e.target.value.split(',').map(s => s.trim()))}
                                    />
                                    <textarea
                                        className={styles.textareaField}
                                        placeholder="Job Description"
                                        value={tuple.jobDescription}
                                        onChange={(e) => handleRecruiterTupleChange(index, 'jobDescription', e.target.value)}
                                    />
                                    <input
                                        className={styles.formField}
                                        type="number"
                                        placeholder="Experience Required(in years)"
                                        value={tuple.experienceRequired}
                                        onChange={(e) => handleRecruiterTupleChange(index, 'experienceRequired', e.target.value)}
                                    />
                                    <div className={styles.tupleButtons}>
                                        <button
                                            className={`${styles.button} ${styles.removeButton}`}
                                            onClick={() => removeRecruiterTuple(index)}
                                        >
                                            <Trash2 />
                                        </button>

                                    </div>
                                </div>
                            ))}
                            <button className={styles.button} onClick={addRecruiterTuple}>
                                <PlusCircleIcon />
                            </button>
                        </div>
                        <button className={styles.button}>Submit</button>
                    </>
                )}
            </div>

            <div className={`${styles.form} ${activeForm === 'campus' ? styles.active : ''}`}>
                {activeForm === 'campus' && (
                    <>
                        <input className={styles.formField} type="text" placeholder="University Name" />
                        <input className={styles.formField} type="url" placeholder="University official website" />
                        <input className={styles.formField} type="email" placeholder="Placement Center Email" />
                        <input className={styles.formField} type="text" placeholder="Placement Coordinator Name" />
                        <input className={styles.formField} type="tel" placeholder="Placement Coordinator Phone Number" />
                        <input className={styles.formField} type="text" placeholder="University Address" />
                        <input className={styles.formField} type="number" placeholder="Pin Code" />
                        <div className={styles.tupleContainer}>
                            {campusTuples.map((tuple, index) => (
                                <div key={index} className={styles.tuple}>
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
                                        placeholder="Job Openings(in number)"
                                        value={tuple.jobOpenings}
                                        onChange={(e) => handleCampusTupleChange(index, 'jobOpenings', e.target.value)}
                                    />
                                    <div className={styles.tupleButtons}>
                                        <button
                                            className={`${styles.button} ${styles.removeButton}`}
                                            onClick={() => removeCampusTuple(index)}
                                        >
                                            <Trash2 />
                                        </button>

                                    </div>
                                </div>
                            ))}
                            <button className={styles.button} onClick={addCampusTuple}>
                                <PlusCircleIcon />
                            </button>
                        </div>
                        <button className={styles.button}>Submit</button>
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
