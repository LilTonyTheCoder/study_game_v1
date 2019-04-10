const webpack = require('webpack');
const path = require('path');

const resolve = pathName => path.resolve(__dirname, pathName);

module.exports = {
    configureWebpack: {
        entry: resolve('src/main.js'),
    	plugins: [
        	new webpack.ProvidePlugin({
        		mapGetters: ['vuex', 'mapGetters'],
        		mapActions: ['vuex', 'mapActions'],
        		mapMutations: ['vuex', 'mapMutations'],
        		mapState: ['vuex', 'mapState']
        	})
    	],
        context: resolve('..'),
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                img: resolve('src/assets/img')
            }
        },
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:5000'
                }
            }
        }
    }
};
