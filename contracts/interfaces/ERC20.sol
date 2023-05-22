// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ERC20 {
    function balanceOf(address who) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);
    function transfer(address toAddress, uint value) external returns (bool ok);
    function transferFrom(address fromAddress, address toAddress, uint value) external returns (bool ok);
    function approve(address spender, uint value) external returns (bool ok);
    event Transfer(address indexed fromAddress, address indexed toAddress, uint value); // solhint-disable-line
    event Approval(address indexed owner, address indexed spender, uint value);
}
