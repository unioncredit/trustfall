// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.11;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

interface ITrustfall {
    function isValid(address, uint256) external view returns (bool);
}

interface IDescriptor {
    function tokenURI(uint256) external view returns (string memory);
}

/// @title TrustfallNFT
/// @author @unioncredit
/// @dev NFT that represents an addresses entry into the Trustfall ETHCC 2022 trust game
/// @dev NFTs are minted by addresses that are in our merkle root
/// @dev Additional NFTs can be minted by the owner for addresses outside the root
contract TrustfallNFT is ERC721, Ownable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    uint256 public id;

    bytes32 public root;

    address public trustfall;

    address public descriptor;

    string public tokenURIString;

    mapping(address => bool) public claimed;

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    constructor(
        string memory name,
        string memory symbol,
        address _trustfall
    ) ERC721(name, symbol) {
        trustfall = _trustfall;
    }

    /* ---------------------------------------------
      Setter Functions 
    ----------------------------------------------- */

    function setRoot(bytes32 _root) external onlyOwner {
        root = _root;
    }

    function setTokenURI(string memory _tokenURIString) external onlyOwner {
        tokenURIString = _tokenURIString;
    }

    function setTrustfall(address _trustfall) external onlyOwner {
        trustfall = _trustfall;
    }

    function setDescriptor(address _descriptor) external onlyOwner {
        descriptor = _descriptor;
    }

    /* ---------------------------------------------
     Core Functions 
    ----------------------------------------------- */

    /// @dev Mint tokens for addresses in the merkle root.
    /// @dev Only one token per address is allowed to be minted
    function mint(bytes32[] memory proof, address to) external payable {
        require(!claimed[to], "claimed");

        bool validProof = MerkleProof.verify(
            proof,
            root,
            keccak256(abi.encodePacked(to))
        );

        bool validTrustfall = ITrustfall(trustfall).isValid(
            msg.sender,
            msg.value
        );

        require(validTrustfall || validProof, "!valid");

        claimed[to] = true;

        _mint(to, ++id);
    }

    /// @dev Owner mint
    /// @dev Contract owner can mint additional NFTs
    function ownerMint(address to) external onlyOwner {
        _mint(to, ++id);
    }

    /// @dev Get the token URI
    /// @dev if a descriptor contract is set look the tokenURI up there
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        if (descriptor != address(0)) {
            return IDescriptor(descriptor).tokenURI(tokenId);
        }

        return tokenURIString;
    }
}
