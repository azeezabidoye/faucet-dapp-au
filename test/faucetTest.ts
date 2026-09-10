import { expect } from "chai";
import { network } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const { ethers } = await network.create();

describe("Faucet", function () {
  // Deploy and set state variables for contract
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    await faucet.deployed();

    const [owner] = await ethers.getSigners();

    console.log("Signer 1 address:", owner.address);
    return { faucet, owner };
  }

  it("should deploy the contract and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });
});
