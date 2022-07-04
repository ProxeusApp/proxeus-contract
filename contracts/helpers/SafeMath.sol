// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SafeMath {
    function safeSub(uint a, uint b) pure internal returns (uint) { // solhint-disable-line
        assert(b <= a);
        return a - b;
    }

    function safeAdd(uint a, uint b) pure internal returns (uint) { // solhint-disable-line
        uint c = a + b;
        assert(c >= a && c >= b);
        return c;
    }
}
