<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MoviesAuditorium extends Model
{
  public function moviesSeats()
  {
    return $this->hasMany('App\MoviesSeat', 'auditorium_id', 'id');
  }
}
