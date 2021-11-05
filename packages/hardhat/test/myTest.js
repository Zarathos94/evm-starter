const { ethers } = require("hardhat");
const { use, expect } = require("chai");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("My Dapp", function () {
  let myContract;

  // quick fix to let gas reporter fetch data from gas station & coinmarketcap
  before((done) => {
    setTimeout(done, 2000);
  });

  describe("RallyAssignment", function () {
    it("Should deploy RallyAssignment", async function () {
      const RallyAssignment = await ethers.getContractFactory("RallyAssignment");

      myContract = await RallyAssignment.deploy();
    });

    describe("setMessage()", function () {
      it("Should be able to set a new message", async function () {
        const newMessage = "Test Message";

        await myContract.setMessage(newMessage);
        expect(await myContract.message()).to.equal(newMessage);
      });

      
      it("Should emit a setMessage event ", async function () {
        const [owner] = await ethers.getSigners();

        const newMessage = "Another Test Message";

        expect(await myContract.setMessage(newMessage)).to.
          emit(myContract, "setMessage").
            withArgs(owner.address, newMessage);
      });
    });
  });
});
