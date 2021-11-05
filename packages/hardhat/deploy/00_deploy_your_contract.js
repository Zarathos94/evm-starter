// deploy/00_deploy_your_contract.js

// const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("RallyAssignment", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ "Hello", ethers.utils.parseEther("1.5") ],
    log: true,
  });
  // Getting a previously deployed contract
  /*
    
    const RallyAssignment = await ethers.getContract("RallyAssignment", deployer);
    await RallyAssignment.setMessage("Hello");
  
    To take ownership of RallyAssignment using the ownable library uncomment next line and add the 
    address you want to be the owner. 

  */
  // RallyAssignment.transferOwnership(YOUR_ADDRESS_HERE);

  // const RallyAssignment = await ethers.getContractAt('RallyAssignment', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!


  // If you want to send value to an address from the deployer
  /*
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */
  // If you want to send some ETH to a contract on deploy (make your constructor payable!)
  /*
  const RallyAssignment = await deploy("RallyAssignment", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */
  // If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/rally-assignment/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19

  /*
  const RallyAssignment = await deploy("RallyAssignment", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["RallyAssignment"];
