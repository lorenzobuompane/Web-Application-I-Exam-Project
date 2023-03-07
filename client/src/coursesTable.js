import { useEffect, useState } from "react"
import { Container, Table, Row, Col } from "react-bootstrap"

function CoursesTable(props) {
    return <>
        <Container fluid className="d-flex justify-content-center">
            <Row style={{ fontSize: "25px", fontWeight: "bold", color: "hsl(178deg 83% 14%)", "--bs-gutter-x": 0 }}>
                ALL COURSES
                <hr />
            </Row>
        </Container>
        <Container fluid className="my-2" style={{ width: "90%", height: props.studentLogged !== '' ? "43vh" : "83vh", overflow: "scroll", boxShadow: "0px 0px 15px 0px black" }}>
            <Row>
                <Table size="sm">
                    <thead>
                        <tr>
                            <th width={"100rem"}>Code</th>
                            <th width={"500rem"}>Name</th>
                            <th width={"150rem"}>Credits Number</th>
                            <th width={"150rem"}>Students enrolled</th>
                            <th width={"150rem"}>Max n° of student</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.courses.map((c) =>
                                <CoursesRow
                                    key={c.id}
                                    course={c}
                                    courses={props.courses}
                                    setCourses={props.setCourses}
                                    mode={props.mode}
                                    studyPlan={props.studyPlan}
                                    setStudyPlan={props.setStudyPlan}
                                    studentLogged={props.studentLogged}
                                    localCredits={props.localCredits}
                                    setLocalCredits={props.setLocalCredits}
                                ></CoursesRow>)
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    </>
}

function CoursesRow(props) {
    const [open, setOpen] = useState(false);
    const [lock, setLock] = useState(false);
    const [lockMsg, setLockMsg] = useState('');
    const [inserted, setInserted] = useState(false);

    useEffect(() => {
        /* CHECK ALREADY INSERTED */
        if (props.studyPlan.includes(props.course.id)) {
            setInserted(() => true);
        }
        else {
            setInserted(() => false);
        }

        /* CHECK IF COURSE IS FULL */
        if (props.course.studentsNumberMAX !== null && props.course.studentsNumberMAX === props.course.studentsNumber) {
            setLock(() => true);
            setLockMsg("That course is full");
        }
        /* CHECK IF COURSE IS INCOMPATIBLE */
        else if (props.course.incompatibleCourses.length !== 0 && props.studyPlan.some((c) => props.course.incompatibleCourses.includes(c))) {
            setLock(() => true);
            setLockMsg("That course is incompatible with your study plan");
        }
        /* CHECK IF COURSE IS PREPARATORY */
        else if (props.course.preparatoryCourse !== null && !(props.studyPlan.includes(props.course.preparatoryCourse))) {
            setLock(() => true);
            setLockMsg("That course require a preparatory course not in your study plan");
        }
        /* IT'S OK */
        else {
            setLockMsg(() => '');
            setLock(() => false);
        }

    }, [
        props.studyPlan,
        props.course.id,
        props.course.studentsNumberMAX,
        props.course.studentsNumber,
        props.course.incompatibleCourses,
        props.course.preparatoryCourse
    ])

    return <>
        <tr style={{
            backgroundColor: lock && !inserted && props.studentLogged !== '' && props.mode === 'edit' ? "#ff000077" : "",
            color: props.mode === 'edit' && inserted && props.studentLogged !== '' ? "#00bb00" : "",
        }}>
            <CoursesData
                course={props.course}
                courses={props.courses}
                setCourses={props.setCourses}
                mode={props.mode}
                studyPlan={props.studyPlan}
                setStudyPlan={props.setStudyPlan}
                open={open} setOpen={setOpen}
                inserted={inserted}
                lock={lock}
                localCredits={props.localCredits}
                setLocalCredits={props.setLocalCredits}
            ></CoursesData>
        </tr>
        {/* EXPAND ROW */}
        {
            open &&
            <tr>
                <td colSpan={"6"}>
                    <Row>
                        <Col>
                            <h6>Preparatory</h6>
                            {props.course.preparatoryCourse !== null ?
                                <>
                                    <div>{props.course.preparatoryCourse} - {props.courses.filter((c) => c.id === props.course.preparatoryCourse)[0].name}</div>
                                </>
                                :
                                <div>-</div>
                            }
                        </Col>
                        <Col>
                            <h6>Incompatible</h6>
                            {props.course.incompatibleCourses.length !== 0 ?
                                <>
                                    {props.course.incompatibleCourses.map((ic) => <div key={ic}>{ic} - {props.courses.filter((c) => c.id === ic)[0].name}</div>)}
                                </>
                                :
                                <div>-</div>
                            }
                        </Col>
                        <Col>
                            {props.mode === 'edit' && lockMsg !== '' && <>
                                <h6>Message lock</h6>
                                <div>{lockMsg}</div>
                            </>}
                        </Col>
                    </Row>
                </td>
            </tr>
        }
    </>
}

function CoursesData(props) {

    return <>
        <td>{props.course.id}</td>
        <td>{props.course.name}</td>
        <td>{props.course.creditsNumber}</td>
        <td>{props.course.studentsNumber}</td>
        <td>{props.course.studentsNumberMAX === null ? '∞' : props.course.studentsNumberMAX}</td>
        <CoursesAction
            course={props.course}
            courses={props.courses}
            setCourses={props.setCourses}
            studyPlan={props.studyPlan}
            setStudyPlan={props.setStudyPlan}
            mode={props.mode}
            open={props.open}
            setOpen={props.setOpen}
            inserted={props.inserted}
            lock={props.lock}
            localCredits={props.localCredits}
            setLocalCredits={props.setLocalCredits}
        ></CoursesAction>
    </>
}

function CoursesAction(props) {

    const handleAdd = (event) => {
        event.preventDefault();
        //ADD COURSE TO STUDY PLAN
        props.courses.filter((c) => c.id === props.course.id)[0].studentsNumber++;
        props.setCourses(() => props.courses);
        props.setStudyPlan(() => [...props.studyPlan, props.course.id]);
        props.setLocalCredits(() => props.localCredits + props.course.creditsNumber);
    }

    const handleExpand = (event) => {
        event.preventDefault();
        //EXPAND INCOMPATIBLE AND PREPARATORY COURSES
        props.setOpen(() => !props.open);
    }

    return <td width={"100rem"} className="text-center ">
        <svg onClick={handleExpand} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-info-circle mx-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        {props.mode === "edit" && !props.inserted && !props.lock &&
            <svg onClick={handleAdd} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle mx-2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
        }
        {props.mode === "edit" && props.lock &&
            <svg onClick={handleExpand} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle mx-2" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
        }
        {props.mode === "edit" && props.inserted &&
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill mx-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
        }
    </td>
}

export { CoursesTable }
