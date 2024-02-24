const { TldParser } = require('@onsol/tldparser');

const getDomainName = async (connection, publicKey) => {
    try {
      const parser = new TldParser(connection);
      const mainDomain = await parser.getMainDomain(publicKey);
      return mainDomain.domain + mainDomain.tld;
    } catch (e) {
      console.debug(e);
      return null;
    }
  };

  const getPublicKey = async (connection, domain) => {
    try {
      const parser = new TldParser(connection);
      const owner = await parser.getOwnerFromDomainTld(domain);
      if (!owner) {
        throw Error("Owner not found for this domain.")
      }
      return owner.toString();
    } catch (e) {
      console.debug(e);
      return null;
    }
  };
  
  module.exports = {
    getDomainName,
    getPublicKey,
  };
  