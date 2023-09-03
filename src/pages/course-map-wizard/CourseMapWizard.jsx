import styles from "./CourseMapWizard.module.css";
import Navbar from "../../layouts/navbar/Navbar";

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';
import BounceLoader from "react-spinners/BounceLoader";


import { getCourseMaps, addCourseMap } from "./services";


function CourseMapWizard() {
    let navigate = useNavigate();

    const [courseMaps, setCourseMaps] = useState([]);
    const [newCourseMapValues, setNewCourseMapValues] = useState({
        name: "",
        programCode: "CCEC",
        startingYear: 0,
    });

    const [isAddCourseMapOpen, setIsAddCourseMapOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const fetchedCourseMaps = await getCourseMaps();
            setCourseMaps(fetchedCourseMaps);
            setLoading(false);
        }

        fetchData();
    }, []);

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewCourseMapValues({ ...newCourseMapValues, [name]: value });
    }

    async function handleAddCourseMap(event) {
        event.preventDefault();
        console.log(newCourseMapValues);
        const newCourseMapId = await addCourseMap(newCourseMapValues);
        navigate(`/course-map/${newCourseMapId}`);

    }

    const loaderStyle = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    return (
        <>
            {loading ? <div style={loaderStyle}><BounceLoader color="#138496" /></div> : <></>}

            <div className={styles["course-map-wizard"]}>
                <div className={styles["navbar-container"]}>
                    <Navbar />
                </div>
                <div className={styles["body-container"]}>
                    <div className={styles["header-container"]}>
                        <h1>Course Map Wizard</h1>
                    </div>
                    <div className={styles["content-container"]}>
                        <div className={styles["course-maps"]}>
                            {courseMaps.map((courseMap) => (
                                <div className={styles["course-map"]} key={courseMap.id} onClick={() => navigate(`/course-map/${courseMap.id}`)}>
                                    <div className={styles["course-map-header"]}>
                                        <h2>{courseMap.name}</h2>
                                        <p>Program: {courseMap.program.code}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles["new-course-map"]}>
                            <div className={styles["new-course-map-header"]}>
                                <button onClick={() => setIsAddCourseMapOpen(true)}>Add Course Map</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactModal
                    isOpen={isAddCourseMapOpen}
                    contentLabel="Add Course Map"
                    onRequestClose={() => setIsAddCourseMapOpen(false)}
                >
                    <form className={styles["add-course-map-form"]} onSubmit={handleAddCourseMap}>
                        <h2>Add Course Map</h2>
                        <label htmlFor="course-map-name">Course Map Name</label>
                        <input type="text" name="name" id="course-map-name" value={newCourseMapValues.name} onChange={handleInputChange} />
                        <label htmlFor="program">Program</label>
                        <select name="program" id="program" value={newCourseMapValues.program} onChange={handleInputChange}>
                            <option value="CCEC">Computer Engineering</option>
                            <option value="CCEE">Communication Engineering</option>
                        </select>
                        {/* startingYear (int value) */}
                        <label htmlFor="starting-year">Starting Year (YYYY)</label>
                        <input type="number" name="startingYear" id="starting-year" value={newCourseMapValues.startingYear} onChange={handleInputChange} />
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => setIsAddCourseMapOpen(false)}>Cancel</button>
                    </form>
                </ReactModal>



            </div>
        </>
    );
}

export default CourseMapWizard;