import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import AddDeveloperForm from "../../components/forms/developers.add"
import postDevelopers from '../api/developers/posts';
import editDeveloper from "../../pages/api/developers/edit";
import stylesHome from '../../styles/Home.module.css';
import { Alert, Box, Breadcrumbs, Modal, Snackbar, Typography } from '@mui/material';
import getDeveloper from '../api/developers/[pid]';

export default function DevelopersForm() {
    const availabilities = [
        "Full",
        "PartTime",
        "SixHour",
        "Other"
    ];
    const [openError, setErrorShow] = useState(false);
    const handleErrorShow = () => setErrorShow(true);
    const handleErrorClose = () => setErrorShow(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState();
    const [action, setAction] = useState("");

    const router = useRouter();

    if(router.query?.slug && !data){
        getDeveloper(router.query?.slug[1]).then((result) => {
            setData(result);      
            setAction(router.query?.slug[0])                                                                                                                                                                       
        });
        
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            availability: event.target.availability.value
        }
        if(action=="edit"){
            editDeveloper(router.query?.slug[1], data).then((developer: {_id?: string, name?:string, email?:string, message?:string}) => {
                if(!developer._id){
                    handleErrorShow();
                    setErrorMessage(developer.message);
                }else{
                    router.push(`/developers`)
                }
            })
        }else{
            postDevelopers(data).then((developer: {_id?: string, name?:string, email?:string, message?:string}) => {
                if(!developer._id){
                    handleErrorShow();
                    setErrorMessage(developer.message);
                }else{
                    router.push(`/developers`)
                }
            })
        }
    }

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
                    <Link underline="hover" color="inherit" href="/developers">
                        Developers
                    </Link>
                    <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Developers
                </h1>

                <AddDeveloperForm availabilities={availabilities} onSubmit={handleSubmit} key={router.asPath} data={data} action={action} />
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    );
}
