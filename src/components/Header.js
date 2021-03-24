import React from 'react';
import styled from 'styled-components';
const Headerstyle = styled.div`
  ${(props) => props.theme.flexMixin('row', 'space-between', 'center')}
  height:3rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 0.75rem;
  width: 100%;
  background: #f5f8ff;
  box-shadow: 0 2px 8px rgba(0, 0, 255, 0.2);
`;
const Logo = styled.div`
  width: 100px;
  height: auto;
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 900;
  color: var(--clr-darkblue-200);
`;
const Mode = styled.div`
  background: var(--clr-white-100);
  height: auto;
`;
const Check = styled.button`
white-space: nowrap;
padding:4px
height:auto;
padding :5px;
`;
export const Header = (props) => {
  return (
    <Headerstyle>
      <Logo>
        <Title>IMAGERY</Title>
      </Logo>
      <Mode>
        <Check>click me</Check>
      </Mode>
    </Headerstyle>
  );
};

export default Header;
