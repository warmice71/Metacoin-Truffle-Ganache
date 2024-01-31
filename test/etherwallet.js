const EtherWallet = artifacts.require('EtherWallet');

contract('EtherWallet', (accounts) => {
  it('should allow owner to withdraw funds', async () => {
    const wallet = await EtherWallet.new();
    console.log("mmmmmmmmm000000")
    const initialBalance = await web3.eth.getBalance(wallet.address);
    const amount = web3.utils.toWei('0.1', 'ether');
    await wallet.sendTransaction({ value: amount, from: accounts[0] });
    await wallet.withdraw(amount, { from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(wallet.address);
    assert.equal(finalBalance, initialBalance, 'Balance should be equal');
  });

  it('should not allow non-owner to withdraw funds', async () => {
    const wallet = await EtherWallet.new();
    const amount = web3.utils.toWei('0.1', 'ether');
    try {
      await wallet.withdraw(amount, { from: accounts[1] });
      assert.fail('Expected revert not received');
    } catch (error) {
      assert(error.message.includes('caller is not owner'), 'Revert message does not match');
    }
  });

  it('should return correct balance', async () => {
    const wallet = await EtherWallet.new();
    const amount = web3.utils.toWei('0.1', 'ether');
    await wallet.sendTransaction({ value: amount, from: accounts[0] });
    const balance = await wallet.getBalance();
    assert.equal(balance, amount, 'Balance should be equal to the sent amount');
  });
});
