@extends('layouts.admin.master')

@section('header')
<h1>Quản lý dự án</h1>
@endsection

@section('breadcrumb')
<ol class="breadcrumb">
    <li><a href="{{ url('/admin') }}"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Quản lý dự án</li>
</ol>
@endsection

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

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                @include('elements.box-header', ['action' => route('projects.index')])
                <a class="btn btn-app" data-toggle="modal" data-target="#modal-project">
                    <i class="fa fa-plus text-success"></i> Tạo dự án
                </a>
            </div><!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <th>Tên dự án</th>
                        <th>Chủ đầu tư</th>
                        <th>Lượt xem</th>
                        <th>Trạng thái</th>
                        <th>Người đăng</th>
                        <th colspan="3">Hành động</th>
                    </tr>
                    <?php $no = 1; ?>
                    @foreach($projects as $project)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $project->title }}</td>
                        <td>{{ $project->owner }}</td>
                        <td>{{ $project->view }}</td>
                        <td>{{ $project->active }}</td>
                        <td>{{ $project->author_id }}</td>
                        <td>
                            <i class="fa fa-eye fa-fw"></i>
                            <a href="{{ route('projects.show', $project->slug) }}" target="_blank">Xem</a>
                        </td>
                        <td>
                            <i class="fa fa-pencil fa-fw"></i>
                            <a href="{{ url('/getEditProject/'.$project->id) }}">Sửa</a>
                        </td>
                        <td>
                            <form action="{{ route('projects.destroy', $project->id) }}" method="POST">
                                <input type="hidden" name="_method" value="DELETE">
                                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                <i class="fa fa-trash-o fa-fw"></i>
                                <a href="javascript:void(0);" onclick="if(confirm('Bạn có chắc chắn muốn xóa?')){$(this).parent().submit();}">Xóa</a>
                            </form>
                        </td>
                    </tr>
                    @endforeach
                    @if(!$projects->count())
                    <tr>
                        <td colspan="8" align="center"><h1>Không có dữ liệu</h1></td>
                    </tr>
                    @endif
                    </tbody>
                </table>
            </div><!-- /.box-body -->
            @if($projects->count())
            <div class="box-footer clearfix">
                <div class="pull-left">
                    <label>Hiển thị {{ $projects->firstItem() }} đến {{ $projects->lastItem() }} - Tổng số {{ $projects->total() }} bản ghi</label>
                </div>
                {{ $projects->appends(['size' => Request::get('size'), 'search' => Request::get('search')])->links('vendor.pagination.default') }}
            </div>
            @endif
        </div><!-- /.box -->
    </div>
</div>
@include('projects._form')
@endsection