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
    CMYK public cmky;

    uint256 public constant MINT_COST = 0.01 ether;

    function setUp() public {
        address userManager = address(new FakeUserManager());
        address trustfall = address(
            new Trustfall(address(this), MINT_COST, userManager)
        );

        cmky = new CMYK(address(this), trustfall, "Cmyk", "CMYK");
    }

    function testMint() public {
        bytes32[] memory p;
        cmky.mint(CMYK.Team.CYAN, address(this), p);

        assertEq(cmky.ownerOf(1), address(this));
        assert(cmky.getTokenTeam(1) == CMYK.Team.CYAN);
    }

    function testSetURI() public {
        cmky.setURI(CMYK.Team.CYAN, "testing");
        assertEq(cmky.getURI(CMYK.Team.CYAN), "testing");

        bytes32[] memory p;
        cmky.mint(CMYK.Team.CYAN, address(this), p);
        assertEq(cmky.tokenURI(1), "testing");
    }

    function testDrain() public {
        payable(address(cmky)).transfer(1 ether);
        cmky.drain(payable(address(1234)), 1 ether);
        assertEq(address(1234).balance, 1 ether);
    }
}
