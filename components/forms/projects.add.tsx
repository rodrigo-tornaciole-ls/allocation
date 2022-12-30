import { FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import AddButton from '../button/add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

interface IFormProps {
    availabilities: string[];
}

export default function AddProjectsForm({availabilities, ...props}: IFormProps) {
    return (
        <form {...props} style={{padding:"0 50px 50px 50px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="name" name="name" label="Name" fullWidth variant="standard" required />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField id="tag" name="tag" label="Tag" fullWidth variant="standard" required />
                </Grid>
                <Grid item xs={12} md={12}>
                    <AddButton type="submit" fullWidth  endIcon={<AddBoxRoundedIcon />} label="INSERT" />
                </Grid>
            </Grid>
        </form>
    )
}