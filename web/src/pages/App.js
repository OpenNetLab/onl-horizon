import React, { Component } from 'react';
import '../styles/App.less';
import * as Setting from "../utils/Setting";
import {
  CloseCircleTwoTone, DatabaseOutlined,
  DownOutlined, FileAddOutlined,
  HomeOutlined,
  InfoCircleTwoTone,
  LogoutOutlined, PlusOutlined,
  SettingOutlined,
  FileSearchOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Avatar, BackTop, Button, Dropdown, Layout, Menu, Modal } from 'antd';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import * as http from '../backend/http';
import { getUser, getChallengeId } from "../backend/api";
import HomePage from "./home/HomePage";
// import CreateJobPage from "./create-job/CreateJobPage";
// import JobListPage from "./job-list/JobListPage";
import AccountPage from "./account/AccountPage";
// import JobDetail from "./job-list/JobDetailPage";
// import ChallengeDashboard from './challenge/ChallengeDashboard';
// import CreateChallenge from './challenge/CreateChallenge';
import jobRoutes from "../routes/jobRoutes";
import challengeRoutes from "../routes/challengeRoutes";
import adminRoutes from "../routes/adminRoutes";
import AuthRoute from "../components/AuthRoute";

import { MsalContext } from "@hsluoyz/msal-react";
import { loginRequest } from "../auth/authConfig";
import { isJobAccessible, isChallengeAccessible, isAdmin } from "../utils/Setting";
import Footer from "../components/Footer";
import "../styles/index.scss";
import { urlAlphabet } from 'nanoid';
import logo from '../assets/ONL-Logo.png';
import { imgBaseUrl } from '../utils/Setting';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const human = `${imgBaseUrl}human.png`;
const box = `${imgBaseUrl}pic-box.png`;

// todo: divide the code
class App extends Component {
  static contextType = MsalContext;

  // state = {
  //   selectedMenuKey: 0,
  //   isForbidden: false,
  // }

  // error bounding
  static getDeriveStateFromError(error) {
    console.log(error);
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      selectedMenuKey: 0,
      isForbidden: false,
    };

    Setting.initServerUrl();
  }

  // Deal with state: selectedMenuKey
  getMenuKey() {
    // eslint-disable-next-line no-restricted-globals
    const uri = location.pathname;
    if (uri === '/home') {
      return "0";
    } else if (uri.includes('jobs/create')) {
      return "1";
    } else if (uri.includes('jobs')) {
      return "2";
    } else if (uri.includes('challenge')) {
      return "3";
    } else if (uri.includes('howto')) {
      return "4";
    } else if (uri.includes('admin')) {
      return "8";
    } else {
      return "-1";
    }
  }

  updateMenuKey() {
    this.setState({ selectedMenuKey: this.getMenuKey() });
  }

  //todo: change hook render?
  componentWillMount() {
    this.updateMenuKey();
  }

  // fix: menu select issue
  componentWillReceiveProps() {
    this.updateMenuKey();
  }

  componentDidMount() {
    console.log(isJobAccessible());
  }
  // login and out
  login = () => {
    localStorage.removeItem("avatar");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("operation");
    localStorage.removeItem("challengeId");

    this.context.instance.loginPopup(loginRequest)
      .then(() => {
        // Setting.showMessage("success", `Signed in successfully, return to the previous page..`);
        getUser()
          .then(() => {
            http.getAvatar()
              .then(() => {
                window.location.reload();

              })
              .catch(error => {
                window.location.reload();
              });
          })
          .catch(err => {
            this.setState({
              isForbidden: true
            });
          });
        // set challenge ID in local storage
        getChallengeId();
        // this.props.history.push(window.location.url);
      })
      .catch(error => {
        // Setting.showMessage("error", `Signing in failed: ${error}`);
      });
    // this.context.instance.loginRedirect(loginRequest);
    // this.context.instance.handleRedirectPromise(()=>{
    //   getUser()
    //     .then(() => {
    //       http.getAvatar()
    //         .then(() => {
    //           window.location.reload();
    //
    //         })
    //         .catch(error => {
    //           window.location.reload();
    //         });
    //     })
    //     .catch(err => {
    //       this.setState({
    //         isForbidden: true,
    //       });
    //     });
    //   // set challenge ID in local storage
    //   getChallengeId();
    //   // this.props.history.push(window.location.url);
    // });
  };

  logout = () => {
    localStorage.removeItem("operations");
    localStorage.removeItem("challengeId");
    const logoutRequest = {
      account: Setting.getAccount(this.context)
    };

    this.context.instance.logout(logoutRequest)
      .then(() => {
        // Setting.showMessage("success", `Signed out successfully, return to homepage page..`);
      });

    // AccountBackend.logout()
    //   .then((res) => {
    //     if (res.status === 'ok') {
    //       this.setState({
    //         account: null
    //       });
    //
    //       Setting.showMessage("success", `Successfully logged out, redirected to homepage`);
    //
    //       Setting.goToLink("/");
    //     } else {
    //       Setting.showMessage("error", `Logout failed: ${res.msg}`);
    //     }
    //   });
  }

  // handle account menu in header
  handleRightDropdownClick = e => {
    if (e.key === '0') {
      this.props.history.push(`/account`);
    } else if (e.key === '1') {
      this.logout();
    }
  }

  // Avatar in RightDropDown, inside renderRightDropdown
  renderAvatar() {
    const account = Setting.getAccount(this.context);
    const imageSrc = Setting.getAvatarSrc();

    if (imageSrc === "") {
      return (
        <Avatar size="large" style={{ backgroundColor: Setting.getAvatarColor(account.name), verticalAlign: 'middle' }}>
          {Setting.getFirstName(account.name)}
        </Avatar>
      );
    } else {
      return (
        <Avatar size="large" src={imageSrc} />
      );
    }
  }

  // account menu in header, inside renderAccount
  renderRightDropdown() {
    const account = Setting.getAccount(this.context);

    const menu = (
      <Menu onClick={this.handleRightDropdownClick}>
        <Menu.Item key='0'>
          <SettingOutlined />
          My Account
        </Menu.Item>
        <Menu.Item key='1'>
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown key="4" overlay={menu} >
        <a className="ant-dropdown-link" href="#" style={{ float: 'right' }}>
          {
            this.renderAvatar()
          }
          &nbsp;
          &nbsp;
          <span style={{ fontWeight: "bold", color: "white" }}>{Setting.isMobile() ? null : account.name}</span> &nbsp; <DownOutlined />
          &nbsp;
          &nbsp;
          &nbsp;
        </a>
      </Dropdown>
    );
  }

  // check if account ? renderRightDropDown : Login button, inside renderContent
  renderAccount() {
    const account = Setting.getAccount(this.context);

    let res = [];

    if (account !== null) {
      res.push(this.renderRightDropdown());
    } else {
      // res.push(
      //   <Menu.Item key="1" style={{float: 'right', marginRight: '20px'}}>
      //     <a href="/register">
      //       Register
      //     </a>
      //   </Menu.Item>
      // );
      res.push(
        <Menu.Item key="2" style={{ float: 'right' }}>
          <div onClick={this.login}>
            Login
          </div>
        </Menu.Item>
      );
      // res.push(
      //   <Menu.Item key="4" style={{float: 'right'}}>
      //     <a href="/">
      //       Home
      //     </a>
      //   </Menu.Item>
      // );
    }

    return res;
  }

  // todo: ?
  //  inside RenderContent
  renderMenu = () => {
    let res = [];
    return res;
  }

  // left nav menu, inside renderContent
  renderLeftMenu() {
    return (
      <Menu
        // onClick={this.handleClick.bind(this)}
        // style={{ width: 256 }}
        // selectedKeys={[this.getMenuKey()]}
        // defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        style={{ height: '100%', borderRight: 0, paddingTop: '50px' }}
        selectedKeys={this.state.selectedMenuKey}
        // How to remove padding in Ant Design menu?
        // https://stackoverflow.com/questions/51050707/how-to-remove-padding-in-ant-design-menu/51064320
        inlineIndent={10}
      // theme="dark"
      >
        <Menu.Item key="0" onClick={() => this.props.history.push("/home")}>
          <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
            <HomeOutlined />
            Home
          </div>
        </Menu.Item>
        {
          !Setting.isJobAccessible() ? null :
            <>
              <Menu.Item key="1" onClick={() => this.props.history.push("/jobs/create")}>
                <div style={{paddingLeft: "10px", fontWeight: "bold"}}>
                  <FileAddOutlined />
                  Create Job
                </div>
              </Menu.Item>
              <Menu.Item key="2" onClick={() => this.props.history.push("/jobs")}>
                <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                  <DatabaseOutlined />
                  Job List
                </div>
              </Menu.Item>
            </>
        }
        {/* <SubMenu key="3" title="Activity" icon={<PlusOutlined />} style={{ paddingLeft: "10px", fontWeight: "bold" }}>
          {
            !Setting.isChallengeAccessible() ? null :
              <Menu.Item key="4" onClick={() => this.props.history.push("/challenge")}>
                Challenge
              </Menu.Item>
          }
          {
            !Setting.isChallengeAccessible() ? null :
              <Menu.Item key="5" onClick={() => this.props.history.push("/howto")}>
                How to Challenge
              </Menu.Item>
          }
          {
            !Setting.isCourseAccessible() ? null :
              <Menu.Item key="6" onClick={() => this.props.history.push("/course")}>
                Course
              </Menu.Item>
          }
        </SubMenu> */}
        {
          !Setting.isChallengeAccessible() ? null :
            <Menu.Item key="3" onClick={() => window.location.href = "/challenge"}>
              <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                <FileAddOutlined />
                Challenge
              </div>
            </Menu.Item>
        }
        {/* {
          !Setting.isChallengeAccessible() ? null :
            <Menu.Item key="4" onClick={() => this.props.history.push("/howto")}>
              <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                <FileSearchOutlined />
                How to Challenge
              </div>
            </Menu.Item>
        } */}
        {
          !Setting.isCourseAccessible() ? null :
            <Menu.Item key="6" onClick={() => this.props.history.push("/course")}>
              <div style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                <DatabaseOutlined />
                Course
              </div>
            </Menu.Item>
        }
        {
          !Setting.isAdmin() ? null :
            <SubMenu key="8" title="Admin" icon={<UserAddOutlined />} style={{ paddingLeft: "10px", fontWeight: "bold" }}>
            </SubMenu>
        }
        <img className="human" src={human} />
        <img className="box" src={box} />
      </Menu>
    );
  }

  // check if the page is start page
  isStartPages = () => {
    return window.location.pathname.startsWith('/login') ||
      window.location.pathname.startsWith('/register') ||
      window.location.pathname === '/';
  }

  // render the whole page
  renderContent() {
    return (
      <Layout>
        <Header style={{ padding: '0', marginBottom: '3px' }}>
          <a href="/">
            <img className="logo-new" src={logo} />
            <p className="logo-new-title">OpenNetLab</p>
          </a>
          <Menu
            // theme="dark"
            mode={(Setting.isMobile() && this.isStartPages()) ? "inline" : "horizontal"}
            // defaultSelectedKeys={[`${this.state.selectedMenuKey}`]}
            selectedKeys={[]}
            style={{ lineHeight: '64px' }}
          >
            {/* {
              this.renderMenu()
            } */}
            <a href="/about" className="menu-about">ABOUT US</a>
            <a href="/join" className="menu-join">JOIN US</a>
            {
              this.renderAccount()
            }
          </Menu>
        </Header>
        <Layout style={{ minHeight: 900 }}>
          <Sider breakpoint="lg" width={200}>
            {
              this.renderLeftMenu()
            }
          </Sider>
          <Layout style={{ padding: '24px 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 64,
                margin: 0,
                minHeight: 300,
                overflow: 'auto'
              }}
            >
              <Switch>
                <Route exact path="/home" component={HomePage} />
                {jobRoutes.map(
                  (route) => <AuthRoute key={route.path} operation={isJobAccessible()} {...route} />
                )}
                {challengeRoutes.map(
                  (route) => <AuthRoute key={route.path} operation={isChallengeAccessible()} {...route} />
                )}
                {adminRoutes.map(
                  (route) => <AuthRoute key={route.path} operation={isAdmin()} {...route} />
                )}
                {/*<Route exact path="/jobs/create" component={CreateJobPage}/>*/}
                {/*<Route exact path="/jobs" component={JobListPage}/>*/}
                {/*<Route path="/jobs/detail/:id" component={JobDetail}/>*/}
                <Route exact path="/account" component={AccountPage} />
                {/*<Route exact path="/challenge" component={ChallengeDashboard}/>*/}
                {/*<Route exact path="/challenge/create" component={CreateChallenge}/>*/}
                <Redirect to="/home" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  // render the footer
  // renderFooter() {
  //   // How to keep your footer where it belongs ?
  //   // https://www.freecodecamp.org/neyarnws/how-to-keep-your-footer-where-it-belongs-59c6aa05c59c/

  //   return (
  //     <Footer id="footer" style={
  //       {
  //         borderTop: '1px solid #e8e8e8',
  //         backgroundColor: 'white',
  //         textAlign: 'center',
  //       }
  //     }>
  //       Made with <span style={{color: 'rgb(255, 255, 255)'}}>??????</span> by <a style={{fontWeight: "bold", color: "black"}} target="_blank" href="https://opennetlab.org">OpenNetLab</a>
  //     </Footer>
  //   );
  // }

  // render modal
  renderModal() {
    if (Setting.getAccount(this.context) === null) {
      return (
        <Modal
          title={
            <div>
              <InfoCircleTwoTone style={{ marginRight: "10px" }} twoToneColor={"rgb(43,121,215)"} />
              Please login first to view this website
            </div>
          }
          visible={true}
          closable={false}
          footer={[
            <Button key="login" type="primary" onClick={this.login}>
              Login
            </Button>,
          ]}
        >
          The platform for challenge user is released.<br />
          If you are a university professor or an institute researcher and willing to participate in the OpenNetLab project as a university/institute,<br />
          please email us: feedback(at)opennetlab.org
        </Modal>
      );
    }

    const isForbidden = this.state.isForbidden === true || localStorage.getItem("userId") === "forbidden";
    if (isForbidden) {
      return (
        <Modal
          title={
            <div>
              <CloseCircleTwoTone style={{ marginRight: "10px" }} twoToneColor={"rgb(225,107,88)"} />
              Please sign up to visit the website, or re-login to get the latest permissions.
            </div>
          }
          visible={true}
          closable={false}
          footer={[
            <Button key="signup" type="primary" onClick={() => this.props.history.push("/signup")}>
              Signup
            </Button>,
            <Button key="logout" type="default" onClick={this.logout}>
              Logout
            </Button>,
          ]}
        >
          The platform for challenge user is released.<br />
          If you are a university professor or an institute researcher and willing to participate in the OpenNetLab project as a university/institute,<br />
          please email us: feedback(at)opennetlab.org
        </Modal>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="parent-area">
        <div className="page">
          {
            this.renderContent()
          }
          {
            this.renderModal()
          }
        </div>
        <BackTop />
        <div className="home-footer">
          <div className="about-join-container">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
