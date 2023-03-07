'use strict';

const sqlite = require('sqlite3');
const db = new sqlite.Database("studyPlan.db", (err) => {
    if (err) {
        throw new Error(err);
    }
});

async function getCourses() {
    const sql = "SELECT * FROM Courses";
    const sql2 = "SELECT * FROM IncompatibleCourses"
    return new Promise((resolve, reject) => {
        db.all(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            let courses = rows;
            db.all(sql2, (error, rows) => {
                if (error) {
                    return reject(error);
                }
                courses = courses.map(
                    (c) => ({
                        id: c.id,
                        name: c.name,
                        creditsNumber: c.creditsNumber,
                        studentsNumberMAX: c.studentsNumberMAX,
                        studentsNumber: c.studentsNumber,
                        preparatoryCourse: c.preparatoryCourse,
                        incompatibleCourses: rows
                            .filter((icF) => icF.courseId == c.id)
                            .map((icM) => icM.incompatibleCourseId),
                        followingCourse: courses
                            .filter((cF) => c.id == cF.preparatoryCourse)
                            .map((cM) => (cM.id))[0]
                    })
                ).sort((a, b) => (a.name > b.name ? 1 : -1))
                resolve(courses);
            })

        })
    })
}

async function getStudyPlan(user) {
    const sql = "SELECT * FROM Plans WHERE studentId=?";
    return new Promise((resolve, reject) => {
        db.all(sql, [user], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(rows.map((c) => c.courseId));
        })
    })
}

async function getRange() {
    const sql = "SELECT * FROM PlanTypes ";
    return new Promise((resolve, reject) => {
        db.all(sql, (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(rows.map((sp) => ({
                id: sp.id,
                name: sp.name,
                min: sp.creditsMIN,
                max: sp.creditsMAX
            })));
        })
    })
}

async function getNumberOfStudentsEnrolled(course) {
    const sql = "SELECT COUNT(*) AS studEnr FROM Plans WHERE courseId=? ";
    return new Promise((resolve, reject) => {
        db.all(sql, [course], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(rows[0]);
        })
    })
}


async function postCourseInStudyPlan(course, user) {
    const sql = "INSERT INTO Plans (studentId, courseId) VALUES (?,?) ";
    return new Promise((resolve, reject) => {
        db.all(sql, [user, course], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        })
    })
}

async function putType(user, type) {
    const sql = "UPDATE Students SET type=? WHERE id=? ";
    return new Promise((resolve, reject) => {
        db.all(sql, [type, user], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        })
    })
}

async function putStudentEnrolled(course, studEnr) {
    const sql = "UPDATE Courses SET studentsNumber=? WHERE id=? ";
    return new Promise((resolve, reject) => {
        db.all(sql, [studEnr, course], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        })
    })
}

async function deleteStudyPlan(user) {
    const sql = "DELETE FROM Plans WHERE studentId=? ";
    return new Promise((resolve, reject) => {
        db.all(sql, [user], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        })
    })
}

async function deleteCourseInStudyPlan(course, user) {
    const sql = "DELETE FROM Plans WHERE courseId=? AND studentId=? ";
    return new Promise((resolve, reject) => {
        db.all(sql, [course, user], (error, rows) => {
            if (error) {
                return reject(error);
            }
            return resolve(true);
        })
    })
}

async function checkValid(newStudyPlan, courses, min, max, checkStudents) {
    let studyPlanDetails = newStudyPlan.map((sp) => ({
        id: sp,
        incompatibleCourses: courses.filter((c) => c.id === sp).map((c) => c.incompatibleCourses)[0],
        preparatoryCourse: courses.filter((c) => c.id === sp).map((c) => c.preparatoryCourse)[0]
    }))
    let checkStudentsDetails = checkStudents.map((sp) => ({
        id: sp,
        studentsNumberMAX: courses.filter((c) => c.id === sp).map((c) => c.studentsNumberMAX)[0]
    }))

    let courseIds = courses.map((c) => c.id);

    let credits = calculateCredits(newStudyPlan, courses);


    //CHECK IF CREDITS[MIN, MAX]
    if (credits > max) {
        return false;
    } else if (credits < min) {
        return false;
    }

    let studEnr;
    for (let i = 0; i < studyPlanDetails.length; i++) {
        // CHECK IF COURSE EXIST
        if (!courseIds.includes(studyPlanDetails[i].id)) {
            return false;
        }

        // CHECK INCOMPATIBLE COURSES
        if (studyPlanDetails[i].incompatibleCourses.length !== 0 && newStudyPlan.some((x) => studyPlanDetails[i].incompatibleCourses.includes(x))) {
            return false;
        }
        // CHECK PREPARATORY COURSE
        if (studyPlanDetails[i].preparatoryCourse !== null && !(newStudyPlan.includes(studyPlanDetails[i].preparatoryCourse))) {
            return false;
        }
    }

    for (let i = 0; i < checkStudentsDetails.length; i++) {
        //CHECK AVAILABLE 
        if (checkStudentsDetails[i].studentsNumberMAX !== null) {
            studEnr = await getNumberOfStudentsEnrolled(checkStudentsDetails[i].id);
            if (studEnr.studEnr >= checkStudentsDetails[i].studentsNumberMAX) {
                return false;
            }
        }
    }


    return true;
}

function calculateCredits(studyPlan, courses) {
    let cred = 0;
    let study = studyPlan.map(
        (c) => (courses.filter((c1) => c1.id === c).map((c2) => c2.creditsNumber)[0]
        )
    )
    for (let i = 0; i < study.length; i++) {
        cred = cred + study[i];
    }

    return cred;
}

module.exports = {
    getCourses,
    getStudyPlan,
    getRange,
    getNumberOfStudentsEnrolled,

    postCourseInStudyPlan,

    putType,
    putStudentEnrolled,

    deleteStudyPlan,
    deleteCourseInStudyPlan,

    checkValid

}