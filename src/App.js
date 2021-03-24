
import React from  'react'
import './App.scss';
import styled from 'styled-components';
import Card from './components/Card'
import Header  from './components/Header'
// import Footer  from './components/Footer'
const Container = styled.body`
height:100vh;
padding:1rem;
position:relative;
width:100%;
background:#f5f8ff;
`
const App=()=> {
  return (
    <Container >
      <Header/>
      <Card/>
      {/* <Footer/> */}
    </Container>
  );
}

export default App;
