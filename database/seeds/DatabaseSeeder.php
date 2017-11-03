<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(MoviesSeatTypesTableSeeder::class);
        $this->call(MoviesAuditoriaTableSeeder::class);
        $this->call(MoviesSeatsTableSeeder::class);
    }
}
