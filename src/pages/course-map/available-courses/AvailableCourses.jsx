import styles from './AvailableCourses.module.css';

import CourseCard from '../../../generic-components/course-card/CourseCard';

import { useState, useEffect } from 'react';

import { getAvailableCourses } from '../services';

const AvailableCourses = (props) => {
    const [courses, setCourses] = useState([]);
    const [shownCourses, setShownCourses] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [courseGroups, setCourseGroups] = useState([]);
    const [activeCourseGroup, setActiveCourseGroup] = useState("");

    useEffect(() => {
        async function fetchData() {
            const availableCoursesData = await getAvailableCourses(props.courseMapId, props.semesterId);
            setCourses(availableCoursesData);
            setShownCourses(availableCoursesData);
            setCourseGroups([...new Set(availableCoursesData.map(course => course.group))]);
        }
        fetchData();
    }, [props.semesterId]);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
        function searchCourses(query, data) {
            const searchTerm = query.toLowerCase();
            return data.filter(course =>
                course.code.toLowerCase().includes(searchTerm) ||
                course.name.toLowerCase().includes(searchTerm)
            );
        }
        setShownCourses(searchCourses(event.target.value, courses));
    }

    return (
        <>
            <h2>Add Course</h2>
            <p>Available Courses:</p>
            <div className={styles['search-bar-container']}>
                <input className={styles['search-bar']} type="text" placeholder="Search for a course" value={searchTerm} onChange={handleSearchTermChange} />
                {/* For every courseGroup make a button to filter courses with it */}
                <div className={styles['course-group-buttons-container']}>
                    {courseGroups.map((courseGroup, index) => {
                        return (
                            <div key={index} className={styles['course-group-button'] + (courseGroup === activeCourseGroup ? " " + styles['active-filter'] : "")}
                            onClick={() => {
                                if (courseGroup === activeCourseGroup) {
                                    setActiveCourseGroup("");
                                    setShownCourses(courses);
                                    return;
                                }
                                setActiveCourseGroup(courseGroup);
                                console.log(courses);
                                const filteredCourses = courses.filter(course => course.group === courseGroup);
                                console.log(filteredCourses);
                                setShownCourses(filteredCourses);
                            }}>{courseGroup}</div>
                        );
                    })}
                </div>
            </div>

            <div className={styles['available-courses-container']}>
                {shownCourses.map((course, index) => {
                    return (
                        <CourseCard
                            key={course.code || index}
                            course={course}
                            semesterSeason={props.semesterSeason}
                            isAvailableCourse={true}
                            onAddClick={props.onAddClick}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default AvailableCourses;