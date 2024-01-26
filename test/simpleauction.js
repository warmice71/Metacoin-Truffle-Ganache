const sa = artifacts.require("SimpleAuction");
const {time} = require('@openzeppelin/test-helpers');
// const truffleAssert = require('truffle-assertions');
contract('SimpleAuction', async function(accounts) {

  var AuctionInstance;
  var highest_bid = 2; // ether
  var bob         = accounts[1];
  var alice       = accounts[2];
  var john        = accounts[3];
  var beneficiary = accounts[accounts.length - 1]; // last account in Ganache
  var beneficiary_initial_balance;
  before(async function() {
    AuctionInstance = await sa.new(300, beneficiary);
    var bib_balance_wei = await web3.eth.getBalance(beneficiary);
    var bib_balance_eth = web3.utils.fromWei(bib_balance_wei, "ether");
    beneficiary_initial_balance = parseFloat(bib_balance_eth);
    console.log("money " + beneficiary_initial_balance) ;
})
  it("Bob bids with 1 ETH", async function() {
    await AuctionInstance.bid({from: bob, value: web3.utils.toWei('1', "ether")});
    var sa_balance_wei = await web3.eth.getBalance(AuctionInstance.address);
    var sa_balance_eth = web3.utils.fromWei(sa_balance_wei, "ether");
    assert.equal(sa_balance_eth, '1');
});
it("Alice bids with 2 ETH", async function() {
    await AuctionInstance.bid({from: alice, value: web3.utils.toWei('2', "ether")});
    var sa_balance_wei = await web3.eth.getBalance(AuctionInstance.address);
    var sa_balance_eth = web3.utils.fromWei(sa_balance_wei, "ether");
    assert.equal(sa_balance_eth, '3');
    //  await truffleAssert.eventEmitted(AuctionInstance, 'HighestBidIncreased', (ev) => {
    //    console.log("emitted");
    //  });
});
it("Bob can withdraw his 1 ETH back", async function() {
    await AuctionInstance.withdraw({from: bob});
    var sa_balance_wei = await web3.eth.getBalance(AuctionInstance.address);
    var sa_balance_eth = web3.utils.fromWei(sa_balance_wei, "ether");
    assert.equal(sa_balance_eth, '2'); // Assuming 'highest_bid' is 2
});
it("Anyone can end the auction when it's due", async function() {
  await time.increase(time.duration.hours(1));
    await AuctionInstance.auctionEnd({from: john});
});
it("Contract balance left with 0 ETH", async function() {
    var sa_balance_wei = await web3.eth.getBalance(AuctionInstance.address);
    var sa_balance_eth = web3.utils.fromWei(sa_balance_wei, "ether");
    assert.equal(sa_balance_eth, '0');
});
it("And beneficiary is now 2 ETH richer", async function() {
    var bib_balance_wei = await web3.eth.getBalance(beneficiary);
    var bib_balance_eth = web3.utils.fromWei(bib_balance_wei, "ether");
    var expected_new_beneficiary_balance = parseFloat(beneficiary_initial_balance) + parseFloat(highest_bid);
    assert.equal(expected_new_beneficiary_balance.toString(), bib_balance_eth.toString());
});
})