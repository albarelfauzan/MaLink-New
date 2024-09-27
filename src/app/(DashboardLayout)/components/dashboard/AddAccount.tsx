import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, TextField, Box, Snackbar, Alert } from '@mui/material';
import { web3, contract } from './contract'; // Import web3 dan contract
import { useRouter } from 'next/navigation';

interface AddAccountModalProps {
    open: boolean;
    onClose: () => void;
    groupId: bigint | null; // Menambahkan props groupId untuk menampung ID grup yang dipilih
    fetchGroups: (userAddress: string) => Promise<void>; // Fungsi untuk fetch ulang data setelah menambahkan akun
}

const AddAccountModal: React.FC<AddAccountModalProps> = ({ open, onClose, groupId, fetchGroups }) => {
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success'); // Snackbar type for success/error
    const router = useRouter(); 

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleAddAccount = async () => {
        if (!groupId) {
            setErrorMessage("Group ID is not selected.");
            setSnackbarType('error');
            setOpenSnackbar(true);
            return;
        }

        try {
            const accounts = await web3.eth.getAccounts();
            const recipientAddress = address;
            const amountInEther = amount;
    
            if (!recipientAddress || !amountInEther) {
                setErrorMessage("Recipient address and amount are required.");
                setSnackbarType('error');
                setOpenSnackbar(true);
                return;
            }
    
            const amountInWei = web3.utils.toWei(amountInEther, 'ether');
    
            await contract.methods.addRecipient(Number(groupId), recipientAddress).send({
                from: accounts[0],
                value: amountInWei,
                gas: "3000000",
                gasPrice: web3.utils.toWei('10', 'gwei')
            });
    
            setSuccessMessage(`Successfully added recipient: ${recipientAddress} with amount ${amountInEther} Ether.`);
            setSnackbarType('success');
            setOpenSnackbar(true);

            await fetchGroups(accounts[0]); // Refresh the groups after adding a recipient
            onClose(); // Tutup modal setelah berhasil menambahkan akun
        } catch (error) {
            console.error("Error adding recipient:", error);
            setErrorMessage("Failed to add recipient. See console for details.");
            setSnackbarType('error');
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ style: { backgroundColor: '#3C354A', color: '#fff' } }}>
                <DialogTitle sx={{ color: "#fff" }}>Add Account</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Address"
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                        />
                        <TextField
                            label="Amount"
                            fullWidth
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                        />
                        <Button variant="contained" sx={{ bgcolor: "#AC6AEC" }} onClick={handleAddAccount}>
                            Submit
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Snackbar for Success/Failure Alerts */}
            <Snackbar 
                open={openSnackbar} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position top-right
                sx={{ zIndex: 1400 }} // Set z-index higher than sidebar
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
                    {snackbarType === 'success' ? successMessage : errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddAccountModal;
