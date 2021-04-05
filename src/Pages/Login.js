import React from 'react';
import {Layout} from '../Layout';
import {Form,Row,Col,Container} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import Navi from '../Layout/Navi';
import Footer from '../Layout/Footer';

const Login=()=>
<Layout>
    <Helmet><title>MAR - Login or Register</title></Helmet>
    <div className='Login'>
        <Navi/>
        <Container className='Login-content text '>
            <Row>
                <h1>Login or Register to keep track of your reminders!</h1>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Row>
                <div>
                    <Col md='4' sm='12'>
                        <h1>Login</h1>
                        <Form className='row text'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type='text' placeholder='Enter Username'></Form.Control>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter Email'></Form.Control>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Enter Password'></Form.Control>
                        </Form>
                    </Col>
                </div>
            </Row>
            <br></br>
            <br></br>
            <br></br>
            <Row >
                <Col md='4' sm='12'>
                    <div>
                        <h1>Register</h1>
                        <Form className='row text'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type='text' placeholder='Enter Username'></Form.Control>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' placeholder='Enter Email'></Form.Control>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Enter Password'></Form.Control>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type='password' placeholder='Confirm Your Password'></Form.Control>
                            </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </div>
</Layout>;

export default Login;
