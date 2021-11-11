import React, { useContext /*useState*/ } from 'react';
import { Row, Avatar } from 'antd';
import loginButton from '../../assets/login-button.png';
import vector from '../../assets/Vector.png';
import arrow from '../../assets/arrow.png';
import join from '../../assets/join-button.png';
import * as Setting from "../../utils/Setting";
import { useHistory } from "react-router-dom";
import { MsalContext } from "@hsluoyz/msal-react";
import '../../styles/Landing.scss';
import logo from "../../assets/ONL-Logo.png";
import { imgBaseUrl } from '../../utils/Setting';

const Landing = () => {
  const mmsys = `${imgBaseUrl}mmsys.png`;
  const icon1 = `${imgBaseUrl}icon-1.png`;
  const icon2 = `${imgBaseUrl}icon-2.png`;
  const icon3 = `${imgBaseUrl}icon-3.png`;
  const icon4 = `${imgBaseUrl}icon-4.png`;
  const photo = `${imgBaseUrl}photo.png`;
  const background = `${imgBaseUrl}bg.png`;
  const bgBottom = `${imgBaseUrl}bg-bottom.png`;

  const history = useHistory();
  const msalContext = useContext(MsalContext);
  console.log(msalContext.accounts);
  const handleLogin = () => {
    window.location.href = "/home";
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
          <span style={{ fontWeight: "bold", fontColor: "#FFFFFF" }}>{Setting.isMobile() ? null : name}</span>
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
          <span style={{ fontWeight: "bold", fontColor: "#FFFFFF" }}>{Setting.isMobile() ? null : name}</span>
          &nbsp;
          &nbsp;
          &nbsp;
        </div>
      );
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-header-container">
        <a href="/" className="footer-logo">
          <img className="logo-solo" src={logo} />
          <div className="logo-title">
            <p className="logo-title-big">OpenNetLab</p>
          </div>
        </a>
        <ul className="nav">
          <li className="nav-item">
            <a href="/about">ABOUT US</a>
          </li>
          <li className="nav-item">
            <a href="/join">JOIN US</a>
          </li>
          <li>
            <div className="profile">
              {msalContext.accounts.length === 0 ? null : renderAvatar()}
            </div>
          </li>
        </ul>
      </div>
      <div className="hero-row">
        <div className="left-info">
          <p className="bg-title-info">Open | Share | Collaborate</p>
          <p className="bg-title">OpenNetLab</p>
          <p className="bg-description">OpenNetLab aims to build and provide a distributed networking platform with many collaborative nodes and a common benchmarking dataset (i.e. ImageNet in the networking area) for researchers to collect real networking data and train/evaluate their AI models for various networking environments, including the Internet/cloud, and wireless and mobile networks.<br />
            <img src={loginButton} className="login" onClick={handleLogin} />
          </p>
        </div>
        <img className="img-right" src={background} />
      </div>
      <div className="margin-lift">
        <div className="line">
          <div>
            <p>INTRODUCTION</p>
          </div>
          <div className="border">
            {/*<img src={line}/>*/}
          </div>
        </div>
        <Row class="news" type="flex" justify="center" align="middle">
          <div className="introduction-container">
            <div className="introduction-video">
              <p className="title">OpenNetLab 2.0 – The Next-Gen Platform for AI-assisted Networking </p>
              <video src="https://onlweb.blob.core.windows.net/onl-introduction/%E5%BE%AE%E8%BD%AFMG1020%E6%94%B9.mp4?sp=r&st=2021-11-10T09:32:29Z&se=2022-11-10T17:32:29Z&spr=https&sv=2020-08-04&sr=b&sig=m9H1gARN7hjQ4G6cggSV4%2FpClH6tzbQ7gx8DRvdX6ns%3D" width="100%" controls></video>
            </div>
            <div>
              <div className="introduction-square-container">
                <a href="https://github.com/OpenNetLab/AlphaRTC" target="_blank">
                  <div className="square">
                    <img src={vector} className="vector-git" />
                    <p className="title">OpenNetLab<br />AlphaRTC</p>
                  </div>
                </a>
              </div>
              <div className="introduction-square-container">
                <a href="https://github.com/OpenNetLab/gym" target="_blank">
                  <div className="square">
                    <img src={vector} className="vector-git" />
                    <p className="title">OpenNetLab<br />Gym</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </div>
      <div className="line">
        <div>
          <p>NEWS</p>
        </div>
        <div className="border">
          {/*<img src={line}/>*/}
        </div>
      </div>
      <Row class="news" type="flex" justify="center" align="middle">
        <div className="news-container">
          <div className="news-pic">
            <img className="photo" src={photo} />
          </div>
          <div className="news-text">
            <p className="title">Microsoft Research Asia partners with universities in Asia to build OpenNetLab, empowering AI-assisted networking research</p>
            <p className="description">BEIJING, 19 January 2021 – Microsoft Research Asia announced the establishment of OpenNetLab, an open networking community and platform in collaboration with multiple universities in Asia, including academia from China, Korea and Singapore.<br /><br />
              OpenNetLab is a network research community project. Its aims to promote the application and development of artificial intelligence (AI) in networking research by providing researchers with a universal distributed network testing platform and real network evaluation datasets. Ultimately, they hope to create a healthy and sustainable networking research ecosystem.
            </p>
            <a href="https://news.microsoft.com/apac/2021/01/19/microsoft-research-asia-partners-with-universities-in-asia-to-build-opennetlab-empowering-ai-assisted-networking-research/" className="links" target="_blank">VIEW MORE</a>
            <img className="arrow" src={arrow} />
            <img className="arrow" src={arrow} />
            {/*<div>*/}
            {/*  <img className="ellipse" src={ellipse1}/>*/}
            {/*  <img className="ellipse" src={ellipse2}/>*/}
            {/*  <img className="ellipse" src={ellipse3}/>*/}
            {/*</div>*/}
          </div>
        </div>
      </Row>
      <div className="line">
        <div>
          <p>FEATURES</p>
        </div>
        <div className="border">
          {/*<img src={line}/>*/}
        </div>
      </div>
      <Row class="features" type="flex" justify="center" align="middle">
        <div className="features-container">
          <div className="background-features">
            <img className="icon" src={icon1} />
            <p className="title">
              Contributing to the research community
            </p>
            <p className="description">
              Platform: Free to the networking research community Dataset: Published to GitHub for researchers to reproduce the experiments and train models
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon2} />
            <p className="title">
              Data centric for networking-related AI
            </p>
            <p className="description">
              Automatic data collection Automatic data storing Automatic data aggregation Automatic data sharing
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon3} />
            <p className="title">
              Real Applications
            </p>
            <p className="description">
              Real Time Communication Video/Data Streaming Web Service/CDN Other networking applications
            </p>
          </div>
          <div className="background-features">
            <img className="icon" src={icon4} />
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
        <a href="/join"><img className="join" src={join} /></a>
      </div>
      <img className="bg-bottom" src={bgBottom} />
      <div className="about-join-container">
        <div className="footer-landing">
          <div className="footer-container">
            <div className="footer-logo">
              {
                Setting.isMobile() ? null : <img className="logo-solo" src={logo} />
              }
              <div className="logo-title">
                <p className="logo-title-big">OpenNetLab</p>
                <p className="logo-title-small">© 2021 OpenNetLab. All Rights Reserved.</p>
              </div>
            </div>
            <div className="footer-contact">
              <p className="contactUs">
                Welcome to Contact us
              </p>
              <a className="email">
                contact@opennetlab.org
              </a>
            </div>
            <ul className="nav">
              <li className="nav-item">
                <a href="/about">ABOUT US</a>
              </li>
              <li className="nav-item">
                <a href="/join">JOIN US</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Landing;
