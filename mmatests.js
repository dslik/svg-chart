'use strict'

function heatstriplastval()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 43", width: "1010", height:"43", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "ºC";
	series.title = "Title: Heat Strip Test with Current Value"
	series.label = "Series 1"
	series.color = '#FF0000';
	series.style = "heatstrip"
	series.showCurValue = true;

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function twoheatstriplastval()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 58", width: "1010", height:"58", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "ºC";
	series.title = "Title: Heat Strip Test with Current Value"
	series.label = "Series 1"
	series.color = '#FF0000';
	series.style = "heatstrip"
	series.showCurValue = true;
	series.yMax = 30;
	series.yMin = -10;

	dval = 0;
	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 3.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1);

	dval = 0;
	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval - 30)/50) * -8 + 17.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	series.style = "line";
	delete series.units;
	series.color = '#000000';
	series.label = "Series 2"

	//chart.addSeries(series, 2);

	series.style = "heatstrip"
	series.units = "ºC";

	chart.addSeries(series, 2);

	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}


function heatstrip()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 43", width: "1010", height:"43", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "ºC";
	series.title = "Title: Heat Strip Test"
	series.label = "Series 1"
	series.color = '#FF0000';
	series.style = "heatstrip"

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function twoheatstripoverlay()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 43", width: "1010", height:"43", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.title = "Title: Heat Strip with overlayed chart Test"
	series.label = "Series 1"
	series.units = "ºC";
	series.color = '#000000';
	series.style = "heatstrip";

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	//chart.addSeries(series);
	chart.addSeries(series);

	series.style = "line";
	delete series.units;
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function fourheatstripoverlay()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 60", width: "1010", height:"60", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.title = "Title: Heat Strip with overlayed chart Test"
	series.label = "Series 1"
	series.units = "ºC";
	series.color = '#000000';
	series.style = "heatstrip";
	series.showCurValue = true;

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1);

	series.style = "line";
	delete series.units;
	series.color = '#000000';
	chart.addSeries(series, 1);

	series.units = "ºC";
	series.style = "heatstrip";

	dval = 0;
	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/40) * -6 - 2.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	chart.addSeries(series, 2);

	series.style = "line";
	delete series.units;
	series.color = '#000000';
	chart.addSeries(series, 2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function twoheatstripfixed()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 43", width: "1010", height:"43", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.title = "Title: Heat Strip with overlayed chart Test"
	series.label = "Series 1"
	series.units = "ºC";
	series.color = '#000000';
	series.style = "heatstrip";
	series.yMax = 20;
	series.yMin = -20;

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	//chart.addSeries(series);
	chart.addSeries(series);

	series.style = "line";
	delete series.units;
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function twoheatstripfixedlastval()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 43", width: "1010", height:"43", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.title = "Title: Heat Strip with overlayed chart and Current Value Test"
	series.label = "Series 1"
	series.units = "ºC";
	series.color = '#000000';
	series.style = "heatstrip";
	series.yMax = 20;
	series.yMin = -20;
	series.showCurValue = true;

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/20) * 12 ).toString();
		var mydate = new Date(Date.now() + (800000 * dval));
		series.time[dval] = mydate.toISOString();
		series.to = 1000000;
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	//chart.addSeries(series);
	chart.addSeries(series);

	series.style = "line";
	delete series.units;
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function threeheatstrip()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 48", width: "1010", height:"48", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "V"
	series.label = "Phase A Volts"
	series.title = "Title: Multi-heat Strip Test"
	series.style = "heatstrip"
	series.yMax = 400;
	series.yMin = -400;
	series.color = '#e93324';

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/2.641) * 340).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "V";
	series2.label = "Phase B Volts";
	series2.style = "heatstrip"
	series2.color = '#0021f4';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin(dval/2.641 + 2.094393) * 340 + Math.sin(dval/100) * 20).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.units = "V";
	series3.label = "Phase C Volts";
	series3.style = "heatstrip"
	series3.color = '#c59a33';

	while (dval < seriesElements) {
		series3.avg[dval] = (Math.sin(dval/2.641 + 4.188786) * 340 + Math.sin(dval/100 + 10) * 10).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series3.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1);
	chart.addSeries(series2, 2);
	chart.addSeries(series3, 3);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLine()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line";
	series.style = "classic";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = dval.toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineNegative()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line negative";
	series.style = "classic";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineZeroCrossing()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 160", width: "1010", height:"160", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line zero crossing";
	series.style = "classic";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineNoFill()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 160", width: "1010", height:"160", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line no fill";
	series.to = 1000;
	series.style = "line";

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineLargeValues()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line large values";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1000 + 100000).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineSmallValues()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line small values";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -0.000001 + 0.0001).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineLongTime()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line multi-hour duration";
	series.to = 110000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 100).toString();
		var mydate = new Date(Date.now() + (100000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineLongTimeHeat()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line multi-hour duration with heat strip";
	series.to = 110000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 100).toString();
		var mydate = new Date(Date.now() + (100000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1, 95);
	series.style = "heatstrip";
	delete series.units;
	chart.addSeries(series, 2, 5);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineLongerTime()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line multi-day duration";
	series.to = 4000000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 100).toString();
		var mydate = new Date(Date.now() + (3500000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineLongestTime()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line multi-month duration";
	series.to = 100000000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 100).toString();
		var mydate = new Date(Date.now() + (100000000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineVariableDuration()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 240", width: "1010", height:"240", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line with variable duration";
	series.to = 2000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval + Math.sin(dval) * 1000));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}


function basicLineGap()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 240", width: "1010", height:"240", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line with gap";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * (dval + (dval>5))));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function basicLineGapAtEnd()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 240", width: "1010", height:"240", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Basic line with gap at end";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval * -1 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

		var mydate = new Date(Date.now() + (1000 * dval));
		series.end = mydate.toISOString();

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}


function mmaTest()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 800;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.min = Array.from({length: seriesElements}, () => 0);
	series.max = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.title = "Title: Min/Max/Average Test"
	series.color = '#FF0000';

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin((dval)/50) * -6 - 4.25).toString();
		series.min[dval] = (Math.sin((dval + 25)/50) * -6 - 4.25 - 5).toString();
		series.max[dval] = (Math.sin((dval - 25)/50) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1, 100);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}


function twoSeriesTest()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 314;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A"
	series.label = "Series 1"
	series.title = "Title: Two series seperated"

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/10) * 10).toString();
		var mydate = new Date(Date.now() + (1000 * dval) - 100000);
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "A";
	series2.label = "Series 2"
	series2.color = '#FF0000';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/10) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/10) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/10) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1);
	chart.addSeries(series2, 2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);

	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 210", width: "1010", height:"210", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	chart = new mmaChart(svg);
	series.color = '#00A0FF';
	series.title = "Title: Two series combined"
	chart.addSeries(series);
	chart.addSeries(series2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function twoSeriesTestGap()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 997;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A"
	series.label = "Series 1"
	series.title = "Title: Two series seperated with gap"
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/20) * 10).toString();
		var mydate = new Date(Date.now() + (1000 * dval) - 100000);
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "A";
	series2.label = "Series 2"
	series2.color = '#FF0000';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1, 70);
	chart.addSeries(series2, 2, 30);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);

	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 210", width: "1010", height:"210", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	chart = new mmaChart(svg);
	series.color = '#00A0FF';
	series.title = "Title: Two series combined with gap"
	chart.addSeries(series);
	chart.addSeries(series2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function threeSeriesTest()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "V"
	series.label = "Phase A Volts"
	series.title = "Title: Maximum time resolution"
	series.style = "line";
	series.yMax = 400;
	series.yMin = -400;
	series.color = '#e93324';

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/2.641) * 340).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "V";
	series2.label = "Phase B Volts";
	series2.style = "line";
	series2.color = '#0021f4';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin(dval/2.641 + 2.094393) * 340 + Math.sin(dval/100) * 20).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.units = "V";
	series3.label = "Phase C Volts";
	series3.style = "line";
	series3.color = '#c59a33';

	while (dval < seriesElements) {
		series3.avg[dval] = (Math.sin(dval/2.641 + 4.188786) * 340 + Math.sin(dval/100 + 10) * 10).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series3.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.addSeries(series2);
	chart.addSeries(series3);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function threeSeriesTestSeperate()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 200;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "V"
	series.label = "Phase A Volts"
	series.title = "Title: Maximum time resolution"
	series.style = "line";
	series.yMax = 400;
	series.yMin = -400;
	series.color = '#e93324';

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/2.641) * 340).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "V";
	series2.label = "Phase B Volts";
	series2.style = "line";
	series2.color = '#0021f4';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin(dval/2.641 + 2.094393) * 340 + Math.sin(dval/100) * 20).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.units = "V";
	series3.label = "Phase C Volts";
	series3.style = "line";
	series3.color = '#c59a33';

	while (dval < seriesElements) {
		series3.avg[dval] = (Math.sin(dval/2.641 + 4.188786) * 340 + Math.sin(dval/100 + 10) * 10).toString();
		var mydate = new Date(Date.now() + (1 * dval));
		series3.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series, 1);
	chart.addSeries(series2, 2);
	chart.addSeries(series3, 3);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function threeStyleTest()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 300", width: "1010", height:"300", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 1314;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A"
	series.label = "Series 1"
	series.title = "Title: Three series with different styles"
	series.style = "classic"

	while (dval < seriesElements) {
		series.avg[dval] = (Math.sin(dval/40) * 10).toString();
		var mydate = new Date(Date.now() + (1000 * dval) - 100000);
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.units = "A";
	series2.label = "Series 2"
	series2.color = '#009900';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/40) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/40) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/40) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var dval = 0;
	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.units = "A";
	series3.label = "Series 3"
	series3.color = '#0000FF';
	series3.style = "line";

	while (dval < seriesElements) {
		series3.avg[dval] = 5 * Math.sin(10 - (dval / 90)).toString();
		var mydate = new Date(Date.now() + (1000 * dval) - 100000 + (100000 / seriesElements * dval));
		series3.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.addSeries(series2);
	chart.addSeries(series3);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function overfillLine()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Over-fill line";
	series.style = "overfill";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval - 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function underfillLine()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 11;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.units = "A";
	series.label = "Series 1";
	series.title = "Title: Under-fill line";
	series.style = "underfill";
	series.to = 1000;

	while (dval < seriesElements) {
		series.avg[dval] = (dval - 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function overAreaFill()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var seriesElements = 400;
	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.title = "Title: Over-fill min/max/average";
	series2.units = "A";
	series2.label = "Series";
	series2.style = "overfill";
	series2.color = '#FF0000';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function underAreaFill()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var seriesElements = 400;
	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.title = "Title: Under-fill min/max/average";
	series2.units = "A";
	series2.label = "Series";
	series2.style = "underfill";
	series2.color = '#FF0000';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();
		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series2);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function lineAreas()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 0;
	var dval = 0;
	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.style = "overfill";
	series3.color = '#FF0000';

	var series4 = {};

	series4.avg = Array.from({length: seriesElements}, () => 0);
	series4.time = Array.from({length: seriesElements}, () => "");
	series4.style = "underfill";
	series4.color = '#FFAA33';

	seriesElements = 400;
	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.title = "Title: Top/bottom alarm areas";
	series2.units = "A";
	series2.label = "Series";
	series2.style = "line";
	series2.color = '#116611';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();

		series3.avg.push("5");
		series3.time.push(series2.time[dval])				

		series4.avg.push("-13");
		series4.time.push(series2.time[dval])				

		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series2);
	chart.addSeries(series3);
	chart.addSeries(series4);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function colorLine()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 0;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.style = "color";

	seriesElements = 400;
	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.title = "Title: Color line at bottom of chart";
	series2.units = "A";
	series2.label = "Series";
	series2.style = "line";
	series2.color = '#116611';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();

		if(series2.max[dval] > 5) {
			series.avg.push("#FF0000");
			series.time.push(series2.time[dval])
		} else {
			if(series2.min[dval] > -13) {
				series.avg.push("#FFFFFF");
				series.time.push(series2.time[dval])				
			} else {
				series.avg.push("#FFAA33");
				series.time.push(series2.time[dval])				
			}
		}

		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series2);
	chart.addSeries(series);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}

function colorLineAreas()
{
	var svg = svgen("svg", { version:"1.1", preserveAspectRatio:"none", 'viewbox':"0 0 1010 225", width: "1010", height:"225", id:"chart", 'xmlns':"http://www.w3.org/2000/svg", 'xmlns:xlink':"http://www.w3.org/1999/xlink"});
	var	seriesElements = 0;
	var dval = 0;
	var series = {};

	series.avg = Array.from({length: seriesElements}, () => 0);
	series.time = Array.from({length: seriesElements}, () => "");
	series.style = "color";

	var series3 = {};

	series3.avg = Array.from({length: seriesElements}, () => 0);
	series3.time = Array.from({length: seriesElements}, () => "");
	series3.style = "overfill";
	series3.color = '#FF0000';

	var series4 = {};

	series4.avg = Array.from({length: seriesElements}, () => 0);
	series4.time = Array.from({length: seriesElements}, () => "");
	series4.style = "underfill";
	series4.color = '#FFAA33';

	seriesElements = 400;
	var dval = 0;
	var series2 = {};

	series2.avg = Array.from({length: seriesElements}, () => 0);
	series2.min = Array.from({length: seriesElements}, () => 0);
	series2.max = Array.from({length: seriesElements}, () => 0);
	series2.time = Array.from({length: seriesElements}, () => "");
	series2.title = "Title: Top/bottom alarm areas with color line at bottom of chart";
	series2.units = "A";
	series2.label = "Series";
	series2.style = "line";
	series2.color = '#116611';

	while (dval < seriesElements) {
		series2.avg[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25).toString();
		series2.min[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 - 5).toString();
		series2.max[dval] = (Math.sin((dval + 14)/20) * -6 - 4.25 + 5).toString();
		var mydate = new Date(Date.now() + (1000 * dval));
		series2.time[dval] = mydate.toISOString();

		if(series2.max[dval] > 5) {
			series.avg.push("#FF0000");
			series.time.push(series2.time[dval])
		} else {
			if(series2.min[dval] > -13) {
				series.avg.push("#FFFFFF");
				series.time.push(series2.time[dval])				
			} else {
				series.avg.push("#FFAA33");
				series.time.push(series2.time[dval])				
			}
		}

		series3.avg.push("5");
		series3.time.push(series2.time[dval])				

		series4.avg.push("-13");
		series4.time.push(series2.time[dval])				

		dval = dval + 1;
	}

	var chart = new mmaChart(svg);
	chart.addSeries(series2);
	chart.addSeries(series);
	chart.addSeries(series3);
	chart.addSeries(series4);
	chart.draw();

	var element = document.getElementById('chart');
	element.parentNode.appendChild(svg, element);
	element.parentNode.appendChild(document.createElement("hr"), element);
}



