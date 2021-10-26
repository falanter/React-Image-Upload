import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <>
      <h1>About</h1>
      <Link to="/">首页</Link>
      <div style={{color:'green'}}><span>b</span></div>
    </>
  );
}

export default About;