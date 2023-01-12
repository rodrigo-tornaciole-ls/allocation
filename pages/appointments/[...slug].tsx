import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddAppointmentForm from '../../components/forms/appointment';
import postAppointments from '../api/appointments/posts';
import editAppointment from '../api/appointments/edit';
import stylesHome from '../../styles/Home.module.css';
import { Alert, Breadcrumbs, Snackbar, Typography } from '@mui/material';
import getAppointment from '../api/appointments/[pid]';
import dayjs from 'dayjs';
import getDeveloper from '../api/developers/[pid]';
import getProject from '../api/projects/[pid]';
var weekOfYear = require('dayjs/plugin/weekOfYear')

export default function AppointmentsForm() {
    dayjs.extend(weekOfYear)
    const [openError, setErrorShow] = useState(false);
    const handleErrorShow = () => setErrorShow(true);
    const handleErrorClose = () => setErrorShow(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState();
    const [action, setAction] = useState("");

    const router = useRouter();

    if(router.query?.slug && !data){
        getAppointment(router.query?.slug[1]).then((result) => {
            setData(result);      
            setAction(router.query?.slug[0])                                                                                                                                                                       
        });
        
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const date = event.target.date.value;
        const weekOfYear = dayjs(date).week();
        const year = dayjs(date).year();
        const user = await getDeveloper(event.target.developer.value);
        const project = await getProject(event.target.project.value);
        const data = {
            weekOfYear,
            year,
            date,
            user,
            project,
            status: event.target.status.value,
            availability: event.target.availability.value,
            otherAvailability: event.target.otherAvailability?.value || null,
        }
        if(action=="edit"){
            editAppointment(router.query?.slug[1], data).then((project: {_id?: string, message?:string}) => {
                if(!project._id){
                    handleErrorShow();
                    setErrorMessage(project.message);
                }else{
                    router.push(`/appointments`)
                }
            })
        }else{
            postAppointments(data).then((project: {_id?: string, message?:string}) => {
                if(!project._id){
                    handleErrorShow();
                    setErrorMessage(project.message);
                }else{
                    router.push(`/appointments`)
                }
            })
        }
    }

    return (
        <div className={stylesHome.container}>
            <Head>
                <title>Allocation - Appointments</title>
                <meta name="description" content="Management of Appointments" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        

            <main className={stylesHome.main}>
                <Breadcrumbs sx={{width:'100%'}} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/appointments">
                        Appointments
                    </Link>
                    {action === "edit" ? <Typography color="text.primary">Edit</Typography> :
                    <Typography color="text.primary">Create</Typography> }
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Appointments
                </h1>

                <AddAppointmentForm onSubmit={handleSubmit} key={router.asPath} data={data} action={action} />
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    );
}
