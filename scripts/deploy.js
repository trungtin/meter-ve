const fs = require('fs')

async function main() {
  const Token = await ethers.getContractFactory("BaseV1");
  const Gauges = await ethers.getContractFactory("BaseV1GaugeFactory");
  const Bribes = await ethers.getContractFactory("BaseV1BribeFactory");
  const Factory = await ethers.getContractFactory("BaseV1Factory");
  const Router = await ethers.getContractFactory("BaseV1Router01");
  const Ve = await ethers.getContractFactory("contracts/ve.sol:ve");
  const Ve_dist = await ethers.getContractFactory(
    "contracts/ve_dist.sol:ve_dist"
  );
  const BaseV1Voter = await ethers.getContractFactory("BaseV1Voter");
  const BaseV1Minter = await ethers.getContractFactory("BaseV1Minter");
  const Library = await ethers.getContractFactory("voltswap_library");

  const token = await Token.deploy();
  const gauges = await Gauges.deploy();
  const bribes = await Bribes.deploy();
  const factory = await Factory.deploy();
  const router = await Router.deploy(
    factory.address,
    "0x4cb6cef87d8cadf966b455e8bd58fff32aba49d1" // MTR address on testnet
  );
  const ve = await Ve.deploy(token.address);
  const ve_dist = await Ve_dist.deploy(ve.address);
  const voter = await BaseV1Voter.deploy(
    ve.address,
    factory.address,
    gauges.address,
    bribes.address
  );
  const minter = await BaseV1Minter.deploy(
    voter.address,
    ve.address,
    ve_dist.address
  );
  const library = await Library.deploy(router.address);

  await token.setMinter(minter.address);
  await ve.setVoter(voter.address);
  await ve_dist.setDepositor(minter.address);
  await voter.initialize(
    ["0x4cb6cef87d8cadf966b455e8bd58fff32aba49d1"],
    minter.address
  );
  await minter.initialize(
    [
      "0xa40d8E684C1154A0828A0C20f46514f210025D12",
      "0x9b99ed014b4787EfC6DBF197E38Eb48e8ab177db",
      "0xF43e0F55A047D9801eebD66D18e499f55661f76f",
      "0x68897Bb3409485b9E897498D9A91bF4464460633",
      "0x30EE69E86fb64D2B531BBa74e69Cc74a5011d0b3",
      "0x85a9Fd025a372d289D6540ca67ABF74e74296eb3",
      "0xBAACD7aB6F37BBB27520A9024fBC13597AB1dFcb",
      "0x46958f056a8ef2d383c38aB407F3dA72C4f94E97",
      "0x093eE56B5A51e87386836C7aafA61c3E85fe40AD",
      "0xD08Ccd9985831fD7E5BD7FbF2fDBc8772FEA6e31",
    ],
    [
      ethers.BigNumber.from("800000000000000000000000"),
      ethers.BigNumber.from("2376588000000000000000000"),
      ethers.BigNumber.from("1331994000000000000000000"),
      ethers.BigNumber.from("1118072000000000000000000"),
      ethers.BigNumber.from("1070472000000000000000000"),
      ethers.BigNumber.from("1023840000000000000000000"),
      ethers.BigNumber.from("864361000000000000000000"),
      ethers.BigNumber.from("812928000000000000000000"),
      ethers.BigNumber.from("795726000000000000000000"),
      ethers.BigNumber.from("763362000000000000000000"),
    ],
    ethers.BigNumber.from("100000000000000000000000000")
  );

  const data = {
    token: token.address,
    gauges: gauges.address,
    bribes: bribes.address,
    factory: factory.address,
    router: router.address,
    ve: ve.address,
    ve_dist: ve_dist.address,
    voter: voter.address,
    minter: minter.address,
    library: library.address,
  };
  if (!fs.existsSync('output')) {
    fs.mkdirSync('output')
  }
  fs.writeFileSync("output/deployed_address.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
