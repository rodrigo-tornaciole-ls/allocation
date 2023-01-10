import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddProjectForm from '../../components/forms/project';
import postProjects from '../api/projects/posts';
import editProject from '../api/projects/edit';
import stylesHome from '../../styles/Home.module.css';
import { Alert, Breadcrumbs, Snackbar, Typography } from '@mui/material';
import getProject from '../api/projects/[pid]';

export default function ProjectsForm() {
    const [openError, setErrorShow] = useState(false);
    const handleErrorShow = () => setErrorShow(true);
    const handleErrorClose = () => setErrorShow(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState();
    const [action, setAction] = useState("");

    const router = useRouter();

    if(router.query?.slug && !data){
        getProject(router.query?.slug[1]).then((result) => {
            setData(result);      
            setAction(router.query?.slug[0])                                                                                                                                                                       
        });
        
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            tag: event.target.tag.value
        }
        if(action=="edit"){
            editProject(router.query?.slug[1], data).then((project: {_id?: string, message?:string}) => {
                if(!project._id){
                    handleErrorShow();
                    setErrorMessage(project.message);
                }else{
                    router.push(`/projects`)
                }
            })
        }else{
            postProjects(data).then((project: {_id?: string, message?:string}) => {
                if(!project._id){
                    handleErrorShow();
                    setErrorMessage(project.message);
                }else{
                    router.push(`/projects`)
                }
            })
        }
    }

    return (
        <div className={stylesHome.container}>
            <Head>
                <title>Allocation - Projects</title>
                <meta name="description" content="Management of Projects" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
        

            <main className={stylesHome.main}>
                <Breadcrumbs sx={{width:'100%'}} aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/projects">
                        Projects
                    </Link>
                    {action === "edit" ? <Typography color="text.primary">Edit</Typography> :
                    <Typography color="text.primary">Create</Typography> }
                </Breadcrumbs>
                <h1 className={stylesHome.title}>
                    Projects
                </h1>

                <AddProjectForm onSubmit={handleSubmit} key={router.asPath} data={data} action={action} />
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    );
}
