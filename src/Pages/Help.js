import React from 'react';
import { motion } from 'framer-motion';
import {Layout} from '../Layout';
import {Helmet} from 'react-helmet';
import Navi from '../Layout/Navi';
import Footer from '../Layout/Footer';

const Help=()=>
<Layout>
    <Helmet><title>MAR - Help</title></Helmet>
    <div className='Help'>
        <Navi/>
        <Footer/>
    </div>
</Layout>;

export default Help;
