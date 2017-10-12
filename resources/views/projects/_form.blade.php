<div class="modal fade" id="modal-project">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" >
            <form id="form-project"  method="post" action="{{url('insert')}}" enctype="multipart/form-data">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span></button>
                <h4 class="modal-title">Tạo dự án</h4>
            </div>
            <div class="modal-body" >
                <div class="form-group">
                    <label for="title">
                        <i class="fa fa-status"></i>
                        Tên dự án <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="title" placeholder="Title">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="owner">
                        <i class="fa fa-status"></i>
                        Chủ đầu tư <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="owner" placeholder="Owner">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="area">
                        <i class="fa fa-status"></i>
                        Diện tích (m<sup>2</sup>)
                    </label>
                    <input type="text" class="form-control" name="area" placeholder="Area">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="direction">
                        <i class="fa fa-status"></i>
                        Phương hướng
                    </label>
                    <input type="text" class="form-control" name="direction" placeholder="Direction">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="location">
                        <i class="fa fa-status"></i>
                        Vị trí
                    </label>
                    <input type="text" class="form-control" name="location" placeholder="Location">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="price">
                        <i class="fa fa-status"></i>
                        Giá bán dự kiến (triệu/m<sup>2</sup> | tỷ)  <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="text" class="form-control" name="price" placeholder="Price">
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="image">
                        <i class="fa fa-status"></i>
                        Ảnh giới thiệu <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <input type="file" name="image">
                    <span class="help-block"></span>
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
                    <textarea class="form-control" rows="3" name="description" placeholder="Description"></textarea>
                    <span class="help-block"></span>
                </div>
                <div class="form-group">
                    <label for="content">
                        <i class="fa fa-status"></i>
                        Nội dung dự án <i class="fa fa-fw fa-asterisk text-danger"></i>
                    </label>
                    <textarea class="form-control" rows="5" name="content" placeholder="Content"></textarea>
                    <span class="help-block"></span>
                </div>
            </div>
            <div class="modal-footer">
                <button type="submit" id="btn-project" class="btn btn-success">Tạo mới</button>
            </div>
            </form>

        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div><!-- /.modal -->


