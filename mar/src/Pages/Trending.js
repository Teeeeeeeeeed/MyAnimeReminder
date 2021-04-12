import React from 'react';
import '../App.css';
import {Layout} from '../Layout';
import {Helmet} from 'react-helmet';
import Navi from '../Layout/Navi';
import { Container,Row,Col } from 'react-bootstrap';
import TrendingCards from '../Components/TrendingCards';
import Footer from '../Layout/Footer';

const Trending=()=>
<Layout>
    <Helmet><title>MAR - Trending</title></Helmet>
    <div className='Trending'>
        <Navi/>
        <Container>
            <h1 className='text TrendingTitle'>Trending Page</h1>
            <TrendingCards />
        </Container>
    </div>
    <Footer/>
</Layout>;

export default Trending;
