import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";
import UsersDataContext from "./contexts/UsersData";
import { User } from "./interfaces/User";

function App() {
  const [formState, setFormState] = useState<User>({
		cpf: '',
		age: '',
		name: '',
		marital_status: '',
		city: '',
		uf: '',
	});

  const [editState, setEditState] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>('');

  return (
    <div className="sm:container sm:mx-auto">
      <h1 className="text-4xl text-center mb-6 font-bold">Firebase Table Test</h1> 
      <UsersDataContext.Provider value={{ formState, setFormState, editState, setEditState, userId, setUserId }}>
        <Form />
        <Table />
      </UsersDataContext.Provider>
    </div>
  );
}

export default App;
