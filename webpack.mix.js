let mix = require('laravel-mix');

mix.js('resources/assets/js/app.js', 'public/js')
    .js('resources/assets/js/front-end.js', 'public/js')
    .sass('resources/assets/sass/CMS_CSS/app.scss', 'public/CMS_CSS/css')
    .sass('resources/assets/sass/app.scss', 'public/css').options({
});