import React, { useState, useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AddGroupModal from '@/app/(DashboardLayout)/components/dashboard/AddGroup';
import AddAccountModal from '@/app/(DashboardLayout)/components/dashboard/AddAccount';
import DetailModal from '@/app/(DashboardLayout)/components/dashboard/DetailModal'; // Import modal baru
import { web3, contract } from './contract';
import { useRouter } from 'next/navigation';

interface GroupRecipient {
    address: string;
    amount: string;
}

interface Group {
    id: bigint;
    name: string;
    totalAddresses: bigint;
    totalAmount: string;
    releaseDate: bigint;
    isPaid: boolean;
    details: GroupRecipient[];
}

const InheritList = () => {
    const [products, setProducts] = useState<Group[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState<boolean | null>(null);
    const [wallet, setWallet] = useState<string | null>(null);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState<GroupRecipient[]>([]);
    const router = useRouter();
    const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState<bigint | null>(null);


    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const chainId = '0x405'; // Chain ID untuk BTTC Testnet
                const networkData = [{
                    chainId: chainId,
                    chainName: 'BTTC Testnet',
                    nativeCurrency: {
                        name: 'BTT',
                        symbol: 'BTT',
                        decimals: 18,
                    },
                    rpcUrls: ['https://pre-rpc.bt.io/'],
                    blockExplorerUrls: ['https://testscan.bt.io/'],
                }];
                
                await (window.ethereum as any).request({
                    method: 'wallet_addEthereumChain',
                    params: networkData,
                });

                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWallet(accounts[0]);
                await fetchGroups(accounts[0]);
            } else {
                console.error("MetaMask is not installed");
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    };

    const fetchGroups = async (userAddress: string) => {
        try {
            const response = await contract.methods.getAllGroups(userAddress).call();
            
            if (Array.isArray(response)) {
                const updatedProducts = response.map((group: any) => ({
                    id: BigInt(group.id), // Konversi id ke BigInt
                    name: group.name,
                    totalAddresses: BigInt(group.totalAddresses), // Konversi totalAddresses ke BigInt
                    totalAmount: web3.utils.fromWei(group.totalAmount, 'ether'), // Konversi amount ke format Ether
                    releaseDate: BigInt(group.releaseDate), // Konversi releaseDate ke BigInt
                    isPaid: group.isPaid,
                    details: [],
                }));

                setProducts(updatedProducts);
                console.log("Fetched groups:", updatedProducts);
            } else {
                console.error("Unexpected response format:", response);
            }
        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };

    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const handleAddGroup = async (newGroup: any) => {
        try {
            const accounts = await web3.eth.getAccounts();
            const releaseDateInSeconds = Math.floor(new Date(newGroup.date).getTime() / 1000);

            await contract.methods.createGroup(newGroup.name, releaseDateInSeconds).send({
                from: accounts[0],
                gas: "3000000",
                gasPrice: web3.utils.toWei('10', 'gwei')
            });

            handleModalClose();
            await fetchGroups(accounts[0]);
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    const handleDetailOpen = async (groupId: bigint) => {
        console.log("Fetching recipients for group ID:", groupId.toString());
        
        // Reset selectedDetails to ensure it's empty before fetching new data
        setSelectedDetails([]);
    
        try {
            // Attempt to fetch the user's account, but allow modal to open regardless
            const accounts = await web3.eth.getAccounts();
            
            // Use the provided groupId to fetch the recipients
            const response = await contract.methods.getGroupRecipients(Number(groupId)).call({
                gas: "3000000",
                from: accounts.length > 0 ? accounts[0] : undefined // Only use from if accounts exist
            }) as [string[], string[]]; // Force type to tuple [string[], string[]]
    
            console.log("Response from contract:", response);
    
            const wallets = response[0];  // Access the first array
            const amounts = response[1];  // Access the second array
    
            // Check if we have recipients
            if (wallets.length === amounts.length && wallets.length > 0) {
                const details = wallets.map((wallet: string, index: number) => ({
                    address: wallet,
                    amount: web3.utils.fromWei(amounts[index], 'ether'), // Convert from wei to ether
                }));
    
                setSelectedDetails(details);
            } else {
                
                setSelectedDetails([]); // Set an empty array
            }
        } catch (error) {
            console.error("Error fetching group recipients:", error);
        }
    
        // Open the detail modal regardless of the account status
        setOpenDetailModal(true);
    };
    

    const handleAddAccountModalOpen = (groupId: bigint) => {
        setSelectedGroupId(groupId);
        setOpenAddAccountModal(true);
    };

    const handleAddAccountModalClose = () => {
        setOpenAddAccountModal(false);
        setSelectedGroupId(null);
    };
    
    

    const filteredProducts = products.filter(product => {
        if (statusFilter === null) return true;
        return product.isPaid === statusFilter;
    });

    return (
        <DashboardCard
            title="Transaction List"
            
            action={
                <Button variant="outlined" disableElevation color="secondary" sx={{ borderRadius: 2 }} onClick={connectWallet}>
                    {wallet ? `Connected: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : "Connect Wallet"}
                </Button>
            }
        >
            <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <Chip 
        sx={{ bgcolor: '#F55C5C', color: '#fff', ml: -1, width: '425px', mb: 2 }} 
        label={`In Testnet development, Transaction timing may be inaccurate.`} 
    />
</Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Chip sx={{ bgcolor: '#01B574', color: '#fff', ml: -1 }} label={`${products.length} Group Created`} />
                    <Button variant="contained" onClick={handleModalOpen} sx={{ bgcolor: "#AC6AEC", color: "#fff", padding: 1.5 }}>
                        New Group
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', mt: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
    <InputLabel sx={{ color: "#fff" }}>Status Filter</InputLabel>
    <Select
        value={statusFilter === null ? "All" : statusFilter ? "True" : "False"}
        onChange={(e) => {
            const value = e.target.value;
            if (value === "All") {
                setStatusFilter(null);
            } else if (value === "True") {
                setStatusFilter(true);
            } else if (value === "False") {
                setStatusFilter(false);
            }
        }}
        label="Status Filter"
        sx={{
            color: "#fff",
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
            },
            '& .MuiSvgIcon-root': {
                color: '#fff',
            },
            '&.MuiSelect-root.MuiSelect-outlined': {
                color: '#fff',
            },
        }}
    >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="True">Released</MenuItem>
        <MenuItem value="False">Upcoming</MenuItem>
    </Select>
</FormControl>

                </Box>

                <AddGroupModal open={openModal} onClose={handleModalClose} onAddGroup={handleAddGroup} />
                <AddAccountModal
                open={openAddAccountModal}
                onClose={handleAddAccountModalClose}
                groupId={selectedGroupId}
                fetchGroups={fetchGroups} // Pass function to refresh groups
            />

<DetailModal
                    open={openDetailModal}
                    onClose={() => setOpenDetailModal(false)}
                    details={selectedDetails}
                />

                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#A0AEC0" }}>No</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Name</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Account</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Amount</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Token</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Release Date</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Status</TableCell>
                                <TableCell sx={{ color: "#A0AEC0" }}>Add Account</TableCell> {/* Kolom baru */}
                                <TableCell sx={{ color: "#A0AEC0" }}>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts.map((product, index) => (
                                <TableRow key={product.name}>
                                    <TableCell sx={{ color: "#fff" }}>{index + 1}</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{product.name}</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{product.totalAddresses.toString()} Account</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{product.totalAmount}</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>USDT</TableCell>
                                    <TableCell sx={{ color: "#fff" }}>{new Date(Number(product.releaseDate) * 1000).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={{
                                                bgcolor: product.isPaid ? "#01B574" : "#FB9678",
                                                color: "#fff",
                                            }}
                                            size="small"
                                            label={product.isPaid ? "Released" : "Upcoming"}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                color: "#01B574",
                                                textTransform: "none",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => handleAddAccountModalOpen(product.id)} 
                                        >
                                            Add Account
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{
                                                color: "#AC6AEC",
                                                textTransform: "none",
                                                fontWeight: "bold",
                                            }}
                                            onClick={() => handleDetailOpen(product.id)}
                                        >
                                            See Detail
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </>
        </DashboardCard>

    );
};

export default InheritList;
