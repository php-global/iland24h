@extends('layouts.admin.master')

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <!-- general form elements -->
            <div class="box box-primary">
                <div class="box-header">
                    <h3 class="box-title"></h3>
                </div><!-- /.box-header -->
                <!-- form start -->
                <form action="{{ route('categories.update', $category->id) }}" method="POST">
                    {{ csrf_field() }}
                    <input type="hidden" name="_method" value="PUT">
                    <div class="box-body">
                        <div class="form-group{{ $errors->has('name') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                            <label for="name">
                                @if (count($errors) > 0)
                                    <i class="fa {{ $errors->has('name') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                @endif
                                Tên danh mục
                            </label>
                            <input type="text" class="form-control" name="name" value="{{ old('name', $category->name) }}" placeholder="Name">
                            @foreach ($errors->get('name') as $message)
                                <span class="help-block">{{ $message }}</span>
                            @endforeach
                        </div>
                        <div class="form-group{{ $errors->has('description') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                            <label for="description">
                                @if (count($errors) > 0)
                                    <i class="fa {{ $errors->has('description') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                @endif
                                Mô tả
                            </label>
                            <textarea class="form-control" name="description" rows="3" placeholder="Description">{{ old('description', $category->description) }}</textarea>
                            @foreach ($errors->get('description') as $message)
                                <span class="help-block">{{ $message }}</span>
                            @endforeach
                        </div>
                    </div><!-- /.box-body -->

                    <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Cập nhật</button>
                    </div>
                </form>
            </div><!-- /.box -->

        </div>
    </div>
@endsection