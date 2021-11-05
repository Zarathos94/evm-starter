pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
// import "@openzeppelin/contracts/access/Ownable.sol"; 
// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract RallyAssignment {

  event sendMessage(address sender, string purpose);

  string public message = "Some default message";

  constructor() {
    // what should we do on deploy?
  }

  function setMessage(string memory newMessage) public {
      message = newMessage;
      console.log(msg.sender,"set message to",message);
      emit sendMessage(msg.sender, message);
  }
  
}
