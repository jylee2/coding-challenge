import { memo } from "react";
import { Row, Col } from "antd";

import "./App.css";

import Navbar from "./components/Navbar";
import OverdueSales from "./components/OverdueSales";

const App = () => {
  return (
    <div style={{ backgroundColor: "silver", width: "100%", height: "100vh" }}>
      <Navbar style={{ width: "100%", backgroundColor: "white" }} />
      <Row>
        <Col style={{ width: "100%" }}>
          <Row style={{ height: "80px" }} />
          <Row>
            <Col span={2} />
            <Col span={20}>
              <OverdueSales
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "20px",
                  backgroundColor: "white",
                  padding: "20px",
                }}
              />
            </Col>
            <Col span={2} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default memo(App);
