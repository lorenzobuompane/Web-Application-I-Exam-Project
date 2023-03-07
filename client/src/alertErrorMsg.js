import { Alert, Container } from "react-bootstrap"

function AlertErrorMsg(props) {
    /* 
        props.function > triggered function
        props.message > error description
    */

    const handleClose = () => {
        let tmp = {
            open: false,
            func: '',
            msg: ''
        }
        props.setOpenErrorMsg(() => tmp);
    }
    return <Container className="my-2">
        <Alert variant="danger" onClose={handleClose} dismissible >
            <Alert.Heading>Error during {props.openErrorMsg.func}</Alert.Heading>
            <p>
                {props.openErrorMsg.msg}
            </p>
        </Alert>
    </Container>
}

export { AlertErrorMsg }