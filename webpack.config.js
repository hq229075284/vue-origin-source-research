const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')

console.log(path.resolve(__dirname,'./src/app.js'))
module.export={
    entry:{
        app:path.resolve(__dirname,'./src/app.js')
    },
    output:{
        pathname:path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {test:/\.vue$/,use:"vue-loader"},
            {test:/\.js$/,use:"babel-loader",exclude:/node_modules\/@babel/}
        ]
    },
    devtool: "source-map",
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'index.html'),
            filename:'index.html'
        })
    ],
    devServer:{
        post:'1000',
        host:'0.0.0.0'
    }
}