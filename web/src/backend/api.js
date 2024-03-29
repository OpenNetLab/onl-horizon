import {get, post, postFile, deleteData, patch} from './http';
import * as Setting from "../utils/Setting";
import multiFileGet from 'multi-file-get';

// local test
// const baseUrl = '/api'
// vm test

// Production Env
// export const baseUrl = 'https://api.opennetlab.org/api';

// DEV Env
export const baseUrl = 'https://dev-api.opennetlab.org/api';

// create job
export const sendCreateJobReq = (params = {}) => {
  const createJobDefaultParams = {"RequiredMachineNumber": 2, "userId": Setting.getUserId()};
  for (const key of Object.keys(params)) {
    createJobDefaultParams[key] = params[key];
  }
  return post(`${baseUrl}/display/createJob`, createJobDefaultParams);
};

// get one job info
export const getJobInfo = (jobId) => {
  return get(`${baseUrl}/display/jobDetail/${jobId}`);
};

// get machine detail for one job
export const getMachineDetail = (machineList) => {
  return get(`${baseUrl}/display/machines/${machineList}`);
};

// get job info list
export const allJobInfo = (userId = Setting.getUserId()) => {
  const param = {userId: userId, currentPage: 0, pageSize: 99999};
  return get(`${baseUrl}/display/jobList`, param);
};

// delete job
// force: stop and delete a RUNNING job
export const deleteJob = (jobId, data = {}, header = {}, force = true) => {
  return deleteData(`${baseUrl}/display/jobDetail/${jobId}?force=${force}`, data, header);
};

// restart job
export const restartJob = (jobId, params = {}) => {
  return post(`${baseUrl}/${jobId}/restart`, params);
};

// stop job
const defaultParam = '[{"value": 1,"path": "status", "op": "replace"}]';
export const stopJob = (jobId, params = defaultParam) => {
  return patch(`${baseUrl}/jobs?id=${jobId}`, params);
};

// download dataset
//GET http://opennetlab.org/api/results/download/e0000001-0000-0000-0000-000000000001?filename=webrtc_send_20201119082250.log,
export const downloadDataset = (jobId, filename) => {
  const param = {'filename': filename};
  return get(`${baseUrl}/results/download/${jobId}`, param);
};

// get user name by user id
// export const getUserName = (userId = '00000000-0000-0000-0000-000000000001') => {
//   const url = baseUrl + '/users' + '/' + userId;
//   return get(url);
// };

// run job
export const runApp = (jobId, appName, params) => { //
  const url = `${baseUrl}/display/runJob/${jobId}?appName=${appName}`;
  return post(url, params);
};

// get user ID
export const getUser = () => {
  return get(`${baseUrl}/auth`)
    .then((res) => {
      const userId = res.id;
      const role = res.role;
      const operations = res.operations;
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);
      localStorage.setItem("operations", operations);
    })
    .catch(err => {
      localStorage.setItem("userId", "forbidden");
      localStorage.setItem("role", "forbidden");
      // alert(err);
    });
};

// get challenge Id (fixed)
export const getChallengeId = () => {
  const challengeId = "00000000-0000-0000-0000-000000000001";
  if(localStorage.getItem("challengeId") == null) {
    localStorage.setItem("challengeId", challengeId);
  }
};

// sign up
export const signUp = (params) => {
  return post(`${baseUrl}/display/userRegistration`, params)
    .then((res) => {
      getUser();
    });
};

export const getMyJobStates = () => {
  return get(`${baseUrl}/display/jobStatistics?type=1`);
};

export const getGlobalJobStates = () => {
  return get(`${baseUrl}/display/jobStatistics?type=0`);
};

export const getGlobalMachineStates = () => {
  return get(`${baseUrl}/display/machineStatistics`);
};

export const getMachineLocations = () => {
  return get(`${baseUrl}/display/machineLocation`);
};

export const downloadMultipleFiles = (data) => {
  const urls = data.map(dataItem => `${baseUrl}/display/downloadFile/${dataItem.id}?filename=${dataItem.file}`);
  for (let i = 0; i < urls.length; i++) {
    downLoadByUrl(urls[i]);
  }
};

// Download file by url with Authorization Header in job detail page
export const downloadFile = (url) => {
  var xhh = new XMLHttpRequest();
  xhh.open("get", url);
  xhh.setRequestHeader("Authorization", Setting.getAuthorizationHeader());
  xhh.setRequestHeader("Content-Type", "application/json");
  xhh.responseType = 'blob';
  xhh.onload = function () {
    if (this.status === 200) {
      var blob = this.response;
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
        var a = document.createElement('a');
        a.download = url.split("?filename=")[1];
        a.href = e.target.result;
        a.click();
      };
    }
  };
  xhh.send();
};

// Download file with Authorization Header in challenge page
export const downLoadByUrl = (url) => {
  var xhh = new XMLHttpRequest();
  xhh.open("get", url);
  xhh.setRequestHeader("Authorization", Setting.getAuthorizationHeader());
  xhh.setRequestHeader("Content-Type", "application/json");
  xhh.responseType = 'json';
  xhh.onload = function () {
    if (this.status === 200) {
      var file = this.response.data.fileContents;
      let content = window.atob(file);
      var blob = new Blob([content]);
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = function (e) {
        var a = document.createElement('a');
        a.download = url.split("?filename=")[1];
        a.href = e.target.result;
        a.click();
      };
    }
  };
  xhh.send();
};

export const getMachineList = () => {
  // return get('https://private-b088c9-v2onlapi.apiary-mock.com/api/availableMachineList');
  return get(`${baseUrl}/display/availableMachineList`);
};

// get Top 10 records
export const getTop10 = (challengeId = Setting.getChallengeId()) => {
  return get(`${baseUrl}/display/challenge/results?challengeId=${challengeId}&limit=10`);
};

// get latest 3 self records
export const getLatest3 = (challengeId = Setting.getChallengeId(), userId = Setting.getUserId()) => {
  return get(`${baseUrl}/display/challenge/userResults?challengeId=${challengeId}&userId=${userId}&limit=3`);
};

// create challenge
export const createChallenge = (title) => {
  let params = {};
  params['title'] = title;
  params['userId'] = Setting.getUserId();
  params['RequiredMachineNumber'] = 2;
  params['appType'] = "ChallengeAlphaRTC";
  return post(`${baseUrl}/display/createJob`, params);
};

export const runChallengeApp = (jobId, runChallengeParams) => {
  runChallengeParams.AppParams.challengeId = Setting.getChallengeId();
  runChallengeParams.AppParams.userId = Setting.getUserId();
  runChallengeParams.AppParams.modeChoice = "AutoSelection";
  console.log(runChallengeParams);
  return post(`${baseUrl}/display/runJob/${jobId}?appName=ChallengeAlphaRTC`, runChallengeParams);
};