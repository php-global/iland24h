<div class="modal fade" id="modal-project">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form method="post" action="{{ route('projects.store') }}" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Tạo dự án</h4>
            </div>
            <div class="modal-body">
                <div class="form-group{{ $errors->has('title') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="title">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('title') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Tên dự án <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="title" value="{{ old('title') }}"
                           placeholder="Title">
                    @foreach ($errors->get('title') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('owner') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="owner">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('owner') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Chủ đầu tư <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="owner" value="{{ old('owner') }}"
                           placeholder="Owner">
                    @foreach ($errors->get('owner') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('area') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="area">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('area') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Diện tích (m<sup>2</sup>)
                    </label>
                    <input type="text" class="form-control" name="area" value="{{ old('area') }}"
                           placeholder="Area">
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
                    <input type="text" class="form-control" name="direction" value="{{ old('direction') }}"
                           placeholder="Direction">
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
                    <input type="text" class="form-control" name="location" value="{{ old('location') }}"
                           placeholder="Location">
                    @foreach ($errors->get('location') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('price') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="price">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('price') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Giá bán dự kiến (triệu/m<sup>2</sup> | tỷ)  <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="price" value="{{ old('price') }}"
                           placeholder="Price">
                    @foreach ($errors->get('price') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('image') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="image">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('image') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Ảnh giới thiệu <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="file" name="image">
                    @foreach ($errors->get('image') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('photos') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="photos">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('photos') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Ảnh thumbnail
                    </label>
                    <button type="button" class="btn btn-xs btn-success" onclick="addPhoto();">Thêm ảnh thu nhỏ</button>
                    @foreach ($errors->get('photos') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('description') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="description">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('description') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Giới thiệu thông tin sơ lược dự án
                    </label>
                    <textarea class="form-control" rows="3" name="description"
                              placeholder="Description">{{ old('description') }}</textarea>
                    @foreach ($errors->get('description') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
                <div class="form-group{{ $errors->has('content') ? ' has-error' : (count($errors) > 0 ? ' has-success' : '') }}">
                    <label for="content">
                        @if (count($errors) > 0)
                            <i class="fa {{ $errors->has('content') ? 'fa-times-circle-o' : 'fa-check' }}"></i>
                        @endif
                        Nội dung dự án <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <textarea class="form-control" rows="5" name="content"
                              placeholder="Content">{{ old('content') }}</textarea>
                    @foreach ($errors->get('content') as $message)
                        <span class="help-block">{{ $message }}</span>
                    @endforeach
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-success">Tạo mới</button>
            </div>
            </form>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div><!-- /.modal -->


