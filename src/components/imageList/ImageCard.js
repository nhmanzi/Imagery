import React from 'react';
import * as types from './../../constants';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from './../../styled-components/main';
import trash from './../../assets/trash.svg';
import lines from './../../assets/lines.svg';
import { Draggable } from 'react-beautiful-dnd';
const ImageContainer = styled.div`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:2rem;
  height: 70px;
  margin-bottom: 1.5rem;
  background: white;
  width: 250px;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 252, 0.1);
  div {
    strong {
      font-sise: 1.5rem;
    }
    p {
      font-sise: 1.1rem;
    }
    small {
      opacity: 0.6;
      font-sise: 0.5rem;
    }
  }
`;
const Profile = styled.div`
  img {
    background: white;
    height: 35px;
    width: 35px;
    border: 2px solid rgba(0, 0, 250, 0.1);
    border-radius: 50%;
    object-fit: scale-down;
  }
`;
const Delete = styled.div`
  ${(pros) => theme.flexMixin('row', 'center', 'center')}
  height: 25px;
  width: 25px;
  :hover {
    background: whitesmoke;
    border-radius: 50%;
  }
`;

function ImageCard({ src, id, i }) {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={`draggable-${id}`} key={id} index={i}>
      {(provided, snapshot) => (
        <ImageContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            border: snapshot.isDragging ? '2px solid rgb(89, 89, 247)' : 'none'
          }}
        >
          <div>
            <img
              src={lines}
              style={{ height: '15px', width: '15px' }}
              {...provided.dragHandleProps}
              alt='menu'
            />
          </div>
          <Profile>
            <img src={src} alt='pic' />
          </Profile>

          <Delete
            onClick={() => dispatch({ type: types.REMOVE_POST_REQUEST, id })}
          >
            <img
              src={trash}
              style={{ height: '15px', width: '15px' }}
              alt='trash'
            />
          </Delete>
        </ImageContainer>
      )}
    </Draggable>
  );
}

export default ImageCard;
