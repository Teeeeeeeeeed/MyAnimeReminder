import React, { useContext, useState } from 'react';
import {Layout} from '../Layout';
import {Form,Row,Col,Container, Button} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import Navi from '../Layout/Navi';
import Footer from '../Layout/Footer';
import {MyContext} from '../MyContext';
import Search from '../Components/Search.jsx';


function Profile(){
    const {loginUser,isLoggedIn,registerUser,logoutUser,rootState} = useContext(MyContext);
    const {isAuth,theUser,showLogin} = rootState;
    const initialState = {
        userInfo:{
            email:'',
            password:'',
            name:''
        },
        errorMsg:'',
        successMsg:''
    }

    const [state,setState] = useState(initialState);

    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        })
    }
    //Submitting Login Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token){
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken',data.token);
            window.location.pathname='/Login'
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            })
        }
    }
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className='error-msg'>{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div classNAme='success-msg'>{state.successMsg}</div>;
    }
    const submitRegisterForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            })
        }
        else{
            setState({      
                ...state,
                successMsg:'',
                errorMsg:data.message
            })
            console.log(data.message)
        }
    }
    if (isAuth){
        return(
            <Layout>
                <div className='Login Profile'>
                    <Navi/>
                <Helmet><title>MAR - Your Profile</title></Helmet>
                    <Container>
                        <h1>Welcome to your Profile page {theUser.name}</h1>
                        <div className="_email"><span>{theUser.email}</span></div>
                        <button onClick={logoutUser}>Logout</button>
                        <Search userInfo={theUser.email}/>
                    </Container>
                    
                <Footer/>
                </div>
            </Layout>
        )
    }
    else{
        return(
            <Layout>
                <Helmet><title>MAR - Login or Register</title></Helmet>
                <div className='Login'>
                    <Navi/>
                    <Container className='Login-content text '>
                        <Row>
                            <h1>Login or Register to keep track of your reminders!</h1>
                        </Row>
                        <Row>
                                <Col md='4' sm='12' className='login-section'>
                                    <h1>Login</h1>
                                    <Form className='row text' onSubmit={submitForm} >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name='email' 
                                        type='email'
                                        placeholder='Enter Email'
                                        onChange={onChangeValue}></Form.Control>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        name='password'
                                        type='password'
                                        placeholder='Enter Password'
                                        onChange={onChangeValue}
                                        ></Form.Control>
                                        
                                        <Button variant='light' type='submit'> Login</Button>
                                    </Form>
                                </Col>
                        </Row>
                        <Row >
                            <Col md='4' sm='12' className='register-section'>
                                <div>
                                    <h1>Register</h1>
                                    <Form className='row text' onSubmit={submitRegisterForm} >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='name' 
                                        name='name'
                                        placeholder='Enter Name'
                                        onChange={onChangeValue}></Form.Control>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' 
                                        name='email'
                                        placeholder='Enter Email'
                                        onChange={onChangeValue}></Form.Control>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password'
                                        name='password'
                                        placeholder='Enter Password'
                                        onChange={onChangeValue}></Form.Control>
                                        
                                        <Button variant='light' type='submit'>Register now</Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Footer/>
                </div>
            </Layout>
        )
    }

}
export default Profile;
