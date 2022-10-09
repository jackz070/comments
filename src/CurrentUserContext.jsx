import React, { createContext, useEffect, useState } from "react";

const getInitialCurrentUser = () => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser
    ? JSON.parse(currentUser)
    : {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      };
};

export const CurrentUserContext = createContext();
export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(getInitialCurrentUser);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
