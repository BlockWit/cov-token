pragma solidity ^0.6.2;

interface ITransferContarctCallback {

  function tokenFallback(address _from, uint _value) external;

}
