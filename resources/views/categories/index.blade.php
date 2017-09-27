@extends('layouts.admin.master')

@section('header')
<h1>Danh mục tin tức</h1>
@endsection

@section('breadcrumb')
<ol class="breadcrumb">
    <li><a href="{{ url('/admin') }}"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Danh mục tin tức</li>
</ol>
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                @include('elements.box-header', ['action' => route('categories.index')])
            </div><!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>No</th>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th colspan="2">Hành động</th>
                    </tr>
                    <?php $no = 1; ?>
                    @foreach($categories as $category)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $category->name }}</td>
                        <td>{{ $category->description }}</td>
                        <td>
                            <i class="fa fa-pencil fa-fw"></i>
                            <a href="{{ route('categories.edit', $category->id) }}">Sửa</a>
                        </td>
                        <td>
                            <form action="{{ route('categories.destroy', $category->id) }}" method="POST">
                                <input type="hidden" name="_method" value="DELETE">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <i class="fa fa-trash-o fa-fw"></i>
                                <a href="javascript:void(0);" onclick="if(confirm('Bạn có chắc chắn muốn xóa?')){$(this).parent().submit();}">Xóa</a>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                    @if(!$categories->count())
                    <tr>
                        <td colspan="5" align="center"><h1>Không có dữ liệu</h1></td>
                    </tr>
                    @endif
                    </tbody>
                </table>
            </div><!-- /.box-body -->
            @if($categories->count())
            <div class="box-footer clearfix">
                <div class="pull-left">
                    <label>Hiển thị {{ $categories->firstItem() }} đến {{ $categories->lastItem() }} - Tổng số {{ $categories->total() }} bản ghi</label>
                </div>
                {{ $categories->appends(['size' => Request::get('size'), 'search' => Request::get('search')])->links('vendor.pagination.default') }}
            </div>
            @endif
        </div><!-- /.box -->
    </div>
</div>
@endsection