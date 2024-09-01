// RegistrationContext.tsx
"use client"
import { createContext, useState, ReactNode, useContext } from 'react';

interface RegistrationContextType {
    registrationType: string | null;
    setRegistrationType: (type: string) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [registrationType, setRegistrationType] = useState<string | null>(null);

    return (
        <RegistrationContext.Provider value={{ registrationType, setRegistrationType }}>
            {children}
        </RegistrationContext.Provider>
    );
};

export const useRegistration = () => {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
        throw new Error('useRegistration must be used within a RegistrationProvider');
    }
    return context;
};

