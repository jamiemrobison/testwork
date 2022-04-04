<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoRequest;
use App\Http\Resources\TodoResource;
use App\Interfaces\TodoInterface;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    private TodoInterface $todoRepository;

    /**
     * @param TodoInterface $todoRepository
     */
    public function __construct(TodoInterface $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return response()->json([
            'data' => TodoResource::collection($this->todoRepository->all())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param TodoRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TodoRequest $request)
    {
        $todo = $request->only([
            'description'
        ]);

        return response()->json([
            'data' => $this->todoRepository->create($todo)
        ], Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
    {
        $todo = $request->only([
           'is_completed'
        ]);

        return response()->json([
            'data' => $this->todoRepository->update($id, $todo)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $this->todoRepository->delete($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
