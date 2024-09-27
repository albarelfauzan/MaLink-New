import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Button, TextField, Snackbar, Alert } from '@mui/material';

interface AddGroupModalProps {
    open: boolean;
    onClose: () => void;
    onAddGroup: (groupData: { name: string; date: string }) => void;
}

const AddGroupModal: React.FC<AddGroupModalProps> = ({ open, onClose, onAddGroup }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);  // Snackbar state
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');  // Snackbar type
    const [snackbarMessage, setSnackbarMessage] = useState('');  // Snackbar message

    const handleSubmit = () => {
        if (name && date) {
            onAddGroup({ name, date });
            setName('');
            setDate('');
            setSnackbarMessage('Group added successfully!');
            setSnackbarType('success');
            setOpenSnackbar(true); // Open success snackbar
        } else {
            setSnackbarMessage('Please fill all fields');
            setSnackbarType('error');
            setOpenSnackbar(true); // Open error snackbar
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ style: { backgroundColor: '#3C354A', color: '#fff' } }}>
                <DialogTitle sx={{ color: "#fff" }}>Add Group</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Group Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                        />
                        <TextField
                            label="Release Date"
                            type="datetime-local"
                            fullWidth
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                                style: { color: "#fff" },
                            }}
                            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                        />
                        <Button variant="contained" sx={{ bgcolor: "#AC6AEC" }} onClick={handleSubmit}>Submit</Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddGroupModal;
