// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ITrustfall {
    function isValid(address, uint256) external view returns (bool);
}

/// @title CMYK
/// @author @unioncredit
contract CMYK is ERC1155, Ownable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    /// @dev Token IDs
    uint256 public constant CYAN = 0;
    uint256 public constant MAGENTA = 1;
    uint256 public constant YELLOW = 2;
    uint256 public constant BLACK = 3;

    /// @dev The trustfall contract address
    address public trustfall;

    /// @dev Mapping of address to claimed
    mapping(address => bool) public claimed;

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    /// @param _trustfall The trustfall contract
    /// @param uri The token URI string
    constructor(
        address owner,
        address _trustfall,
        string memory uri
    ) ERC1155(uri) Ownable(owner) {
        trustfall = _trustfall;
    }

    /* ---------------------------------------------
      Setter Functions 
    ----------------------------------------------- */

    /// @dev Set the token URI
    /// @param str The new token URI e.g ipfs://0000/{id}.json
    function setURI(string memory str) external onlyOwner {
        _setURI(str);
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
    function mint(uint256 id, address to) external payable {
        require(!claimed[to], "claimed");

        bool validTrustfall = ITrustfall(trustfall).isValid(
            msg.sender,
            msg.value
        );

        require(validTrustfall, "!trustfall");

        claimed[to] = true;

        _mint(to, id, 1, "");
    }

    /// @dev Drain ETH
    /// @dev Allow the owner to pull the ETH out of this contract
    function drain(address payable to, uint256 amount) public onlyOwner {
        to.transfer(amount);
    }

    receive() external payable {}

    fallback() external payable {}
}
