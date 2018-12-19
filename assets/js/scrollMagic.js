/*! ScrollMagic v2.0.6 | (c) 2018 Jan Paepke (@janpaepke) | license & info: http://scrollmagic.io */
!(function(e, t) {
  "function" == typeof define && define.amd
    ? define(t)
    : "object" == typeof exports
    ? (module.exports = t())
    : (e.ScrollMagic = t());
})(this, function() {
  "use strict";
  var e = function() {};
  (e.version = "2.0.6"), window.addEventListener("mousewheel", function() {});
  var t = "data-scrollmagic-pin-spacer";
  e.Controller = function(r) {
    var o,
      s,
      a = "ScrollMagic.Controller",
      l = "FORWARD",
      c = "REVERSE",
      f = "PAUSED",
      u = n.defaults,
      d = this,
      h = i.extend({}, u, r),
      g = [],
      p = !1,
      v = 0,
      m = f,
      w = !0,
      y = 0,
      S = !0,
      b = function() {
        for (var e in h) u.hasOwnProperty(e) || delete h[e];
        if (((h.container = i.get.elements(h.container)[0]), !h.container))
          throw a + " init failed.";
        (w =
          h.container === window ||
          h.container === document.body ||
          !document.body.contains(h.container)),
          w && (h.container = window),
          (y = z()),
          h.container.addEventListener("resize", T),
          h.container.addEventListener("scroll", T);
        var t = parseInt(h.refreshInterval, 10);
        (h.refreshInterval = i.type.Number(t) ? t : u.refreshInterval), E();
      },
      E = function() {
        h.refreshInterval > 0 && (s = window.setTimeout(A, h.refreshInterval));
      },
      x = function() {
        return h.vertical
          ? i.get.scrollTop(h.container)
          : i.get.scrollLeft(h.container);
      },
      z = function() {
        return h.vertical
          ? i.get.height(h.container)
          : i.get.width(h.container);
      },
      C = (this._setScrollPos = function(e) {
        h.vertical
          ? w
            ? window.scrollTo(i.get.scrollLeft(), e)
            : (h.container.scrollTop = e)
          : w
          ? window.scrollTo(e, i.get.scrollTop())
          : (h.container.scrollLeft = e);
      }),
      F = function() {
        if (S && p) {
          var e = i.type.Array(p) ? p : g.slice(0);
          p = !1;
          var t = v;
          v = d.scrollPos();
          var n = v - t;
          0 !== n && (m = n > 0 ? l : c),
            m === c && e.reverse(),
            e.forEach(function(e) {
              e.update(!0);
            });
        }
      },
      L = function() {
        o = i.rAF(F);
      },
      T = function(e) {
        "resize" == e.type && ((y = z()), (m = f)), p !== !0 && ((p = !0), L());
      },
      A = function() {
        if (!w && y != z()) {
          var e;
          try {
            e = new Event("resize", { bubbles: !1, cancelable: !1 });
          } catch (t) {
            (e = document.createEvent("Event")), e.initEvent("resize", !1, !1);
          }
          h.container.dispatchEvent(e);
        }
        g.forEach(function(e) {
          e.refresh();
        }),
          E();
      };
    this._options = h;
    var N = function(e) {
      if (e.length <= 1) return e;
      var t = e.slice(0);
      return (
        t.sort(function(e, t) {
          return e.scrollOffset() > t.scrollOffset() ? 1 : -1;
        }),
        t
      );
    };
    return (
      (this.addScene = function(t) {
        if (i.type.Array(t))
          t.forEach(function(e) {
            d.addScene(e);
          });
        else if (t instanceof e.Scene)
          if (t.controller() !== d) t.addTo(d);
          else if (g.indexOf(t) < 0) {
            g.push(t),
              (g = N(g)),
              t.on("shift.controller_sort", function() {
                g = N(g);
              });
            for (var n in h.globalSceneOptions)
              t[n] && t[n].call(t, h.globalSceneOptions[n]);
          }
        return d;
      }),
      (this.removeScene = function(e) {
        if (i.type.Array(e))
          e.forEach(function(e) {
            d.removeScene(e);
          });
        else {
          var t = g.indexOf(e);
          t > -1 &&
            (e.off("shift.controller_sort"), g.splice(t, 1), e.remove());
        }
        return d;
      }),
      (this.updateScene = function(t, n) {
        return (
          i.type.Array(t)
            ? t.forEach(function(e) {
                d.updateScene(e, n);
              })
            : n
            ? t.update(!0)
            : p !== !0 &&
              t instanceof e.Scene &&
              ((p = p || []), -1 == p.indexOf(t) && p.push(t), (p = N(p)), L()),
          d
        );
      }),
      (this.update = function(e) {
        return T({ type: "resize" }), e && F(), d;
      }),
      (this.scrollTo = function(n, r) {
        if (i.type.Number(n)) C.call(h.container, n, r);
        else if (n instanceof e.Scene)
          n.controller() === d && d.scrollTo(n.scrollOffset(), r);
        else if (i.type.Function(n)) C = n;
        else {
          var o = i.get.elements(n)[0];
          if (o) {
            for (; o.parentNode.hasAttribute(t); ) o = o.parentNode;
            var s = h.vertical ? "top" : "left",
              a = i.get.offset(h.container),
              l = i.get.offset(o);
            w || (a[s] -= d.scrollPos()), d.scrollTo(l[s] - a[s], r);
          }
        }
        return d;
      }),
      (this.scrollPos = function(e) {
        return arguments.length
          ? (i.type.Function(e) && (x = e), d)
          : x.call(d);
      }),
      (this.info = function(e) {
        var t = {
          size: y,
          vertical: h.vertical,
          scrollPos: v,
          scrollDirection: m,
          container: h.container,
          isDocument: w
        };
        return arguments.length ? (void 0 !== t[e] ? t[e] : void 0) : t;
      }),
      (this.loglevel = function() {
        return d;
      }),
      (this.enabled = function(e) {
        return arguments.length
          ? (S != e && ((S = !!e), d.updateScene(g, !0)), d)
          : S;
      }),
      (this.destroy = function(e) {
        window.clearTimeout(s);
        for (var t = g.length; t--; ) g[t].destroy(e);
        return (
          h.container.removeEventListener("resize", T),
          h.container.removeEventListener("scroll", T),
          i.cAF(o),
          null
        );
      }),
      b(),
      d
    );
  };
  var n = {
    defaults: {
      container: window,
      vertical: !0,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  (e.Controller.addOption = function(e, t) {
    n.defaults[e] = t;
  }),
    (e.Controller.extend = function(t) {
      var n = this;
      (e.Controller = function() {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Controller, n),
        (e.Controller.prototype = n.prototype),
        (e.Controller.prototype.constructor = e.Controller);
    }),
    (e.Scene = function(n) {
      var o,
        s,
        a = "BEFORE",
        l = "DURING",
        c = "AFTER",
        f = r.defaults,
        u = this,
        d = i.extend({}, f, n),
        h = a,
        g = 0,
        p = { start: 0, end: 0 },
        v = 0,
        m = !0,
        w = function() {
          for (var e in d) f.hasOwnProperty(e) || delete d[e];
          for (var t in f) L(t);
          C();
        },
        y = {};
      (this.on = function(e, t) {
        return (
          i.type.Function(t) &&
            ((e = e.trim().split(" ")),
            e.forEach(function(e) {
              var n = e.split("."),
                r = n[0],
                i = n[1];
              "*" != r &&
                (y[r] || (y[r] = []),
                y[r].push({ namespace: i || "", callback: t }));
            })),
          u
        );
      }),
        (this.off = function(e, t) {
          return e
            ? ((e = e.trim().split(" ")),
              e.forEach(function(e) {
                var n = e.split("."),
                  r = n[0],
                  i = n[1] || "",
                  o = "*" === r ? Object.keys(y) : [r];
                o.forEach(function(e) {
                  for (var n = y[e] || [], r = n.length; r--; ) {
                    var o = n[r];
                    !o ||
                      (i !== o.namespace && "*" !== i) ||
                      (t && t != o.callback) ||
                      n.splice(r, 1);
                  }
                  n.length || delete y[e];
                });
              }),
              u)
            : u;
        }),
        (this.trigger = function(t, n) {
          if (t) {
            var r = t.trim().split("."),
              i = r[0],
              o = r[1],
              s = y[i];
            s &&
              s.forEach(function(t) {
                (o && o !== t.namespace) ||
                  t.callback.call(u, new e.Event(i, t.namespace, u, n));
              });
          }
          return u;
        }),
        u
          .on("change.internal", function(e) {
            "loglevel" !== e.what &&
              "tweenChanges" !== e.what &&
              ("triggerElement" === e.what
                ? E()
                : "reverse" === e.what && u.update());
          })
          .on("shift.internal", function() {
            S(), u.update();
          }),
        (this.addTo = function(t) {
          return (
            t instanceof e.Controller &&
              s != t &&
              (s && s.removeScene(u),
              (s = t),
              C(),
              b(!0),
              E(!0),
              S(),
              s.info("container").addEventListener("resize", x),
              t.addScene(u),
              u.trigger("add", { controller: s }),
              u.update()),
            u
          );
        }),
        (this.enabled = function(e) {
          return arguments.length
            ? (m != e && ((m = !!e), u.update(!0)), u)
            : m;
        }),
        (this.remove = function() {
          if (s) {
            s.info("container").removeEventListener("resize", x);
            var e = s;
            (s = void 0), e.removeScene(u), u.trigger("remove");
          }
          return u;
        }),
        (this.destroy = function(e) {
          return (
            u.trigger("destroy", { reset: e }), u.remove(), u.off("*.*"), null
          );
        }),
        (this.update = function(e) {
          if (s)
            if (e)
              if (s.enabled() && m) {
                var t,
                  n = s.info("scrollPos");
                (t =
                  d.duration > 0
                    ? (n - p.start) / (p.end - p.start)
                    : n >= p.start
                    ? 1
                    : 0),
                  u.trigger("update", {
                    startPos: p.start,
                    endPos: p.end,
                    scrollPos: n
                  }),
                  u.progress(t);
              } else T && h === l && N(!0);
            else s.updateScene(u, !1);
          return u;
        }),
        (this.refresh = function() {
          return b(), E(), u;
        }),
        (this.progress = function(e) {
          if (arguments.length) {
            var t = !1,
              n = h,
              r = s ? s.info("scrollDirection") : "PAUSED",
              i = d.reverse || e >= g;
            if (
              (0 === d.duration
                ? ((t = g != e),
                  (g = 1 > e && i ? 0 : 1),
                  (h = 0 === g ? a : l))
                : 0 > e && h !== a && i
                ? ((g = 0), (h = a), (t = !0))
                : e >= 0 && 1 > e && i
                ? ((g = e), (h = l), (t = !0))
                : e >= 1 && h !== c
                ? ((g = 1), (h = c), (t = !0))
                : h !== l || i || N(),
              t)
            ) {
              var o = { progress: g, state: h, scrollDirection: r },
                f = h != n,
                p = function(e) {
                  u.trigger(e, o);
                };
              f && n !== l && (p("enter"), p(n === a ? "start" : "end")),
                p("progress"),
                f && h !== l && (p(h === a ? "start" : "end"), p("leave"));
            }
            return u;
          }
          return g;
        });
      var S = function() {
          (p = { start: v + d.offset }),
            s &&
              d.triggerElement &&
              (p.start -= s.info("size") * d.triggerHook),
            (p.end = p.start + d.duration);
        },
        b = function(e) {
          if (o) {
            var t = "duration";
            F(t, o.call(u)) &&
              !e &&
              (u.trigger("change", { what: t, newval: d[t] }),
              u.trigger("shift", { reason: t }));
          }
        },
        E = function(e) {
          var n = 0,
            r = d.triggerElement;
          if (s && (r || v > 0)) {
            if (r)
              if (r.parentNode) {
                for (
                  var o = s.info(),
                    a = i.get.offset(o.container),
                    l = o.vertical ? "top" : "left";
                  r.parentNode.hasAttribute(t);

                )
                  r = r.parentNode;
                var c = i.get.offset(r);
                o.isDocument || (a[l] -= s.scrollPos()), (n = c[l] - a[l]);
              } else u.triggerElement(void 0);
            var f = n != v;
            (v = n),
              f &&
                !e &&
                u.trigger("shift", { reason: "triggerElementPosition" });
          }
        },
        x = function() {
          d.triggerHook > 0 &&
            u.trigger("shift", { reason: "containerResize" });
        },
        z = i.extend(r.validate, {
          duration: function(e) {
            if (i.type.String(e) && e.match(/^(\.|\d)*\d+%$/)) {
              var t = parseFloat(e) / 100;
              e = function() {
                return s ? s.info("size") * t : 0;
              };
            }
            if (i.type.Function(e)) {
              o = e;
              try {
                e = parseFloat(o());
              } catch (n) {
                e = -1;
              }
            }
            if (((e = parseFloat(e)), !i.type.Number(e) || 0 > e))
              throw o ? ((o = void 0), 0) : 0;
            return e;
          }
        }),
        C = function(e) {
          (e = arguments.length ? [e] : Object.keys(z)),
            e.forEach(function(e) {
              var t;
              if (z[e])
                try {
                  t = z[e](d[e]);
                } catch (n) {
                  t = f[e];
                } finally {
                  d[e] = t;
                }
            });
        },
        F = function(e, t) {
          var n = !1,
            r = d[e];
          return d[e] != t && ((d[e] = t), C(e), (n = r != d[e])), n;
        },
        L = function(e) {
          u[e] ||
            (u[e] = function(t) {
              return arguments.length
                ? ("duration" === e && (o = void 0),
                  F(e, t) &&
                    (u.trigger("change", { what: e, newval: d[e] }),
                    r.shifts.indexOf(e) > -1 &&
                      u.trigger("shift", { reason: e })),
                  u)
                : d[e];
            });
        };
      (this.controller = function() {
        return s;
      }),
        (this.state = function() {
          return h;
        }),
        (this.scrollOffset = function() {
          return p.start;
        }),
        (this.triggerPosition = function() {
          var e = d.offset;
          return (
            s && (e += d.triggerElement ? v : s.info("size") * u.triggerHook()),
            e
          );
        });
      var T, A;
      u.on("shift.internal", function(e) {
        var t = "duration" === e.reason;
        ((h === c && t) || (h === l && 0 === d.duration)) && N(), t && O();
      })
        .on("progress.internal", function() {
          N();
        })
        .on("add.internal", function() {
          O();
        })
        .on("destroy.internal", function(e) {
          u.removePin(e.reset);
        });
      var N = function(e) {
          if (T && s) {
            var t = s.info(),
              n = A.spacer.firstChild;
            if (e || h !== l) {
              var r = {
                  position: A.inFlow ? "relative" : "absolute",
                  top: 0,
                  left: 0
                },
                o = i.css(n, "position") != r.position;
              A.pushFollowers
                ? d.duration > 0 &&
                  (h === c && 0 === parseFloat(i.css(A.spacer, "padding-top"))
                    ? (o = !0)
                    : h === a &&
                      0 === parseFloat(i.css(A.spacer, "padding-bottom")) &&
                      (o = !0))
                : (r[t.vertical ? "top" : "left"] = d.duration * g),
                i.css(n, r),
                o && O();
            } else {
              "fixed" != i.css(n, "position") &&
                (i.css(n, { position: "fixed" }), O());
              var f = i.get.offset(A.spacer, !0),
                u =
                  d.reverse || 0 === d.duration
                    ? t.scrollPos - p.start
                    : Math.round(g * d.duration * 10) / 10;
              (f[t.vertical ? "top" : "left"] += u),
                i.css(A.spacer.firstChild, { top: f.top, left: f.left });
            }
          }
        },
        O = function() {
          if (T && s && A.inFlow) {
            var e = h === l,
              t = s.info("vertical"),
              n = A.spacer.firstChild,
              r = i.isMarginCollapseType(i.css(A.spacer, "display")),
              o = {};
            A.relSize.width || A.relSize.autoFullWidth
              ? e
                ? i.css(T, { width: i.get.width(A.spacer) })
                : i.css(T, { width: "100%" })
              : ((o["min-width"] = i.get.width(t ? T : n, !0, !0)),
                (o.width = e ? o["min-width"] : "auto")),
              A.relSize.height
                ? e
                  ? i.css(T, {
                      height:
                        i.get.height(A.spacer) -
                        (A.pushFollowers ? d.duration : 0)
                    })
                  : i.css(T, { height: "100%" })
                : ((o["min-height"] = i.get.height(t ? n : T, !0, !r)),
                  (o.height = e ? o["min-height"] : "auto")),
              A.pushFollowers &&
                ((o["padding" + (t ? "Top" : "Left")] = d.duration * g),
                (o["padding" + (t ? "Bottom" : "Right")] =
                  d.duration * (1 - g))),
              i.css(A.spacer, o);
          }
        },
        _ = function() {
          s && T && h === l && !s.info("isDocument") && N();
        },
        P = function() {
          s &&
            T &&
            h === l &&
            (((A.relSize.width || A.relSize.autoFullWidth) &&
              i.get.width(window) != i.get.width(A.spacer.parentNode)) ||
              (A.relSize.height &&
                i.get.height(window) != i.get.height(A.spacer.parentNode))) &&
            O();
        },
        D = function(e) {
          s &&
            T &&
            h === l &&
            !s.info("isDocument") &&
            (e.preventDefault(),
            s._setScrollPos(
              s.info("scrollPos") -
                ((e.wheelDelta ||
                  e[s.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 ||
                  30 * -e.detail)
            ));
        };
      (this.setPin = function(e, n) {
        var r = { pushFollowers: !0, spacerClass: "scrollmagic-pin-spacer" };
        if (((n = i.extend({}, r, n)), (e = i.get.elements(e)[0]), !e))
          return u;
        if ("fixed" === i.css(e, "position")) return u;
        if (T) {
          if (T === e) return u;
          u.removePin();
        }
        T = e;
        var o = T.parentNode.style.display,
          s = [
            "top",
            "left",
            "bottom",
            "right",
            "margin",
            "marginLeft",
            "marginRight",
            "marginTop",
            "marginBottom"
          ];
        T.parentNode.style.display = "none";
        var a = "absolute" != i.css(T, "position"),
          l = i.css(T, s.concat(["display"])),
          c = i.css(T, ["width", "height"]);
        (T.parentNode.style.display = o),
          !a && n.pushFollowers && (n.pushFollowers = !1);
        var f = T.parentNode.insertBefore(document.createElement("div"), T),
          d = i.extend(l, {
            position: a ? "relative" : "absolute",
            boxSizing: "content-box",
            mozBoxSizing: "content-box",
            webkitBoxSizing: "content-box"
          });
        if (
          (a || i.extend(d, i.css(T, ["width", "height"])),
          i.css(f, d),
          f.setAttribute(t, ""),
          i.addClass(f, n.spacerClass),
          (A = {
            spacer: f,
            relSize: {
              width: "%" === c.width.slice(-1),
              height: "%" === c.height.slice(-1),
              autoFullWidth:
                "auto" === c.width && a && i.isMarginCollapseType(l.display)
            },
            pushFollowers: n.pushFollowers,
            inFlow: a
          }),
          !T.___origStyle)
        ) {
          T.___origStyle = {};
          var h = T.style,
            g = s.concat([
              "width",
              "height",
              "position",
              "boxSizing",
              "mozBoxSizing",
              "webkitBoxSizing"
            ]);
          g.forEach(function(e) {
            T.___origStyle[e] = h[e] || "";
          });
        }
        return (
          A.relSize.width && i.css(f, { width: c.width }),
          A.relSize.height && i.css(f, { height: c.height }),
          f.appendChild(T),
          i.css(T, {
            position: a ? "relative" : "absolute",
            margin: "auto",
            top: "auto",
            left: "auto",
            bottom: "auto",
            right: "auto"
          }),
          (A.relSize.width || A.relSize.autoFullWidth) &&
            i.css(T, {
              boxSizing: "border-box",
              mozBoxSizing: "border-box",
              webkitBoxSizing: "border-box"
            }),
          window.addEventListener("scroll", _),
          window.addEventListener("resize", _),
          window.addEventListener("resize", P),
          T.addEventListener("mousewheel", D),
          T.addEventListener("DOMMouseScroll", D),
          N(),
          u
        );
      }),
        (this.removePin = function(e) {
          if (T) {
            if ((h === l && N(!0), e || !s)) {
              var n = A.spacer.firstChild;
              if (n.hasAttribute(t)) {
                var r = A.spacer.style,
                  o = [
                    "margin",
                    "marginLeft",
                    "marginRight",
                    "marginTop",
                    "marginBottom"
                  ],
                  a = {};
                o.forEach(function(e) {
                  a[e] = r[e] || "";
                }),
                  i.css(n, a);
              }
              A.spacer.parentNode.insertBefore(n, A.spacer),
                A.spacer.parentNode.removeChild(A.spacer),
                T.parentNode.hasAttribute(t) ||
                  (i.css(T, T.___origStyle), delete T.___origStyle);
            }
            window.removeEventListener("scroll", _),
              window.removeEventListener("resize", _),
              window.removeEventListener("resize", P),
              T.removeEventListener("mousewheel", D),
              T.removeEventListener("DOMMouseScroll", D),
              (T = void 0);
          }
          return u;
        });
      var R,
        k = [];
      return (
        u.on("destroy.internal", function(e) {
          u.removeClassToggle(e.reset);
        }),
        (this.setClassToggle = function(e, t) {
          var n = i.get.elements(e);
          return 0 !== n.length && i.type.String(t)
            ? (k.length > 0 && u.removeClassToggle(),
              (R = t),
              (k = n),
              u.on("enter.internal_class leave.internal_class", function(e) {
                var t = "enter" === e.type ? i.addClass : i.removeClass;
                k.forEach(function(e) {
                  t(e, R);
                });
              }),
              u)
            : u;
        }),
        (this.removeClassToggle = function(e) {
          return (
            e &&
              k.forEach(function(e) {
                i.removeClass(e, R);
              }),
            u.off("start.internal_class end.internal_class"),
            (R = void 0),
            (k = []),
            u
          );
        }),
        w(),
        u
      );
    });
  var r = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: void 0,
      triggerHook: 0.5,
      reverse: !0,
      loglevel: 2
    },
    validate: {
      offset: function(e) {
        if (((e = parseFloat(e)), !i.type.Number(e))) throw 0;
        return e;
      },
      triggerElement: function(e) {
        if ((e = e || void 0)) {
          var t = i.get.elements(e)[0];
          if (!t || !t.parentNode) throw 0;
          e = t;
        }
        return e;
      },
      triggerHook: function(e) {
        var t = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (i.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
        else {
          if (!(e in t)) throw 0;
          e = t[e];
        }
        return e;
      },
      reverse: function(e) {
        return !!e;
      }
    },
    shifts: ["duration", "offset", "triggerHook"]
  };
  (e.Scene.addOption = function(e, t, n, i) {
    e in r.defaults ||
      ((r.defaults[e] = t), (r.validate[e] = n), i && r.shifts.push(e));
  }),
    (e.Scene.extend = function(t) {
      var n = this;
      (e.Scene = function() {
        return (
          n.apply(this, arguments),
          (this.$super = i.extend({}, this)),
          t.apply(this, arguments) || this
        );
      }),
        i.extend(e.Scene, n),
        (e.Scene.prototype = n.prototype),
        (e.Scene.prototype.constructor = e.Scene);
    }),
    (e.Event = function(e, t, n, r) {
      r = r || {};
      for (var i in r) this[i] = r[i];
      return (
        (this.type = e),
        (this.target = this.currentTarget = n),
        (this.namespace = t || ""),
        (this.timeStamp = this.timestamp = Date.now()),
        this
      );
    });
  var i = (e._util = (function(e) {
    var t,
      n = {},
      r = function(e) {
        return parseFloat(e) || 0;
      },
      i = function(t) {
        return t.currentStyle ? t.currentStyle : e.getComputedStyle(t);
      },
      o = function(t, n, o, s) {
        if (((n = n === document ? e : n), n === e)) s = !1;
        else if (!u.DomElement(n)) return 0;
        t = t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
        var a =
          (o
            ? n["offset" + t] || n["outer" + t]
            : n["client" + t] || n["inner" + t]) || 0;
        if (o && s) {
          var l = i(n);
          a +=
            "Height" === t
              ? r(l.marginTop) + r(l.marginBottom)
              : r(l.marginLeft) + r(l.marginRight);
        }
        return a;
      },
      s = function(e) {
        return e
          .replace(/^[^a-z]+([a-z])/g, "$1")
          .replace(/-([a-z])/g, function(e) {
            return e[1].toUpperCase();
          });
      };
    (n.extend = function(e) {
      for (e = e || {}, t = 1; t < arguments.length; t++)
        if (arguments[t])
          for (var n in arguments[t])
            arguments[t].hasOwnProperty(n) && (e[n] = arguments[t][n]);
      return e;
    }),
      (n.isMarginCollapseType = function(e) {
        return (
          ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e) > -1
        );
      });
    var a = 0,
      l = ["ms", "moz", "webkit", "o"],
      c = e.requestAnimationFrame,
      f = e.cancelAnimationFrame;
    for (t = 0; !c && t < l.length; ++t)
      (c = e[l[t] + "RequestAnimationFrame"]),
        (f =
          e[l[t] + "CancelAnimationFrame"] ||
          e[l[t] + "CancelRequestAnimationFrame"]);
    c ||
      (c = function(t) {
        var n = new Date().getTime(),
          r = Math.max(0, 16 - (n - a)),
          i = e.setTimeout(function() {
            t(n + r);
          }, r);
        return (a = n + r), i;
      }),
      f ||
        (f = function(t) {
          e.clearTimeout(t);
        }),
      (n.rAF = c.bind(e)),
      (n.cAF = f.bind(e));
    var u = (n.type = function(e) {
      return Object.prototype.toString
        .call(e)
        .replace(/^\[object (.+)\]$/, "$1")
        .toLowerCase();
    });
    (u.String = function(e) {
      return "string" === u(e);
    }),
      (u.Function = function(e) {
        return "function" === u(e);
      }),
      (u.Array = function(e) {
        return Array.isArray(e);
      }),
      (u.Number = function(e) {
        return !u.Array(e) && e - parseFloat(e) + 1 >= 0;
      }),
      (u.DomElement = function(e) {
        return "object" == typeof HTMLElement
          ? e instanceof HTMLElement
          : e &&
              "object" == typeof e &&
              null !== e &&
              1 === e.nodeType &&
              "string" == typeof e.nodeName;
      });
    var d = (n.get = {});
    return (
      (d.elements = function(t) {
        var n = [];
        if (u.String(t))
          try {
            t = document.querySelectorAll(t);
          } catch (r) {
            return n;
          }
        if ("nodelist" === u(t) || u.Array(t))
          for (var i = 0, o = (n.length = t.length); o > i; i++) {
            var s = t[i];
            n[i] = u.DomElement(s) ? s : d.elements(s);
          }
        else (u.DomElement(t) || t === document || t === e) && (n = [t]);
        return n;
      }),
      (d.scrollTop = function(t) {
        return t && "number" == typeof t.scrollTop
          ? t.scrollTop
          : e.pageYOffset || 0;
      }),
      (d.scrollLeft = function(t) {
        return t && "number" == typeof t.scrollLeft
          ? t.scrollLeft
          : e.pageXOffset || 0;
      }),
      (d.width = function(e, t, n) {
        return o("width", e, t, n);
      }),
      (d.height = function(e, t, n) {
        return o("height", e, t, n);
      }),
      (d.offset = function(e, t) {
        var n = { top: 0, left: 0 };
        if (e && e.getBoundingClientRect) {
          var r = e.getBoundingClientRect();
          (n.top = r.top),
            (n.left = r.left),
            t || ((n.top += d.scrollTop()), (n.left += d.scrollLeft()));
        }
        return n;
      }),
      (n.addClass = function(e, t) {
        t && (e.classList ? e.classList.add(t) : (e.className += " " + t));
      }),
      (n.removeClass = function(e, t) {
        t &&
          (e.classList
            ? e.classList.remove(t)
            : (e.className = e.className.replace(
                RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
              )));
      }),
      (n.css = function(e, t) {
        if (u.String(t)) return i(e)[s(t)];
        if (u.Array(t)) {
          var n = {},
            r = i(e);
          return (
            t.forEach(function(e) {
              n[e] = r[s(e)];
            }),
            n
          );
        }
        for (var o in t) {
          var a = t[o];
          a == parseFloat(a) && (a += "px"), (e.style[s(o)] = a);
        }
      }),
      n
    );
  })(window || {}));
  return e;
});
