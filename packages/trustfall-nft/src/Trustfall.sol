// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

interface IUserManager {
    function checkIsMember(address) external view returns (bool);
}

/// @title Trustfall
/// @author @unioncredit
/// @dev External validation logic to check if a sender is valid
contract Trustfall is Ownable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    address public immutable userManager;

    bytes32 public root;

    uint256 public mintCost;

    mapping(address => bool) public hasClaimed;

    mapping(address => bool) public isCmyk;

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    constructor(
        address _owner,
        uint256 _mintCost,
        address _userManager
    ) Ownable(_owner) {
        userManager = _userManager;
        mintCost = _mintCost;
    }

    /* ---------------------------------------------
     Setter Functions 
    ----------------------------------------------- */

    function setRoot(bytes32 _root) external onlyOwner {
        root = _root;
    }

    function setMintCost(uint256 _mintCost) external onlyOwner {
        mintCost = _mintCost;
    }

    function setIsCmyk(address _addr, bool _active) external onlyOwner {
        isCmyk[_addr] = _active;
    }

    /* ---------------------------------------------
     Core Functions 
    ----------------------------------------------- */

    function performTrustfall(
        address to,
        uint256 value,
        bytes32[] memory proof
    ) external {
        require(!hasClaimed[to], "claimed");
        require(isCmyk[msg.sender], "!cmyk");

        bool validProof = MerkleProof.verify(
            proof,
            root,
            keccak256(abi.encodePacked(to))
        );

        bool isMember = IUserManager(userManager).checkIsMember(to);

        bool isEnough = value >= mintCost;

        require(validProof || isEnough || isMember, "!valid");

        hasClaimed[to] = true;
    }
}
