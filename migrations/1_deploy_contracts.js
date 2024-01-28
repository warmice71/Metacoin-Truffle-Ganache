const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Ballot =  artifacts.require("Ballot")
const SimpleAuction = artifacts.require("SimpleAuction")
const BlindAuction = artifacts.require("BlindAuction")


module.exports = function(deployer) {
  const proposalName = ["name1", "name2"].map(name => web3.utils.asciiToHex(name));

  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Ballot, proposalName);
  deployer.deploy(SimpleAuction,300, "0xf82eADBe87C2153001540b84E1410D61661E462a");
  deployer.deploy(BlindAuction, 300, 300, "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");
};
