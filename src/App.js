import React from 'react';
import './App.scss';
import styled from 'styled-components';
import Card from './components/Card';
import Header from './components/Header';
import { useSelector } from 'react-redux';

const Container = styled.body`
  height: 200vh;
  padding: 2rem 0rem;
  position: relative;
  width: 100%;
  background: ${(props) =>
    props.darkmode ? 'var(--clr-darkblue-400)' : '#f5f8ff'};
`;
const App = () => {
  const AppTheme = useSelector((state) => state.AppTheme);
  const { darkMode } = AppTheme;
  return (
    <Container darkmode={darkMode}>
      <Header />
      <Card />
      {/* <Footer/> */}
    </Container>
  );
};

export default App;
