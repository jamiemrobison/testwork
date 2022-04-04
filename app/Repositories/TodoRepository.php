<?php

namespace App\Repositories;

use App\Interfaces\TodoInterface;
use App\Models\Todo;

class TodoRepository implements TodoInterface
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return Todo::all();
    }

    /**
     * @param $id
     * @return mixed
     */
    public function findOrFail($id)
    {
        return Todo::findOrFail($id);
    }

    /**
     * @param array $todo
     * @return mixed
     */
    public function create(array $todo)
    {
        return Todo::create($todo);
    }

    /**
     * @param $id
     * @param array $todo
     * @return mixed
     */
    public function update($id, array $todo)
    {
        return Todo::whereId($id)->update($todo);
    }

    /**
     * @param $id
     * @return void
     */
    public function delete($id)
    {
        Todo::destroy($id);
    }
}
