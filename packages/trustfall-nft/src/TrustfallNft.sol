// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ERC721MerkleDrop} from "./ERC721MerkleDrop.sol";

/**
 * @title TrustfallNFT
 * @author @unioncredit
 * @dev NFT that represents an addresses entry into the Trustfall ETHCC 2022 trust game
 * @dev NFTs are minted by addresses that are in our merkle root
 * @dev Additional NFTs can be minted by the owner for addresses outside the root
 */
contract TrustfallNFT is ERC721MerkleDrop {
    constructor(string memory name, string memory symbol)
        ERC721MerkleDrop(name, symbol)
    {}
}
