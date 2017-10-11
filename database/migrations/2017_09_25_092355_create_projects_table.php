<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('projects', function (Blueprint $table) {
      $table->increments('id');
      $table->string('title');//tên dự án
      $table->string('slug');//ten-du-an
      $table->string('owner');//chủ đầu tư
      $table->string('area')->nullable();//diện tích m2
      $table->string('direction')->nullable();//phương hướng
      $table->string('location')->nullable();//vị trí
      $table->string('price');//Giá bán dự kiến
      $table->string('image', 50);//hình ảnh giới thiệu
      $table->text('description')->nullable();//giới thiệu dự án
      $table->longText('content');//nội dung chi tiết dự án
      $table->integer('view')->default(0);
      $table->boolean('active')->default(1);
      $table->integer('author_id')->unsigned();
      $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('projects');
  }
}
