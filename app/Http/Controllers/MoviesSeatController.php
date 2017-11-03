<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MoviesSeatType;
use App\MoviesAuditorium;
use App\MoviesSeat;
use DB;

class MoviesSeatController extends Controller
{
    public function index(Request $request)
    {
        $sql = 'SELECT MAX(count) AS max_number FROM (
                  SELECT row, COUNT(number)
                FROM movies_seats
                GROUP BY row
                ) AS temp';
        $max_number = DB::select(DB::raw($sql))[0]->max_number;
        //dd($max_number);
        $moviesSeats = DB::table('movies_seats')
            ->join('movies_seat_types', 'movies_seats.seat_type_id', '=', 'movies_seat_types.id')
            ->select('movies_seats.row', 'movies_seats.number', 'movies_seat_types.name')
            ->orderBy('movies_seats.row', 'ASC')
            ->orderBy('movies_seats.number', 'ASC')
            ->get();
        //dd($moviesSeats);
        $maps = [];

        foreach ($moviesSeats as $moviesSeat){
            $maps[$moviesSeat->row][$moviesSeat->number] = $this->getMoviesTypeMap($moviesSeat->name);
        }
        $index = 0;
        for($i = 1; $i <= count($maps); $i++){
            for($j = 1; $j <= $max_number; $j++){
                if(isset($maps[$i][$j+ $index])){

                }else{
                    $maps[$i][$j+ $index] = '_';
                }
                if($j == $max_number){
                    $index = $j - 1;
                }
            }
        }

        dd($maps);
        return view('movies.seats.index');
        dd(MoviesAuditorium::find(2)->moviesSeats);
        dd(MoviesSeatType::find(1)->moviesSeats);

    }

    /**
     * @return string
     */
    public function getMoviesTypeMap($name)
    {
        $name = strtolower($name);
        return $name === 'ghe vip' ? 'v' : ($name === 'ghe thuong' ? 'n' : '_');
    }
}
