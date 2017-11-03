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
        $sql = 'SELECT MAX(total) AS max_number FROM (
                  SELECT row, COUNT(number) AS total
                FROM movies_seats
                GROUP BY row
                ) AS temp';
        $max_number = DB::select(DB::raw($sql))[0]->max_number;
        //dd($max_number);

        $moviesSeats = DB::table('movies_seats')
            ->join('movies_seat_types', 'movies_seats.seat_type_id', '=', 'movies_seat_types.id')
            ->select(DB::raw('CASE movies_seat_types.id
                WHEN 1 THEN "v"
                WHEN 2 THEN "n"
                ELSE "_"
                END AS type'), 'movies_seats.row', 'movies_seats.number', 'movies_seat_types.name')
            ->orderBy('movies_seats.row', 'ASC')
            ->orderBy('movies_seats.number', 'ASC')
            ->get();
        //dd($moviesSeats);

        $seats = [];
        foreach ($moviesSeats as $moviesSeat){
            $seats[$moviesSeat->row][$moviesSeat->number] = $moviesSeat->type;
        }
        //dd($seats);

        $maps = [];
        for($i = 1; $i <= count($seats); $i++){
            $maxi = count($seats[$i]);
            for($j = 1; $j <= $max_number - $maxi; $j++){
                $seats[$i][] = '_';
            }
            $maps[] = implode($seats[$i], '');
        }
        //dd($maps);
        return view('movies.seats.index', compact('maps'));

    }
}
