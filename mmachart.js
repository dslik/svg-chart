'use strict'

// ----------------------------------------------------------------------------------------
// Copyright 2018, 2019 David Slik, All rights reserved
// INPUTS - constructor
// 		svg - REQUIRED. SVG node
//
// INPUTS - addSeries
// 		d - series data object
//		d.color - Series colour
//		d.style - Series style. Currently "area", "classic", "line" and "color" are defined.
//		d.avg - REQUIRED. Array of values to chart
//		d.min - Array of minimum values to chart. If present, d.max must also be present.
//		d.max - Array of maximum values to chart. If present, d.min must also be present.
//		d.time - REQUIRES. Array of times corresponding to each min/max/average value.
//		d.units - A short unit indentifier (e.g. C, A, V)
//		d.label - A description of the series
//		d.title - A title for the chart
//		d.start - Start time for the chart
//		d.end - End time for the chart
//		d.yMax - Maximum value for the chart
//		d.yMin - Minimum value for the chart
//		d.to - Timeout. Indicates for how long a value is considered valid.
//
//		num - Indicates the series group number. Two series with the same number will
//		      be plotted together.
//
//		height - Indicates the relative height for multiple series. E.g. "50" and "50"
//		         when used for two series with different group numbers will each have
//				 half of the available space.
//
// INPUTS - draw (no inputs)
//
// ----------------------------------------------------------------------------------------

// Convenience function that creates an SVG element from type, value and text strings
function svgen(n, v, t) {
	n = document.createElementNS("http://www.w3.org/2000/svg", n);
	for (var p in v)
		if(p == "xlink:href") { n.setAttributeNS("http://www.w3.org/1999/xlink", p, v[p]); }
		else if(p == "xmlns:xlink") { n.setAttributeNS("http://www.w3.org/2000/xmlns/", p, v[p]); }
		else if(p == "xmlns") { n.setAttributeNS("http://www.w3.org/2000/xmlns/", p, v[p]); }
		else if(p == "xml:space") { n.setAttributeNS("http://www.w3.org/XML/1998/namespace", p, v[p]); }
		else { n.setAttributeNS(null, p, v[p]); }
	if(t) n.innerHTML = t;
	return n
}

// Hue to RGB for gradients
function h2rgb(h) 
{                 
  var k = h / 60;
  var x = (1 - Math.abs(k % 2 - 1));
 
  var r1 = 0;
  var g1 = 0;
  var b1 = 0;
    
  if(k >= 0 && k <= 1) { r1=1; g1=x; }
  if(k > 1 && k <= 2)  { r1=x; g1=1; }
  if(k > 2 && k <= 3)  { g1=1; b1=x; }
  if(k > 3 && k <= 4)  { g1=x; b1=1; }
  if(k > 4 && k <= 5)  { r1=x; b1=1; }
  if(k > 5 && k <= 6)  { r1=1; b1=x; }
  
  var r = (r1 * 255).toFixed(0);
  var g = (g1 * 255).toFixed(0);
  var b = (b1 * 255).toFixed(0);

  var rs = Number(r).toString(16);
  var gs = Number(g).toString(16);
  var bs = Number(b).toString(16);

  if (rs.length == 1) rs = "0" + rs;
  if (gs.length == 1) gs = "0" + gs;
  if (bs.length == 1) bs = "0" + bs;

  return rs + gs + bs;  
}

// Formats numbers for display, including units and scaling
function formatValue(c, value) {
	var displayValue = "";
	var displayUnits = "";

	if(c.units) displayUnits = c.units;
	
	if(value == 0) {
		displayValue = '0 ' + displayUnits;
	} else {
		if(((value / c.scale) - Math.floor(value / c.scale)) == 0) {
			displayValue = (value / c.scale).toFixed(0) + ' ' + c.prefix + displayUnits;
		} else {
			displayValue = (value / c.scale).toFixed(2) + ' ' + c.prefix + displayUnits;
		}
	}

	return(displayValue);
}

// ----------------------------------------------------------------------------------------

class mmaChart {
	// Creates a new chart object
	constructor(svg) {
		this.sa = new Array;
		this.svg = svg;
		var vbox = svg.getAttribute('viewbox').split(" ")

		this.xo = 70;
		this.yo = 10;
		this.w = vbox[2] - this.xo - 5;
		this.h = vbox[3] - this.yo - 15;
	}

	// Adds a series of data to a chart object
	addSeries(d, num, height) {
		var c = this;
		var s = new Object;

		if(num === undefined) { num = 1};
		if(height === undefined) { height = 100};

		s.xo = this.xo;
		s.yo = this.yo;
		s.w = this.w;
		s.h = this.h;
		s.n = num;
		s.sh = height;

		// Series colour
		if(d.hasOwnProperty('color')) {
			s.color = s.fcolor = d.color;
		} else {
			s.color = s.fcolor = '#00AA00';
		}

		s.fopacity = '0.15';

		// Series Style
		if(d.hasOwnProperty('style')) {
			if(d.style == "classic") {
				s.color = '#007700';
				s.fcolor = '#EEC060';
				s.fopacity = '0.5';
			}

			s.style = d.style;
		} else {
			s.style = "area";
		}

		if(s.style == "heatstrip") {
			s.noYAxis = true;	
			s.fopacity = '0.5';
		}

		// Calculate Data Entries
		s.elc = d.avg.length;
		s.avg = Array.from({length: s.elc});
		s.time = Array.from({length: s.elc});
		s.dur = Array.from({length: s.elc});
		
		if(s.style != "color") {
			// Calculate Max & Min
			if(d.hasOwnProperty('max')) {
				s.max = Array.from({length: s.elc});
				s.maxValue = Math.max(...d.max);
			} else {
				s.maxValue = Math.max(...d.avg);
			}

			if(d.hasOwnProperty('min')) {
				s.min = Array.from({length: s.elc});
				s.minValue = Math.min(...d.min);
			} else {
				s.minValue = Math.min(...d.avg);
			}
		}

		// Store last value if showCurValue is enabled
		if(d.hasOwnProperty('showCurValue')) {
			s.last = d.avg[s.elc - 1];
			s.w = this.w - 100;
		};

		// Units
		if(d.hasOwnProperty('units')) { s.units = d.units; }
		s.label = d.label;
		s.title = d.title;
		
		// Calculate start and end times
		if(d.hasOwnProperty('start')) {
			s.start = Date.parse(d.start);
		} else {
			s.start = Date.parse(d.time[0]);
		}
		
		if(d.hasOwnProperty('end')) {
			s.end = Date.parse(d.end);
		} else {
			s.end = Date.parse(d.time[s.elc - 1]);
		}
				
		// Handle Y Axis Constraints
		if(d.hasOwnProperty('yMax')) {
			if(s.maxValue < d.yMax) s.maxValue = d.yMax;
			s.yMax = d.yMax;
		}

		if(d.hasOwnProperty('yMin')) {
			if(s.minValue > d.yMin) s.minValue = d.yMin;
			s.yMin = d.yMin;
		}

		if(!d.hasOwnProperty('to')) s.to = 500000;
		else s.to = d.to;
			
		var dval = 0;
		while (dval < s.elc) {
			s.avg[dval] = d.avg[dval];
			if(d.hasOwnProperty('min')) s.min[dval] = d.min[dval];
			if(d.hasOwnProperty('max')) s.max[dval] = d.max[dval];
			s.time[dval] = Date.parse(d.time[dval]);
			
			// Handle when the time value is earlier than the series
			if(d.end) {
				if(s.time[dval] > d.end) {
					s.elc = dval;
					s.dur[dval - 1] = d.end - s.time[dval - 1];
				}
			}
			
			if(dval < (s.elc - 1)) s.dur[dval] = Date.parse(d.time[dval + 1]) - s.time[dval];
			if(s.dur[dval] > s.to) s.dur[dval] = s.to;
			if(s.time[dval] > s.end) s.end = s.time[dval];
			
			if(dval == (s.elc - 1))
			{
				if(!d.hasOwnProperty('to')) s.dur[dval] = 0;
				if(d.hasOwnProperty('to')) s.dur[dval] = s.to;
				s.end = s.end + s.dur[dval];
			}
			
			dval = dval + 1;
		}
		
		s.ws = s.w / (s.end - s.start);

		this.sa.push(s);
	}

	// Draws the chart as an SVG image
	draw() {
		this.computeSeries();
		this.drawOutline();
		this.drawData(this.svg);

	}

	// Private - Processes all added series to prepare for rendering the chart
	computeSeries() {
		var numSeries = this.sa.length;
		var seriesCounter = 0;
		var totalHeight = 0;
		var seriesOffset = this.yo;
		var seriesID = new Array;

		this.start = this.sa[0].start;
		this.end = this.sa[0].end;

		// Create an array of unique series to be rendered
		while(seriesCounter != numSeries) {
			var s = this.sa[seriesCounter];

			if(!seriesID.includes(s.n)) {
				// If the series is not already in the array, add it
				totalHeight = totalHeight + s.sh;
				seriesID.push(s.n)
			} else {
				// If the series is already in the array, suppress y-axis rendering
				s.noYAxis = true;
			}

			// Set the x-axis to include the union of all series x-axis
			if(this.start > s.start) this.start = s.start;
			if(this.end < s.end) this.end = s.end;

			seriesCounter = seriesCounter + 1;
		}

		// If there are more than one series to be rendered, shrink chart height
		// to handle gaps inserted between series
		if(seriesID.length > 1)
		{
			this.h = this.h - ((seriesID.length - 1) * 4);
		}

		// Set max/min values for overlayed charts
		var IDCounter = 0;
		while(IDCounter != seriesID.length) {
			var seriesCounter = 0;
			var maxValue = null;
			var minValue = null;

			while(seriesCounter != numSeries) {
				var s = this.sa[seriesCounter];

				if(s.n == seriesID[IDCounter]) {
					if(maxValue == null) maxValue = s.maxValue;
					else if(maxValue < s.maxValue) maxValue = s.maxValue;

					if(minValue == null) minValue = s.minValue;
					else if(minValue > s.minValue) minValue = s.minValue;
				}

				seriesCounter = seriesCounter + 1;
			}

			seriesCounter = 0;
			while(seriesCounter != numSeries) {
				var s = this.sa[seriesCounter];

				if(s.n == seriesID[IDCounter]) {
					s.maxValue = maxValue;
					s.minValue = minValue;
				}

				seriesCounter = seriesCounter + 1;
			}

			IDCounter = IDCounter + 1;
		}

		seriesID = new Array;
		seriesCounter = 0;
		while(seriesCounter != numSeries) {
			var s = this.sa[seriesCounter];

			if(!seriesID.includes(s.n)) {
				s.h = this.h * (s.sh / totalHeight);
				s.yo = seriesOffset;
				seriesOffset = seriesOffset + s.h + 4;
				seriesID.push(s.n)
			} else {
				var seriesIntCounter = 0;
				while(this.sa[seriesIntCounter].n != s.n) {
					seriesIntCounter = seriesIntCounter + 1;
				}
				s.h = this.sa[seriesIntCounter].h;
				s.yo = this.sa[seriesIntCounter].yo;
				seriesIntCounter = 0;
			}

			s.wGridLines = Math.floor(s.w / 88) - 2;
			s.hGridLines = Math.floor(s.h / 15);

			if(s.style != "heatstrip") {
				var divOffset = ((s.maxValue - s.minValue) / (s.hGridLines));
				if(!s.hasOwnProperty('yMax')) if(s.maxValue != 0) {
					if((s.maxValue - Math.floor(s.maxValue)) !== 0) {
						s.maxValue = s.maxValue + divOffset / 4;
					} else {
						s.maxValue = s.maxValue + Math.ceil(divOffset);
					}
				}
				if(!s.hasOwnProperty('yMin')) if(s.minValue != 0) {
					if((s.minValue - Math.floor(s.minValue)) !== 0) {
						s.minValue = s.minValue - divOffset / 4;
					} else {
						s.minValue = s.minValue - Math.ceil(divOffset);
					}
				}
			}

			var Prefix = "";
			var largestValue = Math.max(Math.abs(s.maxValue), Math.abs(s.minValue));
			s.hs = s.h / (s.maxValue - s.minValue);
			s.scale = 1;
			s.prefix = "";

			if(largestValue > 1 || largestValue < -1) {
				if(largestValue < 1000) { s.prefix = ""; s.scale = 1;}
				if(largestValue >= 1000) { s.prefix = "k"; s.scale = 1000;}
				if(largestValue >= 1000000) { s.prefix = "M"; s.scale = 1000000;}
				if(largestValue >= 1000000000) { s.prefix = "G"; s.scale = 1000000000;}
				if(largestValue >= 1000000000000) { s.prefix = "T"; s.scale = 1000000000000;}
			} else {
				if(largestValue <= 0.00001) { s.prefix = "µ"; s.scale = 0.000001;}
				if(largestValue > 0.00001) { s.prefix = "µ"; s.scale = 0.000001;}
				if(largestValue > 0.001) { s.prefix = "m"; s.scale = 0.001;}
				if(largestValue > 0.1) { s.prefix = ""; s.scale = 1;}
			}

			s.start = this.start;
			s.end = this.end;
			
			s.ws = s.w / (s.end - s.start);

			seriesCounter = seriesCounter + 1;
		}
	}

	// Private - Draws the bounding box, axis and grid lines
	drawOutline() {
		var g = this;
		var svg = this.svg;
		var numSeries = this.sa.length;
		var seriesCounter = 0;
		var checkCounter = 0;
		var yoffset = 0;
		var seriesID = new Array;

		while(seriesCounter != numSeries) {
			var c = this.sa[seriesCounter];

			if(!seriesID.includes(c.n)) {
				svg.appendChild(svgen('rect', { x: c.xo, y: c.yo + 1, width: c.w + 1, height: c.h, stroke:'#000000',  fill:'#F6F6F6' }));
				
				// Draw Y-Axis Grid Lines and labels
				if(c.h >= 14) {
					if(c.units) {
						svg.appendChild(svgen('line', { x1: c.xo - 5, y1: c.yo + 1, x2: c.xo + 1, y2: c.yo + 1, stroke:'#000000',  fill:'none' }));
						svg.appendChild(svgen('line', { x1: c.xo - 5, y1: c.yo + 1 + c.h, x2: c.xo + 1, y2: c.yo + 1 + c.h, stroke:'#000000',  fill:'none' }));
							
						yoffset = 0;
						checkCounter = seriesCounter;
						while(checkCounter != -1) {
							if(this.sa[checkCounter].yo != c.yo) yoffset = 4;
							checkCounter = checkCounter - 1;
						}

						svg.appendChild(svgen('text', { x: c.xo - 10, y: c.yo + 5 + yoffset, "text-anchor":"end", "font-size":11 }, formatValue(c, c.maxValue)));
						
						yoffset = 0;
						checkCounter = seriesCounter;
						while(checkCounter != numSeries) {
							if(this.sa[checkCounter].yo != c.yo) yoffset = -4;
							checkCounter = checkCounter + 1;
						}

						svg.appendChild(svgen('text', { x: c.xo - 10, y: c.yo + 5 + yoffset + c.h, "text-anchor":"end", "font-size":11 }, formatValue(c, c.minValue)));
					}
				} else {
					svg.appendChild(svgen('line', { x1: c.xo - 30, y1: c.yo + (c.h / 2 - 3) + 6, x2: c.xo - 30 + 10, y2: c.yo + (c.h / 2 - 3) + 2, stroke: c.color,  fill:'none' }));
					svg.appendChild(svgen('line', { x1: c.xo - 30 + 10, y1: c.yo + (c.h / 2 - 3) + 2, x2: c.xo - 30 + 14, y2: c.yo + (c.h / 2 - 3) + 6, stroke: c.color,  fill:'none' }));
					svg.appendChild(svgen('line', { x1: c.xo - 30 + 14, y1: c.yo + (c.h / 2 - 3) + 6, x2: c.xo - 30 + 23, y2: c.yo + (c.h / 2 - 3) + 2, stroke: c.color,  fill:'none' }));
				}

				if(!c.noYAxis) {
					var curLine = 1;
					var vOffset = 0;
					while(curLine < c.hGridLines)
					{
						vOffset = c.yo + 1 + (c.h / c.hGridLines) * curLine;
						svg.appendChild(svgen('line', { x1: c.xo - 5, y1: vOffset, x2: c.xo + c.w + 1, y2: vOffset, stroke:'#999999', fill:'none' }));
						svg.appendChild(svgen('text', { x: c.xo - 10, y: vOffset + 4, "text-anchor":"end", "font-size":11 }, formatValue(c, (c.maxValue - c.minValue) * ((c.hGridLines - curLine)/c.hGridLines) + c.minValue)));
						
						curLine = curLine + 1;
					}
					
					// Draw Zero Line
					if(c.minValue < 0 && c.maxValue > 0)
					{
						svg.appendChild(svgen('line', { x1: c.xo, y1: c.yo + 1 + ((c.maxValue) * c.hs), x2: c.xo + c.w + 1, y2: c.yo + 1 + ((c.maxValue) * c.hs), stroke:'#000000',  fill:'none' }));
					}
				}
			}
			
			// X-Axis Labels
			var dateRange = c.end - c.start;
			
			var yStart = 11; // seconds
			var yEnd = 23;

			if(dateRange >= 600000) { yStart = 11; yEnd = 19; } // minutes
			if(dateRange >= 3600000) { yStart = 11; yEnd = 19; } // hours
			if(dateRange >= 86400000) { yStart = 11; yEnd = 16; } // days			
			if(dateRange >= 186400000) { yStart = 0; yEnd = 10; } // days			
			
			var tzOffset = new Date().getTimezoneOffset() * 60000;
			var tickString = new Date(c.start - tzOffset).toISOString();

			// X-Axis End Ticks
			svg.appendChild(svgen('line', { x1: c.xo, y1: c.yo + c.h + 1, x2: c.xo, y2: c.yo + c.h + 5, stroke:'#000000',  fill:'none' }));
			svg.appendChild(svgen('line', { x1: c.xo + c.w + 1, y1: c.yo + c.h + 1, x2: c.xo + c.w + 1, y2: c.yo + c.h + 5, stroke:'#000000',  fill:'none' }));
		
			if(seriesCounter == numSeries - 1) {
				svg.appendChild(svgen('text', { x: c.xo, y: c.yo + c.h + 15, "text-anchor":"start", "font-size":11 }, tickString.substring(yStart, yEnd))); // Time Range

				tickString = new Date(c.end - tzOffset).toISOString();
				svg.appendChild(svgen('text', { x: c.xo + c.w + 3, y: c.yo + c.h + 15, "text-anchor":"end", "font-size":11 }, tickString.substring(yStart, yEnd))); // Time Range
			}

			// Draw Vertical Grid Lines
			var curLine = 1;
			var hOffset = 0;
			while(curLine < c.wGridLines)
			{
				hOffset = c.xo + (c.w / c.wGridLines) * curLine;
				svg.appendChild(svgen('line', { x1: hOffset, y1: c.yo + 1, x2: hOffset, y2: c.yo + c.h + 5, stroke:'#999999',  fill:'none' }));

				if(seriesCounter == numSeries - 1) {
					tickString = new Date((c.start - tzOffset) + ((c.end - c.start) / c.wGridLines) * curLine).toISOString();
					svg.appendChild(svgen('text', { x: hOffset, y: c.yo + c.h + 15, "text-anchor":"middle", "font-size":11 }, tickString.substring(yStart, yEnd)));
				}
				
				curLine = curLine + 1;
			}

			// Draw render time
			if(seriesCounter == 0 && g.w > 200) {				
				var startDate = (new Date(c.start - tzOffset).toISOString()).substring(0, 19);
				var endDate = (new Date(c.end - tzOffset).toISOString()).substring(0, 19);;
				
				svg.appendChild(svgen('text', { x: c.xo + 1 + c.w, y: 8, "text-anchor":"end", "font-size":11 }, startDate + ' to ' + endDate));
			}

			// Draw Current Value
			if(c.last) {
				if(c.units) {
					var textHeight = c.h + 5;
					if(textHeight > 24) {textHeight = 24}
					svg.appendChild(svgen('text', { x: c.xo + c.w + 100, y: c.yo + (c.h / 2) + 9, "text-anchor":"end", "font-size": textHeight }, formatValue(c, c.last)));
				}
			}

			seriesID.push(c.n)

			seriesCounter = seriesCounter + 1;
		}
		
		// Draw Label
		var seriesCounter = 0;
		var labelString = this.sa[0].title + ':';
		var width = 0;

		while(seriesCounter != numSeries) {
			var c = this.sa[seriesCounter];

			if(c.hasOwnProperty('units')) {
				var node = svgen('text', { x: c.xo, y: 8, "font-size":11, "xml:space":"preserve"}, labelString);
				
				var textelement = document.createElement('canvas');
			    var textcontext = textelement.getContext("2d");
			    textcontext.font = "11px Times";
			    var width = textcontext.measureText(labelString).width + 5;

				labelString = labelString + "            " + c.label + ' (' + c.units + ')';
				svg.appendChild(svgen('line', { x1: c.xo + width, y1: 6, x2: c.xo + width + 10, y2: 2, stroke: c.color,  fill:'none' }));
				svg.appendChild(svgen('line', { x1: c.xo + width + 10, y1: 2, x2: c.xo + width + 14, y2: 6, stroke: c.color,  fill:'none' }));
				svg.appendChild(svgen('line', { x1: c.xo + width + 14, y1: 6, x2: c.xo + width + 23, y2: 2, stroke: c.color,  fill:'none' }));
			}

			seriesCounter = seriesCounter + 1;
		}

		labelString = labelString + ' vs. Time';
		svg.appendChild(svgen('text', { x: c.xo, y: 8, "font-size":11, "xml:space":"preserve"}, labelString));
	}

	// Private - Draws the data series
	drawData(svg) {
		var g = this;

		this.sa.forEach(function(c) {
			var c_bin = 0;
			var c_line = 0;
			var offset = 0;

			if(c.style == "heatstrip") {
				// Draw a heat strip chart
				var colourScale = 255 / Math.abs(c.maxValue - c.minValue);
				var barColour = "";
				var colour = "";

				while (c_bin < c.elc) {
					// Calculate colour
					barColour = ((c.avg[c_bin] - c.minValue) * colourScale).toFixed(0)
					barColour = Number(barColour).toString(16);
					if(barColour.length == 1) barColour = "0" + barColour;

					colour = h2rgb((255 - ((c.avg[c_bin] - c.minValue) * colourScale)).toFixed(0));

					svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws),
													y: c.yo + 1,
													width: c.dur[c_bin] * c.ws, 
													height: c.h, 
													fill: "#" + colour,
													"fill-opacity": c.fopacity },
													'<title>Value: ' + formatValue(c, c.avg[c_bin]) + '</title>'));
					c_bin = c_bin + 1;
				}
			} else {
				// Draw min/max bars
				while (c_bin < c.elc) {
					if(c.hasOwnProperty('max') && c.hasOwnProperty('min')) {
						svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h - ((c.max[c_bin] - c.minValue) * c.hs), width: c.dur[c_bin] * c.ws, height: (c.max[c_bin] - c.min[c_bin])  * c.hs,  fill: c.color, "fill-opacity":"0.5" }, '<title>Max: ' + formatValue(c, c.max[c_bin]) + '\nAvg: ' + formatValue(c, c.avg[c_bin]) + '\nMin: ' + formatValue(c, c.min[c_bin]) + '</title>'));
						
						if(c.style == "area" || c.style == "classic") {
							// Positive Values
							if(c.min[c_bin] > 0)
							{
								if(c.minValue > 0) { offset = c.minValue * c.hs; } else { offset = 0; }
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h - ((c.min[c_bin] - c.minValue) * c.hs), width: c.dur[c_bin] * c.ws, height: (c.min[c_bin] * c.hs) - offset + 1,  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Max: ' + formatValue(c, c.max[c_bin]) + '\nAvg: ' + formatValue(c, c.avg[c_bin]) + '\nMin: ' + formatValue(c, c.min[c_bin]) + '</title>'));
							}
							
							// Negative Values
							if(c.max[c_bin] < 0)
							{
								if(c.maxValue < 0) { offset = c.maxValue * c.hs; } else { offset = 0; }
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h  + 1 - ((0 - c.minValue) * c.hs) - offset, width: c.dur[c_bin] * c.ws, height: ((c.max[c_bin] * -1) * c.hs) + offset,  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Max: ' + formatValue(c, c.max[c_bin]) + '\nAvg: ' + formatValue(c, c.avg[c_bin]) + '\nMin: ' + formatValue(c, c.min[c_bin]) + '</title>'));
							}
						}

						if(c.style == "overfill") {
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo, width: c.dur[c_bin] * c.ws, height: ((c.maxValue - c.max[c_bin]) * c.hs),  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Max: ' + formatValue(c, c.max[c_bin]) + '\nAvg: ' + formatValue(c, c.avg[c_bin]) + '\nMin: ' + formatValue(c, c.min[c_bin]) + '</title>'));
						}

						if(c.style == "underfill") {
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h - ((c.min[c_bin] - c.minValue) * c.hs), width: c.dur[c_bin] * c.ws, height: ((c.min[c_bin] - c.minValue) * c.hs),  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Max: ' + formatValue(c, c.max[c_bin]) + '\nAvg: ' + formatValue(c, c.avg[c_bin]) + '\nMin: ' + formatValue(c, c.min[c_bin]) + '</title>'));
						}
					} else {
						if(c.style == "area" || c.style == "classic") {
							// Positive Values
							if(c.avg[c_bin] > 0)
							{
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h - ((c.avg[c_bin] - c.minValue) * c.hs), width: c.dur[c_bin] * c.ws, height: (c.avg[c_bin] * c.hs) + 1,  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Value: ' + formatValue(c, c.avg[c_bin]) + '</title>'));
							}

							// Negative Values
							if(c.avg[c_bin] < 0)
							{
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h  + 1 - ((0 - c.minValue) * c.hs) - offset, width: c.dur[c_bin] * c.ws, height: ((c.avg[c_bin] * -1) * c.hs),  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Value: ' + formatValue(c, c.avg[c_bin]) + '</title>'));
							}
						}

						if(c.style == "overfill") {
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo, width: c.dur[c_bin] * c.ws, height: ((c.maxValue - c.avg[c_bin]) * c.hs),  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Value: ' + formatValue(c, c.avg[c_bin]) + '</title>'));
						}

						if(c.style == "underfill") {
								svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] - c.start) * c.ws), y: c.yo + c.h - ((c.avg[c_bin] - c.minValue) * c.hs), width: c.dur[c_bin] * c.ws, height: ((c.avg[c_bin] - c.minValue) * c.hs),  fill: c.fcolor, "fill-opacity": c.fopacity }, '<title>Value: ' + formatValue(c, c.avg[c_bin]) + '</title>'));
						}
					}
					
					c_bin = c_bin + 1;
				}

				if(c.style != "color") {
					// Draw gaps
					c_bin = 0;
					while (c_bin < c.elc - 1) {
						if((c.time[c_bin] + c.dur[c_bin]) < c.time[c_bin + 1]) {
							svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] + c.dur[c_bin] - c.start) * c.ws), y: c.yo + 1, width: (c.time[c_bin + 1] - (c.time[c_bin] + c.dur[c_bin])) * c.ws, height: c.h,  fill:'#0000FF', "fill-opacity":"0.2" }));
						}
						c_bin = c_bin + 1;
					}

					if(c.end - c.time[c_bin] > c.to) {
						svg.appendChild(svgen('rect', { x: c.xo + ((c.time[c_bin] + c.dur[c_bin] - c.start) * c.ws), y: c.yo + 1, width: (c.end - c.time[c_bin] - c.dur[c_bin]) * c.ws, height: c.h,  fill:'#0000FF', "fill-opacity":"0.2" }));
					}
					
					// Draw average polyline
					c_bin = 0;
					c_line = String(c.xo + (c.time[c_bin] - c.start) * c.ws) + "," + String(c.yo + c.h + 1 - ((c.avg[c_bin] - c.minValue) * c.hs)) + ", ";
					
					while (c_bin < (c.elc - 1)) {
						c_line = c_line + String(c.xo + (((c.time[c_bin + 1] - c.start)) * c.ws)) + "," + String(c.yo + c.h + 1 - ((c.avg[c_bin] - c.minValue) * c.hs));
						
						if(c_bin + 1 != c.elc) {
							c_line = c_line + ", " + String(c.xo + (((c.time[c_bin + 1] - c.start)) * c.ws)) + "," + String(c.yo + c.h + 1 - ((c.avg[c_bin + 1] - c.minValue) * c.hs)) + ", ";
						}
						
						if(c_bin + 2 == c.elc) {
							c_line = c_line + String(c.xo + (((c.time[c_bin + 1] - c.start) + c.dur[c_bin + 1]) * c.ws)) + "," + String(c.yo + c.h + 1 - ((c.avg[c_bin + 1] - c.minValue) * c.hs));
						}
						c_bin = c_bin + 1;
					}
					
					svg.appendChild(svgen('polyline', { points: c_line, fill:"none", stroke: c.color }));
				} else {
					// Draw color lines
					c_bin = 0;

					while (c_bin < (c.elc - 1)) {
						if(c.avg[c_bin] != "#FFFFFF") {
							//svg.appendChild(svgen('line', { x1: c.xo + (((c.time[c_bin] - c.start)) * c.ws), y1: c.yo + 1, x2: c.xo + (((c.time[c_bin + 1] - c.start)) * c.ws), y2: c.yo + 1, stroke: c.avg[c_bin], "stroke-width": 3, fill:'none' }));
							svg.appendChild(svgen('line', { x1: c.xo + (((c.time[c_bin] - c.start)) * c.ws), y1: c.yo + c.h + 1, x2: c.xo + (((c.time[c_bin + 1] - c.start)) * c.ws), y2: c.yo + c.h + 1, stroke: c.avg[c_bin], "stroke-width": 3, fill:'none' }));
						}
						c_bin = c_bin + 1;
					}

					if(c.avg[c_bin] != "#FFFFFF") {
						//svg.appendChild(svgen('line', { x1: c.xo + (((c.time[c_bin] - c.start)) * c.ws), y1: c.yo + 1, x2: c.xo + c.w + 1, y2: c.yo + 1, stroke: c.avg[c_bin], "stroke-width": 3, fill:'none' }));
						svg.appendChild(svgen('line', { x1: c.xo + (((c.time[c_bin] - c.start)) * c.ws), y1: c.yo + c.h + 1, x2: c.xo + c.w + 1, y2: c.yo + c.h + 1, stroke: c.avg[c_bin], "stroke-width": 3, fill:'none' }));
					}
				}
			}
		})
	}
}
