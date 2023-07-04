// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";

interface ITrustfall {
    function isValid(address, uint256) external view returns (bool);
}

/// @title CMYK
/// @author @unioncredit
contract CMYK is ERC721Votes, Ownable {
    /* ---------------------------------------------
     Storage
    ----------------------------------------------- */

    /// @dev Token IDs
    enum Team {
        CYAN,
        MAGENTA,
        YELLOW,
        BLACK
    }

    /// @dev Tracked token ID
    uint256 public id;

    /// @dev The merkle root
    bytes32 public root;

    /// @dev The trustfall contract address
    address public trustfall;

    /// @dev Mapping of address to claimed
    mapping(address => bool) public hasClaimed;

    /// @dev Team to token URI string
    mapping(Team => string) public getURI;

    /// @dev Token ID to team
    mapping(uint256 => Team) public getTokenTeam;

    /* ---------------------------------------------
     Constructor 
    ----------------------------------------------- */

    /// @param _owner The owner
    /// @param _trustfall The trustfall contract
    /// @param _name Token name
    /// @param _symbol Token symbol
    constructor(
        address _owner,
        address _trustfall,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) EIP712(_name, "1") Ownable(_owner) {
        trustfall = _trustfall;
    }

    /* ---------------------------------------------
      View Functions 
    ----------------------------------------------- */

    /// @dev Get the token URI
    /// @param tokenId The token ID
    /// @return token URI string
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        Team team = getTokenTeam[tokenId];
        return getURI[team];
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
    /// @param str The new token URI e.g ipfs://0000/{id}.json
    function setURI(Team team, string memory str) external onlyOwner {
        getURI[team] = str;
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
    function mint(
        Team team,
        address to,
        bytes32[] memory proof
    ) external payable {
        require(!hasClaimed[to], "claimed");

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

        uint256 tokenId = ++id;
        hasClaimed[to] = true;
        getTokenTeam[tokenId] = team;

        _mint(to, tokenId);
    }

    /// @dev Drain ETH
    /// @dev Allow the owner to pull the ETH out of this contract
    function drain(address payable to, uint256 amount) public onlyOwner {
        to.transfer(amount);
    }

    receive() external payable {}

    fallback() external payable {}
}
