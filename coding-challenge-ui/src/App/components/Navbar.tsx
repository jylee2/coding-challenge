import { memo, useReducer, useEffect } from "react";
import { Row, Col } from "antd";

import config from "../config";
import { ACTION } from "../types/types";
import Reducer, { initialState } from "../utils/useStoreReducer";

const Navbar = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`${config.apiUrl}/user`, {
        method: "GET",
      });

      const body = await resp.json();

      if (body) {
        dispatch({ type: ACTION.SET_USER, payload: body });
      }
    })();
  }, []);

  return (
    <Row style={{ width: "100%" }}>
      <Col span={8}>
        <h1>Analytics Dashboard</h1>
      </Col>
      <Col span={8} offset={8} style={{ textAlign: "right" }}>
        <p>
          {state?.loggedInUser
            ? `Welcome, ${state.loggedInUser.firstName}!`
            : `Sign In`}
        </p>
      </Col>
    </Row>
  );
};

export default memo(Navbar);
