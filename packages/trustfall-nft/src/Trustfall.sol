// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IUserManager {
    function checkIsMember(address) external view returns (bool);
}

/**
 * @title Trustfall
 * @author @unioncredit
 * @dev External validation logic to check if a sender is valid
 */
contract Trustfall is Ownable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    address public userManager;

    uint256 public mintCost;

    /* ---------------------------------------------
     Events 
    ----------------------------------------------- */

    event MintCostUpdate(address sender, uint256 mintCost);

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    constructor(uint256 _mintCost, address _userManager) {
        userManager = _userManager;
        mintCost = _mintCost;
    }

    /* ---------------------------------------------
     Core Functions 
    ----------------------------------------------- */

    function setMintCost(uint256 _mintCost) external onlyOwner {
        mintCost = _mintCost;
        emit MintCostUpdate(msg.sender, _mintCost);
    }

    function isValid(address sender, uint256 value)
        external
        view
        returns (bool)
    {
        bool isMember = IUserManager(userManager).checkIsMember(sender);
        bool isEnough = value >= mintCost;
        return isEnough || isMember;
    }
}
