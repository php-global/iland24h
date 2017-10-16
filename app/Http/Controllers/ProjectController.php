<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use function Sodium\compare;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $projects = Project::getListProjects($request);
        return view('projects.index', compact('projects'));
    }

    /**
     * Show the form for creating a new resource
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('projects._form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        $a = new Project();
        $a->insertProject($request);
        return redirect()->route('projects.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::INSERT_SUCCESS
        ]);


    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $project = Project::getProjectByID($id);
        return view('projects._formEdit',['project'=>$project]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectRequest $request,$id)
    {
        Project::updateProject($request,$id);
        return redirect()->route('projects.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::UPDATE_SUCCESS
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectRequest $request)
    {
        return ['tesing' => 1];
//
//        $id = $request->delete_id;
//        dd($id);
//        Project::deleteProject($id);
       /* return redirect()->route('projects.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::DELETE_SUCCESS
        ]);*/
    }

    public function postEditProject(ProjectRequest $request,$id)
    {
        Project::updateProject($request,$id);
        return redirect()->route('projects.index')->with([
            'flash_level' => 'success',
            'flash_message' => \App\Helpers\Msg::UPDATE_SUCCESS

        ]);
    }
}
