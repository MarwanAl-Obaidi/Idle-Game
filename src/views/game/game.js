import React, { useState, useEffect, useCallback } from 'react';
import './game.css';
import NavBar from '../../components/NavBar/NavBar';
import { db } from '../../firebase';
import { useAuth } from '../../components/authContext/authContext.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Game = () => {
  const [coins, setCoins] = useState(0); // Total coins
  const [coinsPerSecond, setCoinsPerSecond] = useState(0); // Coins generated automatically per second
  const [upgradeCost, setUpgradeCost] = useState(10); // Cost to upgrade coins per second
  const { currentUser } = useAuth(); // Get the current user from Auth context

  // Effect to load game data from Firestore when the component mounts
  useEffect(() => {
    const loadGameData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const gameData = data.save || {}; // Accessing the save object
          setCoins(gameData.coins || 0);
          setCoinsPerSecond(gameData.coinsPerSecond || 0);
          setUpgradeCost(gameData.upgradeCost || 10); // Default cost if not set
        } else {
          console.log("No game data found for user.");
        }
      }
    };

    loadGameData();
  }, [currentUser]); // Run this effect when currentUser changes

  // Effect to increase coins automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) => prevCoins + coinsPerSecond);
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [coinsPerSecond]);

  // Function to handle manual coin collection
  const collectCoins = () => {
    setCoins((prevCoins) => prevCoins + 1);
  };

  // Function to handle upgrades
  const buyUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prevCoins) => prevCoins - upgradeCost); // Subtract cost
      setCoinsPerSecond((prevCPS) => prevCPS + 1); // Increase CPS
      setUpgradeCost((prevCost) => Math.round(prevCost * 1.5)); // Increase upgrade cost
    }
  };

  // Function to save game data to Firestore
  const saveGameData = useCallback(async () => {
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      try {
        await setDoc(
          userDocRef,
          {
            save: {
              coins,
              coinsPerSecond,
              upgradeCost,
            },
          },
          { merge: true }
        );
        alert("Game data saved successfully!");
      } catch (error) {
        console.error("Error saving game data:", error);
        alert("Failed to save game data: " + error.message);
      }
    } else {
      alert("User is not authenticated. Cannot save data.");
    }
  }, [currentUser, coins, coinsPerSecond, upgradeCost]);

  return (
    <div>
      <NavBar />
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
        <br />
        {currentUser ? ( // Render save button only if user is authenticated
          <button onClick={saveGameData} className="saveButton">
            Save Game
          </button>
        ) : (
          <p>Login to save your game data.</p>
        )}
      </div>
    </div>
  );
};

export default Game;
