import { TOKEN_PROGRAM_ID } from '../../constants/token-constants';
import http from 'axios';

const TOKEN_LIST_URL_JUP = 'https://cache.jup.ag/tokens';

const TOKEN_LIST_URL_CDN =
  'https://cdn.jsdelivr.net/gh/solana-labs/token-list@latest/src/tokens/solana.tokenlist.json';

let tokenList = [];

export const retrieveTokenList = async () => {
  if (Array.isArray(tokenList) && tokenList.length > 0) {
    return tokenList;
  }

  let response;

  try {
    response = await http.get(TOKEN_LIST_URL_JUP);
    tokenList = response.data;
  } catch (error) {
    console.error(
      `Cannot retrieve token list from ${TOKEN_LIST_URL_JUP}, using fallback ${TOKEN_LIST_URL_CDN}`
    );
    response = await http.get(TOKEN_LIST_URL_CDN);
    tokenList = response.data.tokens;
  }

  return tokenList;
};

export async function getTokenList() {
  const allTokens = await retrieveTokenList();

  const tokens = allTokens.map((token) => ({
    symbol: token.symbol,
    name: token.name,
    decimals: token.decimals,
    logo: token.logoURI,
    address: token.address,
    chainId: token.chainId,
    coingeckoId: token.extensions?.coingeckoId,
  }));
  return tokens;
}

export async function getTokensByOwner(connection, publicKey) {
  const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
    programId: TOKEN_PROGRAM_ID,
  });
  const result = response.value.map((item) => {
    const account = item.account.data.parsed.info;
    const tokenAmount = account.tokenAmount;
    const { mint, owner } = account;
    const { amount, decimals, uiAmount } = tokenAmount;
    return { mint, owner, amount, decimals, uiAmount };
  });
  return result;
}

export async function getTokenBySymbol(symbol) {
  const tokens = await getTokenList();
  return tokens.filter((t) => t.symbol == symbol);
}

export async function getTokenByAddress(address) {
  const tokens = await getTokenList();
  return tokens.filter((t) => t.address == address);
}

export async function getFeaturedTokenList() {
  const tokens = await getTokenList();
  const featuredList = [
    { symbol: 'SOL', name: 'Wrapped SOL' },
    { symbol: 'USDC', name: 'USD Coin' },
    { symbol: 'SRM', name: 'Serum' },
    { symbol: 'FIDA', name: 'Bonfida' },
    { symbol: 'RAY', name: 'Raydium' },
  ];
  return tokens.filter(
    (t) =>
      featuredList.some((el) => el.symbol === t.symbol && el.name === t.name) && t.chainId === 101
  );
}