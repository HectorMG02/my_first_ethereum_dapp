// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TaskContract {
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt; // la fecha es un timestamp, por lo que ponemos el uint256
    }

    mapping(uint256 => Task) public tasks;
}
