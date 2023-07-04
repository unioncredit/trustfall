pragma solidity ^0.8.0;

import "forge-std/Test.sol";

import "../src/Cmyk.sol";
import "../src/Trustfall.sol";

contract FakeUserManager {
    function checkIsMember(address) external pure returns (bool) {
        return true;
    }
}

contract TestCmyk is Test {
    CMYK public cmyk;

    uint256 public constant MINT_COST = 0.01 ether;

    function setUp() public {
        cmyk = new CMYK(address(this), "Cmyk", "CMYK", "Cyan");
        address userManager = address(new FakeUserManager());
        address trustfall = address(
            new Trustfall(address(this), address(cmyk), MINT_COST, userManager)
        );
        cmyk.setTrustfall(trustfall);
    }

    function testMint() public {
        bytes32[] memory p;
        cmyk.mint(address(this), p);
        assertEq(cmyk.ownerOf(1), address(this));
    }

    function testSetURI() public {
        cmyk.setURI("testing");

        bytes32[] memory p;
        cmyk.mint(address(this), p);
        assertEq(cmyk.tokenURI(1), "testing");
    }

    function testDrain() public {
        payable(address(cmyk)).transfer(1 ether);
        cmyk.drain(payable(address(1234)), 1 ether);
        assertEq(address(1234).balance, 1 ether);
    }
}
