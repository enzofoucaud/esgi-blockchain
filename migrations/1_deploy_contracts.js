var Cooldown = artifacts.require("Cooldown");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(Cooldown);
};