const fs = require('fs');
const axios = require('axios');
const moment = require('moment');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const sleep = time => new Promise(res => setTimeout(() => res(), time));

function jsonParam(obj) {
	return JSON.stringify(obj)
}

function postRequest(url, content) {
	//if (!url) return axios.post('http://icp1x13.platformlab.ibm.com:8000/longevity/', content)
	return axios.post(url, content)
}

function writeStream(file) {
	return fs.createWriteStream(file, 'utf-8')
}

function castString(target) {
	if (typeof(target) === 'object') { return `${JSON.stringify(target,null,'\t')}\n` }
	else if (typeof(target) === 'number') { return `${target}\n` }
	else if (typeof(target) === 'string') { return `${target}\n` }
	else { return `${typeof(target)}\n` }
}

function readFile(file) {
	return fs.readFileSync(file,'utf-8');
}

function writeFile(file, data) {
	return fs.writeFileSync(file, data);
}

function statFile(file) {
	return fs.statSync(file);
}

function generateWallet() {
	return Wallet.generate();
}

function testGenerateWallet() {
	w = generateWallet();
	console.log(w);
}

function readStream(file) {
	var rs = fs.createReadStream(file, 'utf-8');

	rs.on('data', function (chunk) {
		chunk.trim().split('\n').forEach( line => console.log(`\t......${line}`));
	});
	rs.on('end', function () {
		console.log('\t......');
	});
	rs.on('error', function (err) {
		console.log('\t!!!!!! ' + err);
	});
	return rs;
}

function random_item(items){
	return items[Math.floor(Math.random() * items.length)];
}

//async function getGitUser () {
//	const name = await exec('git config --global user.name')
//	const email = await exec('git config --global user.email')
//	return { name, email }
//};
// default precision 5 minutes, buffer 30 seconds
function delayUntilDuration (current, precision=5 * 1000 * 60) {
	return Math.floor((current + precision) / precision) * precision - current
}
async function delay (duration) {
	await sleep(duration);
}
async function delayUntil (current, precision=5 * 1000 * 60, buffer=30 * 1000) {
	let duration = delayUntilDuration(current, precision)
	if (duration > buffer) {
		duration = Math.min(duration - buffer, 60 * 1000)
		console.log(`execute delay for ${Math.floor(duration / 1000)} seconds`)
		await sleep(duration);
	} else {
		console.log(`ATTENTION:
!!!!! no sleep time!!!!!`)
	}
}

module.exports = {
	exec,
	random_item,
	readFile,
	writeFile,
	statFile,
	readStream,
	writeStream,
	jsonParam,
	postRequest,
	castString,
	delay,
	delayUntil,
	delayUntilDuration,
}
