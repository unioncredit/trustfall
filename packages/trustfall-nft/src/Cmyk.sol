// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721VotesUpgradeable.sol";

interface ITrustfall {
    function performTrustfall(
        address sender,
        uint256 value,
        bytes32[] memory proof
    ) external;
}

/// @title CMYK
/// @author @unioncredit
contract CMYK is ERC721VotesUpgradeable, OwnableUpgradeable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    /// @dev Team
    string public team;

    /// @dev Token URI
    string public _tokenURI;

    /// @dev Tracked token ID
    uint256 public id;

    /// @dev The merkle root
    bytes32 public root;

    /// @dev The trustfall contract address
    address public trustfall;

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    /// @param _name Token name
    /// @param _symbol Token symbol
    /// @param _team Team name
    function __CMYK_init(
        string memory _name,
        string memory _symbol,
        string memory _team
    ) public initializer {
        team = _team;

        __Ownable_init();
        __ERC721Votes_init();
        __ERC721_init(_name, _symbol);
        __Votes_init();
        __EIP712_init(_name, "1");
    }

    /* ---------------------------------------------
      View Functions 
    ----------------------------------------------- */

    /// @dev Get the token URI
    /// @return token URI string
    function tokenURI(uint256) public view override returns (string memory) {
        return _tokenURI;
    }

    /* ---------------------------------------------
      Setter Functions 
    ----------------------------------------------- */

    /// @dev Set the root
    /// @param _root The root
    function setRoot(bytes32 _root) external onlyOwner {
        root = _root;
    }

    /// @dev Set the token URI
    /// @param uri The new token URI e.g ipfs://0000/{id}.json
    function setURI(string memory uri) external onlyOwner {
        _tokenURI = uri;
    }

    /// @dev Set trustfall address, trustfall is used to verify mints
    /// @param newTrustfall The new trustfall contract address
    function setTrustfall(address newTrustfall) external onlyOwner {
        trustfall = newTrustfall;
    }

    /* ---------------------------------------------
     Core Functions 
    ----------------------------------------------- */

    /// @dev Mint tokens for addresses in the merkle root.
    /// @dev Only one token per address is allowed to be minted
    function mint(address to, bytes32[] memory proof) external payable {
        ITrustfall(trustfall).performTrustfall(to, msg.value, proof);
        _mint(to, ++id);
    }

    /// @dev Drain ETH
    /// @dev Allow the owner to pull the ETH out of this contract
    function drain(address payable to, uint256 amount) public onlyOwner {
        to.transfer(amount);
    }

    function _beforeTokenTransfer() external payable {}

    fallback() external payable {}

    receive() external payable {}
}
