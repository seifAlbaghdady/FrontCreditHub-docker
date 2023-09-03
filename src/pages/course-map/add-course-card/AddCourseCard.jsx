import styles from './AddCourseCard.module.css';

const AddCourseCard = (props) => {
    return (
        <div className={styles["add-course-card"]} onClick={() => props.onClick()}>
            <div className={styles["add-course-card-icon"]}>
                <img src="/assets/img/plus.png" alt="plus icon" />
            </div>
        </div>
    );
}

export default AddCourseCard;