import React from 'react';
import styled from 'styled-components';
import SwitchButton from './switch';
import { useSelector } from 'react-redux';
const Headerstyle = styled.div`
  ${(props) => props.theme.flexMixin('row', 'space-between', 'center')}
  height:3rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0.75rem 1rem;
  width: 100%;
  background: ${(props) =>
    props.darkmode ? 'var(--clr-darkblue-200)' : '#f5f8ff'};
  box-shadow: ${(props) =>
    props.darkmode ? 'none !important ' : ' 0 2px 8px rgba(0, 0, 255, 0.2)'};
`;
const Logo = styled.div`
  width: 100px;
  height: auto;
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 900;
  color: ${(props) =>
    props.darkmode ? 'var(--clr-white-400)' : 'var(--clr-darkblue-400)'};
`;
const Mode = styled.div`
  height: auto;
`;

export const Header = (props) => {
  const AppTheme = useSelector((state) => state.AppTheme);
  const { darkMode } = AppTheme;
  return (
    <Headerstyle darkmode={darkMode}>
      <Logo>
        <Title darkmode={darkMode}>IMAGERY</Title>
      </Logo>
      <Mode>
        <SwitchButton />
      </Mode>
    </Headerstyle>
  );
};

export default Header;
