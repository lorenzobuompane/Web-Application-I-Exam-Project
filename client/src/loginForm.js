import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert, Row, Container } from "react-bootstrap";

import API from './API';

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    /* 
        Set user logged if login is ok, otherwise set error message
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await API.postStudentLOGIN(username, password);
        if (response.error !== undefined) {
            setErrorMessage(response.error);
            props.setStudentLogged(() => '');
        }
        else {
            props.setStudentLogged(() => response);
            props.setLocalType(() => response.type);
            navigate('/');
        }
    }

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <Container fluid>
            <Card bg='light' text="dark" className='mt-5 mx-auto' style={{ width: '55vh', boxShadow: "0px 0px 15px 0px black" }}>
                <Card.Header onClick={handleBack} className="text-center" style={{ backgroundColor: "hsl(178deg 83% 14%)", color: "white", cursor: "pointer" }}>
                    <Row className="mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className='mx-3' width="45" height="45" fill="currentColor" class="bi bi-mortarboard mx-2" viewBox="0 0 16 16">
                            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
                            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
                        </svg>
                        <h2>Study Plan</h2>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Card.Title className="m-1 mb-3">Login</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='username' className="m-1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                        </Form.Group>

                        <Form.Group controlId='password' className="m-1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={8} />
                        </Form.Group>

                        <Button type="submit" variant="dark" className="m-1">Login</Button>
                        <Button onClick={handleBack} variant="danger" className="m-1">Back</Button>
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                    </Form>
                </Card.Body>

            </Card>
        </Container>
    );
}

export { LoginForm }