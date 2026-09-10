import { expect } from "chai";
import hre from "hardhat";
import { parseUnits } from "ethers";
let loadFixture: any;

// Withdraw amount variable for testing withdrawal limit
let withdrawAmount = parseUnits("1", "ether"); // 0.1 ETH;
{
  const _hh_helpers = (await import(
    "@nomicfoundation/hardhat-network-helpers"
  )) as any;
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
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    // await faucet.deployed();

    const [owner] = await hre.ethers.getSigners();

    console.log("Signer 1 address:", owner.address);
    return { faucet, owner };
  }

  it("should deploy the contract and set the owner correctly", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withrawal above 0.1 ETH at a time", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    await expect(faucet.withdraw(withdrawAmount)).to.be.revertedWith(
      "Withdrawal amount exceeds the limit of 0.1 ETH",
    );
  });
});
