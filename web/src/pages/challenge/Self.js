import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import '../../styles/Self.scss';
import {getLatest3} from "../../backend/api";

const Self = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key:'name',
    },
    {
      title: 'Metrics(video score)',
      dataIndex: 'metricsVideo',
      key:'metricsVideo',
    },
    {
      title: 'Metrics(audio score)',
      dataIndex: 'metricsAudio',
      key:'metricsAudio',
    },
    {
      title: 'Metrics(network)',
      dataIndex: 'metricsAll',
      key:'metricsAll',
    },
    // {
    //   title: 'Rank',
    //   dataIndex: 'rank',
    //   key:'rank',
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key:'status',
    // },
    // {
    //   title: 'Log',
    //   dataIndex: 'log',
    //   key:'log',
    // },
  ];

  useEffect(() => {
    getLatest3()
      .then(res => {
        setData(res);
      });
  }, []);

  return (
    <div className="self-container">
      <Row justify="space-between">
        <p className="title">Your submissions</p>
      </Row>
      <p className="info">Please check <a href="/jobs">Job List</a> for AlphaRTC logs.</p>
      <div className="table-wrapper">
        <Table
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Self;