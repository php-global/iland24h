<script src="{{ asset('js/controllers/ProjectController.js') }}" type="text/javascript"></script>
<!-- Custom -->
<script type="text/javascript">
  $(function () {
    CKEDITOR.replace('content');
  });
</script>
<form method="post" action=" {{ route('projects.update',$project->id) }} " enctype="multipart/form-data">
    {!! csrf_field() !!}
    <input type="hidden" name="_method" value="PUT">
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"
                aria-label="Close">
            <span aria-hidden="true">×</span></button>
        <h4 class="modal-title">Sửa dự án</h4>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <label for="title">
                <i class="fa fa-status"></i>
                Tên dự án <i
                        class="fa fa-fw fa-asterisk text-danger"></i>
            </label>
            <input type="text" class="form-control" name="title"
                   placeholder="Title"
                   value="{{ old('title', $project->title)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="owner">
                <i class="fa fa-status"></i>
                Chủ đầu tư <i
                        class="fa fa-fw fa-asterisk text-danger"></i>
            </label>
            <input type="text" class="form-control" name="owner"
                   placeholder="Owner"
                   value="{{ old('owner', $project->owner)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="area">
                <i class="fa fa-status"></i>
                Diện tích (m<sup>2</sup>)
            </label>
            <input type="text" class="form-control" name="area"
                   placeholder="Area"
                   value="{{ old('area', $project->area)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="direction">
                <i class="fa fa-status"></i>
                Phương hướng
            </label>
            <input type="text" class="form-control" name="direction"
                   placeholder="Direction"
                   value="{{ old('direction', $project->direction)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="location">
                <i class="fa fa-status"></i>
                Vị trí
            </label>
            <input type="text" class="form-control" name="location"
                   placeholder="Location"
                   value="{{ old('location', $project->location)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="price">
                <i class="fa fa-status"></i>
                Giá bán dự kiến (triệu/m<sup>2</sup> | tỷ) <i
                        class="fa fa-fw fa-asterisk text-danger"></i>
            </label>
            <input type="text" class="form-control" name="price"
                   placeholder="Price"
                   value="{{ old('price', $project->price)}}">
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="image">
                <i class="fa fa-status"></i>
                Ảnh giới thiệu <i
                        class="fa fa-fw fa-asterisk text-danger"></i>
            </label>

            <input type="file" name="image" value="{{asset($project->image)}}">
            {{--<img src="{{storage_path('app/')}}" alt="Image"
                 class="img-current">--}}
            <img style="width: 40px; height: 40px" src="{{asset($project->image)}}" >
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="photos">
                <i class="fa fa-status"></i>
                Ảnh thumbnail
            </label>
            <button type="button" class="btn btn-xs btn-success"
                    onclick="addPhoto();">Thêm ảnh thu nhỏ
            </button>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="description">
                <i class="fa fa-status"></i>
                Giới thiệu thông tin sơ lược dự án
            </label>
            <textarea class="form-control" rows="3" name="description"
                      placeholder="Description">{{old('description', $project->description)}}</textarea>
            <span class="help-block"></span>
        </div>
        <div class="form-group">
            <label for="content">
                <i class="fa fa-status"></i>
                Nội dung dự án <i
                        class="fa fa-fw fa-asterisk text-danger"></i>
            </label>
            <textarea class="form-control" rows="5" name="content"
                      placeholder="Content"> {{old('content', $project->content)}}</textarea>
            <span class="help-block"></span>
        </div>
    <div class="modal-footer">
        <button type="submit" id="btn-update" class="btn btn-success">
            Cập nhật
        </button>
    </div>

</div>
</form>