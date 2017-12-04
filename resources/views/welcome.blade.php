<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>MusicianAcademy</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

        <!-- styles -->
        <link rel="stylesheet" type="text/css" href="/css/app.css">
        <script>
            window.Laravel = { csrfToken: '{{ csrf_token() }}' };
        </script>
    </head>
    <body>
        <div id="app">
            <navigation> </navigation>
        </div>


        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
