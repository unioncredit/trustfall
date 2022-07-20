// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title ERC721MerkleDrop
 * @author @unioncredit
 */
contract ERC721MerkleDrop is ERC721, Ownable {
    /* ---------------------------------------------
   Storage
  ----------------------------------------------- */

    uint256 public id;

    bytes32 public root;

    /* ---------------------------------------------
   Events 
  ----------------------------------------------- */

    event RootSet(address sender, bytes32 root);

    /* ---------------------------------------------
   Constructor 
  ----------------------------------------------- */

    constructor(string memory name, string memory symbol)
        ERC721(name, symbol)
    {}

    /* ---------------------------------------------
   Core Functions 
  ----------------------------------------------- */

    /**
     * @dev set the merkle root
     */
    function setRoot(bytes32 _root) external onlyOwner {
        root = _root;

        emit RootSet(msg.sender, _root);
    }

    /**
     * @dev Mint tokens for addresses in the merkle root.
     * @dev Only one token per address is allowed to be minted
     */
    function mint(bytes32[] memory proof, address to) external {
        require(
            MerkleProof.verify(proof, root, keccak256(abi.encodePacked(to))),
            "!proof"
        );

        _mint(to, ++id);
    }

    /**
     * @dev Owner mint
     * @dev Contract owner can mint additional NFTs
     */
    function ownerMint(address to) external onlyOwner {
        _mint(to, ++id);
    }
}
