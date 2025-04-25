import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAssets, updateAsset } from '../features/crypto/cryptoSlice';
import './CryptoTable.css';

const CryptoTable = () => {
  const assets = useSelector(selectAssets);
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate WebSocket updates
    const interval = setInterval(() => {
      assets.forEach(asset => {
        const randomPrice = asset.price * (1 + (Math.random() - 0.5) * 0.01);
        const randomChanges = {
          change1h: asset.change1h + (Math.random() - 0.5) * 0.5,
          change24h: asset.change24h + (Math.random() - 0.5) * 0.5,
          change7d: asset.change7d + (Math.random() - 0.5) * 0.5,
          volume24h: asset.volume24h * (1 + (Math.random() - 0.5) * 0.1)
        };

        dispatch(updateAsset({
          id: asset.id,
          updates: {
            price: randomPrice,
            ...randomChanges
          }
        }));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatPercent = (num) => {
    return num.toFixed(2) + '%';
  };

  return (
    <div className="table-responsive">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>
                <img src={asset.logo} alt={asset.name} width="24" height="24" />
              </td>
              <td>{asset.name}</td>
              <td>{asset.symbol}</td>
              <td>{formatNumber(asset.price)}</td>
              <td className={asset.change1h >= 0 ? 'positive' : 'negative'}>
                {formatPercent(asset.change1h)}
              </td>
              <td className={asset.change24h >= 0 ? 'positive' : 'negative'}>
                {formatPercent(asset.change24h)}
              </td>
              <td className={asset.change7d >= 0 ? 'positive' : 'negative'}>
                {formatPercent(asset.change7d)}
              </td>
              <td>{formatNumber(asset.marketCap)}</td>
              <td>{formatNumber(asset.volume24h)}</td>
              <td>{asset.circulatingSupply.toLocaleString()}</td>
              <td>{asset.maxSupply ? asset.maxSupply.toLocaleString() : '∞'}</td>
              <td>
                <img src={asset.chartData} alt="7d chart" width="100" height="40" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;