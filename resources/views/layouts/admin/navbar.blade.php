<nav class="navbar navbar-static-top" role="navigation">
    <!-- Sidebar toggle button-->
    <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </a>
    <div class="navbar-right">
        <ul class="nav navbar-nav">
            <!-- Home link -->
            <li class="dropdown home-link-menu">
                <a href="{{ url('/') }}" target="_blank">Xem trang chủ <i class="fa fa-external-link"></i></a>
            </li>
            <!-- Settings -->
            <li class="dropdown settings-menu">
                <a href="javascript:void(0);" id="btn-settings">Giao diện <i class="fa fa-gears"></i></a>
            </li>
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i>
                    <span>{{-- Auth::user()->name--}} <i class="caret"></i></span>
                </a>
                <ul class="dropdown-menu">
                    <!-- Menu Header -->
                    <li class="user-header bg-light-blue">
                        <p>
                            {{--Auth::user()->name--}}
                            <small>Member since Nov. 2012</small>
                        </p>
                    </li>
                    <!-- Menu Footer-->
                    <li class="user-footer">
                        <div class="pull-left">
                            <a href="#" class="btn btn-default btn-flat">Đổi mật khẩu</a>
                        </div>
                        <div class="pull-right">
                            <a href="{{ route('logout') }}" class="btn btn-default btn-flat" onclick="event.preventDefault();document.getElementById('logout-form').submit();">Đăng xuất</a>
                        </div>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            {{ csrf_field() }}
                        </form>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
