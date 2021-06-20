import React, { useState, useEffect } from 'react';
import '../../styles/ChallengeDashboard.scss';
import Self from "./Self";
import ReactMarkdown from "react-markdown";
import { PlayCircleOutlined, FlagOutlined, ArrowDownOutlined } from '@ant-design/icons';

const ChallengeDashboard = (props) => {
  const [markdown, setMarkdown] = useState(" ");

  useEffect(() => {
    // use real markdown source file
    fetch("https://cdn.jsdelivr.net/gh/OpenNetLab/challenge-HOWTO/README.md")
      .then(res => {
        res.text()
          .then(res => {
            console.log(res);
            setMarkdown(res);
          });
      });
  }, []);

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