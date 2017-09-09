var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // Tell Webpack which directories to look in to resolve import statements.
    // Normally Webpack will look in node_modules by default but since we’re overriding
    // the property we’ll need to tell it to look there in addition to the
    // bower_components folder.
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, 'bower_components')
        ]
    },
    module: {
        rules: [{
            // If you see a file that ends in .html, send it to these loaders.
            test: /\.html$/,
            // This is an example of chained loaders in Webpack.
            // Chained loaders run last to first. So it will run
            // polymer-webpack-loader, and hand the output to
            // babel-loader. This let's us transpile JS in our `<script>` elements.
            use: [
                { loader: 'babel-loader' },
                { loader: 'polymer-webpack-loader' }
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }
        ]
    }
};