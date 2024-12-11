import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const CoinTracker = () => {
  const [coins, setCoins] = useState(10);

  return (
    <div className="flex items-center ">
      {/* Coin Icon */}
      <Icon icon="mdi:currency-usd-circle" className="text-yellow-300 text-2xl mr-1" />

      {/* Coin Count */}
      <span className="text-gray-100 text-lg font-semibold">{coins}</span>
    </div>
  );
};

export default CoinTracker;
