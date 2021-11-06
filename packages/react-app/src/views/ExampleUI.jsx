import { utils } from "ethers";
import { Button, Divider, Input } from "antd";
import React, { useState } from "react";
import { Address, Balance, Events } from "../components";
import EthCrypto from "eth-crypto";
export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
  userSigner,
}) {
  const [newMessage, setNewMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Example UI:</h2>
        <h4>Message: {purpose}</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder="Private Key"
            size="large"
            autoComplete="off"
            value={privateKey}
            name="PrivateKey"
            onChange={event => {
              setPrivateKey(event.target.value);
            }}
          />
        </div>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder="Message"
            onChange={e => {
              setNewMessage(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* call setMessage on your contract: */
              localStorage.setItem("privateKey", privateKey.toString());
              const signature = EthCrypto.sign(privateKey, EthCrypto.hash.keccak256(newMessage));
              const encrypted = await EthCrypto.encryptWithPublicKey(
                EthCrypto.publicKeyByPrivateKey(privateKey),
                JSON.stringify({
                  message: newMessage,
                  signature,
                }),
              );
              const result = tx(
                writeContracts.RallyAssignment.setMessage(
                  EthCrypto.cipher.stringify(encrypted),
                  //AES.encrypt(JSON.stringify({ msg: newMessage }), privateKey.toString()).toString(),
                ),
                update => {
                  console.log("📡 Transaction Update:", update);
                  if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                      " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                  }
                },
              );
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Send Message!
          </Button>
        </div>
        <Divider />
        Your Address:
        <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        {/* <Divider /> */}
        {/* ENS Address Example: */}
        {/* <Address
          address="0x34aA3F359A9D614239015126635CE7732c18fDF3" /* this will show as austingriffith.eth
          ensProvider={mainnetProvider}
          fontSize={16}
        /> */}
        {/* <Divider /> */}
        {/* use utils.formatEther to display a BigNumber: */}
        <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2>
        <div>OR</div>
        <Balance address={address} provider={localProvider} price={price} />
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        <h2>Your Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h2>
        <Divider />
        Your Contract Address:
        <Address
          address={readContracts && readContracts.RallyAssignment ? readContracts.RallyAssignment.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
      </div>

      <Events
        contracts={readContracts}
        contractName="RallyAssignment"
        eventName="sendMessage"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
        privateKey={privateKey}
        signer={userSigner}
      />
    </div>
  );
}
