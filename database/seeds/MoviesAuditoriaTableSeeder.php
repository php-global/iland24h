<?php

use Illuminate\Database\Seeder;

class MoviesAuditoriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('movies_auditoria')->insert([
          [
            'name' => 302,
            'seats_no' => null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ],
          [
            'name' => 303,
            'seats_no' => null,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ]
        ]);
    }
}
