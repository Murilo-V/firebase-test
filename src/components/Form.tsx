import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import UsersDataContext from "../contexts/UsersData";
import { User } from "../interfaces/User";
import { db } from "../lib/firebase";

function Form() {

  const { formState, setFormState, editState, setEditState, userId, setUserId } = useContext(UsersDataContext);

  async function addUser(user: User): Promise<void> {
    await setDoc(doc(db, "users", String(Math.random())), user);
    clearForm();
  }

  function clearForm(): void {
		setFormState({
      cpf: '',
      age: '',
      name: '',
      marital_status: '',
      city: '',
      uf: '',
		});
	}

  async function editClientData({ age, city, cpf, marital_status, name, uf }: User): Promise<void> {
    await updateDoc(doc(db, "users", userId), { age, city, cpf, marital_status, name, uf })
		setEditState(false);
    setUserId('');
		clearForm();
	}

    return (
            <form className="mb-6">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6 mb-4">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome
                      </label>
                      <input
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        value={formState.name}
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Idade
                      </label>
                      <input
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        type="text"
                        name="age"
                        id="age"
                        value={formState.age}
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700">
                        Estado Civil
                      </label>
                      <input
                        value={formState.marital_status}
                        type="text"
                        name="marital_status"
                        id="marital_status"
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                        CPF
                      </label>
                      <input
                        value={formState.cpf}
                        type="text"
                        name="cpf"
                        id="cpf"
                        placeholder="XXX.XXX.XXX-XX"
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        Cidade
                      </label>
                      <input
                        value={formState.city}
                        type="text"
                        name="city"
                        id="city"
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="uf" className="block text-sm font-medium text-gray-700">
                        Estado
                      </label>
                      <input
                        value={formState.uf}
                        type="text"
                        name="uf"
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        id="uf"
                        minLength={2}
                        maxLength={2}
                        placeholder="Exemplo: SP"
                        className="mt-1 p-2 block w-full shadow-lg sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  { editState ? 
						        <button 
                      type="button" 
                      onClick={() => editClientData(formState)} 
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-lg text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Editar
                    </button> :
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-lg text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => addUser(formState)}
                    >
                      Salvar
                    </button>
					        }
                </div>
              </div>
            </form>
    );
}

export default Form;