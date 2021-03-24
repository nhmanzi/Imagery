import React from 'react'
import styled from 'styled-components'
const UserCard= styled.div `
height:2rem;
position:absolute;
bottom:0;
left:0;
width:100%;
background-color: var(--clr-danger-100);
`
export const Footer = (props) => {
    return (
        <UserCard>
         manzi@250gmail
        </UserCard>
    )
}


export default Footer;
