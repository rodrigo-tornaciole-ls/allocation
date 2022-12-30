import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import GridTable from '../../components/grid'
import stylesHome from '../../styles/Home.module.css'
import getDevelopers from '../api/developers';
import AddButton from '../../components/button/add';
import AddDeveloperForm from '../../components/forms/developers.add';
import postDevelopers from '../api/developers/posts';
import { Alert, Box, Breadcrumbs, Modal, Snackbar, Typography } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function Developers() {
    
    const columns = [["id","ID"], ["name","Name"], ["email","E-mail"]];
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const availabilities = [
        "Full",
        "PartTime",
        "SixHour",
        "Other"
    ];
    const [openModal, setModalShow] = useState(false);
    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);
    const [openError, setErrorShow] = useState(false);
    const handleErrorShow = () => setErrorShow(true);
    const handleErrorClose = () => setErrorShow(false);
    const [errorMessage, setErrorMessage] = useState("");

    /** List developers to fill the Grid Table */
    useEffect(() => {
        setLoading(true) 
        getDevelopers().then((result) => {
            const developersList = result.map((developer:{_id: string, name:string, email:string}, index: number) => {
                return {id: index+1, _id: developer._id, name: developer.name, email: developer.email}
            })
            setRows(developersList);
            setLoading(false)                                                                                                                                                                                                                    
        });
    },[]);
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            availability: event.target.availability.value
        }
        postDevelopers(data).then((developer: {_id?: string, name?:string, email?:string, message?:string}) => {
            if(!developer._id){
                handleErrorShow();
                setErrorMessage(developer.message);
            }else{
                const index = rows.length + 1;
                setRows([...rows, {id: index, _id: developer._id, name: developer.name, email: developer.email}]);
            }
        })
    }

    /** show/hide create user form */
    const handleAddDeveloper = async (event: any) => {
        event.preventDefault();
        // setAddDeveloper(!addDeveloper);
        handleModalShow();
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
                    <Typography color="text.primary">Developers</Typography>
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Developers
                </h1>

                {isLoading && <p> Loading... </p>}

                {/* Block Add User */}
                <div style={{padding:"5vh"}}>
                    <AddButton endIcon={<PersonAddAltRoundedIcon />} label="Developer" onClick={handleAddDeveloper} />
                </div>
                <Modal open={openModal} onClose={handleModalClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                    <Box sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        minWidth: '50vh',
                        width:'100vh',
                        mx: 'auto',
                        my: '15%',
                    }}>
                        <AddDeveloperForm availabilities={availabilities} onSubmit={handleSubmit} />
                    </Box>
                </Modal>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                {/* End Block Add User */}

                {/* Block List Users */}
                <GridTable initialColumns={columns} initialRows={rows} />
                {/* End Block List Users */}
            </main>
        </div>
    )
}