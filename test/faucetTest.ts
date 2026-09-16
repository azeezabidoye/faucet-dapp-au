import { expect } from "chai";
import { network } from "hardhat";
import { parseUnits } from "ethers";

const { ethers, networkHelpers } = await network.create();

// Withdraw amount variable for testing withdrawal limit
let withdrawAmount = parseUnits("1", "ether"); // 1 ETH

describe("Faucet", function () {
  // Deploy and set state variables for contract
  async function deployContractAndSetVariables() {
    const faucet = await ethers.deployContract("Faucet");

    const [owner] = await ethers.getSigners();

    console.log("Signer 1 address:", owner.address);
    return { faucet, owner };
  }

  it("should deploy the contract and set the owner correctly", async function () {
    const { faucet, owner } = await networkHelpers.loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withrawal above 0.1 ETH at a time", async function () {
    const { faucet } = await networkHelpers.loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdraw(withdrawAmount)).to.revert(ethers);
  });
});
