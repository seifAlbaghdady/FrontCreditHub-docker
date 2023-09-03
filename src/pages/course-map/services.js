import { fetchData, deleteData, postData } from "../../utils/api";


export const getSemesters = async (courseMapId) => {
    try {
        const semesters = await fetchData(`/course-maps/${courseMapId}/semesters`, { includeCourses: true }, true);
        return semesters;
    } catch (error) {
        console.log(error);
    }
};

export const getCourseMap = async (courseMapId) => {
    try {
        let response = await fetchData(`/course-maps`, {}, true);
        response = response.filter(courseMap => courseMap.id === courseMapId);
        console.log(response);
        return response[0]
    } catch (error) {
        console.log(error);
    }
}

export const deleteCourse = async (courseMapId, semesterId, courseCode) => {
    try {
        const response = await deleteData(`/course-maps/${courseMapId}/semesters/${semesterId}/courses/${courseCode}`, true);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAvailableCourses = async (courseMapId, semesterId) => {
    try {
        const response = await fetchData(`/course-maps/${courseMapId}/semesters/${semesterId}/available-courses`, {}, true);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addCourse = async (courseMapId, semesterId, courseCode) => {
    try {
        const response = await postData(`/course-maps/${courseMapId}/semesters/${semesterId}/courses/${courseCode}`, {}, {}, true);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addCourses = async (courseMapId, semesterId, courseCodes) => {
    try {
        const response = await postData(`/course-maps/${courseMapId}/semesters/${semesterId}/courses`, {courseCodes}, {}, true);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseMapSummary = (semesters) => {
    let summary = {
        "Total": {
            "courses": 0,
            "credits": 0
        },
        "Requirements": {
            "University Requirements": {
                "done": 0,
                "total": 7
            },
            "College Requirements": {
                "done": 0,
                "total": 19
            },
            "Program Requirements": {
                "done": 0,
                "total": 36
            },
            "Elective Group (1)": {
                "done": 0,
                "total": 2
            },
            "Elective Group (2)": {
                "done": 0,
                "total": 4
            }
        }
    }
    semesters.forEach(semester => {
        semester.courses.forEach(course => {
            summary.Total.courses += 1;
            summary.Total.credits += course.credits;

            if (summary.Requirements[course.group] === undefined) {
                throw new Error(`Group ${course.group} not found in requirements`);
            }
            summary.Requirements[course.group].done += 1;
        })
    })

    return summary;

}