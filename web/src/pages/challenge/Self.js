import React, { useState, useEffect, useRef } from 'react';
import { Row, Table } from "antd";
import '../../styles/Self.scss';
import { getLatest3 } from "../../backend/api";
import btnDownload from "../../assets/download.png";
import btnDownloadDisabled from "../../assets/download_disabled.png";
import multiFileGet from 'multi-file-get';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Self = () => {
  const [data, setData] = useState([]);

  let handleDownload = (jobId, fileName) => {
    console.log("download " + jobId + " " + fileName);
    var fileNames = fileName.split(",");
    console.log(fileNames);
    let urls = [];
    for (let i = 0; i < fileNames.length; i++) {
      if (fileNames[i] != []) {
        urls.push("https://dev-api.opennetlab.org/api" + "/results/download/" + jobId + "?filename=" + fileNames[i]);
      }
    }
    console.log(urls);
    multiFileGet(urls);
  };

  const columns = [
    {
      title: <b className="table-title">Title</b>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <b className="table-title">Metrics(video score)</b>,
      dataIndex: 'metricsVideo',
      key: 'metricsVideo',
      render: (text, record) => (
        record.metricsVideo.toFixed(1)
      ),
    },
    {
      title: <b className="table-title">Metrics(audio score)</b>,
      dataIndex: 'metricsAudio',
      key: 'metricsAudio',
      render: (text, record) => (
        record.metricsAudio.toFixed(1)
      ),
    },
    {
      title: <b className="table-title">Metrics(network)</b>,
      dataIndex: 'metricsAll',
      key: 'metricsAll',
      render: (text, record) => (
        record.metricsAll.toFixed(1)
      ),
    },
    {
      title: <b className="table-title">Status</b>,
      dataIndex: 'status',
      key:'status',
      render: status => (
        <>
          {
            status == "0" ? <div className="status"><div className="run"></div>&nbsp;&nbsp;<b>Init</b></div> : null
          }
          {
            status == "1" ? <div className="status"><div className="run"></div>&nbsp;&nbsp;<b>Created</b></div> : null
          }
          {
            status == "2" ? <div className="status"><div className="run"></div>&nbsp;&nbsp;<b>Running</b></div> : null
          }
          {
            status == "3" ? <div className="status"><div className="suc"></div>&nbsp;&nbsp;<b>Succeeded</b></div> : null
          }
          {
            status == "4" ? <div className="status"><div className="fail"></div>&nbsp;&nbsp;<b style={{color:'#8e8e8e'}}>Failed</b></div> : null
          }
          {
            status == "5" ? <div className="status"><div className="run"></div>&nbsp;&nbsp;<b>DeferSelection</b></div> : null
          }
          {
            status == null ? <div className="status"><div className="blank"></div>&nbsp;&nbsp;<b style={{color:'#8e8e8e'}}>Unknown</b></div> : null
          }
        </>
      ),
    },
    {
      title: <b className="table-title">Log</b>,
      key:'log',
      render: (text, record) => (
        <>
          {
            record.fileName == null ?  <img className="btn-download-disabled" src={btnDownloadDisabled} /> : <a><img className="btn-download" src={btnDownload} onClick={() => handleDownload(record.jobId, record.fileName)}/></a>
          }
        </>
      ),
    },
  ];

  useEffect(() => {
    getLatest3()
      .then(res => {
        console.log(res);
        setData(res);
      });
  }, []);

  useInterval(() => {
    getLatest3()
      .then(res => {
        console.log(res);
        setData(res);
      });
  }, 30000);

  return (
    <div className="self-container">
      <Row justify="space-between">
        <p className="title">Submission List</p>
      </Row>
      <p className="info">Please check the <b>List</b> below for AlphaRTC logs.</p>
      <div className="table-wrapper">
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Self;