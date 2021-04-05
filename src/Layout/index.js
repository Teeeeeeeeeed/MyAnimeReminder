import React from 'react';
import '../App.css';
import Navi from './Navi.jsx';
import Footer from './Footer.jsx';

const Layout = (props) => (
    <div>
        {props.children}
    </div>
);

export { Layout, Navi, Footer };