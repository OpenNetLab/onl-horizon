import React, { useState, useEffect } from 'react';
import '../../styles/ChallengeDashboard.scss';
import Top10 from "./Top10";
import Self from "./Self";
import { Modal, Button } from 'antd';
import { goToLinkSoft } from '../../utils/Setting';
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { PlayCircleOutlined, FlagOutlined, ArrowDownOutlined } from '@ant-design/icons';

const ChallengeDashboard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  let history = useHistory();

  let markdown = `
  ## How To Participate
  ### Read the important information 
  * Read the information from our official website [MMSys Website](https://2021.acmmmsys.org/rtc_challenge.php) carefully.
  ### Training your model
  * You should design an algorithm to predict the bandwidth. We provide a [Gym](https://github.com/OpenNetLab/gym) to you and here is a reinforcement learning [example](https://github.com/OpenNetLab/gym-example) to demonstrate how to design a bandwidth estimator model by the [Gym](https://github.com/OpenNetLab/gym).
  ### Prepare your submission
  You should submit your model and paper to participate the challenge. Please refer the [MMSys Website](https://2021.acmmmsys.org/rtc_challenge.php).
  #### Model submission
  * You should convert your model or algorithm for [AlphaRTC](https://github.com/OpenNetLab/AlphaRTC) to a [PyInfer](https://github.com/OpenNetLab/AlphaRTC#pyinfer) instance. Here is a tiny [example](https://github.com/OpenNetLab/Challenge-Example) of acceptable submission. Meanwhile, you can verify the validation of your model following [this section](https://github.com/OpenNetLab/Challenge-Example#submission-verification). You implementation will run in the [Challenge-Environment](https://github.com/OpenNetLab/Challenge-Environment) that we pre-installed some popular third-parties library in this environment.
  * You should compress all materials of your bandwidth estimator as a zip package. Here is an valid submission [example](https://github.com/OpenNetLab/Challenge-Example/archive/refs/heads/master.zip).
  * Submit your materials into our OpenNetLab platform. We provide online evaluation before the deadline.
  #### Notes
  * Please use the first author's email address to login this system.
  * We only store your last submission for evaluation.
  * We limit the number of submissions for each participant to **3** times per day.
  #### Paper submission
  Please refer the [MMSys Website](https://2021.acmmmsys.org/rtc_challenge.php).
  ## Evaluation System
  We will provide two stages of the evaluation on [OpenNetLab](https://opennetlab.org), online evaluation and offline evaluation. The goals of the evaluations are different.
  ### Online evaluation
  When a participant submit a zip, we check the basic functions of the submissions to ensure every submission can work in the offline evaluation. Each submission is scheduled to one pair of the servers randomly. The scores from the online evaluation are only for references.
  ### Offline evaluation
  We will start the offline evaluation after the final deadline. All submissions will be tested in different scenarios (e.g. networks and locations). Then we calculate the final cores and rank the submissions.
  ## Contact
  * [Google Group](https://groups.google.com/g/opennetlab-challenge)
  * [Slack](https://join.slack.com/t/opennetlab-challenge/shared_invite/zt-pjn74xhx-d~jG5lY3s4_6kSJHuzfHcw)
  ## Important Resources
  * AlphaRTC: [https://github.com/OpenNetLab/AlphaRTC](https://github.com/OpenNetLab/AlphaRTC)
  * AlphaRTC Gym: [https://github.com/OpenNetLab/gym](https://github.com/OpenNetLab/gym)
  * AlphaRTC Gym-example: [https://github.com/OpenNetLab/gym-example](https://github.com/OpenNetLab/gym-example)
  * Challenge Runtime Environment: [https://github.com/OpenNetLab/Challenge-Environment](https://github.com/OpenNetLab/Challenge-Environment)
  * Challenge Submission Example: [https://github.com/OpenNetLab/Challenge-Example](https://github.com/OpenNetLab/Challenge-Example)
  `;

  function scrollToChallenge() {
    document.getElementById("how-to").scrollIntoView({ block: 'start', behavior: 'smooth' });
    document.getElementById("arrow").style.display = "none";
  }

  return (
    <div className="challenge-content" style={{ margin: -64 }}>
      <div className="content-wrapper">
        <div className="challenge-title">Challenge</div>
        <div className="line"></div>
        <div className="description">Real-time video applications have never played a more critical role in our lives as they enable us to live and work remotely while staying connected with the rest of the world. However, the rapid increase in the use of real-time video also poses an unprecedented challenge for consistently delivering high quality of experience (QoE) — such as high video and audio quality, low delay and few stalls — to all users. This challenge invites you to design and implement a bandwidth estimator on the receiver side of a provided RTC system named <a href="https://github.com/OpenNetLab/AlphaRTC" target="blank">AlphaRTC</a>.</div>
        <div className="description bold">Please visit the MMSys' official website (<a href="https://2021.acmmmsys.org/rtc_challenge.php" target="blank">ACM MMSys'21, Istanbul, Turkey</a>) and the <div id="arrow" class="animate-bounce-up"><ArrowDownOutlined /></div><a onClick={scrollToChallenge}>HOW-TO page</a> below for more information.</div>
        <div className="self-wrapper">
          <Self />
        </div>
        <div className="row-wrapper">
          <a className="btn" onClick={() => props.history.push('/challenge/create')}>
            New Submission
            &nbsp;
            &nbsp;
            <PlayCircleOutlined />
          </a>
          <a className="btn-website" href="https://2021.acmmmsys.org/rtc_challenge.php" target="_blank">
            Official Website
            &nbsp;
            &nbsp;
            <FlagOutlined />
          </a>
        </div>
      </div>
      <div className="challenge-wrapper">
        <div id="how-to" className="intro-header">
          Challenge HOW-TO
        </div>
        <div className="md-wrapper">
          <ReactMarkdown
            children={markdown}
          />
        </div>
      </div>
      {/* <div className="top10-wrapper">
        <Top10 />
      </div> */}
    </div>
  );
};

export default ChallengeDashboard;