var d3pie = new d3pie("pieChart", {
	"header": {
		"title": {
			"text": "ターンテーブルの負荷の分布",
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
				"label": "A 30%",
        "value": 20,
        "block-segment": "A",
				"color": "#cb2121"
			},
			{
				"label": "B 20%",
				"value": 20,
        "block-segment": "B",
				"color": "#e98125"
			},
			{
				"label": "C 12%",
				"value": 20,
        "block-segment": "B",
				"color": "#e4a14b"
			},
			{
				"label": "D 11%",
				"value": 20,
        "block-segment": "B",
				"color": "#daca61"
			},
			{
				"label": "E 9%",
				"value": 20,
        "block-segment": "B",
				"color": "#90c469"
			},
			{
				"label": "F 8%",
				"value": 20,
        "block-segment": "B",
				"color": "#4daa4b"
			},
			{
				"label": "G 7%",
				"value": 20,
        "block-segment": "B",
				"color": "#0c6197"
			},
			{
				"label": "H 3%",
				"value": 20,
        "block-segment": "B",
				"color": "#2484c1"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
      "format": "block-segment",
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
    "block-segment": {
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

var d3pie = new d3pie("pieChart1", {
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
				"label": "A 30%",
        "value": 20,
        "block-segment": "A",
				"color": "#cb2121"
			},
			{
				"label": "B 20%",
				"value": 20,
        "block-segment": "B",
				"color": "#e98125"
			},
			{
				"label": "C 12%",
				"value": 20,
        "block-segment": "B",
				"color": "#e4a14b"
			},
			{
				"label": "D 11%",
				"value": 20,
        "block-segment": "B",
				"color": "#daca61"
			},
			{
				"label": "E 9%",
				"value": 20,
        "block-segment": "B",
				"color": "#90c469"
			},
			{
				"label": "F 8%",
				"value": 20,
        "block-segment": "B",
				"color": "#4daa4b"
			},
			{
				"label": "G 7%",
				"value": 20,
        "block-segment": "B",
				"color": "#0c6197"
			},
			{
				"label": "H 3%",
				"value": 20,
        "block-segment": "B",
				"color": "#2484c1"
			}
		]
	},
	"labels": {
		"outer": {
			"pieDistance": 32
		},
		"inner": {
      "format": "block-segment",
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
    "block-segment": {
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