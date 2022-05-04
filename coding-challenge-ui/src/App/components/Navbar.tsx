import { memo } from "react";
import { Menu, Row, Col } from "antd";

const Navbar = () => {
  return (
    // <Row style={{ width: "100%" }}>
    //   <Menu mode="horizontal">
    //     <Col span={8}>
    //       <Menu.Item key="analytics-dashboard">
    //         <h1>Analytics Dashboard</h1>
    //       </Menu.Item>
    //     </Col>
    //     <Col span={8} offset={8} style={{ textAlign: "right" }}>
    //       <Menu.Item key="welcome-user">
    //         <p>Welcome, Jane!</p>
    //       </Menu.Item>
    //     </Col>
    //   </Menu>
    // </Row>
    <Row style={{ width: "100%" }}>
      <Col span={8}>
        <h1>Analytics Dashboard</h1>
      </Col>
      <Col span={8} offset={8} style={{ textAlign: "right" }}>
        <p>Welcome, Jane!</p>
      </Col>
    </Row>
  );
};

export default memo(Navbar);
