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

fh.transferTabs = function (filename) {
	var str = fs.readFileSync(filename, 'utf8');
	str = str.replace( /\n(\t+)/g, function (all, strTabs) {
		if (!strTabs) return all;
		var len = strTabs.length;
		var ws2 = ' ' + ' ';
		var ret = '\n';
		while (len--) ret += ws2;
		return ret;
	});

	fs.writeFileSync(filename, str);
	console.log('done');
};

// var filename = '../assets/jade/content/main/selection-content-list.jade';
// fh.transferTabs(filename);

var fo = require('fo');

fh.transferTabsForDir = function (dir, callback) {
	if (!fs.readdirSync(dir))
		return callback(new Error('dir not exists: ' + dir));

	var rskip = /^(svn|\.git|\.sass|\.cache|\.bin)/;

	function onFile(file, next) {
		fo.readFile([file, 'utf8'])
		.then(function(str) {
			str = toWhiteSpace2(str);
			fo.writeFile([file, str])
			.then(function () { next(); })
			.catch(next);
		})
		.catch(next);
	}

	function toWhiteSpace2(str) {
		return str.replace(/\n(\t+)/g, function (all, strTabs) {
			var len = strTabs.length;
			var ws2 = ' ' + ' ';
			var ret = '\n';
			while (len--) ret += ws2;
			return ret;
		});
	}

	function onDir(dir) {
		return rskip.test(dir) ? false : true;
	}

	fo.walkdir(dir, onFile, onDir, callback);
}

fh.transferTabsForDir('../assets/jade', function (err) {
	if (err)
		throw err;
	console.log('done');
})

// var fo = require('fo');
// console.log(fo);
// var rtabs = /^(\t+|\s+|)?[^\n]+$/gm;
// var str = '\tsdsdsdsd\r\n\t\tsdsdsdsd\n';
// var one;
// while (one = rtabs.exec(rtabs)) {
// 	console.log(one);
// }

// console.log(/\n/.test(str));
