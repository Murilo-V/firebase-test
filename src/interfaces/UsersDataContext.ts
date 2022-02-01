import { User } from "./User";

export default interface IUsersDataContext {
    formState: User;
    setFormState: React.Dispatch<React.SetStateAction<User>>;
    editState: boolean;
    setEditState: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
}