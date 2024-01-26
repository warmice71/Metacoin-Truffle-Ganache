// const SimpleAuction = artifacts.require("SimpleAuction");
// contract("SimpleAuction", (accounts) => {
//     let auctionInstance;
//     const deployer = accounts[0];
//     const bidder1 = accounts[1];
//     before(async () => {
//       auctionInstance = await SimpleAuction.new(300, bidder1, { from: deployer });
//     });
//     it('should initialize the beneficiary and auctionEndTime correctly', async () => {
//       const beneficiary = await auctionInstance.beneficiary();
//       const auctionEndTime = await auctionInstance.auctionEndTime();
//       assert.equal(beneficiary, bidder1, 'Beneficiary not initialized correctly');
//       assert.equal(auctionEndTime.toNumber(), 300 + Math.floor(Date.now() / 1000), 'Auction end time not initialized correctly');
//     });
//     it("The highestBid should be increased", async () => {
//       const bidder2 = accounts[2];
//       const bidder3 = accounts[3];
//       // Place bids by different bidders
//       await auctionInstance.bid({ from: bidder2, value: web3.utils.toWei("2", "ether") });
//       await auctionInstance.bid({ from: bidder3, value: web3.utils.toWei("3", "ether") });
//       // Assert that the highest bidder and bid amount are set correctly
//       const highestBidder = await auctionInstance.highestBidder();
//       const highestBid = await auctionInstance.highestBid();
//       assert.equal(highestBidder, bidder3, "The highest bidder should be bidder3");
//       assert.equal(highestBid, web3.utils.toWei("3", "ether"), "The highest bid should be 3 ether");
//     });
//     it("WithDraw", async () => {
//         pending = await auctionInstance.withdraw({from: accounts[4]})
//         console.log("Pending_state",Boolean(pending))
//         assert.equal(Boolean(pending), true, "Did not withdraw")
//     })
// });