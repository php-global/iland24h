<aside class="left-side sidebar-offcanvas{{ Request::cookie('theme_nvcllps') === 'true' ? ' collapse-left' : '' }}">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- Sidebar user panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="../img/avatar5.png" class="img-circle" alt="User Image"/>
            </div>
            <div class="pull-left info">
                <p>Xin chào {{--Auth::user()->name--}}</p>

                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>
        <!-- search form -->
        <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search..."/>
                <span class="input-group-btn">
                    <button type="submit" name="seach" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </form>
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu">
            <li class="active">
                <a href="javascript:void(0);">
                    <i class="fa fa-dashboard"></i> <span>Bảng điều khiển</span>
                </a>
            </li>
            <li class="treeview">
                <a href="javascript:void(0);">
                    <i class="fa fa-folder"></i>
                    <span>Danh mục tin tức</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="{{ route('categories.index') }}"><i class="fa fa-angle-double-right"></i> Danh sách</a></li>
                    <li><a href="{{ route('categories.create') }}"><i class="fa fa-angle-double-right"></i> Thêm mới</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="javascript:void(0);">
                    <i class="fa fa-edit"></i> <span>Tin tức</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i> Danh sách</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i> Thêm mới</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="javascript:void(0);">
                    <i class="fa fa-table"></i> <span>Dự án</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i> Danh sách</a></li>
                    <li><a href="#"><i class="fa fa-angle-double-right"></i> Thêm mới</a></li>
                </ul>
            </li>
            <li class="treeview">
                <a href="javascript:void(0);">
                    <i class="fa fa-users"></i> <span>Quản lý tài khoản</span>
                    <i class="fa fa-angle-left pull-right"></i>
                </a>
                <ul class="treeview-menu">
                    <li><a href="#"><i class="fa fa-angle-double-right"></i> Danh sách</a></li>
                </ul>
            </li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>
