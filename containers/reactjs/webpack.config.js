var config = {
    entry: '/project/app/main.js',

    output: {
        path:'/project/app/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8080,
        proxy: {
            "/api": {
                "target": {
                    "host": "backend",
                    "protocol": 'http:',
                    "port": 8000
                }
            },
            "/static": {
                "target": {
                    "host": "backend",
                    "protocol": 'http:',
                    "port": 8000
                }
            }
            //ignorePath: true,
            //changeOrigin: true,
            //secure: false
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',

                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}

module.exports = config;
