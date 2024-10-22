const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Додайте плагін

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,  
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,  
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,  
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',  
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),  // Вказуємо папку, де знаходиться HTML
        port: 8082,
        historyApiFallback: true,  // Цей параметр дозволяє працювати з одиничними сторінками
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',  // Шлях до вашого index.html
        }),
    ],
    mode: 'development',
};
