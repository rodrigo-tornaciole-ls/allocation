import { FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import AddButton from '../button/add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

interface IFormProps {
    availabilities: string[];
}

export default function AddProjectForm({availabilities, ...props}: IFormProps) {
    const {data, action} = props;
    const [name, setName] = useState("")
    const [tag, setTag] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(data?.name && data?.tag && !loaded){
            setName(data?.name);
            setTag(data?.tag);
            if(name && tag)
                setLoaded(true)
        }
    })

    return (
        <form {...props} style={{padding:"0 50px 50px 50px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="name" name="name" label="Name" value={name} onChange={(event) => setName(event.target.value)} fullWidth variant="standard" required />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField id="tag" name="tag" label="Tag" value={tag} onChange={(event) => setTag(event.target.value)} fullWidth variant="standard" required />
                </Grid>
                <Grid item xs={12} md={12}>
                    {action === "edit" ? <AddButton type="submit" fullWidth  endIcon={<EditIcon />} label="EDIT" />
                    : <AddButton type="submit" fullWidth  endIcon={<AddBoxRoundedIcon />} label="INSERT" />}
                </Grid>
            </Grid>
        </form>
    )
}