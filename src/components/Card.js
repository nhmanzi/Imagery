import React, { useState, useCallback } from 'react';
import * as types from './../constants';
import { useDispatch } from 'react-redux';
import ImageList from './../components/imageList';
import folder from './../assets/folder.svg';
import styled from 'styled-components';
import theme from '../styled-components/main';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { set } from 'js-cookie';
// ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
const Container = styled.div`
  height: calc(100vh-3rem);
  padding: 2.5rem;
  margin-top: 0;
  width: 100%;
  background: #f5f8ff;
`;
const UploadCard = styled.div`
  ${(pros) => theme.flexMixin('column', 'center', 'center')}
  padding:.5rem 3rem;
  height: 18rem;
  position: relative;
  margin: 0.5rem;
  background: white;
  width: 100%;
  border-radius: 0.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 252, 0.1);
`;
const Tittle = styled.h3`
  font-weight: black;
  color: #111;
`;
const DropBox = styled.div`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  height: 100%;
  width: 100%;
  margin-bottom: 0.5em;
  border: 2px dashed rgba(0, 0, 255, 0.2);
  background: #fcfdff;
  border-radius: 1rem;
  div {
    img {
      height: 30px;
      width: 30px;
    }
  }
`;
const Label = styled.label`
  ${(pros) => theme.flexMixin('column', 'space-around', 'center')}
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: scale-down;
`;
const AvatarHolder = styled.div`
  width: 100%;
  height: 100%;
`;
const UploadWrapper = styled.div`
  ${(pros) => theme.flexMixin('row', 'center', 'flex-start')}
  width: 100%;
  height: 25%;
`;
const Placeholder = styled.div`
  ${(pros) => theme.flexMixin('column', 'center', 'center')}
`;

const Button = styled.button`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:.5rem;
  height: 2rem;
  color: var(--clr-white-400);
  min-width: 7em;
  background: var(--clr-primary-100);
  :hover {
    background: var(--clr-primary-400);
  }
`;
const Heading = styled.div`
  ${(pros) => theme.flexMixin('row', 'flex-start', 'center')}
  padding:1em 0;
  height: 3.5rem;
  width: 100%;
`;
const Footer = styled.div`
  ${(pros) => theme.flexMixin('row', 'flex-end', 'center')}
  padding:1em 0;
  height: 3.5rem;
  width: 100%;
`;
export const Card = (props) => {
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        image.push({ buffer: binaryStr });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  console.log('=>>>>>>>', image);

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: '50px' }} alt='haha' />
      </div>
    </div>
  ));

  const handleAdd = () => {
    image.map((e) =>
      dispatch({
        type: types.ADD_POST_REQUEST,
        data: {
          id: uuidv4(),
          src: e.buffer
        }
      })
    );

    // setFiles([]);
    // setImage([]);
  };
  return (
    <Container>
      <UploadWrapper>
        <UploadCard>
          <Heading>
            <Tittle>Image Uploader</Tittle>
          </Heading>
          <DropBox {...getRootProps()}>
            <input {...getInputProps()} />
            {images}
            {files.length < 1 && (
              <Placeholder>
                <img src={folder} draggable='true' alt='placeholder' />
                <div>click or drag for upload</div>
              </Placeholder>
            )}
          </DropBox>
          <Footer>
            <Button onClick={handleAdd}>Import</Button>
          </Footer>
        </UploadCard>
      </UploadWrapper>
      <AvatarHolder>
        <ImageList />
      </AvatarHolder>
    </Container>
  );
};

export default Card;
