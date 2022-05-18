const fs = require("fs");

const accounts = require("../test/fixtures/accounts");

async function main() {
  const [a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10] = accounts;

  token = await ethers.getContractFactory("Token");

  usdt = await token.deploy("USDT", "USDT");
  await usdt.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdt.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await usdt.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  mim = await token.deploy("MIM", "MIM");
  await mim.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await mim.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await mim.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  dai = await token.deploy("DAI", "DAI");
  await dai.mint(
    a0.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await dai.mint(
    a1.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );
  await dai.mint(
    a2.address,
    ethers.BigNumber.from("1000000000000000000000000000000")
  );

  await usdt.deployed();
  await mim.deployed();
  await dai.deployed();

  const data = {
    usdt: usdt.address,
    mim: mim.address,
    dai: dai.address,
  };
  if (!fs.existsSync("output")) {
    fs.mkdirSync("output");
  }
  fs.writeFileSync("output/test_tokens.json", JSON.stringify(data));
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
