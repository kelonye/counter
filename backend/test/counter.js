const Counter = artifacts.require("Counter");

contract("Counter", accounts => {
  it("should increment & decrement count", async function() {
    const instance = await Counter.deployed();
    assert(
      web3.utils.toBN("0").eq(await instance.getCount()),
      "count is not initialized"
    );
    await instance.incrementCount();
    assert(
      web3.utils.toBN("1").eq(await instance.getCount()),
      "count was not incremented"
    );
    await instance.decrementCount();
    assert(
      web3.utils.toBN("0").eq(await instance.getCount()),
      "count was not decremented"
    );
  });

  it("should reset count", async function() {
    const instance = await Counter.deployed();
    await instance.resetCount();
    assert(
      web3.utils.toBN("0").eq(await instance.getCount()),
      "count was not reset"
    );
  });
});
