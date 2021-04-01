import React, { useState, useCallback } from 'react';
import * as types from './../constants';
import { useDispatch, useSelector } from 'react-redux';
import ImageList from './../components/imageList';
import folder from './../assets/folder.svg';
import styled from 'styled-components';
import theme from '../styled-components/main';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import Close from './../assets/close';
// ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
const Container = styled.div`
  height: auto;
  padding: 2.5rem;
  margin-top: 0;
  width: 100%;
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-400)' : '#f5f8ff'};
  @media (max-width: 800px) {
    margin-top: 4rem;
    padding: 0.5rem;
  }
`;
const UploadCard = styled.div`
  ${(pros) => theme.flexMixin('column', 'center', 'center')}
  padding:.5rem 3rem;
  height: 18rem;
  position: relative;
  margin: 0.5rem;
  position: relative;
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : '#fcfdff'};
  width: 100%;
  border-radius: 0.4rem;
  box-shadow: ${(props) =>
    props.darkMode ? 'none !important' : '0 4px 10px rgba(0, 0, 252, 0.1)'};
  @media (max-width: 800px) {
    padding: 0.5rem;
    margin: 0;
    height: auto;
  }
`;
const Tittle = styled.h3`
  font-weight: black;
  color: ${(props) => (props.darkMode ? 'var(--clr-white-300)' : '#111')};
`;
const DropBox = styled.div`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  height: 100%;
  width: 100%;
  margin-bottom: 0.5em;
  border: ${(props) =>
    props.darkMode
      ? '2px dashed rgba(255, 255, 255, 0.5)'
      : '2px dashed rgba(0, 0, 255, 0.2)'};
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : '#fcfdff'};
  border-radius: 1rem;
  div {
    img {
      height: 30px;
      width: 30px;
    }
  }
  @media (max-width: 800px) {
    height: 100px;
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
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-400)' : '#f5f8ff'};
  @media (max-width: 800px) {
    margin-bottom: 2rem;
  }
`;
const Placeholder = styled.div`
  ${(pros) => theme.flexMixin('column', 'center', 'center')}
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : 'trasparent'};
  div {
    color: ${(props) => (props.darkMode ? 'var(--clr-white-100)' : '#111')};
  }
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
  @media (max-width: 800px) {
    min-width: 100%;
  }
`;
const FormButton = styled.button`
  ${(pros) => theme.flexMixin('row', 'space-around', 'center')}
  padding:1.5rem 1rem;
  height: 1rem;
  border: none;
  color: ${(props) => (props.darkMode ? 'var(--clr-white-100)' : '#111')};
  font-size: 1.5rem;
  margin: 2rem auto;
  min-width: 50%;
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : 'white'};
  :hover {
    background: var(--clr-primary-100);
    color: var(--clr-white-400);
  }
`;
const Heading = styled.div`
  ${(pros) => theme.flexMixin('row', 'flex-start', 'center')}
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : 'white'};
  padding: 1em 0;
  height: 3.5rem;
  width: 100%;
`;
const Footer = styled.div`
  ${(pros) => theme.flexMixin('row', 'flex-end', 'center')}
  padding:1em 0;
  height: 3.5rem;
  width: 100%;
  background: ${(props) =>
    props.darkMode ? 'var(--clr-darkblue-100)' : 'trasparent'};
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
  border-radius:5px;
  width: 70px;
  height: 70px;
  background: ${(props) => (props.darkmode ? 'hsl(0,0%,20%)' : 'white')};
  box-shadow: ${(props) =>
    props.darkmode ? 'none !important ' : ' 0 4px 10px rgba(0, 0, 252, 0.1)'};
  img {
    height: 70% !important;
    width: 70% !important;
    object-fit: cover;
  }
`;
const CloseModal = styled.div`
  ${(pros) => theme.flexMixin('row', 'center', 'center')}
  position: absolute;
  top: 20px;
  right: 30px;
  height: 25px;
  width: 25px;
  :hover {
    border-radius: 50%;
    background: ${(props) =>
      props.darkMode ? 'var(--clr-darkblue-200)' : 'whitesmoke'};
  }
`;
export const Card = (props) => {
  const [showform, setShowform] = useState(true);
  const [image, setImage] = useState([]);
  const [files, setFiles] = useState([]);
  const AppTheme = useSelector((state) => state.AppTheme);
  const { darkMode } = AppTheme;
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

  const images = files.map((file) => (
    <DropItem darkmode={darkMode} key={file.name}>
      <img src={file.preview} alt={file.name} />
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
      setFiles([]);
      setImage([]);
    }
  };
  return (
    <Container darkMode={darkMode}>
      {showform && (
        <UploadWrapper darkMode={darkMode}>
          <UploadCard darkMode={darkMode}>
            <CloseModal darkMode={darkMode} onClick={() => setShowform(false)}>
              <Close darkmode={darkMode} />
            </CloseModal>
            <Heading darkMode={darkMode}>
              <Tittle darkMode={darkMode}>IMAGE UPLOADER</Tittle>
            </Heading>
            <DropBox {...getRootProps()} darkMode={darkMode}>
              <input {...getInputProps()} />
              {files.length > 0 && <ImageWrapper> {images}</ImageWrapper>}
              {files.length < 1 && (
                <Placeholder darkMode={darkMode}>
                  <img src={folder} draggable='true' alt='placeholder' />
                  <div>click or drag for upload</div>
                </Placeholder>
              )}
            </DropBox>
            <Footer darkMode={darkMode}>
              <Button onClick={handleAdd} darkMode={darkMode}>
                Import
              </Button>
            </Footer>
          </UploadCard>
        </UploadWrapper>
      )}
      {!showform && (
        <FormButton darkMode={darkMode} onClick={() => setShowform(true)}>
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
