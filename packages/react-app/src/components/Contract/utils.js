import React from "react";
import { Address } from "..";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
const { utils } = require("ethers");

function IsEncryptedJsonString(str, key) {
  try {
    JSON.parse(AES.decrypt(str, key).toString(CryptoJS.enc.Utf8));
    console.log(AES.decrypt(str, key).toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return false;
  }
  return true;
}

const tryToDisplay = (thing, privateKey) => {
  if (thing && thing.toNumber) {
    try {
      return thing.toNumber();
    } catch (e) {
      return "Ξ" + utils.formatUnits(thing, "ether");
    }
  }
  if (thing && thing.indexOf && thing.indexOf("0x") === 0 && thing.length === 42) {
    return <Address address={thing} fontSize={22} />;
  }
  return IsEncryptedJsonString(thing, privateKey)
    ? JSON.parse(AES.decrypt(thing, privateKey).toString(CryptoJS.enc.Utf8)).msg
    : JSON.stringify(thing);
};

export default tryToDisplay;
