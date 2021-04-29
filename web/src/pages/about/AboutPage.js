import React from "react";
import "../../styles/AboutPage.scss";
import { Tabs } from "antd";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function AboutPage () {
  const bgUrl = "https://cdn.jsdelivr.net/gh/OpenNetLab/static@latest/img/";
  const human = `${bgUrl}human.png`;
  const box = `${bgUrl}pic-box.png`;
  const aboutBg = `${bgUrl}about-bg.png`;
  const earth = `${bgUrl}earth.png`;
  const { TabPane } = Tabs;

  return (
    <div className="about-join-container">
      <Header />
      <div className="body-container">
        <div className="content">
          <br />
          <p className="title big-title">ABOUT US</p>
          <div className="row margin-top">
            <img className="pic" src="https://cdn.jsdelivr.net/gh/OpenNetLab/static@latest/img/about-pic1.png"/>
            <div className="text">
              <img className="pic-small" src={human} />
              <img className="pic-box" src={box} />
              <div className="title back">
                Motivation
              </div>
              Leveraging AI to boost network application has attracted much attention in academia and the industry. Currently AI training is data-driven, and training AI models for networking demands massive amounts of real data with different environments. The quality and depth of the data determines the accuracyte level of AI models a researcher can achieve. Until now, real network data have been far from enough to train an ideal model for network application, since the Internet, composed of heterogeneous access devices and switching devices, and transmission media provides a nearly unlimited number of scenarios. For example, RTC application requires precise network estimation to improve its quality of experience (QoE); however, due to network data deficiency, researchers still cannot provide an AI model to adapt to the variance of the bandwidth in the real network. To solve this issue, we are calling for a new research platform – OpenNetLab.
            </div>
          </div>
          <div className="line"></div>
          <div className="row">
            <div className="text">
              <img className="earth" src={earth} />
              <div className="title back">
                Overview
              </div>
              We expect to join hands with communities, universities, and enterprises in an effort to build an open large-scale distributed networking platform as the first step, and then we expect to build a common benchmarking dataset in the networking area, encouraging more and more researchers to join us so that we can boost the networking research base on OpenNetLab and establish a healthy and sustainable networking research ecosystem.
            </div>
            <img className="pic" src="https://cdn.jsdelivr.net/gh/OpenNetLab/static@latest/img/about-pic2.png"/>
          </div>
        </div>
        <div className="content-next">
          <img className="bg" src={aboutBg} />
          <Tabs defaultActiveKey="1" centered size="large">
            <TabPane tab="2021 Members" key="1">
              <div className="title underline back margin-left">
                Board Members
              </div>
              <div className="info">
                <div className="role">
                  Rotating Chair
                </div>
                <div className="name">
                  Chen Tian<br />Nanjing University
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Co-chair
                </div>
                <div className="name">
                  Kaigui Bian<br />Peking University
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Member
                </div>
                <div className="name">
                    Kaigui Bian<br />Peking University<br />
                  <br />
                    Fengyuan Ren<br />Tsinghua University and Lanzhou University<br />
                  <br />
                    Chen Tian<br />Nanjing University
                </div>
                <div className="name">
                    Peng Cheng<br />MSRA<br />
                  <br />
                    Beibei Shi<br />MSRA<br />
                  <br />
                    Yongqiang Xiong<br />MSRA
                </div>
              </div>
              <div className="title underline back margin-left">Technical Committee</div>
              <div className="info">
                <div className="role">
                  Chair
                </div>
                <div className="name">
                  Zhixiong Niu<br />MSRA
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Chief Architect
                </div>
                <div className="name">
                  Rui Gao<br />MSRA
                </div>
              </div>
            </TabPane>
            <TabPane tab="2020 Members" key="2">
              <div className="title underline back margin-left">
                Board Members
              </div>
              <div className="info">
                <div className="role">
                  Rotating Chair
                </div>
                <div className="name">
                Yongqiang Xiong<br />MSRA
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Co-chair
                </div>
                <div className="name">
                  Peng Cheng<br />MSRA
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Member
                </div>
                <div className="name">
                    Kaigui Bian<br />Peking University<br />
                  <br />
                    Fengyuan Ren<br />Tsinghua University and Lanzhou University<br />
                  <br />
                    Chen Tian<br />Nanjing University
                </div>
                <div className="name">
                    Peng Cheng<br />MSRA<br />
                  <br />
                    Beibei Shi<br />MSRA<br />
                  <br />
                    Yongqiang Xiong<br />MSRA
                </div>
              </div>
              <div className="title underline back margin-left">Technical Committee</div>
              <div className="info">
                <div className="role">
                  Chair
                </div>
                <div className="name">
                  Zhixiong Niu<br />MSRA
                </div>
              </div>
              <div className="info">
                <div className="role">
                  Chief Architect
                </div>
                <div className="name">
                  Rui Gao<br />MSRA
                </div>
              </div>
            </TabPane>
          </Tabs>
          <p className="title margin-top">Contributors</p>
          <div className="line"></div>
          <div className="list-container">
            <ul>
              <li className="name" style={{fontSize: 14}}>Hao Chen (MSRA)<br />Outreach</li>
              <li className="name" style={{fontSize: 14}}>Junjie Deng (BUPT, MSRA)<br />AlphaRTC</li>
              <li className="name" style={{fontSize: 14}}>Xuan Feng (PKU, MSRA)<br />Frontend​</li>
              <li className="name" style={{fontSize: 14}}>Ze Gan (MSRA)<br />AlphaRTC</li>
              <li className="name" style={{fontSize: 14}}>Weijie Guo (MSRA)<br />Frontend</li>
              <li className="name" style={{fontSize: 14}}>Yunyun Jiang (MSRA)<br />Outreach</li>
            </ul>
            <ul>
              <li className="name" style={{fontSize: 14}}>Yuting Jiang (NJU, MSRA)<br />Backend</li>
              <li className="name" style={{fontSize: 14}}>Miran Li (MSRA)<br />Outreach</li>
              <li className="name" style={{fontSize: 14}}>Yilin Liu (PKU, MSRA)<br />Backend​​</li>
              <li className="name" style={{fontSize: 14}}>Yang Luo (MSRA)<br />Frontend</li>
              <li className="name" style={{fontSize: 14}}>Xin Ma (MSRA)<br />Outreach</li>
              <li className="name" style={{fontSize: 14}}>Yang Ou (MSRA)<br />Designer</li>
            </ul>
            <ul>
              <li className="name" style={{fontSize: 14}}>Tim Pan (MSRA)<br />Outreach</li>
              <li className="name" style={{fontSize: 14}}>Lily Sun (MSRA)<br />Outreach</li>
              <li className="name" style={{fontSize: 14}}>Yuqi Tang (UCSD)<br />Frontend​</li>
              <li className="name" style={{fontSize: 14}}>Yizhi Wang (NJU)<br />Node Operation and Backend</li>
              <li className="name" style={{fontSize: 14}}>Zhangyang Wei (LZU)<br />Node Operation</li>
              <li className="name" style={{fontSize: 14}}>Yuhui Wei (PKU, MSRA)<br />Backend</li>
            </ul>
            <ul>
              <li className="name" style={{fontSize: 14}}>Zhongyang Xia (MSRA)<br />AlphaRTC</li>
              <li className="name" style={{fontSize: 14}}>Kangjie Xu (SJTU, MSRA)<br />Backend​</li>
              <li className="name" style={{fontSize: 14}}>Yuying Zhang (MSRA)<br />Designer​</li>
              <li className="name" style={{fontSize: 14}}>Yinjie Zhang (PKU)<br />Backend​</li>
              <li className="name" style={{fontSize: 14}}>Yuheng Zou (PKU)<br />Backend​</li>
              <li className="name" style={{fontSize: 14}}>Wanying Zu (MSRA)<br />Designer​</li>
            </ul>
          </div>
          <div className="text center bold">* Sorted by last name</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}