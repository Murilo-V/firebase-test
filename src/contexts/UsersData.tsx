import { createContext } from "react";
import IUsersDataContext from "../interfaces/UsersDataContext";

const UsersDataContext = createContext<IUsersDataContext>({} as IUsersDataContext);
 
export default UsersDataContext;