<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

    public static function insertProject($request)
    {
        $filePath = $request->file('image')->getClientOriginalName();
        $project = new Project();
        $project->title = $request->title;
        $project->slug = \App\Helpers\Common::convertViToEn($request->title, true);
        $project->owner = $request->owner;
        $project->area = $request->area;
        $project->direction = $request->direction;
        $project->location = $request->location;
        $project->price = $request->price;
        $project->image = $filePath;
        $project->description = $request->description;
        $project->content = $request->content;
        $project->view = 0;
        $project->active = 1;
        $project->author_id = Auth::user()->id;
        $request->file('image')->move('storage/app/upload',$filePath);
        $project->save();
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
}
