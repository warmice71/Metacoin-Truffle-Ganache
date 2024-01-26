const Ballot = artifacts.require("Ballot");

contract("Ballot", (accounts) => {
    const expectedWinningProposal = 1;
  it("should give the right to vote to a voter", async () => {
    const instance = await Ballot.deployed();
    await instance.giveRightToVote(accounts[1], { from: accounts[0] });
    const voter = await instance.voters(accounts[1]);
    assert.equal(voter.weight, 1, "Voter should have the right to vote");
    console.log("vouter weight:    " + voter.weight);
  });
  it("should allow a voter to delegate their vote", async () => {
    const instance = await Ballot.deployed();
    const sender = accounts[2];
    const to = accounts[3];
    await instance.giveRightToVote(sender, { from: accounts[0] });
    await instance.giveRightToVote(to, { from: accounts[0] });
    await instance.delegate(to, { from: sender });
    const delegate = await instance.voters(sender);
    assert.equal(delegate.delegate, to, "Voter's delegate should be set");
  });
  it("should return the winning proposal", async () => {
    const instance = await Ballot.deployed();
    await instance.vote(1, {from:accounts[1]});
    await instance.vote(1, {from:accounts[3]});
    // await instance.giveRightToVote(accounts[1], { from: accounts[0] });
    // await instance.giveRightToVote(accounts[2], { from: accounts[0] });
    // await instance.giveRightToVote(accounts[3], { from: accounts[0] });
    // await instance.delegate(accounts[2], {from: accounts[1]});
    // await instance.vote(1, {from: accounts[2]});
    // await instance.vote(0, {from: accounts[3]});

    // Perform the necessary voting and delegation
    const winningProposal = await instance.winningProposal();
    // Assert the expected winning proposal
    assert.equal(winningProposal, expectedWinningProposal, "Incorrect winning proposal");
    console.log("winning proposal" + winningProposal);
  });
});



