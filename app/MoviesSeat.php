<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MoviesSeat extends Model
{
  public function moviesType()
  {
    return $this->belongsTo('App\MoviesSeatType', 'seat_type_id', 'id');
  }

  public function moviesAuditorium()
  {
    return $this->belongsTo('App\MoviesAuditorium', 'auditorium_id', 'id');
  }
}
