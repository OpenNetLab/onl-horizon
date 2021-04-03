import React, {useContext /*useState*/} from 'react';
import {Row, Col, Avatar} from 'antd';
import loginButton from '../../assets/login-button.png';
import background from '../../assets/bg.png';
import rectangle1 from '../../assets/Rectangle.png';
import logo from '../../assets/ONL-Logo.png';
import vector from '../../assets/Vector.png';
import photo from '../../assets/3-1.png';
import line from '../../assets/Line.png';
import arrow from '../../assets/arrow.png';
import ellipse1 from '../../assets/Ellipse-1.png';
import ellipse2 from '../../assets/Ellipse-2.png';
import ellipse3 from '../../assets/Ellipse-3.png';
import icon1 from '../../assets/icon-1.png';
import icon3 from '../../assets/icon-3.png';
import icon4 from '../../assets/icon-4.png';
import join from '../../assets/join-button.png';
import * as Setting from "../../utils/Setting";
import { useHistory } from "react-router-dom";
import {MsalContext} from "@hsluoyz/msal-react";
import '../../styles/Landing.scss';

const Landing = () => {
  const history = useHistory();
  const msalContext = useContext(MsalContext);
  console.log(msalContext.accounts);
  const handleLogin = () => {
    history.push("/home");
  };

  const renderAvatar = () => {
    const account = Setting.getAccount(msalContext);
    const imageSrc = Setting.getAvatarSrc();
    const name = account.name;
    if (imageSrc === "") {
      return (
        <div>
          <Avatar size="large" style={{ backgroundColor: Setting.getAvatarColor(account.name), verticalAlign: 'middle' }}>
            {Setting.getFirstName(account.name)}
          </Avatar>
          &nbsp;
          &nbsp;
          <span style={{fontWeight: "bold", fontColor: "#FFFFFF"}}>{Setting.isMobile() ? null : name}</span>
          &nbsp;
          &nbsp;
          &nbsp;
        </div>
      );
    } else {
      return (
        <div>
          <Avatar size="large" src={imageSrc} />
          &nbsp;
          &nbsp;
          <span style={{fontWeight: "bold", fontColor: "#FFFFFF"}}>{Setting.isMobile() ? null : name}</span>
          &nbsp;
          &nbsp;
          &nbsp;
        </div>
      );
    }
  };

  return (
    <div className="landing-container">
      <Row className="landing-header">
        <div className="landing-header-container">
          <div className="landing-logo">
            {
              Setting.isMobile() ? null : <a className="logo" href={"/"} />
            }
          </div>
          <ul className="landing-nav">
            <li className="landing-nav-item">
              <a href="#">RESEARCH</a>
            </li>
            <li className="landing-nav-item">
              <a href="#">DATA</a>
            </li>
            <li className="landing-nav-item">
              <a href="#">ABOUT US</a>
            </li>
            <li className="landing-nav-item">
              <a href="#">JOIN US</a>
            </li>
            <li>
              <div className="landing-profile">
                {msalContext.accounts.length === 0 ? null : renderAvatar()}
              </div>
            </li>
          </ul>
        </div>
      </Row>
      <Row className="home-hero">
        <div className="hero-left">
          <div className="bg">
            {
              Setting.isMobile() ? null : <p className="bg-title-info">Open | Share | Collaborate</p>
            }
            <p className="bg-title">OpenNetLab</p>
            <p className="bg-description">OpenNetLab aims to build and provide a distributed networking platform with many collaborative nodes and a common benchmarking dataset (i.e. ImageNet in the networking area) for researchers to collect real networking data and train/evaluate their AI models for various networking environments, including the Internet/cloud, and wireless and mobile networks.<br/>
              <img src={loginButton} className="login" onClick={handleLogin} />
            </p>
          </div>
        </div>
        <img className="img-right" src={background} />
      </Row>
      <Row className="challenge" type="flex" justify="center" align="middle">
        <div className="line">
          <div>
            <p>CHALLENGE</p>
          </div>
          <div>
            <img src={line}/>
          </div>
        </div>
        <div className="challenge-container">
          <div className="challenge-text">
            <p className="title">Grand Challenge on Bandwidth Estimation for Real-Time Communications</p>
            <p className="description">Real-time video applications have never played a more critical role in our lives as they enable us to live and work remotely while staying connected with the rest of the world. However, the rapid increase in the use of real-time video also poses an unprecedented challenge for consistently delivering high quality of experience (QoE) — such as high video and audio quality, low delay and few stalls — to all users.<br/>
          A pivotal algorithm to optimize the QoE for real-time video communications is bandwidth estimation. It runs on the endpoint of a real-time video application and aims at adapting the video bitrate dynamically to stay within the available network capacity. To this end, it generally collects packet statistics from the network path and regularly computes a bandwidth estimate for the future. It then passes the estimate into a video codec as a target bitrate, requesting the codec to encode video frames in an average bitrate approximately equivalent to the target. As a result, the bandwidth estimator avoids network oversubscription by controlling the sending rate of video indirectly through the codec.<br/>
          Although we have only focused on video so far, a bandwidth estimator is required to take audio into account too and deliver high quality audio. In this challenge, we call for a novel bandwidth estimation scheme implemented in the provided framework, such that it is able to attain superior overall QoE on a real-world testbed we built for real-time communications (RTC) of video and audio.
            </p>
            <a href="#" className="links">WELCOME TO LOGIN</a>
            <img className="arrow" src={arrow}/>
            <img className="arrow" src={arrow}/>
          </div>
          <div className="challenge-pics">
            <img className="rectangle" src={rectangle1} />
            <p className="linksInRect">More Information</p>
            <div className="background">
              <img className="vector" src={vector} />
              <p className="title padding-left padding-right padding-top">OpenNetLab/gym</p>
              <p className="description padding-left padding-right">
              This gym leverages NS3 and WebRTC, which can be used by reinforcement learning or other methods to build a Bandwidth Controller for WebRTC
              </p>
            </div>
            <div className="background">
              <img className="vector" src={vector} />
              <p className="title padding-left padding-right padding-top">OpenNetLab/AlphaRTC</p>
              <p className="description padding-left padding-right">
              Contribute to OpenNetLab/AlphaRTC development by creating an account on Github
              </p>
            </div>
            <div className="background">
              <img className="vector" src={logo} />
              <p className="title padding-left padding-right padding-top">ACM MMSys'21, Istanbul, Turkey</p>
              <p className="description padding-left padding-right">
              More Information about Grand Challenge on Bandwidth Estimation for Real-Time Communications
              </p>
            </div>
          </div>
        </div>
      </Row>
      <Row class="news" type="flex" justify="center" align="middle">
        <div className="line">
          <div>
            <p>NEWS</p>
          </div>
          <div>
            <img src={line}/>
          </div>
        </div>
        <div className="news-container">
          <div className="news-pic">
            <img className="photo" src={photo} />
          </div>
          <div className="news-text">
            <p className="title">OpenNetLab v1.0 released</p>
            <p className="description">OpenNetLab is to build and provide a distributed networking platform with many collaborative nodes and a common benchmarking dataset (a.k.a ImageNet in Networking Area) through this platform for the researchers to collect real networking data and training/evaluating their AI models for various networking environment, including Internet/cloud, wireless and mobile network. OpenNetLab is to build and provide a distributed networking platform with many collaborative nodes and a common benchmarking dataset (a.k.a ImageNet in Networking Area) through this platform for the researchers to collect real networking data and training/evaluating their AI models for various networking environment, including Internet/cloud, wireless and mobile network.
            </p>
            <a href="#" className="links">VIEW MORE</a>
            <img className="arrow" src={arrow}/>
            <img className="arrow" src={arrow}/>
            <div>
              <img className="ellipse" src={ellipse1}/>
              <img className="ellipse" src={ellipse2}/>
              <img className="ellipse" src={ellipse3}/>
            </div>
          </div>
        </div>
      </Row>
      <Row class="features" type="flex" justify="center" align="middle">
        <div className="line">
          <div>
            <p>FEATURES</p>
          </div>
          <div>
            <img src={line}/>
          </div>
        </div>
        <div className="features-container">
          <div className="background-features">
            <img className="icon" src={icon1}/>
            <p className="title">
              Contributing to the research community
            </p>
            <p className="description">
              Platform: Free to the networking research community Dataset: Published to GitHub for researchers to reproduce the experiments and train models
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon4}/>
            <p className="title">
              Data centric for networking-related AI
            </p>
            <p className="description">
              Automatic data collection Automatic data storing Automatic data aggregation Automatic data sharing
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon3}/>
            <p className="title">
              Real Applications
            </p>
            <p className="description">
              Real Time Communication Video/Data Streaming Web Service/CDN Other networking applications
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon4}/>
            <p className="title">
              Distributed heterogenous test nodes
            </p>
            <p className="description">
              Geo-distributed testbed Heterogenous network Various user devices
            </p>
          </div>
        </div>
      </Row>
      <div className="background-join">
        {
          Setting.isMobile() ? null : <div children="join-container">
            <p className="bg-title-bottom">
              Join OpenNetLab
            </p>
            <p className="description description-bottom">
              Open | Share | Collaborate
            </p>
          </div>
        }
        <img className="join" src={join}/>
      </div>
      <Row className="landing-footer" justify="space-between">
        <div className="landing-footer-container">
          <div className="landing-footer-logo">
            {
              Setting.isMobile() ? null : <a className="logo" href={"/"} />
            }
          </div>
          <div className="footer-contact">
            <p className="contactUs">
              Welcome to Contact us
            </p>
            <a className="email">
              contact@opennetlab.org
            </a>
          </div>
          <ul className="landing-nav">
            <li className="landing-nav-item">
              <a href="#">Join us</a>
            </li>
            <li className="landing-nav-item">
              <a href="#">Feedback</a>
            </li>
            <li className="landing-nav-item">
              <a href="#">Links</a>
            </li>
          </ul>
        </div>
      </Row>
    </div>
  );
};

export default Landing;
