import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { Address } from "../components";
import EthCrypto from "eth-crypto";
import * as ethUtil from "ethereumjs-util";
import React, { useState, useEffect } from "react";

/*
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="RallyAssignment"
    eventName="setMessage"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
*/

export default function Events({ contracts, contractName, eventName, localProvider, mainnetProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  const [data, setData] = useState([]);

  useEffect(() => {
    for (let x = 0; x < events.length; x++) {
      Decrypt(events[x].args[1]).then(value => {
        events[x].messageDecrypted = value ? value.message : "Private message!";
      });
      console.log(events[x]);
    }
    setData(events);
  }, [events]);

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

  return (
    <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>Events:</h2>
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber + "_" + item.args.sender + "_" + item.args.message}>
              <Address address={item.args[0]} ensProvider={mainnetProvider} fontSize={16} />
              <br />
              {item.messageDecrypted}
            </List.Item>
          );
        }}
      />
    </div>
  );
}
