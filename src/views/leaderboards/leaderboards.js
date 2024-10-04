import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import NavBar from '../../components/NavBar/NavBar';
import './leaderboards.css';

const Leaderboards = () => {
    const [users, setUsers] = useState([]);

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const usersCollection = collection(db, 'users');
                const usersSnapshot = await getDocs(usersCollection);

                const userList = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Sort users by coins in descending order
                const sortedUsers = userList
                    .map(user => ({
                        uid: user.id,
                        username: user.username,
                        coins: user.save ? user.save.coins : 0,
                    }))
                    .sort((a, b) => b.coins - a.coins); // Sort by coins

                setUsers(sortedUsers);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="leaderboards-view">
            <NavBar />
            <div className="leaderboards-container">
                <h2 className="leaderboards-title">Leaderboard</h2>
                <table className="leaderboards-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Coins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.uid}>
                                <td className="leaderboards-rank">{index + 1}</td>
                                <td className="leaderboards-username">{user.username}</td>
                                <td className="leaderboards-coins">{user.coins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboards;
