import React, {useEffect, useState} from "react";
import {TrashIcon} from "@heroicons/react/outline";
import axios from "axios";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodoList();
    }, []);

    const fetchTodoList = () => {
        axios.get('/api/todos').then(response => setTodos(response.data.data));
    }

    const addTodo = () => {
        axios.post('/api/todos', {description}).then(response => {
            setDescription('');
            fetchTodoList();
        });
    }

    const markTodo = (id: bigint, is_completed: boolean) => {
        axios.put(`/api/todos/${id}`, {is_completed}).then(() => {
            fetchTodoList()
        })
    }

    const deleteTodo = (id: bigint) => {
        axios.delete(`/api/todos/${id}`).then(() => {
            fetchTodoList()
        })
    }
    return (
        <div className="flex justify-center py-5 px-8 mt-5">
            <div className="w-3/6">
                <div className="block p-6 rounded-lg shadow-lg bg-white">
                    <input
                        type="text"
                        className="form-input rounded mr-2 w-5/6"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        type="button"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-75"
                        disabled={!description}
                        onClick={() => addTodo()}
                    >
                        Add
                    </button>
                </div>
                {todos.length && <div className="block p-6 rounded-lg shadow-lg bg-white mt-5">
                    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Todos List</h5>
                    <div className="flex justify-center">
                        <ul className="bg-white rounded-lg border border-gray-200 text-gray-900">
                            {todos.map(({id, description, is_completed}: any) => <li
                                key={id}
                                className="flex justify-between px-3 py-2 border-b border-gray-200">
                                <input
                                    type="checkbox"
                                    className="form-checkbox rounded mt-3"
                                    checked={is_completed}
                                    onChange={(e) => !is_completed ? markTodo(id, !is_completed) : ''}
                                />
                                <div className="ml-2 text-left">{description}</div>
                                <div className="py-2">
                                    <TrashIcon
                                        className="w-6 h-6 cursor-pointer text-red-700"
                                        onClick={() => deleteTodo(id)}
                                    />
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default App;
