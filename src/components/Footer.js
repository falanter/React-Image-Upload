import React from 'react';
import styled from 'styled-components';

const Footer=styled.footer`
  padding:10px 100px;
  text-align:center;
  font-size:12px;
  color:#aaa;
  background:#F5F5F5;
`;

function Component() {
  return (
    <Footer>
        <a target="_blank" rel="noreferrer" href="https://github.com/falanter/React-Image-Upload">Github</a>
    </Footer>
  );
}

export default Component;