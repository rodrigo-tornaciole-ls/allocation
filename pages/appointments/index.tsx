import { Breadcrumbs, Typography } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import AddButton from '../../components/button/add';
import stylesHome from '../../styles/Home.module.css';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import getAppointments from '../api/appointments';
import GridTable from '../../components/grid';
import dayjs from 'dayjs';
var weekOfYear = require('dayjs/plugin/weekOfYear')

export default function Appointments() {
    dayjs.extend(weekOfYear)
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const columns = [["id","ID"], ["year","Year"], ["week","Week"], ["developer","Developer"], ["project","Project"], ["availability", "Availability"]];
    const [rows, setRows] = useState([]);

    /** List developers to fill the Grid Table */
    useEffect(() => {
        setLoading(true) 
        getAppointments().then((result) => {
            const appointmentList = result.map((appointment:{_id: string, year:number, weekOfYear:number, user:{name: string}, project:{name: string}, availability:string}, index: number) => {
                return {id: index+1, _id: appointment._id, year: appointment.year, week: appointment.weekOfYear, developer: appointment.user.name, project: appointment.project.name, availability: appointment.availability}
            })
            setRows(appointmentList);
            setLoading(false)                                                                                                                                                                                                                    
        });
    },[]);

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

                {/* Block List Users */}
                <GridTable initialColumns={columns} initialRows={rows} action='appointments' />
                {/* End Block List Users */}
            </main>
        </div>
    )
}