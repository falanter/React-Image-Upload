import React from 'react';
import { Link } from 'react-router-dom';
// import './Home.scss';

function Home() {
  return (
    <>
        <h1>Home</h1>
        <Link to="/about">关于</Link>
        <div class="home"><span class="a">a</span></div>
    </>
  );
}

export default Home;