import { fetchData, deleteData, postData } from "../../utils/api";

export const getCourseMaps = async () => {
    try {
        const courseMaps = await fetchData(`/course-maps`, {}, true);
        return courseMaps;
    } catch (error) {
        console.log(error);
    }
}

export const addCourseMap = async (courseMap) => {
    courseMap.startingYear = parseInt(courseMap.startingYear);
    try {
        const newCourseMap = await postData(`/course-maps`, courseMap, {}, true);
        return newCourseMap.data.id;
    } catch (error) {
        console.log(error);
    }
}