const mix = require('laravel-mix');

Mix.listen('configReady', (webpackConfig) => {
    // Exclude 'svg' folder from font loader
    let fontLoaderConfig = webpackConfig.module.rules.find(rule => String(rule.test) === String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/));
    fontLoaderConfig.exclude = /(resources\/vue\/icons)/;
});

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/vue'),
        }
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include: [path.resolve(__dirname, 'resources/vue/icons/svg')],
                options: {
                    symbolId: 'icon-[name]'
                }
            }
        ],
    }
}).babelConfig({
    plugins: ['dynamic-import-node']
});

mix.js('resources/vue/main.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

    // .override(config => {
       // config.module.rules.find(rule =>
       //     rule.test.test('.svg')
       // ).exclude = /\.svg$/;
       //
       // config.module.rules.push({
       //     test: /\.svg$/,
       //     use: [
       //         { loader: 'html-loader' }
       //     ]
       // });
    // });
