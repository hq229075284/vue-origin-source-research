module.exports={
    presets:[
        ["@babel/preset-env",{
            corejs:3,
            useBuiltIns:'usage',
            targets:"> 0.25%, not dead"
        }],
        "@vue/babel-preset-jsx"
    ],
    // "plugins": ["transform-vue-jsx"]
}