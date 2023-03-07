const URL = 'http://localhost:3001/api/v1'
const LOG_URL = 'http://localhost:3001/api'

/* ------------------ GET ------------------ */
async function getAllCourses() {
    const url = URL + '/';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            const coursesList = await response.json();
            return coursesList;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

async function getStudyPlan() {
    const url = URL + '/studyplan';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            const studyPlanList = await response.json();
            return studyPlanList;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

async function getRange() {
    const url = URL + '/range';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            const range = await response.json();
            return range;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

async function getNumberOfStudentsEnrolled(course) {
    const url = URL + '/course/' + course + '/studentEnrolled';
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (response.ok) {
            let studentEnrolled = response.json();
            return studentEnrolled;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}

async function getUserInfo() {
    const url = URL + '/user';
    try {
        const response = await fetch(url, {
            credentials: 'include'
        });
        if (response.ok) {
            const type = await response.json();
            return type;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

/* ------------------ POST ------------------ */

async function postStudyPlan(studyPlan, type) {
    const url = URL + '/studyplan';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studyplan": studyPlan,
                "type": type
            }),
            credentials: 'include'
        });
        if (response.ok) {
            let isvalid = await response.json();
            return isvalid;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}

/* ------------------ PUT ------------------ */

async function putType(type) {
    const url = URL + '/type';
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "type": type
            }),
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}
async function putStudentEnrolled(course, studEnr) {
    const url = URL + '/course/' + course + '/studentEnrolled';
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studEnr": studEnr
            }),
            credentials: 'include'
        })
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}

async function putStudyPlan(studyPlan, type) {
    const url = URL + '/studyplan';
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studyplan": studyPlan,
                "type": type
            }),
            credentials: 'include'
        });
        if (response.ok) {
            let isvalid = await response.json();
            return isvalid;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}

/* ------------------ DELETE ------------------ */
async function deleteStudyPlan() {
    const url = URL + '/studyplan';
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            return true;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (error) {
        throw error;
    }
}

/* ------------------ LOGIN/LOGOUT ------------------ */

async function postStudentLOGIN(username, password) {
    const url = LOG_URL + '/login';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return await response.json();
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

async function postStudentLOGOUT() {
    const url = LOG_URL + '/logout';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        if (response.ok) {
            return;
        }
        else {
            const text = await response.text();
            throw new TypeError(text);
        }
    }
    catch (error) {
        throw error;
    }
}

const API = {
    getAllCourses,
    getStudyPlan,
    getRange,
    getNumberOfStudentsEnrolled,
    getUserInfo,


    postStudyPlan,

    putStudentEnrolled,
    putType,
    putStudyPlan,


    deleteStudyPlan,

    postStudentLOGIN,
    postStudentLOGOUT
}

export default API;