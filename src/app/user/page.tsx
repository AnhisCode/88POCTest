// pages/user/[userID].js

'use client'
import { useSearchParams } from 'next/navigation'

const UserPage = () => {
    const searchParams = useSearchParams()

    const userID = searchParams.get('userID')
    const recentlyCompletedObjective = searchParams.get('questID')

    return (
        <div>
            <h1>User Page</h1>
            <p>User ID: {userID || "no User ID"}</p>
            <p>Recently Completed Objective: {recentlyCompletedObjective || "Not yet Started"}</p>
        </div>
    );
};

export default UserPage;
