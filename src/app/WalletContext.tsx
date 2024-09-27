import React, { createContext, useState, useContext, ReactNode } from 'react';

interface WalletContextProps {
    walletAddress: string | null;
    setWalletAddress: React.Dispatch<React.SetStateAction<string | null>>;
}

// Tambahkan tipe untuk `children`
interface WalletProviderProps {
    children: ReactNode;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
