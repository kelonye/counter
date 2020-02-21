const Counter = artifacts.require("Counter");

contract("Counter", accounts => {
  it("should reset count", async function() {
    const instance = await Counter.deployed();
    await instance.resetCount.call();
    const count = await instance.getCount.call();
    assert.equal(count, 0, "count was not reset");
  });
});
