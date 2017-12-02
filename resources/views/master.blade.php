<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title> @yield('title') | PAGE TITLE</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="/css/app.css">
    {{--  <script type="text/javascript" src="https://www.youtube.com/iframe_api" id="youtube_api"></script>  --}}
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
    <script src='https://www.google.com/recaptcha/api.js'></script>
    <meta property="og:url"           content="mentor4you.nl" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="mentor4you" />
    <meta property="og:description"   content="Mentor4you is een mentorprogramma voor jongeren tussen de 12 en 25 jaar oud." />
    <meta property="og:image"         content="" />

    {{--  <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />  --}}
    {{--  <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>  --}}
    {{--  <script>
        window.addEventListener("load", function(){
            window.cookieconsent.initialise({
                "palette": {
                    "popup": {
                        "background": "#01569B",
                        "text": "#ffffff"
                    },
                    "button": {
                        "background": "#E65100",
                        "text": "#ffffff"
                    }
                },
                "theme": "edgeless",
                "content": {
                    "message": "om het gebruik van de website zo aangenaam mogelijk te maken, maakt mentor4you.nl gebruik van cookies.",
                    "dismiss": "Ik snap het!",
                    "link": "Lees meer"
                }
            })});
    </script>  --}}
</head>
<body>

    <div id="app">
        
        @yield('content')

    </div>
    <script type="text/javascript" src="/js/app.js"></script>
    
</body>
</html>
