import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      price: 45000,
      change1h: 2.5,
      change24h: -1.2,
      change7d: 5.8,
      marketCap: 850000000000,
      volume24h: 28000000000,
      circulatingSupply: 19500000,
      maxSupply: 21000000,
      chartData: 'path-to-chart.svg'
    },
    // Add 4 more sample assets here with similar structure
  ]
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAsset: (state, action) => {
      const { id, updates } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        Object.assign(asset, updates);
      }
    }
  }
});

export const { updateAsset } = cryptoSlice.actions;
export const selectAssets = state => state.crypto.assets;
export default cryptoSlice.reducer;