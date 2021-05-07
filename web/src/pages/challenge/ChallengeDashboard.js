import React, { useState, useEffect } from 'react';
import '../../styles/ChallengeDashboard.scss';
import Top10 from "./Top10";
import Self from "./Self";
import { Modal, Button } from 'antd';
import { goToLinkSoft } from '../../utils/Setting';
import { useHistory } from "react-router-dom";

const ChallengeDashboard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let history = useHistory();

  return (
    <div className="challenge-container" style={{ margin: -64 }}>
      <Modal
        title="Message"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <ul>
          <li className="info" style={{ fontSize: 18 }}>Please use the first author's email address to login this system.</li>
          <li className="info" style={{ fontSize: 18 }}>We only store your last submission for evaluation.</li>
          <li className="info" style={{ fontSize: 18 }}>We limit the number of submissions for each participant to <b>3 times per day</b>.</li>
        </ul>
        <p className="info" style={{ fontSize: 18 }}>Please read the&nbsp;<a onClick={() => {goToLinkSoft(history, '/howto');}} style={{ textDecoration: "underline" }}>HOW-TO</a>&nbsp;before submission.</p>
      </Modal>
      <div className="challenge-wrapper">
        <div className="intro-container">
          <div className="intro-contents">
            <div className="intro-header">
              Challenge
            </div>
            <div className="intro-details">
              Real-time video applications have never played a more critical role in our lives as they enable us to live and work remotely while staying connected with the rest of the world. However, the rapid increase in the use of real-time video also poses an unprecedented challenge for consistently delivering high quality of experience (QoE) — such as high video and audio quality, low delay and few stalls — to all users.
            </div>
            <div className="row-wrapper">
              <div className="btn-container website">
                <div className="btn-wrapper">
                  <a href="https://2021.acmmmsys.org/rtc_challenge.php" target="_blank">Official Website</a>
                </div>
              </div>
              <div className="btn-container submit" onClick={() => props.history.push('/challenge/create')}>
                <p>Submit</p>
              </div>
            </div>
            {/* <div className="row-wrapper">
              <p className="info">Please read the&nbsp;<a href="https://github.com/OpenNetLab/challenge-HOWTO" target="blank" style={{ textDecoration: "underline" }}>HOW-TO</a>&nbsp;before submission.</p>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="top10-wrapper">
        <Top10 />
      </div> */}
      <div className="self-wrapper">
        <Self />
      </div>
    </div>
  );
};

export default ChallengeDashboard;