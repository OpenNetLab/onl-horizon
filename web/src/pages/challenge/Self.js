import React, { useState, useEffect } from 'react';
import { Row, Table } from "antd";
import '../../styles/Self.scss';
import { getLatest3 } from "../../backend/api";
import btnDownload from "../../assets/download.png";
import btnDownloadDisabled from "../../assets/download_disabled.png";
import multiFileGet from 'multi-file-get';

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
            status == "0" ? <><div className="run"></div>&nbsp;&nbsp;<b>Init</b></> : null
          }
          {
            status == "1" ? <><div className="run"></div>&nbsp;&nbsp;<b>Created</b></> : null
          }
          {
            status == "2" ? <><div className="run"></div>&nbsp;&nbsp;<b>Running</b></> : null
          }
          {
            status == "3" ? <><div className="suc"></div>&nbsp;&nbsp;<b>Succeeded</b></> : null
          }
          {
            status == "4" ? <><div className="fail"></div>&nbsp;&nbsp;<b style={{color:'#8e8e8e'}}>Failed</b></> : null
          }
          {
            status == "5" ? <><div className="run"></div>&nbsp;&nbsp;<b>DeferSelection</b></> : null
          }
          {
            status == null ? <><div className="blank"></div>&nbsp;&nbsp;<b style={{color:'#8e8e8e'}}>Unknown</b></> : null
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