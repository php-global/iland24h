<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = ['project_id', 'image'];
    protected $hidden = ['created_at', 'updated_at'];
}
