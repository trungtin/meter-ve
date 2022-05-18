async function main() {
  const Multicall = await ethers.getContractFactory("Multicall2");

  const multicall = await Multicall.deploy();

  console.log(multicall);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
