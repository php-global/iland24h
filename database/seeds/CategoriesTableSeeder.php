<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
          [
            'name' => 'Tin tuc',
            'slug' => 'tin-tuc',
            'description' => 'mo ta tin tuc',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ],
          [
            'name' => 'Xa hoi',
            'slug' => 'xa-hoi',
            'description' => 'mo ta xa hoi',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ],
          [
            'name' => 'Gia tri',
            'slug' => 'gia-tri',
            'description' => 'mo ta giai tri',
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
          ]
        ]);
    }
}
