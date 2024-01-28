// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract SimpleAuction {
    address payable public beneficiary;
    uint public autionEndTime;
    address public highestBidder;
    uint public highestBid;
    

    mapping(address => uint) pendingReturns;

    bool ended;

    event highestBidIncreased(address bidder, uint amount);

    event AuctionEnded(address winner, uint amount);

    error AuctionAlreadyEnded();
    error BidNotHighEnough(uint amount);
    error NotYetAlreadyEnd();
    error AuctionEndAlready();

    constructor (uint biddingtime, address payable beneficiaryAddress) {
        autionEndTime = block.timestamp + biddingtime;
        beneficiary = beneficiaryAddress;
    }

    function bid() external payable {
        if(block.timestamp > autionEndTime) {
            revert AuctionAlreadyEnded();
        }
        if(msg.value < highestBid) {
            revert BidNotHighEnough(highestBid);
        }
        if(highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit highestBidIncreased(highestBidder, highestBid);

    }

    function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if(amount > 0) {
            pendingReturns[msg.sender] = 0;

            if(!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
            
        }
        return true;
    }

    function auctionEnd() external {
        if(block.timestamp < autionEndTime) {
            revert NotYetAlreadyEnd();
        }
        if(ended) {
            revert AuctionEndAlready();
        }
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }

}