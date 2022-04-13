import React, { useState } from 'react';
import styled from 'styled-components';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/AboutPage.scss";
import nextOne from "../../assets/nextOne.png";
import { imgBaseUrl } from '../../utils/Setting';

export default function JoinPage () {
  const photo1 = `${imgBaseUrl}Group 60.png`;
  const photo2 = `${imgBaseUrl}Group 61.png`;
  const photo3 = `${imgBaseUrl}Group 62.png`;
  const photo4 = `${imgBaseUrl}Group 63.png`;
  const photo5 = `${imgBaseUrl}Group 64.png`;
  const photo6 = `${imgBaseUrl}Group 65.png`;
  const photo7 = `${imgBaseUrl}Group 66.png`;
  const photo8 = `${imgBaseUrl}Group 67.png`;
  const photo9 = `${imgBaseUrl}Group 68.png`;
  const photo10 = `${imgBaseUrl}Group 69.png`;

  var imgUrls = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10];

  const ellipseUrls = [];

  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 48.png`, name: "Hao Chen"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 38.png`, name: "Beibei Shi"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 39.png`, name: "Miran Lee"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 41.png`, name: "Lidong Zhou"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 40.png`, name: "Xin Ma"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 42.png`, name: "Johannes Gehrke"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 47.png`, name: "Yunyun Jiang"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 44.png`, name: "Ru Ma"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 45.png`, name: "Peng Cheng"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 46.png`, name: "Lily Sun"});
  ellipseUrls.push({url: `${imgBaseUrl}Ellipse 43.png`, name: "Yongqiang Xiong"});

  const imgs = imgUrls.map((item, index) => {
    return (
      <div>
        <img className="pic-gallery" src={item} />
      </div>
    );
  });

  const ellipse = ellipseUrls.map((item, index) => {
    return (
      <div className="info-container">
        <img className="pic-info" src={item.url} />
        <div className="names">{item.name}</div>
      </div>
    );
  });

  const Tab = styled.button`
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    color: #062A4E;

    padding: 20px 60px;
    cursor: pointer;
    opacity: 0.6;
    border: 0;
    outline: 0;
    background: #E3E8F0;
    border-radius: 0px 0px 0px 0px;
  ${({ active }) =>
    active &&
    `
    background: #5EE0F6;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
  `}
`;

  const ButtonGroup = styled.div`
    display: flex;
  `;

  const types = ['Main Rights', 'Main Obligation'];

  const [active1, setActive1] = useState(types[0]);
  const [active2, setActive2] = useState(types[0]);
  const [active3, setActive3] = useState(types[0]);

  return (
    <div className="about-join-container">
      <Header />
      <div className="body-container">
        <div className="content">
          <br />
          <p className="title big-title">JOIN US</p>
          <div className="img-container">
            {imgs}
          </div>
          <div className="img-container">
            {ellipse}
          </div>
        </div>
        <div className="join-content-next">
          <div className="tab-container">
            <div className="title underline padding-top" style={{paddingLeft: 0}}>
              Member
            </div>
            <ButtonGroup>
              {types.map(type => (
                <Tab
                  key={type}
                  active={active1 === type}
                  onClick={() => {
                    setActive1(type);
                  }}
                >
                  {type}
                </Tab>
              ))}
            </ButtonGroup>
            {
              active1 === "Main Rights" ? <ul className="join-ul">
                <li>Access the platform, upload applications, and run experiments for research and education purposes;</li>
                <li>Have the right to use the dataset with data agreement, and store and fetch application data from OpenNetLab with owner agreement.</li>
              </ul> : <ul className="join-ul">
                <li>Contribute to the development and operation of ONL and the dataset by running the experiments on the platform;</li>
                <li>Acknowledge the support of ONL and cite/mention ONL explicitly in papers and articles;</li>
                <li>Promote OpenNetLab, and support and participate in OpenNetLab related activities.</li>
              </ul>
            }
            <div className="info-bg">
              <div className="flex-box">
                <div className="title-container">
                  <h1 className="white-title">
                    Want to Become a <a>Member</a>?
                  </h1>
                  <div className="white-info">We welcome all individuals and organizations to join us, especially those who have an interest in or are dedicated to working on network research and education.</div>
                </div>
                <div className="white-info bold">Fill in the <a href="/home">membership application</a> to register, accept the relevant membership terms, and become a member.​</div>
              </div>
            </div>
          </div>
          <div className="tab-container">
            <div className="title underline padding-top" style={{paddingLeft: 0}}>
              General Founding Member
            </div>
            <ButtonGroup>
              {types.map(type => (
                <Tab
                  key={type}
                  active={active2 === type}
                  onClick={() => setActive2(type)}
                >
                  {type}
                </Tab>
              ))}
            </ButtonGroup>
            {
              active2 === "Main Rights" ? <ul className="join-ul">
                <li>Have the right to become a board member through a selection process and then join the ONL Board of Management to lead ONL and ONL Community development;</li>
                <li>Have the right to participate in platform design and implementation;</li>
                <li>Receive priority and preferential rights to access the platform, upload applications, and run experiments for research and education purposes;</li>
                <li>Receive priority and preferential rights to use the dataset with data agreement and, store and fetch application data from OpenNetLab with owner agreement;</li>
                <li>Receive priority in winning sponsorship from the MSRA Joint Research Program.</li>
              </ul> : <ul className="join-ul">
                <li>Provide platform nodes, at least 3 nodes in total and at least 1 node in each network type (wired, wireless, and 4G/5G), for at least three years;</li>
                <li>Contribute to the development and operation of ONL and the dataset by running experiments on the platform;</li>
                <li>Acknowledge the support of ONL and cite/mention ONL explicitly in papers and articles;</li>
                <li>Promote OpenNetLab and, support and participate in OpenNetLab related activities;</li>
                <li>The signing of an MOU is required.​</li>
              </ul>
            }
            <div className="info-bg">
              <div className="title-container">
                <h1 className="white-title">Want to Become a <a>General Founding Member</a>?</h1>
                <div className="white-info">We welcome universities, schools, professors/ researchers, and other organizations to join as General Founding Members, especially those who have an interest in or are dedicated to working on network research and education. Since General Founding Members have certain obligations in resource commitment, students are excluded from this group.</div>
              </div>
              <div className="flex-box-bottom">
                <div className="white-info bold"><a href="/home">Email feedback@opennetlab.org</a><br />to apply to become a General Founding Member.</div>
                <img src={nextOne} />
                <div className="white-info bold center">Receive the MOU documents.</div>
                <img src={nextOne} />
                <div className="white-info bold center">Accept the MOU terms and sign the MOU.</div>
              </div>
            </div>
          </div>
          <div className="tab-container">
            <div className="title underline padding-top" style={{paddingLeft: 0}}>
              Core Founding Member
            </div>
            <ButtonGroup>
              {types.map(type => (
                <Tab
                  key={type}
                  active={active3 === type}
                  onClick={() => setActive3(type)}
                >
                  {type}
                </Tab>
              ))}
            </ButtonGroup>
            {
              active3 === "Main Rights" ? <ul className="join-ul">
                <li>Have the right to become a member of the Board of Management, participate in Board of Management meetings, attend discussions and vote on major decisions and matters regarding the development of ONL, and propose administration principles for OpenNetLab;</li>
                <li>Receive priority and preferential rights on ONL platform design and implementation;</li>
                <li>Receive high priority and preferential rights to access the platform, upload applications, and run experiments for research and education purposes;</li>
                <li>Receive high priority and preferential rights to use the dataset with data agreement, and store and fetch application data from OpenNetLab with owner agreement;</li>
                <li>Receive the priority in winning sponsorship from the MSRA Joint Research Program.</li>
              </ul> : <ul className="join-ul">
                <li>Make continuous contribution to provide nodes, including at least 6 nodes in total and 2 nodes in each network type (wired, wireless, and 4G/5G);</li>
                <li>Dedicate effort to manage and operate the ONL community;</li>
                <li>Contribute to the development and operation of ONL and the dataset by running experiments on the platform;</li>
                <li>Acknowledge the support of ONL and cite/mention ONL explicitly in papers and articles;</li>
                <li>Promote OpenNetLab and support and participate in OpenNetLab related activities;</li>
                <li>The signing of an MOU is required.</li>
              </ul>
            }
            <div className="info-bg">
              <div className="title-container">
                <h1 className="white-title">Want to Become a <a>Core Founding Member</a>?</h1>
                <div className="white-info">Core Founding Members will dedicate great efforts to ONL development.</div>
              </div>
              <div className="flex-box-bottom">
                <div className="white-info bold">Become a General Founding Member for three years.</div>
                <img src={nextOne} />
                <div className="white-info bold">An incumbent General Founding Member may raise the request to the Board of Management to become a Core Founding Member.</div>
                <img src={nextOne} />
                <div className="white-info bold">The request will be announced and voted on during a board meeting.</div>
                <img src={nextOne} />
                <div className="white-info bold">Election of Core Founding Members will be held every three years followed by the signing of an MOU.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}