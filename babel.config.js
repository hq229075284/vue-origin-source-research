module.exports={
    presets:[
        ["@babel/preset-env",{
            corejs:3,
            useBuiltIns:'usage',
            targets:"> 0.25%, not dead"
        }]
    ]
}