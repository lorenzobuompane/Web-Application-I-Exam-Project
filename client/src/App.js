import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Form, Container, Row, Col, Button, OverlayTrigger, Popover, ListGroup, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import API from './API';
import { LoginForm } from './loginForm';
import { CoursesTable } from './coursesTable';
import { StudyPlanTable } from './studyPlanTable';
import { AlertErrorMsg } from './alertErrorMsg';

function App() {

  /* store all courses */
  const [courses, setCourses] = useState([]);
  /* store local study plan */
  const [studyPlan, setStudyPlan] = useState([]);
  /* logged in student */
  const [studentLogged, setStudentLogged] = useState('');
  /* type of studyplan */
  const [localType, setLocalType] = useState('');
  /* variable #credits */
  const [localCredits, setLocalCredits] = useState(0);
  /* variable for display ErrorMsg */
  const [openErrorMsg, setOpenErrorMsg] = useState(
    {
      open: false,
      func: '',
      msg: ''
    });

  /* first load */
  useEffect(() => {
    async function load() {
      let coursesList = await API.getAllCourses();
      for (let i = 0; i < coursesList.length; i++) {
        let se = await API.getNumberOfStudentsEnrolled(coursesList[i].id);
        await API.putStudentEnrolled(coursesList[i].id, se.studEnr);
      }
      coursesList = await API.getAllCourses();
      setCourses(() => coursesList);
    }
    load();
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        {/* VIEW MODE */}
        <Route path='/' element={
          <>
            <NavigationBar
              studentLogged={studentLogged}
              setStudentLogged={setStudentLogged}
              setStudyPlan={setStudyPlan}
              setLocalCredits={setLocalCredits}
              setLocalType={setLocalType}
            ></NavigationBar>

            <CoursesTable
              studentLogged={studentLogged}
              studyPlan={studyPlan}
              courses={courses}
              setCourses={setCourses}
              mode="view"
            ></CoursesTable>

            {
              openErrorMsg.open === true &&
              <AlertErrorMsg
                openErrorMsg={openErrorMsg}
                setOpenErrorMsg={setOpenErrorMsg}
              ></AlertErrorMsg>
            }

            {
              studentLogged === '' &&
              <Container
                fluid
                className='d-flex justify-content-center'
              >
                Create or modify study plan after log in
              </Container>
            }

            {
              studentLogged !== '' && studentLogged.type === null &&
              <SelectTypePlan
                localType={localType}
                setLocalType={setLocalType}
                studentLogged={studentLogged}
              ></SelectTypePlan>
            }

            {
              studentLogged !== '' && studentLogged.type !== null &&
              <StudyPlanTable
                localType={localType}
                setLocalType={setLocalType}
                mode="view"
                courses={courses}
                setCourses={setCourses}
                studyPlan={studyPlan}
                setStudyPlan={setStudyPlan}
                studentLogged={studentLogged}
                setStudentLogged={setStudentLogged}
                localCredits={localCredits}
                setLocalCredits={setLocalCredits}
                openErrorMsg={openErrorMsg}
                setOpenErrorMsg={setOpenErrorMsg}
              ></StudyPlanTable>
            }

          </>
        } />

        {/* EDIT MODE */}
        {
          studentLogged !== '' &&
          <Route path='/edit' element={
            <>
              <NavigationBar
                studentLogged={studentLogged}
                setStudentLogged={setStudentLogged}
                setStudyPlan={setStudyPlan}
                setLocalCredits={setLocalCredits}
                setLocalType={setLocalType}
              ></NavigationBar>

              <CoursesTable
                studentLogged={studentLogged}
                courses={courses}
                setCourses={setCourses}
                mode="edit"
                studyPlan={studyPlan}
                setStudyPlan={setStudyPlan}
                localCredits={localCredits}
                setLocalCredits={setLocalCredits}
              ></CoursesTable>

              {
                openErrorMsg.open === true &&
                <AlertErrorMsg
                  openErrorMsg={openErrorMsg}
                  setOpenErrorMsg={setOpenErrorMsg}
                ></AlertErrorMsg>
              }

              <StudyPlanTable
                localType={localType}
                setLocalType={setLocalType}
                mode="edit"
                courses={courses}
                setCourses={setCourses}
                studyPlan={studyPlan}
                setStudyPlan={setStudyPlan}
                studentLogged={studentLogged}
                setStudentLogged={setStudentLogged}
                localCredits={localCredits}
                setLocalCredits={setLocalCredits}
                openErrorMsg={openErrorMsg}
                setOpenErrorMsg={setOpenErrorMsg}
              ></StudyPlanTable>
            </>
          } />
        }

        {/* LOGIN */}
        <Route path='/login' element={
          studentLogged !== ''
            ?
            <Navigate to="/" replace={true} />
            :
            <LoginForm
              setStudentLogged={setStudentLogged}
              setLocalType={setLocalType}
            ></LoginForm>
        } />

        {/* ERROR */}
        <Route path='*' element={
          <PageNotFound />
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

function NavigationBar(props) {
  const navigate = useNavigate();

  /* 
  Logout and set state to initial value
  */
  const handleLogout = async (event) => {
    event.preventDefault();
    await API.postStudentLOGOUT();
    props.setLocalCredits(() => 0);
    props.setLocalType(() => '');
    props.setStudentLogged(() => '');
    props.setStudyPlan(() => []);
    navigate('/');
  }

  return <>
    <Navbar variant="dark" style={{ height: "5vh", backgroundColor: "hsl(178deg 83% 14%)" }} >
      <Container fluid className='d-flex' style={{ width: "92%" }}>
        <Navbar.Brand as={Link} to='/'  >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-mortarboard mx-2" viewBox="0 0 16 16">
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
          </svg>
          Study Plan
        </Navbar.Brand>
        {
          props.studentLogged === ''
            ?
            /* USER LOGGED */
            <Navbar.Text as={Link} to='/login' style={{ color: "white" }}>
              Login
              <svg className='bi bi-people-circle mx-2' width="30" height="30" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
              </svg>
            </Navbar.Text>
            :
            /* USER NOT LOGGED */
            <Navbar.Text style={{ color: "white" }}>
              Welcome {props.studentLogged.name}
              <OverlayTrigger trigger="click" key="bottom" placement='bottom' rootClose overlay={
                <Popover id={'user information'}>
                  <Popover.Header as="h3">{props.studentLogged.name} {props.studentLogged.surname}</Popover.Header>
                  <Popover.Body>
                    <>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>ID: {props.studentLogged.id}</ListGroup.Item>
                        <ListGroup.Item>EMAIL: {props.studentLogged.email}</ListGroup.Item>
                      </ListGroup>
                    </>
                  </Popover.Body>
                </Popover>
              }>
                <svg className='bi bi-people-circle mx-2' width="30" height="30" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z" />
                  <path fillRule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clipRule="evenodd" />
                </svg>
              </OverlayTrigger>

              <svg onClick={handleLogout} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#ff0000cc" className="bi bi-box-arrow-left mx-1 " viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
              </svg>

            </Navbar.Text>
        }
      </Container>
    </Navbar>
  </>
}

function SelectTypePlan(props) {

  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  /* 
    Get all range and get user type (null)
  */
  let setLocalType = props.setLocalType;
  useEffect(() => {
    async function load() {
      let ts = await API.getRange();
      setTypes(() => ts);
      setLocalType(() => props.studentLogged.type);
    }
    load();
  }, [props.studentLogged.type, setLocalType]);

  /* 
    Navigate to edit page after selection of type
  */
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/edit');
  }

  return <>
    <Container className="justify-content-md-center" style={{ 'marginTop': "1rem" }} >
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Insert the type of study plan:</Form.Label>
          </Col>
          {
            types.map((type) => {
              return <Col key={type.id}>
                <Form.Check
                  inline
                  checked={props.localType === type.id ? true : false}
                  name="type"
                  type="radio"
                  id={type.name}
                  label={type.name}
                  onChange={() => props.setLocalType(() => type.id)}
                />
              </Col>
            })
          }
          <Button
            variant="secondary"
            type="submit"
            disabled={props.localType === '' || props.localType === null ? true : false}>
            Create new study plan
          </Button>
        </Row>
      </Form>

    </Container>
  </>
}

function PageNotFound() {

  const navigate = useNavigate();

  return <>
    <Card
      bg="danger"
      text='light'
      className='mt-5 mx-auto text-center'
      style={{ width: '80vh', height: '30vh', boxShadow: "0px 0px 15px 0px black" }}>
      <Card.Header><h1> Study Plan</h1></Card.Header>
      <Card.Body>
        <Card.Title> Error 404 </Card.Title>
        <Card.Text>
          Page not found
        </Card.Text>
        <Button className='mt-4' variant='light' onClick={() => navigate('/')}>Home Page</Button>
      </Card.Body>

    </Card>
  </>
}
