<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description'];
    protected $hidden = ['created_at', 'updated_at'];

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public static function getCategory($id)
    {
        return Category::findOrFail($id);
    }

    public static function getListCategories($request)
    {
        $pageSize = is_numeric($request->get('size')) ? $request->get('size') : PAGE_SIZE_DEFAULT;
        $query = Category::select('id', 'name', 'description');
        if($request->get('search')){
            $query->where('name', 'LIKE', "%{$request->get('search')}%");
        }
        return $query->orderBy('id', 'DESC')->paginate($pageSize);
    }

    public static function insertCategory($request)
    {
        $category = new Category();
        $category->name = $request->name;
        $category->slug = \App\Helpers\Common::convertViToEn($request->name, true);
        $category->description = $request->description;
        $category->save();
    }

    public static function updateCategory($request, $id)
    {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->slug = \App\Helpers\Common::convertViToEn($request->name, true);
        $category->description = $request->description;
        $category->save();
    }

    public static function deleteCategory($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
    }
}
