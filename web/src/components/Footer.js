import React from "react";
import "../styles/AboutPage.scss";
import * as Setting from "../utils/Setting";

export default function Footer () {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-logo">
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
        <ul className="nav">
          <li className="nav-item">
            <a href="/about">About us</a>
          </li>
          <li className="nav-item">
            <a href="/join">Join us</a>
          </li>
          {/* <li className="nav-item">
            <a href="#">Links</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}