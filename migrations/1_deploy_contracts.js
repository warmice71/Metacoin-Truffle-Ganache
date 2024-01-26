const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Ballot =  artifacts.require("Ballot")
// const SimpleAuction = artifacts.require("SimpleAuction")


module.exports = function(deployer) {
  const proposalName = ["name1", "name2"].map(name => web3.utils.asciiToHex(name));

  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Ballot, proposalName);
  // deployer.deploy(SimpleAuction,300, "0xe6ebc74aa685527a83c9e0df01b21acf0a1e8286");
};
