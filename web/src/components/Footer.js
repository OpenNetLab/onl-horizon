import React from "react";
import "../styles/AboutPage.scss";
import * as Setting from "../utils/Setting";
import logo from "../assets/ONL-Logo.png";

export default function Footer() {
  return (
    <div className="footer">
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
          {/* <li className="nav-item">
            <a href="#">Links</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}