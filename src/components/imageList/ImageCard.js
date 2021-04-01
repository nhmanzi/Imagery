import React from 'react';
import * as types from './../../constants';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from './../../styled-components/main';
import Lines from './../../assets/lines';
import { Draggable } from 'react-beautiful-dnd';
import Trash from '../../assets/trash';
const ImageContainer = styled.div`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:2rem;
  height: 70px;
  margin-bottom: 1.5rem;
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : 'white'};
  width: 250px;
  border-radius: 1rem;
  box-shadow: ${(props) =>
    props.darkMode ? 'none' : '0 4px 10px rgba(0, 0, 252, 0.1)'};
  }
`;
const Profile = styled.div`
  img {
    background: white;
    height: 35px;
    width: 35px;
    border: ${(props) =>
      props.darkMode
        ? '2px solid rgba(255, 255, 250, 0.4)'
        : '2px solid rgba(0, 0, 250, 0.1)'};
    border-radius: 50%;
    object-fit: scale-down;
  }
`;
const Delete = styled.div`
  ${(pros) => theme.flexMixin('row', 'center', 'center')};
  height: 25px;
  width: 25px;
  :hover {
    background: ${(props) =>
      props.darkMode ? 'var(--clr-primary-100)' : 'whitesmoke'};
    border-radius: 50%;
  }
`;

function ImageCard({ src, id, i }) {
  const dispatch = useDispatch();
  const AppTheme = useSelector((state) => state.AppTheme);
  const { darkMode } = AppTheme;
  return (
    <Draggable draggableId={`draggable-${id}`} key={id} index={i}>
      {(provided, snapshot) => (
        <ImageContainer
          darkMode={darkMode}
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            border: snapshot.isDragging ? '2px solid rgb(89, 89, 247)' : 'none'
          }}
        >
          <div {...provided.dragHandleProps}>
            <Lines darkmode={darkMode} />
          </div>
          <Profile darkMode={darkMode}>
            <img src={src} alt='pic' />
          </Profile>

          <Delete
            darkMode={darkMode}
            onClick={() => dispatch({ type: types.REMOVE_POST_REQUEST, id })}
          >
            <Trash darkmode={darkMode} />
          </Delete>
        </ImageContainer>
      )}
    </Draggable>
  );
}

export default ImageCard;
