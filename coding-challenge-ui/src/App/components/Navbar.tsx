import { memo, useEffect } from "react";
import { Row, Col } from "antd";

import config from "../config";

const Navbar = () => {
  useEffect(() => {
    (async () => {
      const resp = await fetch(`${config.apiUrl}/user`, {
        method: "GET",
      });

      const body = await resp.json();
      console.log("--------body", body);
    })();
  }, []);

  return (
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
