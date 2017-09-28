<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>{{ config('app.name', 'iland24h') }} | Dashboard</title>
    <!-- bootstrap 3.0.2 -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css"/>
    <!-- font Awesome -->
    <link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet" type="text/css"/>
    <!-- Ionicons -->
    <link href="{{ asset('css/ionicons.min.css') }}" rel="stylesheet" type="text/css"/>
    <!-- Theme style -->
    <link href="{{ asset('css/AdminLTE.css') }}" rel="stylesheet" type="text/css"/>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<body class="{{ (isset($_COOKIE['theme_skin']) ? $_COOKIE['theme_skin'] : 'skin-black') . ' ' . (isset($_COOKIE['theme_fixed']) ? $_COOKIE['theme_fixed'] : '') }}">
<!-- header logo: style can be found in header.less -->
<header class="header">
    <a href="{{ url('/') }}" class="logo">
        <!-- Add the class icon to your logo image or logo icon to add the margining -->
        {{ config('app.name', 'iland24h') }}
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    @include('layouts.admin.navbar')
</header>
<div class="wrapper row-offcanvas row-offcanvas-left {{ isset($_COOKIE['theme_nvcllps']) ? $_COOKIE['theme_nvcllps'] : 'active relative' }}">
    <!-- Left side column. contains the logo and sidebar -->
    @include('layouts.admin.sidebar')

    <!-- Right side column. Contains the navbar and content of the page -->
    <aside class="right-side">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            @yield('header')
            @yield('breadcrumb')
        </section>

        <!-- Main content -->
        <section class="content">
            @if(Session::has('flash_message'))
                <div class="alert alert-{{ Session::get('flash_level') }}">
                    {{ Session::get('flash_message') }}
                </div>
            @endif
            @yield('content')
        </section><!-- /.content -->
    </aside><!-- /.right-side -->
</div><!-- ./wrapper -->


<!-- jQuery 2.0.2 -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="{{ asset('js/bootstrap.min.js') }}" type="text/javascript"></script>
<!-- Jquery Cookie -->
<script src="{{ asset('js/AdminLTE/jquery.cookie.js') }}" type="text/javascript"></script>
<!-- AdminLTE App -->
<script src="{{ asset('js/AdminLTE/app.js') }}" type="text/javascript"></script>

</body>
</html>
