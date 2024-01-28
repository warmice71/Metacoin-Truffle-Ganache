const BlindAuction = artifacts.require("BlindAuction");
const {time} = require('@openzeppelin/test-helpers');


contract("BlindAuction", (accounts) => {
    let instance;
    const beneficiary = accounts[0];
    const bidder1 = accounts[1];
    const bidder2 = accounts[2];
    const bidder3 = accounts[3];
    const bidder4 = accounts[4];
    const bidder5 = accounts[5];
    const bidder6 = accounts[6];
    const bidder7 = accounts[7];
    beforeEach(async () => {
        instance = await BlindAuction.new(3600, 60, beneficiary);
    });
    it("Blind Bids start now...", async () => {
        
        const initialBalance1 = web3.utils.toWei("1", "ether") ;
        const initialBalance2 = web3.utils.toWei("2", "ether") ;
        const initialBalance3 = web3.utils.toWei("3", "ether") ;
        const initialBalance4 = web3.utils.toWei("4", "ether") ;
        const initialBalance5 = web3.utils.toWei("5", "ether") ;
        const initialBalance6 = web3.utils.toWei("6", "ether") ;
        const initialBalance7 = web3.utils.toWei("7", "ether") ;
        //const initialBalance7 = web3.utils.toWei("7", "ether") ;
        var fake = false ;
        var secret = "0x123456" ;
        const blindedBid1 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance1 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid2 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance2 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid3 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance3 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid4 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance4 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid5 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance5 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid6 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance6 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        const blindedBid7 = web3.utils.soliditySha3({ t: 'uint', v: initialBalance7 }, { t: 'bool', v: fake }, { t: 'bytes32', v: secret });
        
        

        await instance.bid(blindedBid1, {from:bidder1, value:initialBalance1}) ;
        await instance.bid(blindedBid2, {from:bidder2, value:initialBalance2}) ;
        await instance.bid(blindedBid3, {from:bidder3, value:initialBalance3}) ;
        await instance.bid(blindedBid4, {from:bidder4, value:initialBalance4}) ;
        await instance.bid(blindedBid5, {from:bidder5, value:initialBalance5}) ;
        await instance.bid(blindedBid6, {from:bidder6, value:initialBalance6}) ;
        await instance.bid(blindedBid7, {from:bidder7, value:initialBalance7}) ;



        await time.increase(time.duration.hours(1));


        await instance.reveal([initialBalance1], [false], ["0x123456"], { from: bidder1 });
        await instance.reveal([initialBalance2], [false], ["0x123456"], { from: bidder2 });
        await instance.reveal([initialBalance3], [false], ["0x123456"], { from: bidder3 });
        await instance.reveal([initialBalance4], [false], ["0x123456"], { from: bidder4 });
        await instance.reveal([initialBalance5], [false], ["0x123456"], { from: bidder5 });
        await instance.reveal([initialBalance6], [false], ["0x123456"], { from: bidder6 });
        await instance.reveal([initialBalance7], [false], ["0x123456"], { from: bidder7 });

      
        await time.increase(time.duration.hours(1.5));

        await instance.auctionEnd({from:beneficiary}) ;

        console.log("lakjdfljewoifjwoeijf");
        
        const highestBidder = await instance.highestBidder() ;
        const highestBid = await instance.highestBid() ;

        console.log(highestBidder + " : " + highestBid.toString()) ;

        assert.equal(highestBidder, bidder7, "Incorrect highest bidder");
        assert.equal(highestBid.toString(), initialBalance7, "Incorrect highest bid");
        
    })
})