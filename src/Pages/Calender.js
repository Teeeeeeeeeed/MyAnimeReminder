import React from 'react';
import CalenderApp from '../Components/CalenderApp.jsx';
import { Layout } from '../Layout';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Navi from '../Layout/Navi.jsx';
import Footer from '../Layout/Footer';

const Calender=()=>
<Layout>
    <Helmet><title>MAR - Calender</title></Helmet>
    <div className='Calender'>
        <Navi/>
        <div class="App">
            <header>
                <h1 className='text'>Your Calender</h1>
            </header>
            <main>
                <CalenderApp />
            </main>
        </div>
        <Footer/>
    </div>
</Layout>;

export default Calender;
