<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
use Auth;
use Mail;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::getListCategories($request);
        return view('categories.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('categories.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CategoryRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
        Category::insertCategory($request);
        return redirect()->route('categories.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::INSERT_SUCCESS
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  string $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::getCategory($id);
        return view('categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\CategoryRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, $id)
    {
        Category::updateCategory($request, $id);
        return redirect()->route('categories.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::UPDATE_SUCCESS
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Category::deleteCategory($id);
        return redirect()->route('categories.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::DELETE_SUCCESS
        ]);
    }

    /**
     * @return string
     */
    public function sendMail()
    {
        $user = Auth::user();
        $result = Mail::send('mail.test', ['content' => 'Noi dung'], function($message) use ($user){
            $message->from('dangvandai1992@gmail.com', 'dangvandai1992');
            $message->to($user->email, $user->name)->subject('Tiêu đề mail!');
        });
        dd($result);
    }
}
