import React, { useState, useCallback } from 'react';
import * as types from './../constants';
import { useDispatch } from 'react-redux';
import ImageList from './../components/imageList';
import folder from './../assets/folder.svg';
import styled from 'styled-components';
import theme from '../styled-components/main';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import close from './../assets/close.svg';
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
  position: relative;
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
  border: none;
  border-radius: 5px;
  color: var(--clr-white-400);
  min-width: 7em;
  background: #007bff;
  :hover {
    background: var(--clr-primary-400);
  }
`;
const FormButton = styled.button`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:1.5rem 1rem;
  height: 1rem;
  border: none;
  font-size: 1.5rem;
  margin: 2rem auto;
  // border-radius: 5px;
  min-width: 50%;
  background: white;
  :hover {
    background: var(--clr-primary-100);
    color: var(--clr-white-400);
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
const ImageWrapper = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, 50px);
  width: 100%;
  padding: 2rem;
`;
const DropItem = styled.div`
  ${(pros) => theme.flexMixin('row', 'center', 'center')}
  border-radius:10px;
  width: 70px;
  height: 70px;
  box-shadow: 0 4px 10px rgba(0, 0, 252, 0.1);
  img {
    height: 45px;
    width: 45px;
    object-fit: scale-down;
  }
`;
const Close = styled.img`
  position: absolute;
  top: 20px;
  right: 30px;
  height: 15px;
  width: 15px;
  :hover {
    border-radius: 50%;
    background: whitesmoke;
  }
`;
export const Card = (props) => {
  const [showform, setShowform] = useState(true);
  const [image] = useState([]);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const onDrop = useCallback(
    (acceptedFiles) => {
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
    },
    [image]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  console.log('=>>>>>>>', files);

  const images = files.map((file) => (
    <DropItem key={file.name}>
      <img src={file.preview} style={{ width: '50px' }} alt='haha' />
    </DropItem>
  ));

  const handleAdd = () => {
    if (image) {
      image.map((e) =>
        dispatch({
          type: types.ADD_POST_REQUEST,
          data: {
            id: uuidv4(),
            src: e.buffer
          }
        })
      );
    }

    // setFiles([]);
    // setImage([]);
  };
  return (
    <Container>
      {showform && (
        <UploadWrapper>
          <UploadCard>
            <Close src={close} onClick={() => setShowform(false)} />
            <Heading>
              <Tittle>IMAGE UPLOADER</Tittle>
            </Heading>
            <DropBox {...getRootProps()}>
              <input {...getInputProps()} />
              {files.length > 0 && <ImageWrapper> {images}</ImageWrapper>}
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
      )}
      {!showform && (
        <FormButton onClick={() => setShowform(true)}>
          UPLOAD PICTURES
        </FormButton>
      )}
      <AvatarHolder>
        <ImageList />
      </AvatarHolder>
    </Container>
  );
};

export default Card;
