import { List } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import { Address } from "../components";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

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

export default function Events({
  contracts,
  contractName,
  eventName,
  localProvider,
  mainnetProvider,
  startBlock,
  privateKey,
}) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock, privateKey);

  function IsEncryptedJsonString(str, key) {
    try {
      JSON.parse(AES.decrypt(str, key).toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return false;
    }
    return true;
  }
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
              {IsEncryptedJsonString(item.args[1], privateKey)
                ? JSON.parse(AES.decrypt(item.args[1], privateKey).toString(CryptoJS.enc.Utf8)).msg
                : "Private message!"}
            </List.Item>
          );
        }}
      />
    </div>
  );
}
