import { Breadcrumbs, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import AddButton from '../../components/button/add';
import stylesHome from '../../styles/Home.module.css';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Appointments() {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <div className={stylesHome.container}>
            <Head>
                <title>Allocation - Appointments</title>
                <meta name="description" content="Appointments" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main className={stylesHome.main}>
                <Breadcrumbs sx={{width:'100%'}} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">Appointments</Typography>
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Appointments
                </h1>

                {isLoading && <p> Loading... </p>}

                {/* Block Add Appointment */}
                <div style={{padding:"5vh"}}>
                    <AddButton endIcon={<CalendarMonthRoundedIcon />} label="Appointment" onClick={() => router.push('/appointments/create')} />
                </div>
                {/* End Block Add Appointment */}
            </main>
        </div>
    )
}