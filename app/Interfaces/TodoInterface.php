<?php

namespace App\Interfaces;

interface TodoInterface
{
    public function all();
    public function findOrFail($id);
    public function create(array $todo);
    public function delete($id);
    public function update($id, array $todo);
}
