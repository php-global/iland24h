<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMoviesSeatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies_seats', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('row');
            $table->integer('number');
            $table->integer('auditorium_id')->unsigned();
            $table->integer('seat_type_id')->unsigned();
            $table->foreign('auditorium_id')->references('id')->on('movies_auditoria')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('seat_type_id')->references('id')->on('movies_seat_types')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('movies_seats');
    }
}
