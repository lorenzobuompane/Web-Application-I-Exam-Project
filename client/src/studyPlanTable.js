import { useEffect, useState } from "react"
import { Button, Container, Table, Row, Col, ProgressBar, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import API from "./API"


function StudyPlanTable(props) {

    const navigate = useNavigate();
    // MIN MAX RANGE
    const [MIN, setMIN] = useState('');
    const [MAX, setMAX] = useState('');


    /* 
        Get range of user's SP type, get SP, calculate current credit in SP
    */
    let setStudyPlan = props.setStudyPlan;
    let setLocalCredits = props.setLocalCredits;
    useEffect(() => {
        async function load() {
            let studyPlanList = await API.getStudyPlan();
            setStudyPlan(() => studyPlanList);
            let c = calculateCredits(studyPlanList, props.courses);
            setLocalCredits(() => c);
            let range = await API.getRange();
            setMIN(() => range[props.localType].min);
            setMAX(() => range[props.localType].max);
        }
        load();
    }, [setLocalCredits, setStudyPlan, props.localType, props.courses]);

    /* 
        Go back to previous SP if exist: get SP from db, calculate credits, get user info (user and type), reload courses table
    */
    const handleCancel = async (event) => {
        event.preventDefault();
        let studyPlanList = await API.getStudyPlan();
        props.setStudyPlan(() => studyPlanList);
        let c = calculateCredits(props.studyPlan, props.courses);
        props.setLocalCredits(() => c);
        let user = await API.getUserInfo();
        props.setStudentLogged(() => user);
        props.setLocalType(() => user.type);
        let coursesList = await API.getAllCourses();
        props.setCourses(() => coursesList);
        navigate('/');
    }

    /* 
        Save study plan, use post of put if SP exists or not, reload state from db for consistency
    */
    const handleSave = async (event) => {
        event.preventDefault();
        try {
            if (props.studentLogged.type !== null) {
                await API.putStudyPlan(props.studyPlan, props.localType);
            }
            else {
                await API.postStudyPlan(props.studyPlan, props.localType);
            }

            let studyPlanList = await API.getStudyPlan();
            props.setStudyPlan(() => studyPlanList);
            let c = calculateCredits(props.studyPlan, props.courses);
            props.setLocalCredits(() => c);
            let user = await API.getUserInfo();
            props.setStudentLogged(() => user);
            props.setLocalType(() => user.type);
            let coursesList = await API.getAllCourses();
            props.setCourses(() => coursesList);
            navigate('/');
        } catch (error) {
            let tmp = {
                open: true,
                func: 'Save',
                msg: error.message
            }
            props.setOpenErrorMsg(() => tmp);
        }

    }

    /* 
        Delete study plan, reload state from db for consistency
    */
    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            let studyPlanList = await API.getStudyPlan();
            props.setStudyPlan(() => studyPlanList);
            await API.deleteStudyPlan();
            await API.putType(null);
            for (let c = 0; c < props.studyPlan.length; c++) {
                let se = await API.getNumberOfStudentsEnrolled(props.studyPlan[c]);
                await API.putStudentEnrolled(props.studyPlan[c], se.studEnr);
            }
            setMAX('');
            setMIN('');
            await handleCancel(event);
        } catch (error) {
            let tmp = {
                open: true,
                func: 'Save',
                msg: error.message
            }
            props.setOpenErrorMsg(() => tmp);
        }

    }

    const handleEdit = (event) => {
        event.preventDefault();
        navigate('/edit');
    }


    return <>
        <Container fluid className="d-flex justify-content-center" style={{ height: "2vh" }}>
            <Row style={{ fontSize: "25px", fontWeight: "bold", color: "hsl(178deg 83% 14%)", "--bs-gutter-x": 0 }}>
                MY STUDY PLAN
                <hr />
            </Row>
        </Container>
        <Container fluid style={{ width: "92%", height: "6vh" }} >
            <Row >
                <Col fluid className="d-flex justify-content-start mt-2 mx-2" >
                    <Row >
                        {props.mode === "edit" && <Col >
                            <Badge className="d-inline-flex align-items-center my-2 me-1" pill bg="dark" style={{ height: "2vh", fontSize: "16px" }}>MIN: {MIN}</Badge>
                        </Col>}
                        <Col >
                            <Badge className="d-inline-flex align-items-center my-2 mx-1" pill bg="dark" style={{ height: "2vh", fontSize: "16px" }}>CFU: {props.localCredits}</Badge>
                        </Col>
                        {props.mode === "edit" && <Col >
                            <Badge className="d-inline-flex align-items-center my-2 mx-1" pill bg="dark" style={{ height: "2vh", fontSize: "16px" }}>MAX: {MAX}</Badge>
                        </Col>}

                    </Row>

                </Col>
                {
                    (props.localCredits > MAX || props.localCredits < MIN) &&
                    <Col className="d-flex justify-content-center" style={{ width: "100%" }}>
                        <Row >
                            <ProgressBar className=" mt-3" style={{ width: "100%", height: "2vh", fontSize: "15px", position: "relative", backgroundColor: "transparent" }} animated variant="danger" min={0} max={100} now={100} label={(props.localCredits > MAX ? "Too much credits" : "Not enought credits")} />
                        </Row>
                    </Col>
                }
                <Col className="d-flex justify-content-end my-2 ">
                    {props.mode === 'edit' && <Button variant="primary" size="small" className="mx-3" onClick={handleCancel}>Cancel</Button>}
                    {props.mode === 'edit' && <Button variant="danger" size="small" className="mx-3" onClick={handleDelete}>Delete</Button>}
                    {props.mode === 'edit' && <Button variant="success" size="small" className="ms-3" disabled={(props.localCredits > MAX || props.localCredits < MIN)} onClick={handleSave}>Save</Button>}
                    {props.mode === 'view' && <Button variant="primary" size="small" className="ms-3" onClick={handleEdit}>Edit</Button>}
                </Col>
            </Row>
            <Container fluid className="my-2" style={{ height: "30vh", overflow: "scroll", boxShadow: "0px 0px 15px 0px black" }}>
                <Row >
                    <Table size="sm"  >
                        <thead>
                            <tr>
                                <th width={"100rem"}>Code</th>
                                <th width={"500rem"}>Name</th>
                                <th width={"150rem"}>Credits Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.studyPlan
                                    .sort((a, b) => props.courses.filter((c) => c.id === a)[0].name > props.courses.filter((c) => c.id === b)[0].name ? 1 : -1)
                                    .map((c) =>
                                        <StudyPlanRow
                                            key={c}
                                            courseSelect={c}
                                            courses={props.courses}
                                            setCourses={props.setCourses}
                                            studyPlan={props.studyPlan}
                                            setStudyPlan={props.setStudyPlan}
                                            mode={props.mode}
                                            localCredits={props.localCredits}
                                            setLocalCredits={props.setLocalCredits}
                                        ></StudyPlanRow>)
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Container>

    </>

}

function StudyPlanRow(props) {
    const [needPrepatatory, setNeedPreparatory] = useState(false);

    useEffect(() => {
        let following = props.courses.filter((c) => c.id === props.courseSelect).map((c) => c.followingCourse);
        /* CHECK IF IS PREPARATORY */
        if (props.studyPlan.includes(following[0])) {
            setNeedPreparatory(() => true);
        }
        else {
            setNeedPreparatory(() => false);
        }
    }, [props.studyPlan, props.courseSelect, props.courses])

    return <tr>
        <StudyPlanData
            courseSelect={props.courseSelect}
            courses={props.courses}
            setCourses={props.setCourses}
            studyPlan={props.studyPlan}
            setStudyPlan={props.setStudyPlan}
            needPrepatatory={needPrepatatory}
            mode={props.mode}
            localCredits={props.localCredits}
            setLocalCredits={props.setLocalCredits}
        ></StudyPlanData>
    </tr>
}

function StudyPlanData(props) {

    let credits = props.courses.filter((c) => c.id === props.courseSelect).map((c) => c.creditsNumber);
    return <>
        <td>{props.courseSelect}</td>
        <td>{props.courses.filter((c) => c.id === props.courseSelect).map((c) => c.name)}</td>
        <td>{props.courses.filter((c) => c.id === props.courseSelect).map((c) => c.creditsNumber)}</td>
        <StudyPlanAction
            courseSelect={props.courseSelect}
            courses={props.courses}
            setCourses={props.setCourses}
            credits={credits}
            studyPlan={props.studyPlan}
            setStudyPlan={props.setStudyPlan}
            needPrepatatory={props.needPrepatatory}
            mode={props.mode}
            localCredits={props.localCredits}
            setLocalCredits={props.setLocalCredits}
        ></StudyPlanAction>
    </>
}

function StudyPlanAction(props) {

    /* local number of students enrolled to the course -1 for MAX students check also in client-side */
    const handleRemove = (event) => {
        event.preventDefault();
        //REMOVE COURSE FROM STUDY PLAN
        props.courses.filter((c) => c.id === props.courseSelect)[0].studentsNumber--;
        props.setCourses(() => props.courses);
        props.setStudyPlan(() => [...props.studyPlan.filter((c) => c !== props.courseSelect)]);
        props.setLocalCredits(() => props.localCredits - props.credits);
    }

    return <td>
        {props.mode === 'edit' && !props.needPrepatatory &&
            <div className="text-end me-4 pe-1">
                <svg onClick={handleRemove} style={{ cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-x-circle-fill mx-3" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                </svg>
            </div>
        }
        {props.mode === 'edit' && props.needPrepatatory &&
            <div className="text-end me-5" style={{ color: "red" }}>Delete before: {props.courses.filter((c) => c.id === props.courseSelect).map((c) => c.followingCourse)}</div>
        }


    </td>
}

export { StudyPlanTable }

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
