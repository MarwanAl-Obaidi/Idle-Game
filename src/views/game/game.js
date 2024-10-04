import React, { useState, useEffect } from 'react';
import './game.css';

const Game = () => {
  const [coins, setCoins] = useState(0); // Total coins
  const [coinsPerSecond, setCoinsPerSecond] = useState(0); // Coins generated automatically per second
  const [upgradeCost, setUpgradeCost] = useState(10); // Cost to upgrade coins per second

  // Effect to increase coins automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) => prevCoins + coinsPerSecond);
    }, 1000);
    return () => clearInterval(interval);
  }, [coinsPerSecond]);

  // Function to handle manual coin collection
  const collectCoins = () => {
    setCoins(coins + 1);
  };

  // Function to handle upgrades
  const buyUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins(coins - upgradeCost);
      setCoinsPerSecond(coinsPerSecond + 1);
      setUpgradeCost(Math.round(upgradeCost * 1.5)); // Increase upgrade cost
    }
  };

  return (
    <div className="gameContainer">
      <h1>Idle Coin Game</h1>
      <p>Coins: {coins}</p>
      <p>Coins per Second: {coinsPerSecond}</p>
      <button onClick={collectCoins} className="gameButton">
        Collect 1 Coin
      </button>
      <br />
      <button onClick={buyUpgrade} disabled={coins < upgradeCost} className="gameButton">
        Upgrade (Cost: {upgradeCost} Coins)
      </button>
    </div>
  );
};

export default Game;
