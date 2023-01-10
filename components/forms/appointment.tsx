import { FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import AddButton from '../button/add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { availabilities } from '../../enum/availabilities.enum';
import { status } from '../../enum/status.enum';
import getDevelopers from '../../pages/api/developers';
import getProjects from '../../pages/api/projects';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export default function AddAppointmentForm({...props}) {
    
    const {data, action} = props;
    const [date, setDate] = useState<Dayjs | null>(dayjs(Date.now()))
    const [otherAvailability, setOtherAvailability] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [developers, setDevelopers] = useState([])
    const [developersLoaded, setDevelopersLoaded] = useState(false)
    const [projects, setProjects] = useState([])
    const [projectsLoaded, setProjectsLoaded] = useState(false)

    useEffect(() => {
        if(data?.date && data?.year && !loaded){
            setDate(data?.date);
            if(date)
                setLoaded(true)
        }
    })

     /** List developers to fill the select options */
     useEffect(() => {
        setDevelopersLoaded(true) 
        getDevelopers().then((result) => {
            const developersList = result.map((developer:{_id: string, name:string, email:string, availability:string}) => {
                return {_id: developer._id, name: developer.name, email: developer.email, availability: developer.availability}
            })
            setDevelopers(developersList);
            setDevelopersLoaded(false)                                                                                                                                                                                                                    
        });
    },[]);

    /** List projects to fill the select options */
    useEffect(() => {
        setProjectsLoaded(true);
        getProjects().then((result) => {
            const projectsList = result.map((project:{_id: string, name: string, tag:string}) => {
                return {_id: project._id, name: project.name, tag: project.tag}
            });
            setProjects(projectsList);
            setProjectsLoaded(false);
        });
    },[]);

    const handleDateChange = (newValue: Dayjs | null) => {
        setDate(newValue);
    }

    return (
        <form {...props} style={{padding:"0 50px 50px 50px"}}>
            <Grid container spacing={2}>
                {/* <Grid item xs={12} md={12}>
                    <TextField id="weekOfYear" name="weekOfYear" label="Week Of Year" value={weekOfYear} onChange={(event) => setWeekOfYear(event.target.value)} fullWidth variant="standard" required />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker name="weekOfYear" label="Week Of Year" inputFormat="DD/MM/YYYY" value={weekOfYear} onChange={handleWeekOfYearChange} renderInput={(params) => <TextField {...params} fullWidth variant="standard" required />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField id="year" name="year" label="Year" value={year} onChange={(event) => setYear(event.target.value)} fullWidth variant="standard" required />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker name="year" label="Year" inputFormat="DD/MM/YYYY" value={year} onChange={handleYearChange} renderInput={(params) => <TextField {...params} fullWidth variant="standard" required />} />
                    </LocalizationProvider>
                </Grid> */}
                <Grid item xs={12} md={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker name="date" label="Date" inputFormat="DD/MM/YYYY" value={date} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth variant="standard" required />} />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="developer">
                            Developers
                        </InputLabel>
                        <NativeSelect inputProps={{
                            name: 'developer',
                            id: 'developer',
                            required: true
                        }} >
                            {developers.map((developer:{_id: string, name:string, email:string, availability:string}) => {
                                if(data?.developer === developer._id){
                                    return <option key={developer._id} value={developer._id} selected>{developer.name} - {developer.email}</option>
                                }
                                return <option key={developer._id} value={developer._id}>{developer.name} - {developer.email}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="project">
                            Developers
                        </InputLabel>
                        <NativeSelect inputProps={{
                            name: 'project',
                            id: 'project',
                            required: true
                        }} >
                            {projects.map((project:{_id: string, name: string, tag:string}) => {
                                if(data?.project === project._id){
                                    return <option key={project._id} value={project._id} selected>({project.tag}) {project.name}</option>
                                }
                                return <option key={project._id} value={project._id}>({project.tag}) {project.name}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="status">
                            Status
                        </InputLabel>
                        <NativeSelect inputProps={{
                            name: 'status',
                            id: 'status',
                            required: true
                        }} >
                            {status.map((status) => {
                                if(data?.status === status){
                                    return <option key={status} value={status} selected>{status}</option>
                                }
                                return <option key={status} value={status}>{status}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="availability">
                            Availability
                        </InputLabel>
                        <NativeSelect inputProps={{
                            name: 'availability',
                            id: 'availability',
                            required: true
                        }} >
                            {availabilities.map((availabilty) => {
                                if(data?.availability === availabilty){
                                    return <option key={availabilty} value={availabilty} selected>{availabilty}</option>
                                }
                                return <option key={availabilty} value={availabilty}>{availabilty}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    {action === "edit" ? <AddButton type="submit" fullWidth endIcon={<EditIcon />} label="EDIT" />
                    : <AddButton type="submit" fullWidth endIcon={<AddBoxRoundedIcon />} label="INSERT" />}
                </Grid>
            </Grid>
        </form>
    )
}