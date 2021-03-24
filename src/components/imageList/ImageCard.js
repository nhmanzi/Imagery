import React from 'react';
import styled from 'styled-components';
import theme from './../../styled-components/main';
import { Draggable } from 'react-beautiful-dnd';
const ImageContainer = styled.div`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:2rem;
  height: 100px;
  margin-bottom: 1.5rem;
  background: white;
  width: 250px;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 252, 0.1);
  div {
    img {
      background: rgb(70, 168, 248);
      height: 50px;
      width: 50px;
      border-radius: 50%;
      object-fit: scale-down;
      box-shadow: inset 5px 5px 10px rgb(70, 168, 248);
    }
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
function ImageCard({ name, src, username, role, id, i }) {
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
            <div
              style={{ height: '30px', width: '30px' }}
              {...provided.dragHandleProps}
            >
              #
            </div>
          </div>
          <div>
            <img src={src} alt='pic' />
          </div>
          <div>
            <strong>{name}</strong>
            <p>{role}</p>
            <button>delete</button>
          </div>
        </ImageContainer>
      )}
    </Draggable>
  );
}

export default ImageCard;
