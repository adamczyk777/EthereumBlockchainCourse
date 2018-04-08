const ChainList = artifacts.require("./ChainList.sol");

contract("ChainList", accounts => {
  let chainListInstance;
  let seller = accounts[1];
  let articleName = "article 1";
  let articleDescription = "Description for article 1";
  let articlePrice = 10;

  it("should be initialized with empty values", () => {
    return ChainList.deployed()
      .then(instance => {
        return instance.getArticle();
      })
      .then(data => {
        assert.equal(data[0], 0x0, "seller must be empty");
        assert.equal(data[1], "", "article name must be empty");
        assert.equal(data[2], "", "article description must be empty");
        assert.equal(data[3].toNumber(), 0, "article price must be zero");
      });
  });

  it("should sell article", () =>
    ChainList.deployed(instance => {
      chainListInstance = instance;
      return chainListInstance
        .sellArticle(
          articleName,
          articleDescription,
          web3.toWei(articlePrice, "ether"),
          {
            from: seller
          }
        )
        .then(() => chainListInstance.getArticle())
        .then(data => {
          assert.equal(data[0], seller, "seller must be " + seller);
          assert.equal(data[1], articleName, "article name  must be empty");
          assert.equal(data[2], articleDescription, "article description must be " + articleDescription);
          assert.equal(
              data[3].toNumber(),
              web3.toWei(articlePrice, "ether"),
              "article price must be " + web3.toWei(articlePrice, "ether")
            );
        });
    }));
});
