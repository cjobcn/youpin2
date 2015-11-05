var async = require('async');
var path = require('path');
var fs = require('fs');
var _dirCur = __dirname;
var dirTest = {
	sass : {
		dirname : path.join(_dirCur, '../test/sass'),
		suffix : '.scss',
		filenames : [
			'variable',
			'operator',
			'logic',
			'loop',
			'mixin',
			'interpolation',
			'default',
			'rule-nested',
			'rule-ref',
			'rule-comments',
			'data-type',
			'quoted-string',
			'division',
			'import',
			'def-vars',
			'_not-output',
			'media',
			'extend',
			'debug',
			'warn'
		],
		getFilenames : getFilenames
	}
};
var opts = {
	write : {
		encoding : 'utf8',
		flag : 'wx'
	},
	read : {
		encoding : 'utf8',
	},
	encoding : 'utf8'
};
var dirNodeModules = path.join(__dirname, '../node_modules');
var urlPackage = path.join(__dirname, '../package.json');

function getFilenames() {
	var self = this;
	return self.filenames.map(function (file) {
		return path.join(self.dirname, file + self.suffix);
	});
}

var fh = {};
module.exports = fh;

fh.writeSassFiles = function (callback) {
	async.each(
		dirTest.sass.getFilenames(),
		function (file, cb) {
			fs.writeFile(file, '', opts.write, function (err) {
				cb();
			});
		},
		callback
	);
};

//the dependencies to write in package.json
fh.getNodemodulesDeps = function (callback) {
	var arrModuleNames;
	try {
		arrModuleNames = fs.readdirSync(dirNodeModules);
		arrModuleNames.splice(arrModuleNames.indexOf('.bin'), 1);
	} catch (err) {
		return callback(err);
	}

	var arrPackgeJsons = arrModuleNames.map(function (dir) {
		return path.join(dirNodeModules, dir, 'package.json');
	});

	async.map(
		arrPackgeJsons,
		function (file, cb) {
			fs.readFile(file, opts.read, function (err, str) {
				if (err) {
					return cb(null);
				}

				var json;
				try {
					json = JSON.parse(str);
				} catch (err) {
					return cb(err);
				}

				cb(null, {
					name : json.name,
					version : json.version
				});
			});
		},
		function (err, results) {
			if (err) {
				return callback(err);
			}

			results = results.reduce(function (memo, one) {
				if (one && one.name && one.version) {
					memo[one.name] = one.version;
				}
				return memo;
			}, {});

			callback(null, results);
		}
	);
};

fh.writeDevdependences = function (callback) {
	if (!fs.existsSync(urlPackage)) {
		return callback(new Error('no package.json file'));
	}

	fh.getNodemodulesDeps(function (err, results) {
		if (err) {
			return callback(err);
		}
		var str;
		var json;

		try {
			str = fs.readFileSync(urlPackage);
			json = JSON.parse(str);
			json.devDependencies = results;
			str = JSON.stringify(json);
		} catch (err) {
			return callback(err);
		}

		fs.writeFile(urlPackage, str, { encoding : 'utf8' }, callback);
	});
};

// if there is package.json in this app and the node_modules,
// no need to manual add devDependencies one by one,
// just fire this fn;
// fh.writeDevdependences(function (err) {
// 	console.log(err || 'done');
// });

fh.say = function () {
	console.log('hello world');
};