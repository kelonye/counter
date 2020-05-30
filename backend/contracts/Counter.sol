pragma solidity >= 0.5.0 < 0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract Counter {
  using SafeMath for uint;

  uint private count = 0;

  event Count(
    uint count
  );

  function incrementCount() public {
    count = count.add(1);
    emit Count(count);
  }

  function decrementCount() public {
    count = count.sub(1);
    emit Count(count);
  }

  function resetCount() public {
    count = 0;
    emit Count(count);
  }

  function getCount() public view returns (uint) {
    return count;
  }
}
