const Path = require("path");

// PostCSS
const Autoprefixer = require("autoprefixer");
const CssDeclarationSorter = require("css-declaration-sorter");
const PostcssSortMediaQueries = require("postcss-sort-media-queries");

// Plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPluginInstance = new MiniCssExtractPlugin({
	filename: "css/style.css",
	ignoreOrder: true,
});
const StylelintPluginInstance = new StylelintPlugin({
	fix: true,
});
const HtmlWebpackPluginInstance = new HtmlWebpackPlugin({
	filename: 'index.html',
	template : 'src/index.html',
	minify: false,
})

// Entry
const entry = {
	main: "./src/main.js"
};

// Mode
const mode = "production";

// Output
const output = {
	path: Path.resolve(__dirname, "dist"),
	filename: "js/[name].js"
};

// Server
const devServer = {
	port: 3000,
	contentBase: "dist"
};

// ModuleRule Pre
const rulePre = {
	enforce: "pre",
	test: /\.js$/,
	exclude: /node_modules/,
	use: [
		{
			loader: "eslint-loader",
		}
	]
};

// ModuleRule JavaScript
const ruleJavaScript = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: [
		{
			loader: "babel-loader",
			options: {
				presets: ["@babel/preset-env"]
			}
		},
	]
}

// ModuleRule Sass
const ruleSass = {
	test: /\.scss$/,
	exclude: /node_modules/,
	use: [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		{
			loader: "css-loader",
			options: { url: false }
		},
		{
			loader: "postcss-loader",
			options: {
				plugins: [
					Autoprefixer(),
					CssDeclarationSorter({
						order: "alphabetical"
					}),
					PostcssSortMediaQueries({
						sort: "desktop-first",
					}),
				]
			}
		},
		{
			loader: "sass-loader",
			options: {
				sassOptions: {
					outputStyle: "expanded",
				},
			},
		},
		{
			loader: "import-glob-loader",
		},
	]
};

// ModuleRule HTML
const ruleHTML = {
	test: /\.html$/,
	exclude: /node_modules/,
	use: [
		{
			loader: 'html-loader',
			options: {
				minimize: false
			},
		}
	]
};

// Exports
module.exports = {
	entry,
	mode,
	output,
	devServer,
	module: {
    rules: [
			rulePre,
			ruleJavaScript,
			ruleSass,
    ]
	},
	plugins: [
    MiniCssExtractPluginInstance,
		StylelintPluginInstance,
		HtmlWebpackPluginInstance
  ]
};
