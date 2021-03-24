import React, { useEffect } from 'react';
import * as types from './../../constants';
import ImageCard from './ImageCard';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Fragment = styled.div`
  // display: grid;
  // grid-template-columns: repeat(2, 1fr);
  // grid-gap: 1rem;
`;
const ImageList = ({ images }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: types.SHOW_POST_REQUEST });
  }, [dispatch]);

  const postList = useSelector((state) => state.postList);
  const { posts } = postList;

  const handleUpdateArray = (param) => {
    const sourceIndex = param.source.index;
    const destinationIndex = param.destination?.index;
    const data = {
      source: sourceIndex,
      destination: destinationIndex
    };
    if (destinationIndex) {
      dispatch({ type: types.UPDATE_POST_ARRAY_REQUEST, data });
    }
  };
  return (
    <DragDropContext onDragEnd={(param) => handleUpdateArray(param)}>
      <Droppable droppableId='droppable-1'>
        {(provided, _) => (
          <Fragment ref={provided.innerRef} {...provided.droppableProps}>
            {posts.map((card, i) => (
              <ImageCard i={i} id={card.id} src={card.src} />
            ))}
            {provided.placeholder}
          </Fragment>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ImageList;
