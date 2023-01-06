import { FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import AddButton from '../button/add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';

interface IFormProps {
    availabilities: string[];
}

export default function AddDeveloperForm({availabilities, ...props}: IFormProps) {
    const {data, action} = props;
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(data?.name && data?.email && !loaded){
            setName(data?.name);
            setEmail(data?.email);
            if(name && email)
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
                    <TextField type="email" id="email" name="email" label="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} fullWidth variant="standard" required />
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