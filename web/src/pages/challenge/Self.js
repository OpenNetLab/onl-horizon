import React, { useState, useEffect } from 'react';
import { Row, Table } from "antd";
import '../../styles/Self.scss';
import { getLatest3 } from "../../backend/api";
import btnDownload from "../../assets/download.png";
import btnDownloadDisabled from "../../assets/download_disabled.png";
import suc from "../../assets/suc.png";
import fail from "../../assets/fail.png";
import run from "../../assets/run.png";
import downloadMultipleFiles from "../../backend/api";

const Self = () => {
  const [data, setData] = useState([]);
  const testData = [{"name":"test_05-24_02:25:59", "metricsVideo":18.30160614023991, "metricsAudio":76.88611795980769, "metricsAll":78.9950125752925, "rank":1, "status":4, "jobId":"e24664e4-40b7-46c1-86e4-194d6668f7d7", "fileName":null},
    {"name":"test_05-24_02:19:58", "metricsVideo":29.606073130670037, "metricsAudio":15.150328872329707, "metricsAll":97.30884004258962, "rank":2, "status":3, "jobId":"e13caac4-9019-484b-a0c9-c91bf878fef4", "fileName":"challenge_alphaRTC_send_20210524022521.log,challenge_alphaRTC_receive_20210524022521.log"},
    {"name":"test_05-24_02:15:39", "metricsVideo":56.08773182895395, "metricsAudio":6.910656488924594, "metricsAll":61.331448313468805, "rank":3, "status":3, "jobId":"ce489b51-60a7-4fbe-888d-ada68b2d9ab4", "fileName":"challenge_alphaRTC_send_20210524021603.log,challenge_alphaRTC_receive_20210524021603.log,"}];

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
    // fix: multi-Download
    for (let j = 0; j < urls.length; j++) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.height = 0;
      iframe.src = urls[j];
      document.body.appendChild(iframe);
      setTimeout(()=>{
        iframe.remove();
      }, 5 * 60 * 1000);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Metrics(video score)',
      dataIndex: 'metricsVideo',
      key: 'metricsVideo',
    },
    {
      title: 'Metrics(audio score)',
      dataIndex: 'metricsAudio',
      key: 'metricsAudio',
    },
    {
      title: 'Metrics(network)',
      dataIndex: 'metricsAll',
      key: 'metricsAll',
    },
    // {
    //   title: 'Rank',
    //   dataIndex: 'rank',
    //   key:'rank',
    // },
    {
      title: 'Status',
      dataIndex: 'status',
      key:'status',
      render: status => (
        <>
          {
            status == "0" ? <><img className="status-icon" src={run} /> Init</> : null
          }
          {
            status == "1" ? <><img className="status-icon" src={run} /> Created</> : null
          }
          {
            status == "2" ? <><img className="status-icon" src={run} /> Running</> : null
          }
          {
            status == "3" ? <><img className="status-icon" src={suc} /> Succeeded</> : null
          }
          {
            status == "4" ? <><img className="status-icon" src={fail} /> Failed</> : null
          }
          {
            status == "5" ? <><img className="status-icon" src={run} /> DeferSelection</> : null
          }
        </>
      ),
    },
    {
      title: 'Log',
      key:'log',
      render: (text, record) => (
        <>
          {
            record.fileName == null ?  <img src={btnDownloadDisabled} /> : <a><img className="btn-download" src={btnDownload} onClick={() => handleDownload(record.jobId, record.fileName)}/></a>
          }
        </>
      ),
    },
  ];

  useEffect(() => {
    getLatest3()
      .then(res => {
        setData(res);
        console.log(res);
        console.log(testData);
      });
  }, []);

  return (
    <div className="self-container">
      <Row justify="space-between">
        <p className="title">Submission List</p>
      </Row>
      <p className="info">Please check the <a href="/jobs">Job List</a> below for AlphaRTC logs.</p>
      <div className="table-wrapper">
        <Table
          dataSource={testData}
          // dataSource={data}
          columns={columns}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Self;