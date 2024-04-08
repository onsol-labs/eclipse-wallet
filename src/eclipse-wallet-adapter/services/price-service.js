'use strict';

import { SALMON_API_URL } from '../constants/environment';
import axios from 'axios';

export const getPricesByPlatform = async (platform) => getPrices({ platform });

export const getPricesByIds = async (ids) => getPrices({ ids: ids.join(',') });

const getPrices = async (params) => {
  const { data } = await axios.get(`${SALMON_API_URL}/v1/coins`, { params });
  return data;
};

export const getTopTokensByPlatform = async (platform) => getTopTokens({ platform });

const getTopTokens = async (params) => {
  const { data } = await axios.get(`${SALMON_API_URL}/v1/top-tokens`, { params });
  return data;
};