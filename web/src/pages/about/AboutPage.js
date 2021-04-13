import React, {useContext} from "react";
import "../../styles/AboutPage.scss";
import * as Setting from "../../utils/Setting";
import {Avatar} from "antd";
import {useHistory} from "react-router-dom";
import {MsalContext} from "@hsluoyz/msal-react";
import { Tabs } from "antd";

export default function AboutPage () {
  const history = useHistory();
  const msalContext = useContext(MsalContext);
  console.log(msalContext.accounts);
  const { TabPane } = Tabs;
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
    <div className="about-container">
      <div className="header-container">
        <div>
          {
            Setting.isMobile() ? null : <a className="logo" href={"/"} />
          }
        </div>
        <ul className="nav">
          <li className="nav-item">
            <a href="#">RESEARCH</a>
          </li>
          <li className="nav-item">
            <a href="#">DATA</a>
          </li>
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
      <div className="body-container">
        <div className="content">
          <p className="title">ABOUT US</p>
          <div className="row">
            <img className="pic" src="https://cdn.jsdelivr.net/gh/OpenNetLab/static@latest/img/about-pic1.png"/>
            <div className="text">
              <div className="title">
                Motivation
              </div>
              Leveraging AI to boost network application has attracted much attention in academia and the industry. Currently AI training is data-driven, and training AI models for networking demands massive amounts of real data with different environments. The quality and depth of the data determines the accuracyte level of AI models a researcher can achieve. Until now, real network data have been far from enough to train an ideal model for network application, since the Internet, composed of heterogeneous access devices and switching devices, and transmission media provides a nearly unlimited number of scenarios. For example, RTC application requires precise network estimation to improve its quality of experience (QoE); however, due to network data deficiency, researchers still cannot provide an AI model to adapt to the variance of the bandwidth in the real network. To solve this issue, we are calling for a new research platform – OpenNetLab.
            </div>
          </div>
          <div className="line"></div>
          <div className="row">
            <div className="text">
              <div className="title">
                Overview
              </div>
              We expect to join hands with communities, universities, and enterprises in an effort to build an open large-scale distributed networking platform as the first step, and then we expect to build a common benchmarking dataset in the networking area, encouraging more and more researchers to join us so that we can boost the networking research base on OpenNetLab and establish a healthy and sustainable networking research ecosystem.
            </div>
            <img className="pic" src="https://cdn.jsdelivr.net/gh/OpenNetLab/static@latest/img/about-pic2.png"/>
          </div>
        </div>
        <div className="content-next">
          <Tabs defultActivekey="1">
            <div className="line"></div>
            <TabPane tab="2021 Members" key="1">
              <div className="title underline">
                Board Members
              </div>
              <div className="info">
                <div className="role">
                  Rotating Chair
                </div>
                <div className="name">
                  Chen Tian
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Co-chair
                </div>
                <div className="name">
                  Kaigui Bian
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Co-chair
                </div>
                <div className="name">
                  Beibei Shi<br />MSRA
                </div>
                <div className="name">
                  Fengyuan Ren<br />Tsinghua University and Lanzhou University
                </div>
              </div>
              <div className="info">
                <div className="name">
                  Chen Tian<br />Nanjing University
                </div>
                <div className="name">
                  Peng Cheng<br />MSRA
                </div>
              </div>
              <div className="info">
                <div className="name">
                  Kaigui Bian<br />Peking University
                </div>
                <div className="name">
                  Yongqiang Xiong<br />MSRA
                </div>
              </div>
              <div className="title underline">Technical Committee</div>
              <div className="info">
                <div className="role">
                  chair
                </div>
                <div className="name">
                  Zhixiong Niu
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Chief Architect
                </div>
                <div className="name">
                  Rui Gao
                </div>
              </div>
            </TabPane>
            <TabPane tab="2020 Members" key="2">
              <div className="title underline">
                Board Members
              </div>
            </TabPane>
          </Tabs>
          <p className="title">Contributors</p>
          <div className="line"></div>
          <div className="list-container">
            <ul>
              <li></li>
            </ul>
            <ul>
              <li></li>
            </ul>
            <ul>
              <li></li>
            </ul>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}