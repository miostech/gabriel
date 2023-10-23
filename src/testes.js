import React, { useEffect } from 'react';
import { useDataBaseContext } from './database/teste';

export default function Testes() {
    const { getAllUsers, usersAll } = useDataBaseContext();

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            {usersAll.map((user) => (
                <div key={user.id}>{user.name + " " + user.phone }</div>
            ))}
        </div>
    );
}