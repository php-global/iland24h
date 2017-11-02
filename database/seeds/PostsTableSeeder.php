<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('posts')->insert([
        [
          'title' => 'Tin tuc Xa hoi',
          'slug' => 'tin-tuc-xa-hoi',
          'image' => 'Xa hoi',
          'description' => 'Xa hoi',
          'content' => 'Xa hoi',
          'view' => 0,
          'active' => 1,
          'author_id' => 1,
          'category_id' => 1,
          'created_at' => date('Y-m-d H:i:s'),
          'updated_at' => date('Y-m-d H:i:s')
        ],
        [
          'title' => 'Tin tuc Xa hoi',
          'slug' => 'tin-tuc-xa-hoi',
          'image' => 'Xa hoi',
          'description' => 'Xa hoi',
          'content' => 'Xa hoi',
          'view' => 0,
          'active' => 1,
          'author_id' => 1,
          'category_id' => 2,
          'created_at' => date('Y-m-d H:i:s'),
          'updated_at' => date('Y-m-d H:i:s')
        ],
        [
          'title' => 'Tin tuc Xa hoi',
          'slug' => 'tin-tuc-xa-hoi',
          'image' => 'Xa hoi',
          'description' => 'Xa hoi',
          'content' => 'Xa hoi',
          'view' => 0,
          'active' => 1,
          'author_id' => 1,
          'category_id' => 3,
          'created_at' => date('Y-m-d H:i:s'),
          'updated_at' => date('Y-m-d H:i:s')
        ]
      ]);
    }
}
