<form id="box-header-group" action="{{ $action }}" method="GET" class="form-inline">
    <div class="form-group row">
        <div class="col-xs-6">
            <label>Hiển thị
                <select name="size" class="form-control input-sm" onchange="document.getElementById('box-header-group').submit();">
                    <?php $pageSizeArr = [10, 25, 50, 100]; ?>
                    @foreach($pageSizeArr as $size)
                        <option value="{{ $size }}" {{ Request::get('size') == $size ? 'selected' : '' }}>{{ $size }}</option>
                    @endforeach
                </select> dòng
            </label>
        </div>
        <div class="col-xs-6">
            <div class="input-group">
                <input type="text" name="search" class="form-control input-sm pull-right" value="{{ Request::get('search') }}" placeholder="Tìm kiếm" style="width: 150px;">
                <div class="input-group-btn">
                    <button class="btn btn-sm btn-default"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </div>
    </div>
</form>
