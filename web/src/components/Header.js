import React, {useContext} from "react";
import * as Setting from "../utils/Setting";
import {Avatar} from "antd";
import "../styles/AboutPage.scss";
import {MsalContext} from "@hsluoyz/msal-react";

export default function Header () {
  const msalContext = useContext(MsalContext);
  console.log(msalContext.accounts);

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
    <div className="header-container">
      <div>
        {
          Setting.isMobile() ? null : <a className="logo" href={"/"} />
        }
      </div>
      <ul className="nav">
        {/* <li className="nav-item">
          <a href="#">RESEARCH</a>
        </li>
        <li className="nav-item">
          <a href="#">DATA</a>
        </li> */}
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
  );
}
