import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GridTable from '../../components/grid';
import stylesHome from '../../styles/Home.module.css';
import getDevelopers from '../api/developers';
import AddButton from '../../components/button/add';
import { Breadcrumbs, Typography } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function Developers() {
    
    const columns = [["id","ID"], ["name","Name"], ["email","E-mail"], ["availability", "Availability"]];
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(false);

    /** List developers to fill the Grid Table */
    useEffect(() => {
        setLoading(true) 
        getDevelopers().then((result) => {
            const developersList = result.map((developer:{_id: string, name:string, email:string, availability:string}, index: number) => {
                return {id: index+1, _id: developer._id, name: developer.name, email: developer.email, availability: developer.availability}
            })
            setRows(developersList);
            setLoading(false)                                                                                                                                                                                                                    
        });
    },[]);

    const router = useRouter();

    return (
        <div className={stylesHome.container}>
            <Head>
                <title>Allocation - Developers</title>
                <meta name="description" content="Management of Developers" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        

            <main className={stylesHome.main}>
                <Breadcrumbs sx={{width:'100%'}} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">Developers</Typography>
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Developers
                </h1>

                {isLoading && <p> Loading... </p>}

                {/* Block Add User */}
                <div style={{padding:"5vh"}}>
                    <AddButton endIcon={<PersonAddAltRoundedIcon />} label="Developer" onClick={() => router.push('/developers/create')} />
                </div>
                {/* End Block Add User */}

                {/* Block List Users */}
                <GridTable initialColumns={columns} initialRows={rows} action='developers' />
                {/* End Block List Users */}
            </main>
        </div>
    )
}