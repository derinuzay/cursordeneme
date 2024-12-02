import React, { createContext, useState, useContext } from 'react';

interface FileContextType {
  jsonData: any;
  imageFile: File | null;
  setJsonData: (data: any) => void;
  setImageFile: (file: File | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileContextProvider({ children }: { children: React.ReactNode }) {
  const [jsonData, setJsonData] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <FileContext.Provider value={{ jsonData, imageFile, setJsonData, setImageFile }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
} 