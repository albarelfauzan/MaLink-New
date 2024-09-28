import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { web3, contract } from './contract'; // Impor web3 dan kontrak

const Admin = () => {
    const [account, setAccount] = useState<string | null>(null);

    // Fungsi untuk inisialisasi akun yang terhubung
    const initWeb3 = async () => {
        if (web3 && contract) {
            try {
                // Minta akses ke akun MetaMask
                const accounts = await web3.eth.requestAccounts();
                setAccount(accounts[0]); // Ambil akun pertama sebagai akun aktif
            } catch (error) {
                console.error("Error accessing accounts:", error);
            }
        } else {
            console.error("Web3 or contract is not initialized");
        }
    };

    // Fungsi untuk memanggil releaseAllPayments
    const handleRelease = async () => {
        if (!web3 || !contract || !account) {
            console.error("Web3, contract, or account is not initialized");
            return;
        }

        try {
            const gasPrice = await web3.eth.getGasPrice()
            await contract.methods.releaseAllPayments().send({ from: account, gasPrice: gasPrice});
            console.log("Payments released successfully");
        } catch (error) {
            console.error("Error releasing payments:", error);
        }
    };

    // Inisialisasi akun saat komponen pertama kali dimuat
    useEffect(() => {
        initWeb3();
    }, []);

    return (
        <DashboardCard>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px',
                    bgcolor: '#3C354A',
                    borderRadius: '12px',
                    textAlign: 'center',
                    width: '300px',
                    margin: 'auto'
                }}
            >
                <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                    Group Name
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#A0AEC0', mb: 4 }}>
                    You Want To Release This Group Now?
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleRelease} // Panggil handleRelease saat tombol diklik
                    sx={{
                        bgcolor: '#AC6AEC',
                        color: '#fff',
                        padding: '10px 30px',
                        borderRadius: '8px',
                        '&:hover': {
                            bgcolor: '#9A58D0',
                        }
                    }}
                >
                    Release
                </Button>
            </Box>
        </DashboardCard>
    );
};

export default Admin;
