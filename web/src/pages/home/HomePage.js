import React, {useEffect, useState} from "react";
import {Row, Col} from "antd";
import '../../styles/HomePage.scss';
import InfoCard from "../../components/InfoCard";
import {getGlobalJobStates, getGlobalMachineStates, getMyJobStates} from "../../backend/api";
import Map from "../../components/Map";

const HomePage = () => {
  const [myJobStates, setMyJobStates] = useState({Failed: 0, Succeeded: 0, Running: 0});
  const [globalJobStates, setGlobalJobStates] = useState({Succeeded: 0, Faile: 0, Running: 0});
  const [globalMachineStates, setGlobalMachineStates] = useState({available: 0, busy: 0, error: 0});

  const jobAry = ['Succeeded', 'Failed', 'Running'];
  const serverAry = ['Available', 'Error', 'Busy'];

  // get data from backend
  useEffect(() => {
    getMyJobStates()
      .then((info) => {
        setMyJobStates(info);
      });

    getGlobalJobStates()
      .then((info) => {
        setGlobalJobStates(info);
      });

    getGlobalMachineStates()
      .then((info) => {
        setGlobalMachineStates(info);
      });
  }, []);

  return (
    <div style={{margin: 24 - 60}}>
      <Row justify="space-around">
        <Col flex="350px">
          <InfoCard
            keyAry={jobAry}
            valueAry={[myJobStates.Succeeded || 0, myJobStates.Failed || 0, myJobStates.Running || 0]}
            title={<div style={{fontWeight: "bold"}}>My Jobs</div>}
            showIcon={true}
            width={400}
            height={766}
            showChart={true}/>
        </Col>
        <Col flex="auto" style={{marginLeft: "24px"}}>
          <Row>
            <Map />
          </Row>
          <Row style={{marginTop:32, maxWidth:800}} justify="space-between">
            <InfoCard
              screenWidth={"47.5%"}
              keyAry={jobAry}
              valueAry={[globalJobStates.Succeeded || 0, globalJobStates.Failed || 0, globalJobStates.Running || 0]}
              title={<div style={{fontWeight: "bold"}}>Global Jobs</div>}
              showIcon={true}/>
            <InfoCard
              screenWidth={"47.5%"}
              keyAry={serverAry}
              valueAry={[globalMachineStates.available || 0, globalMachineStates.error || 0, globalMachineStates.busy || 0]}
              title={<div style={{fontWeight: "bold"}}>Servers</div>}
              showIcon={true}/>
          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default HomePage;
