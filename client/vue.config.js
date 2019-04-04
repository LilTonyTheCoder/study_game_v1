const webpack = require('webpack');
/*const path = require('path'); // TODO: что делать

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}*/
module.exports = {
    /*context: path.resolve(__dirname, '../'),
    resolve: {
        extentions: ['.js', '.vue'],
        alias: {
            "img": resolve('src/assets/img')
        }
    },*/
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000'
            }
        }
    },
    configureWebpack: {
    	plugins: [
    	new webpack.ProvidePlugin({
    		mapGetters: ['vuex', 'mapGetters'],
    		mapActions: ['vuex', 'mapActions'],
    		mapMutations: ['vuex', 'mapMutations'],
    		mapState: ['vuex', 'mapState']
    	})
    	]
    }
};
