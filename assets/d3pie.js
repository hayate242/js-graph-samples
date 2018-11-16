/*!
* d3pie
* @author Ben Keen
* @version 0.2.1
* @date March 11, 2017
* @repo http://github.com/benkeen/d3pie
*/
!function(a, b) {
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.d3pie = b(a)
}(this, function() {
    var a = "d3pie"
      , b = "0.2.1"
      , c = 0
      , e = {
        header: {
            title: {
                text: "",
                color: "#333333",
                fontSize: 18,
                font: "arial"
            },
            subtitle: {
                text: "",
                color: "#666666",
                fontSize: 14,
                font: "arial"
            },
            location: "top-center",
            titleSubtitlePadding: 8
        },
        footer: {
            text: "",
            color: "#666666",
            fontSize: 14,
            font: "arial",
            location: "left"
        },
        size: {
            canvasHeight: 500,
            canvasWidth: 500,
            pieInnerRadius: "0%",
            pieOuterRadius: null
        },
        data: {
            sortOrder: "none",
            ignoreSmallSegments: {
                enabled: !1,
                valueType: "percentage",
                value: null
            },
            smallSegmentGrouping: {
                enabled: !1,
                value: 1,
                valueType: "percentage",
                label: "Other",
                color: "#cccccc"
            },
            content: []
        },
        labels: {
            outer: {
                format: "label",
                hideWhenLessThanPercentage: null,
                pieDistance: 30
            },
            inner: {
                format: "percentage",
                hideWhenLessThanPercentage: null
            },
            mainLabel: {
                color: "#333333",
                font: "arial",
                fontSize: 10
            },
            percentage: {
                color: "#dddddd",
                font: "arial",
                fontSize: 10,
                decimalPlaces: 0
            },
            value: {
                color: "#cccc44",
                font: "arial",
                fontSize: 10
            },
            lines: {
                enabled: !0,
                style: "curved",
                color: "segment"
            },
            truncation: {
                enabled: !1,
                truncateLength: 30
            },
            formatter: null
        },
        effects: {
            load: {
                effect: "default",
                speed: 1e3
            },
            pullOutSegmentOnClick: {
                effect: "bounce",
                speed: 300,
                size: 10
            },
            highlightSegmentOnMouseover: !0,
            highlightLuminosity: -.2
        },
        tooltips: {
            enabled: !1,
            type: "placeholder",
            string: "",
            placeholderParser: null,
            styles: {
                fadeInSpeed: 250,
                backgroundColor: "#000000",
                backgroundOpacity: .5,
                color: "#efefef",
                borderRadius: 2,
                font: "arial",
                fontSize: 10,
                padding: 4
            }
        },
        misc: {
            colors: {
                background: null,
                segments: ["#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a", "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f", "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391", "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6", "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"],
                segmentStroke: "#ffffff"
            },
            gradient: {
                enabled: !1,
                percentage: 95,
                color: "#000000"
            },
            canvasPadding: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5
            },
            pieCenterOffset: {
                x: 0,
                y: 0
            },
            cssPrefix: null
        },
        callbacks: {
            onload: null,
            onMouseoverSegment: null,
            onMouseoutSegment: null,
            onClickSegment: null
        }
    }
      , f = {
        initialCheck: function(a) {
            var b = a.cssPrefix
              , c = a.element
              , d = a.options;
            if (!window.d3 || !window.d3.hasOwnProperty("version"))
                return console.error("d3pie error: d3 is not available"),
                !1;
            if (!(c instanceof HTMLElement || c instanceof SVGElement))
                return console.error("d3pie error: the first d3pie() param must be a valid DOM element (not jQuery) or a ID string."),
                !1;
            if (!/[a-zA-Z][a-zA-Z0-9_-]*$/.test(b))
                return console.error("d3pie error: invalid options.misc.cssPrefix"),
                !1;
            if (!g.isArray(d.data.content))
                return console.error("d3pie error: invalid config structure: missing data.content property."),
                !1;
            if (0 === d.data.content.length)
                return console.error("d3pie error: no data supplied."),
                !1;
            for (var e = [], f = 0; f < d.data.content.length; f++)
                "number" != typeof d.data.content[f].value || isNaN(d.data.content[f].value) ? console.log("not valid: ", d.data.content[f]) : d.data.content[f].value <= 0 ? console.log("not valid - should have positive value: ", d.data.content[f]) : e.push(d.data.content[f]);
            return a.options.data.content = e,
            !0
        }
    }
      , g = {
        addSVGSpace: function(a) {
            var b = a.element
              , c = a.options.size.canvasWidth
              , d = a.options.size.canvasHeight
              , e = a.options.misc.colors.background
              , f = d3.select(b).append("svg:svg").attr("width", c).attr("height", d);
            return "transparent" !== e && f.style("background-color", function() {
                return e
            }),
            f
        },
        whenIdExists: function(a, b) {
            var c = 1
              , d = 1e3
              , e = setInterval(function() {
                document.getElementById(a) && (clearInterval(e),
                b()),
                c > d && clearInterval(e),
                c++
            }, 1)
        },
        whenElementsExist: function(a, b) {
            var c = 1
              , d = 1e3
              , e = setInterval(function() {
                for (var f = !0, g = 0; g < a.length; g++)
                    if (!document.getElementById(a[g])) {
                        f = !1;
                        break
                    }
                f && (clearInterval(e),
                b()),
                c > d && clearInterval(e),
                c++
            }, 1)
        },
        shuffleArray: function(a) {
            for (var b, c, d = a.length; 0 !== d; )
                c = Math.floor(Math.random() * d),
                d -= 1,
                b = a[d],
                a[d] = a[c],
                a[c] = b;
            return a
        },
        processObj: function(a, b, c) {
            return "string" == typeof b ? g.processObj(a, b.split("."), c) : 1 === b.length && void 0 !== c ? (a[b[0]] = c,
            a[b[0]]) : 0 === b.length ? a : g.processObj(a[b[0]], b.slice(1), c)
        },
        getDimensions: function(a) {
            var b = document.getElementById(a)
              , c = 0
              , d = 0;
            if (b) {
                var e = b.getBBox();
                c = e.width,
                d = e.height
            } else
                console.log("error: getDimensions() " + a + " not found.");
            return {
                w: c,
                h: d
            }
        },
        rectIntersect: function(a, b) {
            var c = b.x > a.x + a.w || b.x + b.w < a.x || b.y + b.h < a.y || b.y > a.y + a.h;
            return !c
        },
        getColorShade: function(a, b) {
            a = String(a).replace(/[^0-9a-f]/gi, ""),
            a.length < 6 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]),
            b = b || 0;
            for (var c = "#", d = 0; 3 > d; d++) {
                var e = parseInt(a.substr(2 * d, 2), 16);
                e = Math.round(Math.min(Math.max(0, e + e * b), 255)).toString(16),
                c += ("00" + e).substr(e.length)
            }
            return c
        },
        initSegmentColors: function(a) {
            for (var b = a.options.data.content, c = a.options.misc.colors.segments, d = [], e = 0; e < b.length; e++)
                b[e].hasOwnProperty("color") ? d.push(b[e].color) : d.push(c[e]);
            return d
        },
        applySmallSegmentGrouping: function(a, b) {
            var c;
            "percentage" === b.valueType && (c = i.getTotalPieSize(a));
            for (var d = [], e = [], f = 0, g = 0; g < a.length; g++)
                if ("percentage" === b.valueType) {
                    var h = a[g].value / c * 100;
                    if (h <= b.value) {
                        e.push(a[g]),
                        f += a[g].value;
                        continue
                    }
                    a[g].isGrouped = !1,
                    d.push(a[g])
                } else {
                    if (a[g].value <= b.value) {
                        e.push(a[g]),
                        f += a[g].value;
                        continue
                    }
                    a[g].isGrouped = !1,
                    d.push(a[g])
                }
            return e.length && d.push({
                color: b.color,
                label: b.label,
                value: f,
                isGrouped: !0,
                groupedData: e
            }),
            d
        },
        showPoint: function(a, b, c) {
            a.append("circle").attr("cx", b).attr("cy", c).attr("r", 2).style("fill", "black")
        },
        isFunction: function(a) {
            var b = {};
            return a && "[object Function]" === b.toString.call(a)
        },
        isArray: function(a) {
            return "[object Array]" === Object.prototype.toString.call(a)
        }
    }
      , h = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, i = 1, j = arguments.length, k = !1, l = Object.prototype.toString, m = Object.prototype.hasOwnProperty, n = {
            "[object Boolean]": "boolean",
            "[object Number]": "number",
            "[object String]": "string",
            "[object Function]": "function",
            "[object Array]": "array",
            "[object Date]": "date",
            "[object RegExp]": "regexp",
            "[object Object]": "object"
        }, o = {
            isFunction: function(a) {
                return "function" === o.type(a)
            },
            isArray: Array.isArray || function(a) {
                return "array" === o.type(a)
            }
            ,
            isWindow: function(a) {
                return null !== a && a === a.window
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a)
            },
            type: function(a) {
                return null === a ? String(a) : n[l.call(a)] || "object"
            },
            isPlainObject: function(a) {
                if (!a || "object" !== o.type(a) || a.nodeType)
                    return !1;
                try {
                    if (a.constructor && !m.call(a, "constructor") && !m.call(a.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (b) {
                    return !1
                }
                var c;
                for (c in a)
                    ;
                return void 0 === c || m.call(a, c)
            }
        };
        for ("boolean" == typeof g && (k = g,
        g = arguments[1] || {},
        i = 2),
        "object" == typeof g || o.isFunction(g) || (g = {}),
        j === i && (g = this,
        --i),
        i; j > i; i++)
            if (null !== (a = arguments[i]))
                for (b in a)
                    c = g[b],
                    d = a[b],
                    g !== d && (k && d && (o.isPlainObject(d) || (e = o.isArray(d))) ? (e ? (e = !1,
                    f = c && o.isArray(c) ? c : []) : f = c && o.isPlainObject(c) ? c : {},
                    g[b] = h(k, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }
      , i = {
        toRadians: function(a) {
            return a * (Math.PI / 180)
        },
        toDegrees: function(a) {
            return a * (180 / Math.PI)
        },
        computePieRadius: function(a) {
            var b = a.options.size
              , c = a.options.misc.canvasPadding
              , d = b.canvasWidth - c.left - c.right
              , e = b.canvasHeight - c.top - c.bottom;
            "pie-center" !== a.options.header.location && (e -= a.textComponents.headerHeight),
            a.textComponents.footer.exists && (e -= a.textComponents.footer.h),
            e = 0 > e ? 0 : e;
            var f, g, h = (e > d ? d : e) / 3;
            if (null !== b.pieOuterRadius)
                if (/%/.test(b.pieOuterRadius)) {
                    g = parseInt(b.pieOuterRadius.replace(/[\D]/, ""), 10),
                    g = g > 99 ? 99 : g,
                    g = 0 > g ? 0 : g;
                    var i = e > d ? d : e;
                    if ("none" !== a.options.labels.outer.format) {
                        var j = 2 * parseInt(a.options.labels.outer.pieDistance, 10);
                        i - j > 0 && (i -= j)
                    }
                    h = Math.floor(i / 100 * g) / 2
                } else
                    h = parseInt(b.pieOuterRadius, 10);
            /%/.test(b.pieInnerRadius) ? (g = parseInt(b.pieInnerRadius.replace(/[\D]/, ""), 10),
            g = g > 99 ? 99 : g,
            g = 0 > g ? 0 : g,
            f = Math.floor(h / 100 * g)) : f = parseInt(b.pieInnerRadius, 10),
            a.innerRadius = f,
            a.outerRadius = h
        },
        getTotalPieSize: function(a) {
            for (var b = 0, c = 0; c < a.length; c++)
                b += a[c].value;
            return b
        },
        sortPieData: function(a) {
            var b = a.options.data.content
              , c = a.options.data.sortOrder;
            switch (c) {
            case "none":
                break;
            case "random":
                b = g.shuffleArray(b);
                break;
            case "value-asc":
                b.sort(function(a, b) {
                    return a.value < b.value ? -1 : 1
                });
                break;
            case "value-desc":
                b.sort(function(a, b) {
                    return a.value < b.value ? 1 : -1
                });
                break;
            case "label-asc":
                b.sort(function(a, b) {
                    return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : -1
                });
                break;
            case "label-desc":
                b.sort(function(a, b) {
                    return a.label.toLowerCase() < b.label.toLowerCase() ? 1 : -1
                })
            }
            return b
        },
        getPieTranslateCenter: function(a) {
            return "translate(" + a.x + "," + a.y + ")"
        },
        calculatePieCenter: function(a) {
            var b = a.options.misc.pieCenterOffset
              , c = a.textComponents.title.exists && "pie-center" !== a.options.header.location
              , d = a.textComponents.subtitle.exists && "pie-center" !== a.options.header.location
              , e = a.options.misc.canvasPadding.top;
            c && d ? e += a.textComponents.title.h + a.options.header.titleSubtitlePadding + a.textComponents.subtitle.h : c ? e += a.textComponents.title.h : d && (e += a.textComponents.subtitle.h);
            var f = 0;
            a.textComponents.footer.exists && (f = a.textComponents.footer.h + a.options.misc.canvasPadding.bottom);
            var g = (a.options.size.canvasWidth - a.options.misc.canvasPadding.left - a.options.misc.canvasPadding.right) / 2 + a.options.misc.canvasPadding.left
              , h = (a.options.size.canvasHeight - f - e) / 2 + e;
            g += b.x,
            h += b.y,
            a.pieCenter = {
                x: g,
                y: h
            }
        },
        rotate: function(a, b, c, d, e) {
            e = e * Math.PI / 180;
            var f = Math.cos
              , g = Math.sin
              , h = (a - c) * f(e) - (b - d) * g(e) + c
              , i = (a - c) * g(e) + (b - d) * f(e) + d;
            return {
                x: h,
                y: i
            }
        },
        translate: function(a, b, c, d) {
            var e = i.toRadians(d);
            return {
                x: a + c * Math.sin(e),
                y: b - c * Math.cos(e)
            }
        },
        pointIsInArc: function(a, b, c) {
            var d = c.innerRadius()(b)
              , e = c.outerRadius()(b)
              , f = c.startAngle()(b)
              , g = c.endAngle()(b)
              , h = a.x * a.x + a.y * a.y
              , i = Math.atan2(a.x, -a.y);
            return i = 0 > i ? i + 2 * Math.PI : i,
            h >= d * d && e * e >= h && i >= f && g >= i
        }
    }
      , j = {
        add: function(a, b, c) {
            var d = j.getIncludes(c)
              , e = a.options.labels
              , f = a.svg.insert("g", "." + a.cssPrefix + "labels-" + b).attr("class", a.cssPrefix + "labels-" + b)
              , g = f.selectAll("." + a.cssPrefix + "labelGroup-" + b).data(a.options.data.content).enter().append("g").attr("id", function(c, d) {
                return a.cssPrefix + "labelGroup" + d + "-" + b
            }).attr("data-index", function(a, b) {
                return b
            }).attr("class", a.cssPrefix + "labelGroup-" + b).style("opacity", 0)
              , h = {
                section: b,
                sectionDisplayType: c
            };
            d.mainLabel && g.append("text").attr("id", function(c, d) {
                return a.cssPrefix + "segmentMainLabel" + d + "-" + b
            }).attr("class", a.cssPrefix + "segmentMainLabel-" + b).text(function(a, b) {
                var c = a.label;
                return e.formatter ? (h.index = b,
                h.part = "mainLabel",
                h.value = a.value,
                h.label = c,
                c = e.formatter(h)) : e.truncation.enabled && a.label.length > e.truncation.truncateLength && (c = a.label.substring(0, e.truncation.truncateLength) + "..."),
                c
            }).style("font-size", e.mainLabel.fontSize + "px").style("font-family", e.mainLabel.font).style("fill", e.mainLabel.color),
            d.percentage && g.append("text").attr("id", function(c, d) {
                return a.cssPrefix + "segmentPercentage" + d + "-" + b
            }).attr("class", a.cssPrefix + "segmentPercentage-" + b).text(function(a, b) {
                var c = a.percentage;
                return e.formatter ? (h.index = b,
                h.part = "percentage",
                h.value = a.value,
                h.label = a.percentage,
                c = e.formatter(h)) : c += "%",
                c
            }).style("font-size", e.percentage.fontSize + "px").style("font-family", e.percentage.font).style("fill", e.percentage.color),
            d.value && g.append("text").attr("id", function(c, d) {
                return a.cssPrefix + "segmentValue" + d + "-" + b
            }).attr("class", a.cssPrefix + "segmentValue-" + b).text(function(a, b) {
                return h.index = b,
                h.part = "value",
                h.value = a.value,
                h.label = a.value,
                e.formatter ? e.formatter(h, a.value) : a.value
            }).style("font-size", e.value.fontSize + "px").style("font-family", e.value.font).style("fill", e.value.color)
        },
        positionLabelElements: function(a, b, c) {
            j["dimensions-" + b] = [];
            var d = d3.selectAll("." + a.cssPrefix + "labelGroup-" + b);
            d.each(function(c, d) {
                var e = d3.select(this).selectAll("." + a.cssPrefix + "segmentMainLabel-" + b)
                  , f = d3.select(this).selectAll("." + a.cssPrefix + "segmentPercentage-" + b)
                  , g = d3.select(this).selectAll("." + a.cssPrefix + "segmentValue-" + b);
                j["dimensions-" + b].push({
                    mainLabel: null !== e.node() ? e.node().getBBox() : null,
                    percentage: null !== f.node() ? f.node().getBBox() : null,
                    value: null !== g.node() ? g.node().getBBox() : null
                })
            });
            var e = 5
              , f = j["dimensions-" + b];
            switch (c) {
            case "label-value1":
                d3.selectAll("." + a.cssPrefix + "segmentValue-" + b).attr("dx", function(a, b) {
                    return f[b].mainLabel.width + e
                });
                break;
            case "label-value2":
                d3.selectAll("." + a.cssPrefix + "segmentValue-" + b).attr("dy", function(a, b) {
                    return f[b].mainLabel.height
                });
                break;
            case "label-percentage1":
                d3.selectAll("." + a.cssPrefix + "segmentPercentage-" + b).attr("dx", function(a, b) {
                    return f[b].mainLabel.width + e
                });
                break;
            case "label-percentage2":
                d3.selectAll("." + a.cssPrefix + "segmentPercentage-" + b).attr("dx", function(a, b) {
                    return f[b].mainLabel.width / 2 - f[b].percentage.width / 2
                }).attr("dy", function(a, b) {
                    return f[b].mainLabel.height
                })
            }
        },
        computeLabelLinePositions: function(a) {
            a.lineCoordGroups = [],
            d3.selectAll("." + a.cssPrefix + "labelGroup-outer").each(function(b, c) {
                return j.computeLinePosition(a, c)
            })
        },
        computeLinePosition: function(a, b) {
            var c, d, e, f, g = k.getSegmentAngle(b, a.options.data.content, a.totalSize, {
                midpoint: !0
            }), h = i.rotate(a.pieCenter.x, a.pieCenter.y - a.outerRadius, a.pieCenter.x, a.pieCenter.y, g), j = a.outerLabelGroupData[b].h / 5, l = 6, m = Math.floor(g / 90), n = 4;
            switch (2 === m && 180 === g && (m = 1),
            m) {
            case 0:
                c = a.outerLabelGroupData[b].x - l - (a.outerLabelGroupData[b].x - l - h.x) / 2,
                d = a.outerLabelGroupData[b].y + (h.y - a.outerLabelGroupData[b].y) / n,
                e = a.outerLabelGroupData[b].x - l,
                f = a.outerLabelGroupData[b].y - j;
                break;
            case 1:
                c = h.x + (a.outerLabelGroupData[b].x - h.x) / n,
                d = h.y + (a.outerLabelGroupData[b].y - h.y) / n,
                e = a.outerLabelGroupData[b].x - l,
                f = a.outerLabelGroupData[b].y - j;
                break;
            case 2:
                var o = a.outerLabelGroupData[b].x + a.outerLabelGroupData[b].w + l;
                c = h.x - (h.x - o) / n,
                d = h.y + (a.outerLabelGroupData[b].y - h.y) / n,
                e = a.outerLabelGroupData[b].x + a.outerLabelGroupData[b].w + l,
                f = a.outerLabelGroupData[b].y - j;
                break;
            case 3:
                var p = a.outerLabelGroupData[b].x + a.outerLabelGroupData[b].w + l;
                c = p + (h.x - p) / n,
                d = a.outerLabelGroupData[b].y + (h.y - a.outerLabelGroupData[b].y) / n,
                e = a.outerLabelGroupData[b].x + a.outerLabelGroupData[b].w + l,
                f = a.outerLabelGroupData[b].y - j
            }
            "straight" === a.options.labels.lines.style ? a.lineCoordGroups[b] = [{
                x: h.x,
                y: h.y
            }, {
                x: e,
                y: f
            }] : a.lineCoordGroups[b] = [{
                x: h.x,
                y: h.y
            }, {
                x: c,
                y: d
            }, {
                x: e,
                y: f
            }]
        },
        addLabelLines: function(a) {
            var b = a.svg.insert("g", "." + a.cssPrefix + "pieChart").attr("class", a.cssPrefix + "lineGroups").style("opacity", 0)
              , c = b.selectAll("." + a.cssPrefix + "lineGroup").data(a.lineCoordGroups).enter().append("g").attr("class", a.cssPrefix + "lineGroup")
              , d = d3.line().curve(d3.curveBasis).x(function(a) {
                return a.x
            }).y(function(a) {
                return a.y
            });
            c.append("path").attr("d", d).attr("stroke", function(b, c) {
                return "segment" === a.options.labels.lines.color ? a.options.colors[c] : a.options.labels.lines.color
            }).attr("stroke-width", 1).attr("fill", "none").style("opacity", function(b, c) {
                var d = a.options.labels.outer.hideWhenLessThanPercentage
                  , e = null !== d && b.percentage < d || "" === a.options.data.content[c].label;
                return e ? 0 : 1
            })
        },
        positionLabelGroups: function(a, b) {
            "none" !== a.options.labels[b].format && d3.selectAll("." + a.cssPrefix + "labelGroup-" + b).style("opacity", 0).attr("transform", function(c, d) {
                var e, f;
                if ("outer" === b)
                    e = a.outerLabelGroupData[d].x,
                    f = a.outerLabelGroupData[d].y;
                else {
                    var j = h(!0, {}, a.pieCenter);
                    if (a.innerRadius > 0) {
                        var l = k.getSegmentAngle(d, a.options.data.content, a.totalSize, {
                            midpoint: !0
                        })
                          , m = i.translate(a.pieCenter.x, a.pieCenter.y, a.innerRadius, l);
                        j.x = m.x,
                        j.y = m.y
                    }
                    var n = g.getDimensions(a.cssPrefix + "labelGroup" + d + "-inner")
                      , o = n.w / 2
                      , p = n.h / 4;
                    e = j.x + (a.lineCoordGroups[d][0].x - j.x) / 1.8,
                    f = j.y + (a.lineCoordGroups[d][0].y - j.y) / 1.8,
                    e -= o,
                    f += p
                }
                return "translate(" + e + "," + f + ")"
            })
        },
        fadeInLabelsAndLines: function(a) {
            var b = "default" === a.options.effects.load.effect ? a.options.effects.load.speed : 1;
            setTimeout(function() {
                var b = "default" === a.options.effects.load.effect ? 400 : 1;
                d3.selectAll("." + a.cssPrefix + "labelGroup-outer").transition().duration(b).style("opacity", function(b, c) {
                    var d = a.options.labels.outer.hideWhenLessThanPercentage;
                    return null !== d && b.percentage < d ? 0 : 1
                }),
                d3.selectAll("." + a.cssPrefix + "labelGroup-inner").transition().duration(b).style("opacity", function(b, c) {
                    var d = a.options.labels.inner.hideWhenLessThanPercentage;
                    return null !== d && b.percentage < d ? 0 : 1
                }),
                d3.selectAll("g." + a.cssPrefix + "lineGroups").transition().duration(b).style("opacity", 1),
                g.isFunction(a.options.callbacks.onload) && setTimeout(function() {
                    try {
                        a.options.callbacks.onload()
                    } catch (b) {}
                }, b)
            }, b)
        },
        getIncludes: function(a) {
            var b = !1
              , c = !1
              , d = !1;
            switch (a) {
            case "label":
                b = !0;
                break;
            case "value":
                c = !0;
                break;
            case "percentage":
                d = !0;
                break;
            case "label-value1":
            case "label-value2":
                b = !0,
                c = !0;
                break;
            case "label-percentage1":
            case "label-percentage2":
                b = !0,
                d = !0
            }
            return {
                mainLabel: b,
                value: c,
                percentage: d
            }
        },
        computeOuterLabelCoords: function(a) {
            a.svg.selectAll("." + a.cssPrefix + "labelGroup-outer").each(function(b, c) {
                return j.getIdealOuterLabelPositions(a, c)
            }),
            j.resolveOuterLabelCollisions(a)
        },
        resolveOuterLabelCollisions: function(a) {
            if ("none" !== a.options.labels.outer.format) {
                var b = a.options.data.content.length;
                j.checkConflict(a, 0, "clockwise", b),
                j.checkConflict(a, b - 1, "anticlockwise", b)
            }
        },
        checkConflict: function(a, b, c, d) {
            var e, f;
            if (!(1 >= d)) {
                var h = a.outerLabelGroupData[b].hs;
                if (!("clockwise" === c && "right" !== h || "anticlockwise" === c && "left" !== h)) {
                    var i = "clockwise" === c ? b + 1 : b - 1
                      , k = a.outerLabelGroupData[b]
                      , l = a.outerLabelGroupData[i]
                      , m = {
                        labelHeights: a.outerLabelGroupData[0].h,
                        center: a.pieCenter,
                        lineLength: a.outerRadius + a.options.labels.outer.pieDistance,
                        heightChange: a.outerLabelGroupData[0].h + 1
                    };
                    if ("clockwise" === c) {
                        for (e = 0; b >= e; e++)
                            if (f = a.outerLabelGroupData[e],
                            !j.isLabelHidden(a, e) && g.rectIntersect(f, l)) {
                                j.adjustLabelPos(a, i, k, m);
                                break
                            }
                    } else
                        for (e = d - 1; e >= b; e--)
                            if (f = a.outerLabelGroupData[e],
                            !j.isLabelHidden(a, e) && g.rectIntersect(f, l)) {
                                j.adjustLabelPos(a, i, k, m);
                                break
                            }
                    j.checkConflict(a, i, c, d)
                }
            }
        },
        isLabelHidden: function(a, b) {
            var c = a.options.labels.outer.hideWhenLessThanPercentage;
            return null !== c && d.percentage < c || "" === a.options.data.content[b].label
        },
        adjustLabelPos: function(a, b, c, d) {
            var e, f, g, h;
            h = c.y + d.heightChange,
            f = d.center.y - h,
            e = Math.abs(d.lineLength) > Math.abs(f) ? Math.sqrt(d.lineLength * d.lineLength - f * f) : Math.sqrt(f * f - d.lineLength * d.lineLength),
            g = "right" === c.hs ? d.center.x + e : d.center.x - e - a.outerLabelGroupData[b].w,
            a.outerLabelGroupData[b].x = g,
            a.outerLabelGroupData[b].y = h
        },
        getIdealOuterLabelPositions: function(a, b) {
            var c = d3.select("#" + a.cssPrefix + "labelGroup" + b + "-outer").node();
            if (c) {
                var d = c.getBBox()
                  , e = k.getSegmentAngle(b, a.options.data.content, a.totalSize, {
                    midpoint: !0
                })
                  , f = a.pieCenter.x
                  , g = a.pieCenter.y - (a.outerRadius + a.options.labels.outer.pieDistance)
                  , h = i.rotate(f, g, a.pieCenter.x, a.pieCenter.y, e)
                  , j = "right";
                e > 180 ? (h.x -= d.width + 8,
                j = "left") : h.x += 8,
                a.outerLabelGroupData[b] = {
                    x: h.x,
                    y: h.y,
                    w: d.width,
                    h: d.height,
                    hs: j
                }
            }
        }
    }
      , k = {
        effectMap: {
            none: d3.easeLinear,
            bounce: d3.easeBounce,
            linear: d3.easeLinear,
            sin: d3.easeSin,
            elastic: d3.easeElastic,
            back: d3.easeBack,
            quad: d3.easeQuad,
            circle: d3.easeCircle,
            exp: d3.easeExp
        },
        create: function(a) {
            var b = a.pieCenter
              , c = a.options.colors
              , d = a.options.effects.load
              , e = a.options.misc.colors.segmentStroke
              , f = a.svg.insert("g", "#" + a.cssPrefix + "title").attr("transform", function() {
                return i.getPieTranslateCenter(b)
            }).attr("class", a.cssPrefix + "pieChart")
              , g = d3.arc().innerRadius(a.innerRadius).outerRadius(a.outerRadius).startAngle(0).endAngle(function(b) {
                return b.value / a.totalSize * 2 * Math.PI
            })
              , h = f.selectAll("." + a.cssPrefix + "arc").data(a.options.data.content).enter().append("g").attr("class", a.cssPrefix + "arc")
              , j = d.speed;
            "none" === d.effect && (j = 0),
            h.append("path").attr("id", function(b, c) {
                return a.cssPrefix + "segment" + c
            }).attr("fill", function(b, d) {
                var e = c[d];
                return a.options.misc.gradient.enabled && (e = "url(#" + a.cssPrefix + "grad" + d + ")"),
                e
            }).style("stroke", e).style("stroke-width", 1).transition().ease(d3.easeCubicInOut).duration(j).attr("data-index", function(a, b) {
                return b
            }).attrTween("d", function(b) {
                var c = d3.interpolate({
                    value: 0
                }, b);
                return function(b) {
                    return a.arc(c(b))
                }
            }),
            a.svg.selectAll("g." + a.cssPrefix + "arc").attr("transform", function(b, c) {
                var d = 0;
                return c > 0 && (d = k.getSegmentAngle(c - 1, a.options.data.content, a.totalSize)),
                "rotate(" + d + ")"
            }),
            a.arc = g
        },
        addGradients: function(a) {
            var b = a.svg.append("defs").selectAll("radialGradient").data(a.options.data.content).enter().append("radialGradient").attr("gradientUnits", "userSpaceOnUse").attr("cx", 0).attr("cy", 0).attr("r", "120%").attr("id", function(b, c) {
                return a.cssPrefix + "grad" + c
            });
            b.append("stop").attr("offset", "0%").style("stop-color", function(b, c) {
                return a.options.colors[c]
            }),
            b.append("stop").attr("offset", a.options.misc.gradient.percentage + "%").style("stop-color", a.options.misc.gradient.color)
        },
        addSegmentEventHandlers: function(a) {
            var b = d3.selectAll("." + a.cssPrefix + "arc,." + a.cssPrefix + "labelGroup-inner,." + a.cssPrefix + "labelGroup-outer");
            b.on("click", function() {
                var b, c = d3.select(this);
                if (c.attr("class") === a.cssPrefix + "arc")
                    b = c.select("path");
                else {
                    var d = c.attr("data-index");
                    b = d3.select("#" + a.cssPrefix + "segment" + d)
                }
                var e = b.attr("class") === a.cssPrefix + "expanded";
                k.onSegmentEvent(a, a.options.callbacks.onClickSegment, b, e),
                "none" !== a.options.effects.pullOutSegmentOnClick.effect && (e ? k.closeSegment(a, b.node()) : k.openSegment(a, b.node()))
            }),
            b.on("mouseover", function() {
                var b, c, d = d3.select(this);
                if (d.attr("class") === a.cssPrefix + "arc" ? b = d.select("path") : (c = d.attr("data-index"),
                b = d3.select("#" + a.cssPrefix + "segment" + c)),
                a.options.effects.highlightSegmentOnMouseover) {
                    c = b.attr("data-index");
                    var e = a.options.colors[c];
                    b.style("fill", g.getColorShade(e, a.options.effects.highlightLuminosity))
                }
                a.options.tooltips.enabled && (c = b.attr("data-index"),
                m.showTooltip(a, c));
                var f = b.attr("class") === a.cssPrefix + "expanded";
                k.onSegmentEvent(a, a.options.callbacks.onMouseoverSegment, b, f)
            }),
            b.on("mousemove", function() {
                m.moveTooltip(a)
            }),
            b.on("mouseout", function() {
                var b, c, d = d3.select(this);
                if (d.attr("class") === a.cssPrefix + "arc" ? b = d.select("path") : (c = d.attr("data-index"),
                b = d3.select("#" + a.cssPrefix + "segment" + c)),
                a.options.effects.highlightSegmentOnMouseover) {
                    c = b.attr("data-index");
                    var e = a.options.colors[c];
                    a.options.misc.gradient.enabled && (e = "url(#" + a.cssPrefix + "grad" + c + ")"),
                    b.style("fill", e)
                }
                a.options.tooltips.enabled && (c = b.attr("data-index"),
                m.hideTooltip(a, c));
                var f = b.attr("class") === a.cssPrefix + "expanded";
                k.onSegmentEvent(a, a.options.callbacks.onMouseoutSegment, b, f)
            })
        },
        onSegmentEvent: function(a, b, c, d) {
            if (g.isFunction(b)) {
                var e = parseInt(c.attr("data-index"), 10);
                b({
                    segment: c.node(),
                    index: e,
                    expanded: d,
                    data: a.options.data.content[e]
                })
            }
        },
        openSegment: function(a, b) {
            a.isOpeningSegment || (a.isOpeningSegment = !0,
            k.maybeCloseOpenSegment(),
            d3.select(b).transition().ease(k.effectMap[a.options.effects.pullOutSegmentOnClick.effect]).duration(a.options.effects.pullOutSegmentOnClick.speed).attr("transform", function(b, c) {
                var d = a.arc.centroid(b)
                  , e = d[0]
                  , f = d[1]
                  , g = Math.sqrt(e * e + f * f)
                  , h = parseInt(a.options.effects.pullOutSegmentOnClick.size, 10);
                return "translate(" + e / g * h + "," + f / g * h + ")"
            }).on("end", function(c, d) {
                a.currentlyOpenSegment = b,
                a.isOpeningSegment = !1,
                d3.select(b).attr("class", a.cssPrefix + "expanded")
            }))
        },
        maybeCloseOpenSegment: function() {
            d3.selectAll("." + pie.cssPrefix + "expanded").size() > 0 && k.closeSegment(pie, d3.select("." + pie.cssPrefix + "expanded").node())
        },
        closeSegment: function(a, b) {
            d3.select(b).transition().duration(400).attr("transform", "translate(0,0)").on("end", function(c, d) {
                d3.select(b).attr("class", ""),
                a.currentlyOpenSegment = null
            })
        },
        getCentroid: function(a) {
            var b = a.getBBox();
            return {
                x: b.x + b.width / 2,
                y: b.y + b.height / 2
            }
        },
        getSegmentAngle: function(a, b, c, d) {
            var e, f = h({
                compounded: !0,
                midpoint: !1
            }, d), g = b[a].value;
            if (f.compounded) {
                e = 0;
                for (var i = 0; a >= i; i++)
                    e += b[i].value
            }
            "undefined" == typeof e && (e = g);
            var j = e / c * 360;
            if (f.midpoint) {
                var k = g / c * 360;
                j -= k / 2
            }
            return j
        }
    }
      , l = {
        offscreenCoord: -1e4,
        addTitle: function(a) {
            a.svg.selectAll("." + a.cssPrefix + "title").data([a.options.header.title]).enter().append("text").text(function(a) {
                return a.text
            }).attr("id", a.cssPrefix + "title").attr("class", a.cssPrefix + "title").attr("x", l.offscreenCoord).attr("y", l.offscreenCoord).attr("text-anchor", function() {
                var b;
                return b = "top-center" === a.options.header.location || "pie-center" === a.options.header.location ? "middle" : "left"
            }).attr("fill", function(a) {
                return a.color
            }).style("font-size", function(a) {
                return a.fontSize + "px"
            }).style("font-family", function(a) {
                return a.font
            })
        },
        positionTitle: function(a) {
            var b, c = a.textComponents, d = a.options.header.location, e = a.options.misc.canvasPadding, f = a.options.size.canvasWidth, g = a.options.header.titleSubtitlePadding;
            b = "top-left" === d ? e.left : (f - e.right) / 2 + e.left,
            b += a.options.misc.pieCenterOffset.x;
            var h = e.top + c.title.h;
            if ("pie-center" === d)
                if (h = a.pieCenter.y,
                c.subtitle.exists) {
                    var i = c.title.h + g + c.subtitle.h;
                    h = h - i / 2 + c.title.h
                } else
                    h += c.title.h / 4;
            a.svg.select("#" + a.cssPrefix + "title").attr("x", b).attr("y", h)
        },
        addSubtitle: function(a) {
            var b = a.options.header.location;
            a.svg.selectAll("." + a.cssPrefix + "subtitle").data([a.options.header.subtitle]).enter().append("text").text(function(a) {
                return a.text
            }).attr("x", l.offscreenCoord).attr("y", l.offscreenCoord).attr("id", a.cssPrefix + "subtitle").attr("class", a.cssPrefix + "subtitle").attr("text-anchor", function() {
                var a;
                return a = "top-center" === b || "pie-center" === b ? "middle" : "left"
            }).attr("fill", function(a) {
                return a.color
            }).style("font-size", function(a) {
                return a.fontSize + "px"
            }).style("font-family", function(a) {
                return a.font
            })
        },
        positionSubtitle: function(a) {
            var b, c = a.options.misc.canvasPadding, d = a.options.size.canvasWidth;
            b = "top-left" === a.options.header.location ? c.left : (d - c.right) / 2 + c.left,
            b += a.options.misc.pieCenterOffset.x;
            var e = l.getHeaderHeight(a);
            a.svg.select("#" + a.cssPrefix + "subtitle").attr("x", b).attr("y", e)
        },
        addFooter: function(a) {
            a.svg.selectAll("." + a.cssPrefix + "footer").data([a.options.footer]).enter().append("text").text(function(a) {
                return a.text
            }).attr("x", l.offscreenCoord).attr("y", l.offscreenCoord).attr("id", a.cssPrefix + "footer").attr("class", a.cssPrefix + "footer").attr("text-anchor", function() {
                var b = "left";
                return "bottom-center" === a.options.footer.location ? b = "middle" : "bottom-right" === a.options.footer.location && (b = "left"),
                b
            }).attr("fill", function(a) {
                return a.color
            }).style("font-size", function(a) {
                return a.fontSize + "px"
            }).style("font-family", function(a) {
                return a.font
            })
        },
        positionFooter: function(a) {
            var b, c = a.options.footer.location, d = a.textComponents.footer.w, e = a.options.size.canvasWidth, f = a.options.size.canvasHeight, g = a.options.misc.canvasPadding;
            b = "bottom-left" === c ? g.left : "bottom-right" === c ? e - d - g.right : e / 2,
            a.svg.select("#" + a.cssPrefix + "footer").attr("x", b).attr("y", f - g.bottom)
        },
        getHeaderHeight: function(a) {
            var b;
            if (a.textComponents.title.exists) {
                var c = a.textComponents.title.h + a.options.header.titleSubtitlePadding + a.textComponents.subtitle.h;
                b = "pie-center" === a.options.header.location ? a.pieCenter.y - c / 2 + c : c + a.options.misc.canvasPadding.top
            } else if ("pie-center" === a.options.header.location) {
                var d = a.options.misc.canvasPadding.bottom + a.textComponents.footer.h;
                b = (a.options.size.canvasHeight - d) / 2 + a.options.misc.canvasPadding.top + a.textComponents.subtitle.h / 2
            } else
                b = a.options.misc.canvasPadding.top + a.textComponents.subtitle.h;
            return b
        }
    }
      , m = {
        addTooltips: function(a) {
            var b = a.svg.insert("g").attr("class", a.cssPrefix + "tooltips");
            b.selectAll("." + a.cssPrefix + "tooltip").data(a.options.data.content).enter().append("g").attr("class", a.cssPrefix + "tooltip").attr("id", function(b, c) {
                return a.cssPrefix + "tooltip" + c
            }).style("opacity", 0).append("rect").attr("rx", a.options.tooltips.styles.borderRadius).attr("ry", a.options.tooltips.styles.borderRadius).attr("x", -a.options.tooltips.styles.padding).attr("opacity", a.options.tooltips.styles.backgroundOpacity).style("fill", a.options.tooltips.styles.backgroundColor),
            b.selectAll("." + a.cssPrefix + "tooltip").data(a.options.data.content).append("text").attr("fill", function(b) {
                return a.options.tooltips.styles.color
            }).style("font-size", function(b) {
                return a.options.tooltips.styles.fontSize
            }).style("font-family", function(b) {
                return a.options.tooltips.styles.font
            }).text(function(b, c) {
                var d = a.options.tooltips.string;
                return "caption" === a.options.tooltips.type && (d = b.caption),
                m.replacePlaceholders(a, d, c, {
                    label: b.label,
                    value: b.value,
                    percentage: b.percentage
                })
            }),
            b.selectAll("." + a.cssPrefix + "tooltip rect").attr("width", function(b, c) {
                var d = g.getDimensions(a.cssPrefix + "tooltip" + c);
                return d.w + 2 * a.options.tooltips.styles.padding
            }).attr("height", function(b, c) {
                var d = g.getDimensions(a.cssPrefix + "tooltip" + c);
                return d.h + 2 * a.options.tooltips.styles.padding
            }).attr("y", function(b, c) {
                var d = g.getDimensions(a.cssPrefix + "tooltip" + c);
                return -(d.h / 2) + 1
            })
        },
        showTooltip: function(a, b) {
            var c = a.options.tooltips.styles.fadeInSpeed;
            m.currentTooltip === b && (c = 1),
            m.currentTooltip = b,
            d3.select("#" + a.cssPrefix + "tooltip" + b).transition().duration(c).style("opacity", function() {
                return 1
            }),
            m.moveTooltip(a)
        },
        moveTooltip: function(a) {
            d3.selectAll("#" + a.cssPrefix + "tooltip" + m.currentTooltip).attr("transform", function(b) {
                var c = d3.mouse(this.parentNode)
                  , d = c[0] + a.options.tooltips.styles.padding + 2
                  , e = c[1] - 2 * a.options.tooltips.styles.padding - 2;
                return "translate(" + d + "," + e + ")"
            })
        },
        hideTooltip: function(a, b) {
            d3.select("#" + a.cssPrefix + "tooltip" + b).style("opacity", function() {
                return 0
            }),
            d3.select("#" + a.cssPrefix + "tooltip" + m.currentTooltip).attr("transform", function(b, c) {
                var d = a.options.size.canvasWidth + 1e3
                  , e = a.options.size.canvasHeight + 1e3;
                return "translate(" + d + "," + e + ")"
            })
        },
        replacePlaceholders: function(a, b, c, d) {
            g.isFunction(a.options.tooltips.placeholderParser) && a.options.tooltips.placeholderParser(c, d);
            var e = function() {
                return function(a) {
                    var b = arguments[1];
                    return d.hasOwnProperty(b) ? d[arguments[1]] : arguments[0]
                }
            };
            return b.replace(/\{(\w+)\}/g, e(d))
        }
    }
      , n = function(d, g) {
        if (this.element = d,
        "string" == typeof d) {
            var i = d.replace(/^#/, "");
            this.element = document.getElementById(i)
        }
        var j = {};
        h(!0, j, e, g),
        this.options = j,
        null !== this.options.misc.cssPrefix ? this.cssPrefix = this.options.misc.cssPrefix : (this.cssPrefix = "p" + c + "_",
        c++),
        f.initialCheck(this) && (d3.select(this.element).attr(a, b),
        o.call(this),
        p.call(this))
    };
    n.prototype.recreate = function() {
        f.initialCheck(this) && (o.call(this),
        p.call(this))
    }
    ,
    n.prototype.redraw = function() {
        this.element.innerHTML = "",
        p.call(this)
    }
    ,
    n.prototype.destroy = function() {
        this.element.innerHTML = "",
        d3.select(this.element).attr(a, null)
    }
    ,
    n.prototype.getOpenSegment = function() {
        var a = this.currentlyOpenSegment;
        if (null !== a && "undefined" != typeof a) {
            var b = parseInt(d3.select(a).attr("data-index"), 10);
            return {
                element: a,
                index: b,
                data: this.options.data.content[b]
            }
        }
        return null
    }
    ,
    n.prototype.openSegment = function(a) {
        a = parseInt(a, 10),
        0 > a || a > this.options.data.content.length - 1 || k.openSegment(this, d3.select("#" + this.cssPrefix + "segment" + a).node())
    }
    ,
    n.prototype.closeSegment = function() {
        k.maybeCloseOpenSegment()
    }
    ,
    n.prototype.updateProp = function(a, b) {
        switch (a) {
        case "header.title.text":
            var c = g.processObj(this.options, a);
            g.processObj(this.options, a, b),
            d3.select("#" + this.cssPrefix + "title").html(b),
            ("" === c && "" !== b || "" !== c && "" === b) && this.redraw();
            break;
        case "header.subtitle.text":
            var d = g.processObj(this.options, a);
            g.processObj(this.options, a, b),
            d3.select("#" + this.cssPrefix + "subtitle").html(b),
            ("" === d && "" !== b || "" !== d && "" === b) && this.redraw();
            break;
        case "callbacks.onload":
        case "callbacks.onMouseoverSegment":
        case "callbacks.onMouseoutSegment":
        case "callbacks.onClickSegment":
        case "effects.pullOutSegmentOnClick.effect":
        case "effects.pullOutSegmentOnClick.speed":
        case "effects.pullOutSegmentOnClick.size":
        case "effects.highlightSegmentOnMouseover":
        case "effects.highlightLuminosity":
            g.processObj(this.options, a, b);
            break;
        default:
            g.processObj(this.options, a, b),
            this.destroy(),
            this.recreate()
        }
    }
    ;
    var o = function() {
        this.options.data.content = i.sortPieData(this),
        this.options.data.smallSegmentGrouping.enabled && (this.options.data.content = g.applySmallSegmentGrouping(this.options.data.content, this.options.data.smallSegmentGrouping)),
        this.options.colors = g.initSegmentColors(this),
        this.totalSize = i.getTotalPieSize(this.options.data.content);
        for (var a = this.options.labels.percentage.decimalPlaces, b = 0; b < this.options.data.content.length; b++)
            this.options.data.content[b].percentage = q(this.options.data.content[b].value, this.totalSize, a);
        for (var c = 0, d = 0; d < this.options.data.content.length; d++)
            d === this.options.data.content.length - 1 && (this.options.data.content[d].percentage = (100 - c).toFixed(a)),
            c += parseFloat(this.options.data.content[d].percentage)
    }
      , p = function() {
        this.svg = g.addSVGSpace(this),
        this.textComponents = {
            headerHeight: 0,
            title: {
                exists: "" !== this.options.header.title.text,
                h: 0,
                w: 0
            },
            subtitle: {
                exists: "" !== this.options.header.subtitle.text,
                h: 0,
                w: 0
            },
            footer: {
                exists: "" !== this.options.footer.text,
                h: 0,
                w: 0
            }
        },
        this.outerLabelGroupData = [],
        this.textComponents.title.exists && l.addTitle(this),
        this.textComponents.subtitle.exists && l.addSubtitle(this),
        l.addFooter(this);
        var a = this;
        g.whenIdExists(this.cssPrefix + "footer", function() {
            l.positionFooter(a);
            var b = g.getDimensions(a.cssPrefix + "footer");
            a.textComponents.footer.h = b.h,
            a.textComponents.footer.w = b.w
        });
        var b = [];
        this.textComponents.title.exists && b.push(this.cssPrefix + "title"),
        this.textComponents.subtitle.exists && b.push(this.cssPrefix + "subtitle"),
        this.textComponents.footer.exists && b.push(this.cssPrefix + "footer"),
        g.whenElementsExist(b, function() {
            if (a.textComponents.title.exists) {
                var b = g.getDimensions(a.cssPrefix + "title");
                a.textComponents.title.h = b.h,
                a.textComponents.title.w = b.w
            }
            if (a.textComponents.subtitle.exists) {
                var c = g.getDimensions(a.cssPrefix + "subtitle");
                a.textComponents.subtitle.h = c.h,
                a.textComponents.subtitle.w = c.w
            }
            if (a.textComponents.title.exists || a.textComponents.subtitle.exists) {
                var d = 0;
                a.textComponents.title.exists && (d += a.textComponents.title.h,
                a.textComponents.subtitle.exists && (d += a.options.header.titleSubtitlePadding)),
                a.textComponents.subtitle.exists && (d += a.textComponents.subtitle.h),
                a.textComponents.headerHeight = d
            }
            i.computePieRadius(a),
            i.calculatePieCenter(a),
            l.positionTitle(a),
            l.positionSubtitle(a),
            a.options.misc.gradient.enabled && k.addGradients(a),
            k.create(a),
            j.add(a, "inner", a.options.labels.inner.format),
            j.add(a, "outer", a.options.labels.outer.format),
            j.positionLabelElements(a, "inner", a.options.labels.inner.format),
            j.positionLabelElements(a, "outer", a.options.labels.outer.format),
            j.computeOuterLabelCoords(a),
            j.positionLabelGroups(a, "outer"),
            j.computeLabelLinePositions(a),
            a.options.labels.lines.enabled && "none" !== a.options.labels.outer.format && j.addLabelLines(a),
            j.positionLabelGroups(a, "inner"),
            j.fadeInLabelsAndLines(a),
            a.options.tooltips.enabled && m.addTooltips(a),
            k.addSegmentEventHandlers(a)
        })
    }
      , q = function(a, b, c) {
        var d = a / b;
        return 0 >= c ? Math.round(100 * d) : (100 * d).toFixed(c)
    };
    return n
});
