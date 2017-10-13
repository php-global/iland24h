@extends('layouts.admin.master')
@section('script')
    <!-- CK Editor -->
    <script src="{{ asset('js/plugins/ckeditor/ckeditor.js') }}" type="text/javascript"></script>
    <!-- Controller -->
    <script src="{{ asset('js/controllers/ProjectController.js') }}" type="text/javascript"></script>
    <!-- Custom -->
    <script type="text/javascript">
      $(function () {
        CKEDITOR.replace('content');
      });
    </script>
@endsection
@section('header')
    <h1>
        Danh mục dự án
        <small>Cập nhật</small>
    </h1>

@endsection

@section('breadcrumb')
    <ol class="breadcrumb">
        <li><a href="{{ url('/admin') }}"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Danh mục tin tức</li>
    </ol>
@endsection

@section('content')
    @foreach($data as $row)
        <div class="row">
            <div class="col-xs-12">
                <!-- general form elements -->
                <div class="box box-primary">
                    <!-- form start -->
                    <form action=" {{ route('projects.update', $projects->id) }}  " method="post" enctype="multipart/form-data">
                        {{ csrf_field() }}
                        <input type="hidden" name="_method" value="PUT">
                        <div class="box-body">
                            <div class="form-group{{ $errors->has('title') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="title">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('title') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Tên dự án
                                </label>
                                <input type="text" class="form-control" name="title"
                                       value="{{ old('title',$row->title ) }}" placeholder="Title">
                                @foreach ($errors->get('title') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>

                            <div class="form-group{{ $errors->has('owner') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="owner">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('owner') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Tên dự án
                                </label>
                                <input type="text" class="form-control" name="owner"
                                       value="{{ old('owner',$row->owner ) }}" placeholder="Owner">
                                @foreach ($errors->get('owner') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>

                            <div class="form-group{{ $errors->has('area') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="area">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('area') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Diện tích
                                </label>
                                <input type="text" class="form-control" name="area"
                                       value="{{ old('name',$row->area ) }}" placeholder="Area">
                                @foreach ($errors->get('area') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>

                            <div class="form-group{{ $errors->has('direction') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="direction">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('direction') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Phương hướng
                                </label>
                                <input type="text" class="form-control" name="direction"
                                       value="{{ old('direction',$row->direction ) }}" placeholder="Direction">
                                @foreach ($errors->get('direction') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>

                            <div class="form-group{{ $errors->has('location') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="location">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('location') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Vị trí
                                </label>
                                <input type="text" class="form-control" name="location"
                                       value="{{ old('location',$row->location ) }}" placeholder="Location">
                                @foreach ($errors->get('location') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>

                            <div class="form-group{{ $errors->has('price') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                                <label for="price">
                                    @if (count($errors) > 0)
                                        <i class="fa {{ $errors->has('price') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                                    @endif
                                    Giá bán dự kiến (triệu/m<sup>2</sup> | tỷ)
                                </label>
                                <input type="text" class="form-control" name="price"
                                       value="{{ old('price',$row->price ) }}" placeholder="Price">
                                @foreach ($errors->get('price') as $message)
                                    <span class="help-block">{{ $message }}</span>
                                @endforeach
                            </div>
                            <div class="form-group">
                                <label>Ảnh đại diện</label>
                                <input type="file" name="image">
                                {{--<img src="{{asset($row->image)}}" alt="Image" class="img-current">--}}
                            </div>

                            <div class="form-group">
                                <label for="photos">
                                    <i class="fa fa-status"></i>
                                    Ảnh thumbnail
                                </label>
                                <button type="button" class="btn btn-xs btn-success" onclick="addPhoto();">Thêm ảnh thu nhỏ</button>
                                <span class="help-block"></span>
                            </div>

                            <div class="form-group">
                                <label for="description">
                                    <i class="fa fa-status"></i>
                                    Giới thiệu thông tin sơ lược dự án
                                </label>
                                <textarea class="form-control" rows="3" name="description" placeholder="Description" >{{ old('description',$row->description ) }}</textarea>
                                <span class="help-block"></span>
                            </div>
                            <div class="form-group">
                                <label for="content">
                                    <i class="fa fa-status"></i>
                                    Nội dung dự án <i class="fa fa-fw fa-asterisk text-danger"></i>
                                </label>
                                <textarea class="form-control" rows="5" name="content" placeholder="Content">{{ old('content',$row->content ) }}</textarea>
                                <span class="help-block"></span>
                            </div>

                        </div><!-- /.box-body -->

                        <div class="box-footer">
                            <button type="submit" class="btn btn-primary">Cập nhật</button>
                        </div>
                    </form>
                </div><!-- /.box -->

            </div>
        </div>
    @endforeach
@endsection