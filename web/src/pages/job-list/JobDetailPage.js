import {Button, Col, Row, Table} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";
import * as momenttz from 'moment-timezone';
import {downloadMultipleFiles, getJobInfo, getMachineDetail, deleteJob} from '../../backend/api';
import '../../styles/JobDetailPage.scss';
import Modal from "../../components/Modal";
import {useHistory} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import * as Setting from "../../utils/Setting";

const columns = [
  {
    title: 'prop',
    dataIndex: 'prop',
    width: '30%',
    render: text => <b>{text}</b>,
  },
  {
    title: 'value',
    dataIndex: 'value',
    width: '70%'
  }
];
const hostColumns = [
  {
    title: 'GUID',
    dataIndex:'id',
    key:'id',
    align: 'center',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Network Type',
    dataIndex: 'networkType',
    key: 'networkType',
    align: 'center',
  },
  {
    title: 'VM Spec',
    dataIndex: 'vmSpec',
    key: 'vmSpec',
    align: 'center',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    align: 'center',
  }
];
const columnReflect = [
  ['ID', 'id'],
  ['Name', 'title'],
  ['Time', 'time'],
  ['Type', 'appType'],
  ['User', 'userName'],
  ['Expiration Time (min)', 'expirationTime'],
  ['Status', 'status'],
];
const columnConvert = new Map(columnReflect);

const JobDetail = (props) => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [job, setJob] = useState({});
  const [jobDescription, setJobDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [btnId, setBtnId] = useState(0);
  const [downloadData, setDownloadData] = useState([]);
  const btnToModalBtn = ['Stop', 'Start', 'Delete', 'Download', 'Delete'];
  const btnToModalTitle = ['Stop Job', 'Start Job', 'Delete Job', 'Download Dataset', 'Delete a Running Job'];
  const slots = [
    'These jobs will stop. Are you sure?',
    'These jobs will start. Are you sure?',
    'This job will be deleted. Are you sure?',
    'Please choose files to download:',
    'This job is running. Are you sure to stop and delete it?'];

  const showModalView = (e) => {
    const curBtn = e.target;
    let id = +curBtn.id;
    if (id === 2 && job.status === "Running") {
      id = 4;
    }
    setBtnId(id);
    setShowModal(true);
  };
  const funcZone = (
    <div className="func-zone" onClick={showModalView} >
      {/* <Button type="default" id={0} className="logs-btn btn" disabled>
        <span className="btn-text" id={0}>JOB LOGS</span>
      </Button>
      <Button type="default" id={1} className="clone-btn btn" disabled>
        <span className="btn-text" id={1}>CLONE</span>
      </Button> */}
      <Button type="default" id={2} className="stop-btn btn" disabled={false}>
        <span className="btn-text" id={2}>DELETE</span>
      </Button>
      <Button type="default" id={3} className="download-btn btn" disabled={job.status !== "Succeeded"} >
        <span className="btn-text" id={3}>DOWNLOAD DATASET</span>
      </Button>
    </div>);

  const  initData = (id) => {
    getJobInfo(id)
      .then(
        async (info) => {
          handleJobInfo(info);
          console.log('1', info.machineList);
          const machineDetail = await getMachineDetail(info.machineList);
          setInfo(machineDetail);
        });
  };
  const download = (data) => {
    console.log(data);
    if (!data || data.length === 0) {
      return;
    }
    downloadMultipleFiles(data);
  };
  const handleJobInfo = (job)  =>{
    const tempData = [];
    setJob(job);
    setJobDesc(job.description);
    for (const entry of columnConvert.entries()) {
      const curKey = {};
      const [tar, src] = entry;
      curKey['key'] = tempData.length;
      curKey['prop'] = tar;
      let value;
      // set default display value
      if (job[src] === null || job[src] === undefined) {
        value = 'null';
      } else {
        value = job[src];
      }

      if (tar === 'Time') {
        const createTime = job['createTime'];
        const timezone = moment.tz.guess();
        curKey['value'] = momenttz(createTime).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
      } if (tar === 'Type') {
        curKey['value'] = Setting.appTypeMapR[value];
      } else {
        curKey['value'] = value;
      }
      tempData.push(curKey);
    }
    setData(tempData);
    setDownloadData([{'title': job.title, 'files': job.dataFiles, 'jobId': job.id}]);
    setLoading(false);
  };
  const handleModalConfirm = (data) => {
    switch (btnId) {
    case 0:
      break;
    case 1:
      break;
    case 2: // Delete a non-running job
    case 4: // Delete a running job
      console.log(job.id);
      deleteJob(job.id)
        .then(() => {
          setShowModal(false);
          window.location.href = "/jobs";
        })
        .catch((err) => {
          // Error message will prompt externally
          setShowModal(false);
          console.log(err);
        });
      break;
    case 3:
      download(data);
    }
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };
  let history = useHistory();
  const handleBackBtn = () => {
    history.push({pathname:'/jobs'});
  };
  useEffect(() => {
    const id = props.match.params.id;
    initData(id);
  }, []);
  return (
    <div className="job-detail-container">
      <Modal
        visible={showModal}
        handleConfirm={handleModalConfirm}
        handleCancel={handleModalCancel}
        confirmText={btnToModalBtn[btnId]}
        cancelText={"Cancel"}
        description={slots[btnId]}
        title={btnToModalTitle[btnId]}
        height={+btnId === 3 ? "600px" : "250px"}
        existTable={+btnId === 3 }
        jobs={downloadData}
      />
      <Button className="back-btn" size="small" onClick={handleBackBtn}>
        <LeftOutlined /><span style={{fontWeight: "bold"}}> BACK</span>
      </Button>
      <Row justify="space-between">
        <p className="title">Job Detail</p>
        <div className="func-wrapper">
          {funcZone}
        </div>
      </Row>
      <Row className="subtitle">{jobDescription}</Row>
      <Row className="table-wrapper" style={{marginTop:'64px'}} gutter={[0, 50]}>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            size={"middle"}
            showHeader={false}
            pagination={false}
          />
        </Col>
        <Col span={24} >
          <p className="host-title">Host Info</p>
          <Table
            columns={hostColumns}
            dataSource={info}
            loading={loading}
            pagination={false}
            locale={{emptyText: <div className="host-nodata-prompt">No machines assigned to this job</div>}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default JobDetail;
