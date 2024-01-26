// // test/SimpleAuction.js
// const web3 = require('web3');
// const SimpleAuction = artifacts.require("SimpleAuction");


// contract('SimpleAuction', async function(accounts) {

//   /**
//   * TimeTravel function - can move this to helper file
//   * https://www.reddit.com/r/ethdev/comments/6n65ar/using_testrpc_and_truffles_built_in_js_tests_how/dk7357l/
//   */
//   const timeTravel = async function (time) {
//     return new Promise((resolve, reject) => {
//       web3.currentProvider.send({
//         jsonrpc: "2.0",
//         method: "evm_increaseTime",
//         params: [time], // time is in seconds
//         id: new Date().getTime()
//       }, (err, result) => {
//         if (err) {
//           return reject(err);
//         }
//         return resolve(result);
//       });
//     });
//   };

//   let SimpleAuction_instance;
//   let highest_bid = 2; // ether
//   let bob         = accounts[1];
//   let alice       = accounts[2];
//   let john        = accounts[3];
//   let beneficiary = accounts[accounts.length - 1]; // last account in Ganache
//   let beneficiary_initial_balance;

//   beforeEach(async function() {
//     SimpleAuction_instance = await SimpleAuction.new(300, beneficiary);

//     let bib_balance_wei = await web3.eth.getBalance(beneficiary);
//     let bib_balance_eth = web3.fromWei(web3.toDecimal(bib_balance_wei), "ether");
//     beneficiary_initial_balance = parseInt(bib_balance_eth);
//   })

//   it("Bob bids with 1 ETH", async function() {
//     await SimpleAuction_instance.bid({from: bob, value: web3.toWei(1, "ether")})
//     let SimpleAuction_balance_wei = await web3.eth.getBalance(SimpleAuction_instance.address);
//     let SimpleAuction_balance_eth = web3.fromWei(web3.toDecimal(SimpleAuction_balance_wei), "ether");
//     assert.equal(SimpleAuction_balance_eth, 1);
//   })

//   it("Alice bids with 2 ETH", async function() {
//     await SimpleAuction_instance.bid({from: alice, value: web3.toWei(highest_bid, "ether")})
//     let SimpleAuction_balance_wei = await web3.eth.getBalance(SimpleAuction_instance.address);
//     let SimpleAuction_balance_eth = web3.fromWei(web3.toDecimal(SimpleAuction_balance_wei), "ether");
//     assert.equal(SimpleAuction_balance_eth, 3);
//   })

//   it("Bob can withdraw his 1 ETH back", async function() {
//     await SimpleAuction_instance.withdraw({from: bob})
//     let SimpleAuction_balance_wei = await web3.eth.getBalance(SimpleAuction_instance.address);
//     let SimpleAuction_balance_eth = web3.fromWei(web3.toDecimal(SimpleAuction_balance_wei), "ether");
//     assert.equal(SimpleAuction_balance_eth, highest_bid);
//   })

//   it("Anyone can end the auction when it's due", async function() {
//     await timeTravel(300);
//     await SimpleAuction_instance.auctionEnd({from: john});
//   })

//   it("Contract balance left with 0 ETH", async function() {
//     let SimpleAuction_balance_wei = await web3.eth.getBalance(SimpleAuction_instance.address);
//     let SimpleAuction_balance_eth = web3.fromWei(web3.toDecimal(SimpleAuction_balance_wei), "ether");
//     assert.equal(SimpleAuction_balance_eth, 0);
//   })

//   it("And beneficiary is now 2 ETH richer", async function() {
//     let bib_balance_wei = await web3.eth.getBalance(beneficiary);
//     let bib_balance_eth = web3.fromWei(web3.toDecimal(bib_balance_wei), "ether");
//     let expected_new_beneficiary_balance = beneficiary_initial_balance + highest_bid;
//     assert.equal(expected_new_beneficiary_balance, bib_balance_eth);
//   })

// })