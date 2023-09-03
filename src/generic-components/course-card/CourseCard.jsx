import styles from './CourseCard.module.css';
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

import WarningIcon from './WarningIcon';


const CourseCard = (props) => {

    const [isCourseInfoOpen, setIsCourseInfoOpen] = useState(false);
    
    let course = props.course || {
        code: "GENN001",
        name: "Humanities and Engineering",
        credits: 1,
        group: "University Course",
        type: "Required"
    }
    if (course.group && !course.type) {
        course.type = course.group.includes("Req") ? "Required" : "Elective";
        course.shownGroup = course.group;
        course.shownGroup = course.shownGroup.replace("Requirements", "Course");
    }
    
    const handleDeleteClick = () => {
        props.onDeleteClick(course.code);
    }
    
    const handleAddClick = () => {
        props.onAddClick(course);
    }

    const isOffSemester = course.availableSemesters && !course.availableSemesters.includes(props.semesterSeason);
    const warningMessage = isOffSemester ? "This course has not been offered in the " + props.semesterSeason + " semester before." : null;
    
    return (
        <div
            className={props.isAvailableCourse ? `${styles["course-card"]} ${styles["available-course"]}` : styles["course-card"]}
            style={{ backgroundColor: getBackgroundColor(course.shownGroup).cardBackgroundColor }}
            onClick={props.isAvailableCourse ? handleAddClick : null}>
            <div className={styles["header"]}>
                <div className={styles["course-code"]}>
                    {course.code}
                </div>
                <div className={styles["course-credits"]} style={{ backgroundColor: getBackgroundColor(course.shownGroup).creditsBackgroundColor }}>
                    {course.credits}
                </div>
            </div>
            <div className={styles["body"]}>
                <div className={styles["course-name"]} onClick={() => setIsCourseInfoOpen(true)}>
                    {course.name}
                </div>
                <div className={styles["course-group"]}>
                    {course.shownGroup}, <strong>{course.type}</strong>
                </div>
            </div>
            <div className={styles["footer"]}>
                <div className={styles["warning-icon"]}>
                    <WarningIcon message={warningMessage} />
                </div>
                    
                {props.isAvailableCourse ? null :
                    <div className={`${styles["delete-button"]} ${styles["button"]}`} onClick={handleDeleteClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </div>
                }
            </div>
            <ReactModal
                isOpen={isCourseInfoOpen}
                onRequestClose={() => setIsCourseInfoOpen(false)}
                contentLabel="Add Course"
            >
                <h2>{course.code}</h2>
                <h3>{course.name}</h3>
                <p>{course.credits} credits</p>
                <p>Description: {course.description}</p>
                <p>{course.group}, <strong>{course.type}</strong></p>
                <p>Available in the following semesters according to the history of the past 5 years:</p>
                <ul>
                    {course.availableSemesters ? course.availableSemesters.map((semester) => <li>{semester}</li>) : null}
                </ul>
                <p>Prerequisites:</p>
                <ul>
                    {course.prerequisites ? course.prerequisites.map((prerequisite) => <li>{prerequisite}</li>) : null}
                </ul>
                <p>Prereq hours: {course.prereqHours}</p>
                <p>Prereq for (open the following courses):</p>
                <ul>
                    {course.prereqFor ? course.prereqFor.map((prereqFor) => <li>{prereqFor}</li>) : null}
                </ul>
                <p>Grade Statistics:</p>
                <p>Course faq:</p>
                <p>Course reviews:</p>
                <p>Course rating:</p>
                <p>Course forum:</p>
                <p>Course guide:</p>

                <button onClick={() => setIsCourseInfoOpen(false)}>close</button>
            </ReactModal>
        </div >
    );
}

const getBackgroundColor = (courseGroup) => {
    switch (courseGroup) {
        case "University Course":
        case "Elective Group (1)":
            return { cardBackgroundColor: "#F19C99", creditsBackgroundColor: "#9C0D38" }
        case "College Course":
            return { cardBackgroundColor: "#B9E1A5", creditsBackgroundColor: "#465C3C" }
        case "Discipline Course":
        case "Elective Group (2)":
            return { cardBackgroundColor: "#E2D4E7", creditsBackgroundColor: "#674274" }
        case "Program Course":
            return { cardBackgroundColor: "#92B5E8", creditsBackgroundColor: "#0B356E" }
        default:
            return { cardBackgroundColor: "#F19C99", creditsBackgroundColor: "#9C0D38" }
    }
}

export default CourseCard;