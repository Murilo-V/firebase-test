import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import UsersDataContext from "../contexts/UsersData";
import { User, UserData } from "../interfaces/User";
import { db } from "../lib/firebase";

function Table() {

    const [users, setUsers] = useState<UserData[]>([]);
    const { setFormState, setEditState, setUserId } = useContext(UsersDataContext);

    useEffect(() => {
        async function getUsers() {
            const q = query(collection(db, "users"))
            onSnapshot(q, (querySnapshot) => {
                const docs: UserData[] = [];
                querySnapshot.forEach((doc) => {
                    docs.push({data: doc.data() as User, id: doc.id});
                });
                setUsers(docs);
            }) 
        }
        getUsers();
    }, []);

    async function removeUser(id: string) {
        await deleteDoc(doc(db, "users", id));
    }

    function allowUserDataEdition(userData: UserData) {
        setFormState(userData.data);
        setUserId(userData.id);
        setEditState(true);
    }

    return (
        <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Idade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado civil
                  </th>
                 <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    CPF
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cidade
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Editar ou Excluir</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {
                    users.map((user) => {
                        return (
                            <tr key={String(Math.random())}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.age}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.marital_status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.cpf}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.city}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.data.uf}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium mr-4 shadow-lg" onClick={() => allowUserDataEdition(user)}type="button">Editar</button>
                                    <button className="bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium shadow-xl shadow-lg" onClick={() => removeUser(user.id)} type="button">Excluir</button>
                                </td>
                            </tr>
                        )
                    })
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Table;