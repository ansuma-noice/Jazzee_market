// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './recruiter.module.css';

// // Types for profiles
// type CampusProfile = {
//   universityName: string;
//   universitySite: string;
//   sector: string;
//   jobOpenings: number;
//   jobDescription: string;
//   coordinatorName: string;
//   coordinatorEmail: string;
//   coordinatorPhoneNumber: string;
//   collegeAddress: string;
//   pinCode: string;
// };

// type StudentProfile = {
//   name: string;
//   resume: string;
//   sector: string;
//   jobRole: string;
//   collegeName: string;
//   email: string;
//   phoneNumber: string;
// };

// const RecruiterPage = () => {
//   const [user, setUser] = useState<{ designation: string } | null>(null);
//   const [filter, setFilter] = useState<'campus' | 'student'>('campus');
//   const [profiles, setProfiles] = useState<CampusProfile[] | StudentProfile[]>([]);
//   const [requests, setRequests] = useState<CampusProfile[] | StudentProfile[]>([]);
//   const [activeSection, setActiveSection] = useState<'suggestions' | 'requests'>('suggestions');

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await axios.get('/api/user');
//       setUser(response.data);
//     };
    
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       const endpoint = filter === 'campus' ? '/api/campus' : '/api/student';
//       const response = await axios.get(endpoint);
//       setProfiles(response.data);
//     };

//     fetchProfiles();
//   }, [filter]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       const endpoint = filter === 'campus' ? '/api/requests/campus' : '/api/requests/student';
//       const response = await axios.get(endpoint);
//       setRequests(response.data);
//     };

//     fetchRequests();
//   }, [filter, activeSection]);

//   const handleRequest = async (profile: CampusProfile | StudentProfile) => {
//     // Handle sending request to campus or student
//     await axios.post('/api/send-request', { profile });
//     // Optionally, you can update the UI to reflect the request
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <div className={styles.designation}>{user?.designation}</div>
//       </div>
//       <div className={styles.mainContent}>
//         <div className={styles.sectionButtons}>
//           <button
//             className={activeSection === 'suggestions' ? styles.activeButton : styles.button}
//             onClick={() => setActiveSection('suggestions')}
//           >
//             Suggestions
//           </button>
//           <button
//             className={activeSection === 'requests' ? styles.activeButton : styles.button}
//             onClick={() => setActiveSection('requests')}
//           >
//             Requests
//           </button>
//         </div>

//         <div className={styles.filter}>
//           <select onChange={(e) => setFilter(e.target.value as 'campus' | 'student')} value={filter}>
//             <option value="campus">Campus</option>
//             <option value="student">Student</option>
//           </select>
//         </div>

//         <div className={styles.content}>
//           {activeSection === 'suggestions' && (
//             <div>
//               {profiles.map((profile, index) => (
//                 <div key={index} className={styles.profile}>
//                   {filter === 'campus' ? (
//                     <>
//                       <h3>{(profile as CampusProfile).universityName}</h3>
//                       <p>{(profile as CampusProfile).universitySite}</p>
//                       {/* Display other details */}
//                       <button onClick={() => handleRequest(profile)}>Send Request</button>
//                     </>
//                   ) : (
//                     <>
//                       <h3>{(profile as StudentProfile).name}</h3>
//                       <p>{(profile as StudentProfile).resume}</p>
//                       {/* Display other details */}
//                       <button onClick={() => handleRequest(profile)}>Send Request</button>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeSection === 'requests' && (
//             <div>
//               {requests.map((request, index) => (
//                 <div key={index} className={styles.profile}>
//                   {filter === 'campus' ? (
//                     <>
//                       <h3>{(request as CampusProfile).universityName}</h3>
//                       <p>{(request as CampusProfile).universitySite}</p>
//                       <p>{(request as CampusProfile).coordinatorName}</p>
//                       <p>{(request as CampusProfile).coordinatorEmail}</p>
//                       {/* Display other details */}
//                     </>
//                   ) : (
//                     <>
//                       <h3>{(request as StudentProfile).name}</h3>
//                       <p>{(request as StudentProfile).resume}</p>
//                       <p>{(request as StudentProfile).email}</p>
//                       {/* Display other details */}
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterPage;
