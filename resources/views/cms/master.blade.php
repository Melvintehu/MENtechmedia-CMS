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
    </head>
    <body class="bg-secondary">
        <!-- top bar -->
        <div id="app" class="container-fluid no-overflow" >
            <div class="cms-navigation col-lg-2 col-md-2 col-xs-12 vertical-scrollbar no-overflow-x reset-padding bg-tertiary full-height  shadow-xs">

                <div class="row">
                    <!-- user -->
                    <div class="col-lg-12 col-md-12  space-inside-sides-xl space-inside-up-md text-center">
                        <div class="circle image shadow-sm">
                            <img class="height-auto" src="{{ Auth::user()->portrait }}">
                        </div>
                    </div>

                    <div class="col-lg-12 col-md-12 space-inside-sm space-inside-sides-xl text-center ">
                        <p class="text-color-light  font-md text-thin">{{ Auth::user()->name }}</p>
                        <a class="text-color-light space-inside-md text-thin" href="/cms/profile/{{ Auth::user()->id }}/edit">Profiel bewerken</a>
                        <a class="text-color-light text-thin" href="/cms/logout">Uitloggen</a>
                    </div>

                    <!-- end of user -->

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
            <div  class="col-lg-10 col-md-10 col-xs-12 reset-padding ">
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
