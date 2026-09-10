import { expect } from "chai";
import { network } from "hardhat";
let loadFixture: any;
const { ethers } = await network.create();
{
  const _hh_helpers = await import("@nomicfoundation/hardhat-network-helpers");
  loadFixture = _hh_helpers.loadFixture ?? _hh_helpers.default?.loadFixture;
}
if (typeof loadFixture !== "function") {
  loadFixture = async (fixture: (...args: any[]) => Promise<any>) => {
    return fixture();
  };
}

describe("Faucet", function () {
  // Deploy and set state variables for contract
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    // await faucet.deployed();

    const [owner] = await ethers.getSigners();

    console.log("Signer 1 address:", owner.address);
    return { faucet, owner };
  }

  it("should deploy the contract and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });
});
