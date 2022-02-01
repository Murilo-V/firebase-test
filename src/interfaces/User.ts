export interface User {
    name: string;
    age: string;
    cpf: string;
    marital_status: string;
    city: string;
    uf: string;
}

export interface UserData {
    data: User;
    id: string;
}
