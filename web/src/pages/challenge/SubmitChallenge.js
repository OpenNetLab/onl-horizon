import React, { useState, useEffect, useMemo } from 'react';
import { Button, Upload, message, Col, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AdvInput from "../../components/AdvInput";
import { nanoid } from 'nanoid';
import '../../styles/SubmitChallenge.scss';

const SubmitChallenge = (props) => {
  const { title: initTitle, model: initModel, handleNext } = props;
  const [title, setTitle] = useState(initTitle ? initTitle : '');
  const [modelFileName, setModelFileName] = useState(initModel ? initModel : 'Model Path');
  const [isModel, setIsModel] = useState(false);
  const [modelFile, setModelFile] = useState(null);
  const [checkValid, setCheckValid] = useState(false);
  const [isZip, setIsZip] = useState(false);

  const onClickNext = () => {
    if (titleValid && modelValid) {
      const params = {};
      params['modelId'] = nanoid();
      params['name'] = title;
      const filereader = new FileReader();
      filereader.readAsDataURL(modelFile);
      filereader.onload = e => {
        const model = filereader.result.split(',')[1];
        params['model'] = model;
        handleNext(params);
      };
    } else {
      setCheckValid(true);
    }
  };

  const refreshPage = () => {
    window.location.href = "/challenge/create";
  };

  const uploadParams = {
    name: 'file',
    accept: 'application/zip',
    itemRender: () => {
      null;
    },
    beforeUpload: (file) => {
      console.log(file.type);
      setIsZip(true);
      setModelFile(file);
      setModelFileName(file.name);
      return false;
    },
    onChange(info) {
      if (info.fileList.length > 0) {
        setIsModel(true);
      } else {
        setIsModel(false);
      }
    },
  };

  let handleReset = () => {
    setIsModel(false);
    setModelFileName('Model Path');
    setIsZip(false);
  };

  const titleValid = useMemo(() => {
    return title;
  }, [title]);

  const modelValid = useMemo(() => {
    return isModel;
  }, [isModel]);

  return (
    <div className="submit-challenge-container">
      <div className="title-container">
        <p className="title">Challenge</p>
        <p className="title-info">Create a new challenge.</p>
      </div>
      <div className="model-name">
        <AdvInput
          type="normal"
          title="Name"
          placeholder="Model Name"
          handleChange={setTitle}
          widthRange={[500, 500]}
          showError={checkValid && !titleValid}
          errorText="Please enter your name"
          isAdaptive={true}
          height="40px"
        />
      </div>
      <Row className="model">
        <AdvInput
          type="normal"
          title="Model Upload (.zip)"
          placeholder={modelFileName}
          widthRange={[390, 600]}
          showError={checkValid && !modelValid}
          errorText="Please upload your model"
          isAdaptive={true}
          height="40px"
          disabled={true}
        />
        <div className="upload">
          <Upload {...uploadParams} >
            <Button type="primary" className="button-browse" disabled={isModel}>Browse</Button>
          </Upload>
          {isModel && <Button type="primary" className="button-inline" onClick={handleReset}><DeleteOutlined /></Button>}
        </div>
      </Row>
      <Row justify="center">
        <Col>
          <Button className="next-btn" type="primary" onClick={onClickNext} disabled={!isZip}>Submit</Button>
        </Col>
      </Row>
    </div>
  );
};


export default SubmitChallenge;