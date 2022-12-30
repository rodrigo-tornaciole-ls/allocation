import Button from '@mui/material/Button';

interface IButtonProps {
    label: string;
}

export default function AddButton({label, ...props}: IButtonProps) {
    return <Button variant="contained" {...props}>{label}</Button>
}