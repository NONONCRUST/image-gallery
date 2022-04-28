import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import ImageBox from "./components/ImageBox";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .text-center {
    text-align: center;
  }

  .plus-box {
    width: 100px;
    height: 100px;
    min-width: 100px;
    min-height: 100px;
    border: solid 1px #707070;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 24px;
    cursor: pointer;
  }

  .gallery-box {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 80px;
  }

  .row {
    flex-direction: row;
    gap: 100px;
    overflow-x: scroll;
    width: 100%;
    justify-content: flex-start;
    padding: 0 140px;
  }

  .image-box {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
  }

  .image-box img {
    width: 200px;
    height: 200px;
    min-width: 200px;
    min-height: 200px;
  }

  input {
    display: none;
  }

  @media screen and (max-width: 500px) {
    .initial-box {
      gap: 40px;
    }

    .row {
      padding: 40px;
    }
  }
`;

const App: React.FC = () => {
  const [imageList, setImageList] = useState<string[]>([]);

  // react-dropzone
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      if (acceptedFiles.length) {
        acceptedFiles.forEach((file: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = (event) => {
            setImageList([...imageList, event.target?.result as string]);
          };
        });
      }
    },
    [imageList]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container>
      <div className={"gallery-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다.
            <br />
            이미지를 추가해주세요.
          </div>
        )}
        {imageList.map((image, idx) => (
          <ImageBox key={image + idx} src={image} />
        ))}
        <div className="plus-box" {...getRootProps()}>
          +
        </div>
        <input {...getInputProps()} />
      </div>
    </Container>
  );
};

export default App;
