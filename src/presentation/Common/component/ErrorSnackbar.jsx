import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const ErrorSnackbar = ({ open, onClose, message }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            onClose={onClose}
            autoHideDuration={5000} // 5 seconds
        >
            <SnackbarContent
                sx={{ backgroundColor: "rgba(var(--error))" }} // Tailwind red-600 color
                message={<p className="text-lg font-bold text-white">{message}</p>}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                }
            />
        </Snackbar>
    );
};
