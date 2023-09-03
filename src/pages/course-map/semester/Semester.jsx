import styles from "./Semester.module.css";

import CourseCard from "../../../generic-components/course-card/CourseCard";
import AddCourseCard from "../add-course-card/AddCourseCard";

import { useState, useEffect } from "react";


function Semester(props) {
    
    let courses = props.courses || [
        {
            code: "GENN001",
            name: "Humanities and Engineering",
            credits: 1,
            group: "University Course",
            type: "Required"
        },
        {
            code: "MTHN001",
            name: "Linear Algebra and Geometry",
            credits: 3,
            group: "College Course",
            type: "Required"
        },
        {
            code: "CMPN103",
            name: "Programming Techniques",
            credits: 3,
            group: "Discipline Course",
            type: "Required"
        },
        {
            code: "CMPN111",
            name: "Logic Design I",
            credits: 3,
            group: "Major Course",
            type: "Required"
        } ]
    
    const [semesterCredits, setSemesterCredits] = useState(0);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        async function fetchData() {
        }
        let newSemesterCredits = courses.reduce((total, course) => total + course.credits, 0);
        setSemesterCredits(newSemesterCredits);
        fetchData();
    }, [courses]);

    const handleDeleteCourse = (courseCode) => {
        props.handleDeleteCourse(props.semesterId, courseCode);
    }

    const handleAddCourse = () => {
        props.handleAddCourse(props.semesterId);
    }

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    return (
        <>
            <div className={styles["semester"]}>
                <div className={styles["semester-title-bar"]}>
                    <div className={styles["semester-title-bar-left"]}>
                        <div className={styles["semester-title-bar-arrow-icon"]} onClick={toggleExpanded}>
                            <div className={styles["expanded-icon"]} style={{display: expanded ? "block" : "none"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </div>
                            <div className={styles["collapsed-icon"]} style={{display: expanded ? "none" : "block"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </div>
                        </div>
                        <span className={styles["semester-season"]}>{props.semesterSeason} {props.semesterYear}</span>
                    </div>
                    <div className={styles["semester-title-bar-right"]}>
                        <span className={styles["semester-title-bar-credits-text"]}>Credits: {semesterCredits}</span>
                    </div>
                </div>
                <div className={styles["semester-content"]} style={{display: expanded ? "flex" : "none"}}>
                    {courses.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                course={course}
                                semesterSeason={props.semesterSeason}
                                onDeleteClick={handleDeleteCourse}
                            />
                        );
                    })}
                    <AddCourseCard 
                        onClick={handleAddCourse}
                    />
                </div>
                {/* <div className={styles["available-courses-container" id="available-courses-container"]}>

                </div> */}
            </div>
        </>
    );
}

export default Semester;