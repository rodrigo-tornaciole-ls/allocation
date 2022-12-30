import { FormControl, Grid, InputLabel, NativeSelect, TextField } from '@mui/material';
import AddButton from '../button/add';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

interface IFormProps {
    availabilities: string[];
}

export default function AddDeveloperForm({availabilities, ...props}: IFormProps) {
    return (
        <form {...props} style={{padding:"0 50px 50px 50px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField id="name" name="name" label="Name" fullWidth variant="standard" required />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField type="email" id="email" name="email" label="E-mail" fullWidth variant="standard" required />
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
                                return <option value={availabilty}>{availabilty}</option>
                            })}
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <AddButton type="submit" fullWidth  endIcon={<AddBoxRoundedIcon />} label="INSERT" />
                </Grid>
            </Grid>
        </form>
    )
}