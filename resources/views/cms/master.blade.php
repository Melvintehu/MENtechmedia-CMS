<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>CMS | MEN Technology & Media</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet">
     
        <link rel="stylesheet" type="text/css" href="/CMS_CSS/css/app.css">
        <meta id="token" name="csrf-token" value="{{ csrf_token() }}">
        <script>
            window.Laravel = <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>

            window.user_id = <?php echo json_encode(Auth::user()->id); ?>
        </script>

        <style> 
            
        </style>
    </head>
    <body class="bg-secondary">
        <!-- top bar -->
        <nav class="navbar navbar-default navbar-fixed-top bg-tertiary border-none shadow-xs">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <button type="button" class="toggle-nav bg-tertiary border-none outline-none text-color-light" style="margin-top: 12px;"  >
                        <i class="material-icons">menu</i>
                    </button>
                    <a class="navbar-brand space-inside-left-md"  href="https://mentechmedia.nl" target="_blank">
                        <img src="/images/cms/logo_m.png" style="width: 20px;"/>
                    </a>
                </div>
                <form class="navbar-form navbar-left" role="search">
                    <div class="form-group space-inside-left-md">
                        <input type="text" class="form-control space-inside-sides-sm" placeholder="Zoek in CMS...">
                    </div>
                </form>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav navbar-right space-inside-right-md">
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle text-color-light" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            {{ Auth::user()->name }} 
                            <div class="bg-success circle inline-block shadow-xs space-outside-sides-xs border border-light" style="width: 15px; height: 15px; position: relative; top: 5px;"></div>
                            <span class="caret inline-block"></span>
                        </a>
                        <ul class="dropdown-menu space-inside-sides-md space-inside-md">
                            <!-- user -->
                            <li class="space-inside-down-sm">
                                <div class="circle image shadow-sm">
                                    <img class="height-auto" src="{{ Auth::user()->portrait }}">
                                </div>
                            </li>
                            <li class="space-inside-down-sm">               
                                <div class=" block bg-secondary text-center space-inside-sm ">
                                    <p class=" text-color-tertiar text-bold"> Superadmin </p>
                                </div> 
                            </li>
                            <li><a href="/cms/profile/edit">Profiel bewerken</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="/cms/logout">Uitloggen</a></li>
                            <!-- end of user -->
                        </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div id="app" class="container-fluid no-overflow" >
            <div class=" cms-navigation  col-lg-2 col-md-2 col-xs-12 vertical-scrollbar no-overflow-x reset-padding bg-tertiary full-height shadow-xs ">

                <div class="row space-inside-up-md ">
 

                    <!-- content divider -->

                    <div style="height: 4px;" class="col-lg-12 col-md-12 space-inside-xs">
                        <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
                    </div>
                    <!-- end of content divider -->


                    @include('cms.nav')

                    <!-- end of navigation -->
                </div>    
            </div>
            <div class="col-lg-2 col-md-2"></div>


            <!--  all content -->
            <div  class="body transition-normal col-lg-10 col-md-10 col-xs-12 reset-padding ">
                <div class="row"> 
                    <div class="col-lg-12 col-md-12 space-outside-down-sm">
                       @yield('content')
                    </div>
                </div>

            </div>

        </div>
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
