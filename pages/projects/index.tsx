import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import stylesHome from '../../styles/Home.module.css'
import { Breadcrumbs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import AddButton from '../../components/button/add';
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import GridTable from '../../components/grid'
import getProjects from '../api/projects';

export default function Projects() {

    const columns = [["id","ID"], ["name","Name"], ["tag","Tag"]];
    const [rows, setRows] = useState([]);
    const [isLoading, setLoading] = useState(false);

    /** List projects to fill the Grid Table */
    useEffect(() => {
        setLoading(true);
        getProjects().then((result) => {
            const projectsList = result.map((project:{_id: string, name: string, tag:string}, index: number) => {
                return {id: index+1, _id: project._id, name: project.name, tag: project.tag}
            });
            setRows(projectsList);
            setLoading(false);
        });
    },[]);
    
    const router = useRouter();
    
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
                    <AddButton endIcon={<DomainAddRoundedIcon/>} label="Project" onClick={() => router.push('/projects/create')} />
                </div>
                {/* End Block Add Project */}

                {/* Block List Projects */}
                <GridTable initialColumns={columns} initialRows={rows} action='projects' />
                {/* End Block List Projects */}
            </main>
        </div>
    );
}