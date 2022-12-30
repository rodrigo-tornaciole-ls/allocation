import Head from 'next/head';
import Link from 'next/link';
import stylesHome from '../../styles/Home.module.css'
import { Alert, Box, Breadcrumbs, Modal, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddButton from '../../components/button/add';
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import GridTable from '../../components/grid'
import getProjects from '../api/projects';
import AddProjectsForm from '../../components/forms/projects.add';
import postProjects from '../api/projects/posts';

export default function Projects() {

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

    /** List projects to fill the Grid Table */
    useEffect(() => {
        setLoading(true) 
        getProjects().then((result) => {
            const projectsList = result.map((project:{_id: string, name: string, tag:string}, index: number) => {
                return {id: index+1, _id: project._id, name: project.name, tag: project.tag}
            })
            setRows(projectsList);
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
        postProjects(data).then((project: {_id?: string, name?:string, tag?:string, message?:string}) => {
            if(!project._id){
                handleErrorShow();
                setErrorMessage(project.message);
            }else{
                const index = rows.length + 1;
                setRows([...rows, {id: index, _id: project._id, name: project.name, tag: project.tag}]);
            }
        })
    }

    /** show/hide create user form */
    const handelAddProject = async (event: any) => {
        event.preventDefault();
        // setAddproject(!addproject);
        handleModalShow();
    }

    return (
        <div className={stylesHome.container}>
            <Head>
                <title>Allocation - Projects</title>
                <meta name="description" content="Management of Projects" />
                <link rel="icon" herf="/favicon.ico" />
            </Head>

            <main className={stylesHome.main}>
                <Breadcrumbs sx={{width:'100%'}} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Typography color="text.primary">Projects</Typography>
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Projects
                </h1>

                {isLoading && <p> Loading... </p>}

                {/* Block Add Project */}
                <div style={{padding:"5vh"}}>
                    <AddButton endIcon={<DomainAddRoundedIcon/>} label="Project" onClick={handelAddProject} />
                </div>
                <Modal open={openModal} onClose={handleModalClose} aria-labellesdby="parent-modal-title" aria-describedby="parent-modal-description">
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
                        <AddProjectsForm availabilities={availabilities} onSubmit={handleSubmit} />
                    </Box>
                </Modal>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
                {/* End Block Add Project */}

                {/* Block List Projects */}
                <GridTable initialColumns={columns} initialRows={rows} />
                {/* End Block List Projects */}
            </main>
        </div>
    );
}