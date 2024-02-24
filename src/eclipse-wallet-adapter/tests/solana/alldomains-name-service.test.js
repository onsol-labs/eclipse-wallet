const { create } = require('../../factories/solana-account-factory');
const { MNEMONIC, NETWORK_MAINNET } = require('./config');

test('solana-get-alldomains-domain', async () => {
  const account = await create({ network: NETWORK_MAINNET, mnemonic: MNEMONIC });
  const name = await account.getDomainFromPublicKey('LpW6n3hbwbKz9jgaSnFPvwfhR6EFwHfK2QyD1yNohrF');
  expect(name).toBe('test.eclipse');
});

test('solana-get-alldomains-my-domain', async () => {
  const account = await create({ network: NETWORK_MAINNET, mnemonic: MNEMONIC });
  const name = await account.getDomain();
  expect(name).toBe(null);
});

test('solana-get-alldomains-key', async () => {
  const account = await create({ network: NETWORK_MAINNET, mnemonic: MNEMONIC });
  const pk = await account.getPublicKeyFromDomain('test.eclipse');
  expect(pk).toBe('LpW6n3hbwbKz9jgaSnFPvwfhR6EFwHfK2QyD1yNohrF');
});
