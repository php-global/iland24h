<?php

use Illuminate\Database\Seeder;

class MoviesSeatTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies_seat_types')->insert([
          [
            'name' => 'Ghe Vip',
            'price' => 80,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ],
          [
            'name' => 'Ghe thuong',
            'price' => 50,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ]
        ]);
    }
}
