pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/TrustfallNft.sol";
import "../src/Trustfall.sol";

contract FakeUserManager {
    function checkIsMember(address) external pure returns (bool) {
        return true;
    }
}

contract TestTrustfallNFT is Test {
    TrustfallNFT public nft;

    uint256 public constant MINT_COST = 0.01 ether;

    function setUp() public {
        address[] memory premine = new address[](3);
        premine[0] = address(1);
        premine[1] = address(2);
        premine[2] = address(3);

        address userManager = address(new FakeUserManager());
        address trustfall = address(
            new Trustfall(address(this), MINT_COST, userManager)
        );

        nft = new TrustfallNFT(
            address(this),
            "Trustfall",
            "TRUST",
            trustfall,
            premine
        );
    }

    function testPremine() public {
        assertEq(nft.ownerOf(1), address(1));
        assertEq(nft.ownerOf(2), address(2));
        assertEq(nft.ownerOf(3), address(3));
    }

    function testDrain() public {
        payable(address(nft)).transfer(1 ether);
        nft.drain(payable(address(1234)), 1 ether);
        assertEq(address(1234).balance, 1 ether);
    }
}
