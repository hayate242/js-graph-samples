var d3pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "ターンテーブルにかかる負荷の割合",
			"fontSize": 24,
			"font": "open sans"
		},
		"subtitle": {
			"color": "#999999",
			"fontSize": 12,
			"font": "open sans"
		},
		"titleSubtitlePadding": 9
	},
	"footer": {
		"color": "#999999",
		"fontSize": 10,
		"font": "open sans",
		"location": "bottom-left"
	},
	"size": {
		"canvasWidth": 590,
		"pieOuterRadius": "90%"
	},
	"data": {
		"sortOrder": "label-asc",
		"content": [
			{
				"label": "A",
				"value": 264131,
				"color": "#2484c1"
			},
			{
				"label": "B",
				"value": 218812,
				"color": "#0c6197"
			},
			{
				"label": "C",
				"value": 157618,
				"color": "#4daa4b"
			},
			{
				"label": "D",
				"value": 114384,
				"color": "#90c469"
			},
			{
				"label": "E",
				"value": 95002,
				"color": "#daca61"
			},
			{
				"label": "F",
				"value": 78327,
				"color": "#e4a14b"
			},
			{
				"label": "G",
				"value": 67706,
				"color": "#e98125"
			},
			{
				"label": "H",
				"value": 36344,
				"color": "#cb2121"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
			"hideWhenLessThanPercentage": 3
		},
		"mainLabel": {
			"fontSize": 21
		},
		"percentage": {
			"color": "#ffffff",
			"fontSize": 17,
			"decimalPlaces": 0
		},
		"value": {
			"color": "#adadad",
			"fontSize": 21
		},
		"lines": {
			"enabled": true
		},
		"truncation": {
			"enabled": true
		}
	},
	"effects": {
		"pullOutSegmentOnClick": {
			"effect": "linear",
			"speed": 400,
			"size": 8
		}
	},
	"misc": {
		"gradient": {
			"enabled": true,
			"percentage": 100
		}
	}
});