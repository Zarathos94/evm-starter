import { Col, Divider, Row } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import tryToDisplay from "./utils";
import EthCrypto from "eth-crypto";
import * as ethUtil from "ethereumjs-util";

const DisplayVariable = ({ contractFunction, functionInfo, refreshRequired, triggerRefresh }) => {
  const [variable, setVariable] = useState("");

  const Decrypt = async str => {
    const pKey = localStorage.getItem("privateKey");
    try {
      if (!ethUtil.isValidPrivate(Buffer.from(pKey, "hex"))) {
        console.log("Invalid private key");
        return null;
      }
      const decrypted = await EthCrypto.decryptWithPrivateKey(pKey, str);
      const decryptedPayload = JSON.parse(decrypted);
      if (!decryptedPayload) return null;
      return decryptedPayload;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const refresh = useCallback(async () => {
    try {
      const funcResponse = await contractFunction();
      const decrypted = await Decrypt(funcResponse, localStorage.getItem("privateKey"));
      setVariable(decrypted.message);
      triggerRefresh(false);
    } catch (e) {
      console.log(e);
    }
  }, [setVariable, contractFunction, triggerRefresh]);

  useEffect(() => {
    refresh();
  }, [refresh, refreshRequired, contractFunction]);

  return (
    <div>
      <Row>
        <Col
          span={8}
          style={{
            textAlign: "right",
            opacity: 0.333,
            paddingRight: 6,
            fontSize: 24,
          }}
        >
          {functionInfo.name}
        </Col>
        <Col span={14}>
          <h2>{tryToDisplay(variable)}</h2>
        </Col>
        <Col span={2}>
          <h2>
            <a href="#" onClick={refresh}>
              🔄
            </a>
          </h2>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default DisplayVariable;
