<?php

use Illuminate\Database\Seeder;

class MoviesSeatsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies_seats')->insert([
            ['row' => 1, 'number' => 1, 'auditorium_id' => 1, 'seat_type_id' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 1, 'number' => 2, 'auditorium_id' => 1, 'seat_type_id' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 1, 'number' => 3, 'auditorium_id' => 1, 'seat_type_id' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 1, 'number' => 4, 'auditorium_id' => 1, 'seat_type_id' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 1, 'number' => 5, 'auditorium_id' => 1, 'seat_type_id' => 1, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 1, 'number' => 6, 'auditorium_id' => 1, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 7, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 8, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 9, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 10, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 11, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 12, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 2, 'number' => 13, 'auditorium_id' => 2, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 3, 'number' => 14, 'auditorium_id' => 1, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 3, 'number' => 15, 'auditorium_id' => 1, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
            ['row' => 3, 'number' => 16, 'auditorium_id' => 1, 'seat_type_id' => 2, 'created_at' => date('Y-m-d H:i:s'), 'updated_at' => date('Y-m-d H:i:s')],
        ]);
    }
}
