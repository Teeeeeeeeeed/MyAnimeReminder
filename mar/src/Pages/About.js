import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Layout} from '../Layout';
import { Helmet } from 'react-helmet';
import Navi from '../Layout/Navi';
import Footer from '../Layout/Footer';

const About=()=>
    <Layout>
        <Helmet><title>MAR - About</title></Helmet>
        <div className= 'About'>
            <Navi/>
            <Container className='About-content'>    
                <Row>
                    <Col className='text About-heading'>
                    <h1>About this page</h1>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Row className='text'>
                    <Col md='3' sm='12'>
                    With the entertainment industry becoming bigger than ever before, 
                    its becoming harder and harder to remember and keep up 
                    with what is coming out and when.
                    </Col>
                </Row>
                <br></br>
                <Row className='text'>
                    <Col md='3' sm='12'>
                    So this application was built 
                    so that you don't have to use any brain power to keep track of what day the next episode
                    is coming out!
                    </Col>
                </Row>
                <br></br>
                <Row className='text'>
                    <Col md='3' sm='12'>
                    In the calender directory you can search up the show that you're following, add it to your calender and then forget 
                    about the rest! All you have to do is come back everynow and then to check whats next! If you've got the post seasonal 
                    blues after watching the last episode of the season, head over to the trending page and you can discover the new shows that's being watched by everyone else!
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    </Layout>;

export default About;

