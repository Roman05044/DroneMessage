const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        static: path.resolve(__dirname, 'public'),  
        port: 8081,
        historyApiFallback: true,  
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',  
        }),
    ],
    mode: 'development',
};
