webpackJsonp([1], {
    0: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }
        var r = n(24),
            a = i(r),
            o = n(88),
            s = i(o);
        a["default"].render(a["default"].createElement(s["default"], null), document.getElementById("root"))
    },
    88: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function(e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(),
            s = function(t, e, n) {
                for (var i = !0; i;) {
                    var r = t,
                        a = e,
                        o = n;
                    i = !1, null === r && (r = Function.prototype);
                    var s = Object.getOwnPropertyDescriptor(r, a);
                    if (void 0 !== s) {
                        if ("value" in s) return s.value;
                        var l = s.get;
                        if (void 0 === l) return;
                        return l.call(o)
                    }
                    var u = Object.getPrototypeOf(r);
                    if (null === u) return;
                    t = u, e = a, n = o, i = !0, s = u = void 0
                }
            },
            l = n(24),
            u = i(l),
            c = n(90),
            h = i(c),
            d = n(89),
            p = i(d),
            f = n(87),
            m = i(f),
            v = n(53),
            g = i(v),
            y = n(92),
            b = i(y),
            E = n(93),
            w = {
                text: {
                    fontFamily: "europa",
                    fontSize: "6vmin",
                    fontWeight: "bold",
                    color: "white"
                },
                textSmall: {
                    fontFamily: "europa",
                    fontSize: "4vmin",
                    fontWeight: "bold",
                    color: "white"
                },
                textBad: {
                    color: "Red",
                    fontSize: "4vmin",
                    textDecoration: "underline"
                },
                textGood: {
                    color: "LimeGreen"
                },
                textNoData: {
                    color: "#5B6B9D",
                    textDecoration: "line-through"
                }
            },
            T = function(t) {
                function e() {
                    r(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).call(this), this.getTextWidth = function(t) {
                        if (!t) return 1e3;
                        var e = "europa",
                            n = "8vmin",
                            i = document.createElement("canvas").getContext("2d");
                        return i.font = n + " " + e, i.measureText(t).width + 90
                    }, this.handleSelectChange = this.handleSelectChange.bind(this), this.moveSelect = this.moveSelect.bind(this), this.selectPrev = this.selectPrev.bind(this), this.selectNext = this.selectNext.bind(this), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleResize = this.handleResize.bind(this), this.toggleAbout = this.toggleAbout.bind(this), this.getTextWidth = this.getTextWidth.bind(this), this._debug = !1, this._data = m["default"].parse(E.replace(/\./g, "").replace(/,/g, ".")).reduce(function(t, e) {
                        return t[e.countryName] = e, t
                    }, {}), this._selectOptions = Object.keys(this._data).sort(function(t, e) {
                        return t.localeCompare(e)
                    }), this.state = {
                        currentCountry: this._data[this._selectOptions[0]],
                        selectedValue: this._selectOptions[0],
                        selectedIndex: 0,
                        about: !1,
                        windowWidth: window.innerWidth
                    }
                }
                return a(e, t), o(e, [{
                    key: "handleSelectChange",
                    value: function(t) {
                        this.setState({
                            currentCountry: this._data[t.target.value],
                            selectedValue: t.target.value,
                            selectedIndex: this._selectOptions.indexOf(t.target.value),
                            selectWidth: this.getTextWidth(t.target.value)
                        })
                    }
                }, {
                    key: "handleResize",
                    value: function(t) {
                        this.setState({
                            windowWidth: window.innerWidth
                        })
                    }
                }, {
                    key: "componentDidMount",
                    value: function() {
                        var t = this;
                        window.addEventListener("resize", this.handleResize), "addEventListener" in document && (window.document.body.addEventListener("keydown", this.handleKeyDown, !1), document.addEventListener("DOMContentLoaded", function() {
                            g["default"].attach(document.body)
                        }, !1));
                        var e = new b["default"](document.getElementById("container"));
                        e.get("swipe").set({
                            velocity: .1
                        }), e.on("swipeleft", function() {
                            t.selectNext()
                        }), e.on("swiperight", function() {
                            t.selectPrev()
                        })
                    }
                }, {
                    key: "selectPrev",
                    value: function() {
                        this.moveSelect(-1)
                    }
                }, {
                    key: "selectNext",
                    value: function() {
                        this.moveSelect(1)
                    }
                }, {
                    key: "moveSelect",
                    value: function(t) {
                        this.state.selectedIndex + t >= 0 && this.state.selectedIndex + t < this._selectOptions.length && this.setState({
                            currentCountry: this._data[this._selectOptions[this.state.selectedIndex + t]],
                            selectedValue: this._selectOptions[this.state.selectedIndex + t],
                            selectedIndex: this.state.selectedIndex + t,
                            selectWidth: this.getTextWidth(this._selectOptions[this.state.selectedIndex + t])
                        })
                    }
                }, {
                    key: "toggleAbout",
                    value: function() {
                        this.setState({
                            about: this.state.about ? !1 : !0
                        })
                    }
                }, {
                    key: "handleKeyDown",
                    value: function(t) {
                        39 === t.keyCode && this.state.selectedIndex < this._selectOptions.length && this.moveSelect(1), 37 === t.keyCode && this.state.selectedIndex > 0 && this.moveSelect(-1), 73 === t.keyCode && this.setState({
                            about: this.state.about ? !1 : !0
                        })
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.state.currentCountry,
                            n = e.expectedSchoolingMale - e.expectedSchoolingFemale;
                        if (n = n % 1 === 0 ? parseInt(n, 10) : n.toFixed(1), "" !== e.earnedIncomeRatio) var i = parseInt(100 * (1 - parseFloat(e.earnedIncomeRatio)));
                        var r = parseInt(e.percentageWomenInParliament || 0);
                        return u["default"].createElement("div", null, u["default"].createElement("div", {
                            id: "container"
                        }, u["default"].createElement("div", {
                            id: "container1",
                            style: {
                                width: "100%",
                                background: "MidnightBlue",
                                height: "100%",
                                overflow: "scroll",
                                WebkitOverflowScrolling: "touch"
                            },
                            className: this.state.about ? "container1pushdown" : ""
                        }, u["default"].createElement("div", {
                            style: {
                                padding: "2vmin 6vmin 0 6vmin"
                            }
                        }, u["default"].createElement("span", null, u["default"].createElement("h1", {
                            style: {
                                fontSize: "6vmin",
                                lineHeight: "10vmin",
                                marginBottom: "100px"
                            }
                        }, u["default"].createElement("span", null, "As a woman in "), u["default"].createElement("label", null, u["default"].createElement("select", {
                            id: "countryselect",
                            value: this.state.selectedValue,
                            defaultValue: "Angola",
                            ref: "countrySelect",
                            style: {
                                lineHeight: "10vmin",
                                display: "inline",
                                display: "inline",
                                borderRight: "0",
                                fontSize: "8vmin",
                                fontWeight: "bold",
                                padding: "5px 0px 5px 0px",
                                margin: "0 0 0 0px",
                                borderLeft: "0",
                                borderTop: "0",
                                borderRadius: "0",
                                borderBottom: "1px solid white",
                                transition: "all 0.1s ease",
                                verticalAlign: "middle",
                                width: this.state.selectWidth || this.getTextWidth("Algeria")
                            },
                            onChange: this.handleSelectChange
                        }, this._selectOptions.reduce(function(t, e, n) {
                            return t.push(u["default"].createElement("option", {
                                key: n,
                                value: e,
                                style: {
                                    lineHeight: "10vmin"
                                }
                            }, e)), t
                        }, []))), u["default"].createElement("span", null, ", "), u["default"].createElement("div", null, u["default"].createElement(p["default"], null, u["default"].createElement("span", null, "you will live an average "), u["default"].createElement(h["default"], {
                            value: this.state.currentCountry.lifeExpectancyFemale,
                            threshold: 60,
                            whatIsBetter: "higher"
                        }), u["default"].createElement("span", null, " years, during which you will ")), u["default"].createElement(p["default"], null, u["default"].createElement("span", null, " go to school for "), u["default"].createElement(h["default"], {
                            value: n,
                            threshold: 1,
                            whatIsBetter: "lower",
                            addlText: " year" + (1 !== n ? "s" : "")
                        }), u["default"].createElement("span", null, " less than men,")), u["default"].createElement(p["default"], null, u["default"].createElement("span", null, " have a "), u["default"].createElement(h["default"], {
                            value: e.marriedBy18,
                            threshold: 5,
                            whatIsBetter: "lower",
                            addlText: "%"
                        }), u["default"].createElement("span", null, " chance of being married before you turn 18,")), u["default"].createElement(p["default"], null, u["default"].createElement("span", null, " earn "), u["default"].createElement(h["default"], {
                            value: i ? i : 0,
                            threshold: 10,
                            whatIsBetter: "lower",
                            addlText: "%"
                        }), u["default"].createElement("span", null, " less than men")), u["default"].createElement(p["default"], null, u["default"].createElement("span", null, ", governed by a parliament where women hold "), u["default"].createElement(h["default"], {
                            value: r,
                            threshold: 40,
                            whatIsBetter: "higher",
                            addlText: "%"
                        }), u["default"].createElement("span", null, " of all seats."))))))), u["default"].createElement("div", {
                            id: "container2",
                            className: this.state.about ? "bgAbout" : "bgNormal",
                            style: {
                                backgroundColor: "MidnightBlue",
                                formerBG: "rgba(0,14,80,1)"
                            }
                        }, u["default"].createElement("div", {
                            style: {
                                padding: "2em 2em 0em 2em"
                            }
                        }, u["default"].createElement("h1", {
                            style: w.text
                        }, " The Story Behind the Data..."), u["default"].createElement("span", {
                            style: w.textSmall
                        }, "...is a human perspective on the data that goes into the United Nations' ", u["default"].createElement("a", {
                            href: "http://hdr.undp.org/en/content/gender-development-index-gdi",
                            target: "_blank",
                            style: {
                                color: "white",
                                textDecoration: "none",
                                borderBottom: "1px dashed white"
                            }
                        }, "Gender Development Index"), ".  It tells the story of an average woman's life in the country you choose."), " ", u["default"].createElement("br", null), u["default"].createElement("br", null), u["default"].createElement("span", {
                            style: w.textSmall
                        }, "A ", u["default"].createElement("span", {
                            style: w.textGood
                        }, "green number "), "is on the better end of the spectrum, a ", u["default"].createElement("span", {
                            style: w.textBad
                        }, "red number"), " on the worse, and ", u["default"].createElement("span", {
                            style: w.textNoData
                        }, "deleted text"), " means this data is not available."), u["default"].createElement("p", null, "2015 - Jacob Romer"))), u["default"].createElement("div", {
                            id: "buttons",
                            style: {
                                position: "fixed",
                                border: "none",
                                fontFamily: "europa",
                                opacity: "0.9",
                                borderTop: "1px solid white",
                                background: "MidnightBlue"
                            }
                        }, u["default"].createElement("a", {
                            href: "#",
                            onClick: this.selectPrev,
                            style: {
                                fontSize: "7vmin"
                            }
                        }, u["default"].createElement("i", {
                            className: "fa fa-arrow-circle-o-left",
                            style: {
                                transition: "all 0.2s ease-in-out",
                                opacity: this.state.about ? "0" : "1"
                            }
                        })), u["default"].createElement("a", {
                            href: "#",
                            onClick: this.toggleAbout,
                            style: {
                                fontSize: "7vmin"
                            }
                        }, u["default"].createElement("i", {
                            className: function() {
                                return "fa " + (t.state.about ? "fa-times-circle" : "fa-info-circle")
                            }()
                        })), u["default"].createElement("a", {
                            href: "#",
                            onClick: this.selectNext,
                            style: {
                                fontSize: "7vmin"
                            }
                        }, u["default"].createElement("i", {
                            className: "fa fa-arrow-circle-o-right",
                            style: {
                                transition: "all 0.2s ease-in-out",
                                opacity: this.state.about ? "0" : "1"
                            }
                        })))))
                    }
                }]), e
            }(l.Component);
        e["default"] = T, t.exports = e["default"]
    },
    89: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function(e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(),
            s = function(t, e, n) {
                for (var i = !0; i;) {
                    var r = t,
                        a = e,
                        o = n;
                    i = !1, null === r && (r = Function.prototype);
                    var s = Object.getOwnPropertyDescriptor(r, a);
                    if (void 0 !== s) {
                        if ("value" in s) return s.value;
                        var l = s.get;
                        if (void 0 === l) return;
                        return l.call(o)
                    }
                    var u = Object.getPrototypeOf(r);
                    if (null === u) return;
                    t = u, e = a, n = o, i = !0, s = u = void 0
                }
            },
            l = n(24),
            u = i(l),
            c = function(t) {
                function e() {
                    r(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).call(this)
                }
                return a(e, t), o(e, [{
                    key: "isValid",
                    value: function() {
                        return 1 == this.props.children[1].props.value || this.props.children[1].props.value > 0
                    }
                }, {
                    key: "render",
                    value: function() {
                        return u["default"].createElement("span", {
                            className: this.isValid() ? "" : "strike"
                        }, this.props.children)
                    }
                }]), e
            }(l.Component);
        e["default"] = c, t.exports = e["default"]
    },
    90: function(t, e, n) {
        "use strict";

        function i(t) {
            return t && t.__esModule ? t : {
                "default": t
            }
        }

        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }

        function a(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var o = function() {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }
                return function(e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(),
            s = function(t, e, n) {
                for (var i = !0; i;) {
                    var r = t,
                        a = e,
                        o = n;
                    i = !1, null === r && (r = Function.prototype);
                    var s = Object.getOwnPropertyDescriptor(r, a);
                    if (void 0 !== s) {
                        if ("value" in s) return s.value;
                        var l = s.get;
                        if (void 0 === l) return;
                        return l.call(o)
                    }
                    var u = Object.getPrototypeOf(r);
                    if (null === u) return;
                    t = u, e = a, n = o, i = !0, s = u = void 0
                }
            },
            l = n(24),
            u = i(l),
            c = n(91),
            h = i(c),
            d = function(t) {
                function e(t) {
                    r(this, e), s(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), this._prevValue = 0, this.state = {
                        currentValue: 0,
                        prevValue: 0
                    }, this.isGood = this.isGood.bind(this)
                }
                return a(e, t), o(e, [{
                    key: "componentWillMount",
                    value: function() {
                        this.setState({
                            currentValue: this.props.value
                        })
                    }
                }, {
                    key: "componentWillReceiveProps",
                    value: function(t) {
                        this._currentValue = t.value, this._prevValue = this.state.currentValue, this.setState({
                            currentValue: t.value,
                            prevValue: this.state.currentValue
                        })
                    }
                }, {
                    key: "componentWillUpdate",
                    value: function() {
                        this.count(this._prevValue, this._currentValue)
                    }
                }, {
                    key: "count",
                    value: function(t, e) {
                        t !== e && new h["default"](this._el, t, e, e % 1 === 0 ? 0 : 1, .8, {
                            useEasing: !0
                        }).start()
                    }
                }, {
                    key: "isGood",
                    value: function() {
                        return this.state.currentValue <= 0 ? "strike" : "lower" === this.props.whatIsBetter ? this._currentValue < this.props.threshold ? "good" : "bad" : "higher" === this.props.whatIsBetter ? this._currentValue > this.props.threshold ? "good" : "bad" : void 0
                    }
                }, {
                    key: "render",
                    value: function() {
                        var t = this,
                            e = this.isGood();
                        return u["default"].createElement("div", {
                            className: "counterDiv"
                        }, u["default"].createElement("span", {
                            ref: function(e) {
                                return t._el = u["default"].findDOMNode(e)
                            },
                            className: e + " counter"
                        }, this.state.currentValue), this.props.addlText ? u["default"].createElement("span", {
                            className: e + " counter"
                        }, this.props.addlText) : u["default"].createElement("span", null))
                    }
                }]), e
            }(l.Component);
        e["default"] = d, t.exports = e["default"]
    },
    91: function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var n = function(t, e, n, i, r, a) {
            for (var o = 0, s = ["webkit", "moz", "ms", "o"], l = 0; l < s.length && !window.requestAnimationFrame; ++l) window.requestAnimationFrame = window[s[l] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[s[l] + "CancelAnimationFrame"] || window[s[l] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(t, e) {
                var n = (new Date).getTime(),
                    i = Math.max(0, 16 - (n - o)),
                    r = window.setTimeout(function() {
                        t(n + i)
                    }, i);
                return o = n + i, r
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(t) {
                clearTimeout(t)
            }), this.options = {
                useEasing: !0,
                useGrouping: !0,
                separator: ",",
                decimal: "."
            };
            for (var u in a) a.hasOwnProperty(u) && (this.options[u] = a[u]);
            "" === this.options.separator && (this.options.useGrouping = !1), this.options.prefix || (this.options.prefix = ""), this.options.suffix || (this.options.suffix = ""), this.d = "string" == typeof t ? document.getElementById(t) : t, this.startVal = Number(e), isNaN(e) && (this.startVal = Number(e.match(/[\d]+/g).join(""))), this.endVal = Number(n), isNaN(n) && (this.endVal = Number(n.match(/[\d]+/g).join(""))), this.countDown = this.startVal > this.endVal, this.frameVal = this.startVal, this.decimals = Math.max(0, i || 0), this.dec = Math.pow(10, this.decimals), this.duration = 1e3 * Number(r) || 2e3;
            var c = this;
            this.version = function() {
                return "1.5.3"
            }, this.printValue = function(t) {
                var e = isNaN(t) ? "--" : c.formatNumber(t);
                "INPUT" == c.d.tagName ? this.d.value = e : "text" == c.d.tagName ? this.d.textContent = e : this.d.innerHTML = e
            }, this.easeOutExpo = function(t, e, n, i) {
                return n * (-Math.pow(2, -10 * t / i) + 1) * 1024 / 1023 + e
            }, this.count = function(t) {
                c.startTime || (c.startTime = t), c.timestamp = t;
                var e = t - c.startTime;
                c.remaining = c.duration - e, c.options.useEasing ? c.countDown ? c.frameVal = c.startVal - c.easeOutExpo(e, 0, c.startVal - c.endVal, c.duration) : c.frameVal = c.easeOutExpo(e, c.startVal, c.endVal - c.startVal, c.duration) : c.countDown ? c.frameVal = c.startVal - (c.startVal - c.endVal) * (e / c.duration) : c.frameVal = c.startVal + (c.endVal - c.startVal) * (e / c.duration), c.countDown ? c.frameVal = c.frameVal < c.endVal ? c.endVal : c.frameVal : c.frameVal = c.frameVal > c.endVal ? c.endVal : c.frameVal, c.frameVal = Math.round(c.frameVal * c.dec) / c.dec, c.printValue(c.frameVal), e < c.duration ? c.rAF = requestAnimationFrame(c.count) : c.callback && c.callback()
            }, this.start = function(t) {
                return c.callback = t, isNaN(c.endVal) || isNaN(c.startVal) || c.startVal === c.endVal ? (console.log("countUp error: startVal or endVal is not a number"), c.printValue(n)) : c.rAF = requestAnimationFrame(c.count), !1
            }, this.pauseResume = function() {
                c.paused ? (c.paused = !1, delete c.startTime, c.duration = c.remaining, c.startVal = c.frameVal, requestAnimationFrame(c.count)) : (c.paused = !0, cancelAnimationFrame(c.rAF))
            }, this.reset = function() {
                c.paused = !1, delete c.startTime, c.startVal = e, cancelAnimationFrame(c.rAF), c.printValue(c.startVal)
            }, this.update = function(t) {
                cancelAnimationFrame(c.rAF), c.paused = !1, delete c.startTime, c.startVal = c.frameVal, c.endVal = Number(t), c.countDown = c.startVal > c.endVal, c.rAF = requestAnimationFrame(c.count)
            }, this.formatNumber = function(t) {
                t = t.toFixed(c.decimals), t += "";
                var e, n, i, r;
                if (e = t.split("."), n = e[0], i = e.length > 1 ? c.options.decimal + e[1] : "", r = /(\d+)(\d{3})/, c.options.useGrouping)
                    for (; r.test(n);) n = n.replace(r, "$1" + c.options.separator + "$2");
                return c.options.prefix + n + i + c.options.suffix
            }, c.printValue(c.startVal)
        };
        e["default"] = n, t.exports = e["default"]
    },
    92: function(t, e, n) {
        var i;
        /*! Hammer.JS - v2.0.4 - 2014-09-28
         * http://hammerjs.github.io/
         *
         * Copyright (c) 2014 Jorik Tangelder;
         * Licensed under the MIT license */
        ! function(r, a, o, s) {
            "use strict";

            function l(t, e, n) {
                return setTimeout(f(t, n), e)
            }

            function u(t, e, n) {
                return Array.isArray(t) ? (c(t, n[e], n), !0) : !1
            }

            function c(t, e, n) {
                var i;
                if (t)
                    if (t.forEach) t.forEach(e, n);
                    else if (t.length !== s)
                    for (i = 0; i < t.length;) e.call(n, t[i], i, t), i++;
                else
                    for (i in t) t.hasOwnProperty(i) && e.call(n, t[i], i, t)
            }

            function h(t, e, n) {
                for (var i = Object.keys(e), r = 0; r < i.length;)(!n || n && t[i[r]] === s) && (t[i[r]] = e[i[r]]), r++;
                return t
            }

            function d(t, e) {
                return h(t, e, !0)
            }

            function p(t, e, n) {
                var i, r = e.prototype;
                i = t.prototype = Object.create(r), i.constructor = t, i._super = r, n && h(i, n)
            }

            function f(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }

            function m(t, e) {
                return typeof t == ft ? t.apply(e ? e[0] || s : s, e) : t
            }

            function v(t, e) {
                return t === s ? e : t
            }

            function g(t, e, n) {
                c(w(e), function(e) {
                    t.addEventListener(e, n, !1)
                })
            }

            function y(t, e, n) {
                c(w(e), function(e) {
                    t.removeEventListener(e, n, !1)
                })
            }

            function b(t, e) {
                for (; t;) {
                    if (t == e) return !0;
                    t = t.parentNode
                }
                return !1
            }

            function E(t, e) {
                return t.indexOf(e) > -1
            }

            function w(t) {
                return t.trim().split(/\s+/g)
            }

            function T(t, e, n) {
                if (t.indexOf && !n) return t.indexOf(e);
                for (var i = 0; i < t.length;) {
                    if (n && t[i][n] == e || !n && t[i] === e) return i;
                    i++
                }
                return -1
            }

            function x(t) {
                return Array.prototype.slice.call(t, 0)
            }

            function _(t, e, n) {
                for (var i = [], r = [], a = 0; a < t.length;) {
                    var o = e ? t[a][e] : t[a];
                    T(r, o) < 0 && i.push(t[a]), r[a] = o, a++
                }
                return n && (i = e ? i.sort(function(t, n) {
                    return t[e] > n[e]
                }) : i.sort()), i
            }

            function V(t, e) {
                for (var n, i, r = e[0].toUpperCase() + e.slice(1), a = 0; a < dt.length;) {
                    if (n = dt[a], i = n ? n + r : e, i in t) return i;
                    a++
                }
                return s
            }

            function S() {
                return yt++
            }

            function I(t) {
                var e = t.ownerDocument;
                return e.defaultView || e.parentWindow
            }

            function O(t, e) {
                var n = this;
                this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function(e) {
                    m(t.options.enable, [t]) && n.handler(e)
                }, this.init()
            }

            function A(t) {
                var e, n = t.options.inputClass;
                return new(e = n ? n : wt ? L : Tt ? Y : Et ? U : q)(t, N)
            }

            function N(t, e, n) {
                var i = n.pointers.length,
                    r = n.changedPointers.length,
                    a = e & Ot && i - r === 0,
                    o = e & (Nt | Ct) && i - r === 0;
                n.isFirst = !!a, n.isFinal = !!o, a && (t.session = {}), n.eventType = e, C(t, n), t.emit("hammer.input", n), t.recognize(n), t.session.prevInput = n
            }

            function C(t, e) {
                var n = t.session,
                    i = e.pointers,
                    r = i.length;
                n.firstInput || (n.firstInput = D(e)), r > 1 && !n.firstMultiple ? n.firstMultiple = D(e) : 1 === r && (n.firstMultiple = !1);
                var a = n.firstInput,
                    o = n.firstMultiple,
                    s = o ? o.center : a.center,
                    l = e.center = M(i);
                e.timeStamp = gt(), e.deltaTime = e.timeStamp - a.timeStamp, e.angle = W(s, l), e.distance = z(s, l), F(n, e), e.offsetDirection = R(e.deltaX, e.deltaY), e.scale = o ? B(o.pointers, i) : 1, e.rotation = o ? j(o.pointers, i) : 0, P(n, e);
                var u = t.element;
                b(e.srcEvent.target, u) && (u = e.srcEvent.target), e.target = u
            }

            function F(t, e) {
                var n = e.center,
                    i = t.offsetDelta || {},
                    r = t.prevDelta || {},
                    a = t.prevInput || {};
                (e.eventType === Ot || a.eventType === Nt) && (r = t.prevDelta = {
                    x: a.deltaX || 0,
                    y: a.deltaY || 0
                }, i = t.offsetDelta = {
                    x: n.x,
                    y: n.y
                }), e.deltaX = r.x + (n.x - i.x), e.deltaY = r.y + (n.y - i.y)
            }

            function P(t, e) {
                var n, i, r, a, o = t.lastInterval || e,
                    l = e.timeStamp - o.timeStamp;
                if (e.eventType != Ct && (l > It || o.velocity === s)) {
                    var u = o.deltaX - e.deltaX,
                        c = o.deltaY - e.deltaY,
                        h = k(l, u, c);
                    i = h.x, r = h.y, n = vt(h.x) > vt(h.y) ? h.x : h.y, a = R(u, c), t.lastInterval = e
                }
                else n = o.velocity, i = o.velocityX, r = o.velocityY, a = o.direction;
                e.velocity = n, e.velocityX = i, e.velocityY = r, e.direction = a
            }

            function D(t) {
                for (var e = [], n = 0; n < t.pointers.length;) e[n] = {
                    clientX: mt(t.pointers[n].clientX),
                    clientY: mt(t.pointers[n].clientY)
                }, n++;
                return {
                    timeStamp: gt(),
                    pointers: e,
                    center: M(e),
                    deltaX: t.deltaX,
                    deltaY: t.deltaY
                }
            }

            function M(t) {
                var e = t.length;
                if (1 === e) return {
                    x: mt(t[0].clientX),
                    y: mt(t[0].clientY)
                };
                for (var n = 0, i = 0, r = 0; e > r;) n += t[r].clientX, i += t[r].clientY, r++;
                return {
                    x: mt(n / e),
                    y: mt(i / e)
                }
            }

            function k(t, e, n) {
                return {
                    x: e / t || 0,
                    y: n / t || 0
                }
            }

            function R(t, e) {
                return t === e ? Ft : vt(t) >= vt(e) ? t > 0 ? Pt : Dt : e > 0 ? Mt : kt
            }

            function z(t, e, n) {
                n || (n = jt);
                var i = e[n[0]] - t[n[0]],
                    r = e[n[1]] - t[n[1]];
                return Math.sqrt(i * i + r * r)
            }

            function W(t, e, n) {
                n || (n = jt);
                var i = e[n[0]] - t[n[0]],
                    r = e[n[1]] - t[n[1]];
                return 180 * Math.atan2(r, i) / Math.PI
            }

            function j(t, e) {
                return W(e[1], e[0], Bt) - W(t[1], t[0], Bt)
            }

            function B(t, e) {
                return z(e[0], e[1], Bt) / z(t[0], t[1], Bt)
            }

            function q() {
                this.evEl = Lt, this.evWin = Gt, this.allow = !0, this.pressed = !1, O.apply(this, arguments)
            }

            function L() {
                this.evEl = Ht, this.evWin = Ut, O.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
            }

            function G() {
                this.evTarget = Zt, this.evWin = Jt, this.started = !1, O.apply(this, arguments)
            }

            function X(t, e) {
                var n = x(t.touches),
                    i = x(t.changedTouches);
                return e & (Nt | Ct) && (n = _(n.concat(i), "identifier", !0)), [n, i]
            }

            function Y() {
                this.evTarget = Qt, this.targetIds = {}, O.apply(this, arguments)
            }

            function H(t, e) {
                var n = x(t.touches),
                    i = this.targetIds;
                if (e & (Ot | At) && 1 === n.length) return i[n[0].identifier] = !0, [n, n];
                var r, a, o = x(t.changedTouches),
                    s = [],
                    l = this.target;
                if (a = n.filter(function(t) {
                        return b(t.target, l)
                    }), e === Ot)
                    for (r = 0; r < a.length;) i[a[r].identifier] = !0, r++;
                for (r = 0; r < o.length;) i[o[r].identifier] && s.push(o[r]), e & (Nt | Ct) && delete i[o[r].identifier], r++;
                return s.length ? [_(a.concat(s), "identifier", !0), s] : void 0
            }

            function U() {
                O.apply(this, arguments);
                var t = f(this.handler, this);
                this.touch = new Y(this.manager, t), this.mouse = new q(this.manager, t)
            }

            function K(t, e) {
                this.manager = t, this.set(e)
            }

            function Z(t) {
                if (E(t, ae)) return ae;
                var e = E(t, oe),
                    n = E(t, se);
                return e && n ? oe + " " + se : e || n ? e ? oe : se : E(t, re) ? re : ie
            }

            function J(t) {
                this.id = S(), this.manager = null, this.options = d(t || {}, this.defaults), this.options.enable = v(this.options.enable, !0), this.state = le, this.simultaneous = {}, this.requireFail = []
            }

            function $(t) {
                return t & pe ? "cancel" : t & he ? "end" : t & ce ? "move" : t & ue ? "start" : ""
            }

            function Q(t) {
                return t == kt ? "down" : t == Mt ? "up" : t == Pt ? "left" : t == Dt ? "right" : ""
            }

            function tt(t, e) {
                var n = e.manager;
                return n ? n.get(t) : t
            }

            function et() {
                J.apply(this, arguments)
            }

            function nt() {
                et.apply(this, arguments), this.pX = null, this.pY = null
            }

            function it() {
                et.apply(this, arguments)
            }

            function rt() {
                J.apply(this, arguments), this._timer = null, this._input = null
            }

            function at() {
                et.apply(this, arguments)
            }

            function ot() {
                et.apply(this, arguments)
            }

            function st() {
                J.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
            }

            function lt(t, e) {
                return e = e || {}, e.recognizers = v(e.recognizers, lt.defaults.preset), new ut(t, e)
            }

            function ut(t, e) {
                e = e || {}, this.options = d(e, lt.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = A(this), this.touchAction = new K(this, this.options.touchAction), ct(this, !0), c(e.recognizers, function(t) {
                    var e = this.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
                }, this)
            }

            function ct(t, e) {
                var n = t.element;
                c(t.options.cssProps, function(t, i) {
                    n.style[V(n.style, i)] = e ? t : ""
                })
            }

            function ht(t, e) {
                var n = a.createEvent("Event");
                n.initEvent(t, !0, !0), n.gesture = e, e.target.dispatchEvent(n)
            }
            var dt = ["", "webkit", "moz", "MS", "ms", "o"],
                pt = a.createElement("div"),
                ft = "function",
                mt = Math.round,
                vt = Math.abs,
                gt = Date.now,
                yt = 1,
                bt = /mobile|tablet|ip(ad|hone|od)|android/i,
                Et = "ontouchstart" in r,
                wt = V(r, "PointerEvent") !== s,
                Tt = Et && bt.test(navigator.userAgent),
                xt = "touch",
                _t = "pen",
                Vt = "mouse",
                St = "kinect",
                It = 25,
                Ot = 1,
                At = 2,
                Nt = 4,
                Ct = 8,
                Ft = 1,
                Pt = 2,
                Dt = 4,
                Mt = 8,
                kt = 16,
                Rt = Pt | Dt,
                zt = Mt | kt,
                Wt = Rt | zt,
                jt = ["x", "y"],
                Bt = ["clientX", "clientY"];
            O.prototype = {
                handler: function() {},
                init: function() {
                    this.evEl && g(this.element, this.evEl, this.domHandler), this.evTarget && g(this.target, this.evTarget, this.domHandler), this.evWin && g(I(this.element), this.evWin, this.domHandler)
                },
                destroy: function() {
                    this.evEl && y(this.element, this.evEl, this.domHandler), this.evTarget && y(this.target, this.evTarget, this.domHandler), this.evWin && y(I(this.element), this.evWin, this.domHandler)
                }
            };
            var qt = {
                    mousedown: Ot,
                    mousemove: At,
                    mouseup: Nt
                },
                Lt = "mousedown",
                Gt = "mousemove mouseup";
            p(q, O, {
                handler: function(t) {
                    var e = qt[t.type];
                    e & Ot && 0 === t.button && (this.pressed = !0), e & At && 1 !== t.which && (e = Nt), this.pressed && this.allow && (e & Nt && (this.pressed = !1), this.callback(this.manager, e, {
                        pointers: [t],
                        changedPointers: [t],
                        pointerType: Vt,
                        srcEvent: t
                    }))
                }
            });
            var Xt = {
                    pointerdown: Ot,
                    pointermove: At,
                    pointerup: Nt,
                    pointercancel: Ct,
                    pointerout: Ct
                },
                Yt = {
                    2: xt,
                    3: _t,
                    4: Vt,
                    5: St
                },
                Ht = "pointerdown",
                Ut = "pointermove pointerup pointercancel";
            r.MSPointerEvent && (Ht = "MSPointerDown", Ut = "MSPointerMove MSPointerUp MSPointerCancel"), p(L, O, {
                handler: function(t) {
                    var e = this.store,
                        n = !1,
                        i = t.type.toLowerCase().replace("ms", ""),
                        r = Xt[i],
                        a = Yt[t.pointerType] || t.pointerType,
                        o = a == xt,
                        s = T(e, t.pointerId, "pointerId");
                    r & Ot && (0 === t.button || o) ? 0 > s && (e.push(t), s = e.length - 1) : r & (Nt | Ct) && (n = !0), 0 > s || (e[s] = t, this.callback(this.manager, r, {
                        pointers: e,
                        changedPointers: [t],
                        pointerType: a,
                        srcEvent: t
                    }), n && e.splice(s, 1))
                }
            });
            var Kt = {
                    touchstart: Ot,
                    touchmove: At,
                    touchend: Nt,
                    touchcancel: Ct
                },
                Zt = "touchstart",
                Jt = "touchstart touchmove touchend touchcancel";
            p(G, O, {
                handler: function(t) {
                    var e = Kt[t.type];
                    if (e === Ot && (this.started = !0), this.started) {
                        var n = X.call(this, t, e);
                        e & (Nt | Ct) && n[0].length - n[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
                            pointers: n[0],
                            changedPointers: n[1],
                            pointerType: xt,
                            srcEvent: t
                        })
                    }
                }
            });
            var $t = {
                    touchstart: Ot,
                    touchmove: At,
                    touchend: Nt,
                    touchcancel: Ct
                },
                Qt = "touchstart touchmove touchend touchcancel";
            p(Y, O, {
                handler: function(t) {
                    var e = $t[t.type],
                        n = H.call(this, t, e);
                    n && this.callback(this.manager, e, {
                        pointers: n[0],
                        changedPointers: n[1],
                        pointerType: xt,
                        srcEvent: t
                    })
                }
            }), p(U, O, {
                handler: function(t, e, n) {
                    var i = n.pointerType == xt,
                        r = n.pointerType == Vt;
                    if (i) this.mouse.allow = !1;
                    else if (r && !this.mouse.allow) return;
                    e & (Nt | Ct) && (this.mouse.allow = !0), this.callback(t, e, n)
                },
                destroy: function() {
                    this.touch.destroy(), this.mouse.destroy()
                }
            });
            var te = V(pt.style, "touchAction"),
                ee = te !== s,
                ne = "compute",
                ie = "auto",
                re = "manipulation",
                ae = "none",
                oe = "pan-x",
                se = "pan-y";
            K.prototype = {
                set: function(t) {
                    t == ne && (t = this.compute()), ee && (this.manager.element.style[te] = t), this.actions = t.toLowerCase().trim()
                },
                update: function() {
                    this.set(this.manager.options.touchAction)
                },
                compute: function() {
                    var t = [];
                    return c(this.manager.recognizers, function(e) {
                        m(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
                    }), Z(t.join(" "))
                },
                preventDefaults: function(t) {
                    if (!ee) {
                        var e = t.srcEvent,
                            n = t.offsetDirection;
                        if (this.manager.session.prevented) return void e.preventDefault();
                        var i = this.actions,
                            r = E(i, ae),
                            a = E(i, se),
                            o = E(i, oe);
                        return r || a && n & Rt || o && n & zt ? this.preventSrc(e) : void 0
                    }
                },
                preventSrc: function(t) {
                    this.manager.session.prevented = !0, t.preventDefault()
                }
            };
            var le = 1,
                ue = 2,
                ce = 4,
                he = 8,
                de = he,
                pe = 16,
                fe = 32;
            J.prototype = {
                defaults: {},
                set: function(t) {
                    return h(this.options, t), this.manager && this.manager.touchAction.update(), this
                },
                recognizeWith: function(t) {
                    if (u(t, "recognizeWith", this)) return this;
                    var e = this.simultaneous;
                    return t = tt(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
                },
                dropRecognizeWith: function(t) {
                    return u(t, "dropRecognizeWith", this) ? this : (t = tt(t, this), delete this.simultaneous[t.id], this)
                },
                requireFailure: function(t) {
                    if (u(t, "requireFailure", this)) return this;
                    var e = this.requireFail;
                    return t = tt(t, this), -1 === T(e, t) && (e.push(t), t.requireFailure(this)), this
                },
                dropRequireFailure: function(t) {
                    if (u(t, "dropRequireFailure", this)) return this;
                    t = tt(t, this);
                    var e = T(this.requireFail, t);
                    return e > -1 && this.requireFail.splice(e, 1), this
                },
                hasRequireFailures: function() {
                    return this.requireFail.length > 0
                },
                canRecognizeWith: function(t) {
                    return !!this.simultaneous[t.id]
                },
                emit: function(t) {
                    function e(e) {
                        n.manager.emit(n.options.event + (e ? $(i) : ""), t)
                    }
                    var n = this,
                        i = this.state;
                    he > i && e(!0), e(), i >= he && e(!0)
                },
                tryEmit: function(t) {
                    return this.canEmit() ? this.emit(t) : void(this.state = fe)
                },
                canEmit: function() {
                    for (var t = 0; t < this.requireFail.length;) {
                        if (!(this.requireFail[t].state & (fe | le))) return !1;
                        t++
                    }
                    return !0
                },
                recognize: function(t) {
                    var e = h({}, t);
                    return m(this.options.enable, [this, e]) ? (this.state & (de | pe | fe) && (this.state = le), this.state = this.process(e), void(this.state & (ue | ce | he | pe) && this.tryEmit(e))) : (this.reset(), void(this.state = fe))
                },
                process: function(t) {},
                getTouchAction: function() {},
                reset: function() {}
            }, p(et, J, {
                defaults: {
                    pointers: 1
                },
                attrTest: function(t) {
                    var e = this.options.pointers;
                    return 0 === e || t.pointers.length === e
                },
                process: function(t) {
                    var e = this.state,
                        n = t.eventType,
                        i = e & (ue | ce),
                        r = this.attrTest(t);
                    return i && (n & Ct || !r) ? e | pe : i || r ? n & Nt ? e | he : e & ue ? e | ce : ue : fe
                }
            }), p(nt, et, {
                defaults: {
                    event: "pan",
                    threshold: 10,
                    pointers: 1,
                    direction: Wt
                },
                getTouchAction: function() {
                    var t = this.options.direction,
                        e = [];
                    return t & Rt && e.push(se), t & zt && e.push(oe), e
                },
                directionTest: function(t) {
                    var e = this.options,
                        n = !0,
                        i = t.distance,
                        r = t.direction,
                        a = t.deltaX,
                        o = t.deltaY;
                    return r & e.direction || (e.direction & Rt ? (r = 0 === a ? Ft : 0 > a ? Pt : Dt, n = a != this.pX, i = Math.abs(t.deltaX)) : (r = 0 === o ? Ft : 0 > o ? Mt : kt, n = o != this.pY, i = Math.abs(t.deltaY))), t.direction = r, n && i > e.threshold && r & e.direction
                },
                attrTest: function(t) {
                    return et.prototype.attrTest.call(this, t) && (this.state & ue || !(this.state & ue) && this.directionTest(t))
                },
                emit: function(t) {
                    this.pX = t.deltaX, this.pY = t.deltaY;
                    var e = Q(t.direction);
                    e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
                }
            }), p(it, et, {
                defaults: {
                    event: "pinch",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [ae]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ue)
                },
                emit: function(t) {
                    if (this._super.emit.call(this, t), 1 !== t.scale) {
                        var e = t.scale < 1 ? "in" : "out";
                        this.manager.emit(this.options.event + e, t)
                    }
                }
            }), p(rt, J, {
                defaults: {
                    event: "press",
                    pointers: 1,
                    time: 500,
                    threshold: 5
                },
                getTouchAction: function() {
                    return [ie]
                },
                process: function(t) {
                    var e = this.options,
                        n = t.pointers.length === e.pointers,
                        i = t.distance < e.threshold,
                        r = t.deltaTime > e.time;
                    if (this._input = t, !i || !n || t.eventType & (Nt | Ct) && !r) this.reset();
                    else if (t.eventType & Ot) this.reset(), this._timer = l(function() {
                        this.state = de, this.tryEmit()
                    }, e.time, this);
                    else if (t.eventType & Nt) return de;
                    return fe
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function(t) {
                    this.state === de && (t && t.eventType & Nt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = gt(), this.manager.emit(this.options.event, this._input)))
                }
            }), p(at, et, {
                defaults: {
                    event: "rotate",
                    threshold: 0,
                    pointers: 2
                },
                getTouchAction: function() {
                    return [ae]
                },
                attrTest: function(t) {
                    return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ue)
                }
            }), p(ot, et, {
                defaults: {
                    event: "swipe",
                    threshold: 10,
                    velocity: .65,
                    direction: Rt | zt,
                    pointers: 1
                },
                getTouchAction: function() {
                    return nt.prototype.getTouchAction.call(this)
                },
                attrTest: function(t) {
                    var e, n = this.options.direction;
                    return n & (Rt | zt) ? e = t.velocity : n & Rt ? e = t.velocityX : n & zt && (e = t.velocityY), this._super.attrTest.call(this, t) && n & t.direction && t.distance > this.options.threshold && vt(e) > this.options.velocity && t.eventType & Nt
                },
                emit: function(t) {
                    var e = Q(t.direction);
                    e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
                }
            }), p(st, J, {
                defaults: {
                    event: "tap",
                    pointers: 1,
                    taps: 1,
                    interval: 300,
                    time: 250,
                    threshold: 2,
                    posThreshold: 10
                },
                getTouchAction: function() {
                    return [re]
                },
                process: function(t) {
                    var e = this.options,
                        n = t.pointers.length === e.pointers,
                        i = t.distance < e.threshold,
                        r = t.deltaTime < e.time;
                    if (this.reset(), t.eventType & Ot && 0 === this.count) return this.failTimeout();
                    if (i && r && n) {
                        if (t.eventType != Nt) return this.failTimeout();
                        var a = this.pTime ? t.timeStamp - this.pTime < e.interval : !0,
                            o = !this.pCenter || z(this.pCenter, t.center) < e.posThreshold;
                        this.pTime = t.timeStamp, this.pCenter = t.center, o && a ? this.count += 1 : this.count = 1, this._input = t;
                        var s = this.count % e.taps;
                        if (0 === s) return this.hasRequireFailures() ? (this._timer = l(function() {
                            this.state = de, this.tryEmit()
                        }, e.interval, this), ue) : de
                    }
                    return fe
                },
                failTimeout: function() {
                    return this._timer = l(function() {
                        this.state = fe
                    }, this.options.interval, this), fe
                },
                reset: function() {
                    clearTimeout(this._timer)
                },
                emit: function() {
                    this.state == de && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
                }
            }), lt.VERSION = "2.0.4", lt.defaults = {
                domEvents: !1,
                touchAction: ne,
                enable: !0,
                inputTarget: null,
                inputClass: null,
                preset: [
                    [at, {
                        enable: !1
                    }],
                    [it, {
                            enable: !1
                        },
                        ["rotate"]
                    ],
                    [ot, {
                        direction: Rt
                    }],
                    [nt, {
                            direction: Rt
                        },
                        ["swipe"]
                    ],
                    [st],
                    [st, {
                            event: "doubletap",
                            taps: 2
                        },
                        ["tap"]
                    ],
                    [rt]
                ],
                cssProps: {
                    userSelect: "none",
                    touchSelect: "none",
                    touchCallout: "none",
                    contentZooming: "none",
                    userDrag: "none",
                    tapHighlightColor: "rgba(0,0,0,0)"
                }
            };
            var me = 1,
                ve = 2;
            ut.prototype = {
                set: function(t) {
                    return h(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
                },
                stop: function(t) {
                    this.session.stopped = t ? ve : me
                },
                recognize: function(t) {
                    var e = this.session;
                    if (!e.stopped) {
                        this.touchAction.preventDefaults(t);
                        var n, i = this.recognizers,
                            r = e.curRecognizer;
                        (!r || r && r.state & de) && (r = e.curRecognizer = null);
                        for (var a = 0; a < i.length;) n = i[a], e.stopped === ve || r && n != r && !n.canRecognizeWith(r) ? n.reset() : n.recognize(t), !r && n.state & (ue | ce | he) && (r = e.curRecognizer = n), a++
                    }
                },
                get: function(t) {
                    if (t instanceof J) return t;
                    for (var e = this.recognizers, n = 0; n < e.length; n++)
                        if (e[n].options.event == t) return e[n];
                    return null
                },
                add: function(t) {
                    if (u(t, "add", this)) return this;
                    var e = this.get(t.options.event);
                    return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
                },
                remove: function(t) {
                    if (u(t, "remove", this)) return this;
                    var e = this.recognizers;
                    return t = this.get(t), e.splice(T(e, t), 1), this.touchAction.update(), this
                },
                on: function(t, e) {
                    var n = this.handlers;
                    return c(w(t), function(t) {
                        n[t] = n[t] || [], n[t].push(e)
                    }), this
                },
                off: function(t, e) {
                    var n = this.handlers;
                    return c(w(t), function(t) {
                        e ? n[t].splice(T(n[t], e), 1) : delete n[t]
                    }), this
                },
                emit: function(t, e) {
                    this.options.domEvents && ht(t, e);
                    var n = this.handlers[t] && this.handlers[t].slice();
                    if (n && n.length) {
                        e.type = t, e.preventDefault = function() {
                            e.srcEvent.preventDefault()
                        };
                        for (var i = 0; i < n.length;) n[i](e), i++
                    }
                },
                destroy: function() {
                    this.element && ct(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
                }
            }, h(lt, {
                INPUT_START: Ot,
                INPUT_MOVE: At,
                INPUT_END: Nt,
                INPUT_CANCEL: Ct,
                STATE_POSSIBLE: le,
                STATE_BEGAN: ue,
                STATE_CHANGED: ce,
                STATE_ENDED: he,
                STATE_RECOGNIZED: de,
                STATE_CANCELLED: pe,
                STATE_FAILED: fe,
                DIRECTION_NONE: Ft,
                DIRECTION_LEFT: Pt,
                DIRECTION_RIGHT: Dt,
                DIRECTION_UP: Mt,
                DIRECTION_DOWN: kt,
                DIRECTION_HORIZONTAL: Rt,
                DIRECTION_VERTICAL: zt,
                DIRECTION_ALL: Wt,
                Manager: ut,
                Input: O,
                TouchAction: K,
                TouchInput: Y,
                MouseInput: q,
                PointerEventInput: L,
                TouchMouseInput: U,
                SingleTouchInput: G,
                Recognizer: J,
                AttrRecognizer: et,
                Tap: st,
                Pan: nt,
                Swipe: ot,
                Pinch: it,
                Rotate: at,
                Press: rt,
                on: g,
                off: y,
                each: c,
                merge: d,
                extend: h,
                inherit: p,
                bindFn: f,
                prefixed: V
            }), "function" == ft && n(166) ? (i = function() {
                return lt
            }.call(e, n, e, t), !(i !== s && (t.exports = i))) : "undefined" != typeof t && t.exports ? t.exports = lt : r[o] = lt
        }(window, document, "Hammer")
    },
    93: function(t, e) {
        t.exports = "countryName	earnedIncomeRatio	earnedIncomeFemale	earnedIncomeMale	hdiFemale	hdiMale	lifeExpectancyFemale	lifeExpectancyMale	meanSchoolingFemale	meanSchoolingMale	expectedSchoolingFemale	expectedSchoolingMale	gniPerCapitaFemale	gniPerCapitaMale	womenInParliament	totalSeatsInParliament	percentageWomenInParliament	marriedBy18\rAlgeria	0,16	2.371,00	14.522,00	0,629	0,746	72,7	69,4	5,9	7,8	14,2	13,8	3.695	21.219	146	462	32%	2\rAngola	0,63	4.717,00	7.526,00	..	..	53,4	50,4	..	..	8,7	14	5.080	7.587	81	220	37%	..\rBenin	0,68	1.284,00	1.883,00	0,428	0,52	60,7	57,9	2	4,4	9,4	12,7	1.455	1.999	6	83	7%	32\rBotswana	0,47	10.868,00	23.047,00	0,669	0,694	66,8	62,1	8,7	9	11,7	11,6	11.491	18.054	6	63	10%	..\rBurkina Faso	0,67	1.214,00	1.816,00	0,376	0,407	56,9	55,7	1,9	1,1	7	8	1.335	1.871	12	127	9%	52\rBurundi	0,79	495	628	0,37	0,41	56,1	52,2	2,2	3,3	9,6	10,7	685	815	44	121	36%	20\rCameroon	0,63	1.816,00	2.868,00	0,468	0,537	56,2	53,9	5,1	6,7	9,5	11,2	2.062	3.052	56	180	31%	38\rCape Verde	0,47	2.839,00	6.038,00	..	..	78,8	71,1	..	..	13,6	12,9	4.266	8.480	17	72	24%	18\rChad	0,62	1.141,00	1.844,00	0,319	0,419	52,1	50,3	0,6	2,3	5,9	8,9	1.289	1.953	28	188	15%	68\rComoros				..	..	62,3	59,5	..	..	12,3	13,2	798	2.201	1	33	3%	32\rCongo				0,543	0,585	60,2	57,4	5,5	6,7	10,9	11,3	4.222	5.597	10	136	7%	33\rC��te d'Ivoire	0,48	1.314,00	2.736,00	..	..	51,6	50	3,1	5,4	..	..	1.866	3.648	23	251	9%	33\rDjibouti				..	..	63,4	60,2	..	..	5,9	6,9	1.907	4.300	7	55	13%	5\rDRC				0,304	0,369	51,8	48,2	2,1	4,1	8,4	10,9	390	499	44	492	9%	39\rEgypt	0,26	2.784,00	10.629,00	0,617	0,722	73,6	68,8	5,3	7,5	12,7	13,3	4.225	16.522	89	596	15%	17\rEquatorial Guinea				..	..	54,6	51,7	..	..	6,9	10	17.769	25.977	24	100	24%	30\rEritrea				..	..	65,2	60,5	..	..	3,7	4,6	986	1.309	33	150	22%	41\rEthiopia	0,67	917	1.360,00	0,401	0,47	65,3	62	1,4	3,6	8	9	1.090	1.515	212	547	39%	41\rGabon				..	..	64,5	62,4	8,4	6,4	..	..	14.003	19.919	17	120	14%	22\rGambia				..	..	60,2	57,5	2	3,6	..	..	1.309	1.811	5	53	9%	36\rGhana	0,66	1.637,00	2.466,00	0,537	0,607	62,1	60,2	5,9	8,1	10,9	12,1	2.937	4.138	30	275	11%	21\rGuinea				0,344	0,439	56,9	55,3	0,8	2,6	7,4	10,1	913	1.370	25	114	22%	52\rGuinea-Bissau				..	..	55,8	52,8	1,4	3,4	..	..	907	1.275	14	102	14%	22\rKenya	0,65	1.384,00	2.139,00	0,508	0,56	63,6	59,8	5,4	7,1	10,7	11,3	1.763	2.554	69	350	20%	26\rLesotho	0,61	1.493,00	2.447,00	0,474	0,488	49,5	49,2	6,8	4,6	11,6	10,6	2.217	3.395	30	120	25%	19\rLiberia				0,379	0,482	61,5	59,6	2,3	5,6	8,9	12,4	634	868	8	73	11%	38\rLibya				0,749	0,805	77,3	73,5	7,5	7,5	16,4	15,9	10.649	32.678	30	188	16%	..\rMadagascar	0,72	818	1.140,00	0,476	0,519	66,2	63,2	4,8	5,6	10,2	10,5	1.102	1.566	31	151	21%	41\rMalawi	0,79	794	1.010,00	0,389	0,437	55,4	55,1	3,4	5,1	10,8	10,7	652	777	32	192	17%	50\rMali	0,41	707	1.714,00	0,35	0,455	54,9	55,1	1,4	2,6	7,6	9,6	914	2.076	13	147	9%	55\rMauritania	0,28	1.128,00	4.058,00	0,425	0,53	63,1	60	2,6	4,9	8,1	8,3	1.362	4.592	37	147	25%	34\rMauritius	0,45	9.812,00	21.630,00	0,75	0,784	77,1	70,3	8	9,1	15,9	15,2	10.980	22.726	8	69	12%	..\rMorocco	0,28	2.296,00	8.175,00	0,545	0,658	72,7	69,1	3,2	5,6	10,6	11,6	3.215	10.692	67	395	17%	16\rMozambique				0,343	0,391	51	49,3	0,8	1,7	8,9	10,1	939	1.086	99	250	40%	48\rNamibia	0,61	5.712,00	9.371,00	0,616	0,631	67,1	61,7	6,3	6,1	11,4	11,3	7.288	11.196	43	104	41%	9\rNiger				0,275	0,385	58,6	58,3	0,8	2,1	4,8	6,1	471	1.268	25	171	15%	76\rNigeria	0,58	1.940,00	3.357,00	0,458	0,546	52,8	52,2	4,2	6,3	8,2	9,8	4.068	6.594	20	360	6%	43\rRwanda				0,463	0,487	65,7	62,4	3,1	3,6	10,3	10,2	1.263	1.550	51	80	64%	8\rSao Tome				0,524	0,586	68,3	64,3	4	5,5	11,4	11,2	2.001	4.248	10	55	18%	34\rSenegal	0,57	1.413,00	2.497,00	0,449	0,52	64,9	61,9	3,4	5,6	7,8	8,1	1.642	2.717	64	150	43%	33\rSeychelles				..	..	78,1	69	9,4	9,4	12,1	11,1	..	..	14	32	44%	..\rSierra Leone				0,329	0,412	45,8	45,3	2	3,8	6,1	8,4	1.617	2.016	15	121	12%	44\rSomalia				..	..	56,7	53,4	..	..	..	..	..	..	38	275	14%	45\rSouth Africa	0,52	7.950,00	15.145,00	..	..	58,8	54,7	9,8	10,1	..	..	8.539	15.233	169	399	42%	6\rSouth Sudan				..	..	56,3	54,2	..	..	..	..	..	..	88	332	27%	52\rSudan				..	..	63,9	60,3	2,5	3,8	..	..	1.692	5.153	130	426	31%	33\rSwaziland				0,493	0,562	48,3	49,6	7,4	6,8	10,9	11,8	3.738	7.384	4	65	6%	7\rTanzania	0,69	1.302,00	1.899,00	0,466	0,509	62,9	60,2	4,5	5,8	9	9,3	1.501	1.903	136	372	37%	37\rTogo				0,401	0,499	57,4	55,6	3,3	6,7	8,5	11,9	998	1.263	16	91	18%	25\rTunisia				0,669	0,751	78,3	73,6	5,5	7,5	15	14	4.751	16.226	68	217	31%	2\rUganda	0,73	1.139,00	1.563,00	0,456	0,509	60,4	58	4,3	6,4	10,6	10,9	1.167	1.502	143	427	34%	40\rZambia	0,63	1.322,00	2.094,00	0,534	0,585	60	56,3	5,8	7,2	13	13,9	2.344	3.455	20	158	13%	42\rZimbabwe				0,468	0,515	60,8	58,8	6,7	7,8	9,1	9,5	1.124	1.496	85	270	31%	31"
    },
    166: function(t, e) {
        (function(e) {
            t.exports = e
        }).call(e, {})
    }
});