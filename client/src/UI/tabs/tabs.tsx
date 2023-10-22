import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';


interface TabsProps {
    value: number,
    username: any,
}

export default function ProfileTabs({value, username}: TabsProps) {

    return (
        <Tabs value={value}>
            <Link href={
                {
                    pathname: '/[id]',
                    query: {id: username},
                }
            }>
                <Tab label="Profile"/>
            </Link>
            <Link href={{
                pathname: '/[id]/films',
                query: {id: username},
            }}>
                <Tab label="Films"/>
            </Link>
            <Link href={{
                pathname: '/[id]/watchlist',
                query: {id: username},
            }}>
                <Tab label="Watchlist"/>
            </Link>
        </Tabs>
    );
}