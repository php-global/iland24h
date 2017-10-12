<?php

namespace App;
use File;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Photo;

class Project extends Model
{
    protected $fillable = ['title', 'owner', 'image', 'content'];
    protected $hidden = ['created_at', 'updated_at'];

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public static function getProject($id)
    {
        return Project::findOrFail($id);
    }

    public static function getListProjects($request)
    {
        $pageSize = is_numeric($request->get('size')) ? $request->get('size') : PAGE_SIZE_DEFAULT;
        $query = Project::select('id', 'title', 'slug', 'owner', 'view', 'active', 'author_id');
        if($request->get('search')){
            $query->where('title', 'LIKE', "%{$request->get('search')}%");
        }
        return $query->orderBy('id', 'DESC')->paginate($pageSize);
    }

    public function insertProject($request)
    {

        $project = new Project();
        $project->title = $request->title;
        $project->slug = \App\Helpers\Common::convertViToEn($request->title, true);
        $project->owner = $request->owner;
        $project->area = $request->area;
        $project->direction = $request->direction;
        $project->location = $request->location;
        $project->price = $request->price;
        $file_name = $request->image1->store('storage/app/public/project');
        $project->image = $file_name;
        $project->description = $request->description;
        $project->content = $request->content;
        $project->view = 0;
        $project->active = 1;
        $project->author_id = Auth::user()->id;
        $project->save();
       // $request->file('image')->move('storage/app/upload/', $filePath);
       /* $file_name = $request->file('image')->store('upload');
        $project->image = $file_name;*/

    }

    public static function updateProject($request, $id)
    {
        $project = Project::findOrFail($id);
        $project->title = $request->title;
        $project->slug = \App\Helpers\Common::convertViToEn($request->title, true);
        $project->owner = $request->owner;
        $project->area = $request->area;
        $project->direction = $request->direction;
        $project->location = $request->location;
        $project->mobile = $request->mobile;
        $project->image = $request->image;
        $project->description = $request->description;
        $project->content = $request->content;
        $project->view = 0;
        $project->active = 1;
        $project->author_id = Auth::user()->id;
        $project->save();
    }

    public static function deleteProject($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
    }

    public function index()
    {
        die('1');
    }
}
