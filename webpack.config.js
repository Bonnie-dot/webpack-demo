const readFile=require('./config'),
path=require('path'),
distPath=path.join(__dirname,'/dist/'),
filePath=path.join(__dirname,'/js');
async function webpack_config(){
let entry=await readFile(filePath);
	return{
		mode:"development",
		entry:entry,
		output:{
			filename:"[name].js",
			path:distPath
		},
		module: {
			rules: [
			  {
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			  }
			]
		  }
	}
}
module.exports=webpack_config();