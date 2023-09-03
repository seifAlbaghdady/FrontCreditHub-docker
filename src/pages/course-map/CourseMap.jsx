import styles from "./CourseMap.module.css";
import Navbar from "../../layouts/navbar/Navbar";
import Semester from "./semester/Semester";
import CourseCard from "../../generic-components/course-card/CourseCard";
import AvailableCourses from "./available-courses/AvailableCourses";
import ProgressBar from "../../generic-components/progress-bar/ProgressBar";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReactModal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";

import { getCourseMap, getSemesters, deleteCourse, addCourse, addCourses, getCourseMapSummary} from "./services";


function CourseMap() {
    const { courseMapId } = useParams();

    const [semesters, setSemesters] = useState([]);
    const [courseMap, setCourseMap] = useState({});
    const [courseMapSummary, setCourseMapSummary] = useState(null);

    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
    const [activeSemesterId, setActiveSemesterId] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            const semestersData = await getSemesters(courseMapId);
            setSemesters(semestersData);
            setCourseMapSummary(getCourseMapSummary(semestersData));

            const courseMapData = await getCourseMap(courseMapId);
            setCourseMap(courseMapData);
            setLoading(false);
        }

        fetchData();
    }, []);


    useEffect(() => {
        setCourseMapSummary(getCourseMapSummary(semesters));

    }, [semesters]);


    const handleDeleteCourse = async (semesterId, courseCode) => {
        const res = await deleteCourse(courseMapId, semesterId, courseCode);
        if (res.status === 200) {
            setSemesters(semesters.filter(semester => {
                if (semester.id === semesterId) {
                    semester.courses = semester.courses.filter(course => course.code !== courseCode);
                }
                return semester;
            }));
        }
    }

    const handleAddCourseSemester = (semesterId) => {
        setActiveSemesterId(semesterId);
        setIsAddCourseOpen(true);
    }

    const handleAddCourseClick = async (course) => {
        setIsAddCourseOpen(false);
        setSemesters(semesters.map(semester => {
            if (semester.id === activeSemesterId) {
                semester.courses.push(course);                    
            }
            return semester;
        }));
        const res = await addCourse(courseMapId, activeSemesterId, course.code);
        if (!res) {
            alert("Something went wrong while adding the course. Please try again. If the problem persists, please report the bug.");
            window.location.reload();
        }

    }
    const loaderStyle = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    return (
        <>
            {loading ? <div style={loaderStyle}><BounceLoader color="#138496" /></div> : <></>}
            <div className={styles["course-map"]} >
                <div className={styles["navbar-container"]}>
                    <Navbar />
                </div>
                <div className={styles["body-container"]}>
                    <div className={styles["header-container"]}>
                        <div className={styles["header-left-container"]}>
                            <h2 className={styles["course-map-title"]}>{courseMap.name}</h2>
                            <p className={styles["course-map-program"]}>{loading ? "" : "Program: " + courseMap.program.code}</p>
                        </div>
                        <div className={styles["course-map-progress-bar"]}>
                            <ProgressBar progressDetails={courseMapSummary} />
                        </div>
                        {/* Add a button to generate pdf */}
                    </div>
                    <div className={styles["content-container"]}>
                        {/* Create Semester component for each semester */}
                        {semesters.map((semester, index) => {
                            return (
                                <Semester
                                    key={semester.id || index}
                                    semesterId={semester.id || ""}
                                    semesterSeason={semester.season || "Fall"}
                                    semesterYear={semester.year || 2019}
                                    semesterCredits={semester.credits || 0}
                                    courses={semester.courses || []}
                                    handleDeleteCourse={handleDeleteCourse}
                                    handleAddCourse={handleAddCourseSemester}
                                />
                            );
                        })}
                    </div>
                </div>
                <ReactModal
                    isOpen={isAddCourseOpen}
                    onRequestClose={() => setIsAddCourseOpen(false)}
                    contentLabel="Add Course"
                >
                    <AvailableCourses
                        courseMapId={courseMapId}
                        semesterId={activeSemesterId}
                        semesterSeason={semesters.find(semester => semester.id === activeSemesterId)?.season}
                        onAddClick={handleAddCourseClick}
                    />

                    <button onClick={() => setIsAddCourseOpen(false)}>Close</button>
                </ReactModal>
            </div>
        </>

    );
}

export default CourseMap;