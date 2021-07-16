import { createContext, useState } from "react";


export const ProfilContext = createContext('');

export const ProfilProvider = ({ children }) => {
  const [profilUser, setProfilUserin] = useState({});
  const setProfilUser = (newValue) => {
    setProfilUserin({...newValue});
  };

  return (
    <ProfilContext.Provider value={{ profilUser, setProfilUser }}>
      {children}
    </ProfilContext.Provider>
  );
};
