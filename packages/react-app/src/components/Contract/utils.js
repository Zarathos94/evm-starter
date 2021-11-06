import React from "react";
import { Address } from "..";
import EthCrypto from "eth-crypto";
const { utils } = require("ethers");
import * as ethUtil from "ethereumjs-util";

const tryToDisplay = thing => {
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
  return thing ? thing : "Private message";
};

export default tryToDisplay;
