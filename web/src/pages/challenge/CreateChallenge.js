import React, { useState, useEffect } from 'react';
import {SubmitStatus as ST} from "../../utils/BaseVar";
import SubmitChallenge from "./SubmitChallenge";
import SubmitResult from "./SubmitResult";
import { createChallenge, runChallengeApp } from '../../backend/api';

const CreateChallenge = () => {
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [curStep, setCurStep] = useState(0);
  const [params, setParams] = useState({});
  const [sendStatus, setSendStatus] = useState(ST.SUBMIT_SUCCEEDED);
  const [submitTime, setSubmitTime] = useState(Date.now());

  // status queue
  const statusFlow = [ST.SUBMIT_PROCESSING, ST.SUBMIT_SUCCEEDED, ST.CREATE_PROCESSING];

  const handleNext = (params) => {
    // set submit time
    setSubmitTime(Date.now());
    // wait for current status
    const statusTimer = setInterval(() => {
      if (statusFlow.length > 0) {
        const curStatus = statusFlow.shift();
        setSendStatus(curStatus);
        if (curStatus === ST.RUN_SUCCEEDED || curStatus === ST.RUN_FAILED || curStatus === ST.CREATE_FAILED) {
          clearInterval(statusTimer);
        }
      }
    }, 1500);
    // set title
    setTitle(params['name']);

    createChallenge(params['name'])
      .then(res => {
        if (res.status != 4) {
          statusFlow.push(ST.CREATE_SUCCEEDED);
        } else {
          statusFlow.push(ST.CREATE_FAILED);
        }
        return runChallenge(res.id, params);
      }, err => {
        statusFlow.push(ST.CREATE_FAILED);
        return new Promise(()=>{});
      })
      .then(res => {
        if (res.status != 4) {
          statusFlow.push(ST.RUN_SUCCEEDED);
        } else {
          statusFlow.push(ST.RUN_FAILED);
        }
      }, err => {
        statusFlow.push(ST.RUN_FAILED);
      })
      .catch(err => console.log(err));

    setCurStep(curStep + 1);
  };

  const runChallenge = (jobId, params) => {
    const runChallengeParams = {
      AppParams: {
        NetParams: {
          ListenTCPPort: 8888
        },
      },
      UserName: "onl",
      TimeoutSec: "500"
    };
    runChallengeParams.AppParams.model = params['model'];
    runChallengeParams.AppParams.modelId = params['modelId'];
    statusFlow.push(ST.RUN_PROCESSING);
    return runChallengeApp(jobId, runChallengeParams);
  };

  const setFirst = () => {
    setCurStep(0);
  };

  return (
    <div className="create-job-container">
      {curStep === 0 && <SubmitChallenge title={ title } model={ model } handleNext={ handleNext } params={params}/>}
      {curStep === 1 && <SubmitResult title={ title } sendStatus={sendStatus} submitTime={submitTime} setFirst={setFirst}/>}
    </div>
  );
};


export default CreateChallenge;