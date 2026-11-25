(() => {
  var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
    get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
  }) : x2)(function(x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x2 + '" is not supported');
  });

  // src/shared/prefs.js
  var PREF_DEFAULTS = Object.freeze({
    enabled: true,
    sensitivity: 5,
    // 1 (strict) … 10 (loose)
    dustSeconds: 3,
    // length of the dissolve
    direction: "right",
    // right | left | up | random  (as other people see you)
    confirmWithSound: true,
    // require the snap "click" on the mic
    muteMic: true
    // mute while vanished
  });
  async function loadPrefs() {
    try {
      const stored = await chrome.storage.sync.get(PREF_DEFAULTS);
      return { ...PREF_DEFAULTS, ...stored };
    } catch {
      return { ...PREF_DEFAULTS };
    }
  }
  function watchPrefs(onChange) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== "sync") return;
      const patch = {};
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key in PREF_DEFAULTS) patch[key] = newValue;
      }
      if (Object.keys(patch).length) onChange(patch);
    });
  }
  var MSG = Object.freeze({
    TOGGLE: "snapvanish/toggle",
    STATUS: "snapvanish/status",
    INPAINT: "snapvanish/inpaint",
    WAKE_INPAINTER: "snapvanish/wake-inpainter"
  });

  // node_modules/@mediapipe/tasks-vision/vision_bundle.mjs
  var t = "undefined" != typeof self ? self : {};
  function e(e2, r2) {
    e2 = e2.split(".");
    for (var n2, i2 = t; e2.length && (n2 = e2.shift()); ) e2.length || void 0 === r2 ? i2 = i2[n2] && i2[n2] !== Object.prototype[n2] ? i2[n2] : i2[n2] = {} : i2[n2] = r2;
  }
  function r() {
    throw Error("Invalid UTF8");
  }
  function n(t2, e2) {
    return e2 = String.fromCharCode.apply(null, e2), null == t2 ? e2 : t2 + e2;
  }
  var i;
  var s;
  var o;
  var a;
  var h = void 0;
  var u = "undefined" != typeof TextDecoder;
  var c = "undefined" != typeof TextEncoder;
  function l(t2) {
    if (c) t2 = (s ||= new TextEncoder()).encode(t2);
    else {
      let r2 = 0, n2 = new Uint8Array(3 * t2.length);
      for (let i2 = 0; i2 < t2.length; i2++) {
        var e2 = t2.charCodeAt(i2);
        if (e2 < 128) n2[r2++] = e2;
        else {
          if (e2 < 2048) n2[r2++] = e2 >> 6 | 192;
          else {
            if (e2 >= 55296 && e2 <= 57343) {
              if (e2 <= 56319 && i2 < t2.length) {
                let s2 = t2.charCodeAt(++i2);
                if (s2 >= 56320 && s2 <= 57343) {
                  e2 = 1024 * (e2 - 55296) + s2 - 56320 + 65536, n2[r2++] = e2 >> 18 | 240, n2[r2++] = e2 >> 12 & 63 | 128, n2[r2++] = e2 >> 6 & 63 | 128, n2[r2++] = 63 & e2 | 128;
                  continue;
                }
                i2--;
              }
              e2 = 65533;
            }
            n2[r2++] = e2 >> 12 | 224, n2[r2++] = e2 >> 6 & 63 | 128;
          }
          n2[r2++] = 63 & e2 | 128;
        }
      }
      t2 = r2 === n2.length ? n2 : n2.subarray(0, r2);
    }
    return t2;
  }
  t: {
    for (d = ["CLOSURE_FLAGS"], f = t, p = 0; p < d.length; p++) if (null == (f = f[d[p]])) {
      a = null;
      break t;
    }
    a = f;
  }
  var d;
  var f;
  var p;
  var m = a && a[748402147];
  function g() {
    var e2 = t.navigator;
    return e2 && (e2 = e2.userAgent) ? e2 : "";
  }
  function v(t2) {
    return v[" "](t2), t2;
  }
  o = null == m || m, v[" "] = function() {
  };
  var _ = {};
  var y = null;
  function E(t2) {
    var e2 = t2.length, r2 = 3 * e2 / 4;
    r2 % 3 ? r2 = Math.floor(r2) : -1 != "=.".indexOf(t2[e2 - 1]) && (r2 = -1 != "=.".indexOf(t2[e2 - 2]) ? r2 - 2 : r2 - 1);
    var n2 = new Uint8Array(r2), i2 = 0;
    return (function(t3, e3) {
      function r3(e4) {
        for (; n3 < t3.length; ) {
          let e5 = t3.charAt(n3++), r4 = y[e5];
          if (null != r4) return r4;
          if (!/^[\s\xa0]*$/.test(e5)) throw Error("Unknown base64 encoding at char: " + e5);
        }
        return e4;
      }
      A();
      for (var n3 = 0; ; ) {
        let t4 = r3(-1), n4 = r3(0), i3 = r3(64), s2 = r3(64);
        if (64 === s2 && -1 === t4) break;
        e3(t4 << 2 | n4 >> 4), 64 != i3 && (e3(n4 << 4 & 240 | i3 >> 2), 64 != s2 && e3(i3 << 6 & 192 | s2));
      }
    })(t2, function(t3) {
      n2[i2++] = t3;
    }), i2 !== r2 ? n2.subarray(0, i2) : n2;
  }
  function A() {
    if (!y) {
      y = {};
      var t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e2 = ["+/=", "+/", "-_=", "-_.", "-_"];
      for (let r2 = 0; r2 < 5; r2++) {
        let n2 = t2.concat(e2[r2].split(""));
        _[r2] = n2;
        for (let t3 = 0; t3 < n2.length; t3++) {
          let e3 = n2[t3];
          void 0 === y[e3] && (y[e3] = t3);
        }
      }
    }
  }
  var w = "undefined" != typeof Uint8Array;
  var T = !(-1 != g().indexOf("Trident") || -1 != g().indexOf("MSIE")) && "function" == typeof btoa;
  var b = /[-_.]/g;
  var k = { "-": "+", _: "/", ".": "=" };
  function S(t2) {
    return k[t2] || "";
  }
  function L(t2) {
    if (!T) return E(t2);
    t2 = b.test(t2) ? t2.replace(b, S) : t2, t2 = atob(t2);
    var e2 = new Uint8Array(t2.length);
    for (let r2 = 0; r2 < t2.length; r2++) e2[r2] = t2.charCodeAt(r2);
    return e2;
  }
  function x(t2) {
    return w && null != t2 && t2 instanceof Uint8Array;
  }
  var R = {};
  function I() {
    return C ||= new N(null, R);
  }
  function F(t2) {
    O(R);
    var e2 = t2.h;
    return null == (e2 = null == e2 || x(e2) ? e2 : "string" == typeof e2 ? L(e2) : null) ? e2 : t2.h = e2;
  }
  var C;
  var N = class {
    i() {
      return new Uint8Array(F(this) || 0);
    }
    constructor(t2, e2) {
      if (O(e2), this.h = t2, null != t2 && 0 === t2.length) throw Error("ByteString should be constructed with non-empty values");
    }
  };
  function O(t2) {
    if (t2 !== R) throw Error("illegal external caller");
  }
  function M(t2, e2) {
    t2.__closure__error__context__984382 || (t2.__closure__error__context__984382 = {}), t2.__closure__error__context__984382.severity = e2;
  }
  var D = void 0;
  function P(t2) {
    return M(t2 = Error(t2), "warning"), t2;
  }
  function $(e2, r2) {
    if (null != e2) {
      var n2 = D ??= {}, i2 = n2[e2] || 0;
      i2 >= r2 || (n2[e2] = i2 + 1, M(e2 = Error(), "incident"), (function(e3) {
        t.setTimeout(() => {
          throw e3;
        }, 0);
      })(e2));
    }
  }
  function U() {
    return "function" == typeof BigInt;
  }
  var B = "function" == typeof Symbol && "symbol" == typeof /* @__PURE__ */ Symbol();
  function j(t2, e2, r2 = false) {
    return "function" == typeof Symbol && "symbol" == typeof /* @__PURE__ */ Symbol() ? r2 && Symbol.for && t2 ? Symbol.for(t2) : null != t2 ? Symbol(t2) : /* @__PURE__ */ Symbol() : e2;
  }
  var G;
  var V = j("jas", void 0, true);
  var H = j(void 0, "0di");
  var K = j(void 0, "1oa");
  var X = j(void 0, /* @__PURE__ */ Symbol());
  var W = j(void 0, "0ub");
  var Y = j(void 0, "0ubs");
  var z = j(void 0, "0ubsb");
  var q = j(void 0, "0actk");
  var J = j("m_m", "jb", true);
  var Z = { Va: { value: 0, configurable: true, writable: true, enumerable: false } };
  var Q = Object.defineProperties;
  var tt = B ? V : "Va";
  var et = [];
  function rt(t2, e2) {
    B || tt in t2 || Q(t2, Z), t2[tt] |= e2;
  }
  function nt(t2, e2) {
    B || tt in t2 || Q(t2, Z), t2[tt] = e2;
  }
  function it(t2) {
    return rt(t2, 34), t2;
  }
  function st(t2) {
    return rt(t2, 8192), t2;
  }
  function ot(t2, e2) {
    return 2 & e2 && (t2 |= 2), 1 | t2;
  }
  nt(et, 7), G = Object.freeze(et);
  var at = {};
  function ht(t2) {
    return null != t2 && t2[J] === at;
  }
  function ut(t2, e2) {
    return void 0 === e2 ? t2.i !== ct && !!(2 & t2.B[tt]) : !!(2 & e2) && t2.i !== ct;
  }
  var ct = {};
  function lt(t2, e2) {
    if (null != t2) {
      if ("string" == typeof t2) t2 = t2 ? new N(t2, R) : I();
      else if (!(t2 instanceof N)) if (x(t2)) t2 = t2.length ? new N(new Uint8Array(t2), R) : I();
      else {
        if (!e2) throw Error();
        t2 = void 0;
      }
    }
    return t2;
  }
  var dt = class {
    constructor(t2, e2, r2) {
      this.h = t2, this.i = e2, this.l = r2;
    }
    next() {
      var t2 = this.h.next();
      return t2.done || (t2.value = this.i.call(this.l, t2.value)), t2;
    }
    [Symbol.iterator]() {
      return this;
    }
  };
  function ft(t2, e2, r2) {
    var n2, i2 = 128 & e2 ? 0 : -1, s2 = t2.length;
    (n2 = !!s2) && (n2 = null != (n2 = t2[s2 - 1]) && "object" == typeof n2 && n2.constructor === Object);
    var o2 = s2 + (n2 ? -1 : 0);
    for (e2 = 128 & e2 ? 1 : 0; e2 < o2; e2++) r2(e2 - i2, t2[e2]);
    if (n2) {
      t2 = t2[s2 - 1];
      for (let e3 in t2) !isNaN(e3) && r2(+e3, t2[e3]);
    }
  }
  Object.freeze({});
  var pt = {};
  function mt(t2) {
    return 128 & t2 ? pt : void 0;
  }
  function gt(t2) {
    return t2.hb = true, t2;
  }
  var vt = gt((t2) => "number" == typeof t2);
  var _t = gt((t2) => "string" == typeof t2);
  var yt = gt((t2) => "boolean" == typeof t2);
  var Et = "function" == typeof t.BigInt && "bigint" == typeof t.BigInt(0);
  function At(t2) {
    var e2 = t2;
    if (_t(e2)) {
      if (!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e2)) throw Error(String(e2));
    } else if (vt(e2) && !Number.isSafeInteger(e2)) throw Error(String(e2));
    return Et ? BigInt(t2) : t2 = yt(t2) ? t2 ? "1" : "0" : _t(t2) ? t2.trim() || "0" : String(t2);
  }
  var wt = gt((t2) => Et ? t2 >= bt && t2 <= St : "-" === t2[0] ? Lt(t2, Tt) : Lt(t2, kt));
  var Tt = Number.MIN_SAFE_INTEGER.toString();
  var bt = Et ? BigInt(Number.MIN_SAFE_INTEGER) : void 0;
  var kt = Number.MAX_SAFE_INTEGER.toString();
  var St = Et ? BigInt(Number.MAX_SAFE_INTEGER) : void 0;
  function Lt(t2, e2) {
    if (t2.length > e2.length) return false;
    if (t2.length < e2.length || t2 === e2) return true;
    for (let r2 = 0; r2 < t2.length; r2++) {
      let n2 = t2[r2], i2 = e2[r2];
      if (n2 > i2) return false;
      if (n2 < i2) return true;
    }
  }
  var xt;
  var Rt = "function" == typeof Uint8Array.prototype.slice;
  var It = 0;
  var Ft = 0;
  function Ct(t2) {
    var e2 = t2 >>> 0;
    It = e2, Ft = (t2 - e2) / 4294967296 >>> 0;
  }
  function Nt(t2) {
    if (t2 < 0) {
      Ct(-t2);
      let [e2, r2] = Gt(It, Ft);
      It = e2 >>> 0, Ft = r2 >>> 0;
    } else Ct(t2);
  }
  function Ot(t2) {
    var e2 = xt ||= new DataView(new ArrayBuffer(8));
    e2.setFloat32(0, +t2, true), Ft = 0, It = e2.getUint32(0, true);
  }
  function Mt(t2, e2) {
    var r2 = 4294967296 * e2 + (t2 >>> 0);
    return Number.isSafeInteger(r2) ? r2 : $t(t2, e2);
  }
  function Dt(t2, e2) {
    return At(U() ? BigInt.asUintN(64, (BigInt(e2 >>> 0) << BigInt(32)) + BigInt(t2 >>> 0)) : $t(t2, e2));
  }
  function Pt(t2, e2) {
    return U() ? At(BigInt.asIntN(64, (BigInt.asUintN(32, BigInt(e2)) << BigInt(32)) + BigInt.asUintN(32, BigInt(t2)))) : At(Bt(t2, e2));
  }
  function $t(t2, e2) {
    if (t2 >>>= 0, (e2 >>>= 0) <= 2097151) var r2 = "" + (4294967296 * e2 + t2);
    else U() ? r2 = "" + (BigInt(e2) << BigInt(32) | BigInt(t2)) : (t2 = (16777215 & t2) + 6777216 * (r2 = 16777215 & (t2 >>> 24 | e2 << 8)) + 6710656 * (e2 = e2 >> 16 & 65535), r2 += 8147497 * e2, e2 *= 2, t2 >= 1e7 && (r2 += t2 / 1e7 >>> 0, t2 %= 1e7), r2 >= 1e7 && (e2 += r2 / 1e7 >>> 0, r2 %= 1e7), r2 = e2 + Ut(r2) + Ut(t2));
    return r2;
  }
  function Ut(t2) {
    return t2 = String(t2), "0000000".slice(t2.length) + t2;
  }
  function Bt(t2, e2) {
    if (2147483648 & e2) if (U()) t2 = "" + (BigInt(0 | e2) << BigInt(32) | BigInt(t2 >>> 0));
    else {
      let [r2, n2] = Gt(t2, e2);
      t2 = "-" + $t(r2, n2);
    }
    else t2 = $t(t2, e2);
    return t2;
  }
  function jt(t2) {
    if (t2.length < 16) Nt(Number(t2));
    else if (U()) t2 = BigInt(t2), It = Number(t2 & BigInt(4294967295)) >>> 0, Ft = Number(t2 >> BigInt(32) & BigInt(4294967295));
    else {
      let e2 = +("-" === t2[0]);
      Ft = It = 0;
      let r2 = t2.length;
      for (let n2 = e2, i2 = (r2 - e2) % 6 + e2; i2 <= r2; n2 = i2, i2 += 6) {
        let e3 = Number(t2.slice(n2, i2));
        Ft *= 1e6, (It = 1e6 * It + e3) >= 4294967296 && (Ft += Math.trunc(It / 4294967296), Ft >>>= 0, It >>>= 0);
      }
      if (e2) {
        let [t3, e3] = Gt(It, Ft);
        It = t3, Ft = e3;
      }
    }
  }
  function Gt(t2, e2) {
    return e2 = ~e2, t2 ? t2 = 1 + ~t2 : e2 += 1, [t2, e2];
  }
  function Vt(t2) {
    return Array.prototype.slice.call(t2);
  }
  var Ht = "function" == typeof BigInt ? BigInt.asIntN : void 0;
  var Kt = "function" == typeof BigInt ? BigInt.asUintN : void 0;
  var Xt = Number.isSafeInteger;
  var Wt = Number.isFinite;
  var Yt = Math.trunc;
  var zt = At(0);
  function qt(t2) {
    if ("number" != typeof t2) throw Error(`Value of float/double field must be a number, found ${typeof t2}: ${t2}`);
    return t2;
  }
  function Jt(t2) {
    return null == t2 || "number" == typeof t2 ? t2 : "NaN" === t2 || "Infinity" === t2 || "-Infinity" === t2 ? Number(t2) : void 0;
  }
  function Zt(t2) {
    if ("boolean" != typeof t2) {
      var e2 = typeof t2;
      throw Error(`Expected boolean but got ${"object" != e2 ? e2 : t2 ? Array.isArray(t2) ? "array" : e2 : "null"}: ${t2}`);
    }
    return t2;
  }
  var Qt = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
  function te(t2) {
    switch (typeof t2) {
      case "bigint":
        return true;
      case "number":
        return Wt(t2);
      case "string":
        return Qt.test(t2);
      default:
        return false;
    }
  }
  function ee(t2) {
    if (null != t2) {
      if (!Wt(t2)) throw P("enum");
      t2 |= 0;
    }
    return t2;
  }
  function re(t2) {
    if (null == t2) return t2;
    if ("string" == typeof t2 && t2) t2 = +t2;
    else if ("number" != typeof t2) return;
    return Wt(t2) ? 0 | t2 : void 0;
  }
  function ne(t2) {
    if (null == t2) return t2;
    if ("string" == typeof t2 && t2) t2 = +t2;
    else if ("number" != typeof t2) return;
    return Wt(t2) ? t2 >>> 0 : void 0;
  }
  function ie(t2, e2) {
    if (e2 ??= 1024, !te(t2)) throw P("int64");
    var r2 = typeof t2;
    switch (e2) {
      case 512:
        switch (r2) {
          case "string":
            return ue(t2);
          case "bigint":
            return String(Ht(64, t2));
          default:
            return he(t2);
        }
      case 1024:
        switch (r2) {
          case "string":
            return ce(t2);
          case "bigint":
            return At(Ht(64, t2));
          default:
            return At(Xt(t2) ? t2 : he(t2));
        }
      case 0:
        switch (r2) {
          case "string":
            return ue(t2);
          case "bigint":
            return At(Ht(64, t2));
          default:
            return ae(t2);
        }
      default:
        return (function(t3, e3 = `unexpected value ${t3}!`) {
          throw Error(e3);
        })(e2, "Unknown format requested type for int64");
    }
  }
  function se(t2) {
    var e2 = t2.length;
    return ("-" === t2[0] ? e2 < 20 || 20 === e2 && t2 <= "-9223372036854775808" : e2 < 19 || 19 === e2 && t2 <= "9223372036854775807") ? t2 : (jt(t2), Bt(It, Ft));
  }
  function oe(t2) {
    if ("-" === t2[0]) var e2 = false;
    else e2 = (e2 = t2.length) < 20 || 20 === e2 && t2 <= "18446744073709551615";
    return e2 ? t2 : (jt(t2), $t(It, Ft));
  }
  function ae(t2) {
    if (t2 = Yt(t2), !Xt(t2)) {
      Nt(t2);
      var e2 = It, r2 = Ft;
      (t2 = 2147483648 & r2) && (r2 = ~r2 >>> 0, 0 == (e2 = 1 + ~e2 >>> 0) && (r2 = r2 + 1 >>> 0)), t2 = "number" == typeof (e2 = Mt(e2, r2)) ? t2 ? -e2 : e2 : t2 ? "-" + e2 : e2;
    }
    return t2;
  }
  function he(t2) {
    return t2 = Yt(t2), Xt(t2) ? t2 = String(t2) : (Nt(t2), t2 = Bt(It, Ft)), t2;
  }
  function ue(t2) {
    var e2 = Yt(Number(t2));
    return Xt(e2) ? String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), se(t2));
  }
  function ce(t2) {
    var e2 = Yt(Number(t2));
    return Xt(e2) ? At(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), U() ? At(Ht(64, BigInt(t2))) : At(se(t2)));
  }
  function le(t2) {
    var e2 = typeof t2;
    return null == t2 ? t2 : "bigint" === e2 ? At(Ht(64, t2)) : te(t2) ? "string" === e2 ? ce(t2) : At(Xt(t2) ? t2 : he(t2)) : void 0;
  }
  function de(t2) {
    if (null == t2) return t2;
    var e2 = typeof t2;
    if ("bigint" === e2) return String(Ht(64, t2));
    if (te(t2)) {
      if ("string" === e2) return ue(t2);
      if ("number" === e2) return ae(t2);
    }
  }
  function fe(t2) {
    if (null == t2) return t2;
    var e2 = typeof t2;
    if ("bigint" === e2) return String(Kt(64, t2));
    if (te(t2)) {
      if ("string" === e2) return e2 = Yt(Number(t2)), Xt(e2) && e2 >= 0 ? t2 = String(e2) : (-1 !== (e2 = t2.indexOf(".")) && (t2 = t2.substring(0, e2)), t2 = oe(t2)), t2;
      if ("number" === e2) return (function(t3) {
        return (t3 = Yt(t3)) >= 0 && Xt(t3) || (Nt(t3), t3 = Mt(It, Ft)), t3;
      })(t2);
    }
  }
  function pe(t2) {
    if (null == t2 || "string" == typeof t2 || t2 instanceof N) return t2;
  }
  function me(t2) {
    if ("string" != typeof t2) throw Error();
    return t2;
  }
  function ge(t2) {
    if (null != t2 && "string" != typeof t2) throw Error();
    return t2;
  }
  function ve(t2) {
    return null == t2 || "string" == typeof t2 ? t2 : void 0;
  }
  function _e(t2, e2, r2, n2) {
    return ht(t2) ? t2 : Array.isArray(t2) ? ((n2 = (r2 = 0 | t2[tt]) | 32 & n2 | 2 & n2) !== r2 && nt(t2, n2), new e2(t2)) : (r2 ? 2 & n2 ? ((t2 = e2[H]) || (it((t2 = new e2()).B), t2 = e2[H] = t2), e2 = t2) : e2 = new e2() : e2 = void 0, e2);
  }
  function ye(t2, e2, r2) {
    return e2 ? ie(t2, 1024) : le(t2) ?? (r2 ? zt : void 0);
  }
  function Ee(t2) {
    return t2;
  }
  var Ae = {};
  var we = (function() {
    try {
      return v(new class extends Map {
        constructor() {
          super();
        }
      }()), false;
    } catch {
      return true;
    }
  })();
  var Te = class {
    constructor() {
      this.h = /* @__PURE__ */ new Map();
    }
    get(t2) {
      return this.h.get(t2);
    }
    set(t2, e2) {
      return this.h.set(t2, e2), this.size = this.h.size, this;
    }
    delete(t2) {
      return t2 = this.h.delete(t2), this.size = this.h.size, t2;
    }
    clear() {
      this.h.clear(), this.size = this.h.size;
    }
    has(t2) {
      return this.h.has(t2);
    }
    entries() {
      return this.h.entries();
    }
    keys() {
      return this.h.keys();
    }
    values() {
      return this.h.values();
    }
    forEach(t2, e2) {
      return this.h.forEach(t2, e2);
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
  var be = we ? (Object.setPrototypeOf(Te.prototype, Map.prototype), Object.defineProperties(Te.prototype, { size: { value: 0, configurable: true, enumerable: true, writable: true } }), Te) : class extends Map {
    constructor() {
      super();
    }
  };
  function ke(t2) {
    return t2;
  }
  function Se(t2) {
    if (2 & t2.N) throw Error("Cannot mutate an immutable Map");
  }
  var Le;
  var xe = class extends be {
    constructor(t2, e2, r2 = ke, n2 = ke) {
      super(), this.N = 0 | t2[tt], this.O = e2, this.ca = r2, this.na = this.O ? Re : n2;
      for (let i2 = 0; i2 < t2.length; i2++) {
        let s2 = t2[i2], o2 = r2(s2[0], false, true), a2 = s2[1];
        e2 ? void 0 === a2 && (a2 = null) : a2 = n2(s2[1], false, true, void 0, void 0, this.N), super.set(o2, a2);
      }
    }
    fa(t2) {
      return st(Array.from(super.entries(), t2));
    }
    clear() {
      Se(this), super.clear();
    }
    delete(t2) {
      return Se(this), super.delete(this.ca(t2, true, false));
    }
    entries() {
      if (this.O) {
        var t2 = super.keys();
        t2 = new dt(t2, Ie, this);
      } else t2 = super.entries();
      return t2;
    }
    values() {
      if (this.O) {
        var t2 = super.keys();
        t2 = new dt(t2, xe.prototype.get, this);
      } else t2 = super.values();
      return t2;
    }
    forEach(t2, e2) {
      this.O ? super.forEach((r2, n2, i2) => {
        t2.call(e2, i2.get(n2), n2, i2);
      }) : super.forEach(t2, e2);
    }
    set(t2, e2) {
      return Se(this), null == (t2 = this.ca(t2, true, false)) ? this : null == e2 ? (super.delete(t2), this) : super.set(t2, this.na(e2, true, true, this.O, false, this.N));
    }
    fb(t2) {
      var e2 = this.ca(t2[0], false, true);
      t2 = t2[1], t2 = this.O ? void 0 === t2 ? null : t2 : this.na(t2, false, true, void 0, false, this.N), super.set(e2, t2);
    }
    has(t2) {
      return super.has(this.ca(t2, false, false));
    }
    get(t2) {
      t2 = this.ca(t2, false, false);
      var e2 = super.get(t2);
      if (void 0 !== e2) {
        var r2 = this.O;
        return r2 ? ((r2 = this.na(e2, false, true, r2, this.Fa, this.N)) !== e2 && super.set(t2, r2), r2) : e2;
      }
    }
    [Symbol.iterator]() {
      return this.entries();
    }
  };
  function Re(t2, e2, r2, n2, i2, s2) {
    return t2 = _e(t2, n2, r2, s2), i2 && (t2 = qe(t2)), t2;
  }
  function Ie(t2) {
    return [t2, this.get(t2)];
  }
  function Fe() {
    return Le ||= new xe(it([]), void 0, void 0, void 0, Ae);
  }
  function Ce(t2) {
    return X ? t2[X] : void 0;
  }
  function Ne(t2, e2) {
    for (let r2 in t2) !isNaN(r2) && e2(t2, +r2, t2[r2]);
  }
  xe.prototype.toJSON = void 0;
  var Oe;
  var Me;
  var De;
  var Pe = class {
  };
  function $e(t2, e2) {
    e2 < 100 || $(Y, 1);
  }
  function Ue(t2, e2, r2, n2) {
    var i2 = void 0 !== n2;
    n2 = !!n2;
    var s2, o2 = X;
    !i2 && B && o2 && (s2 = t2[o2]) && Ne(s2, $e), o2 = [];
    var a2 = t2.length;
    s2 = 4294967295;
    var h2 = false, u2 = !!(64 & e2), c2 = u2 ? 128 & e2 ? 0 : -1 : void 0;
    if (!(1 & e2)) {
      var l2 = a2 && t2[a2 - 1];
      null != l2 && "object" == typeof l2 && l2.constructor === Object ? s2 = --a2 : l2 = void 0, !u2 || 128 & e2 || i2 || (h2 = true, s2 = (Oe ?? Ee)(s2 - c2, c2, t2, l2, void 0) + c2);
    }
    e2 = void 0;
    for (var d2 = 0; d2 < a2; d2++) {
      let i3 = t2[d2];
      if (null != i3 && null != (i3 = r2(i3, n2))) if (u2 && d2 >= s2) {
        let t3 = d2 - c2;
        (e2 ??= {})[t3] = i3;
      } else o2[d2] = i3;
    }
    if (l2) for (let t3 in l2) {
      if (null == (a2 = l2[t3]) || null == (a2 = r2(a2, n2))) continue;
      let i3;
      d2 = +t3, u2 && !Number.isNaN(d2) && (i3 = d2 + c2) < s2 ? o2[i3] = a2 : (e2 ??= {})[t3] = a2;
    }
    return e2 && (h2 ? o2.push(e2) : o2[s2] = e2), i2 && (r2 = X) && (t2 = Ce(t2)) && t2 instanceof Pe && (o2[r2] = (function(t3) {
      var e3 = new Pe();
      return Ne(t3, (t4, r3, n3) => {
        e3[r3] = Vt(n3);
      }), e3.h = t3.h, e3;
    })(t2)), o2;
  }
  function Be(t2) {
    return t2[0] = je(t2[0]), t2[1] = je(t2[1]), t2;
  }
  function je(t2) {
    switch (typeof t2) {
      case "number":
        return Number.isFinite(t2) ? t2 : "" + t2;
      case "bigint":
        return wt(t2) ? Number(t2) : "" + t2;
      case "boolean":
        return t2 ? 1 : 0;
      case "object":
        if (Array.isArray(t2)) {
          var e2 = 0 | t2[tt];
          return 0 === t2.length && 1 & e2 ? void 0 : Ue(t2, e2, je);
        }
        if (ht(t2)) return Ge(t2);
        if (t2 instanceof N) {
          if (null == (e2 = t2.h)) t2 = "";
          else if ("string" == typeof e2) t2 = e2;
          else {
            if (T) {
              for (var r2 = "", n2 = 0, i2 = e2.length - 10240; n2 < i2; ) r2 += String.fromCharCode.apply(null, e2.subarray(n2, n2 += 10240));
              r2 += String.fromCharCode.apply(null, n2 ? e2.subarray(n2) : e2), e2 = btoa(r2);
            } else {
              void 0 === r2 && (r2 = 0), A(), r2 = _[r2], n2 = Array(Math.floor(e2.length / 3)), i2 = r2[64] || "";
              let t3 = 0, u2 = 0;
              for (; t3 < e2.length - 2; t3 += 3) {
                var s2 = e2[t3], o2 = e2[t3 + 1], a2 = e2[t3 + 2], h2 = r2[s2 >> 2];
                s2 = r2[(3 & s2) << 4 | o2 >> 4], o2 = r2[(15 & o2) << 2 | a2 >> 6], a2 = r2[63 & a2], n2[u2++] = h2 + s2 + o2 + a2;
              }
              switch (h2 = 0, a2 = i2, e2.length - t3) {
                case 2:
                  a2 = r2[(15 & (h2 = e2[t3 + 1])) << 2] || i2;
                case 1:
                  e2 = e2[t3], n2[u2] = r2[e2 >> 2] + r2[(3 & e2) << 4 | h2 >> 4] + a2 + i2;
              }
              e2 = n2.join("");
            }
            t2 = t2.h = e2;
          }
          return t2;
        }
        return t2 instanceof xe ? t2 = 0 !== t2.size ? t2.fa(Be) : void 0 : void 0;
    }
    return t2;
  }
  function Ge(t2) {
    return Ue(t2 = t2.B, 0 | t2[tt], je);
  }
  function Ve(t2, e2) {
    return He(t2, e2[0], e2[1]);
  }
  function He(t2, e2, r2, n2 = 0) {
    if (null == t2) {
      var i2 = 32;
      r2 ? (t2 = [r2], i2 |= 128) : t2 = [], e2 && (i2 = -16760833 & i2 | (1023 & e2) << 14);
    } else {
      if (!Array.isArray(t2)) throw Error("narr");
      if (i2 = 0 | t2[tt], o && 1 & i2) throw Error("rfarr");
      if (2048 & i2 && !(2 & i2) && (function() {
        if (o) throw Error("carr");
        $(q, 5);
      })(), 256 & i2) throw Error("farr");
      if (64 & i2) return (i2 | n2) !== i2 && nt(t2, i2 | n2), t2;
      if (r2 && (i2 |= 128, r2 !== t2[0])) throw Error("mid");
      t: {
        i2 |= 64;
        var s2 = (r2 = t2).length;
        if (s2) {
          var a2 = s2 - 1;
          let t3 = r2[a2];
          if (null != t3 && "object" == typeof t3 && t3.constructor === Object) {
            if ((a2 -= e2 = 128 & i2 ? 0 : -1) >= 1024) throw Error("pvtlmt");
            for (var h2 in t3) (s2 = +h2) < a2 && (r2[s2 + e2] = t3[h2], delete t3[h2]);
            i2 = -16760833 & i2 | (1023 & a2) << 14;
            break t;
          }
        }
        if (e2) {
          if ((h2 = Math.max(e2, s2 - (128 & i2 ? 0 : -1))) > 1024) throw Error("spvt");
          i2 = -16760833 & i2 | (1023 & h2) << 14;
        }
      }
    }
    return nt(t2, 64 | i2 | n2), t2;
  }
  function Ke(t2, e2) {
    if ("object" != typeof t2) return t2;
    if (Array.isArray(t2)) {
      var r2 = 0 | t2[tt];
      return 0 === t2.length && 1 & r2 ? void 0 : Xe(t2, r2, e2);
    }
    if (ht(t2)) return Ye(t2);
    if (t2 instanceof xe) {
      if (2 & (e2 = t2.N)) return t2;
      if (!t2.size) return;
      if (r2 = it(t2.fa()), t2.O) for (t2 = 0; t2 < r2.length; t2++) {
        let n2 = r2[t2], i2 = n2[1];
        i2 = null == i2 || "object" != typeof i2 ? void 0 : ht(i2) ? Ye(i2) : Array.isArray(i2) ? Xe(i2, 0 | i2[tt], !!(32 & e2)) : void 0, n2[1] = i2;
      }
      return r2;
    }
    return t2 instanceof N ? t2 : void 0;
  }
  function Xe(t2, e2, r2) {
    return 2 & e2 || (!r2 || 4096 & e2 || 16 & e2 ? t2 = ze(t2, e2, false, r2 && !(16 & e2)) : (rt(t2, 34), 4 & e2 && Object.freeze(t2))), t2;
  }
  function We(t2, e2, r2) {
    return t2 = new t2.constructor(e2), r2 && (t2.i = ct), t2.o = ct, t2;
  }
  function Ye(t2) {
    var e2 = t2.B, r2 = 0 | e2[tt];
    return ut(t2, r2) ? t2 : tr(t2, e2, r2) ? We(t2, e2) : ze(e2, r2);
  }
  function ze(t2, e2, r2, n2) {
    return n2 ??= !!(34 & e2), t2 = Ue(t2, e2, Ke, n2), n2 = 32, r2 && (n2 |= 2), nt(t2, e2 = 16769217 & e2 | n2), t2;
  }
  function qe(t2) {
    var e2 = t2.B, r2 = 0 | e2[tt];
    return ut(t2, r2) ? tr(t2, e2, r2) ? We(t2, e2, true) : new t2.constructor(ze(e2, r2, false)) : t2;
  }
  function Je(t2) {
    if (t2.i !== ct) return false;
    var e2 = t2.B;
    return rt(e2 = ze(e2, 0 | e2[tt]), 2048), t2.B = e2, t2.i = void 0, t2.o = void 0, true;
  }
  function Ze(t2) {
    if (!Je(t2) && ut(t2, 0 | t2.B[tt])) throw Error();
  }
  function Qe(t2, e2) {
    void 0 === e2 && (e2 = 0 | t2[tt]), 32 & e2 && !(4096 & e2) && nt(t2, 4096 | e2);
  }
  function tr(t2, e2, r2) {
    return !!(2 & r2) || !(!(32 & r2) || 4096 & r2) && (nt(e2, 2 | r2), t2.i = ct, true);
  }
  var er = At(0);
  var rr = {};
  function nr(t2, e2, r2, n2) {
    if (null !== (e2 = ir(t2.B, e2, void 0, n2)) || r2 && t2.o !== ct) return e2;
  }
  function ir(t2, e2, r2, n2) {
    if (-1 === e2) return null;
    var i2 = e2 + (r2 ? 0 : -1), s2 = t2.length - 1;
    if (!(s2 < 1 + (r2 ? 0 : -1))) {
      if (i2 >= s2) {
        var o2 = t2[s2];
        if (null != o2 && "object" == typeof o2 && o2.constructor === Object) {
          r2 = o2[e2];
          var a2 = true;
        } else {
          if (i2 !== s2) return;
          r2 = o2;
        }
      } else r2 = t2[i2];
      if (n2 && null != r2) {
        if (null == (n2 = n2(r2))) return n2;
        if (!Object.is(n2, r2)) return a2 ? o2[e2] = n2 : t2[i2] = n2, n2;
      }
      return r2;
    }
  }
  function sr(t2, e2, r2, n2) {
    Ze(t2);
    var i2 = t2.B;
    return or(i2, 0 | i2[tt], e2, r2, n2), t2;
  }
  function or(t2, e2, r2, n2, i2) {
    var s2 = r2 + (i2 ? 0 : -1), o2 = t2.length - 1;
    if (o2 >= 1 + (i2 ? 0 : -1) && s2 >= o2) {
      let i3 = t2[o2];
      if (null != i3 && "object" == typeof i3 && i3.constructor === Object) return i3[r2] = n2, e2;
    }
    return s2 <= o2 ? (t2[s2] = n2, e2) : (void 0 !== n2 && (r2 >= (o2 = (e2 ??= 0 | t2[tt]) >> 14 & 1023 || 536870912) ? null != n2 && (t2[o2 + (i2 ? 0 : -1)] = { [r2]: n2 }) : t2[s2] = n2), e2);
  }
  function ar(t2, e2) {
    return ht(t2 = ir(t2.B, e2)) || Array.isArray(t2);
  }
  function hr(t2, e2, r2) {
    return ar(t2, e2 = vr(t2, r2) === e2 ? e2 : -1);
  }
  function ur(t2, e2, r2, n2, i2) {
    var s2 = t2.B, o2 = 0 | s2[tt];
    n2 = n2 && 4 !== n2 ? 1 !== n2 && (t2 ? ut(t2, o2) : 2 & o2) ? 1 : n2 : 4, i2 = !!i2 || 3 === n2, 2 === n2 && Je(t2) && (o2 = 0 | (s2 = t2.B)[tt]);
    var a2 = (t2 = lr(s2, e2)) === G ? 7 : 0 | t2[tt], h2 = ot(a2, o2), u2 = !(4 & h2);
    if (u2) {
      let e3 = 0, n3 = 0;
      for (; e3 < t2.length; e3++) {
        let i3 = r2(t2[e3]);
        null != i3 && (t2[n3++] = i3);
      }
      n3 < e3 && (t2.length = n3), r2 = -513 & h2 | 4, h2 = r2 &= -1025, h2 &= -4097;
    }
    return h2 !== a2 && (nt(t2, h2), 2 & h2 && Object.freeze(t2)), cr(t2, h2, s2, o2, e2, n2, u2, i2);
  }
  function cr(t2, e2, r2, n2, i2, s2, o2, a2) {
    var h2 = e2, u2 = dr(e2);
    return u2 && 2 === s2 && (t2 = Vt(t2), h2 = 0, e2 = Ir(e2, n2), n2 = or(r2, n2, i2, t2), u2 = false), u2 || (1 === s2 || 4 === s2 && (2 & e2 || !(16 & e2) && 32 & n2) ? ((e2 |= !t2.length || o2 && !(4096 & e2) || 32 & n2 && !(4096 & e2 || 16 & e2) ? 2 : 256) !== h2 && nt(t2, e2), Object.freeze(t2)) : (a2 || (e2 |= 16), e2 !== h2 && nt(t2, e2))), 2 & e2 || !(4096 & e2 || 16 & e2) || Qe(r2, n2), t2;
  }
  function lr(t2, e2, r2) {
    return t2 = ir(t2, e2, r2), Array.isArray(t2) ? t2 : G;
  }
  function dr(t2) {
    return !!(2 & t2) && !!(4 & t2) || !!(256 & t2);
  }
  function fr(t2) {
    return lt(t2, true);
  }
  function pr(t2) {
    t2 = Vt(t2);
    for (let e2 = 0; e2 < t2.length; e2++) {
      let r2 = t2[e2] = Vt(t2[e2]);
      Array.isArray(r2[1]) && (r2[1] = it(r2[1]));
    }
    return st(t2);
  }
  function mr(t2, e2, r2, n2) {
    Ze(t2), or(t2 = t2.B, 0 | t2[tt], e2, ("0" === n2 ? 0 === Number(r2) : r2 === n2) ? void 0 : r2);
  }
  function gr(t2, e2, r2) {
    if (2 & e2) throw Error();
    var n2 = mt(e2), i2 = lr(t2, r2, n2), s2 = i2 === G ? 7 : 0 | i2[tt], o2 = ot(s2, e2);
    return (2 & o2 || dr(o2) || 16 & o2) && (o2 === s2 || dr(o2) || nt(i2, o2), i2 = Vt(i2), s2 = 0, o2 = Ir(o2, e2), or(t2, e2, r2, i2, n2)), (o2 &= -13) !== s2 && nt(i2, o2), i2;
  }
  function vr(t2, e2) {
    return Er(_r(t2 = t2.B), t2, void 0, e2);
  }
  function _r(t2) {
    if (B) return t2[K] ?? (t2[K] = /* @__PURE__ */ new Map());
    if (K in t2) return t2[K];
    var e2 = /* @__PURE__ */ new Map();
    return Object.defineProperty(t2, K, { value: e2 }), e2;
  }
  function yr(t2, e2, r2, n2, i2) {
    var s2 = _r(t2), o2 = Er(s2, t2, e2, r2, i2);
    return o2 !== n2 && (o2 && (e2 = or(t2, e2, o2, void 0, i2)), s2.set(r2, n2)), e2;
  }
  function Er(t2, e2, r2, n2, i2) {
    var s2 = t2.get(n2);
    if (null != s2) return s2;
    s2 = 0;
    for (let t3 = 0; t3 < n2.length; t3++) {
      let o2 = n2[t3];
      null != ir(e2, o2, i2) && (0 !== s2 && (r2 = or(e2, r2, s2, void 0, i2)), s2 = o2);
    }
    return t2.set(n2, s2), s2;
  }
  function Ar(t2, e2, r2) {
    var n2 = 0 | t2[tt], i2 = mt(n2), s2 = ir(t2, r2, i2);
    if (ht(s2)) {
      if (!ut(s2)) return Je(s2), s2.B;
      var o2 = s2.B;
    } else Array.isArray(s2) && (o2 = s2, 2 & n2 && it(o2));
    if (o2) {
      let t3 = 0 | o2[tt];
      2 & t3 && (o2 = ze(o2, t3));
    }
    return (o2 = Ve(o2, e2)) !== s2 && or(t2, n2, r2, o2, i2), o2;
  }
  function wr(t2, e2, r2, n2, i2) {
    var s2 = false;
    if (n2 = (function(t3, e3, r3, n3) {
      return ir(t3, e3, r3, n3);
    })(t2, n2, i2, (t3) => {
      var n3 = _e(t3, r2, false, e2);
      return s2 = n3 !== t3 && null != n3, n3;
    }), null != n2) return s2 && !ut(n2) && Qe(t2, e2), n2;
  }
  function Tr(t2, e2, r2, n2) {
    var i2 = t2.B, s2 = 0 | i2[tt];
    if (null == (e2 = wr(i2, s2, e2, r2, n2))) return e2;
    if (!ut(t2, s2 = 0 | i2[tt])) {
      let o2 = qe(e2);
      o2 !== e2 && (Je(t2) && (s2 = 0 | (i2 = t2.B)[tt]), Qe(i2, s2 = or(i2, s2, r2, e2 = o2, n2)));
    }
    return e2;
  }
  function br(t2, e2, r2, n2, i2, s2, o2, a2) {
    s2 = s2 && 4 !== s2 ? 1 !== s2 && (t2 ? ut(t2, r2) : 2 & r2) ? 1 : s2 : 4, o2 = !!o2 || 3 === s2;
    var h2 = !!a2 && !(t2 ? ut(t2, r2) : 2 & r2);
    (2 === s2 || h2) && t2 && Je(t2) && (r2 = 0 | (e2 = t2.B)[tt]);
    var u2 = (t2 = lr(e2, i2)) === G ? 7 : 0 | t2[tt], c2 = ot(u2, r2);
    if (a2 = !(4 & c2)) {
      var l2 = t2, d2 = r2;
      let e3 = !!(2 & c2);
      e3 && (d2 |= 2);
      let i3 = !e3, s3 = true, o3 = 0, a3 = 0;
      for (; o3 < l2.length; o3++) {
        let t3 = _e(l2[o3], n2, false, d2);
        if (t3 instanceof n2) {
          if (!e3) {
            let e4 = ut(t3);
            i3 &&= !e4, s3 &&= e4;
          }
          l2[a3++] = t3;
        }
      }
      a3 < o3 && (l2.length = a3), c2 |= 4, c2 = s3 ? -4097 & c2 : 4096 | c2, c2 = i3 ? 8 | c2 : -9 & c2;
    }
    if (c2 !== u2 && (nt(t2, c2), 2 & c2 && Object.freeze(t2)), h2 && !(8 & c2 || !t2.length && (1 === s2 || 4 === s2 && (2 & c2 || !(16 & c2) && 32 & r2)))) {
      for (dr(c2) && (t2 = Vt(t2), c2 = Ir(c2, r2), r2 = or(e2, r2, i2, t2)), n2 = t2, h2 = c2, u2 = 0; u2 < n2.length; u2++) (l2 = n2[u2]) !== (c2 = qe(l2)) && (n2[u2] = c2);
      h2 |= 8, nt(t2, c2 = h2 = n2.length ? 4096 | h2 : -4097 & h2);
    }
    return cr(t2, c2, e2, r2, i2, s2, a2, o2);
  }
  function kr(t2, e2, r2) {
    var n2 = t2.B;
    return br(t2, n2, 0 | n2[tt], e2, r2, void 0, false, true);
  }
  function Sr(t2) {
    return null == t2 && (t2 = void 0), t2;
  }
  function Lr(t2, e2, r2, n2, i2) {
    return sr(t2, r2, n2 = Sr(n2), i2), n2 && !ut(n2) && Qe(t2.B), t2;
  }
  function xr(t2, e2, r2, n2) {
    t: {
      var i2 = n2 = Sr(n2);
      Ze(t2);
      let s2 = t2.B, o2 = 0 | s2[tt];
      if (null == i2) {
        let t3 = _r(s2);
        if (Er(t3, s2, o2, r2) !== e2) break t;
        t3.set(r2, 0);
      } else o2 = yr(s2, o2, r2, e2);
      or(s2, o2, e2, i2);
    }
    return n2 && !ut(n2) && Qe(t2.B), t2;
  }
  function Rr(t2, e2, r2) {
    Ze(t2);
    var n2 = t2.B, i2 = 0 | n2[tt];
    if (null == r2) or(n2, i2, e2);
    else {
      var s2 = r2 === G ? 7 : 0 | r2[tt], o2 = s2, a2 = dr(s2), h2 = a2 || Object.isFrozen(r2), u2 = true, c2 = true;
      for (let t3 = 0; t3 < r2.length; t3++) {
        var l2 = r2[t3];
        a2 || (l2 = ut(l2), u2 &&= !l2, c2 &&= l2);
      }
      a2 || (s2 = u2 ? 13 : 5, s2 = c2 ? -4097 & s2 : 4096 | s2), h2 && s2 === o2 || (r2 = Vt(r2), o2 = 0, s2 = Ir(s2, i2)), s2 !== o2 && nt(r2, s2), i2 = or(n2, i2, e2, r2), 2 & s2 || !(4096 & s2 || 16 & s2) || Qe(n2, i2);
    }
    return t2;
  }
  function Ir(t2, e2) {
    return -273 & (2 & e2 ? 2 | t2 : -3 & t2);
  }
  function Fr(t2, e2, r2, n2) {
    Ze(t2);
    var i2 = t2.B;
    t2 = br(t2, i2, 0 | i2[tt], r2, e2, 2, true), n2 = null != n2 ? n2 : new r2(), t2.push(n2), e2 = r2 = t2 === G ? 7 : 0 | t2[tt], (n2 = ut(n2)) ? (r2 &= -9, 1 === t2.length && (r2 &= -4097)) : r2 |= 4096, r2 !== e2 && nt(t2, r2), n2 || Qe(i2);
  }
  function Cr(t2, e2, r2) {
    return re(nr(t2, e2, r2));
  }
  function Nr(t2, e2) {
    return nr(t2, e2, void 0, Jt) ?? 0;
  }
  function Or(t2, e2, r2, n2) {
    return Tr(t2, e2, r2 = vr(t2, n2) === r2 ? r2 : -1, void 0);
  }
  function Mr(t2, e2) {
    mr(t2, 3, null == e2 ? e2 : Zt(e2), false);
  }
  function Dr(t2, e2, r2) {
    if (null != r2) {
      if ("number" != typeof r2) throw P("int32");
      if (!Wt(r2)) throw P("int32");
      r2 |= 0;
    }
    sr(t2, e2, r2);
  }
  function Pr(t2, e2, r2) {
    return sr(t2, e2, null == r2 ? r2 : ie(r2));
  }
  function $r(t2, e2, r2) {
    return sr(t2, e2, null == r2 ? r2 : (function(t3) {
      if (!te(t3)) throw P("uint64");
      switch (typeof t3) {
        case "string":
          var e3 = Yt(Number(t3));
          return Xt(e3) && e3 >= 0 ? t3 = At(e3) : (-1 !== (e3 = t3.indexOf(".")) && (t3 = t3.substring(0, e3)), t3 = U() ? At(Kt(64, BigInt(t3))) : At(oe(t3))), t3;
        case "bigint":
          return At(Kt(64, t3));
        default:
          return t3 >= 0 && Xt(t3) || ((t3 = Yt(t3)) >= 0 && Xt(t3) ? t3 = String(t3) : (Nt(t3), t3 = $t(It, Ft))), At(t3);
      }
    })(r2));
  }
  function Ur(t2, e2, r2) {
    sr(t2, e2, null == r2 ? r2 : qt(r2));
  }
  function Br(t2, e2, r2) {
    mr(t2, e2, null == r2 ? r2 : qt(r2), 0);
  }
  function jr(t2, e2, r2) {
    mr(t2, e2, ge(r2), "");
  }
  function Gr(t2, e2, r2) {
    {
      Ze(t2);
      let o2 = t2.B, a2 = 0 | o2[tt];
      if (null == r2) or(o2, a2, e2);
      else {
        var n2 = t2 = r2 === G ? 7 : 0 | r2[tt], i2 = dr(t2), s2 = i2 || Object.isFrozen(r2);
        for (i2 || (t2 = 0), s2 || (r2 = Vt(r2), n2 = 0, t2 = Ir(t2, a2), s2 = false), t2 |= 5, t2 |= (4 & t2 ? 512 & t2 ? 512 : 1024 & t2 ? 1024 : 0 : void 0) ?? 1024, i2 = 0; i2 < r2.length; i2++) {
          let e3 = r2[i2], o3 = me(e3);
          Object.is(e3, o3) || (s2 && (r2 = Vt(r2), n2 = 0, t2 = Ir(t2, a2), s2 = false), r2[i2] = o3);
        }
        t2 !== n2 && (s2 && (r2 = Vt(r2), t2 = Ir(t2, a2)), nt(r2, t2)), or(o2, a2, e2, r2);
      }
    }
  }
  function Vr(t2, e2, r2) {
    Ze(t2), ur(t2, e2, ve, 2, true).push(me(r2));
  }
  var Hr = class {
    constructor(t2, e2, r2) {
      if (this.buffer = t2, r2 && !e2) throw Error();
      this.h = e2;
    }
  };
  function Kr(t2, e2) {
    if ("string" == typeof t2) return new Hr(L(t2), e2);
    if (Array.isArray(t2)) return new Hr(new Uint8Array(t2), e2);
    if (t2.constructor === Uint8Array) return new Hr(t2, false);
    if (t2.constructor === ArrayBuffer) return t2 = new Uint8Array(t2), new Hr(t2, false);
    if (t2.constructor === N) return e2 = F(t2) || new Uint8Array(0), new Hr(e2, true, t2);
    if (t2 instanceof Uint8Array) return t2 = t2.constructor === Uint8Array ? t2 : new Uint8Array(t2.buffer, t2.byteOffset, t2.byteLength), new Hr(t2, false);
    throw Error();
  }
  function Xr(t2, e2) {
    var r2 = 0, n2 = 0, i2 = 0, s2 = t2.i, o2 = t2.h;
    do {
      var a2 = s2[o2++];
      r2 |= (127 & a2) << i2, i2 += 7;
    } while (i2 < 32 && 128 & a2);
    if (i2 > 32) for (n2 |= (127 & a2) >> 4, i2 = 3; i2 < 32 && 128 & a2; i2 += 7) n2 |= (127 & (a2 = s2[o2++])) << i2;
    if (tn(t2, o2), !(128 & a2)) return e2(r2 >>> 0, n2 >>> 0);
    throw Error();
  }
  function Wr(t2) {
    for (var e2 = 0, r2 = t2.h, n2 = r2 + 10, i2 = t2.i; r2 < n2; ) {
      let n3 = i2[r2++];
      if (e2 |= n3, !(128 & n3)) return tn(t2, r2), !!(127 & e2);
    }
    throw Error();
  }
  function Yr(t2) {
    var e2 = t2.i, r2 = t2.h, n2 = e2[r2++], i2 = 127 & n2;
    if (128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 7, 128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 14, 128 & n2 && (i2 |= (127 & (n2 = e2[r2++])) << 21, 128 & n2 && (i2 |= (n2 = e2[r2++]) << 28, 128 & n2 && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++] && 128 & e2[r2++]))))) throw Error();
    return tn(t2, r2), i2;
  }
  function zr(t2) {
    return Yr(t2) >>> 0;
  }
  function qr(t2) {
    return Xr(t2, Pt);
  }
  function Jr(t2) {
    var e2 = t2.i, r2 = t2.h, n2 = e2[r2], i2 = e2[r2 + 1], s2 = e2[r2 + 2];
    return e2 = e2[r2 + 3], tn(t2, t2.h + 4), (n2 | i2 << 8 | s2 << 16 | e2 << 24) >>> 0;
  }
  function Zr(t2) {
    var e2 = Jr(t2);
    t2 = 2 * (e2 >> 31) + 1;
    var r2 = e2 >>> 23 & 255;
    return e2 &= 8388607, 255 == r2 ? e2 ? NaN : t2 * (1 / 0) : 0 == r2 ? 1401298464324817e-60 * t2 * e2 : t2 * Math.pow(2, r2 - 150) * (e2 + 8388608);
  }
  function Qr(t2) {
    return Yr(t2);
  }
  function tn(t2, e2) {
    if (t2.h = e2, e2 > t2.l) throw Error();
  }
  function en(t2, e2) {
    if (e2 < 0) throw Error();
    var r2 = t2.h;
    if ((e2 = r2 + e2) > t2.l) throw Error();
    return t2.h = e2, r2;
  }
  function rn(t2, e2) {
    if (0 == e2) return I();
    var r2 = en(t2, e2);
    return t2.ga && t2.u ? r2 = t2.i.subarray(r2, r2 + e2) : (t2 = t2.i, r2 = r2 === (e2 = r2 + e2) ? new Uint8Array(0) : Rt ? t2.slice(r2, e2) : new Uint8Array(t2.subarray(r2, e2))), 0 == r2.length ? I() : new N(r2, R);
  }
  var nn = class {
    constructor(t2, e2, r2, n2) {
      this.i = null, this.u = false, this.h = this.l = this.o = 0, this.init(t2, e2, r2, n2);
    }
    init(t2, e2, r2, { ga: n2 = false, ma: i2 = false } = {}) {
      this.ga = n2, this.ma = i2, t2 && (t2 = Kr(t2, this.ma), this.i = t2.buffer, this.u = t2.h, this.o = e2 || 0, this.l = void 0 !== r2 ? this.o + r2 : this.i.length, this.h = this.o);
    }
    clear() {
      this.i = null, this.u = false, this.h = this.l = this.o = 0, this.ga = false;
    }
  };
  var sn = [];
  var on = 0;
  function an(t2, e2, r2, n2) {
    if (vn.length) {
      let i2 = vn.pop();
      return i2.A(n2), i2.h.init(t2, e2, r2, n2), i2;
    }
    return new gn(t2, e2, r2, n2);
  }
  function hn(t2) {
    t2.h.clear(), t2.l = -1, t2.i = -1, vn.length < 100 && vn.push(t2);
  }
  function un(t2) {
    var e2 = t2.h;
    if (e2.h == e2.l) return false;
    t2.o = t2.h.h;
    var r2 = zr(t2.h);
    if (e2 = r2 >>> 3, !((r2 &= 7) >= 0 && r2 <= 5)) throw Error();
    if (e2 < 1) throw Error();
    return t2.l = e2, t2.i = r2, true;
  }
  function cn(t2) {
    try {
      switch (t2.i) {
        case 0:
          0 != t2.i ? cn(t2) : Wr(t2.h);
          break;
        case 1:
          var e2 = t2.h;
          tn(e2, e2.h + 8);
          break;
        case 2:
          if (2 != t2.i) cn(t2);
          else {
            var r2 = zr(t2.h), n2 = t2.h;
            tn(n2, n2.h + r2);
          }
          break;
        case 5:
          var i2 = t2.h;
          tn(i2, i2.h + 4);
          break;
        case 3:
          ln();
          let s2 = t2.l;
          try {
            for (; ; ) {
              if (!un(t2)) throw Error();
              if (4 == t2.i) {
                if (t2.l != s2) throw Error();
                break;
              }
              cn(t2);
            }
          } catch (t3) {
            if (t3 instanceof RangeError) throw new SyntaxError();
            throw t3;
          } finally {
            on > 0 && on--;
          }
          break;
        default:
          throw Error();
      }
    } catch (t3) {
      if (t3 instanceof RangeError) throw new SyntaxError();
      throw t3;
    }
  }
  function ln() {
    if (on >= 100) throw new SyntaxError();
    on++;
  }
  function dn(t2, e2, r2) {
    var n2 = t2.h.l, i2 = zr(t2.h), s2 = (i2 = t2.h.h + i2) - n2;
    if (s2 <= 0 && (t2.h.l = i2, r2(e2, t2, void 0, void 0, void 0), s2 = i2 - t2.h.h), s2) throw Error();
    return t2.h.h = i2, t2.h.l = n2, e2;
  }
  function fn(t2) {
    var e2 = zr(t2.h), s2 = en(t2 = t2.h, e2);
    if (t2 = t2.i, u) {
      var o2, a2 = t2;
      (o2 = i) || (o2 = i = new TextDecoder("utf-8", { fatal: true })), e2 = s2 + e2, a2 = 0 === s2 && e2 === a2.length ? a2 : a2.subarray(s2, e2);
      try {
        var c2 = o2.decode(a2);
      } catch (t3) {
        if (void 0 === h) {
          try {
            o2.decode(new Uint8Array([128]));
          } catch (t4) {
          }
          try {
            o2.decode(new Uint8Array([97])), h = true;
          } catch (t4) {
            h = false;
          }
        }
        throw !h && (i = void 0), t3;
      }
    } else {
      e2 = (c2 = s2) + e2, s2 = [];
      let i2, h2 = null;
      for (; c2 < e2; ) {
        var l2 = t2[c2++];
        l2 < 128 ? s2.push(l2) : l2 < 224 ? c2 >= e2 ? r() : (i2 = t2[c2++], l2 < 194 || 128 != (192 & i2) ? (c2--, r()) : s2.push((31 & l2) << 6 | 63 & i2)) : l2 < 240 ? c2 >= e2 - 1 ? r() : (i2 = t2[c2++], 128 != (192 & i2) || 224 === l2 && i2 < 160 || 237 === l2 && i2 >= 160 || 128 != (192 & (o2 = t2[c2++])) ? (c2--, r()) : s2.push((15 & l2) << 12 | (63 & i2) << 6 | 63 & o2)) : l2 <= 244 ? c2 >= e2 - 2 ? r() : (i2 = t2[c2++], 128 != (192 & i2) || i2 - 144 + (l2 << 28) >> 30 || 128 != (192 & (o2 = t2[c2++])) || 128 != (192 & (a2 = t2[c2++])) ? (c2--, r()) : (l2 = (7 & l2) << 18 | (63 & i2) << 12 | (63 & o2) << 6 | 63 & a2, l2 -= 65536, s2.push(55296 + (l2 >> 10 & 1023), 56320 + (1023 & l2)))) : r(), s2.length >= 8192 && (h2 = n(h2, s2), s2.length = 0);
      }
      c2 = n(h2, s2);
    }
    return c2;
  }
  function pn(t2) {
    var e2 = zr(t2.h);
    return rn(t2.h, e2);
  }
  function mn(t2, e2, r2) {
    var n2 = zr(t2.h);
    for (n2 = t2.h.h + n2; t2.h.h < n2; ) r2.push(e2(t2.h));
  }
  var gn = class {
    constructor(t2, e2, r2, n2) {
      if (sn.length) {
        let i2 = sn.pop();
        i2.init(t2, e2, r2, n2), t2 = i2;
      } else t2 = new nn(t2, e2, r2, n2);
      this.h = t2, this.o = this.h.h, this.i = this.l = -1, this.A(n2);
    }
    A({ ra: t2 = false } = {}) {
      this.ra = t2;
    }
  };
  var vn = [];
  function _n(t2) {
    return new An(4294967295 & t2, Math.floor(t2 / 4294967296));
  }
  function yn(t2) {
    return t2 ? /^\d+$/.test(t2) ? (jt(t2), new An(It, Ft)) : null : En ||= new An(0, 0);
  }
  var En;
  var An = class {
    constructor(t2, e2) {
      this.i = t2 >>> 0, this.h = e2 >>> 0;
    }
  };
  function wn(t2) {
    return new Cn(4294967295 & t2, Math.floor(t2 / 4294967296));
  }
  function Tn(t2) {
    return t2 ? /^-?\d+$/.test(t2) ? (jt(t2), new Cn(It, Ft)) : null : bn ||= new Cn(0, 0);
  }
  var bn;
  var kn;
  var Sn;
  var Ln;
  var xn;
  var Rn;
  var In;
  var Fn;
  var Cn = class {
    constructor(t2, e2) {
      this.i = t2 >>> 0, this.h = e2 >>> 0;
    }
  };
  function Nn(t2, e2, r2) {
    return "undefined" != typeof BigInt64Array ? (In || (In = new BigInt64Array(1), Fn = new Uint32Array(In.buffer), In[0] = BigInt(1), Rn = 1 === Fn[0]), In[0] = t2, new e2(Fn[t2 = Rn ? 0 : 1], Fn[1 - t2])) : (xn || (kn = BigInt(Number.MIN_SAFE_INTEGER), Sn = BigInt(Number.MAX_SAFE_INTEGER), Ln = BigInt(4294967295), xn = BigInt(32)), t2 >= kn && t2 <= Sn ? r2(Number(t2)) : (t2 = BigInt.asUintN(64, t2), new e2(Number(t2 & Ln), Number(t2 >> xn))));
  }
  function On(t2, e2, r2) {
    for (; r2 > 0 || e2 > 127; ) t2.h.push(127 & e2 | 128), e2 = (e2 >>> 7 | r2 << 25) >>> 0, r2 >>>= 7;
    t2.h.push(e2);
  }
  function Mn(t2, e2) {
    for (; e2 > 127; ) t2.h.push(127 & e2 | 128), e2 >>>= 7;
    t2.h.push(e2);
  }
  function Dn(t2, e2) {
    if (e2 >= 0) Mn(t2, e2);
    else {
      for (let r2 = 0; r2 < 9; r2++) t2.h.push(127 & e2 | 128), e2 >>= 7;
      t2.h.push(1);
    }
  }
  function Pn(t2, e2) {
    jt(e2), (function(t3) {
      var e3 = Ft >> 31;
      t3(It << 1 ^ e3, (Ft << 1 | It >>> 31) ^ e3);
    })((e3, r2) => {
      On(t2, e3 >>> 0, r2 >>> 0);
    });
  }
  function $n(t2, e2) {
    t2.h.push(e2 >>> 0 & 255), t2.h.push(e2 >>> 8 & 255), t2.h.push(e2 >>> 16 & 255), t2.h.push(e2 >>> 24 & 255);
  }
  var Un = class {
    constructor() {
      this.h = [];
    }
    length() {
      return this.h.length;
    }
    end() {
      var t2 = this.h;
      return this.h = [], t2;
    }
  };
  function Bn(t2, e2) {
    0 !== e2.length && (t2.l.push(e2), t2.i += e2.length);
  }
  function jn(t2, e2, r2) {
    Mn(t2.h, 8 * e2 + r2);
  }
  function Gn(t2, e2) {
    return jn(t2, e2, 2), e2 = t2.h.end(), Bn(t2, e2), e2.push(t2.i), e2;
  }
  function Vn(t2, e2) {
    var r2 = e2.pop();
    for (r2 = t2.i + t2.h.length() - r2; r2 > 127; ) e2.push(127 & r2 | 128), r2 >>>= 7, t2.i++;
    e2.push(r2), t2.i++;
  }
  function Hn(t2, e2, r2) {
    if (null != r2) switch (jn(t2, e2, 0), typeof r2) {
      case "number":
        t2 = t2.h, Nt(r2), On(t2, It, Ft);
        break;
      case "bigint":
        r2 = Nn(r2, Cn, wn), On(t2.h, r2.i, r2.h);
        break;
      default:
        r2 = Tn(r2), On(t2.h, r2.i, r2.h);
    }
  }
  function Kn(t2, e2, r2) {
    jn(t2, e2, 2), Mn(t2.h, r2.length), Bn(t2, t2.h.end()), Bn(t2, r2);
  }
  function Xn(t2, e2, r2, n2) {
    null != r2 && (e2 = Gn(t2, e2), n2(r2, t2), Vn(t2, e2));
  }
  var Wn = class {
    constructor() {
      this.l = [], this.i = 0, this.h = new Un();
    }
  };
  function Yn(t2) {
    if ("string" == typeof t2) Tn(t2);
  }
  function zn() {
    var t2 = class {
      constructor() {
        throw Error();
      }
    };
    return Object.setPrototypeOf(t2, t2.prototype), t2;
  }
  var qn = zn();
  var Jn = zn();
  var Zn = zn();
  var Qn = zn();
  var ti = zn();
  var ei = zn();
  var ri = zn();
  var ni = zn();
  var ii = zn();
  var si = zn();
  var oi = zn();
  var ai = zn();
  function hi(t2, e2, r2) {
    var n2 = t2.B;
    X && X in n2 && (n2 = n2[X]) && delete n2[e2.h], e2.i ? e2.u(t2, e2.i, e2.h, r2, e2.l) : e2.u(t2, e2.h, r2, e2.l);
  }
  var ui = class {
    constructor(t2, e2) {
      this.B = He(t2, e2, void 0, 2048);
    }
    toJSON() {
      return Ge(this);
    }
    u() {
      var t2 = Ca, e2 = this.B, r2 = t2.h, n2 = X;
      return B && n2 && null != e2[n2]?.[r2] && $(W, 3), t2.i ? t2.o(this, t2.i, t2.h, t2.l) : t2.o(this, t2.h, t2.defaultValue, t2.l);
    }
    clone() {
      var t2 = this.B, e2 = 0 | t2[tt];
      return tr(this, t2, e2) ? We(this, t2, true) : new this.constructor(ze(t2, e2, false));
    }
  };
  ui.prototype[J] = at, ui.prototype.toString = function() {
    return this.B.toString();
  };
  var ci = class {
    constructor(t2, e2, r2) {
      this.h = t2, this.i = e2, t2 = qn, this.l = !!t2 && r2 === t2 || false;
    }
  };
  function li(t2, e2) {
    return new ci(t2, e2, qn);
  }
  function di(t2, e2, r2, n2, i2) {
    Xn(t2, r2, bi(e2, n2), i2);
  }
  var fi;
  var pi;
  var mi = li(function(t2, e2, r2, n2, i2) {
    return 2 === t2.i && (dn(t2, Ar(e2, n2, r2), i2), true);
  }, di);
  var gi = li(function(t2, e2, r2, n2, i2) {
    return 2 === t2.i && (dn(t2, Ar(e2, n2, r2), i2), true);
  }, di);
  var vi = /* @__PURE__ */ Symbol();
  var _i = /* @__PURE__ */ Symbol();
  var yi = /* @__PURE__ */ Symbol();
  var Ei = /* @__PURE__ */ Symbol();
  var Ai = /* @__PURE__ */ Symbol();
  function wi(t2, e2, r2, n2) {
    var i2 = n2[t2];
    if (i2) return i2;
    (i2 = {}).Ea = n2, i2.da = (function(t3) {
      switch (typeof t3) {
        case "boolean":
          return Me ||= [0, void 0, true];
        case "number":
          return t3 > 0 ? void 0 : 0 === t3 ? De ||= [0, void 0] : [-t3, void 0];
        case "string":
          return [0, t3];
        case "object":
          return t3;
      }
    })(n2[0]);
    var s2 = n2[1], o2 = 1;
    s2 && s2.constructor === Object && (i2.ja = s2, "function" == typeof (s2 = n2[++o2]) && s2.length > 0 && (i2.wa = true, fi ??= s2, pi ??= n2[o2 + 1], s2 = n2[o2 += 2]));
    for (var a2 = {}; s2 && Array.isArray(s2) && s2.length && "number" == typeof s2[0] && s2[0] > 0; ) {
      for (var h2 = 0; h2 < s2.length; h2++) a2[s2[h2]] = s2;
      s2 = n2[++o2];
    }
    for (h2 = 1; void 0 !== s2; ) {
      let t3;
      "number" == typeof s2 && (h2 += s2, s2 = n2[++o2]);
      var u2 = void 0;
      if (s2 instanceof ci ? t3 = s2 : (t3 = mi, o2--), t3?.l) {
        s2 = n2[++o2], u2 = n2;
        var c2 = o2;
        "function" == typeof s2 && (s2 = s2(), u2[c2] = s2), u2 = s2;
      }
      for (c2 = h2 + 1, "number" == typeof (s2 = n2[++o2]) && s2 < 0 && (c2 -= s2, s2 = n2[++o2]); h2 < c2; h2++) {
        let n3 = a2[h2];
        u2 ? r2(i2, h2, t3, u2, n3) : e2(i2, h2, t3, n3);
      }
    }
    return n2[t2] = i2;
  }
  function Ti(t2) {
    return Array.isArray(t2) ? t2[0] instanceof ci ? t2 : [gi, t2] : [t2, void 0];
  }
  function bi(t2, e2) {
    return t2 instanceof ui ? t2.B : Array.isArray(t2) ? Ve(t2, e2) : void 0;
  }
  function ki(t2, e2, r2, n2) {
    var i2 = r2.h;
    t2[e2] = n2 ? (t3, e3, r3) => i2(t3, e3, r3, n2) : i2;
  }
  function Si(t2, e2, r2, n2, i2) {
    var s2, o2, a2 = r2.h;
    t2[e2] = (t3, e3, r3) => a2(t3, e3, r3, o2 ||= wi(_i, ki, Si, n2).da, s2 ||= Li(n2), i2);
  }
  function Li(t2) {
    var e2 = t2[yi];
    if (null != e2) return e2;
    var r2 = wi(_i, ki, Si, t2);
    return e2 = r2.wa ? (t3, e3) => fi(t3, e3, r2) : (t3, e3) => {
      t: {
        ln();
        try {
          for (; un(e3) && 4 != e3.i; ) {
            let h3 = e3.l, u3 = r2[h3];
            if (null == u3) {
              let t4 = r2.ja;
              if (t4) {
                let e4 = t4[h3];
                if (e4) {
                  let t5 = Ri(e4);
                  null != t5 && (u3 = r2[h3] = t5);
                }
              }
            }
            if (null == u3 || !u3(e3, t3, h3)) {
              var n2 = e3;
              let r3 = n2.o;
              if (cn(n2), n2.ra) var i2 = void 0;
              else {
                let t4 = n2.h.h - r3;
                n2.h.h = r3, i2 = rn(n2.h, t4);
              }
              n2 = void 0;
              var s2 = t3, o2 = h3, a2 = i2;
              a2 && ((n2 = s2[X] ?? (s2[X] = new Pe()))[o2] ?? (n2[o2] = [])).push(a2);
            }
          }
          let u2 = Ce(t3);
          u2 && (u2.h = r2.Ea[Ai]);
          var h2 = true;
          break t;
        } catch (t4) {
          if (t4 instanceof RangeError) throw new SyntaxError();
          throw t4;
        } finally {
          on > 0 && on--;
        }
        h2 = void 0;
      }
      return h2;
    }, t2[yi] = e2, t2[Ai] = xi.bind(t2), e2;
  }
  function xi(t2, e2, r2, n2) {
    var i2 = this[_i], s2 = this[yi], o2 = Ve(void 0, i2.da), a2 = Ce(t2);
    if (a2) {
      var h2 = false, u2 = i2.ja;
      if (u2) {
        if (i2 = (e3, r3, i3) => {
          if (0 !== i3.length) if (u2[r3]) for (let t3 of i3) {
            e3 = an(t3);
            try {
              h2 = true, s2(o2, e3);
            } finally {
              hn(e3);
            }
          }
          else n2?.(t2, r3, i3);
        }, null == e2) Ne(a2, i2);
        else if (null != a2) {
          let t3 = a2[e2];
          t3 && i2(a2, e2, t3);
        }
        if (h2) {
          let n3 = 0 | t2[tt];
          if (2 & n3 && 2048 & n3 && !r2?.lb) throw Error();
          let i3 = mt(n3), s3 = (e3, s4) => {
            if (null != ir(t2, e3, i3)) {
              if (1 === r2?.kb) return;
              throw Error();
            }
            null != s4 && (n3 = or(t2, n3, e3, s4, i3)), delete a2[e3];
          };
          null == e2 ? ft(o2, 0 | o2[tt], (t3, e3) => {
            s3(t3, e3);
          }) : s3(e2, ir(o2, e2, i3));
        }
      }
    }
  }
  function Ri(t2) {
    var e2 = (t2 = Ti(t2))[0].h;
    if (t2 = t2[1]) {
      let r2 = Li(t2), n2 = wi(_i, ki, Si, t2).da;
      return (t3, i2, s2) => e2(t3, i2, s2, n2, r2);
    }
    return e2;
  }
  function Ii(t2, e2, r2) {
    t2[e2] = r2.i;
  }
  function Fi(t2, e2, r2, n2) {
    var i2, s2, o2 = r2.i;
    t2[e2] = (t3, e3, r3) => o2(t3, e3, r3, s2 ||= wi(vi, Ii, Fi, n2).da, i2 ||= Ci(n2));
  }
  function Ci(t2) {
    var e2 = t2[Ei];
    if (!e2) {
      let r2 = wi(vi, Ii, Fi, t2);
      e2 = (t3, e3) => Ni(t3, e3, r2), t2[Ei] = e2;
    }
    return e2;
  }
  function Ni(t2, e2, r2) {
    ft(t2, 0 | t2[tt], (t3, n2) => {
      if (null != n2) {
        var i2 = (function(t4, e3) {
          var r3 = t4[e3];
          if (r3) return r3;
          if ((r3 = t4.ja) && (r3 = r3[e3])) {
            var n3 = (r3 = Ti(r3))[0].i;
            if (r3 = r3[1]) {
              let e4 = Ci(r3), i3 = wi(vi, Ii, Fi, r3).da;
              r3 = t4.wa ? pi(i3, e4) : (t5, r4, s2) => n3(t5, r4, s2, i3, e4);
            } else r3 = n3;
            return t4[e3] = r3;
          }
        })(r2, t3);
        i2 ? i2(e2, n2, t3) : t3 < 500 || $(z, 3);
      }
    }), (t2 = Ce(t2)) && Ne(t2, (t3, r3, n2) => {
      for (Bn(e2, e2.h.end()), t3 = 0; t3 < n2.length; t3++) Bn(e2, F(n2[t3]) || new Uint8Array(0));
    });
  }
  var Oi = At(0);
  function Mi(t2, e2, r2) {
    if (Array.isArray(e2)) {
      var n2 = 0 | e2[tt];
      if (4 & n2) return e2;
      for (var i2 = 0, s2 = 0; i2 < e2.length; i2++) {
        let r3 = t2(e2[i2]);
        null != r3 && (e2[s2++] = r3);
      }
      return s2 < i2 && (e2.length = s2), t2 = 1 | n2, r2 && (t2 = -1537 & t2 | 4), t2 !== n2 && nt(e2, t2), r2 && 2 & t2 && Object.freeze(e2), e2;
    }
  }
  var Di = (t2, e2) => {
    var r2 = new Wn();
    Ni(t2.B, r2, wi(vi, Ii, Fi, e2)), Bn(r2, r2.h.end()), t2 = new Uint8Array(r2.i);
    var n2 = (e2 = r2.l).length, i2 = 0;
    for (let r3 = 0; r3 < n2; r3++) {
      let n3 = e2[r3];
      t2.set(n3, i2), i2 += n3.length;
    }
    return r2.l = [t2], t2;
  };
  function Pi(t2, e2, r2) {
    return new ci(t2, e2, r2);
  }
  function $i(t2, e2, r2) {
    return new ci(t2, e2, r2);
  }
  function Ui(t2, e2, r2) {
    or(t2, 0 | t2[tt], e2, r2, mt(0 | t2[tt]));
  }
  var Bi = li(function(t2, e2, r2, n2, i2) {
    if (2 !== t2.i) return false;
    if (t2 = Vt(t2 = dn(t2, Ve([void 0, void 0], n2), i2)), i2 = mt(n2 = 0 | e2[tt]), 2 & n2) throw Error();
    var s2 = ir(e2, r2, i2);
    if (s2 instanceof xe) 2 & s2.N ? ((s2 = s2.fa()).push(t2), or(e2, n2, r2, s2, i2)) : s2.fb(t2);
    else if (Array.isArray(s2)) {
      var o2 = 0 | s2[tt];
      8192 & o2 || nt(s2, o2 |= 8192), 2 & o2 && or(e2, n2, r2, s2 = pr(s2), i2), s2.push(t2);
    } else or(e2, n2, r2, st([t2]), i2);
    return true;
  }, function(t2, e2, r2, n2, i2) {
    if (e2 instanceof xe) e2.forEach((e3, s2) => {
      Xn(t2, r2, Ve([s2, e3], n2), i2);
    });
    else if (Array.isArray(e2)) {
      for (let s2 = 0; s2 < e2.length; s2++) {
        let o2 = e2[s2];
        Array.isArray(o2) && Xn(t2, r2, Ve(o2, n2), i2);
      }
      st(e2);
    }
  });
  function ji(t2, e2, r2) {
    null != (e2 = Jt(e2)) && (jn(t2, r2, 5), t2 = t2.h, Ot(e2), $n(t2, It));
  }
  function Gi(t2, e2, r2) {
    null != (e2 = de(e2)) && (Yn(e2), Hn(t2, r2, e2));
  }
  function Vi(t2, e2, r2) {
    null != (e2 = re(e2)) && null != e2 && (jn(t2, r2, 0), Dn(t2.h, e2));
  }
  function Hi(t2, e2, r2) {
    null != (e2 = null == e2 || "boolean" == typeof e2 ? e2 : "number" == typeof e2 ? !!e2 : void 0) && (jn(t2, r2, 0), t2.h.h.push(e2 ? 1 : 0));
  }
  function Ki(t2, e2, r2) {
    null != (e2 = ve(e2)) && Kn(t2, r2, l(e2));
  }
  function Xi(t2, e2, r2, n2, i2) {
    Xn(t2, r2, bi(e2, n2), i2);
  }
  function Wi(t2, e2, r2) {
    null != (e2 = pe(e2)) && Kn(t2, r2, Kr(e2, true).buffer);
  }
  function Yi(t2, e2, r2) {
    null != (e2 = ne(e2)) && null != e2 && (jn(t2, r2, 0), Mn(t2.h, e2));
  }
  function zi(t2, e2, r2) {
    null != (e2 = re(e2)) && (e2 = parseInt(e2, 10), jn(t2, r2, 0), Dn(t2.h, e2));
  }
  function qi(t2, e2, r2) {
    return (5 === t2.i || 2 === t2.i) && (e2 = gr(e2, 0 | e2[tt], r2), 2 == t2.i ? mn(t2, Zr, e2) : e2.push(Zr(t2.h)), true);
  }
  function Ji(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, qr(t2.h)), true);
  }
  function Zi(t2, e2, r2) {
    return (0 === t2.i || 2 === t2.i) && (e2 = gr(e2, 0 | e2[tt], r2), 2 == t2.i ? mn(t2, Yr, e2) : e2.push(Yr(t2.h)), true);
  }
  function Qi(t2, e2, r2) {
    return 2 === t2.i && (Ui(e2, r2, (t2 = pn(t2)) === I() ? void 0 : t2), true);
  }
  var ts = Pi(function(t2, e2, r2) {
    if (1 !== t2.i) return false;
    var n2 = t2.h;
    t2 = Jr(n2);
    var i2 = Jr(n2);
    n2 = 2 * (i2 >> 31) + 1;
    var s2 = i2 >>> 20 & 2047;
    return t2 = 4294967296 * (1048575 & i2) + t2, Ui(e2, r2, 2047 == s2 ? t2 ? NaN : n2 * (1 / 0) : 0 == s2 ? 5e-324 * n2 * t2 : n2 * Math.pow(2, s2 - 1075) * (t2 + 4503599627370496)), true;
  }, function(t2, e2, r2) {
    null != (e2 = Jt(e2)) && (jn(t2, r2, 1), t2 = t2.h, (r2 = xt ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e2, true), It = r2.getUint32(0, true), Ft = r2.getUint32(4, true), $n(t2, It), $n(t2, Ft));
  }, si);
  var es = Pi(function(t2, e2, r2) {
    return 5 === t2.i && (Ui(e2, r2, Zr(t2.h)), true);
  }, ji, ii);
  var rs = $i(qi, function(t2, e2, r2) {
    if (null != (e2 = Mi(Jt, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
      var n2 = t2, i2 = r2, s2 = e2[o2];
      null != s2 && (jn(n2, i2, 5), n2 = n2.h, Ot(s2), $n(n2, It));
    }
  }, ii);
  var ns = $i(qi, function(t2, e2, r2) {
    if (null != (e2 = Mi(Jt, e2, true)) && e2.length) {
      jn(t2, r2, 2), Mn(t2.h, 4 * e2.length);
      for (let n2 = 0; n2 < e2.length; n2++) r2 = t2.h, Ot(e2[n2]), $n(r2, It);
    }
  }, ii);
  var is = Pi(function(t2, e2, r2) {
    return 5 === t2.i && (Ui(e2, r2, 0 === (t2 = Zr(t2.h)) ? void 0 : t2), true);
  }, ji, ii);
  var ss = Pi(function(t2, e2, r2) {
    return Ji(t2, e2, r2);
  }, Gi, ei);
  var os = Pi(function(t2, e2, r2) {
    return Ji(t2, e2, r2);
  }, Gi, ei);
  var as = $i(function(t2, e2, r2) {
    return 0 !== t2.i && 2 !== t2.i ? t2 = false : (e2 = gr(e2, 0 | e2[tt], r2), 2 == t2.i ? mn(t2, qr, e2) : e2.push(qr(t2.h)), t2 = true), t2;
  }, function(t2, e2, r2) {
    if (null != (e2 = Mi(de, e2, false))) for (let n2 = 0; n2 < e2.length; n2++) Hn(t2, r2, e2[n2]);
  }, ei);
  var hs = Pi(function(t2, e2, r2) {
    return 0 !== t2.i ? e2 = false : (Ui(e2, r2, (t2 = qr(t2.h)) === Oi ? void 0 : t2), e2 = true), e2;
  }, Gi, ei);
  var us = Pi(function(t2, e2, r2) {
    return 0 !== t2.i ? t2 = false : (Ui(e2, r2, Xr(t2.h, Dt)), t2 = true), t2;
  }, function(t2, e2, r2) {
    if (null != (e2 = fe(e2))) {
      if ("string" == typeof e2) yn(e2);
      if (null != e2) switch (jn(t2, r2, 0), typeof e2) {
        case "number":
          t2 = t2.h, Nt(e2), On(t2, It, Ft);
          break;
        case "bigint":
          r2 = Nn(e2, An, _n), On(t2.h, r2.i, r2.h);
          break;
        default:
          r2 = yn(e2), On(t2.h, r2.i, r2.h);
      }
    }
  }, ri);
  var cs = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, Yr(t2.h)), true);
  }, Vi, Qn);
  var ls = $i(Zi, function(t2, e2, r2) {
    if (null != (e2 = Mi(re, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
      var n2 = t2, i2 = r2, s2 = e2[o2];
      null != s2 && (jn(n2, i2, 0), Dn(n2.h, s2));
    }
  }, Qn);
  var ds = $i(Zi, function(t2, e2, r2) {
    if (null != (e2 = Mi(re, e2, true)) && e2.length) {
      r2 = Gn(t2, r2);
      for (let r3 = 0; r3 < e2.length; r3++) Dn(t2.h, e2[r3]);
      Vn(t2, r2);
    }
  }, Qn);
  var fs = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, 0 === (t2 = Yr(t2.h)) ? void 0 : t2), true);
  }, Vi, Qn);
  var ps = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, Wr(t2.h)), true);
  }, Hi, Jn);
  var ms = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, false === (t2 = Wr(t2.h)) ? void 0 : t2), true);
  }, Hi, Jn);
  var gs = $i(function(t2, e2, r2) {
    return 2 === t2.i && (t2 = fn(t2), gr(e2, 0 | e2[tt], r2).push(t2), true);
  }, function(t2, e2, r2) {
    if (null != (e2 = Mi(ve, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
      var n2 = t2, i2 = r2, s2 = e2[o2];
      null != s2 && Kn(n2, i2, l(s2));
    }
  }, Zn);
  var vs = Pi(function(t2, e2, r2) {
    return 2 === t2.i && (Ui(e2, r2, "" === (t2 = fn(t2)) ? void 0 : t2), true);
  }, Ki, Zn);
  var _s = Pi(function(t2, e2, r2) {
    return 2 === t2.i && (Ui(e2, r2, fn(t2)), true);
  }, Ki, Zn);
  var ys = (function(t2, e2, r2 = qn) {
    return new ci(t2, e2, r2);
  })(function(t2, e2, r2, n2, i2) {
    return 2 === t2.i && (n2 = Ve(void 0, n2), gr(e2, 0 | e2[tt], r2).push(n2), dn(t2, n2, i2), true);
  }, function(t2, e2, r2, n2, i2) {
    if (Array.isArray(e2)) {
      for (let s2 = 0; s2 < e2.length; s2++) Xi(t2, e2[s2], r2, n2, i2);
      1 & (t2 = 0 | e2[tt]) || nt(e2, 1 | t2);
    }
  });
  var Es = li(function(t2, e2, r2, n2, i2, s2) {
    if (2 !== t2.i) return false;
    var o2 = 0 | e2[tt];
    return yr(e2, o2, s2, r2, mt(o2)), dn(t2, e2 = Ar(e2, n2, r2), i2), true;
  }, Xi);
  var As = Pi(function(t2, e2, r2) {
    return 2 === t2.i && (Ui(e2, r2, pn(t2)), true);
  }, Wi, oi);
  var ws = $i(function(t2, e2, r2) {
    return 2 === t2.i && (t2 = pn(t2), gr(e2, 0 | e2[tt], r2).push(t2), true);
  }, function(t2, e2, r2) {
    if (null != (e2 = Mi(pe, e2, false))) for (let o2 = 0; o2 < e2.length; o2++) {
      var n2 = t2, i2 = r2, s2 = e2[o2];
      null != s2 && Kn(n2, i2, Kr(s2, true).buffer);
    }
  }, oi);
  var Ts = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, zr(t2.h)), true);
  }, Yi, ti);
  var bs = $i(function(t2, e2, r2) {
    return (0 === t2.i || 2 === t2.i) && (e2 = gr(e2, 0 | e2[tt], r2), 2 == t2.i ? mn(t2, zr, e2) : e2.push(zr(t2.h)), true);
  }, function(t2, e2, r2) {
    if (null != (e2 = Mi(ne, e2, true))) for (let o2 = 0; o2 < e2.length; o2++) {
      var n2 = t2, i2 = r2, s2 = e2[o2];
      null != s2 && (jn(n2, i2, 0), Mn(n2.h, s2));
    }
  }, ti);
  var ks = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, 0 === (t2 = zr(t2.h)) ? void 0 : t2), true);
  }, Yi, ti);
  var Ss = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, Yr(t2.h)), true);
  }, zi, ai);
  var Ls = Pi(function(t2, e2, r2) {
    return 0 === t2.i && (Ui(e2, r2, 0 === (t2 = Yr(t2.h)) ? void 0 : t2), true);
  }, zi, ai);
  var xs = Pi(function(t2, e2, r2) {
    return 0 !== t2.i ? t2 = false : (Ui(e2, r2, (function(t3) {
      return Xr(t3, (t4, e3) => {
        var r3 = -(1 & t4);
        return Pt(t4 = (t4 >>> 1 | e3 << 31) ^ r3, e3 >>> 1 ^ r3);
      });
    })(t2.h)), t2 = true), t2;
  }, function(t2, e2, r2) {
    if (null != (e2 = de(e2)) && (Yn(e2), null != e2)) switch (jn(t2, r2, 0), typeof e2) {
      case "number":
        t2 = t2.h, e2 = (r2 = e2) < 0, Ct(r2 = 2 * Math.abs(r2)), r2 = It;
        let n2 = Ft;
        e2 && (0 == r2 ? 0 == n2 ? n2 = r2 = 4294967295 : (n2--, r2 = 4294967295) : r2--), On(t2, It = r2, Ft = n2);
        break;
      case "bigint":
        t2 = t2.h, e2 = e2 << BigInt(1) ^ e2 >> BigInt(63), It = Number(BigInt.asUintN(32, e2)), Ft = Number(BigInt.asUintN(32, e2 >> BigInt(32))), On(t2, It, Ft);
        break;
      default:
        Pn(t2.h, e2);
    }
  }, ni);
  var Rs = class {
    constructor(t2, e2) {
      var r2 = no;
      this.h = t2, this.i = e2, this.o = Tr, this.u = Lr, this.defaultValue = void 0, this.l = null != r2.ib ? pt : void 0;
    }
    register() {
      v(this);
    }
  };
  function Is(t2, e2) {
    return new Rs(t2, e2);
  }
  function Fs(t2, e2) {
    return (r2, n2) => {
      t: {
        let s2 = { ma: true };
        n2 && Object.assign(s2, n2), r2 = an(r2, void 0, void 0, s2);
        try {
          let n3 = new t2(), s3 = n3.B;
          Li(e2)(s3, r2);
          var i2 = n3;
          break t;
        } catch (t3) {
          if (t3 instanceof RangeError) throw new SyntaxError();
          throw t3;
        } finally {
          hn(r2);
        }
        i2 = void 0;
      }
      return i2;
    };
  }
  function Cs(t2) {
    return (e2) => Di(e2, t2);
  }
  function Ns(t2) {
    return function() {
      return Di(this, t2);
    };
  }
  var Os = [0, As, ws, ps, _s];
  var Ms = [0, vs, [0, Ls, [0, hs, fs], Ls, -1, [0, Ss], Ls, -1], Pi(Qi, Wi, oi)];
  var Ds;
  var Ps = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var $s = [0, vs, Pi(Qi, function(t2, e2, r2) {
    if (null != e2) {
      if (e2 instanceof ui) {
        let n2 = e2.mb;
        return void (n2 ? (e2 = n2(e2), null != e2 && Kn(t2, r2, Kr(e2, true).buffer)) : $(z, 3));
      }
      if (Array.isArray(e2)) return void $(z, 3);
    }
    Wi(t2, e2, r2);
  }, oi)];
  var Us = [0, 1, [0, 12, cs, 10, ps], [0, 7, [0, cs, -1]]];
  var Bs = globalThis.trustedTypes;
  var js = class {
    constructor(t2) {
      this.h = t2;
    }
    toString() {
      return this.h + "";
    }
  };
  function Gs(t2) {
    var e2;
    return void 0 === Ds && (Ds = (function() {
      var t3 = null;
      if (!Bs) return t3;
      try {
        let e3 = (t4) => t4;
        t3 = Bs.createPolicy("goog#html", { createHTML: e3, createScript: e3, createScriptURL: e3 });
      } catch (t4) {
      }
      return t3;
    })()), t2 = (e2 = Ds) ? e2.createScriptURL(t2) : t2, new js(t2);
  }
  function Vs(t2, ...e2) {
    if (0 === e2.length) return Gs(t2[0]);
    var r2 = t2[0];
    for (let n2 = 0; n2 < e2.length; n2++) r2 += encodeURIComponent(e2[n2]) + t2[n2 + 1];
    return Gs(r2);
  }
  var Hs = [0, cs, Ss, ps, -1, ds, Ss, -1, ps, -1];
  var Ks = [0, Ss, -1, ps];
  var Xs = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ws = [0, ps, _s, ps, Ss, -1, $i(function(t2, e2, r2) {
    return (0 === t2.i || 2 === t2.i) && (e2 = gr(e2, 0 | e2[tt], r2), 2 == t2.i ? mn(t2, Qr, e2) : e2.push(Yr(t2.h)), true);
  }, function(t2, e2, r2) {
    if (null != (e2 = Mi(re, e2, true)) && e2.length) {
      r2 = Gn(t2, r2);
      for (let r3 = 0; r3 < e2.length; r3++) Dn(t2.h, e2[r3]);
      Vn(t2, r2);
    }
  }, ai), _s, -1, [0, ps, -1], Ss, ps, -1, Ks];
  var Ys = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var zs = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var qs = class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      return ar(this, 9);
    }
  };
  var Js = [0, 3, ps, -1, 2, [0, [2], cs, Es, [0, Ts]], [0, Ss, ps, Ss, ps, Ss, 4, [0, ps, _s, -1, ps, cs, -1, ps], Ss, ps, -4, Ss, gs, ps, gs, ps, -1, cs, ps, -3, [0, ps, cs], [0, _s, cs, -1], [0, ps], [0, ps, -1], [0, ps, cs, -1]], [0, [3, 4], _s, -1, Es, [0, cs], Es, [0, Ss, -2]], [0], _s, ps];
  var Zs = [0, _s, -2];
  var Qs = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var to = [0];
  var eo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ro = [0, cs, ps, 1, ps, -4];
  var no = class extends ui {
    constructor(t2) {
      super(t2, 2);
    }
  };
  var io = {};
  io[336783863] = [0, _s, ps, -1, cs, [0, [1, 2, 3, 4, 5, 6, 7, 8, 9], Es, to, Es, Ws, Es, Zs, Es, ro, Es, Hs, Es, [0, _s, -2], Es, [0, _s, Ss], Es, Js, Es, Ks], [0, _s], ps, [0, [1, 3], [2, 4], Es, [0, ds], -1, Es, [0, gs], -1, ys, [0, _s, -1]], _s];
  var so = [0, hs, -1, ms, -3, hs, ds, vs, fs, hs, -1, ms, fs, ms, -2, vs];
  function oo(t2, e2) {
    Vr(t2, 3, e2);
  }
  function ao(t2, e2) {
    Vr(t2, 4, e2);
  }
  var ho = class extends ui {
    constructor(t2) {
      super(t2, 500);
    }
    A(t2) {
      return Lr(this, 0, 7, t2);
    }
  };
  var uo = [-1, {}];
  var co = [0, _s, 1, uo];
  var lo = [0, _s, gs, uo];
  function fo(t2, e2) {
    Fr(t2, 1, ho, e2);
  }
  function po(t2, e2) {
    Vr(t2, 10, e2);
  }
  function mo(t2, e2) {
    Vr(t2, 15, e2);
  }
  var go = class extends ui {
    constructor(t2) {
      super(t2, 500);
    }
    A(t2) {
      return Lr(this, 0, 1001, t2);
    }
  };
  var vo = [-500, ys, [-500, vs, -1, gs, -3, [-2, io, ps], ys, $s, fs, -1, co, lo, ys, [0, vs, ms], vs, so, fs, gs, 987, gs], 4, ys, [-500, _s, -1, [-1, {}], 998, _s], ys, [-500, _s, gs, -1, [-2, {}, ps], 997, gs, -1], fs, ys, [-500, _s, gs, uo, 998, gs], gs, fs, co, lo, ys, [0, vs, -1, uo], gs, -2, so, vs, -1, ms, [0, ms, ks], 978, uo, ys, $s];
  go.prototype.h = Ns(vo);
  var _o = Fs(go, vo);
  var yo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Eo = class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      return kr(this, yo, 1);
    }
  };
  var Ao = [0, ys, [0, cs, es, _s, -1]];
  var wo = Fs(Eo, Ao);
  var To = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var bo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ko = class extends ui {
    constructor(t2) {
      super(t2);
    }
    l() {
      return Tr(this, To, 2);
    }
    h() {
      return kr(this, bo, 5);
    }
  };
  var So = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, gs, ds, ns, [0, Ss, [0, cs, -3], [0, es, -3], [0, cs, -1, [0, ys, [0, cs, -2]]], ys, [0, es, -1, _s, es]], _s, -1, os, ys, [0, cs, es], gs, os]);
  var Lo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var xo = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, ys, [0, es, -4]]);
  var Ro = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Io = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, ys, [0, es, -4]]);
  var Fo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Co = [0, cs, -1, ns, Ss];
  var No = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  No.prototype.h = Ns([0, es, -4, os]);
  var Oo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Mo = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, ys, [0, 1, cs, _s, Ao], os]);
  var Do = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Po = class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      var t2 = nr(this, 1, void 0, fr);
      return null == t2 ? I() : t2;
    }
  };
  var $o = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Uo = [1, 2];
  var Bo = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, ys, [0, Uo, Es, [0, ns], Es, [0, As], cs, _s], os]);
  var jo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Go = [0, _s, cs, es, gs, -1];
  var Vo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ho = [0, ps, -1];
  var Ko = class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      return hr(this, 2, Xo);
    }
    l() {
      return Or(this, qs, 6, Xo);
    }
  };
  var Xo = [1, 2, 3, 4, 5, 6];
  var Wo = class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      return null != nr(this, 1, void 0, fr);
    }
    l() {
      return null != ve(nr(this, 2));
    }
  };
  var Yo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var zo = [0, As, _s, [0, cs, os, -1], [0, us, os]];
  var qo = [0, zo, ps, [0, Xo, Es, ro, Es, Ws, Es, Hs, Es, to, Es, Zs, Es, Js], Ss];
  var Jo = Cs(qo);
  var Zo = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Qo = [0, qo, es, -1, cs];
  var ta = Is(502141897, Zo);
  io[502141897] = Qo;
  var ea = Fs(class extends ui {
    constructor(t2) {
      super(t2);
    }
  }, [0, [0, Ss, -1, rs, bs], Co]);
  var ra = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var na = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ia = [0, qo, es, [0, qo], ps];
  var sa = Is(508968150, na);
  io[508968150] = [0, qo, Qo, ia, es, [0, [0, zo]]], io[508968149] = ia;
  var oa = class extends ui {
    constructor(t2) {
      super(t2);
    }
    l() {
      return Tr(this, jo, 2);
    }
    h() {
      sr(this, 2);
    }
  };
  var aa = [0, qo, Go];
  io[478825465] = aa;
  var ha = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ua = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ca = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var la = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var da = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var fa = [0, qo, [0, qo], aa, -1];
  var pa = [0, qo, es, cs];
  var ma = [0, qo, es];
  var ga = [0, qo, pa, ma, es];
  var va = Is(479097054, da);
  io[479097054] = [0, qo, ga, fa], io[463370452] = fa, io[464864288] = pa;
  var _a = Is(462713202, la);
  io[462713202] = ga, io[474472470] = ma;
  var ya = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ea = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Aa = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var wa = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ta = [0, qo, es, -1, cs];
  var ba = [0, qo, es, ps];
  wa.prototype.h = Ns([0, qo, ma, [0, qo], Qo, ia, Ta, ba]);
  var ka = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Sa = Is(456383383, ka);
  io[456383383] = [0, qo, Go];
  var La = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var xa = Is(476348187, La);
  io[476348187] = [0, qo, Ho];
  var Ra = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ia = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Fa = [0, Ss, -1];
  var Ca = Is(458105876, class extends ui {
    constructor(t2) {
      super(t2);
    }
    h() {
      var t2 = this.B, e2 = 0 | t2[tt], r2 = ut(this, e2);
      return t2 = (function(t3, e3, r3, n2) {
        var i2 = Ia;
        !n2 && Je(t3) && (r3 = 0 | (e3 = t3.B)[tt]);
        var s2 = ir(e3, 2);
        if (t3 = false, null == s2) {
          if (n2) return Fe();
          s2 = [];
        } else if (s2.constructor === xe) {
          if (!(2 & s2.N) || n2) return s2;
          s2 = s2.fa();
        } else Array.isArray(s2) ? t3 = !!(2 & s2[tt]) : s2 = [];
        if (n2) {
          if (!s2.length) return Fe();
          t3 || (t3 = true, it(s2));
        } else t3 && (t3 = false, st(s2), s2 = pr(s2));
        return !t3 && 32 & r3 && rt(s2, 32), r3 = or(e3, r3, 2, n2 = new xe(s2, i2, ye, void 0)), t3 || Qe(e3, r3), n2;
      })(this, t2, e2, r2), !r2 && Ia && (t2.Fa = true), t2;
    }
  });
  io[458105876] = [0, Fa, Bi, [true, os, [0, _s, -1, gs]], [0, ds, ps, Ss], ps];
  var Na = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Oa = Is(458105758, Na);
  io[458105758] = [0, qo, _s, Fa];
  var Ma = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Da = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Pa = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var $a = Cs([0, ys, [0, Ls, ys, [0, is, -1], ms]]);
  var Ua = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ba = [0, is, -1, ms];
  var ja = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ga = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Va = [1, 2];
  Ga.prototype.h = Ns([0, Va, Es, Ba, Es, [0, ys, Ba]]);
  var Ha = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Ka = Is(443442058, Ha);
  io[443442058] = [0, qo, _s, cs, es, gs, -1, ps, es], io[514774813] = Ta;
  var Xa = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var Wa = Is(516587230, Xa);
  function Ya(t2, e2) {
    return e2 = e2 ? e2.clone() : new jo(), void 0 !== t2.displayNamesLocale ? sr(e2, 1, ge(t2.displayNamesLocale)) : void 0 === t2.displayNamesLocale && sr(e2, 1), void 0 !== t2.maxResults ? Dr(e2, 2, t2.maxResults) : "maxResults" in t2 && sr(e2, 2), void 0 !== t2.scoreThreshold ? Ur(e2, 3, t2.scoreThreshold) : "scoreThreshold" in t2 && sr(e2, 3), void 0 !== t2.categoryAllowlist ? Gr(e2, 4, t2.categoryAllowlist) : "categoryAllowlist" in t2 && sr(e2, 4), void 0 !== t2.categoryDenylist ? Gr(e2, 5, t2.categoryDenylist) : "categoryDenylist" in t2 && sr(e2, 5), e2;
  }
  function za(t2) {
    var e2 = Number(t2);
    return Number.isSafeInteger(e2) ? e2 : String(t2);
  }
  function qa(t2, e2 = -1, r2 = "") {
    return { categories: t2.map((t3) => ({ index: Cr(t3, 1) ?? 0 ?? -1, score: Nr(t3, 2) ?? 0, categoryName: ve(nr(t3, 3)) ?? "" ?? "", displayName: ve(nr(t3, 4)) ?? "" ?? "" })), headIndex: e2, headName: r2 };
  }
  function Ja(t2) {
    var e2 = { classifications: kr(t2, Oo, 1).map((t3) => qa(Tr(t3, Eo, 4)?.h() ?? [], Cr(t3, 2) ?? 0, ve(nr(t3, 3)) ?? "")) };
    return null != (function(t3) {
      return null == t3 ? t3 : "bigint" == typeof t3 ? (wt(t3) ? t3 = Number(t3) : (t3 = Ht(64, t3), t3 = wt(t3) ? Number(t3) : String(t3)), t3) : te(t3) ? "number" == typeof t3 ? ae(t3) : ue(t3) : void 0;
    })(nr(t2, 2, void 0, le)) && (e2.timestampMs = za(nr(t2, 2, void 0, le) ?? er)), e2;
  }
  function Za(t2) {
    var e2 = ur(t2, 3, Jt), r2 = ur(t2, 2, re), n2 = ur(t2, 1, ve), i2 = ur(t2, 9, ve), s2 = { categories: [], keypoints: [] };
    for (let t3 = 0; t3 < e2.length; t3++) s2.categories.push({ score: e2[t3], index: r2[t3] ?? -1, categoryName: n2[t3] ?? "", displayName: i2[t3] ?? "" });
    if ((e2 = Tr(t2, ko, 4)?.l()) && (s2.boundingBox = { originX: Cr(e2, 1, rr) ?? 0, originY: Cr(e2, 2, rr) ?? 0, width: Cr(e2, 3, rr) ?? 0, height: Cr(e2, 4, rr) ?? 0, angle: 0 }), Tr(t2, ko, 4)?.h().length) for (let e3 of Tr(t2, ko, 4).h()) s2.keypoints.push({ x: nr(e3, 1, rr, Jt) ?? 0, y: nr(e3, 2, rr, Jt) ?? 0, score: nr(e3, 4, rr, Jt) ?? 0, label: ve(nr(e3, 3, rr)) ?? "" });
    return s2;
  }
  function Qa(t2) {
    var e2 = [];
    for (let r2 of kr(t2, Ro, 1)) t2 = { x: Nr(r2, 1) ?? 0, y: Nr(r2, 2) ?? 0, z: Nr(r2, 3) ?? 0, visibility: Nr(r2, 4) ?? 0 }, null != nr(r2, 5, void 0, Jt) && (t2.presence = Nr(r2, 5) ?? 0), e2.push(t2);
    return e2;
  }
  function th(t2) {
    var e2 = [];
    for (let r2 of kr(t2, Lo, 1)) t2 = { x: Nr(r2, 1) ?? 0, y: Nr(r2, 2) ?? 0, z: Nr(r2, 3) ?? 0, visibility: Nr(r2, 4) ?? 0 }, null != nr(r2, 5, void 0, Jt) && (t2.presence = Nr(r2, 5) ?? 0), e2.push(t2);
    return e2;
  }
  function eh(t2) {
    return Array.from(t2, (t3) => t3 > 127 ? t3 - 256 : t3);
  }
  function rh(t2, e2) {
    if (t2.length !== e2.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t2.length} vs. ${e2.length}).`);
    var r2 = 0, n2 = 0, i2 = 0;
    for (let s2 = 0; s2 < t2.length; s2++) r2 += t2[s2] * e2[s2], n2 += t2[s2] * t2[s2], i2 += e2[s2] * e2[s2];
    if (n2 <= 0 || i2 <= 0) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
    return r2 / Math.sqrt(n2 * i2);
  }
  function nh(t2, e2, r2) {
    return r2 = `wasm${r2 ? "_module" : ""}_internal`, Promise.resolve({ wasmLoaderPath: `${e2}/${t2}_${r2}.js`, wasmBinaryPath: `${e2}/${t2}_${r2}.wasm` });
  }
  io[516587230] = [0, qo, Ta, ba, es], io[518928384] = ba;
  var ih = class {
  };
  function sh(t2) {
    return sr(new oh(), 1, ee(t2));
  }
  ih.forVisionTasks = function(t2, e2 = false) {
    return nh("vision", t2 ?? Vs``, e2);
  }, ih.forLiteRtLmTextTasks = function(t2, e2 = false) {
    return nh("litertlm_text", t2 ?? Vs``, e2);
  }, ih.forTextTasks = function(t2, e2 = false) {
    return nh("text", t2 ?? Vs``, e2);
  }, ih.forRetrievalTasks = function(t2, e2 = false) {
    return nh("retrieval", t2 ?? Vs``, e2);
  }, ih.forGenAiTasks = function(t2, e2 = false) {
    return nh("genai", t2 ?? Vs``, e2);
  }, ih.forDecisionTasks = function(t2, e2 = false) {
    return nh("decision", t2 ?? Vs``, e2);
  }, ih.forAudioTasks = function(t2, e2 = false) {
    return nh("audio", t2 ?? Vs``, e2);
  };
  var oh = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ah = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var hh = [0, Ss, 2, us, -2, os, ys, [0, Ss, os]];
  var uh = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ch = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  function lh(t2, e2) {
    return sr(t2, 1, ee(e2));
  }
  function dh(t2, e2) {
    return sr(t2, 2, ee(e2));
  }
  var fh = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var ph = [3, 4, 5, 6, 7];
  var mh = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  var gh = class extends ui {
    constructor(t2) {
      super(t2);
    }
  };
  gh.prototype.h = Ns([0, [0, Ss, _s, -3, Ss], [0, ph, Ss, -1, Es, [0, Ss, _s, us], Es, hh, Es, [0, 1, hh], Es, [0, Ss], Es, [0, Ss, _s, us]]]);
  var vh = class {
    constructor() {
      this.h = "undefined" != typeof AbortController;
    }
    async send(t2, e2, r2) {
      var n2 = this.h ? new AbortController() : void 0, i2 = n2 && t2.la > 0 ? setTimeout(() => {
        n2.abort();
      }, t2.la) : void 0;
      try {
        let i3 = await fetch(t2.url, { method: t2.bb, headers: { ...t2.ab }, ...t2.body && { body: t2.body }, ...t2.withCredentials && { credentials: "include" }, signal: t2.la && n2 ? n2.signal : null });
        i3.ok ? e2?.(await i3.text()) : r2?.(i3.status);
      } catch (t3) {
        if ("AbortError" === t3?.name) r2?.(408);
        else r2?.(0);
      } finally {
        clearTimeout(i2);
      }
    }
  };
  var _h = class extends ui {
    constructor(t2) {
      super(t2, 37);
    }
  };
  var yh = [-4, {}, Us, Ss, Ms];
  var Eh = [0, _s, Ss, 1, _s, -1, Ss, 1, Ss, 1, os];
  var Ah = [0, Ss, _s, -2];
  var wh = [0, _s, Ss];
  var Th = [0, _s, Ss];
  var bh = [0, ps, -3];
  var kh = [0, Ss, _s, -1, os, cs, -1, _s, -5, ys, [0, _s, -4], -1, ps, [0, ps, -3], Ss];
  var Sh = class extends ui {
    constructor(t2) {
      super(t2, 19);
    }
  };
  var Lh = Cs([-19, {}, [0, Ss, 1, [0, _s, -6, os, cs, _s, -1, os], 1, [0, _s, 1, _s, -5], _s, -1, [0, Ss, _s, -8], [0, _s, -3], [0, _s, Ss, _s, -2], [0, _s, -1, Ss, _s, -1, Ss, _s, -1, [0, ys, [0, _s, -1], ps, _s, -5], [0, Ss, ps, cs, -2]], os, [0, _s, -3, os, cs, _s, -1], [0, Ss, _s, -1], [0, _s, -9], [0, _s, -6, Ss, _s, 1, _s, ps, Ss, -1, ps, _s, -2, Ss, _s, Ss, _s, cs, -1], 1, [0, Ss], 1, [0, _s, -4], 1, Eh, [0, [1, 2, 3, 4, 5, 6], Es, Eh, Es, wh, Es, Th, Es, [0, Ss], Es, kh, Es, Ah], wh, Th, kh, [0, [0, Ss, _s, -1, os, cs, -1, _s, -4, ys, [0, _s, -4], -1, 1, bh], [0, Ss, _s, -1, os, cs, -1, _s, -4, bh]], Ah, [0, _s, [0, cs, -3, Ss], Ss, -2, [0, cs, -1], ps], 4, [0, _s, Ss, _s, -1, os, Ss, _s, -1, Ss, cs, -1]], Ss, ys, [-37, {}, ss, _s, ys, [0, _s, -1], As, 1, As, [0, gs, -1, ls, as, -1], _s, [0, cs, _s, -1], ps, cs, os, _s, -1, xs, Os, ss, As, Ss, ls, os, -1, [0, Ss, -1], _s, ps, _s, ds, _s, -1, ts, 1, ts, yh, ps, [0, Ss, [0, es, cs, -2], [0, es]], [0, Ss, os]], ss, ws, _s, -1, ss, Ss, -1, [0, ps, -1, Ss, ps], [0, os, -1, _s], [0, ss, ps, os], os, 1, Ts, 1, yh]);
  var xh = class {
    constructor(t2) {
      this.i = [], this.o = new vh(), this.l = t2 ?? "", this.h = setInterval(() => {
        this.flush();
      }, 6e4);
    }
    close() {
      void 0 !== this.h && (clearInterval(this.h), this.h = void 0), this.flush();
    }
    flush(t2, e2) {
      if (this.error) e2?.("net-send-failed");
      else if (0 === this.i.length) t2?.();
      else {
        var r2 = this.i;
        this.i = [], r2 = (function(t3) {
          var e3 = new Sh();
          return Rr(e3 = sr(e3, 2, ee(1786)), 3, t3);
        })(r2), r2 = Lh(r2), this.o.send({ url: "https://odml.pa.googleapis.com/v1/log", bb: "POST", la: 1e4, body: r2, gb: 2, ab: { "Content-Type": "application/x-protobuf", "x-goog-api-key": this.l }, withCredentials: false }, () => {
          t2?.();
        }, (t3) => {
          this.error = Error(`Logging failed with HTTP error: ${t3}`), this.i = [], void 0 !== this.h && (clearInterval(this.h), this.h = void 0), e2?.("net-send-failed", t3);
        });
      }
    }
  };
  var Rh = class {
    constructor() {
      this.ba = this.V = this.Y = this.S = this.W = this.U = this.R = 0;
    }
  };
  function Ih(t2, e2) {
    var r2 = new gh();
    r2 = Lr(r2, 0, 1, t2.C), r2 = Lr(r2, 0, 2, e2), e2 = sr(e2 = new _h(), 6, lt(r2 = r2.h(), false)), (t2 = t2.m).error || t2.i.push(e2);
  }
  function Fh(t2, e2) {
    var r2 = { R: e2.R - t2.l.R, U: e2.U - t2.l.U, W: e2.W - t2.l.W, S: e2.S - t2.l.S, Y: e2.Y - t2.l.Y, V: e2.V, ba: e2.ba }, n2 = dh(lh(new fh(), t2.D), 1);
    r2 = Ch(t2, r2), Ih(t2, n2 = xr(n2, 4, ph, r2)), t2.l = e2;
  }
  function Ch(t2, e2) {
    var r2 = new ah();
    return t2 = $r(t2 = Pr(t2 = sr(r2, 1, ee(t2.F)), 7, e2.S), 5, e2.V), t2 = $r(t2, 6, e2.ba), e2.W > 0 && $r(t2, 4, e2.Y / e2.W), 0 !== e2.R && (r2 = Pr(r2 = sh(3), 2, e2.R), Fr(t2, 8, oh, r2)), 0 !== e2.U && (e2 = Pr(r2 = sh(4), 2, e2.U), Fr(t2, 8, oh, e2)), t2;
  }
  var Nh = class {
    constructor(t2, e2, r2) {
      this.v = performance.now(), this.o = performance.now(), this.i = /* @__PURE__ */ new Map(), this.u = 0, this.h = new Rh(), this.l = new Rh(), this.m = new xh(r2), this.D = (function(t3) {
        switch (t3) {
          case "AudioClassifier":
            return 4;
          case "AudioEmbedder":
            return 5;
          case "TextClassifier":
            return 6;
          case "TextEmbedder":
            return 7;
          case "GestureRecognizer":
            return 8;
          case "HandDetector":
            return 9;
          case "HandLandmarker":
            return 10;
          case "ImageClassifier":
            return 11;
          case "ImageEmbedder":
            return 12;
          case "ImageSegmenter":
            return 13;
          case "ObjectDetector":
            return 14;
          case "FaceDetector":
            return 15;
          case "FaceLandmarker":
            return 16;
          case "InteractiveSegmenter":
          case "InteractiveSegmenterLegacy":
            return 18;
          case "HolisticLandmarker":
            return 20;
          case "LlmInference":
            return 21;
          case "LanguageDetector":
            return 22;
          case "PoseLandmarker":
            return 23;
          case "UniversalEmbedder":
            return 28;
          case "SemanticRetriever":
            return 29;
          case "DecisionMaker":
            return 30;
          case "TextSummarizer":
            return 26;
          case "TextProofreader":
            return 27;
          case "AudioTranscriber":
            return 31;
          case "TextToSpeech":
            return 32;
          default:
            return 0;
        }
      })(t2), this.F = (function(t3) {
        switch (t3) {
          case "IMAGE":
            return 11;
          case "VIDEO":
            return 12;
          case "LIVE_STREAM":
            return 13;
          case "AUDIO_CLIPS":
            return 14;
          case "AUDIO_STREAM":
            return 15;
          default:
            return 10;
        }
      })(e2), t2 = new mh(), "undefined" == typeof navigator ? e2 = 0 : (e2 = navigator.userAgent, e2 = /Android/i.test(e2) ? 1 : /iPhone|iPad|iPod/i.test(e2) ? 2 : /Windows/i.test(e2) ? 5 : /Macintosh/i.test(e2) ? 4 : /Linux/i.test(e2) ? 3 : 0), t2 = sr(t2, 1, ee(e2)), t2 = sr(t2, 2, ge("")), t2 = sr(t2, 3, ge("")), t2 = sr(t2, 4, ge("1.2.3")), t2 = sr(t2, 5, ge("")), this.C = sr(t2, 6, ee((function() {
        var t3 = globalThis.__HOST_ENVIRONMENT__;
        if ("string" == typeof t3) switch (t3) {
          case "ANDROID":
            return 1;
          case "IOS":
            return 2;
          case "PYTHON":
            return 3;
          case "WEB":
            break;
          case "FLUTTER":
            return 5;
          case "FLUTTER_WEB":
            return 6;
          default:
            return 0;
        }
        return 4;
      })()));
    }
    ya() {
      var t2 = new ch();
      t2 = $r(t2 = sr(t2, 1, ee(this.F)), 3, performance.now() - this.v), Ih(this, t2 = xr(dh(lh(new fh(), this.D), 0), 3, ph, t2)), this.o = performance.now();
    }
    za(t2) {
      var e2 = this.i.get(t2);
      if (void 0 !== e2 && (this.i.delete(t2), t2 = performance.now() - e2, ++this.h.W, this.h.Y += t2, this.h.V = Math.max(this.h.V, t2), this.u = Math.max(this.u, t2), performance.now() > this.o + 3e4)) {
        for (let [r2, n2] of this.i.entries()) t2 = r2, n2 < e2 && (this.h.S++, this.i.delete(t2));
        e2 = { ...this.h, ba: performance.now() - this.o }, this.h.V = 0, this.o = performance.now(), Fh(this, e2);
      }
    }
    xa() {
      var t2 = { ...this.h, S: this.h.S + this.i.size, V: this.u, ba: performance.now() - this.v };
      Fh(this, t2);
      var e2 = new uh();
      e2 = Lr(e2, 0, 2, t2 = Ch(this, t2)), Ih(this, e2 = xr(t2 = dh(lh(new fh(), this.D), 2), 5, ph, e2));
    }
    close() {
      var t2 = this.m;
      "function" == typeof t2.close ? t2.close() : t2.flush();
    }
  };
  function Oh() {
    var t2 = navigator;
    return "undefined" != typeof OffscreenCanvas && (!(function(t3 = navigator) {
      return (t3 = t3.userAgent).includes("Safari") && !t3.includes("Chrome");
    })(t2) || !!((t2 = t2.userAgent.match(/Version\/([\d]+).*Safari/)) && t2.length >= 1 && Number(t2[1]) >= 17));
  }
  async function Mh(t2) {
    if ("function" != typeof importScripts) {
      let e2 = document.createElement("script");
      return e2.src = t2.toString(), e2.crossOrigin = "anonymous", new Promise((t3, r2) => {
        e2.addEventListener("load", () => {
          t3();
        }, false), e2.addEventListener("error", (t4) => {
          r2(t4);
        }, false), document.body.appendChild(e2);
      });
    }
    try {
      importScripts(t2.toString());
    } catch (e2) {
      if (!(e2 instanceof TypeError)) throw e2;
      {
        let e3 = self.import;
        e3 ? await e3(t2.toString()) : await import(t2.toString());
      }
    }
  }
  function Dh(t2) {
    return void 0 !== t2.videoWidth ? [t2.videoWidth, t2.videoHeight] : void 0 !== t2.naturalWidth ? [t2.naturalWidth, t2.naturalHeight] : void 0 !== t2.displayWidth ? [t2.displayWidth, t2.displayHeight] : [t2.width, t2.height];
  }
  function Ph(t2, e2, r2) {
    t2.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), r2(e2 = t2.j.stringToNewUTF8(e2)), t2.j._free(e2);
  }
  function $h(t2, e2, r2) {
    if (!t2.j.canvas) throw Error("No OpenGL canvas configured.");
    if (r2 ? t2.j._bindTextureToStream(r2) : t2.j._bindTextureToCanvas(), !(r2 = t2.j.canvas.getContext("webgl2") || t2.j.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
    t2.j.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, true), r2.texImage2D(r2.TEXTURE_2D, 0, r2.RGBA, r2.RGBA, r2.UNSIGNED_BYTE, e2), t2.j.gpuOriginForWebTexturesIsBottomLeft && r2.pixelStorei(r2.UNPACK_FLIP_Y_WEBGL, false);
    var [n2, i2] = Dh(e2);
    return !t2.l || n2 === t2.j.canvas.width && i2 === t2.j.canvas.height || (t2.j.canvas.width = n2, t2.j.canvas.height = i2), [n2, i2];
  }
  function Uh(t2, e2, r2) {
    t2.o || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
    var n2 = new Uint32Array(e2.length);
    for (let r3 = 0; r3 < e2.length; r3++) n2[r3] = t2.j.stringToNewUTF8(e2[r3]);
    e2 = t2.j._malloc(4 * n2.length), t2.j.HEAPU32.set(n2, e2 >> 2), r2(e2);
    for (let e3 of n2) t2.j._free(e3);
    t2.j._free(e2);
  }
  function Bh(t2, e2, r2) {
    t2.j.simpleListeners = t2.j.simpleListeners || {}, t2.j.simpleListeners[e2] = r2;
  }
  function jh(t2, e2, r2) {
    var n2 = [];
    t2.j.simpleListeners = t2.j.simpleListeners || {}, t2.j.simpleListeners[e2] = (t3, e3, i2) => {
      e3 ? (r2(n2, i2), n2 = []) : n2.push(t3);
    };
  }
  var Gh = class {
    constructor(t2, e2) {
      this.l = true, this.j = t2, this.h = null, this.i = 0, this.o = "function" == typeof this.j._addIntToInputStream, void 0 !== e2 ? this.j.canvas = e2 : Oh() ? this.j.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.j.canvas = document.createElement("canvas"));
    }
    async initializeGraph(t2) {
      var e2 = await (await fetch(t2)).arrayBuffer();
      t2 = !(t2.endsWith(".pbtxt") || t2.endsWith(".textproto")), this.setGraph(new Uint8Array(e2), t2);
    }
    setGraphFromString(t2) {
      this.setGraph(new TextEncoder().encode(t2), false);
    }
    setGraph(t2, e2) {
      var r2 = t2.length, n2 = this.j._malloc(r2);
      this.j.HEAPU8.set(t2, n2), e2 ? this.j._changeBinaryGraph(r2, n2) : this.j._changeTextGraph(r2, n2), this.j._free(n2);
    }
    configureAudio(t2, e2, r2, n2, i2) {
      this.j._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Ph(this, n2 || "input_audio", (n3) => {
        Ph(this, i2 = i2 || "audio_header", (i3) => {
          this.j._configureAudio(n3, i3, t2, e2 ?? 0, r2);
        });
      });
    }
    setAutoResizeCanvas(t2) {
      this.l = t2;
    }
    setAutoRenderToScreen(t2) {
      this.j._setAutoRenderToScreen(t2);
    }
    setGpuBufferVerticalFlip(t2) {
      this.j.gpuOriginForWebTexturesIsBottomLeft = t2;
    }
    ka(t2) {
      Bh(this, "__graph_config__", (e2) => {
        t2(e2);
      }), Ph(this, "__graph_config__", (t3) => {
        this.j._getGraphConfig(t3, void 0);
      }), delete this.j.simpleListeners.__graph_config__;
    }
    attachErrorListener(t2) {
      this.j.errorListener = t2;
    }
    attachEmptyPacketListener(t2, e2) {
      this.j.emptyPacketListeners = this.j.emptyPacketListeners || {}, this.j.emptyPacketListeners[t2] = e2;
    }
    addAudioToStream(t2, e2, r2) {
      this.addAudioToStreamWithShape(t2, 0, 0, e2, r2);
    }
    addAudioToStreamWithShape(t2, e2, r2, n2, i2) {
      var s2 = 4 * t2.length;
      this.i !== s2 && (this.h && this.j._free(this.h), this.h = this.j._malloc(s2), this.i = s2), this.j.HEAPF32.set(t2, this.h / 4), Ph(this, n2, (t3) => {
        this.j._addAudioToInputStream(this.h, e2, r2, t3, i2);
      });
    }
    addGpuBufferToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var [n2, i2] = $h(this, t2, e3);
        this.j._addBoundTextureToStream(e3, n2, i2, r2);
      });
    }
    addBoolToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        this.j._addBoolToInputStream(t2, e3, r2);
      });
    }
    addDoubleToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        this.j._addDoubleToInputStream(t2, e3, r2);
      });
    }
    addFloatToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        this.j._addFloatToInputStream(t2, e3, r2);
      });
    }
    addIntToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        this.j._addIntToInputStream(t2, e3, r2);
      });
    }
    addUintToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        this.j._addUintToInputStream(t2, e3, r2);
      });
    }
    addStringToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        Ph(this, t2, (t3) => {
          this.j._addStringToInputStream(t3, e3, r2);
        });
      });
    }
    addStringRecordToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        Uh(this, Object.keys(t2), (n2) => {
          Uh(this, Object.values(t2), (i2) => {
            this.j._addFlatHashMapToInputStream(n2, i2, Object.keys(t2).length, e3, r2);
          });
        });
      });
    }
    addProtoToStream(t2, e2, r2, n2) {
      Ph(this, r2, (r3) => {
        Ph(this, e2, (e3) => {
          var i2 = this.j._malloc(t2.length);
          this.j.HEAPU8.set(t2, i2), this.j._addProtoToInputStream(i2, t2.length, e3, r3, n2), this.j._free(i2);
        });
      });
    }
    addEmptyPacketToStream(t2, e2) {
      Ph(this, t2, (t3) => {
        this.j._addEmptyPacketToInputStream(t3, e2);
      });
    }
    addBoolVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateBoolVector(t2.length);
        if (!n2) throw Error("Unable to allocate new bool vector on heap.");
        for (let e4 of t2) this.j._addBoolVectorEntry(n2, e4);
        this.j._addBoolVectorToInputStream(n2, e3, r2);
      });
    }
    addDoubleVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateDoubleVector(t2.length);
        if (!n2) throw Error("Unable to allocate new double vector on heap.");
        for (let e4 of t2) this.j._addDoubleVectorEntry(n2, e4);
        this.j._addDoubleVectorToInputStream(n2, e3, r2);
      });
    }
    addFloatVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateFloatVector(t2.length);
        if (!n2) throw Error("Unable to allocate new float vector on heap.");
        for (let e4 of t2) this.j._addFloatVectorEntry(n2, e4);
        this.j._addFloatVectorToInputStream(n2, e3, r2);
      });
    }
    addIntVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateIntVector(t2.length);
        if (!n2) throw Error("Unable to allocate new int vector on heap.");
        for (let e4 of t2) this.j._addIntVectorEntry(n2, e4);
        this.j._addIntVectorToInputStream(n2, e3, r2);
      });
    }
    addUintVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateUintVector(t2.length);
        if (!n2) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (let e4 of t2) this.j._addUintVectorEntry(n2, e4);
        this.j._addUintVectorToInputStream(n2, e3, r2);
      });
    }
    addStringVectorToStream(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var n2 = this.j._allocateStringVector(t2.length);
        if (!n2) throw Error("Unable to allocate new string vector on heap.");
        for (let e4 of t2) Ph(this, e4, (t3) => {
          this.j._addStringVectorEntry(n2, t3);
        });
        this.j._addStringVectorToInputStream(n2, e3, r2);
      });
    }
    addBoolToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        this.j._addBoolToInputSidePacket(t2, e3);
      });
    }
    addDoubleToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        this.j._addDoubleToInputSidePacket(t2, e3);
      });
    }
    addFloatToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        this.j._addFloatToInputSidePacket(t2, e3);
      });
    }
    addIntToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        this.j._addIntToInputSidePacket(t2, e3);
      });
    }
    addUintToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        this.j._addUintToInputSidePacket(t2, e3);
      });
    }
    addStringToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        Ph(this, t2, (t3) => {
          this.j._addStringToInputSidePacket(t3, e3);
        });
      });
    }
    addProtoToInputSidePacket(t2, e2, r2) {
      Ph(this, r2, (r3) => {
        Ph(this, e2, (e3) => {
          var n2 = this.j._malloc(t2.length);
          this.j.HEAPU8.set(t2, n2), this.j._addProtoToInputSidePacket(n2, t2.length, e3, r3), this.j._free(n2);
        });
      });
    }
    addBoolVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateBoolVector(t2.length);
        if (!r2) throw Error("Unable to allocate new bool vector on heap.");
        for (let e4 of t2) this.j._addBoolVectorEntry(r2, e4);
        this.j._addBoolVectorToInputSidePacket(r2, e3);
      });
    }
    addDoubleVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateDoubleVector(t2.length);
        if (!r2) throw Error("Unable to allocate new double vector on heap.");
        for (let e4 of t2) this.j._addDoubleVectorEntry(r2, e4);
        this.j._addDoubleVectorToInputSidePacket(r2, e3);
      });
    }
    addFloatVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateFloatVector(t2.length);
        if (!r2) throw Error("Unable to allocate new float vector on heap.");
        for (let e4 of t2) this.j._addFloatVectorEntry(r2, e4);
        this.j._addFloatVectorToInputSidePacket(r2, e3);
      });
    }
    addIntVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateIntVector(t2.length);
        if (!r2) throw Error("Unable to allocate new int vector on heap.");
        for (let e4 of t2) this.j._addIntVectorEntry(r2, e4);
        this.j._addIntVectorToInputSidePacket(r2, e3);
      });
    }
    addUintVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateUintVector(t2.length);
        if (!r2) throw Error("Unable to allocate new unsigned int vector on heap.");
        for (let e4 of t2) this.j._addUintVectorEntry(r2, e4);
        this.j._addUintVectorToInputSidePacket(r2, e3);
      });
    }
    addStringVectorToInputSidePacket(t2, e2) {
      Ph(this, e2, (e3) => {
        var r2 = this.j._allocateStringVector(t2.length);
        if (!r2) throw Error("Unable to allocate new string vector on heap.");
        for (let e4 of t2) Ph(this, e4, (t3) => {
          this.j._addStringVectorEntry(r2, t3);
        });
        this.j._addStringVectorToInputSidePacket(r2, e3);
      });
    }
    attachBoolListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachBoolListener(t3);
      });
    }
    attachBoolVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachBoolVectorListener(t3);
      });
    }
    attachIntListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachIntListener(t3);
      });
    }
    attachIntVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachIntVectorListener(t3);
      });
    }
    attachUintListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachUintListener(t3);
      });
    }
    attachUintVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachUintVectorListener(t3);
      });
    }
    attachDoubleListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachDoubleListener(t3);
      });
    }
    attachDoubleVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachDoubleVectorListener(t3);
      });
    }
    attachFloatListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachFloatListener(t3);
      });
    }
    attachFloatVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachFloatVectorListener(t3);
      });
    }
    attachStringListener(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachStringListener(t3);
      });
    }
    attachStringVectorListener(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachStringVectorListener(t3);
      });
    }
    attachProtoListener(t2, e2, r2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachProtoListener(t3, r2 || false);
      });
    }
    attachProtoVectorListener(t2, e2, r2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.j._attachProtoVectorListener(t3, r2 || false);
      });
    }
    attachAudioListener(t2, e2, r2) {
      this.j._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), Bh(this, t2, (t3, r3) => {
        t3 = new Float32Array(t3.buffer, t3.byteOffset, t3.length / 4), e2(t3, r3);
      }), Ph(this, t2, (t3) => {
        this.j._attachAudioListener(t3, r2 || false);
      });
    }
    finishProcessing() {
      this.j._waitUntilIdle();
    }
    closeGraph() {
      this.j._closeGraph(), this.j.simpleListeners = void 0, this.j.emptyPacketListeners = void 0;
    }
  };
  function Vh(t2) {
    return class extends t2 {
      get pa() {
        return this.j;
      }
      Sa() {
        if ("function" == typeof this.pa._mediapipeLoggerGetEncodedApiKey) {
          let t3 = this.pa._mediapipeLoggerGetEncodedApiKey();
          return this.pa._decodeBase64(t3);
        }
      }
    };
  }
  function Hh(t2) {
    return class extends t2 {
      Za() {
        this.j._registerModelResourcesGraphService();
      }
    };
  }
  var Kh = Vh(Hh(Gh));
  var Xh = class extends Kh {
  };
  async function Wh(t2, e2, r2, n2) {
    return t2 = await (async (t3, e3, r3, n3, i2) => {
      if (e3 && await Mh(e3), !self.ModuleFactory) throw Error("ModuleFactory not set.");
      if (r3 && (await Mh(r3), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
      return self.Module && i2 && ((e3 = self.Module).locateFile = i2.locateFile, i2.mainScriptUrlOrBlob && (e3.mainScriptUrlOrBlob = i2.mainScriptUrlOrBlob)), i2 = await self.ModuleFactory(self.Module || i2), self.ModuleFactory = self.Module = void 0, new t3(i2, n3);
    })(t2, r2.wasmLoaderPath, r2.assetLoaderPath, e2, { locateFile: (t3) => t3.endsWith(".wasm") ? r2.wasmBinaryPath.toString() : r2.assetBinaryPath && t3.endsWith(".data") ? r2.assetBinaryPath.toString() : t3 }), (function(t3, e3) {
      e3 = e3.runningMode ?? "";
      var r3 = t3.h.Sa();
      t3.o = new Nh(t3.D(), e3, r3);
    })(t2, n2), await t2.A(n2), t2;
  }
  async function Yh(t2, e2, r2, n2) {
    return Wh(t2, e2, r2, n2);
  }
  function zh(t2, e2, r2) {
    try {
      t2.h.j.FS_unlink(`/${r2}`);
    } catch {
    }
    t2.h.j.FS_createDataFile("/", r2, e2, true, false, true), qh(t2, `/${r2}`);
  }
  function qh(t2, e2) {
    var r2 = Tr(t2.baseOptions, Wo, 1) || new Wo();
    "string" == typeof e2 ? (sr(r2, 2, ge(e2)), sr(r2, 1)) : e2 instanceof Uint8Array && (sr(r2, 1, lt(e2, false)), sr(r2, 2)), Lr(t2.baseOptions, 0, 1, r2);
  }
  function Jh(t2) {
    try {
      let e2 = t2.L.length;
      if (1 === e2) throw Error(t2.L[0].message);
      if (e2 > 1) throw Error("Encountered multiple errors: " + t2.L.map((t3) => t3.message).join(", "));
    } finally {
      t2.L = [];
    }
  }
  function Zh(t2, e2) {
    t2.J = Math.max(t2.J, e2);
  }
  function Qh(t2, e2) {
    t2.F = new ho(), jr(t2.F, 2, "PassThroughCalculator"), oo(t2.F, "free_memory"), ao(t2.F, "free_memory_unused_out"), po(e2, "free_memory"), fo(e2, t2.F);
  }
  function tu(t2, e2) {
    oo(t2.F, e2), ao(t2.F, e2 + "_unused_out");
  }
  function eu(t2) {
    t2.h.addBoolToStream(true, "free_memory", t2.J);
  }
  var ru = class {
    constructor(t2) {
      this.h = t2, this.L = [], this.J = 0, this.h.setAutoRenderToScreen(false);
    }
    l(t2, e2 = true, r2 = false, n2 = false) {
      if (e2) {
        let e3 = t2.baseOptions || {};
        if (t2.baseOptions?.modelAssetBuffer && t2.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
        if (!(Tr(this.baseOptions, Wo, 1)?.h() || Tr(this.baseOptions, Wo, 1)?.l() || t2.baseOptions?.modelAssetBuffer || t2.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
        !(function(t3, e4, r3 = false) {
          var n3 = Tr(t3.baseOptions, Ko, 3);
          if (!n3) {
            var i3 = n3 = new Ko(), s2 = new Qs();
            xr(i3, 4, Xo, s2);
          }
          "delegate" in e4 && ("GPU" === e4.delegate ? (e4 = n3, i3 = new Xs(), xr(e4, 2, Xo, i3)) : (e4 = n3, i3 = new Qs(), xr(e4, 4, Xo, i3))), r3 && (r3 = n3.l(), e4 = n3.h() || true === r3?.h(), r3 = new qs(), e4 ? Lr(r3, 0, 9, e4 = new zs()) : Lr(r3, 0, 8, e4 = new Ys()), xr(n3, 6, Xo, r3)), Lr(t3.baseOptions, 0, 3, n3);
        })(this, e3, n2);
        let i2 = r2 ? "model.litertlm" : "model.dat";
        if (e3.modelAssetPath) return fetch(e3.modelAssetPath.toString()).then((t3) => {
          if (t3.ok) return t3.arrayBuffer();
          throw Error(`Failed to fetch model: ${e3.modelAssetPath} (${t3.status})`);
        }).then((t3) => {
          zh(this, new Uint8Array(t3), i2), this.u(), this.M();
        });
        if (e3.modelAssetBuffer instanceof Uint8Array) r2 ? zh(this, e3.modelAssetBuffer, i2) : qh(this, e3.modelAssetBuffer);
        else if (e3.modelAssetBuffer) return (async function(t3) {
          for (var e4 = [], r3 = 0; ; ) {
            let { done: n3, value: i3 } = await t3.read();
            if (n3) break;
            e4.push(i3), r3 += i3.length;
          }
          if (0 === e4.length) return new Uint8Array(0);
          if (1 === e4.length) return e4[0];
          t3 = new Uint8Array(r3), r3 = 0;
          for (let n3 of e4) t3.set(n3, r3), r3 += n3.length;
          return t3;
        })(e3.modelAssetBuffer).then((t3) => {
          r2 ? zh(this, t3, i2) : qh(this, t3), this.u(), this.M();
        });
      }
      return this.u(), this.M(), Promise.resolve();
    }
    M() {
    }
    ka() {
      var t2;
      if (this.h.ka((e2) => {
        t2 = _o(e2);
      }), !t2) throw Error("Failed to retrieve CalculatorGraphConfig");
      return t2;
    }
    setGraph(t2, e2) {
      this.h.attachErrorListener((t3, e3) => {
        this.L.push(Error(e3));
      }), this.h.Za(), this.h.setGraph(t2, e2), this.o?.ya(), this.F = void 0, Jh(this);
    }
    finishProcessing(t2) {
      this.h.finishProcessing(), Jh(this), this.o && void 0 !== t2 && this.o.za(t2);
    }
    close() {
      this.F = void 0, this.o?.xa(), this.o?.close(), this.h.closeGraph();
    }
  };
  function nu(t2, e2) {
    if (!t2) throw Error(`Unable to obtain required WebGL resource: ${e2}`);
    return t2;
  }
  ru.prototype.close = ru.prototype.close;
  var iu = class {
    constructor(t2, e2, r2, n2) {
      this.h = t2, this.i = e2, this.o = r2, this.l = n2;
    }
    bind() {
      this.h.bindVertexArray(this.i);
    }
    close() {
      this.h.deleteVertexArray(this.i), this.h.deleteBuffer(this.o), this.h.deleteBuffer(this.l);
    }
  };
  function su(t2, e2, r2) {
    var n2 = t2.h;
    if (r2 = nu(n2.createShader(r2), "Failed to create WebGL shader"), n2.shaderSource(r2, e2), n2.compileShader(r2), !n2.getShaderParameter(r2, n2.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${n2.getShaderInfoLog(r2)}`);
    return n2.attachShader(t2.i, r2), r2;
  }
  function ou(t2, e2) {
    var r2 = t2.h, n2 = nu(r2.createVertexArray(), "Failed to create vertex array");
    r2.bindVertexArray(n2);
    var i2 = nu(r2.createBuffer(), "Failed to create buffer");
    r2.bindBuffer(r2.ARRAY_BUFFER, i2), r2.enableVertexAttribArray(t2.G), r2.vertexAttribPointer(t2.G, 2, r2.FLOAT, false, 0, 0), r2.bufferData(r2.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), r2.STATIC_DRAW);
    var s2 = nu(r2.createBuffer(), "Failed to create buffer");
    return r2.bindBuffer(r2.ARRAY_BUFFER, s2), r2.enableVertexAttribArray(t2.L), r2.vertexAttribPointer(t2.L, 2, r2.FLOAT, false, 0, 0), r2.bufferData(r2.ARRAY_BUFFER, new Float32Array(e2 ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), r2.STATIC_DRAW), r2.bindBuffer(r2.ARRAY_BUFFER, null), r2.bindVertexArray(null), new iu(r2, n2, i2, s2);
  }
  function au(t2, e2) {
    if (t2.h) {
      if (e2 !== t2.h) throw Error("Cannot change GL context once initialized");
    } else t2.h = e2;
  }
  function hu(t2, e2, r2, n2) {
    return au(t2, e2), t2.i || (t2.o(), t2.J()), r2 ? (t2.m || (t2.m = ou(t2, true)), r2 = t2.m) : (t2.F || (t2.F = ou(t2, false)), r2 = t2.F), e2.useProgram(t2.i), r2.bind(), t2.l(), t2 = n2(), r2.h.bindVertexArray(null), t2;
  }
  function uu(t2, e2, r2) {
    return au(t2, e2), t2 = nu(e2.createTexture(), "Failed to create texture"), e2.bindTexture(e2.TEXTURE_2D, t2), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_S, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_WRAP_T, e2.CLAMP_TO_EDGE), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MIN_FILTER, r2 ?? e2.LINEAR), e2.texParameteri(e2.TEXTURE_2D, e2.TEXTURE_MAG_FILTER, r2 ?? e2.LINEAR), e2.bindTexture(e2.TEXTURE_2D, null), t2;
  }
  function cu(t2, e2, r2) {
    au(t2, e2), t2.D || (t2.D = nu(e2.createFramebuffer(), "Failed to create framebuffe.")), e2.bindFramebuffer(e2.FRAMEBUFFER, t2.D), e2.framebufferTexture2D(e2.FRAMEBUFFER, e2.COLOR_ATTACHMENT0, e2.TEXTURE_2D, r2, 0);
  }
  function lu(t2) {
    t2.h?.bindFramebuffer(t2.h.FRAMEBUFFER, null);
  }
  var du = class {
    C() {
      return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
    }
    o() {
      var t2 = this.h;
      if (this.i = nu(t2.createProgram(), "Failed to create WebGL program"), this.ea = su(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t2.VERTEX_SHADER), this.aa = su(this, this.C(), t2.FRAGMENT_SHADER), t2.linkProgram(this.i), !t2.getProgramParameter(this.i, t2.LINK_STATUS)) throw Error(`Error during program linking: ${t2.getProgramInfoLog(this.i)}`);
      this.G = t2.getAttribLocation(this.i, "aVertex"), this.L = t2.getAttribLocation(this.i, "aTex");
    }
    J() {
    }
    l() {
    }
    close() {
      if (this.i) {
        let t2 = this.h;
        t2.deleteProgram(this.i), t2.deleteShader(this.ea), t2.deleteShader(this.aa);
      }
      this.D && this.h.deleteFramebuffer(this.D), this.F && this.F.close(), this.m && this.m.close();
    }
  };
  var fu = class extends du {
    C() {
      return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
    }
    J() {
      var t2 = this.h;
      t2.activeTexture(t2.TEXTURE1), this.v = uu(this, t2, t2.LINEAR), t2.activeTexture(t2.TEXTURE2), this.u = uu(this, t2, t2.NEAREST);
    }
    o() {
      super.o();
      var t2 = this.h;
      this.P = nu(t2.getUniformLocation(this.i, "backgroundTexture"), "Uniform location"), this.Z = nu(t2.getUniformLocation(this.i, "colorMappingTexture"), "Uniform location"), this.M = nu(t2.getUniformLocation(this.i, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      var t2 = this.h;
      t2.uniform1i(this.M, 0), t2.uniform1i(this.P, 1), t2.uniform1i(this.Z, 2);
    }
    close() {
      this.v && this.h.deleteTexture(this.v), this.u && this.h.deleteTexture(this.u), super.close();
    }
  };
  var pu = class extends du {
    C() {
      return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
    }
    J() {
      var t2 = this.h;
      t2.activeTexture(t2.TEXTURE1), this.u = uu(this, t2), t2.activeTexture(t2.TEXTURE2), this.v = uu(this, t2);
    }
    o() {
      super.o();
      var t2 = this.h;
      this.M = nu(t2.getUniformLocation(this.i, "defaultTexture"), "Uniform location"), this.P = nu(t2.getUniformLocation(this.i, "overlayTexture"), "Uniform location"), this.K = nu(t2.getUniformLocation(this.i, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      var t2 = this.h;
      t2.uniform1i(this.K, 0), t2.uniform1i(this.M, 1), t2.uniform1i(this.P, 2);
    }
    close() {
      this.u && this.h.deleteTexture(this.u), this.v && this.h.deleteTexture(this.v), super.close();
    }
  };
  function mu(t2, e2) {
    switch (e2) {
      case 0:
        return t2.h.find((t3) => t3 instanceof Uint8Array);
      case 1:
        return t2.h.find((t3) => t3 instanceof Float32Array);
      case 2:
        return t2.h.find((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture);
      default:
        throw Error(`Type is not supported: ${e2}`);
    }
  }
  function gu(t2) {
    var e2 = mu(t2, 1);
    if (!e2) {
      if (e2 = mu(t2, 0)) e2 = new Float32Array(e2).map((t3) => t3 / 255);
      else {
        e2 = new Float32Array(t2.width * t2.height);
        let n2 = _u(t2);
        var r2 = Eu(t2);
        if (cu(r2, n2, vu(t2)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "document" in self && "ontouchend" in self.document) {
          r2 = new Float32Array(t2.width * t2.height * 4), n2.readPixels(0, 0, t2.width, t2.height, n2.RGBA, n2.FLOAT, r2);
          for (let t3 = 0, n3 = 0; t3 < e2.length; ++t3, n3 += 4) e2[t3] = r2[n3];
        } else n2.readPixels(0, 0, t2.width, t2.height, n2.RED, n2.FLOAT, e2);
      }
      t2.h.push(e2);
    }
    return e2;
  }
  function vu(t2) {
    var e2 = mu(t2, 2);
    if (!e2) {
      let r2 = _u(t2);
      e2 = Au(t2);
      let n2 = gu(t2), i2 = yu(t2);
      r2.texImage2D(r2.TEXTURE_2D, 0, i2, t2.width, t2.height, 0, r2.RED, r2.FLOAT, n2), wu(t2);
    }
    return e2;
  }
  function _u(t2) {
    if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
    return t2.i || (t2.i = nu(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.i;
  }
  function yu(t2) {
    if (t2 = _u(t2), !Tu) if (t2.getExtension("EXT_color_buffer_float") && t2.getExtension("OES_texture_float_linear") && t2.getExtension("EXT_float_blend")) Tu = t2.R32F;
    else {
      if (!t2.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
      Tu = t2.R16F;
    }
    return Tu;
  }
  function Eu(t2) {
    return t2.l || (t2.l = new du()), t2.l;
  }
  function Au(t2) {
    var e2 = _u(t2);
    e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
    var r2 = mu(t2, 2);
    return r2 || (r2 = uu(Eu(t2), e2, t2.o ? e2.LINEAR : e2.NEAREST), t2.h.push(r2), t2.u = true), e2.bindTexture(e2.TEXTURE_2D, r2), r2;
  }
  function wu(t2) {
    t2.i.bindTexture(t2.i.TEXTURE_2D, null);
  }
  var Tu;
  var bu = class {
    constructor(t2, e2, r2, n2, i2, s2, o2) {
      this.h = t2, this.o = e2, this.u = r2, this.canvas = n2, this.l = i2, this.width = s2, this.height = o2, this.u && (0 === --ku && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources."));
    }
    Ua() {
      return !!mu(this, 0);
    }
    ua() {
      return !!mu(this, 1);
    }
    X() {
      return !!mu(this, 2);
    }
    ta() {
      return (e2 = mu(t2 = this, 0)) || (e2 = gu(t2), e2 = new Uint8Array(e2.map((t3) => Math.round(255 * t3))), t2.h.push(e2)), e2;
      var t2, e2;
    }
    sa() {
      return gu(this);
    }
    T() {
      return vu(this);
    }
    clone() {
      var t2 = [];
      for (let e2 of this.h) {
        let r2;
        if (e2 instanceof Uint8Array) r2 = new Uint8Array(e2);
        else if (e2 instanceof Float32Array) r2 = new Float32Array(e2);
        else {
          if (!(e2 instanceof WebGLTexture)) throw Error(`Type is not supported: ${e2}`);
          {
            let t3 = _u(this), e3 = Eu(this);
            t3.activeTexture(t3.TEXTURE1), r2 = uu(e3, t3, this.o ? t3.LINEAR : t3.NEAREST), t3.bindTexture(t3.TEXTURE_2D, r2);
            let n2 = yu(this);
            t3.texImage2D(t3.TEXTURE_2D, 0, n2, this.width, this.height, 0, t3.RED, t3.FLOAT, null), t3.bindTexture(t3.TEXTURE_2D, null), cu(e3, t3, r2), hu(e3, t3, false, () => {
              Au(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), wu(this);
            }), lu(e3), wu(this);
          }
        }
        t2.push(r2);
      }
      return new bu(t2, this.o, this.X(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.u && _u(this).deleteTexture(mu(this, 2)), ku = -1;
    }
  };
  bu.prototype.close = bu.prototype.close, bu.prototype.clone = bu.prototype.clone, bu.prototype.getAsWebGLTexture = bu.prototype.T, bu.prototype.getAsFloat32Array = bu.prototype.sa, bu.prototype.getAsUint8Array = bu.prototype.ta, bu.prototype.hasWebGLTexture = bu.prototype.X, bu.prototype.hasFloat32Array = bu.prototype.ua, bu.prototype.hasUint8Array = bu.prototype.Ua;
  var ku = 250;
  var Su = { color: "white", lineWidth: 4, radius: 6 };
  function Lu(t2) {
    return { ...Su, fillColor: (t2 = t2 || {}).color, ...t2 };
  }
  function xu(t2, e2) {
    return t2 instanceof Function ? t2(e2) : t2;
  }
  function Ru(t2, e2, r2) {
    return Math.max(Math.min(e2, r2), Math.min(Math.max(e2, r2), t2));
  }
  function Iu(t2) {
    if (!t2.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
    return t2.l;
  }
  function Fu(t2) {
    if (!t2.u) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
    return t2.u;
  }
  function Cu(t2, e2, r2) {
    if (e2.X()) r2(e2.T());
    else {
      let n2 = e2.ua() ? e2.sa() : e2.ta();
      t2.o = t2.o ?? new du();
      let i2 = Fu(t2);
      r2((t2 = new bu([n2], e2.o, false, i2.canvas, t2.o, e2.width, e2.height)).T()), t2.close();
    }
  }
  function Nu(t2, e2, r2, n2) {
    var i2 = (function(t3) {
      return t3.h || (t3.h = new fu()), t3.h;
    })(t2), s2 = Fu(t2), o2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2;
    hu(i2, s2, true, () => {
      !(function(t4, e3, r3, n3) {
        var i3 = t4.h;
        if (i3.activeTexture(i3.TEXTURE0), i3.bindTexture(i3.TEXTURE_2D, e3), i3.activeTexture(i3.TEXTURE1), i3.bindTexture(i3.TEXTURE_2D, t4.v), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, i3.RGBA, i3.UNSIGNED_BYTE, r3), t4.K && (function(t5, e4) {
          if (t5 !== e4) return false;
          t5 = t5.entries(), e4 = e4.entries();
          for (let [r4, n4] of t5) {
            t5 = r4;
            let i4 = n4, s3 = e4.next();
            if (s3.done) return false;
            let [o3, a2] = s3.value;
            if (t5 !== o3 || i4[0] !== a2[0] || i4[1] !== a2[1] || i4[2] !== a2[2] || i4[3] !== a2[3]) return false;
          }
          return !!e4.next().done;
        })(t4.K, n3)) i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.u);
        else {
          t4.K = n3;
          let e4 = Array(1024).fill(0);
          n3.forEach((t5, r4) => {
            if (4 !== t5.length) throw Error(`Color at index ${r4} is not a four-channel value.`);
            e4[4 * r4] = t5[0], e4[4 * r4 + 1] = t5[1], e4[4 * r4 + 2] = t5[2], e4[4 * r4 + 3] = t5[3];
          }), i3.activeTexture(i3.TEXTURE2), i3.bindTexture(i3.TEXTURE_2D, t4.u), i3.texImage2D(i3.TEXTURE_2D, 0, i3.RGBA, 256, 1, 0, i3.RGBA, i3.UNSIGNED_BYTE, new Uint8Array(e4));
        }
      })(i2, e2, o2, n2), s2.clearColor(0, 0, 0, 0), s2.clear(s2.COLOR_BUFFER_BIT), s2.drawArrays(s2.TRIANGLE_FAN, 0, 4);
      var t3 = i2.h;
      t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
    });
  }
  function Ou(t2, e2, r2, n2) {
    var i2 = Fu(t2), s2 = (function(t3) {
      return t3.i || (t3.i = new pu()), t3.i;
    })(t2), o2 = Array.isArray(r2) ? new ImageData(new Uint8ClampedArray(r2), 1, 1) : r2, a2 = Array.isArray(n2) ? new ImageData(new Uint8ClampedArray(n2), 1, 1) : n2;
    hu(s2, i2, true, () => {
      var t3 = s2.h;
      t3.activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, e2), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, s2.u), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, o2), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, s2.v), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, t3.RGBA, t3.UNSIGNED_BYTE, a2), i2.clearColor(0, 0, 0, 0), i2.clear(i2.COLOR_BUFFER_BIT), i2.drawArrays(i2.TRIANGLE_FAN, 0, 4), i2.bindTexture(i2.TEXTURE_2D, null), (t3 = s2.h).activeTexture(t3.TEXTURE0), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE1), t3.bindTexture(t3.TEXTURE_2D, null), t3.activeTexture(t3.TEXTURE2), t3.bindTexture(t3.TEXTURE_2D, null);
    });
  }
  var Mu = class {
    constructor(t2, e2) {
      "undefined" != typeof CanvasRenderingContext2D && t2 instanceof CanvasRenderingContext2D || t2 instanceof OffscreenCanvasRenderingContext2D ? (this.l = t2, this.u = e2) : this.u = t2;
    }
    Ma(t2, e2) {
      if (t2) {
        var r2 = Iu(this);
        e2 = Lu(e2), r2.save();
        var n2 = r2.canvas, i2 = 0;
        for (let s2 of t2) r2.fillStyle = xu(e2.fillColor, { index: i2, from: s2 }), r2.strokeStyle = xu(e2.color, { index: i2, from: s2 }), r2.lineWidth = xu(e2.lineWidth, { index: i2, from: s2 }), (t2 = new Path2D()).arc(s2.x * n2.width, s2.y * n2.height, xu(e2.radius, { index: i2, from: s2 }), 0, 2 * Math.PI), r2.fill(t2), r2.stroke(t2), ++i2;
        r2.restore();
      }
    }
    La(t2, e2, r2) {
      if (t2 && e2) {
        var n2 = Iu(this);
        r2 = Lu(r2), n2.save();
        var i2 = n2.canvas, s2 = 0;
        for (let o2 of e2) {
          n2.beginPath(), e2 = t2[o2.start];
          let a2 = t2[o2.end];
          e2 && a2 && (n2.strokeStyle = xu(r2.color, { index: s2, from: e2, to: a2 }), n2.lineWidth = xu(r2.lineWidth, { index: s2, from: e2, to: a2 }), n2.moveTo(e2.x * i2.width, e2.y * i2.height), n2.lineTo(a2.x * i2.width, a2.y * i2.height)), ++s2, n2.stroke();
        }
        n2.restore();
      }
    }
    Ia(t2, e2) {
      var r2 = Iu(this);
      e2 = Lu(e2), r2.save(), r2.beginPath(), r2.lineWidth = xu(e2.lineWidth, {}), r2.strokeStyle = xu(e2.color, {}), r2.fillStyle = xu(e2.fillColor, {}), r2.moveTo(t2.originX, t2.originY), r2.lineTo(t2.originX + t2.width, t2.originY), r2.lineTo(t2.originX + t2.width, t2.originY + t2.height), r2.lineTo(t2.originX, t2.originY + t2.height), r2.lineTo(t2.originX, t2.originY), r2.stroke(), r2.fill(), r2.restore();
    }
    Ja(t2, e2, r2 = [0, 0, 0, 255]) {
      this.l ? (function(t3, e3, r3, n2) {
        var i2 = Fu(t3);
        Cu(t3, e3, (e4) => {
          Nu(t3, e4, r3, n2), (e4 = Iu(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
        });
      })(this, t2, r2, e2) : Nu(this, t2.T(), r2, e2);
    }
    Ka(t2, e2, r2) {
      this.l ? (function(t3, e3, r3, n2) {
        var i2 = Fu(t3);
        Cu(t3, e3, (e4) => {
          Ou(t3, e4, r3, n2), (e4 = Iu(t3)).drawImage(i2.canvas, 0, 0, e4.canvas.width, e4.canvas.height);
        });
      })(this, t2, e2, r2) : Ou(this, t2.T(), e2, r2);
    }
    close() {
      this.h?.close(), this.h = void 0, this.i?.close(), this.i = void 0, this.o?.close(), this.o = void 0;
    }
  };
  function Du(t2, e2) {
    switch (e2) {
      case 0:
        return t2.h.find((t3) => t3 instanceof ImageData);
      case 1:
        return t2.h.find((t3) => "undefined" != typeof ImageBitmap && t3 instanceof ImageBitmap);
      case 2:
        return t2.h.find((t3) => "undefined" != typeof WebGLTexture && t3 instanceof WebGLTexture);
      default:
        throw Error(`Type is not supported: ${e2}`);
    }
  }
  function Pu(t2) {
    var e2 = Du(t2, 0);
    if (!e2) {
      e2 = Uu(t2);
      let r2 = Bu(t2), n2 = new Uint8Array(t2.width * t2.height * 4);
      cu(r2, e2, $u(t2)), e2.readPixels(0, 0, t2.width, t2.height, e2.RGBA, e2.UNSIGNED_BYTE, n2), lu(r2), e2 = new ImageData(new Uint8ClampedArray(n2.buffer), t2.width, t2.height), t2.h.push(e2);
    }
    return e2;
  }
  function $u(t2) {
    var e2 = Du(t2, 2);
    if (!e2) {
      let r2 = Uu(t2);
      e2 = ju(t2);
      let n2 = Du(t2, 1) || Pu(t2);
      r2.texImage2D(r2.TEXTURE_2D, 0, r2.RGBA, r2.RGBA, r2.UNSIGNED_BYTE, n2), Gu(t2);
    }
    return e2;
  }
  function Uu(t2) {
    if (!t2.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
    return t2.i || (t2.i = nu(t2.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t2.i;
  }
  function Bu(t2) {
    return t2.l || (t2.l = new du()), t2.l;
  }
  function ju(t2) {
    var e2 = Uu(t2);
    e2.viewport(0, 0, t2.width, t2.height), e2.activeTexture(e2.TEXTURE0);
    var r2 = Du(t2, 2);
    return r2 || (r2 = uu(Bu(t2), e2), t2.h.push(r2), t2.o = true), e2.bindTexture(e2.TEXTURE_2D, r2), r2;
  }
  function Gu(t2) {
    t2.i.bindTexture(t2.i.TEXTURE_2D, null);
  }
  function Vu(t2) {
    var e2 = Uu(t2);
    return hu(Bu(t2), e2, true, () => (function(t3, e3) {
      var r2 = t3.canvas;
      if (r2.width === t3.width && r2.height === t3.height) return e3();
      var n2 = r2.width, i2 = r2.height;
      return r2.width = t3.width, r2.height = t3.height, t3 = e3(), r2.width = n2, r2.height = i2, t3;
    })(t2, () => {
      if (e2.bindFramebuffer(e2.FRAMEBUFFER, null), e2.clearColor(0, 0, 0, 0), e2.clear(e2.COLOR_BUFFER_BIT), e2.drawArrays(e2.TRIANGLE_FAN, 0, 4), !(t2.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
      return t2.canvas.transferToImageBitmap();
    }));
  }
  Mu.prototype.close = Mu.prototype.close, Mu.prototype.drawConfidenceMask = Mu.prototype.Ka, Mu.prototype.drawCategoryMask = Mu.prototype.Ja, Mu.prototype.drawBoundingBox = Mu.prototype.Ia, Mu.prototype.drawConnectors = Mu.prototype.La, Mu.prototype.drawLandmarks = Mu.prototype.Ma, Mu.lerp = function(t2, e2, r2, n2, i2) {
    return Ru(n2 * (1 - (t2 - e2) / (r2 - e2)) + i2 * (1 - (r2 - t2) / (r2 - e2)), n2, i2);
  }, Mu.clamp = Ru;
  var Hu = class {
    constructor(t2, e2, r2, n2, i2, s2, o2) {
      this.h = t2, this.u = e2, this.o = r2, this.canvas = n2, this.l = i2, this.width = s2, this.height = o2, (this.u || this.o) && (0 === --Ku && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources."));
    }
    Ta() {
      return !!Du(this, 0);
    }
    va() {
      return !!Du(this, 1);
    }
    X() {
      return !!Du(this, 2);
    }
    Qa() {
      return Pu(this);
    }
    Pa() {
      var t2 = Du(this, 1);
      return t2 || ($u(this), ju(this), t2 = Vu(this), Gu(this), this.h.push(t2), this.u = true), t2;
    }
    T() {
      return $u(this);
    }
    clone() {
      var t2 = [];
      for (let e2 of this.h) {
        let r2;
        if (e2 instanceof ImageData) r2 = new ImageData(e2.data, this.width, this.height);
        else if (e2 instanceof WebGLTexture) {
          let t3 = Uu(this), e3 = Bu(this);
          t3.activeTexture(t3.TEXTURE1), r2 = uu(e3, t3), t3.bindTexture(t3.TEXTURE_2D, r2), t3.texImage2D(t3.TEXTURE_2D, 0, t3.RGBA, this.width, this.height, 0, t3.RGBA, t3.UNSIGNED_BYTE, null), t3.bindTexture(t3.TEXTURE_2D, null), cu(e3, t3, r2), hu(e3, t3, false, () => {
            ju(this), t3.clearColor(0, 0, 0, 0), t3.clear(t3.COLOR_BUFFER_BIT), t3.drawArrays(t3.TRIANGLE_FAN, 0, 4), Gu(this);
          }), lu(e3), Gu(this);
        } else {
          if (!(e2 instanceof ImageBitmap)) throw Error(`Type is not supported: ${e2}`);
          $u(this), ju(this), r2 = Vu(this), Gu(this);
        }
        t2.push(r2);
      }
      return new Hu(t2, this.va(), this.X(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.u && Du(this, 1).close(), this.o && Uu(this).deleteTexture(Du(this, 2)), Ku = -1;
    }
  };
  Hu.prototype.close = Hu.prototype.close, Hu.prototype.clone = Hu.prototype.clone, Hu.prototype.getAsWebGLTexture = Hu.prototype.T, Hu.prototype.getAsImageBitmap = Hu.prototype.Pa, Hu.prototype.getAsImageData = Hu.prototype.Qa, Hu.prototype.hasWebGLTexture = Hu.prototype.X, Hu.prototype.hasImageBitmap = Hu.prototype.va, Hu.prototype.hasImageData = Hu.prototype.Ta;
  var Ku = 250;
  function Xu(...t2) {
    return t2.map(([t3, e2]) => ({ start: t3, end: e2 }));
  }
  var Wu;
  var Yu = Hh((Wu = Vh(Gh), class extends Wu {
    get oa() {
      return this.j;
    }
    Da(t2, e2, r2) {
      Ph(this, e2, (e3) => {
        var [n2, i2] = $h(this, t2, e3);
        this.oa._addBoundTextureAsImageToStream(e3, n2, i2, r2);
      });
    }
    ha(t2, e2) {
      Bh(this, t2, e2), Ph(this, t2, (t3) => {
        this.oa._attachImageListener(t3);
      });
    }
    ia(t2, e2) {
      jh(this, t2, e2), Ph(this, t2, (t3) => {
        this.oa._attachImageVectorListener(t3);
      });
    }
  }));
  var zu = class extends Yu {
  };
  async function qu(t2, e2, r2) {
    return Yh(t2, r2.canvas ?? (Oh() ? void 0 : document.createElement("canvas")), e2, r2);
  }
  function Ju(t2, e2, r2, n2) {
    if (t2.o && void 0 !== n2) {
      var i2 = Tr(t2.baseOptions, Ko, 3);
      i2?.h() || i2?.l()?.h() ? (++(i2 = t2.o).h.U, i2.i.set(n2, performance.now())) : (++(i2 = t2.o).h.R, i2.i.set(n2, performance.now()));
    }
    if (t2.qa) {
      if (i2 = new No(), r2?.regionOfInterest) {
        if (!t2.Ca) throw Error("This task doesn't support region-of-interest.");
        let e3 = r2.regionOfInterest;
        if (e3.left >= e3.right || e3.top >= e3.bottom) throw Error("Expected RectF with left < right and top < bottom.");
        if (e3.left < 0 || e3.top < 0 || e3.right > 1 || e3.bottom > 1) throw Error("Expected RectF values to be in [0,1].");
        Ur(i2, 1, (e3.left + e3.right) / 2), Ur(i2, 2, (e3.top + e3.bottom) / 2), Ur(i2, 4, e3.right - e3.left), Ur(i2, 3, e3.bottom - e3.top);
      } else Ur(i2, 1, 0.5), Ur(i2, 2, 0.5), Ur(i2, 4, 1), Ur(i2, 3, 1);
      if (r2?.rotationDegrees) {
        if (r2?.rotationDegrees % 90 != 0) throw Error("Expected rotation to be a multiple of 90\xB0.");
        if (Ur(i2, 5, -Math.PI * r2.rotationDegrees / 180), r2?.rotationDegrees % 180 != 0) {
          let [t3, n3] = Dh(e2);
          r2 = Nr(i2, 4) * t3 / n3, Ur(i2, 4, Nr(i2, 3) * n3 / t3), Ur(i2, 3, r2);
        }
      }
      t2.h.addProtoToStream(i2.h(), "mediapipe.NormalizedRect", t2.qa, n2);
    }
    t2.h.Da(e2, t2.Ba, n2 ?? performance.now()), t2.finishProcessing(n2);
  }
  function Zu(t2, e2, r2) {
    if (t2.K) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
    Ju(t2, e2, r2, t2.J + 1);
  }
  function Qu(t2, e2, r2, n2) {
    if (!t2.K) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
    Ju(t2, e2, r2, n2);
  }
  function tc(t2, e2, r2, n2) {
    var i2 = e2.data, s2 = e2.width, o2 = s2 * (e2 = e2.height);
    if ((i2 instanceof Uint8Array || i2 instanceof Float32Array) && i2.length !== o2) throw Error("Unsupported channel count: " + i2.length / o2);
    return t2 = new bu([i2], r2, false, t2.h.j.canvas, t2.ea, s2, e2), n2 ? t2.clone() : t2;
  }
  var ec = class extends ru {
    constructor(t2, e2, r2, n2) {
      super(t2), this.h = t2, this.Ba = e2, this.qa = r2, this.Ca = n2, this.ea = new du(), this.K = false;
    }
    l(t2, e2 = true, r2 = false, n2 = false) {
      if ("runningMode" in t2) {
        var i2 = this.K = !!t2.runningMode && "IMAGE" !== t2.runningMode;
        sr(this.baseOptions, 2, null == i2 ? i2 : Zt(i2));
      }
      if (void 0 !== t2.canvas && this.h.j.canvas !== t2.canvas) throw Error("You must create a new task to reset the canvas.");
      return super.l(t2, e2, r2, n2);
    }
    close() {
      this.ea.close(), super.close();
    }
  };
  ec.prototype.close = ec.prototype.close;
  var rc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect_in", false), this.m = { detections: [] }, Lr(t2 = this.i = new Zo(), 0, 1, e2 = new Yo()), Ur(this.i, 2, 0.5), Ur(this.i, 3, 0.3);
    }
    D() {
      return "FaceDetector";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return "minDetectionConfidence" in t2 && Ur(this.i, 2, t2.minDetectionConfidence ?? 0.5), "minSuppressionThreshold" in t2 && Ur(this.i, 3, t2.minSuppressionThreshold ?? 0.3), this.l(t2);
    }
    H(t2, e2) {
      return this.m = { detections: [] }, Zu(this, t2, e2), this.m;
    }
    I(t2, e2, r2) {
      return this.m = { detections: [] }, Qu(this, t2, r2, e2), this.m;
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect_in"), mo(t2, "detections");
      var e2 = new no();
      hi(e2, ta, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect_in"), ao(r2, "DETECTIONS:detections"), r2.A(e2), fo(t2, r2), this.h.attachProtoVectorListener("detections", (t3, e3) => {
        for (let e4 of t3) t3 = So(e4), this.m.detections.push(Za(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("detections", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  rc.prototype.detectForVideo = rc.prototype.I, rc.prototype.detect = rc.prototype.H, rc.prototype.setOptions = rc.prototype.A, rc.createFromModelPath = async function(t2, e2) {
    return qu(rc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, rc.createFromModelBuffer = function(t2, e2) {
    return qu(rc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, rc.createFromOptions = function(t2, e2) {
    return qu(rc, t2, e2);
  };
  var nc = Xu([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]);
  var ic = Xu([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]);
  var sc = Xu([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]);
  var oc = Xu([474, 475], [475, 476], [476, 477], [477, 474]);
  var ac = Xu([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]);
  var hc = Xu([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]);
  var uc = Xu([469, 470], [470, 471], [471, 472], [472, 469]);
  var cc = Xu([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]);
  var lc = [...nc, ...ic, ...sc, ...ac, ...hc, ...cc];
  var dc = Xu([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
  function fc(t2) {
    t2.m = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] };
  }
  var pc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", false), this.m = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = false, Lr(t2 = this.i = new na(), 0, 1, e2 = new Yo()), this.C = new ra(), Lr(this.i, 0, 3, this.C), this.v = new Zo(), Lr(this.i, 0, 2, this.v), Dr(this.v, 4, 1), Ur(this.v, 2, 0.5), Ur(this.C, 2, 0.5), Ur(this.i, 4, 0.5);
    }
    D() {
      return "FaceLandmarker";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return "numFaces" in t2 && Dr(this.v, 4, t2.numFaces ?? 1), "minFaceDetectionConfidence" in t2 && Ur(this.v, 2, t2.minFaceDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ur(this.i, 4, t2.minTrackingConfidence ?? 0.5), "minFacePresenceConfidence" in t2 && Ur(this.C, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t2 && (this.outputFacialTransformationMatrixes = !!t2.outputFacialTransformationMatrixes), this.l(t2);
    }
    H(t2, e2) {
      return fc(this), Zu(this, t2, e2), this.m;
    }
    I(t2, e2, r2) {
      return fc(this), Qu(this, t2, r2, e2), this.m;
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect"), mo(t2, "face_landmarks");
      var e2 = new no();
      hi(e2, sa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "NORM_LANDMARKS:face_landmarks"), r2.A(e2), fo(t2, r2), this.h.attachProtoVectorListener("face_landmarks", (t3, e3) => {
        for (let e4 of t3) t3 = Io(e4), this.m.faceLandmarks.push(Qa(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("face_landmarks", (t3) => {
        Zh(this, t3);
      }), this.outputFaceBlendshapes && (mo(t2, "blendshapes"), ao(r2, "BLENDSHAPES:blendshapes"), this.h.attachProtoVectorListener("blendshapes", (t3, e3) => {
        if (this.outputFaceBlendshapes) for (let e4 of t3) t3 = wo(e4), this.m.faceBlendshapes.push(qa(t3.h() ?? []));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("blendshapes", (t3) => {
        Zh(this, t3);
      })), this.outputFacialTransformationMatrixes && (mo(t2, "face_geometry"), ao(r2, "FACE_GEOMETRY:face_geometry"), this.h.attachProtoVectorListener("face_geometry", (t3, e3) => {
        if (this.outputFacialTransformationMatrixes) for (let e4 of t3) (t3 = Tr(t3 = ea(e4), Fo, 2)) && this.m.facialTransformationMatrixes.push({ rows: Cr(t3, 1) ?? 0 ?? 0, columns: Cr(t3, 2) ?? 0 ?? 0, data: ur(t3, 3, Jt).slice() ?? [] });
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("face_geometry", (t3) => {
        Zh(this, t3);
      })), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  pc.prototype.detectForVideo = pc.prototype.I, pc.prototype.detect = pc.prototype.H, pc.prototype.setOptions = pc.prototype.A, pc.createFromModelPath = function(t2, e2) {
    return qu(pc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, pc.createFromModelBuffer = function(t2, e2) {
    return qu(pc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, pc.createFromOptions = function(t2, e2) {
    return qu(pc, t2, e2);
  }, pc.FACE_LANDMARKS_LIPS = nc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LIPS", pc.FACE_LANDMARKS_LIPS), pc.FACE_LANDMARKS_LEFT_EYE = ic, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYE", pc.FACE_LANDMARKS_LEFT_EYE), pc.FACE_LANDMARKS_LEFT_EYEBROW = sc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW", pc.FACE_LANDMARKS_LEFT_EYEBROW), pc.FACE_LANDMARKS_LEFT_IRIS = oc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS", pc.FACE_LANDMARKS_LEFT_IRIS), pc.FACE_LANDMARKS_RIGHT_EYE = ac, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE", pc.FACE_LANDMARKS_RIGHT_EYE), pc.FACE_LANDMARKS_RIGHT_EYEBROW = hc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW", pc.FACE_LANDMARKS_RIGHT_EYEBROW), pc.FACE_LANDMARKS_RIGHT_IRIS = uc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS", pc.FACE_LANDMARKS_RIGHT_IRIS), pc.FACE_LANDMARKS_FACE_OVAL = cc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_FACE_OVAL", pc.FACE_LANDMARKS_FACE_OVAL), pc.FACE_LANDMARKS_CONTOURS = lc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_CONTOURS", pc.FACE_LANDMARKS_CONTOURS), pc.FACE_LANDMARKS_TESSELATION = dc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$face_landmarker$face_landmarker.FaceLandmarker.FACE_LANDMARKS_TESSELATION", pc.FACE_LANDMARKS_TESSELATION);
  var mc = Xu([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
  function gc(t2) {
    t2.gestures = [], t2.landmarks = [], t2.worldLandmarks = [], t2.handedness = [];
  }
  function vc(t2) {
    return 0 === t2.gestures.length ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] } : { gestures: t2.gestures, landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handedness: t2.handedness, handednesses: t2.handedness };
  }
  function _c(t2, e2 = true) {
    var r2 = [];
    for (let i2 of t2) {
      var n2 = wo(i2);
      t2 = [];
      for (let r3 of n2.h()) n2 = e2 && null != Cr(r3, 1) ? Cr(r3, 1) ?? 0 : -1, t2.push({ score: Nr(r3, 2) ?? 0, index: n2, categoryName: ve(nr(r3, 3)) ?? "" ?? "", displayName: ve(nr(r3, 4)) ?? "" ?? "" });
      r2.push(t2);
    }
    return r2;
  }
  var yc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", false), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Lr(t2 = this.m = new da(), 0, 1, e2 = new Yo()), this.v = new la(), Lr(this.m, 0, 2, this.v), this.G = new ca(), Lr(this.v, 0, 3, this.G), this.C = new ua(), Lr(this.v, 0, 2, this.C), this.i = new ha(), Lr(this.m, 0, 3, this.i), Ur(this.C, 2, 0.5), Ur(this.v, 4, 0.5), Ur(this.G, 2, 0.5);
    }
    D() {
      return "GestureRecognizer";
    }
    get baseOptions() {
      return Tr(this.m, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.m, 0, 1, t2);
    }
    A(t2) {
      if (Dr(this.C, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Ur(this.C, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ur(this.v, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Ur(this.G, 2, t2.minHandPresenceConfidence ?? 0.5), t2.cannedGesturesClassifierOptions) {
        var e2 = new oa(), r2 = e2, n2 = Ya(t2.cannedGesturesClassifierOptions, Tr(this.i, oa, 3)?.l());
        Lr(r2, 0, 2, n2), Lr(this.i, 0, 3, e2);
      } else void 0 === t2.cannedGesturesClassifierOptions && Tr(this.i, oa, 3)?.h();
      return t2.customGesturesClassifierOptions ? (Lr(r2 = e2 = new oa(), 0, 2, n2 = Ya(t2.customGesturesClassifierOptions, Tr(this.i, oa, 4)?.l())), Lr(this.i, 0, 4, e2)) : void 0 === t2.customGesturesClassifierOptions && Tr(this.i, oa, 4)?.h(), this.l(t2);
    }
    Xa(t2, e2) {
      return gc(this), Zu(this, t2, e2), vc(this);
    }
    Ya(t2, e2, r2) {
      return gc(this), Qu(this, t2, r2, e2), vc(this);
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect"), mo(t2, "hand_gestures"), mo(t2, "hand_landmarks"), mo(t2, "world_hand_landmarks"), mo(t2, "handedness");
      var e2 = new no();
      hi(e2, va, this.m);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "HAND_GESTURES:hand_gestures"), ao(r2, "LANDMARKS:hand_landmarks"), ao(r2, "WORLD_LANDMARKS:world_hand_landmarks"), ao(r2, "HANDEDNESS:handedness"), r2.A(e2), fo(t2, r2), this.h.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
        for (let e4 of t3) t3 = Io(e4), this.landmarks.push(Qa(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
        for (let e4 of t3) t3 = xo(e4), this.worldLandmarks.push(th(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoVectorListener("hand_gestures", (t3, e3) => {
        this.gestures.push(..._c(t3, false)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("hand_gestures", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoVectorListener("handedness", (t3, e3) => {
        this.handedness.push(..._c(t3)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("handedness", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  function Ec(t2) {
    return { landmarks: t2.landmarks, worldLandmarks: t2.worldLandmarks, handednesses: t2.handedness, handedness: t2.handedness };
  }
  yc.prototype.recognizeForVideo = yc.prototype.Ya, yc.prototype.recognize = yc.prototype.Xa, yc.prototype.setOptions = yc.prototype.A, yc.createFromModelPath = function(t2, e2) {
    return qu(yc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, yc.createFromModelBuffer = function(t2, e2) {
    return qu(yc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, yc.createFromOptions = function(t2, e2) {
    return qu(yc, t2, e2);
  }, yc.HAND_CONNECTIONS = mc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$gesture_recognizer$gesture_recognizer.GestureRecognizer.HAND_CONNECTIONS", yc.HAND_CONNECTIONS);
  var Ac = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Lr(t2 = this.i = new la(), 0, 1, e2 = new Yo()), this.v = new ca(), Lr(this.i, 0, 3, this.v), this.m = new ua(), Lr(this.i, 0, 2, this.m), Dr(this.m, 3, 1), Ur(this.m, 2, 0.5), Ur(this.v, 2, 0.5), Ur(this.i, 4, 0.5);
    }
    D() {
      return "HandLandmarker";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return "numHands" in t2 && Dr(this.m, 3, t2.numHands ?? 1), "minHandDetectionConfidence" in t2 && Ur(this.m, 2, t2.minHandDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ur(this.i, 4, t2.minTrackingConfidence ?? 0.5), "minHandPresenceConfidence" in t2 && Ur(this.v, 2, t2.minHandPresenceConfidence ?? 0.5), this.l(t2);
    }
    H(t2, e2) {
      return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Zu(this, t2, e2), Ec(this);
    }
    I(t2, e2, r2) {
      return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Qu(this, t2, r2, e2), Ec(this);
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect"), mo(t2, "hand_landmarks"), mo(t2, "world_hand_landmarks"), mo(t2, "handedness");
      var e2 = new no();
      hi(e2, _a, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "LANDMARKS:hand_landmarks"), ao(r2, "WORLD_LANDMARKS:world_hand_landmarks"), ao(r2, "HANDEDNESS:handedness"), r2.A(e2), fo(t2, r2), this.h.attachProtoVectorListener("hand_landmarks", (t3, e3) => {
        for (let e4 of t3) t3 = Io(e4), this.landmarks.push(Qa(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoVectorListener("world_hand_landmarks", (t3, e3) => {
        for (let e4 of t3) t3 = xo(e4), this.worldLandmarks.push(th(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("world_hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoVectorListener("handedness", (t3, e3) => {
        var r3 = this.handedness, n2 = r3.push, i2 = [];
        for (let e4 of t3) {
          t3 = wo(e4);
          let r4 = [];
          for (let e5 of t3.h()) r4.push({ score: Nr(e5, 2) ?? 0, index: Cr(e5, 1) ?? 0 ?? -1, categoryName: ve(nr(e5, 3)) ?? "" ?? "", displayName: ve(nr(e5, 4)) ?? "" ?? "" });
          i2.push(r4);
        }
        n2.call(r3, ...i2), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("handedness", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Ac.prototype.detectForVideo = Ac.prototype.I, Ac.prototype.detect = Ac.prototype.H, Ac.prototype.setOptions = Ac.prototype.A, Ac.createFromModelPath = function(t2, e2) {
    return qu(Ac, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Ac.createFromModelBuffer = function(t2, e2) {
    return qu(Ac, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Ac.createFromOptions = function(t2, e2) {
    return qu(Ac, t2, e2);
  }, Ac.HAND_CONNECTIONS = mc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$hand_landmarker$hand_landmarker.HandLandmarker.HAND_CONNECTIONS", Ac.HAND_CONNECTIONS);
  var wc = Xu([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
  function Tc(t2) {
    t2.i = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] };
  }
  function bc(t2) {
    try {
      if (!t2.G) return t2.i;
      t2.G(t2.i);
    } finally {
      eu(t2);
    }
  }
  function kc(t2, e2) {
    t2 = Io(t2), e2.push(Qa(t2));
  }
  var Sc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "input_frames_image", null, false), this.i = { faceLandmarks: [], faceBlendshapes: [], poseLandmarks: [], poseWorldLandmarks: [], poseSegmentationMasks: [], leftHandLandmarks: [], leftHandWorldLandmarks: [], rightHandLandmarks: [], rightHandWorldLandmarks: [] }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = false, Lr(t2 = this.m = new wa(), 0, 1, e2 = new Yo()), this.Z = new ca(), Lr(this.m, 0, 2, this.Z), this.Aa = new ya(), Lr(this.m, 0, 3, this.Aa), this.v = new Zo(), Lr(this.m, 0, 4, this.v), this.P = new ra(), Lr(this.m, 0, 5, this.P), this.C = new Ea(), Lr(this.m, 0, 6, this.C), this.aa = new Aa(), Lr(this.m, 0, 7, this.aa), Ur(this.v, 2, 0.5), Ur(this.v, 3, 0.3), Ur(this.P, 2, 0.5), Ur(this.C, 2, 0.5), Ur(this.C, 3, 0.3), Ur(this.aa, 2, 0.5), Ur(this.Z, 2, 0.5);
    }
    D() {
      return "HolisticLandmarker";
    }
    get baseOptions() {
      return Tr(this.m, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.m, 0, 1, t2);
    }
    A(t2) {
      return "minFaceDetectionConfidence" in t2 && Ur(this.v, 2, t2.minFaceDetectionConfidence ?? 0.5), "minFaceSuppressionThreshold" in t2 && Ur(this.v, 3, t2.minFaceSuppressionThreshold ?? 0.3), "minFacePresenceConfidence" in t2 && Ur(this.P, 2, t2.minFacePresenceConfidence ?? 0.5), "outputFaceBlendshapes" in t2 && (this.outputFaceBlendshapes = !!t2.outputFaceBlendshapes), "minPoseDetectionConfidence" in t2 && Ur(this.C, 2, t2.minPoseDetectionConfidence ?? 0.5), "minPoseSuppressionThreshold" in t2 && Ur(this.C, 3, t2.minPoseSuppressionThreshold ?? 0.3), "minPosePresenceConfidence" in t2 && Ur(this.aa, 2, t2.minPosePresenceConfidence ?? 0.5), "outputPoseSegmentationMasks" in t2 && (this.outputPoseSegmentationMasks = !!t2.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t2 && Ur(this.Z, 2, t2.minHandLandmarksConfidence ?? 0.5), this.l(t2);
    }
    H(t2, e2, r2) {
      var n2 = "function" != typeof e2 ? e2 : {};
      return this.G = "function" == typeof e2 ? e2 : r2, Tc(this), Zu(this, t2, n2), bc(this);
    }
    I(t2, e2, r2, n2) {
      var i2 = "function" != typeof r2 ? r2 : {};
      return this.G = "function" == typeof r2 ? r2 : n2, Tc(this), Qu(this, t2, i2, e2), bc(this);
    }
    u() {
      var t2 = new go();
      po(t2, "input_frames_image"), mo(t2, "pose_landmarks"), mo(t2, "pose_world_landmarks"), mo(t2, "face_landmarks"), mo(t2, "left_hand_landmarks"), mo(t2, "left_hand_world_landmarks"), mo(t2, "right_hand_landmarks"), mo(t2, "right_hand_world_landmarks");
      var e2 = new no(), r2 = new Ps();
      jr(r2, 1, "type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), (function(t3, e3) {
        if (null != e3) if (Array.isArray(e3)) sr(t3, 2, Ue(e3, 0, je));
        else {
          if (!("string" == typeof e3 || e3 instanceof N || x(e3))) throw Error("invalid value in Any.value field: " + e3 + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
          mr(t3, 2, lt(e3, false), I());
        }
      })(r2, this.m.h());
      var n2 = new ho();
      jr(n2, 2, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Fr(n2, 8, Ps, r2), oo(n2, "IMAGE:input_frames_image"), ao(n2, "POSE_LANDMARKS:pose_landmarks"), ao(n2, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), ao(n2, "FACE_LANDMARKS:face_landmarks"), ao(n2, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), ao(n2, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), ao(n2, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), ao(n2, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), n2.A(e2), fo(t2, n2), Qh(this, t2), this.h.attachProtoListener("pose_landmarks", (t3, e3) => {
        kc(t3, this.i.poseLandmarks), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("pose_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoListener("pose_world_landmarks", (t3, e3) => {
        var r3 = this.i.poseWorldLandmarks;
        t3 = xo(t3), r3.push(th(t3)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("pose_world_landmarks", (t3) => {
        Zh(this, t3);
      }), this.outputPoseSegmentationMasks && (ao(n2, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), tu(this, "pose_segmentation_mask"), this.h.ha("pose_segmentation_mask", (t3, e3) => {
        this.i.poseSegmentationMasks = [tc(this, t3, true, !this.G)], Zh(this, e3);
      }), this.h.attachEmptyPacketListener("pose_segmentation_mask", (t3) => {
        this.i.poseSegmentationMasks = [], Zh(this, t3);
      })), this.h.attachProtoListener("face_landmarks", (t3, e3) => {
        kc(t3, this.i.faceLandmarks), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("face_landmarks", (t3) => {
        Zh(this, t3);
      }), this.outputFaceBlendshapes && (mo(t2, "extra_blendshapes"), ao(n2, "FACE_BLENDSHAPES:extra_blendshapes"), this.h.attachProtoListener("extra_blendshapes", (t3, e3) => {
        var r3 = this.i.faceBlendshapes;
        this.outputFaceBlendshapes && (t3 = wo(t3), r3.push(qa(t3.h() ?? []))), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("extra_blendshapes", (t3) => {
        Zh(this, t3);
      })), this.h.attachProtoListener("left_hand_landmarks", (t3, e3) => {
        kc(t3, this.i.leftHandLandmarks), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("left_hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoListener("left_hand_world_landmarks", (t3, e3) => {
        var r3 = this.i.leftHandWorldLandmarks;
        t3 = xo(t3), r3.push(th(t3)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("left_hand_world_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoListener("right_hand_landmarks", (t3, e3) => {
        kc(t3, this.i.rightHandLandmarks), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("right_hand_landmarks", (t3) => {
        Zh(this, t3);
      }), this.h.attachProtoListener("right_hand_world_landmarks", (t3, e3) => {
        var r3 = this.i.rightHandWorldLandmarks;
        t3 = xo(t3), r3.push(th(t3)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("right_hand_world_landmarks", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Sc.prototype.detectForVideo = Sc.prototype.I, Sc.prototype.detect = Sc.prototype.H, Sc.prototype.setOptions = Sc.prototype.A, Sc.createFromModelPath = function(t2, e2) {
    return qu(Sc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Sc.createFromModelBuffer = function(t2, e2) {
    return qu(Sc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Sc.createFromOptions = function(t2, e2) {
    return qu(Sc, t2, e2);
  }, Sc.HAND_CONNECTIONS = mc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.HAND_CONNECTIONS", Sc.HAND_CONNECTIONS), Sc.POSE_CONNECTIONS = wc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.POSE_CONNECTIONS", Sc.POSE_CONNECTIONS), Sc.FACE_LANDMARKS_LIPS = nc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LIPS", Sc.FACE_LANDMARKS_LIPS), Sc.FACE_LANDMARKS_LEFT_EYE = ic, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYE", Sc.FACE_LANDMARKS_LEFT_EYE), Sc.FACE_LANDMARKS_LEFT_EYEBROW = sc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_EYEBROW", Sc.FACE_LANDMARKS_LEFT_EYEBROW), Sc.FACE_LANDMARKS_LEFT_IRIS = oc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_LEFT_IRIS", Sc.FACE_LANDMARKS_LEFT_IRIS), Sc.FACE_LANDMARKS_RIGHT_EYE = ac, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYE", Sc.FACE_LANDMARKS_RIGHT_EYE), Sc.FACE_LANDMARKS_RIGHT_EYEBROW = hc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW", Sc.FACE_LANDMARKS_RIGHT_EYEBROW), Sc.FACE_LANDMARKS_RIGHT_IRIS = uc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_RIGHT_IRIS", Sc.FACE_LANDMARKS_RIGHT_IRIS), Sc.FACE_LANDMARKS_FACE_OVAL = cc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_FACE_OVAL", Sc.FACE_LANDMARKS_FACE_OVAL), Sc.FACE_LANDMARKS_CONTOURS = lc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_CONTOURS", Sc.FACE_LANDMARKS_CONTOURS), Sc.FACE_LANDMARKS_TESSELATION = dc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$holistic_landmarker$holistic_landmarker.HolisticLandmarker.FACE_LANDMARKS_TESSELATION", Sc.FACE_LANDMARKS_TESSELATION);
  var Lc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "input_image", "norm_rect", true), this.m = { classifications: [] }, Lr(t2 = this.i = new ka(), 0, 1, e2 = new Yo());
    }
    D() {
      return "ImageClassifier";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return Lr(this.i, 0, 2, Ya(t2, Tr(this.i, jo, 2))), this.l(t2);
    }
    Ga(t2, e2) {
      return this.m = { classifications: [] }, Zu(this, t2, e2), this.m;
    }
    Ha(t2, e2, r2) {
      return this.m = { classifications: [] }, Qu(this, t2, r2, e2), this.m;
    }
    u() {
      var t2 = new go();
      po(t2, "input_image"), po(t2, "norm_rect"), mo(t2, "classifications");
      var e2 = new no();
      hi(e2, Sa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), oo(r2, "IMAGE:input_image"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "CLASSIFICATIONS:classifications"), r2.A(e2), fo(t2, r2), this.h.attachProtoListener("classifications", (t3, e3) => {
        this.m = Ja(Mo(t3)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("classifications", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Lc.prototype.classifyForVideo = Lc.prototype.Ha, Lc.prototype.classify = Lc.prototype.Ga, Lc.prototype.setOptions = Lc.prototype.A, Lc.createFromModelPath = function(t2, e2) {
    return qu(Lc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Lc.createFromModelBuffer = function(t2, e2) {
    return qu(Lc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Lc.createFromOptions = function(t2, e2) {
    return qu(Lc, t2, e2);
  };
  var xc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", true), this.i = new La(), this.embeddings = { embeddings: [] }, Lr(t2 = this.i, 0, 1, e2 = new Yo());
    }
    D() {
      return "ImageEmbedder";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      var e2 = this.i, r2 = Tr(this.i, Vo, 2);
      if (r2 = r2 ? r2.clone() : new Vo(), void 0 !== t2.l2Normalize) {
        var n2 = t2.l2Normalize;
        sr(r2, 1, null == n2 ? n2 : Zt(n2));
      } else "l2Normalize" in t2 && sr(r2, 1);
      return void 0 !== t2.quantize ? sr(r2, 2, null == (n2 = t2.quantize) ? n2 : Zt(n2)) : "quantize" in t2 && sr(r2, 2), Lr(e2, 0, 2, r2), this.l(t2);
    }
    Na(t2, e2) {
      return Zu(this, t2, e2), this.embeddings;
    }
    Oa(t2, e2, r2) {
      return Qu(this, t2, r2, e2), this.embeddings;
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect"), mo(t2, "embeddings_out");
      var e2 = new no();
      hi(e2, xa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "EMBEDDINGS:embeddings_out"), r2.A(e2), fo(t2, r2), this.h.attachProtoListener("embeddings_out", (t3, e3) => {
        t3 = Bo(t3), this.embeddings = (function(t4) {
          return { embeddings: kr(t4, $o, 1).map((t5) => {
            var e4 = { headIndex: Cr(t5, 3) ?? 0 ?? -1, headName: ve(nr(t5, 4)) ?? "" ?? "" };
            if (hr(t5, 1, Uo)) t5 = ur(t5 = Or(t5, Do, 1, Uo), 1, Jt), e4.floatEmbedding = t5.slice();
            else {
              let r3 = new Uint8Array(0);
              e4.quantizedEmbedding = Or(t5, Po, 2, Uo)?.h()?.i() ?? r3;
            }
            return e4;
          }), timestampMs: za(nr(t4, 2, void 0, le) ?? er) };
        })(t3), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("embeddings_out", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  xc.cosineSimilarity = function(t2, e2) {
    if (t2.floatEmbedding && e2.floatEmbedding) t2 = rh(t2.floatEmbedding, e2.floatEmbedding);
    else {
      if (!t2.quantizedEmbedding || !e2.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
      t2 = rh(eh(t2.quantizedEmbedding), eh(e2.quantizedEmbedding));
    }
    return t2;
  }, xc.prototype.embedForVideo = xc.prototype.Oa, xc.prototype.embed = xc.prototype.Na, xc.prototype.setOptions = xc.prototype.A, xc.createFromModelPath = function(t2, e2) {
    return qu(xc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, xc.createFromModelBuffer = function(t2, e2) {
    return qu(xc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, xc.createFromOptions = function(t2, e2) {
    return qu(xc, t2, e2);
  };
  var Rc = class {
    constructor(t2, e2, r2) {
      this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = r2;
    }
    close() {
      this.confidenceMasks?.forEach((t2) => {
        t2.close();
      }), this.categoryMask?.close();
    }
  };
  function Ic(t2) {
    var e2 = (function(t3) {
      return kr(t3, ho, 1);
    })(t2.ka()).filter((t3) => (ve(nr(t3, 1)) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
    if (t2.v = [], e2.length > 1) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
    1 === e2.length && (Tr(e2[0], no, 7)?.u()?.h() ?? /* @__PURE__ */ new Map()).forEach((e3, r2) => {
      t2.v[Number(r2)] = ve(nr(e3, 1)) ?? "";
    });
  }
  function Fc(t2) {
    t2.categoryMask = void 0, t2.confidenceMasks = void 0, t2.qualityScores = void 0;
  }
  function Cc(t2) {
    try {
      let e2 = new Rc(t2.confidenceMasks, t2.categoryMask, t2.qualityScores);
      if (!t2.m) return e2;
      t2.m(e2);
    } finally {
      eu(t2);
    }
  }
  Rc.prototype.close = Rc.prototype.close;
  var Nc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", false), this.v = [], this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.i = new Na(), this.C = new Ra(), Lr(this.i, 0, 3, this.C), Lr(t2 = this.i, 0, 1, e2 = new Yo());
    }
    D() {
      return "ImageSegmenter";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return void 0 !== t2.displayNamesLocale ? sr(this.i, 2, ge(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && sr(this.i, 2), "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
    }
    M() {
      Ic(this);
    }
    segment(t2, e2, r2) {
      var n2 = "function" != typeof e2 ? e2 : {};
      return this.m = "function" == typeof e2 ? e2 : r2, Fc(this), Zu(this, t2, n2), Cc(this);
    }
    cb(t2, e2, r2, n2) {
      var i2 = "function" != typeof r2 ? r2 : {};
      return this.m = "function" == typeof r2 ? r2 : n2, Fc(this), Qu(this, t2, i2, e2), Cc(this);
    }
    Ra() {
      return this.v;
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect");
      var e2 = new no();
      hi(e2, Oa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), r2.A(e2), fo(t2, r2), Qh(this, t2), this.outputConfidenceMasks && (mo(t2, "confidence_masks"), ao(r2, "CONFIDENCE_MASKS:confidence_masks"), tu(this, "confidence_masks"), this.h.ia("confidence_masks", (t3, e3) => {
        this.confidenceMasks = t3.map((t4) => tc(this, t4, true, !this.m)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("confidence_masks", (t3) => {
        this.confidenceMasks = [], Zh(this, t3);
      })), this.outputCategoryMask && (mo(t2, "category_mask"), ao(r2, "CATEGORY_MASK:category_mask"), tu(this, "category_mask"), this.h.ha("category_mask", (t3, e3) => {
        this.categoryMask = tc(this, t3, false, !this.m), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("category_mask", (t3) => {
        this.categoryMask = void 0, Zh(this, t3);
      })), mo(t2, "quality_scores"), ao(r2, "QUALITY_SCORES:quality_scores"), this.h.attachFloatVectorListener("quality_scores", (t3, e3) => {
        this.qualityScores = t3, Zh(this, e3);
      }), this.h.attachEmptyPacketListener("quality_scores", (t3) => {
        this.categoryMask = void 0, Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Nc.prototype.getLabels = Nc.prototype.Ra, Nc.prototype.segmentForVideo = Nc.prototype.cb, Nc.prototype.segment = Nc.prototype.segment, Nc.prototype.setOptions = Nc.prototype.A, Nc.createFromModelPath = function(t2, e2) {
    return qu(Nc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Nc.createFromModelBuffer = function(t2, e2) {
    return qu(Nc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Nc.createFromOptions = function(t2, e2) {
    return qu(Nc, t2, e2);
  };
  var Oc = { 0: 0, 1: 1, 2: 2, 3: 3 };
  function Mc() {
    return Oh() ? void 0 : document.createElement("canvas");
  }
  var Dc = class extends ru {
    constructor(t2, e2) {
      super(new Xh(t2, e2)), this.v = new du(), this.delegate = "CPU", this.i = 0, this.baseOptions = new Yo(), this.C = this.m = 0;
    }
    D() {
      return "InteractiveSegmenter";
    }
    get j() {
      return this.h.j;
    }
    A(t2) {
      return this.delegate = t2.baseOptions?.delegate ?? "CPU", super.l(t2);
    }
    eb(t2) {
      if (0 === this.i) throw Error("Segmenter is not initialized.");
      var e2;
      if (0 !== this.m && (this.j._free(this.m), this.m = 0), !(e2 = "undefined" != typeof ImageData && t2 instanceof ImageData)) if ("object" != typeof t2 || null === t2) e2 = false;
      else {
        e2 = t2.data;
        var r2 = t2.width, n2 = t2.height;
        e2 = Number.isInteger(r2) && r2 > 0 && Number.isInteger(n2) && n2 > 0 && (e2 instanceof Uint8ClampedArray || e2 instanceof Uint8Array);
      }
      if (e2) e2 = t2.width, r2 = t2.height, t2 = t2.data;
      else {
        if ([e2, r2] = Dh(t2), "undefined" != typeof OffscreenCanvas) n2 = new OffscreenCanvas(e2, r2);
        else {
          if ("undefined" == typeof document) throw Error("Canvas is not supported in this environment.");
          n2 = document.createElement("canvas");
        }
        if (n2.width = e2, n2.height = r2, !(n2 = n2.getContext("2d"))) throw Error("Canvas 2D context is not supported in this environment.");
        n2.drawImage(t2, 0, 0), t2 = n2.getImageData(0, 0, e2, r2).data;
      }
      if (!t2) throw Error("Unsupported image source or failed to extract image pixels.");
      n2 = (function({ Wa: t3, width: e3, height: r3 }) {
        if (e3 <= 0 || r3 <= 0) throw Error(`Invalid image dimensions: ${e3}x${r3}. Dimensions must be positive.`);
        if (t3 % (e3 * r3) !== 0) throw Error(`Invalid image dimensions or pixel data length. Pixel data length ${t3} is not a multiple of the number of pixels (${e3 * r3}).`);
        if (4 !== (t3 /= e3 * r3) && 3 !== t3 && 1 !== t3) throw Error(`Invalid image dimensions or pixel data length. Calculated channels: ${t3}. Expected 1, 3, or 4.`);
        return t3;
      })({ Wa: t2.length, width: e2, height: r2 });
      var i2 = this.j._malloc(t2.length);
      if (this.j.HEAPU8.set(t2, i2), this.m = i2, !this.j._interactive_segmenter_set_image(this.i, i2, e2, r2, n2)) throw Error("Failed to set image on native engine.");
    }
    segment(t2) {
      if (0 === this.i) throw Error("Segmenter is not initialized.");
      var e2 = (function(t3) {
        t3 = t3.map(({ isCompleted: t4, brushMode: e4, point: r3 }) => {
          e4 = Oc[e4] ?? 0, r3 = r3.map(({ x: t5, y: e5 }) => {
            var r4 = new Ma();
            return Br(r4, 1, t5), Br(r4, 2, e5), r4;
          });
          var n3 = new Da();
          return Mr(n3, t4), mr(n3, 1, ee(e4), 0), Rr(n3, 2, r3), n3;
        });
        var e3 = new Pa();
        return Rr(e3, 1, t3), $a(e3);
      })(t2);
      t2 = this.j._malloc(e2.length), this.j.HEAPU8.set(e2, t2);
      var r2 = this.j._malloc(12), n2 = r2 + 4, i2 = r2 + 8, s2 = 0, o2 = this.C++;
      try {
        if (this.o) if ("GPU" === this.delegate) {
          var a2 = this.o;
          ++a2.h.U, a2.i.set(o2, performance.now());
        } else {
          var h2 = this.o;
          ++h2.h.R, h2.i.set(o2, performance.now());
        }
        if (0 === (s2 = this.j._interactive_segmenter_segment(this.i, t2, e2.length, r2, n2, i2))) throw Error("Segmentation failed.");
        this.o?.za(o2);
        let u2 = this.j.HEAPU32[r2 / 4], c2 = this.j.HEAPU32[n2 / 4], l2 = new Float32Array(this.j.HEAPU8.buffer, s2, this.j.HEAPU32[i2 / 4] / 4), d2 = new Float32Array(l2);
        if (a2 = u2 * c2, (d2 instanceof Uint8Array || d2 instanceof Float32Array) && d2.length !== a2) throw Error("Unsupported channel count: " + d2.length / a2);
        return new bu([d2], true, false, this.h.j.canvas ?? void 0, this.v, u2, c2);
      } finally {
        0 !== t2 && this.j._free(t2), 0 !== r2 && this.j._free(r2), 0 !== s2 && this.j._free(s2);
      }
    }
    u() {
      0 !== this.i && (this.o?.xa(), this.j._interactive_segmenter_close(this.i), this.i = 0), 0 !== this.m && (this.j._free(this.m), this.m = 0);
      var t2 = new Ko();
      if ("GPU" === this.delegate) {
        var e2 = new Xs();
        xr(t2, 2, Xo, e2);
      } else Dr(e2 = new eo(), 1, 4), xr(t2, 1, Xo, e2);
      if (Lr(this.baseOptions, 0, 3, t2), t2 = Jo(this.baseOptions), e2 = this.j._malloc(t2.length), this.j.HEAPU8.set(t2, e2), this.i = this.j._interactive_segmenter_create(e2, t2.length), this.j._free(e2), 0 === this.i) throw Error("Failed to create native InteractiveSegmenter engine.");
      this.o?.ya();
    }
    close() {
      0 !== this.i && (this.j._interactive_segmenter_close(this.i), this.i = 0), 0 !== this.m && (this.j._free(this.m), this.m = 0), this.v.close(), super.close();
    }
  };
  Dc.prototype.close = Dc.prototype.close, Dc.prototype.segment = Dc.prototype.segment, Dc.prototype.setImage = Dc.prototype.eb, Dc.prototype.setOptions = Dc.prototype.A, Dc.createFromModelPath = function(t2, e2) {
    return Yh(Dc, Mc(), t2, { baseOptions: { modelAssetPath: e2 } });
  }, Dc.createFromModelBuffer = function(t2, e2) {
    return Yh(Dc, Mc(), t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Dc.createFromOptions = function(t2, e2) {
    var r2 = e2.canvas ?? Mc();
    return Yh(Dc, r2, t2, e2);
  };
  var Pc = class {
    constructor(t2, e2, r2) {
      this.confidenceMasks = t2, this.categoryMask = e2, this.qualityScores = r2;
    }
    close() {
      this.confidenceMasks?.forEach((t2) => {
        t2.close();
      }), this.categoryMask?.close();
    }
  };
  Pc.prototype.close = Pc.prototype.close;
  var $c = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect_in", false), this.outputCategoryMask = false, this.outputConfidenceMasks = true, this.i = new Na(), this.v = new Ra(), Lr(this.i, 0, 3, this.v), Lr(t2 = this.i, 0, 1, e2 = new Yo());
    }
    D() {
      return "InteractiveSegmenterLegacy";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return "outputCategoryMask" in t2 && (this.outputCategoryMask = t2.outputCategoryMask ?? false), "outputConfidenceMasks" in t2 && (this.outputConfidenceMasks = t2.outputConfidenceMasks ?? true), super.l(t2);
    }
    segment(t2, e2, r2, n2) {
      var i2 = "function" != typeof r2 ? r2 : {};
      if (this.m = "function" == typeof r2 ? r2 : n2, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, r2 = this.J + 1, n2 = new Ga(), e2.keypoint && e2.scribble) throw Error("Cannot provide both keypoint and scribble.");
      if (e2.keypoint) {
        var s2 = new Ua();
        Mr(s2, true), Br(s2, 1, e2.keypoint.x), Br(s2, 2, e2.keypoint.y), xr(n2, 1, Va, s2);
      } else {
        if (!e2.scribble) throw Error("Must provide either a keypoint or a scribble.");
        {
          let t3 = new ja();
          for (s2 of e2.scribble) Mr(e2 = new Ua(), true), Br(e2, 1, s2.x), Br(e2, 2, s2.y), Fr(t3, 1, Ua, e2);
          xr(n2, 2, Va, t3);
        }
      }
      this.h.addProtoToStream(n2.h(), "mediapipe.tasks.vision.interactive_segmenter_legacy.proto.RegionOfInterest", "roi_in", r2), Zu(this, t2, i2);
      t: {
        try {
          let t3 = new Pc(this.confidenceMasks, this.categoryMask, this.qualityScores);
          if (!this.m) {
            var o2 = t3;
            break t;
          }
          this.m(t3);
        } finally {
          eu(this);
        }
        o2 = void 0;
      }
      return o2;
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "roi_in"), po(t2, "norm_rect_in");
      var e2 = new no();
      hi(e2, Oa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.interactive_segmenter_legacy.InteractiveSegmenterLegacyGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "ROI:roi_in"), oo(r2, "NORM_RECT:norm_rect_in"), r2.A(e2), fo(t2, r2), Qh(this, t2), this.outputConfidenceMasks && (mo(t2, "confidence_masks"), ao(r2, "CONFIDENCE_MASKS:confidence_masks"), tu(this, "confidence_masks"), this.h.ia("confidence_masks", (t3, e3) => {
        this.confidenceMasks = t3.map((t4) => tc(this, t4, true, !this.m)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("confidence_masks", (t3) => {
        this.confidenceMasks = [], Zh(this, t3);
      })), this.outputCategoryMask && (mo(t2, "category_mask"), ao(r2, "CATEGORY_MASK:category_mask"), tu(this, "category_mask"), this.h.ha("category_mask", (t3, e3) => {
        this.categoryMask = tc(this, t3, false, !this.m), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("category_mask", (t3) => {
        this.categoryMask = void 0, Zh(this, t3);
      })), mo(t2, "quality_scores"), ao(r2, "QUALITY_SCORES:quality_scores"), this.h.attachFloatVectorListener("quality_scores", (t3, e3) => {
        this.qualityScores = t3, Zh(this, e3);
      }), this.h.attachEmptyPacketListener("quality_scores", (t3) => {
        this.categoryMask = void 0, Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  $c.prototype.segment = $c.prototype.segment, $c.prototype.setOptions = $c.prototype.A, $c.createFromModelPath = function(t2, e2) {
    return qu($c, t2, { baseOptions: { modelAssetPath: e2 } });
  }, $c.createFromModelBuffer = function(t2, e2) {
    return qu($c, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, $c.createFromOptions = function(t2, e2) {
    return qu($c, t2, e2);
  };
  var Uc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "input_frame_gpu", "norm_rect", false), this.m = { detections: [] }, Lr(t2 = this.i = new Ha(), 0, 1, e2 = new Yo());
    }
    D() {
      return "ObjectDetector";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return void 0 !== t2.displayNamesLocale ? sr(this.i, 2, ge(t2.displayNamesLocale)) : "displayNamesLocale" in t2 && sr(this.i, 2), void 0 !== t2.maxResults ? Dr(this.i, 3, t2.maxResults) : "maxResults" in t2 && sr(this.i, 3), void 0 !== t2.scoreThreshold ? Ur(this.i, 4, t2.scoreThreshold) : "scoreThreshold" in t2 && sr(this.i, 4), void 0 !== t2.categoryAllowlist ? Gr(this.i, 5, t2.categoryAllowlist) : "categoryAllowlist" in t2 && sr(this.i, 5), void 0 !== t2.categoryDenylist ? Gr(this.i, 6, t2.categoryDenylist) : "categoryDenylist" in t2 && sr(this.i, 6), this.l(t2);
    }
    H(t2, e2) {
      return this.m = { detections: [] }, Zu(this, t2, e2), this.m;
    }
    I(t2, e2, r2) {
      return this.m = { detections: [] }, Qu(this, t2, r2, e2), this.m;
    }
    u() {
      var t2 = new go();
      po(t2, "input_frame_gpu"), po(t2, "norm_rect"), mo(t2, "detections");
      var e2 = new no();
      hi(e2, Ka, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.ObjectDetectorGraph"), oo(r2, "IMAGE:input_frame_gpu"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "DETECTIONS:detections"), r2.A(e2), fo(t2, r2), this.h.attachProtoVectorListener("detections", (t3, e3) => {
        for (let e4 of t3) t3 = So(e4), this.m.detections.push(Za(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("detections", (t3) => {
        Zh(this, t3);
      }), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Uc.prototype.detectForVideo = Uc.prototype.I, Uc.prototype.detect = Uc.prototype.H, Uc.prototype.setOptions = Uc.prototype.A, Uc.createFromModelPath = async function(t2, e2) {
    return qu(Uc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Uc.createFromModelBuffer = function(t2, e2) {
    return qu(Uc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Uc.createFromOptions = function(t2, e2) {
    return qu(Uc, t2, e2);
  };
  var Bc = class {
    constructor(t2, e2, r2) {
      this.landmarks = t2, this.worldLandmarks = e2, this.segmentationMasks = r2;
    }
    close() {
      this.segmentationMasks?.forEach((t2) => {
        t2.close();
      });
    }
  };
  function jc(t2) {
    t2.landmarks = [], t2.worldLandmarks = [], t2.segmentationMasks = void 0;
  }
  function Gc(t2) {
    try {
      let e2 = new Bc(t2.landmarks, t2.worldLandmarks, t2.segmentationMasks);
      if (!t2.v) return e2;
      t2.v(e2);
    } finally {
      eu(t2);
    }
  }
  Bc.prototype.close = Bc.prototype.close;
  var Vc = class extends ec {
    constructor(t2, e2) {
      super(new zu(t2, e2), "image_in", "norm_rect", false), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = false, Lr(t2 = this.i = new Xa(), 0, 1, e2 = new Yo()), this.C = new Aa(), Lr(this.i, 0, 3, this.C), this.m = new Ea(), Lr(this.i, 0, 2, this.m), Dr(this.m, 4, 1), Ur(this.m, 2, 0.5), Ur(this.C, 2, 0.5), Ur(this.i, 4, 0.5);
    }
    D() {
      return "PoseLandmarker";
    }
    get baseOptions() {
      return Tr(this.i, Yo, 1);
    }
    set baseOptions(t2) {
      Lr(this.i, 0, 1, t2);
    }
    A(t2) {
      return "numPoses" in t2 && Dr(this.m, 4, t2.numPoses ?? 1), "minPoseDetectionConfidence" in t2 && Ur(this.m, 2, t2.minPoseDetectionConfidence ?? 0.5), "minTrackingConfidence" in t2 && Ur(this.i, 4, t2.minTrackingConfidence ?? 0.5), "minPosePresenceConfidence" in t2 && Ur(this.C, 2, t2.minPosePresenceConfidence ?? 0.5), "outputSegmentationMasks" in t2 && (this.outputSegmentationMasks = t2.outputSegmentationMasks ?? false), this.l(t2);
    }
    H(t2, e2, r2) {
      var n2 = "function" != typeof e2 ? e2 : {};
      return this.v = "function" == typeof e2 ? e2 : r2, jc(this), Zu(this, t2, n2), Gc(this);
    }
    I(t2, e2, r2, n2) {
      var i2 = "function" != typeof r2 ? r2 : {};
      return this.v = "function" == typeof r2 ? r2 : n2, jc(this), Qu(this, t2, i2, e2), Gc(this);
    }
    u() {
      var t2 = new go();
      po(t2, "image_in"), po(t2, "norm_rect"), mo(t2, "normalized_landmarks"), mo(t2, "world_landmarks"), mo(t2, "segmentation_masks");
      var e2 = new no();
      hi(e2, Wa, this.i);
      var r2 = new ho();
      jr(r2, 2, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), oo(r2, "IMAGE:image_in"), oo(r2, "NORM_RECT:norm_rect"), ao(r2, "NORM_LANDMARKS:normalized_landmarks"), ao(r2, "WORLD_LANDMARKS:world_landmarks"), r2.A(e2), fo(t2, r2), Qh(this, t2), this.h.attachProtoVectorListener("normalized_landmarks", (t3, e3) => {
        this.landmarks = [];
        for (let e4 of t3) t3 = Io(e4), this.landmarks.push(Qa(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("normalized_landmarks", (t3) => {
        this.landmarks = [], Zh(this, t3);
      }), this.h.attachProtoVectorListener("world_landmarks", (t3, e3) => {
        this.worldLandmarks = [];
        for (let e4 of t3) t3 = xo(e4), this.worldLandmarks.push(th(t3));
        Zh(this, e3);
      }), this.h.attachEmptyPacketListener("world_landmarks", (t3) => {
        this.worldLandmarks = [], Zh(this, t3);
      }), this.outputSegmentationMasks && (ao(r2, "SEGMENTATION_MASK:segmentation_masks"), tu(this, "segmentation_masks"), this.h.ia("segmentation_masks", (t3, e3) => {
        this.segmentationMasks = t3.map((t4) => tc(this, t4, true, !this.v)), Zh(this, e3);
      }), this.h.attachEmptyPacketListener("segmentation_masks", (t3) => {
        this.segmentationMasks = [], Zh(this, t3);
      })), t2 = t2.h(), this.setGraph(new Uint8Array(t2), true);
    }
  };
  Vc.prototype.detectForVideo = Vc.prototype.I, Vc.prototype.detect = Vc.prototype.H, Vc.prototype.setOptions = Vc.prototype.A, Vc.createFromModelPath = function(t2, e2) {
    return qu(Vc, t2, { baseOptions: { modelAssetPath: e2 } });
  }, Vc.createFromModelBuffer = function(t2, e2) {
    return qu(Vc, t2, { baseOptions: { modelAssetBuffer: e2 } });
  }, Vc.createFromOptions = function(t2, e2) {
    return qu(Vc, t2, e2);
  }, Vc.POSE_CONNECTIONS = wc, e("module$exports$google3$third_party$mediapipe$tasks$web$vision$pose_landmarker$pose_landmarker.PoseLandmarker.POSE_CONNECTIONS", Vc.POSE_CONNECTIONS);

  // mp-glue:node_modules/@mediapipe/tasks-vision/wasm/vision_wasm_internal.js
  var custom_dbg = (t2) => console.debug(t2);
  var ModuleFactory = (() => {
    var _scriptName = globalThis.document?.currentScript?.src;
    return async function(moduleArg = {}) {
      var Module = moduleArg;
      var ENVIRONMENT_IS_WEB = !!globalThis.window;
      var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
      var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
      var programArgs = [];
      var thisProgram = "./this.program";
      var quit_ = (status, toThrow) => {
        throw toThrow;
      };
      if (typeof __filename != "undefined") {
        _scriptName = __filename;
      } else if (ENVIRONMENT_IS_WORKER) {
        _scriptName = self.location.href;
      }
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module["locateFile"]) {
          return Module["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var readAsync, readBinary;
      if (ENVIRONMENT_IS_NODE) {
        var fs2 = __require("node:fs");
        scriptDirectory = __dirname + "/";
        readBinary = (filename) => {
          filename = isFileURI(filename) ? new URL(filename) : filename;
          var ret = fs2.readFileSync(filename);
          return ret;
        };
        readAsync = async (filename, binary = true) => {
          filename = isFileURI(filename) ? new URL(filename) : filename;
          var ret = fs2.readFileSync(filename, binary ? void 0 : "utf8");
          return ret;
        };
        if (process.argv.length > 1) {
          thisProgram = process.argv[1].replace(/\\/g, "/");
        }
        programArgs = process.argv.slice(2);
        quit_ = (status, toThrow) => {
          process.exitCode = status;
          throw toThrow;
        };
      } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        try {
          scriptDirectory = new URL(".", _scriptName).href;
        } catch {
        }
        {
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(
                /** @type{!ArrayBuffer} */
                xhr.response
              );
            };
          }
          readAsync = async (url) => {
            if (isFileURI(url)) {
              return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = () => {
                  if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                    resolve(xhr.response);
                    return;
                  }
                  reject(xhr.status);
                };
                xhr.onerror = reject;
                xhr.send(null);
              });
            }
            var response = await fetch(url, {
              credentials: "same-origin"
            });
            if (response.ok) {
              return response.arrayBuffer();
            }
            throw new Error(response.status + " : " + response.url);
          };
        }
      } else {
      }
      var out = console.log.bind(console);
      var err = console.error.bind(console);
      var wasmBinary;
      var ABORT = false;
      var EXITSTATUS;
      function assert(condition, text) {
        if (!condition) {
          abort(text);
        }
      }
      var isFileURI = (filename) => filename.startsWith("file://");
      class EmscriptenEH {
      }
      class EmscriptenSjLj extends EmscriptenEH {
      }
      var runtimeInitialized = false;
      function getMemoryBuffer() {
        return wasmMemory.buffer;
      }
      function updateMemoryViews() {
        if (HEAP8?.buffer?.resizable) return;
        var b2 = getMemoryBuffer();
        HEAP8 = new Int8Array(b2);
        HEAP16 = new Int16Array(b2);
        Module["HEAPU8"] = HEAPU8 = new Uint8Array(b2);
        HEAPU16 = new Uint16Array(b2);
        HEAP32 = new Int32Array(b2);
        Module["HEAPU32"] = HEAPU32 = new Uint32Array(b2);
        Module["HEAPF32"] = HEAPF32 = new Float32Array(b2);
        Module["HEAPF64"] = HEAPF64 = new Float64Array(b2);
      }
      function preRun() {
        var preRun2 = Module["preRun"];
        if (preRun2) {
          if (typeof preRun2 == "function") preRun2 = [preRun2];
          onPreRuns.push(...preRun2);
        }
        callRuntimeCallbacks(onPreRuns);
      }
      function initRuntime() {
        runtimeInitialized = true;
        if (!Module["noFSInit"] && !FS.initialized) FS.init();
        TTY.init();
        wasmExports["td"]();
        FS.ignorePermissions = false;
      }
      function postRun() {
        var postRun2 = Module["postRun"];
        if (postRun2) {
          if (typeof postRun2 == "function") postRun2 = [postRun2];
          onPostRuns.push(...postRun2);
        }
        callRuntimeCallbacks(onPostRuns);
      }
      function abort(what) {
        Module["onAbort"]?.(what);
        what = `Aborted(${what})`;
        err(what);
        ABORT = true;
        what += ". Build with -sASSERTIONS for more info.";
        var e2 = new WebAssembly.RuntimeError(what);
        throw e2;
      }
      var wasmBinaryFile;
      function findWasmBinary() {
        return locateFile("vision_wasm_internal.wasm");
      }
      function getBinarySync(file) {
        if (readBinary) {
          return readBinary(file);
        }
        throw "both async and sync fetching of the wasm failed";
      }
      async function getWasmBinary(binaryFile) {
        if (!wasmBinary) {
          try {
            var response = await readAsync(binaryFile);
            return new Uint8Array(response);
          } catch {
          }
        }
        return getBinarySync(binaryFile);
      }
      async function instantiateArrayBuffer(binaryFile, imports) {
        try {
          var binary = await getWasmBinary(binaryFile);
          var instance = await WebAssembly.instantiate(binary, imports);
          return instance;
        } catch (reason) {
          err(`failed to asynchronously prepare wasm: ${reason}`);
          abort(reason);
        }
      }
      async function instantiateAsync(binary, binaryFile, imports) {
        if (!binary && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
          try {
            var response = fetch(binaryFile, {
              credentials: "same-origin"
            });
            var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
            return instantiationResult;
          } catch (reason) {
            err(`wasm streaming compile failed: ${reason}`);
            err("falling back to ArrayBuffer instantiation");
          }
        }
        return instantiateArrayBuffer(binaryFile, imports);
      }
      function getWasmImports() {
        var imports = {
          "a": wasmImports
        };
        return imports;
      }
      async function createWasm() {
        function receiveInstance(instance) {
          wasmExports = instance.exports;
          assignWasmExports(wasmExports);
          updateMemoryViews();
          return wasmExports;
        }
        function receiveInstantiationResult(result2) {
          return receiveInstance(result2["instance"]);
        }
        var info = getWasmImports();
        var instantiateWasm = Module["instantiateWasm"];
        if (instantiateWasm) {
          return new Promise((resolve) => {
            instantiateWasm(info, (inst) => resolve(receiveInstance(inst)));
          });
        }
        wasmBinaryFile ??= findWasmBinary();
        var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
        var exports2 = receiveInstantiationResult(result);
        return exports2;
      }
      var tempDouble;
      var tempI64;
      var handleException = (e2) => {
        if (e2 instanceof ExitStatus || e2 == "unwind") {
          return EXITSTATUS;
        }
        quit_(1, e2);
      };
      class ExitStatus {
        name = "ExitStatus";
        constructor(status) {
          this.message = `Program terminated with exit(${status})`;
          this.status = status;
        }
      }
      var runtimeKeepaliveCounter = 0;
      var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
      var _proc_exit = (code) => {
        EXITSTATUS = code;
        if (!keepRuntimeAlive()) {
          Module["onExit"]?.(code);
          ABORT = true;
        }
        quit_(code, new ExitStatus(code));
      };
      var exitJS = (status, implicit) => {
        EXITSTATUS = status;
        _proc_exit(status);
      };
      var _exit = exitJS;
      var maybeExit = () => {
        if (!keepRuntimeAlive()) {
          try {
            _exit(EXITSTATUS);
          } catch (e2) {
            handleException(e2);
          }
        }
      };
      var callUserCallback = (func) => {
        if (ABORT) {
          return;
        }
        try {
          return func();
        } catch (e2) {
          handleException(e2);
        } finally {
          maybeExit();
        }
      };
      function getFullscreenElement() {
        return document.fullscreenElement ?? document.webkitFullscreenElement;
      }
      var safeSetTimeout = (func, timeout) => setTimeout(() => {
        callUserCallback(func);
      }, timeout);
      var warnOnce = (text) => {
        warnOnce.shown ||= {};
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
          err(text);
        }
      };
      var preloadPlugins = [];
      var HEAP32;
      var HEAPU32;
      var Browser = {
        useWebGL: false,
        isFullscreen: false,
        pointerLock: false,
        moduleContextCreatedCallbacks: [],
        preloadedImages: {},
        preloadedAudios: {},
        getCanvas: () => Module["canvas"],
        init() {
          if (Browser.initted) return;
          Browser.initted = true;
          var imagePlugin = {};
          imagePlugin["canHandle"] = (name) => !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
          imagePlugin["handle"] = async (byteArray, name) => {
            var b2 = new Blob([byteArray], {
              type: Browser.getMimetype(name)
            });
            if (b2.size !== byteArray.length) {
              b2 = new Blob([new Uint8Array(byteArray).buffer], {
                type: Browser.getMimetype(name)
              });
            }
            var url = URL.createObjectURL(b2);
            return new Promise((resolve, reject) => {
              var img = new Image();
              img.onload = () => {
                var canvas3 = (
                  /** @type {!HTMLCanvasElement} */
                  document.createElement("canvas")
                );
                canvas3.width = img.width;
                canvas3.height = img.height;
                var ctx = canvas3.getContext("2d");
                ctx.drawImage(img, 0, 0);
                Browser.preloadedImages[name] = canvas3;
                URL.revokeObjectURL(url);
                resolve(byteArray);
              };
              img.onerror = (event) => {
                err(`Image ${url} could not be decoded`);
                reject();
              };
              img.src = url;
            });
          };
          preloadPlugins.push(imagePlugin);
          var audioPlugin = {};
          audioPlugin["canHandle"] = (name) => !Module["noAudioDecoding"] && name.slice(-4) in {
            ".ogg": 1,
            ".wav": 1,
            ".mp3": 1
          };
          audioPlugin["handle"] = async (byteArray, name) => new Promise((resolve, reject) => {
            var done = false;
            function finish(audio2) {
              if (done) return;
              done = true;
              Browser.preloadedAudios[name] = audio2;
              resolve(byteArray);
            }
            var b2 = new Blob([byteArray], {
              type: Browser.getMimetype(name)
            });
            var url = URL.createObjectURL(b2);
            var audio = new Audio();
            audio.addEventListener("canplaythrough", () => finish(audio));
            audio.onerror = (event) => {
              if (done) return;
              err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
              function encode64(data) {
                var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var PAD = "=";
                var ret = "";
                var leftchar = 0;
                var leftbits = 0;
                for (var byte of data) {
                  leftchar = leftchar << 8 | byte;
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = leftchar >> leftbits - 6 & 63;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar & 3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar & 15) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
              finish(audio);
            };
            audio.src = url;
            safeSetTimeout(() => {
              finish(audio);
            }, 1e4);
          });
          preloadPlugins.push(audioPlugin);
          function pointerLockChange() {
            var canvas3 = Browser.getCanvas();
            Browser.pointerLock = document.pointerLockElement === canvas3;
          }
          var canvas2 = Browser.getCanvas();
          if (canvas2) {
            document.addEventListener("pointerlockchange", pointerLockChange);
            if (Module["elementPointerLock"]) {
              canvas2.addEventListener("click", (ev) => {
                if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
                  Browser.getCanvas().requestPointerLock();
                  ev.preventDefault();
                }
              });
            }
          }
        },
        createContext(canvas2, useWebGL, setInModule, webGLContextAttributes) {
          if (useWebGL && Module["ctx"] && canvas2 == Browser.getCanvas()) return Module["ctx"];
          var ctx;
          var contextHandle;
          if (useWebGL) {
            var contextAttributes = {
              antialias: false,
              alpha: false,
              majorVersion: typeof WebGL2RenderingContext != "undefined" ? 2 : 1
            };
            if (webGLContextAttributes) {
              for (var attribute in webGLContextAttributes) {
                contextAttributes[attribute] = webGLContextAttributes[attribute];
              }
            }
            if (typeof GL != "undefined") {
              contextHandle = GL.createContext(canvas2, contextAttributes);
              if (contextHandle) {
                ctx = GL.getContext(contextHandle).GLctx;
              }
            }
          } else {
            ctx = canvas2.getContext("2d");
          }
          if (!ctx) return null;
          if (setInModule) {
            Module["ctx"] = ctx;
            if (useWebGL) GL.makeContextCurrent(contextHandle);
            Browser.useWebGL = useWebGL;
            Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
            Browser.init();
          }
          return ctx;
        },
        fullscreenHandlersInstalled: false,
        lockPointer: void 0,
        resizeCanvas: void 0,
        requestFullscreen(lockPointer, resizeCanvas) {
          Browser.lockPointer = lockPointer;
          Browser.resizeCanvas = resizeCanvas;
          if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
          if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
          var canvas2 = Browser.getCanvas();
          function fullscreenChange() {
            Browser.isFullscreen = false;
            var canvasContainer2 = canvas2.parentNode;
            if (getFullscreenElement() === canvasContainer2) {
              canvas2.exitFullscreen = Browser.exitFullscreen;
              if (Browser.lockPointer) canvas2.requestPointerLock();
              Browser.isFullscreen = true;
              if (Browser.resizeCanvas) {
                Browser.setFullscreenCanvasSize();
              } else {
                Browser.updateCanvasDimensions(canvas2);
              }
            } else {
              canvasContainer2.parentNode.insertBefore(canvas2, canvasContainer2);
              canvasContainer2.parentNode.removeChild(canvasContainer2);
              if (Browser.resizeCanvas) {
                Browser.setWindowedCanvasSize();
              } else {
                Browser.updateCanvasDimensions(canvas2);
              }
            }
          }
          if (!Browser.fullscreenHandlersInstalled) {
            Browser.fullscreenHandlersInstalled = true;
            document.addEventListener("fullscreenchange", fullscreenChange);
            document.addEventListener("webkitfullscreenchange", fullscreenChange);
          }
          var canvasContainer = document.createElement("div");
          canvas2.parentNode.insertBefore(canvasContainer, canvas2);
          canvasContainer.appendChild(canvas2);
          canvasContainer.requestFullscreen ??= (canvasContainer["webkitRequestFullscreen"] ? () => canvasContainer["webkitRequestFullscreen"](Element.ALLOW_KEYBOARD_INPUT) : null) ?? (canvasContainer["webkitRequestFullScreen"] ? () => canvasContainer["webkitRequestFullScreen"](Element.ALLOW_KEYBOARD_INPUT) : null);
          canvasContainer.requestFullscreen();
        },
        exitFullscreen() {
          if (!Browser.isFullscreen) {
            return false;
          }
          var CFS = document.exitFullscreen ?? document["webkitCancelFullScreen"];
          CFS.apply(document, []);
          return true;
        },
        safeSetTimeout(func, timeout) {
          return safeSetTimeout(func, timeout);
        },
        getMimetype(name) {
          return {
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "png": "image/png",
            "bmp": "image/bmp",
            "ogg": "audio/ogg",
            "wav": "audio/wav",
            "mp3": "audio/mpeg"
          }[name.slice(name.lastIndexOf(".") + 1)];
        },
        getUserMedia(func) {
          return navigator.mediaDevices.getUserMedia(func);
        },
        getMouseWheelDelta(event) {
          var delta = 0;
          switch (event.type) {
            case "DOMMouseScroll":
              delta = event.detail / 3;
              break;
            case "mousewheel":
              delta = event.wheelDelta / 120;
              break;
            case "wheel":
              delta = event.deltaY;
              switch (event.deltaMode) {
                case 0:
                  delta /= 100;
                  break;
                case 1:
                  delta /= 3;
                  break;
                case 2:
                  delta *= 80;
                  break;
                default:
                  abort("unrecognized mouse wheel delta mode: " + event.deltaMode);
              }
              break;
            default:
              abort("unrecognized mouse wheel event: " + event.type);
          }
          return delta;
        },
        mouseX: 0,
        mouseY: 0,
        mouseMovementX: 0,
        mouseMovementY: 0,
        touches: {},
        lastTouches: {},
        calculateMouseCoords(pageX, pageY) {
          var canvas2 = Browser.getCanvas();
          var rect = canvas2.getBoundingClientRect();
          var adjustedX = pageX - (window.scrollX + rect.left);
          var adjustedY = pageY - (window.scrollY + rect.top);
          adjustedX = adjustedX * (canvas2.width / rect.width);
          adjustedY = adjustedY * (canvas2.height / rect.height);
          return {
            x: adjustedX,
            y: adjustedY
          };
        },
        setMouseCoords(pageX, pageY) {
          const { x: x2, y: y2 } = Browser.calculateMouseCoords(pageX, pageY);
          Browser.mouseMovementX = x2 - Browser.mouseX;
          Browser.mouseMovementY = y2 - Browser.mouseY;
          Browser.mouseX = x2;
          Browser.mouseY = y2;
        },
        calculateMouseEvent(event) {
          if (Browser.pointerLock) {
            Browser.mouseMovementX = event.movementX;
            Browser.mouseMovementY = event.movementY;
            Browser.mouseX += Browser.mouseMovementX;
            Browser.mouseY += Browser.mouseMovementY;
          } else {
            if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
              var touch = event.touch;
              if (touch === void 0) {
                return;
              }
              var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
              if (event.type === "touchstart") {
                Browser.lastTouches[touch.identifier] = coords;
                Browser.touches[touch.identifier] = coords;
              } else if (event.type === "touchend" || event.type === "touchmove") {
                var last = Browser.touches[touch.identifier];
                last ||= coords;
                Browser.lastTouches[touch.identifier] = last;
                Browser.touches[touch.identifier] = coords;
              }
              return;
            }
            Browser.setMouseCoords(event.pageX, event.pageY);
          }
        },
        resizeListeners: [],
        updateResizeListeners() {
          var canvas2 = Browser.getCanvas();
          Browser.resizeListeners.forEach((listener) => listener(canvas2.width, canvas2.height));
        },
        setCanvasSize(width, height, noUpdates) {
          var canvas2 = Browser.getCanvas();
          Browser.updateCanvasDimensions(canvas2, width, height);
          if (!noUpdates) Browser.updateResizeListeners();
        },
        windowedWidth: 0,
        windowedHeight: 0,
        setFullscreenCanvasSize() {
          if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags | 8388608;
            HEAP32[SDL.screen >> 2] = flags;
          }
          Browser.updateCanvasDimensions(Browser.getCanvas());
          Browser.updateResizeListeners();
        },
        setWindowedCanvasSize() {
          if (typeof SDL != "undefined") {
            var flags = HEAPU32[SDL.screen >> 2];
            flags = flags & ~8388608;
            HEAP32[SDL.screen >> 2] = flags;
          }
          Browser.updateCanvasDimensions(Browser.getCanvas());
          Browser.updateResizeListeners();
        },
        updateCanvasDimensions(canvas2, wNative, hNative) {
          if (wNative && hNative) {
            canvas2.widthNative = wNative;
            canvas2.heightNative = hNative;
          } else {
            wNative = canvas2.widthNative;
            hNative = canvas2.heightNative;
          }
          var w2 = wNative;
          var h2 = hNative;
          if (getFullscreenElement() === canvas2.parentNode && typeof screen != "undefined") {
            var factor = Math.min(screen.width / w2, screen.height / h2);
            w2 = Math.round(w2 * factor);
            h2 = Math.round(h2 * factor);
          }
          if (Browser.resizeCanvas) {
            if (canvas2.width != w2) canvas2.width = w2;
            if (canvas2.height != h2) canvas2.height = h2;
            if (typeof canvas2.style != "undefined") {
              canvas2.style.removeProperty("width");
              canvas2.style.removeProperty("height");
            }
          } else {
            if (canvas2.width != wNative) canvas2.width = wNative;
            if (canvas2.height != hNative) canvas2.height = hNative;
            if (typeof canvas2.style != "undefined") {
              if (w2 != wNative || h2 != hNative) {
                canvas2.style.setProperty("width", w2 + "px", "important");
                canvas2.style.setProperty("height", h2 + "px", "important");
              } else {
                canvas2.style.removeProperty("width");
                canvas2.style.removeProperty("height");
              }
            }
          }
        }
      };
      var HEAP8;
      var callRuntimeCallbacks = (callbacks) => {
        while (callbacks.length > 0) {
          callbacks.shift()(Module);
        }
      };
      var onPostRuns = [];
      var onPreRuns = [];
      var noExitRuntime = true;
      var stackRestore = (val) => __emscripten_stack_restore(val);
      var stackSave = () => _emscripten_stack_get_current();
      class ExceptionInfo {
        // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
        constructor(excPtr) {
          this.excPtr = excPtr;
          this.ptr = excPtr - 24;
        }
        set_type(type) {
          HEAPU32[this.ptr + 4 >> 2] = type;
        }
        get_type() {
          return HEAPU32[this.ptr + 4 >> 2];
        }
        set_destructor(destructor) {
          HEAPU32[this.ptr + 8 >> 2] = destructor;
        }
        get_destructor() {
          return HEAPU32[this.ptr + 8 >> 2];
        }
        set_caught(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + 12] = caught;
        }
        get_caught() {
          return HEAP8[this.ptr + 12] != 0;
        }
        set_rethrown(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + 13] = rethrown;
        }
        get_rethrown() {
          return HEAP8[this.ptr + 13] != 0;
        }
        // Initialize native structure fields. Should be called once after allocated.
        init(type, destructor) {
          this.set_adjusted_ptr(0);
          this.set_type(type);
          this.set_destructor(destructor);
        }
        set_adjusted_ptr(adjustedPtr) {
          HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
        }
        get_adjusted_ptr() {
          return HEAPU32[this.ptr + 16 >> 2];
        }
      }
      var uncaughtExceptionCount = 0;
      var __Unwind_RaiseException = (ex) => {
        abort();
      };
      var ___cxa_throw = (ptr, type, destructor) => {
        var info = new ExceptionInfo(ptr);
        info.init(type, destructor);
        uncaughtExceptionCount++;
        __Unwind_RaiseException(ptr);
      };
      var PATH = {
        isAbs: (path) => path.charAt(0) === "/",
        splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        },
        normalizeArray: (parts, allowAboveRoot) => {
          var up = 0;
          for (var i3 = parts.length - 1; i3 >= 0; i3--) {
            var last = parts[i3];
            if (last === ".") {
              parts.splice(i3, 1);
            } else if (last === "..") {
              parts.splice(i3, 1);
              up++;
            } else if (up) {
              parts.splice(i3, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift("..");
            }
          }
          return parts;
        },
        normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p2) => !!p2), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        },
        dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.slice(0, -1);
          }
          return root + dir;
        },
        basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
        join: (...paths) => PATH.normalize(paths.join("/")),
        join2: (l2, r2) => PATH.normalize(l2 + "/" + r2)
      };
      var initRandomFill = () => {
        if (ENVIRONMENT_IS_NODE) {
          var nodeCrypto = __require("node:crypto");
          return (view) => (nodeCrypto.randomFillSync(view), 0);
        }
        return (view) => (crypto.getRandomValues(view), 0);
      };
      var randomFill = (view) => (randomFill = initRandomFill())(view);
      var PATH_FS = {
        resolve: (...args) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i3 = args.length - 1; i3 >= -1 && !resolvedAbsolute; i3--) {
            var path = i3 >= 0 ? args[i3] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p2) => !!p2), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        },
        relative: (from, to2) => {
          from = PATH_FS.resolve(from).slice(1);
          to2 = PATH_FS.resolve(to2).slice(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to2.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i3 = 0; i3 < length; i3++) {
            if (fromParts[i3] !== toParts[i3]) {
              samePartsLength = i3;
              break;
            }
          }
          var outputParts = [];
          for (var i3 = samePartsLength; i3 < fromParts.length; i3++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        }
      };
      var UTF8Decoder = new TextDecoder();
      var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
        var maxIdx = idx + maxBytesToRead;
        if (ignoreNul) return maxIdx;
        while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
        return idx;
      };
      var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
        var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
        return UTF8Decoder.decode(heapOrArray.buffer ? heapOrArray.subarray(idx, endPtr) : new Uint8Array(heapOrArray.slice(idx, endPtr)));
      };
      var FS_stdin_getChar_buffer = [];
      var lengthBytesUTF8 = (str) => {
        var len = 0;
        for (var i3 = 0; i3 < str.length; ++i3) {
          var c2 = str.charCodeAt(i3);
          if (c2 <= 127) {
            len++;
          } else if (c2 <= 2047) {
            len += 2;
          } else if (c2 >= 55296 && c2 <= 57343) {
            len += 4;
            ++i3;
          } else {
            len += 3;
          }
        }
        return len;
      };
      var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
        if (!(maxBytesToWrite > 0)) return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i3 = 0; i3 < str.length; ++i3) {
          var u2 = str.codePointAt(i3);
          if (u2 <= 127) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u2;
          } else if (u2 <= 2047) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 192 | u2 >> 6;
            heap[outIdx++] = 128 | u2 & 63;
          } else if (u2 <= 65535) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 224 | u2 >> 12;
            heap[outIdx++] = 128 | u2 >> 6 & 63;
            heap[outIdx++] = 128 | u2 & 63;
          } else {
            if (outIdx + 3 >= endIdx) break;
            heap[outIdx++] = 240 | u2 >> 18;
            heap[outIdx++] = 128 | u2 >> 12 & 63;
            heap[outIdx++] = 128 | u2 >> 6 & 63;
            heap[outIdx++] = 128 | u2 & 63;
            i3++;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      };
      var intArrayFromString = (stringy, dontAddNull, length) => {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array;
      };
      var FS_stdin_getChar = () => {
        if (!FS_stdin_getChar_buffer.length) {
          var result = null;
          if (ENVIRONMENT_IS_NODE) {
            var BUFSIZE = 256;
            var buf = Buffer.alloc(BUFSIZE);
            var bytesRead = 0;
            var fd = process.stdin.fd;
            try {
              bytesRead = fs2.readSync(fd, buf, 0, BUFSIZE);
            } catch (e2) {
              if (e2.toString().includes("EOF")) bytesRead = 0;
              else throw e2;
            }
            if (bytesRead > 0) {
              result = buf.slice(0, bytesRead).toString("utf-8");
            }
          } else if (globalThis.window?.prompt) {
            result = window.prompt("Input: ");
            if (result !== null) {
              result += "\n";
            }
          } else {
          }
          if (!result) {
            return null;
          }
          FS_stdin_getChar_buffer = intArrayFromString(result, true);
        }
        return FS_stdin_getChar_buffer.shift();
      };
      var TTY = {
        ttys: [],
        init() {
        },
        shutdown() {
        },
        register(dev, ops) {
          TTY.ttys[dev] = {
            input: [],
            output: [],
            ops
          };
          FS.registerDevice(dev, TTY.stream_ops);
        },
        stream_ops: {
          open(stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
              throw new FS.ErrnoError(43);
            }
            stream.tty = tty;
            stream.seekable = false;
          },
          close(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          fsync(stream) {
            stream.tty.ops.fsync(stream.tty);
          },
          read(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.get_char) {
              throw new FS.ErrnoError(60);
            }
            var bytesRead = 0;
            for (var i3 = 0; i3 < length; i3++) {
              var result;
              try {
                result = stream.tty.ops.get_char(stream.tty);
              } catch (e2) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && !bytesRead) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer[offset + i3] = result;
              if (result === 10) break;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
              throw new FS.ErrnoError(60);
            }
            try {
              for (var i3 = 0; i3 < length; i3++) {
                stream.tty.ops.put_char(stream.tty, buffer[offset + i3]);
              }
            } catch (e2) {
              throw new FS.ErrnoError(29);
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i3;
          }
        },
        default_tty_ops: {
          get_char(tty) {
            return FS_stdin_getChar();
          },
          put_char(tty, val) {
            if (val === null || val === 10) {
              out(UTF8ArrayToString(tty.output));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output?.length > 0) {
              out(UTF8ArrayToString(tty.output));
              tty.output = [];
            }
          },
          ioctl_tcgets(tty) {
            return {
              c_iflag: 25856,
              c_oflag: 5,
              c_cflag: 191,
              c_lflag: 35387,
              c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
          },
          ioctl_tcsets(tty, optional_actions, data) {
            return 0;
          },
          ioctl_tiocgwinsz(tty) {
            return [24, 80];
          }
        },
        default_tty1_ops: {
          put_char(tty, val) {
            if (val === null || val === 10) {
              err(UTF8ArrayToString(tty.output));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val);
            }
          },
          fsync(tty) {
            if (tty.output?.length > 0) {
              err(UTF8ArrayToString(tty.output));
              tty.output = [];
            }
          }
        }
      };
      var HEAPU8;
      var zeroMemory = (ptr, size) => HEAPU8.fill(0, ptr, ptr + size);
      var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
      var mmapAlloc = (size) => {
        size = alignMemory(size, 65536);
        var ptr = _emscripten_builtin_memalign(65536, size);
        if (ptr) zeroMemory(ptr, size);
        return ptr;
      };
      var MEMFS = {
        ops_table: null,
        mount(mount) {
          return MEMFS.createNode(null, "/", 16895, 0);
        },
        createNode(parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table ||= {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = MEMFS.emptyFileContents ??= new Uint8Array(0);
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.atime = node.mtime = node.ctime = Date.now();
          if (parent) {
            parent.contents[name] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime;
          }
          return node;
        },
        getFileDataAsTypedArray(node) {
          return node.contents.subarray(0, node.usedBytes);
        },
        expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents.length;
          if (prevCapacity >= newCapacity) return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity) newCapacity = Math.max(newCapacity, 256);
          var oldContents = MEMFS.getFileDataAsTypedArray(node);
          node.contents = new Uint8Array(newCapacity);
          node.contents.set(oldContents);
        },
        resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize) return;
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
          node.usedBytes = newSize;
        },
        node_ops: {
          getattr(node) {
            var attr = {};
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
              attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
              attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
              attr.size = node.link.length;
            } else {
              attr.size = 0;
            }
            attr.atime = new Date(node.atime);
            attr.mtime = new Date(node.mtime);
            attr.ctime = new Date(node.ctime);
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
          },
          setattr(node, attr) {
            for (const key of ["mode", "atime", "mtime", "ctime"]) {
              if (attr[key] != null) {
                node[key] = attr[key];
              }
            }
            if (attr.size !== void 0) {
              MEMFS.resizeFileStorage(node, attr.size);
            }
          },
          lookup(parent, name) {
            if (!MEMFS.doesNotExistError) {
              MEMFS.doesNotExistError = new FS.ErrnoError(44);
              MEMFS.doesNotExistError.stack = "<generic error, no stack>";
            }
            throw MEMFS.doesNotExistError;
          },
          mknod(parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
          },
          rename(old_node, new_dir, new_name) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e2) {
            }
            if (new_node) {
              if (FS.isDir(old_node.mode)) {
                for (var i3 in new_node.contents) {
                  throw new FS.ErrnoError(55);
                }
              }
              FS.hashRemoveNode(new_node);
            }
            delete old_node.parent.contents[old_node.name];
            new_dir.contents[new_name] = old_node;
            old_node.name = new_name;
            new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
          },
          unlink(parent, name) {
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now();
          },
          rmdir(parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i3 in node.contents) {
              throw new FS.ErrnoError(55);
            }
            delete parent.contents[name];
            parent.ctime = parent.mtime = Date.now();
          },
          readdir(node) {
            return [".", "..", ...Object.keys(node.contents)];
          },
          symlink(parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
            node.link = oldpath;
            return node;
          },
          readlink(node) {
            if (!FS.isLink(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            return node.link;
          }
        },
        stream_ops: {
          read(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes) return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            buffer.set(contents.subarray(position, position + size), offset);
            return size;
          },
          write(stream, buffer, offset, length, position, canOwn) {
            if (buffer.buffer === HEAP8.buffer) {
              canOwn = false;
            }
            if (!length) return 0;
            var node = stream.node;
            node.mtime = node.ctime = Date.now();
            if (canOwn) {
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
            } else if (!node.usedBytes && !position) {
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
            } else {
              MEMFS.expandFileStorage(node, position + length);
              node.contents.set(buffer.subarray(offset, offset + length), position);
              node.usedBytes = Math.max(node.usedBytes, position + length);
            }
            return length;
          },
          llseek(stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
              position += stream.position;
            } else if (whence === 2) {
              if (FS.isFile(stream.node.mode)) {
                position += stream.node.usedBytes;
              }
            }
            if (position < 0) {
              throw new FS.ErrnoError(28);
            }
            return position;
          },
          mmap(stream, length, position, prot, flags) {
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
              allocated = false;
              ptr = contents.byteOffset;
            } else {
              allocated = true;
              ptr = mmapAlloc(length);
              if (!ptr) {
                throw new FS.ErrnoError(48);
              }
              if (contents) {
                if (position > 0 || position + length < contents.length) {
                  if (contents.subarray) {
                    contents = contents.subarray(position, position + length);
                  } else {
                    contents = Array.prototype.slice.call(contents, position, position + length);
                  }
                }
                HEAP8.set(contents, ptr);
              }
            }
            return {
              ptr,
              allocated
            };
          },
          msync(stream, buffer, offset, length, mmapFlags) {
            MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
            return 0;
          }
        }
      };
      var FS_modeStringToFlags = (str) => {
        if (typeof str != "string") return str;
        var flagModes = {
          "r": 0,
          "r+": 2,
          "w": 512 | 64 | 1,
          "w+": 512 | 64 | 2,
          "a": 1024 | 64 | 1,
          "a+": 1024 | 64 | 2
        };
        var flags = flagModes[str];
        if (typeof flags == "undefined") {
          throw new Error(`Unknown file open mode: ${str}`);
        }
        return flags;
      };
      var FS_fileDataToTypedArray = (data) => {
        if (typeof data == "string") {
          data = intArrayFromString(data, true);
        }
        if (!data.subarray) {
          data = new Uint8Array(data);
        }
        return data;
      };
      var FS_getMode = (canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      };
      var asyncLoad = async (url) => {
        var arrayBuffer = await readAsync(url);
        return new Uint8Array(arrayBuffer);
      };
      var FS_createDataFile = (...args) => FS.createDataFile(...args);
      var getUniqueRunDependency = (id) => id;
      var dependenciesPromise = null;
      var resolveRunDependencies = async () => dependenciesPromise;
      var runDependencies = 0;
      var dependenciesPromiseResolve = null;
      var removeRunDependency = (id) => {
        runDependencies--;
        Module["monitorRunDependencies"]?.(runDependencies);
        if (!runDependencies) {
          dependenciesPromiseResolve();
        }
      };
      var addRunDependency = (id) => {
        if (!runDependencies) {
          dependenciesPromise = new Promise((resolve) => dependenciesPromiseResolve = resolve);
        }
        runDependencies++;
        Module["monitorRunDependencies"]?.(runDependencies);
      };
      var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
        if (typeof Browser != "undefined") Browser.init();
        for (var plugin of preloadPlugins) {
          if (plugin["canHandle"](fullname)) {
            return plugin["handle"](byteArray, fullname);
          }
        }
        return byteArray;
      };
      var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency(`cp ${fullname}`);
        addRunDependency(dep);
        try {
          var byteArray = url;
          if (typeof url == "string") {
            byteArray = await asyncLoad(url);
          }
          byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
        } finally {
          removeRunDependency(dep);
        }
      };
      var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
      };
      var FS = {
        root: null,
        mounts: [],
        devices: {},
        streams: [],
        nextInode: 1,
        nameTable: null,
        currentPath: "/",
        initialized: false,
        ignorePermissions: true,
        filesystems: null,
        syncFSRequests: 0,
        ErrnoError: class {
          name = "ErrnoError";
          // We set the `name` property to be able to identify `FS.ErrnoError`
          // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
          // - when using PROXYFS, an error can come from an underlying FS
          // as different FS objects have their own FS.ErrnoError each,
          // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
          // we'll use the reliable test `err.name == "ErrnoError"` instead
          constructor(errno) {
            this.errno = errno;
          }
        },
        FSStream: class {
          shared = {};
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        },
        FSNode: class {
          node_ops = {};
          stream_ops = {};
          readMode = 292 | 73;
          writeMode = 146;
          mounted = null;
          constructor(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
          // The per-inode readiness wait-queue. The node carries a Set of listener
          // entries {cb}; producers (SOCKFS, PIPEFS) call notifyListeners on a
          // readiness transition, and poll()/epoll consume it. It lives on the node
          // (not the fd) so dup'd fds share one queue. Only nodes that derive real
          // readiness (sockets, pipes, and an epoll's own node) ever use this -
          // always-ready types (regular files, ttys) never register or notify.
          addListener(cb, exclusive = false) {
            var entry = {
              cb,
              exclusive
            };
            var listeners = this.listeners ??= /* @__PURE__ */ new Set();
            listeners.add(entry);
            return {
              listeners,
              entry
            };
          }
          notifyListeners(flags) {
            if (!this.listeners) return;
            var excl;
            for (var entry of this.listeners) {
              if (entry.exclusive) (excl ||= []).push(entry);
              else entry.cb(flags);
            }
            if (excl) {
              var i3 = (this.exclTurn || 0) % excl.length;
              this.exclTurn = i3 + 1;
              excl[i3].cb(flags);
            }
          }
        },
        lookupPath(path, opts = {}) {
          if (!path) {
            throw new FS.ErrnoError(44);
          }
          opts.follow_mount ??= true;
          if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path;
          }
          linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts = path.split("/").filter((p2) => !!p2);
            var current = FS.root;
            var current_path = "/";
            for (var i3 = 0; i3 < parts.length; i3++) {
              var islast = i3 === parts.length - 1;
              if (islast && opts.parent) {
                break;
              }
              if (parts[i3] === ".") {
                continue;
              }
              if (parts[i3] === "..") {
                current_path = PATH.dirname(current_path);
                if (FS.isRoot(current)) {
                  path = current_path + "/" + parts.slice(i3 + 1).join("/");
                  nlinks--;
                  continue linkloop;
                } else {
                  current = current.parent;
                }
                continue;
              }
              current_path = PATH.join2(current_path, parts[i3]);
              try {
                current = FS.lookupNode(current, parts[i3]);
              } catch (e2) {
                if (e2?.errno === 44 && islast && opts.noent_okay) {
                  return {
                    path: current_path
                  };
                }
                throw e2;
              }
              if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                current = current.mounted.root;
              }
              if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                if (!current.node_ops.readlink) {
                  throw new FS.ErrnoError(52);
                }
                var link = current.node_ops.readlink(current);
                if (!PATH.isAbs(link)) {
                  link = PATH.dirname(current_path) + "/" + link;
                }
                path = link + "/" + parts.slice(i3 + 1).join("/");
                continue linkloop;
              }
            }
            return {
              path: current_path,
              node: current
            };
          }
          throw new FS.ErrnoError(32);
        },
        getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        },
        hashName(parentid, name) {
          var hash2 = 0;
          for (var i3 = 0; i3 < name.length; i3++) {
            hash2 = (hash2 << 5) - hash2 + name.charCodeAt(i3) | 0;
          }
          return (parentid + hash2 >>> 0) % FS.nameTable.length;
        },
        hashAddNode(node) {
          var hash2 = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash2];
          FS.nameTable[hash2] = node;
        },
        hashRemoveNode(node) {
          var hash2 = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash2] === node) {
            FS.nameTable[hash2] = node.name_next;
          } else {
            var current = FS.nameTable[hash2];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        },
        lookupNode(parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash2 = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash2]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          return FS.lookup(parent, name);
        },
        createNode(parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);
          FS.hashAddNode(node);
          return node;
        },
        destroyNode(node) {
          FS.hashRemoveNode(node);
        },
        isRoot(node) {
          return node === node.parent;
        },
        isMountpoint(node) {
          return !!node.mounted;
        },
        isFile(mode) {
          return (mode & 61440) === 32768;
        },
        isDir(mode) {
          return (mode & 61440) === 16384;
        },
        isLink(mode) {
          return (mode & 61440) === 40960;
        },
        isChrdev(mode) {
          return (mode & 61440) === 8192;
        },
        isBlkdev(mode) {
          return (mode & 61440) === 24576;
        },
        isFIFO(mode) {
          return (mode & 61440) === 4096;
        },
        isSocket(mode) {
          return (mode & 49152) === 49152;
        },
        flagsToPermissionString(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        },
        nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          }
          if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          }
          if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        },
        mayLookup(dir) {
          if (!FS.isDir(dir.mode)) return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        },
        mayCreate(dir, name) {
          if (!FS.isDir(dir.mode)) {
            return 54;
          }
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e2) {
          }
          return FS.nodePermissions(dir, "wx");
        },
        mayDelete(dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e2) {
            return e2.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else if (FS.isDir(node.mode)) {
            return 31;
          }
          return 0;
        },
        mayOpen(node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          }
          var mode = FS.flagsToPermissionString(flags);
          if (FS.isDir(node.mode)) {
            if (mode !== "r" || flags & (512 | 64)) {
              return 31;
            }
          }
          return FS.nodePermissions(node, mode);
        },
        checkOpExists(op, err2) {
          if (!op) {
            throw new FS.ErrnoError(err2);
          }
          return op;
        },
        MAX_OPEN_FDS: 4096,
        nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        },
        getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        },
        getStream: (fd) => FS.streams[fd],
        createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        },
        closeStream(fd) {
          FS.streams[fd] = null;
        },
        dupStream(origStream, fd = -1) {
          var stream = FS.createStream(origStream, fd);
          stream.stream_ops?.dup?.(stream);
          return stream;
        },
        doSetAttr(stream, node, attr) {
          var setattr = stream?.stream_ops.setattr;
          var arg = setattr ? stream : node;
          setattr ??= node.node_ops.setattr;
          FS.checkOpExists(setattr, 63);
          try {
            setattr(arg, attr);
          } catch (e2) {
            if (e2 instanceof RangeError) {
              throw new FS.ErrnoError(22);
            }
            throw e2;
          }
        },
        chrdev_stream_ops: {
          open(stream) {
            var device = FS.getDevice(stream.node.rdev);
            stream.stream_ops = device.stream_ops;
            stream.stream_ops.open?.(stream);
          },
          llseek() {
            throw new FS.ErrnoError(70);
          }
        },
        major: (dev) => dev >> 8,
        minor: (dev) => dev & 255,
        makedev: (ma2, mi2) => ma2 << 8 | mi2,
        registerDevice(dev, ops) {
          FS.devices[dev] = {
            stream_ops: ops
          };
        },
        getDevice: (dev) => FS.devices[dev],
        getMounts(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m2 = check.pop();
            mounts.push(m2);
            check.push(...m2.mounts);
          }
          return mounts;
        },
        syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          for (var mount of mounts) {
            if (mount.type.syncfs) {
              mount.type.syncfs(mount, populate, done);
            } else {
              done(null);
            }
          }
        },
        mount(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, {
              follow_mount: false
            });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = {
            type,
            opts,
            mountpoint,
            mounts: []
          };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        },
        unmount(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, {
            follow_mount: false
          });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          for (var [hash2, current] of Object.entries(FS.nameTable)) {
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          }
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        },
        lookup(parent, name) {
          return parent.node_ops.lookup(parent, name);
        },
        mknod(path, mode, dev) {
          var lookup = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name) {
            throw new FS.ErrnoError(28);
          }
          if (name === "." || name === "..") {
            throw new FS.ErrnoError(20);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        },
        statfs(path) {
          return FS.statfsNode(FS.lookupPath(path, {
            follow: true
          }).node);
        },
        statfsStream(stream) {
          return FS.statfsNode(stream.node);
        },
        statfsNode(node) {
          var rtn = {
            bsize: 4096,
            frsize: 4096,
            blocks: 1e6,
            bfree: 5e5,
            bavail: 5e5,
            files: FS.nextInode,
            ffree: FS.nextInode - 1,
            fsid: 42,
            flags: 2,
            namelen: 255
          };
          if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
          }
          return rtn;
        },
        create(path, mode = 438) {
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        },
        mkdir(path, mode = 511) {
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        },
        mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d2 = "";
          for (var dir of dirs) {
            if (!dir) continue;
            if (d2 || PATH.isAbs(path)) d2 += "/";
            d2 += dir;
            try {
              FS.mkdir(d2, mode);
            } catch (e2) {
              if (e2.errno != 20) throw e2;
            }
          }
        },
        mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        },
        symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, {
            parent: true
          });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        },
        link(oldpath, newpath, flags) {
          var lookup = FS.lookupPath(newpath, {
            parent: true
          });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.link) {
            throw new FS.ErrnoError(34);
          }
          return parent.node_ops.link(parent, newname, oldpath, flags);
        },
        rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          lookup = FS.lookupPath(old_path, {
            parent: true
          });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, {
            parent: true
          });
          new_dir = lookup.node;
          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e2) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir;
          } catch (e2) {
            throw e2;
          } finally {
            FS.hashAddNode(old_node);
          }
        },
        rmdir(path) {
          var lookup = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
        },
        readdir(path) {
          var lookup = FS.lookupPath(path, {
            follow: true
          });
          var node = lookup.node;
          var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
          return readdir(node);
        },
        unlink(path) {
          var lookup = FS.lookupPath(path, {
            parent: true
          });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
        },
        readlink(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return link.node_ops.readlink(link);
        },
        stat(path, dontFollow) {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow
          });
          var node = lookup.node;
          var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
          return getattr(node);
        },
        fstat(fd) {
          var stream = FS.getStreamChecked(fd);
          var node = stream.node;
          var getattr = stream.stream_ops.getattr;
          var arg = getattr ? stream : node;
          getattr ??= node.node_ops.getattr;
          FS.checkOpExists(getattr, 63);
          return getattr(arg);
        },
        lstat(path) {
          return FS.stat(path, true);
        },
        doChmod(stream, node, mode, dontFollow) {
          FS.doSetAttr(stream, node, {
            mode: mode & 4095 | node.mode & ~4095,
            ctime: Date.now(),
            dontFollow
          });
        },
        chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
              follow: !dontFollow
            });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChmod(null, node, mode, dontFollow);
        },
        lchmod(path, mode) {
          FS.chmod(path, mode, true);
        },
        fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.doChmod(stream, stream.node, mode, false);
        },
        doChown(stream, node, dontFollow) {
          FS.doSetAttr(stream, node, {
            timestamp: Date.now(),
            dontFollow
          });
        },
        chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
              follow: !dontFollow
            });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChown(null, node, dontFollow);
        },
        lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        },
        fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.doChown(stream, stream.node, false);
        },
        doTruncate(stream, node, len) {
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.doSetAttr(stream, node, {
            size: len,
            timestamp: Date.now()
          });
        },
        truncate(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, {
              follow: true
            });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doTruncate(null, node, len);
        },
        ftruncate(fd, len) {
          var stream = FS.getStreamChecked(fd);
          if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.doTruncate(stream, stream.node, len);
        },
        utime(path, atime, mtime, dontFollow) {
          var lookup = FS.lookupPath(path, {
            follow: !dontFollow
          });
          FS.doSetAttr(null, lookup.node, {
            atime,
            mtime,
            dontFollow
          });
        },
        open(path, flags, mode = 438) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = FS_modeStringToFlags(flags);
          if (flags & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          var isDirPath;
          if (typeof path == "object") {
            node = path;
          } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072),
              noent_okay: true
            });
            node = lookup.node;
            path = lookup.path;
          }
          var created = false;
          if (flags & 64) {
            if (node) {
              if (flags & 128) {
                throw new FS.ErrnoError(20);
              }
            } else if (isDirPath) {
              throw new FS.ErrnoError(31);
            } else {
              node = FS.mknod(path, mode | 511, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          if (flags & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags &= ~(128 | 512 | 131072);
          var stream = FS.createStream({
            node,
            path: FS.getPath(node),
            // we want the absolute path to the node
            flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            // used by the file family libc calls (fopen, fwrite, ferror, etc.)
            ungotten: [],
            error: false
          });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (created) {
            FS.chmod(node, mode & 511);
          }
          return stream;
        },
        close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null;
          stream.node?.notifyListeners(32);
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e2) {
            throw e2;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        },
        isClosed(stream) {
          return stream.fd === null;
        },
        llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        },
        read(stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        },
        write(stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          return bytesWritten;
        },
        mmap(stream, length, position, prot, flags) {
          if (prot & 2 && !(flags & 2) && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          if (!length) {
            throw new FS.ErrnoError(28);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags);
        },
        msync(stream, buffer, offset, length, mmapFlags) {
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        },
        ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        },
        readFile(path, opts = {}) {
          opts.flags = opts.flags ?? 0;
          opts.encoding = opts.encoding ?? "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            abort(`Invalid encoding type "${opts.encoding}"`);
          }
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            buf = UTF8ArrayToString(buf);
          }
          FS.close(stream);
          return buf;
        },
        writeFile(path, data, opts = {}) {
          opts.flags = opts.flags ?? 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          data = FS_fileDataToTypedArray(data);
          FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          FS.close(stream);
        },
        cwd: () => FS.currentPath,
        chdir(path) {
          var lookup = FS.lookupPath(path, {
            follow: true
          });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        },
        createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        },
        createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), {
            read: () => 0,
            write: (stream, buffer, offset, length, pos) => length,
            llseek: () => 0
          });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (!randomLeft) {
              randomFill(randomBuffer);
              randomLeft = randomBuffer.byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        },
        createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({
            mount() {
              var node = FS.createNode(proc_self, "fd", 16895, 73);
              node.stream_ops = {
                llseek: MEMFS.stream_ops.llseek
              };
              node.node_ops = {
                lookup(parent, name) {
                  var fd = +name;
                  var stream = FS.getStreamChecked(fd);
                  var ret = {
                    parent: null,
                    mount: {
                      mountpoint: "fake"
                    },
                    node_ops: {
                      readlink: () => stream.path
                    },
                    id: fd + 1
                  };
                  ret.parent = ret;
                  return ret;
                },
                readdir() {
                  return Array.from(FS.streams.entries()).filter(([k2, v2]) => v2).map(([k2, v2]) => k2.toString());
                }
              };
              return node;
            }
          }, {}, "/proc/self/fd");
        },
        createStandardStreams(input, output, error) {
          if (input) {
            FS.createDevice("/dev", "stdin", input);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (output) {
            FS.createDevice("/dev", "stdout", null, output);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (error) {
            FS.createDevice("/dev", "stderr", null, error);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
        },
        staticInit() {
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = {
            "MEMFS": MEMFS
          };
        },
        init(input, output, error) {
          FS.initialized = true;
          input ??= Module["stdin"];
          output ??= Module["stdout"];
          error ??= Module["stderr"];
          FS.createStandardStreams(input, output, error);
        },
        quit() {
          FS.initialized = false;
          for (var stream of FS.streams) {
            if (stream) {
              FS.close(stream);
            }
          }
        },
        findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        },
        analyzePath(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, {
              follow: !dontResolveLastLink
            });
            path = lookup.path;
          } catch (e2) {
          }
          var ret = {
            isRoot: false,
            exists: false,
            error: 0,
            name: null,
            path: null,
            object: null,
            parentExists: false,
            parentPath: null,
            parentObject: null
          };
          try {
            var lookup = FS.lookupPath(path, {
              parent: true
            });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, {
              follow: !dontResolveLastLink
            });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e2) {
            ret.error = e2.errno;
          }
          return ret;
        },
        createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts = path.split("/").reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e2) {
              if (e2.errno != 20) throw e2;
            }
            parent = current;
          }
          return current;
        },
        createFile(parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        },
        createDataFile(parent, name, data, canRead, canWrite, canOwn) {
          var path = name;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name ? PATH.join2(parent, name) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            data = FS_fileDataToTypedArray(data);
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        },
        createDevice(parent, name, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
          var mode = FS_getMode(!!input, !!output);
          FS.createDevice.major ??= 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, {
            open(stream) {
              stream.seekable = false;
            },
            close(stream) {
              if (output?.buffer?.length) {
                output(10);
              }
            },
            read(stream, buffer, offset, length, pos) {
              var bytesRead = 0;
              for (var i3 = 0; i3 < length; i3++) {
                var result;
                try {
                  result = input();
                } catch (e2) {
                  throw new FS.ErrnoError(29);
                }
                if (result === void 0 && !bytesRead) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === void 0) break;
                bytesRead++;
                buffer[offset + i3] = result;
              }
              if (bytesRead) {
                stream.node.atime = Date.now();
              }
              return bytesRead;
            },
            write(stream, buffer, offset, length, pos) {
              for (var i3 = 0; i3 < length; i3++) {
                try {
                  output(buffer[offset + i3]);
                } catch (e2) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.mtime = stream.node.ctime = Date.now();
              }
              return i3;
            }
          });
          return FS.mkdev(path, mode, dev);
        },
        forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          if (globalThis.XMLHttpRequest) {
            abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else {
            try {
              obj.contents = readBinary(obj.url);
            } catch (e2) {
              throw new FS.ErrnoError(29);
            }
          }
        },
        createLazyFile(parent, name, url, canRead, canWrite) {
          class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            // Loaded chunks. Index is the chunk number
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr.status}`);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing) chunkSize = datalength;
              var doXHR = (from, to2) => {
                if (from > to2) abort(`invalid range (${from}, ${to2}) or no bytes requested!`);
                if (to2 > datalength - 1) abort(`only ${datalength} bytes available! programmer error!`);
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize) xhr2.setRequestHeader("Range", `bytes=${from}-${to2}`);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) abort(`Couldn't load ${url}. Status: ${xhr2.status}`);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(
                    /** @type{Array<number>} */
                    xhr2.response || []
                  );
                }
                return intArrayFromString(xhr2.responseText ?? "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") abort("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (globalThis.XMLHttpRequest) {
            if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
            var lazyArray = new LazyUint8Array();
            var properties = {
              isDevice: false,
              contents: lazyArray
            };
          } else {
            var properties = {
              isDevice: false,
              url
            };
          }
          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, {
            usedBytes: {
              get: function() {
                return this.contents.length;
              }
            }
          });
          var stream_ops = {};
          for (const [key, fn2] of Object.entries(node.stream_ops)) {
            stream_ops[key] = (...args) => {
              FS.forceLoadFile(node);
              return fn2(...args);
            };
          }
          function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length) return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i3 = 0; i3 < size; i3++) {
                buffer[offset + i3] = contents[position + i3];
              }
            } else {
              for (var i3 = 0; i3 < size; i3++) {
                buffer[offset + i3] = contents.get(position + i3);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP8, ptr, length, position);
            return {
              ptr,
              allocated: true
            };
          };
          node.stream_ops = stream_ops;
          return node;
        }
      };
      var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
        if (!ptr) return "";
        var end = findStringEnd(HEAPU8, ptr, maxBytesToRead, ignoreNul);
        return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
      };
      var SYSCALLS = {
        currentUmask: 18,
        calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
            }
            return dir;
          }
          return dir + "/" + path;
        },
        writeStat(buf, stat) {
          HEAPU32[buf >> 2] = stat.dev;
          HEAPU32[buf + 4 >> 2] = stat.mode;
          HEAPU32[buf + 8 >> 2] = stat.nlink;
          HEAPU32[buf + 12 >> 2] = stat.uid;
          HEAPU32[buf + 16 >> 2] = stat.gid;
          HEAPU32[buf + 20 >> 2] = stat.rdev;
          tempI64 = [stat.size >>> 0, (tempDouble = stat.size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
          HEAP32[buf + 32 >> 2] = 4096;
          HEAP32[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          tempI64 = [Math.floor(atime / 1e3) >>> 0, (tempDouble = Math.floor(atime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
          HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
          tempI64 = [Math.floor(mtime / 1e3) >>> 0, (tempDouble = Math.floor(mtime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 56 >> 2] = tempI64[0], HEAP32[buf + 60 >> 2] = tempI64[1];
          HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
          tempI64 = [Math.floor(ctime / 1e3) >>> 0, (tempDouble = Math.floor(ctime / 1e3), +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 72 >> 2] = tempI64[0], HEAP32[buf + 76 >> 2] = tempI64[1];
          HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
          tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 88 >> 2] = tempI64[0], HEAP32[buf + 92 >> 2] = tempI64[1];
          return 0;
        },
        writeStatFs(buf, stats) {
          HEAPU32[buf + 4 >> 2] = stats.bsize;
          HEAPU32[buf + 60 >> 2] = stats.bsize;
          tempI64 = [stats.blocks >>> 0, (tempDouble = stats.blocks, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 8 >> 2] = tempI64[0], HEAP32[buf + 12 >> 2] = tempI64[1];
          tempI64 = [stats.bfree >>> 0, (tempDouble = stats.bfree, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 16 >> 2] = tempI64[0], HEAP32[buf + 20 >> 2] = tempI64[1];
          tempI64 = [stats.bavail >>> 0, (tempDouble = stats.bavail, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 24 >> 2] = tempI64[0], HEAP32[buf + 28 >> 2] = tempI64[1];
          tempI64 = [stats.files >>> 0, (tempDouble = stats.files, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 32 >> 2] = tempI64[0], HEAP32[buf + 36 >> 2] = tempI64[1];
          tempI64 = [stats.ffree >>> 0, (tempDouble = stats.ffree, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[buf + 40 >> 2] = tempI64[0], HEAP32[buf + 44 >> 2] = tempI64[1];
          HEAPU32[buf + 48 >> 2] = stats.fsid;
          HEAPU32[buf + 64 >> 2] = stats.flags;
          HEAPU32[buf + 56 >> 2] = stats.namelen;
        },
        doMsync(addr, stream, len, flags, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags & 2) {
            return 0;
          }
          var buffer = HEAPU8.subarray(addr, addr + len);
          FS.msync(stream, buffer, offset, len, flags);
        },
        getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        },
        varargs: void 0,
        getStr(ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }
      };
      function ___syscall_dup(fd) {
        try {
          var old = SYSCALLS.getStreamFromFD(fd);
          return FS.dupStream(old).fd;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_faccessat(dirfd, path, amode, flags) {
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          if (amode & ~7) {
            return -28;
          }
          var lookup = FS.lookupPath(path, {
            follow: true
          });
          var node = lookup.node;
          if (!node) {
            return -44;
          }
          var perms = "";
          if (amode & 4) perms += "r";
          if (amode & 2) perms += "w";
          if (amode & 1) perms += "x";
          if (perms && FS.nodePermissions(node, perms)) {
            return -2;
          }
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var syscallGetVarargI = () => {
        var ret = HEAP32[+SYSCALLS.varargs >> 2];
        SYSCALLS.varargs += 4;
        return ret;
      };
      var syscallGetVarargP = syscallGetVarargI;
      var HEAP16;
      function ___syscall_fcntl64(fd, cmd, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (cmd) {
            case 0: {
              var arg = syscallGetVarargI();
              if (arg < 0) {
                return -28;
              }
              while (FS.streams[arg]) {
                arg++;
              }
              var newStream;
              newStream = FS.dupStream(stream, arg);
              return newStream.fd;
            }
            case 1:
            case 2:
              return 0;
            // FD_CLOEXEC makes no sense for a single process.
            case 3:
              return stream.flags;
            case 4: {
              var arg = syscallGetVarargI();
              var mask = 289792;
              stream.flags = stream.flags & ~mask | arg & mask;
              return 0;
            }
            case 12: {
              var arg = syscallGetVarargP();
              var offset = 0;
              HEAP16[arg + offset >> 1] = 2;
              return 0;
            }
            case 13:
            case 14:
              return 0;
          }
          return -28;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_fstat64(fd, buf) {
        try {
          return SYSCALLS.writeStat(buf, FS.fstat(fd));
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var convertI32PairToI53Checked = (lo2, hi2) => hi2 + 2097152 >>> 0 < 4194305 - !!lo2 ? (lo2 >>> 0) + hi2 * 4294967296 : NaN;
      function ___syscall_ftruncate64(fd, length_low, length_high) {
        var length = convertI32PairToI53Checked(length_low, length_high);
        try {
          if (isNaN(length)) return -22;
          FS.ftruncate(fd, length);
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      function ___syscall_getcwd(buf, size) {
        try {
          if (!size) return -28;
          var cwd = FS.cwd();
          var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
          if (size < cwdLengthInBytes) return -68;
          stringToUTF8(cwd, buf, size);
          return cwdLengthInBytes;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_getdents64(fd, dirp, count) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          stream.getdents ||= FS.readdir(stream.path);
          var struct_size = 280;
          var pos = 0;
          var off = FS.llseek(stream, 0, 1);
          var startIdx = Math.floor(off / struct_size);
          var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
          for (var idx = startIdx; idx < endIdx; idx++) {
            var id;
            var type;
            var name = stream.getdents[idx];
            if (name === ".") {
              id = stream.node.id;
              type = 4;
            } else if (name === "..") {
              var lookup = FS.lookupPath(stream.path, {
                parent: true
              });
              id = lookup.node.id;
              type = 4;
            } else {
              var child;
              try {
                child = FS.lookupNode(stream.node, name);
              } catch (e2) {
                if (e2?.errno === 28) {
                  continue;
                }
                throw e2;
              }
              id = child.id;
              type = FS.isChrdev(child.mode) ? 2 : (
                // character device.
                FS.isDir(child.mode) ? 4 : (
                  // directory
                  FS.isLink(child.mode) ? 10 : (
                    // symbolic link.
                    8
                  )
                )
              );
            }
            tempI64 = [id >>> 0, (tempDouble = id, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos >> 2] = tempI64[0], HEAP32[dirp + pos + 4 >> 2] = tempI64[1];
            tempI64 = [(idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[dirp + pos + 8 >> 2] = tempI64[0], HEAP32[dirp + pos + 12 >> 2] = tempI64[1];
            HEAP16[dirp + pos + 16 >> 1] = 280;
            HEAP8[dirp + pos + 18] = type;
            stringToUTF8(name, dirp + pos + 19, 256);
            pos += struct_size;
          }
          FS.llseek(stream, idx * struct_size, 0);
          return pos;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var ___syscall_getuid32 = () => 0;
      function ___syscall_ioctl(fd, op, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          switch (op) {
            case 21509: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21505: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tcgets) {
                var termios = stream.tty.ops.ioctl_tcgets(stream);
                var argp = syscallGetVarargP();
                HEAP32[argp >> 2] = termios.c_iflag || 0;
                HEAP32[argp + 4 >> 2] = termios.c_oflag || 0;
                HEAP32[argp + 8 >> 2] = termios.c_cflag || 0;
                HEAP32[argp + 12 >> 2] = termios.c_lflag || 0;
                for (var i3 = 0; i3 < 32; i3++) {
                  HEAP8[argp + i3 + 17] = termios.c_cc[i3] || 0;
                }
                return 0;
              }
              return 0;
            }
            case 21510:
            case 21511:
            case 21512: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21506:
            case 21507:
            case 21508: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tcsets) {
                var argp = syscallGetVarargP();
                var c_iflag = HEAP32[argp >> 2];
                var c_oflag = HEAP32[argp + 4 >> 2];
                var c_cflag = HEAP32[argp + 8 >> 2];
                var c_lflag = HEAP32[argp + 12 >> 2];
                var c_cc = [];
                for (var i3 = 0; i3 < 32; i3++) {
                  c_cc.push(HEAP8[argp + i3 + 17]);
                }
                return stream.tty.ops.ioctl_tcsets(stream.tty, op, {
                  c_iflag,
                  c_oflag,
                  c_cflag,
                  c_lflag,
                  c_cc
                });
              }
              return 0;
            }
            case 21519: {
              if (!stream.tty) return -59;
              var argp = syscallGetVarargP();
              HEAP32[argp >> 2] = 0;
              return 0;
            }
            case 21520: {
              if (!stream.tty) return -59;
              return -28;
            }
            case 21537:
            case 21531: {
              var argp = syscallGetVarargP();
              return FS.ioctl(stream, op, argp);
            }
            case 21523: {
              if (!stream.tty) return -59;
              if (stream.tty.ops.ioctl_tiocgwinsz) {
                var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
                var argp = syscallGetVarargP();
                HEAP16[argp >> 1] = winsize[0];
                HEAP16[argp + 2 >> 1] = winsize[1];
              }
              return 0;
            }
            case 21524: {
              if (!stream.tty) return -59;
              return 0;
            }
            case 21515: {
              if (!stream.tty) return -59;
              return 0;
            }
            default:
              return -28;
          }
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_lstat64(path, buf) {
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.writeStat(buf, FS.lstat(path));
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_mkdirat(dirfd, path, mode) {
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          mode &= ~SYSCALLS.currentUmask;
          FS.mkdir(path, mode, 0);
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_newfstatat(dirfd, path, buf, flags) {
        try {
          path = SYSCALLS.getStr(path);
          var nofollow = flags & 256;
          var allowEmpty = flags & 4096;
          flags = flags & ~6400;
          path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
          return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_openat(dirfd, path, flags, varargs) {
        SYSCALLS.varargs = varargs;
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          var mode = varargs ? syscallGetVarargI() : 0;
          if (flags & 64) {
            mode &= ~SYSCALLS.currentUmask;
          }
          return FS.open(path, flags, mode).fd;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          if (bufsize <= 0) return -28;
          var ret = FS.readlink(path);
          var len = Math.min(bufsize, lengthBytesUTF8(ret));
          var endChar = HEAP8[buf + len];
          stringToUTF8(ret, buf, bufsize + 1);
          HEAP8[buf + len] = endChar;
          return len;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_rmdir(path) {
        try {
          path = SYSCALLS.getStr(path);
          FS.rmdir(path);
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_stat64(path, buf) {
        try {
          path = SYSCALLS.getStr(path);
          return SYSCALLS.writeStat(buf, FS.stat(path));
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function ___syscall_unlinkat(dirfd, path, flags) {
        try {
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path);
          if (!flags) {
            FS.unlink(path);
          } else if (flags === 512) {
            FS.rmdir(path);
          } else {
            return -28;
          }
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var readI53FromI64 = (ptr) => HEAPU32[ptr >> 2] + HEAP32[ptr + 4 >> 2] * 4294967296;
      function ___syscall_utimensat(dirfd, path, times, flags) {
        try {
          var nofollow = flags & 256;
          path = SYSCALLS.getStr(path);
          path = SYSCALLS.calculateAt(dirfd, path, true);
          var now = Date.now(), atime, mtime;
          if (!times) {
            atime = now;
            mtime = now;
          } else {
            var seconds = readI53FromI64(times);
            var nanoseconds = HEAP32[times + 8 >> 2];
            if (nanoseconds == 1073741823) {
              atime = now;
            } else if (nanoseconds == 1073741822) {
              atime = null;
            } else {
              atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
            }
            times += 16;
            seconds = readI53FromI64(times);
            nanoseconds = HEAP32[times + 8 >> 2];
            if (nanoseconds == 1073741823) {
              mtime = now;
            } else if (nanoseconds == 1073741822) {
              mtime = null;
            } else {
              mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
            }
          }
          if ((mtime ?? atime) !== null) {
            FS.utime(path, atime, mtime, nofollow);
          }
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var __abort_js = () => abort("");
      var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
      };
      var AsciiToString = (ptr) => {
        var str = "";
        while (1) {
          var ch2 = HEAPU8[ptr++];
          if (!ch2) return str;
          str += String.fromCharCode(ch2);
        }
      };
      var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      class BindingError extends Error {
        constructor(message) {
          super(message);
          this.name = "BindingError";
        }
      }
      var throwBindingError = (message) => {
        throw new BindingError(message);
      };
      function sharedRegisterType(rawType, registeredInstance, options = {}) {
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return;
          } else {
            throwBindingError(`Cannot register type '${name}' twice`);
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach((cb) => cb());
        }
      }
      function registerType(rawType, registeredInstance, options = {}) {
        return sharedRegisterType(rawType, registeredInstance, options);
      }
      var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
        name = AsciiToString(name);
        registerType(rawType, {
          name,
          fromWireType: function(wt2) {
            return !!wt2;
          },
          toWireType: function(destructors, o2) {
            return o2 ? trueValue : falseValue;
          },
          readValueFromPointer: function(pointer) {
            return this.fromWireType(HEAPU8[pointer]);
          },
          destructorFunction: null
        });
      };
      var emval_freelist = [];
      var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
      var __emval_decref = (handle) => {
        if (handle > 9 && 0 === --emval_handles[handle + 1]) {
          var value = emval_handles[handle];
          emval_handles[handle] = void 0;
          emval_freelist.push(handle);
        }
      };
      var Emval = {
        toValue: (handle) => {
          if (!handle) {
            throwBindingError(`Cannot use deleted val. handle = ${handle}`);
          }
          return emval_handles[handle];
        },
        toHandle: (value) => {
          switch (value) {
            case void 0:
              return 2;
            case null:
              return 4;
            case true:
              return 6;
            case false:
              return 8;
            default: {
              const handle = emval_freelist.pop() || emval_handles.length;
              emval_handles[handle] = value;
              emval_handles[handle + 1] = 1;
              return handle;
            }
          }
        }
      };
      function readPointer(pointer) {
        return this.fromWireType(HEAPU32[pointer >> 2]);
      }
      var EmValType = {
        name: "emscripten::val",
        fromWireType: (handle) => {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        },
        toWireType: (destructors, value) => Emval.toHandle(value),
        readValueFromPointer: readPointer,
        destructorFunction: null
      };
      var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
      var HEAPF32;
      var HEAPF64;
      var floatReadValueFromPointer = (name, width) => {
        switch (width) {
          case 4:
            return function(pointer) {
              return this.fromWireType(HEAPF32[pointer >> 2]);
            };
          case 8:
            return function(pointer) {
              return this.fromWireType(HEAPF64[pointer >> 3]);
            };
          default:
            throw new TypeError(`invalid float width (${width}): ${name}`);
        }
      };
      var __embind_register_float = (rawType, name, size) => {
        name = AsciiToString(name);
        registerType(rawType, {
          name,
          fromWireType: (value) => value,
          toWireType: (destructors, value) => value,
          readValueFromPointer: floatReadValueFromPointer(name, size),
          destructorFunction: null
        });
      };
      var HEAPU16;
      var integerReadValueFromPointer = (name, width, signed) => {
        switch (width) {
          case 1:
            return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
          case 2:
            return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
          case 4:
            return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
          default:
            throw new TypeError(`invalid integer width (${width}): ${name}`);
        }
      };
      var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
        name = AsciiToString(name);
        const isUnsignedType = minRange === 0;
        let fromWireType = (value) => value;
        if (isUnsignedType) {
          var bitshift = 32 - 8 * size;
          fromWireType = (value) => value << bitshift >>> bitshift;
          maxRange = fromWireType(maxRange);
        }
        registerType(primitiveType, {
          name,
          fromWireType,
          toWireType: (destructors, value) => value,
          readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0),
          destructorFunction: null
        });
      };
      var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          var size = HEAPU32[handle >> 2];
          var data = HEAPU32[handle + 4 >> 2];
          return new TA(HEAP8.buffer, data, size);
        }
        name = AsciiToString(name);
        registerType(rawType, {
          name,
          fromWireType: decodeMemoryView,
          readValueFromPointer: decodeMemoryView
        }, {
          ignoreDuplicateRegistrations: true
        });
      };
      var __embind_register_std_string = (rawType, name) => {
        name = AsciiToString(name);
        var stdStringIsUTF8 = true;
        registerType(rawType, {
          name,
          // For some method names we use string keys here since they are part of
          // the public/external API and/or used by the runtime-generated code.
          fromWireType(value) {
            var length = HEAPU32[value >> 2];
            var payload = value + 4;
            var str;
            if (stdStringIsUTF8) {
              str = UTF8ToString(payload, length, true);
            } else {
              str = "";
              for (var i3 = 0; i3 < length; ++i3) {
                str += String.fromCharCode(HEAPU8[payload + i3]);
              }
            }
            _free(value);
            return str;
          },
          toWireType(destructors, value) {
            if (value instanceof ArrayBuffer) {
              value = new Uint8Array(value);
            }
            var length;
            var valueIsOfTypeString = typeof value == "string";
            if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
              throwBindingError("Cannot pass non-string to std::string");
            }
            if (stdStringIsUTF8 && valueIsOfTypeString) {
              length = lengthBytesUTF8(value);
            } else {
              length = value.length;
            }
            var base = _malloc(4 + length + 1);
            var ptr = base + 4;
            HEAPU32[base >> 2] = length;
            if (valueIsOfTypeString) {
              if (stdStringIsUTF8) {
                stringToUTF8(value, ptr, length + 1);
              } else {
                for (var i3 = 0; i3 < length; ++i3) {
                  var charCode = value.charCodeAt(i3);
                  if (charCode > 255) {
                    _free(base);
                    throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                  }
                  HEAPU8[ptr + i3] = charCode;
                }
              }
            } else {
              HEAPU8.set(value, ptr);
            }
            if (destructors !== null) {
              destructors.push(_free, base);
            }
            return base;
          },
          readValueFromPointer: readPointer,
          destructorFunction(ptr) {
            _free(ptr);
          }
        });
      };
      var UTF16Decoder = new TextDecoder("utf-16le");
      var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
        var idx = ptr >> 1;
        var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
        return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
      };
      var stringToUTF16 = (str, outPtr, maxBytesToWrite = 2147483647) => {
        if (maxBytesToWrite < 2) return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i3 = 0; i3 < numCharsToWrite; ++i3) {
          var codeUnit = str.charCodeAt(i3);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr;
      };
      var lengthBytesUTF16 = (str) => str.length * 2;
      var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
        var str = "";
        var startIdx = ptr >> 2;
        for (var i3 = 0; !(i3 >= maxBytesToRead / 4); i3++) {
          var utf32 = HEAPU32[startIdx + i3];
          if (!utf32 && !ignoreNul) break;
          str += String.fromCodePoint(utf32);
        }
        return str;
      };
      var stringToUTF32 = (str, outPtr, maxBytesToWrite = 2147483647) => {
        if (maxBytesToWrite < 4) return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i3 = 0; i3 < str.length; ++i3) {
          var codePoint = str.codePointAt(i3);
          if (codePoint > 65535) {
            i3++;
          }
          HEAP32[outPtr >> 2] = codePoint;
          outPtr += 4;
          if (outPtr + 4 > endPtr) break;
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr;
      };
      var lengthBytesUTF32 = (str) => {
        var len = 0;
        for (var i3 = 0; i3 < str.length; ++i3) {
          var codePoint = str.codePointAt(i3);
          if (codePoint > 65535) {
            i3++;
          }
          len += 4;
        }
        return len;
      };
      var __embind_register_std_wstring = (rawType, charSize, name) => {
        name = AsciiToString(name);
        var decodeString, encodeString, lengthBytesUTF;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
        } else {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
        }
        registerType(rawType, {
          name,
          fromWireType: (value) => {
            var length = HEAPU32[value >> 2];
            var str = decodeString(value + 4, length * charSize, true);
            _free(value);
            return str;
          },
          toWireType: (destructors, value) => {
            if (!(typeof value == "string")) {
              throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
            }
            var length = lengthBytesUTF(value);
            var ptr = _malloc(4 + length + charSize);
            HEAPU32[ptr >> 2] = length / charSize;
            encodeString(value, ptr + 4, length + charSize);
            if (destructors !== null) {
              destructors.push(_free, ptr);
            }
            return ptr;
          },
          readValueFromPointer: readPointer,
          destructorFunction(ptr) {
            _free(ptr);
          }
        });
      };
      var __embind_register_void = (rawType, name) => {
        name = AsciiToString(name);
        registerType(rawType, {
          isVoid: true,
          // void return values can be optimized out sometimes
          name,
          fromWireType: () => void 0,
          // TODO: assert if anything else is given?
          toWireType: (destructors, o2) => void 0
        });
      };
      var emval_methodCallers = [];
      var emval_addMethodCaller = (caller) => {
        var id = emval_methodCallers.length;
        emval_methodCallers.push(caller);
        return id;
      };
      var getTypeName = (type) => {
        var ptr = ___getTypeName(type);
        var rv = AsciiToString(ptr);
        _free(ptr);
        return rv;
      };
      var requireRegisteredType = (rawType, humanName) => {
        var impl = registeredTypes[rawType];
        if (void 0 === impl) {
          throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
        }
        return impl;
      };
      var emval_lookupTypes = (argCount, argTypes) => {
        var a2 = new Array(argCount);
        for (var i3 = 0; i3 < argCount; ++i3) {
          a2[i3] = requireRegisteredType(HEAPU32[argTypes + i3 * 4 >> 2], `parameter ${i3}`);
        }
        return a2;
      };
      var createNamedFunction = (name, func) => Object.defineProperty(func, "name", {
        value: name
      });
      var emval_returnValue = (toReturnWire, destructorsRef, handle) => {
        var destructors = [];
        var result = toReturnWire(destructors, handle);
        if (destructors.length) {
          HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
        }
        return result;
      };
      var emval_symbols = {};
      var getStringOrSymbol = (address) => {
        var symbol = emval_symbols[address];
        if (symbol === void 0) {
          return AsciiToString(address);
        }
        return symbol;
      };
      var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
        var GenericWireTypeSize = 8;
        var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
        var toReturnWire = retType.toWireType.bind(retType);
        var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
        argCount--;
        var argN = new Array(argCount);
        var invokerFunction = (handle, methodName, destructorsRef, args) => {
          var offset = 0;
          for (var i3 = 0; i3 < argCount; ++i3) {
            argN[i3] = argFromPtr[i3](args + offset);
            offset += GenericWireTypeSize;
          }
          var rv;
          switch (kind) {
            case 0:
              rv = Emval.toValue(handle).apply(null, argN);
              break;
            case 2:
              rv = Reflect.construct(Emval.toValue(handle), argN);
              break;
            case 3:
              rv = argN[0];
              break;
            case 1:
              rv = Emval.toValue(handle)[getStringOrSymbol(methodName)](...argN);
              break;
          }
          return emval_returnValue(toReturnWire, destructorsRef, rv);
        };
        var functionName = `methodCaller<(${argTypes.map((t2) => t2.name)}) => ${retType.name}>`;
        return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
      };
      var __emval_get_global = (name) => {
        if (!name) {
          return Emval.toHandle(globalThis);
        }
        name = getStringOrSymbol(name);
        return Emval.toHandle(globalThis[name]);
      };
      var __emval_get_property = (handle, key) => {
        handle = Emval.toValue(handle);
        key = Emval.toValue(key);
        return Emval.toHandle(handle[key]);
      };
      var __emval_incref = (handle) => {
        if (handle > 9) {
          emval_handles[handle + 1] += 1;
        }
      };
      var __emval_instanceof = (object, constructor) => {
        object = Emval.toValue(object);
        constructor = Emval.toValue(constructor);
        return object instanceof constructor;
      };
      var __emval_invoke = (caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args);
      var __emval_new_cstring = (v2) => Emval.toHandle(getStringOrSymbol(v2));
      var runDestructors = (destructors) => {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
        }
      };
      var __emval_run_destructors = (handle) => {
        var destructors = Emval.toValue(handle);
        runDestructors(destructors);
        __emval_decref(handle);
      };
      var __emval_set_property = (handle, key, value) => {
        handle = Emval.toValue(handle);
        key = Emval.toValue(key);
        value = Emval.toValue(value);
        handle[key] = value;
      };
      var __emval_typeof = (handle) => {
        handle = Emval.toValue(handle);
        return Emval.toHandle(typeof handle);
      };
      function __gmtime_js(time_low, time_high, tmPtr) {
        var time = convertI32PairToI53Checked(time_low, time_high);
        var date = new Date(time * 1e3);
        if (isNaN(date.getTime())) {
          return 1;
        }
        HEAP32[tmPtr >> 2] = date.getUTCSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getUTCMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getUTCHours();
        HEAP32[tmPtr + 12 >> 2] = date.getUTCDate();
        HEAP32[tmPtr + 16 >> 2] = date.getUTCMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getUTCFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getUTCDay();
        var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
        var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        return 0;
      }
      var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
      var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      var ydayFromDate = (date) => {
        var leap = isLeapYear(date.getFullYear());
        var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
        var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
        return yday;
      };
      function __localtime_js(time_low, time_high, tmPtr) {
        var time = convertI32PairToI53Checked(time_low, time_high);
        var date = new Date(time * 1e3);
        if (isNaN(date.getTime())) {
          return 1;
        }
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var yday = ydayFromDate(date) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
        var start = new Date(date.getFullYear(), 0, 1);
        var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
        HEAP32[tmPtr + 32 >> 2] = dst;
        return 0;
      }
      var setTempRet0 = (val) => __emscripten_tempret_set(val);
      var __mktime_js = function(tmPtr) {
        var ret = (() => {
          var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
          if (isNaN(date.getTime())) {
            return -1;
          }
          var dst = HEAP32[tmPtr + 32 >> 2];
          var guessedOffset = date.getTimezoneOffset();
          var start = new Date(date.getFullYear(), 0, 1);
          var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
          var winterOffset = start.getTimezoneOffset();
          var dstOffset = Math.min(winterOffset, summerOffset);
          if (dst < 0) {
            dst = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
          } else if (dst > 0 != (dstOffset == guessedOffset)) {
            var nonDstOffset = Math.max(winterOffset, summerOffset);
            var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
            date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
            if (isNaN(date.getTime())) {
              return -1;
            }
          }
          HEAP32[tmPtr + 32 >> 2] = dst;
          HEAP32[tmPtr + 24 >> 2] = date.getDay();
          var yday = ydayFromDate(date) | 0;
          HEAP32[tmPtr + 28 >> 2] = yday;
          HEAP32[tmPtr >> 2] = date.getSeconds();
          HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
          HEAP32[tmPtr + 8 >> 2] = date.getHours();
          HEAP32[tmPtr + 12 >> 2] = date.getDate();
          HEAP32[tmPtr + 16 >> 2] = date.getMonth();
          HEAP32[tmPtr + 20 >> 2] = date.getYear();
          return date.getTime() / 1e3;
        })();
        return setTempRet0((tempDouble = ret, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)), ret >>> 0;
      };
      function __mmap_js(len, prot, flags, fd, offset_low, offset_high, allocated, addr) {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var res = FS.mmap(stream, len, offset, prot, flags);
          var ptr = res.ptr;
          HEAP32[allocated >> 2] = res.allocated;
          HEAPU32[addr >> 2] = ptr;
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      function __munmap_js(addr, len, prot, flags, fd, offset_low, offset_high) {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          if (prot & 2) {
            SYSCALLS.doMsync(addr, stream, len, flags, offset);
          }
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return -e2.errno;
        }
      }
      var __tzset_js = (timezone, daylight, std_name, dst_name) => {
        var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        var winter = new Date(currentYear, 0, 1);
        var summer = new Date(currentYear, 6, 1);
        var winterOffset = winter.getTimezoneOffset();
        var summerOffset = summer.getTimezoneOffset();
        var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
        HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
        HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
        var extractZone = (timezoneOffset) => {
          var sign = timezoneOffset >= 0 ? "-" : "+";
          var absOffset = Math.abs(timezoneOffset);
          var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
          var minutes = String(absOffset % 60).padStart(2, "0");
          return `UTC${sign}${hours}${minutes}`;
        };
        var winterName = extractZone(winterOffset);
        var summerName = extractZone(summerOffset);
        if (summerOffset < winterOffset) {
          stringToUTF8(winterName, std_name, 17);
          stringToUTF8(summerName, dst_name, 17);
        } else {
          stringToUTF8(winterName, dst_name, 17);
          stringToUTF8(summerName, std_name, 17);
        }
      };
      var _emscripten_get_now = () => performance.now();
      var _emscripten_date_now = () => Date.now();
      var nowIsMonotonic = 1;
      var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
      function _clock_time_get(clk_id, ignored_precision_low, ignored_precision_high, ptime) {
        var ignored_precision = convertI32PairToI53Checked(ignored_precision_low, ignored_precision_high);
        if (!checkWasiClock(clk_id)) {
          return 28;
        }
        var now;
        if (clk_id === 0) {
          now = _emscripten_date_now();
        } else if (nowIsMonotonic) {
          now = _emscripten_get_now();
        } else {
          return 52;
        }
        var nsec = Math.round(now * 1e3 * 1e3);
        tempI64 = [nsec >>> 0, (tempDouble = nsec, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[ptime >> 2] = tempI64[0], HEAP32[ptime + 4 >> 2] = tempI64[1];
        return 0;
      }
      var readEmAsmArgsArray = [];
      var readEmAsmArgs = (sigPtr, buf) => {
        readEmAsmArgsArray.length = 0;
        var ch2;
        while (ch2 = HEAPU8[sigPtr++]) {
          var wide = ch2 != 105;
          wide &= ch2 != 112;
          buf += wide && buf % 8 ? 4 : 0;
          readEmAsmArgsArray.push(
            // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
            ch2 == 112 ? HEAPU32[buf >> 2] : ch2 == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]
          );
          buf += wide ? 8 : 4;
        }
        return readEmAsmArgsArray;
      };
      var runEmAsmFunction = (code, sigPtr, argbuf) => {
        var args = readEmAsmArgs(sigPtr, argbuf);
        return ASM_CONSTS[code](...args);
      };
      var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);
      var _emscripten_asm_const_ptr = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);
      var _emscripten_errn = (str, len) => err(UTF8ToString(str, len));
      var getHeapMax = () => (
        // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
        // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
        // for any code that deals with heap sizes, which would require special
        // casing all heap size related code to treat 0 specially.
        2147483648
      );
      var _emscripten_get_heap_max = () => getHeapMax();
      var _emscripten_has_asyncify = () => 0;
      var _emscripten_outn = (str, len) => out(UTF8ToString(str, len));
      var UNWIND_CACHE = {};
      var stringToNewUTF8 = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = _malloc(size);
        if (ret) stringToUTF8(str, ret, size);
        return ret;
      };
      var convertFrameToPC = (frame) => {
        var match;
        if (match = /\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(frame)) {
          return +match[1];
        } else if (match = /:(\d+):\d+(?:\)|$)/.exec(frame)) {
          return 2147483648 | +match[1];
        }
        return 0;
      };
      var saveInUnwindCache = (callstack) => {
        for (var line of callstack) {
          var pc2 = convertFrameToPC(line);
          if (pc2) {
            UNWIND_CACHE[pc2] = line;
          }
        }
      };
      var jsStackTrace = () => new Error().stack.toString();
      var _emscripten_stack_snapshot = () => {
        var callstack = jsStackTrace().split("\n");
        if (callstack[0] == "Error") {
          callstack.shift();
        }
        saveInUnwindCache(callstack);
        UNWIND_CACHE.last_addr = convertFrameToPC(callstack[3]);
        UNWIND_CACHE.last_stack = callstack;
        return UNWIND_CACHE.last_addr;
      };
      var _emscripten_pc_get_function = (pc2) => {
        var frame = UNWIND_CACHE[pc2];
        if (!frame) return 0;
        var name;
        var match;
        if (match = /^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(frame)) {
          name = match[1];
        } else if (match = /^\s+at (.*) \(.*\)$/.exec(frame)) {
          name = match[1];
        } else if (match = /^(.+?)@/.exec(frame)) {
          name = match[1];
        } else {
          return 0;
        }
        _free(_emscripten_pc_get_function.ret ?? 0);
        _emscripten_pc_get_function.ret = stringToNewUTF8(name);
        return _emscripten_pc_get_function.ret;
      };
      var growMemory = (size) => {
        var oldHeapSize = wasmMemory.buffer.byteLength;
        var pages = (size - oldHeapSize + 65535) / 65536 | 0;
        try {
          wasmMemory.grow(pages);
          updateMemoryViews();
          return 1;
        } catch (e2) {
        }
      };
      var _emscripten_resize_heap = (requestedSize) => {
        var oldSize = HEAPU8.length;
        requestedSize >>>= 0;
        var maxHeapSize = getHeapMax();
        if (requestedSize > maxHeapSize) {
          return false;
        }
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
          var replacement = growMemory(newSize);
          if (replacement) {
            return true;
          }
        }
        return false;
      };
      var _emscripten_stack_unwind_buffer = (addr, buffer, count) => {
        var stack;
        if (UNWIND_CACHE.last_addr == addr) {
          stack = UNWIND_CACHE.last_stack;
        } else {
          stack = jsStackTrace().split("\n");
          if (stack[0] == "Error") {
            stack.shift();
          }
          saveInUnwindCache(stack);
        }
        var offset = 3;
        while (stack[offset] && convertFrameToPC(stack[offset]) != addr) {
          ++offset;
        }
        for (var i3 = 0; i3 < count && stack[i3 + offset]; ++i3) {
          HEAPU32[buffer + i3 * 4 >> 2] = convertFrameToPC(stack[i3 + offset]);
        }
        return i3;
      };
      var GLctx;
      var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
        var ext = ctx.getExtension("ANGLE_instanced_arrays");
        if (ext) {
          ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
          ctx["drawArraysInstanced"] = (mode, first, count, primcount) => ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
          ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) => ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
          return 1;
        }
      };
      var webgl_enable_OES_vertex_array_object = (ctx) => {
        var ext = ctx.getExtension("OES_vertex_array_object");
        if (ext) {
          ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
          ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
          ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
          ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
          return 1;
        }
      };
      var webgl_enable_WEBGL_draw_buffers = (ctx) => {
        var ext = ctx.getExtension("WEBGL_draw_buffers");
        if (ext) {
          ctx["drawBuffers"] = (n2, bufs) => ext["drawBuffersWEBGL"](n2, bufs);
          return 1;
        }
      };
      var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) => (
        // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
        !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))
      );
      var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
      var webgl_enable_EXT_polygon_offset_clamp = (ctx) => !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
      var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
      var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
      var webgl_enable_WEBGL_multi_draw = (ctx) => (
        // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
        !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"))
      );
      var getEmscriptenSupportedExtensions = (ctx) => {
        var supportedExtensions = [
          // WebGL 1 extensions
          "ANGLE_instanced_arrays",
          "EXT_blend_minmax",
          "EXT_disjoint_timer_query",
          "EXT_frag_depth",
          "EXT_shader_texture_lod",
          "EXT_sRGB",
          "OES_element_index_uint",
          "OES_fbo_render_mipmap",
          "OES_standard_derivatives",
          "OES_texture_float",
          "OES_texture_half_float",
          "OES_texture_half_float_linear",
          "OES_vertex_array_object",
          "WEBGL_color_buffer_float",
          "WEBGL_depth_texture",
          "WEBGL_draw_buffers",
          // WebGL 2 extensions
          "EXT_color_buffer_float",
          "EXT_conservative_depth",
          "EXT_disjoint_timer_query_webgl2",
          "EXT_texture_norm16",
          "NV_shader_noperspective_interpolation",
          "WEBGL_clip_cull_distance",
          // WebGL 1 and WebGL 2 extensions
          "EXT_clip_control",
          "EXT_color_buffer_half_float",
          "EXT_depth_clamp",
          "EXT_float_blend",
          "EXT_polygon_offset_clamp",
          "EXT_texture_compression_bptc",
          "EXT_texture_compression_rgtc",
          "EXT_texture_filter_anisotropic",
          "KHR_parallel_shader_compile",
          "OES_texture_float_linear",
          "WEBGL_blend_func_extended",
          "WEBGL_compressed_texture_astc",
          "WEBGL_compressed_texture_etc",
          "WEBGL_compressed_texture_etc1",
          "WEBGL_compressed_texture_s3tc",
          "WEBGL_compressed_texture_s3tc_srgb",
          "WEBGL_debug_renderer_info",
          "WEBGL_debug_shaders",
          "WEBGL_lose_context",
          "WEBGL_multi_draw",
          "WEBGL_polygon_mode"
        ];
        return ctx.getSupportedExtensions()?.filter((ext) => supportedExtensions.includes(ext)) ?? [];
      };
      var registerPreMainLoop = (f2) => {
        typeof MainLoop != "undefined" && MainLoop.preMainLoop.push(f2);
      };
      var webglBufferSubData = (target, offset, size, data, src = HEAPU8) => {
        if (GL.currentContext.version >= 2) {
          size && GLctx.bufferSubData(target, offset, src, data, size);
          return;
        }
        GLctx.bufferSubData(target, offset, src.subarray(data, data + size));
      };
      var GL = {
        counter: 1,
        buffers: [],
        mappedBuffers: {},
        programs: [],
        framebuffers: [],
        renderbuffers: [],
        textures: [],
        shaders: [],
        vaos: [],
        contexts: [],
        offscreenCanvases: {},
        queries: [],
        samplers: [],
        transformFeedbacks: [],
        syncs: [],
        byteSizeByTypeRoot: 5120,
        byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
        stringCache: {},
        stringiCache: {},
        unpackAlignment: 4,
        unpackRowLength: 0,
        recordError: (errorCode) => {
          if (!GL.lastError) {
            GL.lastError = errorCode;
          }
        },
        getNewId: (table) => {
          var ret = GL.counter++;
          for (var i3 = table.length; i3 < ret; i3++) {
            table[i3] = null;
          }
          while (table[ret]) {
            ret = GL.counter++;
          }
          return ret;
        },
        genObject: (n2, buffers, createFunction, objectTable) => {
          for (var i3 = 0; i3 < n2; i3++) {
            var buffer = GLctx[createFunction]();
            var id = buffer && GL.getNewId(objectTable);
            if (buffer) {
              buffer.name = id;
              objectTable[id] = buffer;
            } else {
              GL.recordError(1282);
            }
            HEAP32[buffers + i3 * 4 >> 2] = id;
          }
        },
        MAX_TEMP_BUFFER_SIZE: 2097152,
        numTempVertexBuffersPerSize: 64,
        log2ceilLookup: (i3) => 32 - Math.clz32(i3 ? i3 - 1 : 0),
        generateTempBuffers: (quads, context) => {
          var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
          context.tempVertexBufferCounters1 = [];
          context.tempVertexBufferCounters2 = [];
          context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
          context.tempVertexBuffers1 = [];
          context.tempVertexBuffers2 = [];
          context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
          context.tempIndexBuffers = [];
          context.tempIndexBuffers.length = largestIndex + 1;
          for (var i3 = 0; i3 <= largestIndex; ++i3) {
            context.tempIndexBuffers[i3] = null;
            context.tempVertexBufferCounters1[i3] = context.tempVertexBufferCounters2[i3] = 0;
            var ringbufferLength = GL.numTempVertexBuffersPerSize;
            context.tempVertexBuffers1[i3] = [];
            context.tempVertexBuffers2[i3] = [];
            var ringbuffer1 = context.tempVertexBuffers1[i3];
            var ringbuffer2 = context.tempVertexBuffers2[i3];
            ringbuffer1.length = ringbuffer2.length = ringbufferLength;
            for (var j2 = 0; j2 < ringbufferLength; ++j2) {
              ringbuffer1[j2] = ringbuffer2[j2] = null;
            }
          }
          if (quads) {
            context.tempQuadIndexBuffer = GLctx.createBuffer();
            context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
            var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
            var quadIndexes = new Uint16Array(numIndexes);
            var i3 = 0, v2 = 0;
            while (1) {
              quadIndexes[i3++] = v2;
              if (i3 >= numIndexes) break;
              quadIndexes[i3++] = v2 + 1;
              if (i3 >= numIndexes) break;
              quadIndexes[i3++] = v2 + 2;
              if (i3 >= numIndexes) break;
              quadIndexes[i3++] = v2;
              if (i3 >= numIndexes) break;
              quadIndexes[i3++] = v2 + 2;
              if (i3 >= numIndexes) break;
              quadIndexes[i3++] = v2 + 3;
              if (i3 >= numIndexes) break;
              v2 += 4;
            }
            context.GLctx.bufferData(34963, quadIndexes, 35044);
            context.GLctx.bindBuffer(34963, null);
          }
        },
        getTempVertexBuffer: (sizeBytes) => {
          var idx = GL.log2ceilLookup(sizeBytes);
          var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
          var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
          GL.currentContext.tempVertexBufferCounters1[idx] = GL.currentContext.tempVertexBufferCounters1[idx] + 1 & GL.numTempVertexBuffersPerSize - 1;
          var vbo = ringbuffer[nextFreeBufferIndex];
          if (vbo) {
            return vbo;
          }
          var prevVBO = GLctx.getParameter(34964);
          ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
          GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
          GLctx.bufferData(34962, 1 << idx, 35048);
          GLctx.bindBuffer(34962, prevVBO);
          return ringbuffer[nextFreeBufferIndex];
        },
        getTempIndexBuffer: (sizeBytes) => {
          var idx = GL.log2ceilLookup(sizeBytes);
          var ibo = GL.currentContext.tempIndexBuffers[idx];
          if (ibo) {
            return ibo;
          }
          var prevIBO = GLctx.getParameter(34965);
          GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
          GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
          GLctx.bufferData(34963, 1 << idx, 35048);
          GLctx.bindBuffer(34963, prevIBO);
          return GL.currentContext.tempIndexBuffers[idx];
        },
        newRenderingFrameStarted: () => {
          if (!GL.currentContext) {
            return;
          }
          var vb = GL.currentContext.tempVertexBuffers1;
          GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
          GL.currentContext.tempVertexBuffers2 = vb;
          vb = GL.currentContext.tempVertexBufferCounters1;
          GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
          GL.currentContext.tempVertexBufferCounters2 = vb;
          var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
          for (var i3 = 0; i3 <= largestIndex; ++i3) {
            GL.currentContext.tempVertexBufferCounters1[i3] = 0;
          }
        },
        getSource: (shader, count, string, length) => {
          var source = "";
          for (var i3 = 0; i3 < count; ++i3) {
            var len = length ? HEAPU32[length + i3 * 4 >> 2] : void 0;
            source += UTF8ToString(HEAPU32[string + i3 * 4 >> 2], len);
          }
          return source;
        },
        calcBufLength: (size, type, stride, count) => {
          if (stride > 0) {
            return count * stride;
          }
          var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
          return size * typeSize * count;
        },
        usedTempBuffers: [],
        preDrawHandleClientVertexAttribBindings: (count) => {
          GL.resetBufferBinding = false;
          for (var i3 = 0; i3 < GL.currentContext.maxVertexAttribs; ++i3) {
            var cb = GL.currentContext.clientBuffers[i3];
            if (!cb.clientside || !cb.enabled) continue;
            GL.resetBufferBinding = true;
            var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
            var buf = GL.getTempVertexBuffer(size);
            GLctx.bindBuffer(34962, buf);
            webglBufferSubData(34962, 0, size, cb.ptr);
            cb.vertexAttribPointerAdaptor.call(GLctx, i3, cb.size, cb.type, cb.normalized, cb.stride, 0);
          }
        },
        postDrawHandleClientVertexAttribBindings: () => {
          if (GL.resetBufferBinding) {
            GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding]);
          }
        },
        createContext: (canvas2, webGLContextAttributes) => {
          if (!canvas2.getContextSafariWebGL2Fixed) {
            let fixedGetContext = function(ver, attrs) {
              var gl = canvas2.getContextSafariWebGL2Fixed(ver, attrs);
              return ver == "webgl" == gl instanceof WebGLRenderingContext ? gl : null;
            };
            canvas2.getContextSafariWebGL2Fixed = canvas2.getContext;
            canvas2.getContext = fixedGetContext;
          }
          var ctx = webGLContextAttributes.majorVersion > 1 ? canvas2.getContext("webgl2", webGLContextAttributes) : canvas2.getContext("webgl", webGLContextAttributes);
          if (!ctx) return 0;
          var handle = GL.registerContext(ctx, webGLContextAttributes);
          return handle;
        },
        registerContext: (ctx, webGLContextAttributes) => {
          var handle = GL.getNewId(GL.contexts);
          var context = {
            handle,
            attributes: webGLContextAttributes,
            version: webGLContextAttributes.majorVersion,
            GLctx: ctx
          };
          if (ctx.canvas) ctx.canvas.GLctxObject = context;
          GL.contexts[handle] = context;
          if (typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
            GL.initExtensions(context);
          }
          context.maxVertexAttribs = context.GLctx.getParameter(34921);
          context.clientBuffers = [];
          for (var i3 = 0; i3 < context.maxVertexAttribs; i3++) {
            context.clientBuffers[i3] = {
              enabled: false,
              clientside: false,
              size: 0,
              type: 0,
              normalized: 0,
              stride: 0,
              ptr: 0,
              vertexAttribPointerAdaptor: null
            };
          }
          GL.generateTempBuffers(false, context);
          return handle;
        },
        makeContextCurrent: (contextHandle) => {
          GL.currentContext = GL.contexts[contextHandle];
          Module["ctx"] = GLctx = GL.currentContext?.GLctx;
          return !(contextHandle && !GLctx);
        },
        getContext: (contextHandle) => GL.contexts[contextHandle],
        deleteContext: (contextHandle) => {
          if (GL.currentContext === GL.contexts[contextHandle]) {
            GL.currentContext = null;
          }
          if (typeof JSEvents == "object") {
            JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
          }
          if (GL.contexts[contextHandle]?.GLctx.canvas) {
            GL.contexts[contextHandle].GLctx.canvas.GLctxObject = void 0;
          }
          GL.contexts[contextHandle] = null;
        },
        initExtensions: (context) => {
          context ||= GL.currentContext;
          if (context.initExtensionsDone) return;
          context.initExtensionsDone = true;
          var GLctx2 = context.GLctx;
          webgl_enable_WEBGL_multi_draw(GLctx2);
          webgl_enable_EXT_polygon_offset_clamp(GLctx2);
          webgl_enable_EXT_clip_control(GLctx2);
          webgl_enable_WEBGL_polygon_mode(GLctx2);
          webgl_enable_ANGLE_instanced_arrays(GLctx2);
          webgl_enable_OES_vertex_array_object(GLctx2);
          webgl_enable_WEBGL_draw_buffers(GLctx2);
          webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx2);
          webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx2);
          if (context.version >= 2) {
            GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query_webgl2");
          }
          if (context.version < 2 || !GLctx2.disjointTimerQueryExt) {
            GLctx2.disjointTimerQueryExt = GLctx2.getExtension("EXT_disjoint_timer_query");
          }
          for (var ext of getEmscriptenSupportedExtensions(GLctx2)) {
            if (!ext.includes("lose_context") && !ext.includes("debug")) {
              GLctx2.getExtension(ext);
            }
          }
        }
      };
      var webglPowerPreferences = ["default", "low-power", "high-performance"];
      var specialHTMLTargets = [0, globalThis.document ?? 0, globalThis.window ?? 0];
      var findEventTarget = (target) => {
        if (!target) return window;
        if (typeof target == "number") target = specialHTMLTargets[target] || UTF8ToString(target);
        if (target === "#window") return window;
        else if (target === "#document") return document;
        else if (target === "#screen") return screen;
        else if (target === "#canvas") return Module["canvas"];
        else if (typeof target == "string") return globalThis.document?.getElementById(target);
        return target;
      };
      var findCanvasEventTarget = (target) => {
        if (typeof target == "number") target = UTF8ToString(target);
        if (!target || target === "#canvas") {
          if (typeof GL != "undefined" && GL.offscreenCanvases["canvas"]) return GL.offscreenCanvases["canvas"];
          return Module["canvas"];
        }
        if (typeof GL != "undefined" && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
        return findEventTarget(target);
      };
      var _emscripten_webgl_do_create_context = (target, attributes) => {
        var attr32 = attributes >> 2;
        var powerPreference = HEAP32[attr32 + (8 >> 2)];
        var contextAttributes = {
          "alpha": !!HEAP8[attributes + 0],
          "depth": !!HEAP8[attributes + 1],
          "stencil": !!HEAP8[attributes + 2],
          "antialias": !!HEAP8[attributes + 3],
          "premultipliedAlpha": !!HEAP8[attributes + 4],
          "preserveDrawingBuffer": !!HEAP8[attributes + 5],
          "powerPreference": webglPowerPreferences[powerPreference],
          "failIfMajorPerformanceCaveat": !!HEAP8[attributes + 12],
          "desynchronized": !!HEAP8[attributes + 33],
          // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
          majorVersion: HEAP32[attr32 + (16 >> 2)],
          minorVersion: HEAP32[attr32 + (20 >> 2)],
          enableExtensionsByDefault: HEAP8[attributes + 24],
          explicitSwapControl: HEAP8[attributes + 25],
          proxyContextToMainThread: HEAP32[attr32 + (28 >> 2)],
          renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
        };
        var canvas2 = findCanvasEventTarget(target);
        if (!canvas2) {
          return 0;
        }
        if (contextAttributes.explicitSwapControl) {
          return 0;
        }
        var contextHandle = GL.createContext(canvas2, contextAttributes);
        return contextHandle;
      };
      var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;
      var _emscripten_webgl_destroy_context = (contextHandle) => {
        if (GL.currentContext == contextHandle) GL.currentContext = 0;
        GL.deleteContext(contextHandle);
      };
      var _emscripten_webgl_get_context_attributes = (c2, a2) => {
        if (!a2) return -5;
        c2 = GL.contexts[c2];
        if (!c2) return -3;
        var t2 = c2.GLctx?.getContextAttributes();
        if (!t2) return -3;
        HEAP8[a2] = t2.alpha;
        HEAP8[a2 + 1] = t2.depth;
        HEAP8[a2 + 2] = t2.stencil;
        HEAP8[a2 + 3] = t2.antialias;
        HEAP8[a2 + 4] = t2.premultipliedAlpha;
        HEAP8[a2 + 5] = t2.preserveDrawingBuffer;
        var power = t2["powerPreference"] && webglPowerPreferences.indexOf(t2["powerPreference"]);
        HEAP32[a2 + 8 >> 2] = power;
        HEAP8[a2 + 12] = t2.failIfMajorPerformanceCaveat;
        HEAP8[a2 + 33] = t2.desynchronized;
        HEAP32[a2 + 16 >> 2] = c2.version;
        HEAP32[a2 + 20 >> 2] = 0;
        HEAP8[a2 + 24] = c2.attributes.enableExtensionsByDefault;
        return 0;
      };
      var _emscripten_webgl_do_get_current_context = () => GL.currentContext ? GL.currentContext.handle : 0;
      var _emscripten_webgl_get_current_context = _emscripten_webgl_do_get_current_context;
      var _emscripten_webgl_make_context_current = (contextHandle) => {
        var success = GL.makeContextCurrent(contextHandle);
        return success ? 0 : -5;
      };
      var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
      var stringToUTF8OnStack = (str) => {
        var size = lengthBytesUTF8(str) + 1;
        var ret = stackAlloc(size);
        stringToUTF8(str, ret, size);
        return ret;
      };
      var writeI53ToI64 = (ptr, num) => {
        HEAPU32[ptr >> 2] = num;
        var lower = HEAPU32[ptr >> 2];
        HEAPU32[ptr + 4 >> 2] = (num - lower) / 4294967296;
      };
      var wasmTableMirror = [];
      var getWasmTableEntry = (funcPtr) => {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      };
      var WebGPU = {
        Internals: {
          jsObjects: [],
          jsObjectInsert: (ptr, jsObject) => {
            ptr >>>= 0;
            WebGPU.Internals.jsObjects[ptr] = jsObject;
          },
          bufferOnUnmaps: [],
          futures: [],
          futureInsert: (futureId, promise) => {
          }
        },
        getJsObject: (ptr) => {
          if (!ptr) return void 0;
          ptr >>>= 0;
          return WebGPU.Internals.jsObjects[ptr];
        },
        importJsAdapter: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateAdapter(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsBindGroup: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateBindGroup(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsBindGroupLayout: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateBindGroupLayout(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsBuffer: (buffer, parentPtr = 0) => {
          assert(buffer.mapState === "unmapped");
          var bufferPtr = _emwgpuImportBuffer(parentPtr);
          WebGPU.Internals.jsObjectInsert(bufferPtr, buffer);
          return bufferPtr;
        },
        importJsCommandBuffer: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateCommandBuffer(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsCommandEncoder: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateCommandEncoder(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsComputePassEncoder: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateComputePassEncoder(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsComputePipeline: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateComputePipeline(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsDevice: (device, parentPtr = 0) => {
          var queuePtr = _emwgpuCreateQueue(parentPtr);
          var devicePtr = _emwgpuCreateDevice(parentPtr, queuePtr);
          WebGPU.Internals.jsObjectInsert(queuePtr, device.queue);
          WebGPU.Internals.jsObjectInsert(devicePtr, device);
          return devicePtr;
        },
        importJsExternalTexture: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateExternalTexture(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsPipelineLayout: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreatePipelineLayout(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsQuerySet: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateQuerySet(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsQueue: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateQueue(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsRenderBundle: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateRenderBundle(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsRenderBundleEncoder: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateRenderBundleEncoder(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsRenderPassEncoder: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateRenderPassEncoder(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsRenderPipeline: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateRenderPipeline(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsSampler: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateSampler(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsShaderModule: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateShaderModule(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsSurface: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateSurface(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsTexture: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateTexture(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        importJsTextureView: (obj, parentPtr = 0) => {
          var ptr = _emwgpuCreateTextureView(parentPtr);
          WebGPU.Internals.jsObjects[ptr] = obj;
          return ptr;
        },
        errorCallback: (callback, type, message, userdata) => {
          var sp = stackSave();
          var messagePtr = stringToUTF8OnStack(message);
          getWasmTableEntry(callback)(type, messagePtr, userdata);
          stackRestore(sp);
        },
        iterateExtensions: (root, handlers) => {
          for (var ptr = HEAPU32[root >> 2]; ptr; ptr = HEAPU32[ptr >> 2]) {
            var sType = HEAP32[ptr + 4 >> 2];
            var handler = handlers[sType](ptr);
          }
        },
        setStringView: (ptr, data, length) => {
          HEAPU32[ptr >> 2] = data;
          HEAPU32[ptr + 4 >> 2] = length;
        },
        makeStringFromStringView: (stringViewPtr) => {
          var ptr = HEAPU32[stringViewPtr >> 2];
          var length = HEAPU32[stringViewPtr + 4 >> 2];
          return UTF8ToString(ptr, length);
        },
        makeStringFromOptionalStringView: (stringViewPtr) => {
          var ptr = HEAPU32[stringViewPtr >> 2];
          var length = HEAPU32[stringViewPtr + 4 >> 2];
          if (!ptr) {
            if (length === 0) {
              return "";
            }
            return void 0;
          }
          return UTF8ToString(ptr, length);
        },
        makeColor: (ptr) => ({
          "r": HEAPF64[ptr >> 3],
          "g": HEAPF64[ptr + 8 >> 3],
          "b": HEAPF64[ptr + 16 >> 3],
          "a": HEAPF64[ptr + 24 >> 3]
        }),
        makeExtent3D: (ptr) => ({
          "width": HEAPU32[ptr >> 2],
          "height": HEAPU32[ptr + 4 >> 2],
          "depthOrArrayLayers": HEAPU32[ptr + 8 >> 2]
        }),
        makeOrigin3D: (ptr) => ({
          "x": HEAPU32[ptr >> 2],
          "y": HEAPU32[ptr + 4 >> 2],
          "z": HEAPU32[ptr + 8 >> 2]
        }),
        makeTexelCopyTextureInfo: (ptr) => ({
          "texture": WebGPU.getJsObject(HEAPU32[ptr >> 2]),
          "mipLevel": HEAPU32[ptr + 4 >> 2],
          "origin": WebGPU.makeOrigin3D(ptr + 8),
          "aspect": WebGPU.TextureAspect[HEAP32[ptr + 20 >> 2]]
        }),
        makeTexelCopyBufferLayout: (ptr) => {
          var bytesPerRow = HEAPU32[ptr + 8 >> 2];
          var rowsPerImage = HEAPU32[ptr + 12 >> 2];
          return {
            "offset": readI53FromI64(ptr),
            "bytesPerRow": bytesPerRow === 4294967295 ? void 0 : bytesPerRow,
            "rowsPerImage": rowsPerImage === 4294967295 ? void 0 : rowsPerImage
          };
        },
        makeTexelCopyBufferInfo: (ptr) => {
          var layoutPtr = ptr + 0;
          var bufferCopyView = WebGPU.makeTexelCopyBufferLayout(layoutPtr);
          bufferCopyView["buffer"] = WebGPU.getJsObject(HEAPU32[ptr + 16 >> 2]);
          return bufferCopyView;
        },
        makePassTimestampWrites: (ptr) => {
          if (ptr === 0) return void 0;
          return {
            "querySet": WebGPU.getJsObject(HEAPU32[ptr + 4 >> 2]),
            "beginningOfPassWriteIndex": HEAPU32[ptr + 8 >> 2],
            "endOfPassWriteIndex": HEAPU32[ptr + 12 >> 2]
          };
        },
        makePipelineConstants: (constantCount, constantsPtr) => {
          if (!constantCount) return;
          var constants = {};
          for (var i3 = 0; i3 < constantCount; ++i3) {
            var entryPtr = constantsPtr + 24 * i3;
            var key = WebGPU.makeStringFromStringView(entryPtr + 4);
            constants[key] = HEAPF64[entryPtr + 16 >> 3];
          }
          return constants;
        },
        makePipelineLayout: (layoutPtr) => {
          if (!layoutPtr) return "auto";
          return WebGPU.getJsObject(layoutPtr);
        },
        makeComputeState: (ptr) => {
          if (!ptr) return void 0;
          var desc = {
            "module": WebGPU.getJsObject(HEAPU32[ptr + 4 >> 2]),
            "constants": WebGPU.makePipelineConstants(HEAPU32[ptr + 16 >> 2], HEAPU32[ptr + 20 >> 2]),
            "entryPoint": WebGPU.makeStringFromOptionalStringView(ptr + 8)
          };
          return desc;
        },
        makeComputePipelineDesc: (descriptor) => {
          var desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
            "layout": WebGPU.makePipelineLayout(HEAPU32[descriptor + 12 >> 2]),
            "compute": WebGPU.makeComputeState(descriptor + 16)
          };
          return desc;
        },
        makeRenderPipelineDesc: (descriptor) => {
          function makePrimitiveState(psPtr) {
            if (!psPtr) return void 0;
            return {
              "topology": WebGPU.PrimitiveTopology[HEAP32[psPtr + 4 >> 2]],
              "stripIndexFormat": WebGPU.IndexFormat[HEAP32[psPtr + 8 >> 2]],
              "frontFace": WebGPU.FrontFace[HEAP32[psPtr + 12 >> 2]],
              "cullMode": WebGPU.CullMode[HEAP32[psPtr + 16 >> 2]],
              "unclippedDepth": !!HEAPU32[psPtr + 20 >> 2]
            };
          }
          function makeBlendComponent(bdPtr) {
            if (!bdPtr) return void 0;
            return {
              "operation": WebGPU.BlendOperation[HEAP32[bdPtr >> 2]],
              "srcFactor": WebGPU.BlendFactor[HEAP32[bdPtr + 4 >> 2]],
              "dstFactor": WebGPU.BlendFactor[HEAP32[bdPtr + 8 >> 2]]
            };
          }
          function makeBlendState(bsPtr) {
            if (!bsPtr) return void 0;
            return {
              "alpha": makeBlendComponent(bsPtr + 12),
              "color": makeBlendComponent(bsPtr + 0)
            };
          }
          function makeColorState(csPtr) {
            var format = WebGPU.TextureFormat[HEAP32[csPtr + 4 >> 2]];
            return format ? {
              "format": format,
              "blend": makeBlendState(HEAPU32[csPtr + 8 >> 2]),
              "writeMask": HEAPU32[csPtr + 16 >> 2]
            } : void 0;
          }
          function makeColorStates(count, csArrayPtr) {
            var states = [];
            for (var i3 = 0; i3 < count; ++i3) {
              states.push(makeColorState(csArrayPtr + 24 * i3));
            }
            return states;
          }
          function makeStencilStateFace(ssfPtr) {
            return {
              "compare": WebGPU.CompareFunction[HEAP32[ssfPtr >> 2]],
              "failOp": WebGPU.StencilOperation[HEAP32[ssfPtr + 4 >> 2]],
              "depthFailOp": WebGPU.StencilOperation[HEAP32[ssfPtr + 8 >> 2]],
              "passOp": WebGPU.StencilOperation[HEAP32[ssfPtr + 12 >> 2]]
            };
          }
          function makeDepthStencilState(dssPtr) {
            if (!dssPtr) return void 0;
            return {
              "format": WebGPU.TextureFormat[HEAP32[dssPtr + 4 >> 2]],
              "depthWriteEnabled": !!HEAPU32[dssPtr + 8 >> 2],
              "depthCompare": WebGPU.CompareFunction[HEAP32[dssPtr + 12 >> 2]],
              "stencilFront": makeStencilStateFace(dssPtr + 16),
              "stencilBack": makeStencilStateFace(dssPtr + 32),
              "stencilReadMask": HEAPU32[dssPtr + 48 >> 2],
              "stencilWriteMask": HEAPU32[dssPtr + 52 >> 2],
              "depthBias": HEAP32[dssPtr + 56 >> 2],
              "depthBiasSlopeScale": HEAPF32[dssPtr + 60 >> 2],
              "depthBiasClamp": HEAPF32[dssPtr + 64 >> 2]
            };
          }
          function makeVertexAttribute(vaPtr) {
            return {
              "format": WebGPU.VertexFormat[HEAP32[vaPtr + 4 >> 2]],
              "offset": readI53FromI64(vaPtr + 8),
              "shaderLocation": HEAPU32[vaPtr + 16 >> 2]
            };
          }
          function makeVertexAttributes(count, vaArrayPtr) {
            var vas = [];
            for (var i3 = 0; i3 < count; ++i3) {
              vas.push(makeVertexAttribute(vaArrayPtr + i3 * 24));
            }
            return vas;
          }
          function makeVertexBuffer(vbPtr) {
            if (!vbPtr) return void 0;
            var stepMode = WebGPU.VertexStepMode[HEAP32[vbPtr + 4 >> 2]];
            var attributeCount = HEAPU32[vbPtr + 16 >> 2];
            if (!stepMode && !attributeCount) {
              return null;
            }
            return {
              "arrayStride": readI53FromI64(vbPtr + 8),
              "stepMode": stepMode,
              "attributes": makeVertexAttributes(attributeCount, HEAPU32[vbPtr + 20 >> 2])
            };
          }
          function makeVertexBuffers(count, vbArrayPtr) {
            if (!count) return void 0;
            var vbs = [];
            for (var i3 = 0; i3 < count; ++i3) {
              vbs.push(makeVertexBuffer(vbArrayPtr + i3 * 24));
            }
            return vbs;
          }
          function makeVertexState(viPtr) {
            if (!viPtr) return void 0;
            var desc2 = {
              "module": WebGPU.getJsObject(HEAPU32[viPtr + 4 >> 2]),
              "constants": WebGPU.makePipelineConstants(HEAPU32[viPtr + 16 >> 2], HEAPU32[viPtr + 20 >> 2]),
              "buffers": makeVertexBuffers(HEAPU32[viPtr + 24 >> 2], HEAPU32[viPtr + 28 >> 2]),
              "entryPoint": WebGPU.makeStringFromOptionalStringView(viPtr + 8)
            };
            return desc2;
          }
          function makeMultisampleState(msPtr) {
            if (!msPtr) return void 0;
            return {
              "count": HEAPU32[msPtr + 4 >> 2],
              "mask": HEAPU32[msPtr + 8 >> 2],
              "alphaToCoverageEnabled": !!HEAPU32[msPtr + 12 >> 2]
            };
          }
          function makeFragmentState(fsPtr) {
            if (!fsPtr) return void 0;
            var desc2 = {
              "module": WebGPU.getJsObject(HEAPU32[fsPtr + 4 >> 2]),
              "constants": WebGPU.makePipelineConstants(HEAPU32[fsPtr + 16 >> 2], HEAPU32[fsPtr + 20 >> 2]),
              "targets": makeColorStates(HEAPU32[fsPtr + 24 >> 2], HEAPU32[fsPtr + 28 >> 2]),
              "entryPoint": WebGPU.makeStringFromOptionalStringView(fsPtr + 8)
            };
            return desc2;
          }
          var desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
            "layout": WebGPU.makePipelineLayout(HEAPU32[descriptor + 12 >> 2]),
            "vertex": makeVertexState(descriptor + 16),
            "primitive": makePrimitiveState(descriptor + 48),
            "depthStencil": makeDepthStencilState(HEAPU32[descriptor + 72 >> 2]),
            "multisample": makeMultisampleState(descriptor + 76),
            "fragment": makeFragmentState(HEAPU32[descriptor + 92 >> 2])
          };
          return desc;
        },
        fillLimitStruct: (limits, limitsOutPtr) => {
          var nextInChainPtr = HEAPU32[limitsOutPtr >> 2];
          function setLimitValueU32(name, basePtr, limitOffset, fallbackValue = 0) {
            var limitValue = limits[name] ?? fallbackValue;
            HEAPU32[basePtr + limitOffset >> 2] = limitValue;
          }
          function setLimitValueU64(name, basePtr, limitOffset, fallbackValue = 0) {
            var limitValue = limits[name] ?? fallbackValue;
            writeI53ToI64(basePtr + limitOffset, limitValue);
          }
          setLimitValueU32("maxTextureDimension1D", limitsOutPtr, 4);
          setLimitValueU32("maxTextureDimension2D", limitsOutPtr, 8);
          setLimitValueU32("maxTextureDimension3D", limitsOutPtr, 12);
          setLimitValueU32("maxTextureArrayLayers", limitsOutPtr, 16);
          setLimitValueU32("maxBindGroups", limitsOutPtr, 20);
          setLimitValueU32("maxBindGroupsPlusVertexBuffers", limitsOutPtr, 24);
          setLimitValueU32("maxBindingsPerBindGroup", limitsOutPtr, 28);
          setLimitValueU32("maxDynamicUniformBuffersPerPipelineLayout", limitsOutPtr, 32);
          setLimitValueU32("maxDynamicStorageBuffersPerPipelineLayout", limitsOutPtr, 36);
          setLimitValueU32("maxSampledTexturesPerShaderStage", limitsOutPtr, 40);
          setLimitValueU32("maxSamplersPerShaderStage", limitsOutPtr, 44);
          setLimitValueU32("maxStorageBuffersPerShaderStage", limitsOutPtr, 48);
          setLimitValueU32("maxStorageTexturesPerShaderStage", limitsOutPtr, 52);
          setLimitValueU32("maxUniformBuffersPerShaderStage", limitsOutPtr, 56);
          setLimitValueU32("minUniformBufferOffsetAlignment", limitsOutPtr, 80);
          setLimitValueU32("minStorageBufferOffsetAlignment", limitsOutPtr, 84);
          setLimitValueU64("maxUniformBufferBindingSize", limitsOutPtr, 64);
          setLimitValueU64("maxStorageBufferBindingSize", limitsOutPtr, 72);
          setLimitValueU32("maxVertexBuffers", limitsOutPtr, 88);
          setLimitValueU64("maxBufferSize", limitsOutPtr, 96);
          setLimitValueU32("maxVertexAttributes", limitsOutPtr, 104);
          setLimitValueU32("maxVertexBufferArrayStride", limitsOutPtr, 108);
          setLimitValueU32("maxInterStageShaderVariables", limitsOutPtr, 112);
          setLimitValueU32("maxColorAttachments", limitsOutPtr, 116);
          setLimitValueU32("maxColorAttachmentBytesPerSample", limitsOutPtr, 120);
          setLimitValueU32("maxComputeWorkgroupStorageSize", limitsOutPtr, 124);
          setLimitValueU32("maxComputeInvocationsPerWorkgroup", limitsOutPtr, 128);
          setLimitValueU32("maxComputeWorkgroupSizeX", limitsOutPtr, 132);
          setLimitValueU32("maxComputeWorkgroupSizeY", limitsOutPtr, 136);
          setLimitValueU32("maxComputeWorkgroupSizeZ", limitsOutPtr, 140);
          setLimitValueU32("maxComputeWorkgroupsPerDimension", limitsOutPtr, 144);
          setLimitValueU32("maxImmediateSize", limitsOutPtr, 148);
          if (nextInChainPtr !== 0) {
            var sType = HEAP32[nextInChainPtr + 4 >> 2];
            var compatibilityModeLimitsPtr = nextInChainPtr;
            setLimitValueU32("maxStorageBuffersInVertexStage", compatibilityModeLimitsPtr, 8, limits.maxStorageBuffersPerShaderStage);
            setLimitValueU32("maxStorageBuffersInFragmentStage", compatibilityModeLimitsPtr, 16, limits.maxStorageBuffersPerShaderStage);
            setLimitValueU32("maxStorageTexturesInVertexStage", compatibilityModeLimitsPtr, 12, limits.maxStorageTexturesPerShaderStage);
            setLimitValueU32("maxStorageTexturesInFragmentStage", compatibilityModeLimitsPtr, 20, limits.maxStorageTexturesPerShaderStage);
          }
        },
        fillAdapterInfoStruct: (info, infoStruct) => {
          HEAPU32[infoStruct + 52 >> 2] = info.subgroupMinSize;
          HEAPU32[infoStruct + 56 >> 2] = info.subgroupMaxSize;
          var strs = info.vendor + info.architecture + info.device + info.description;
          var strPtr = stringToNewUTF8(strs);
          var vendorLen = lengthBytesUTF8(info.vendor);
          WebGPU.setStringView(infoStruct + 4, strPtr, vendorLen);
          strPtr += vendorLen;
          var architectureLen = lengthBytesUTF8(info.architecture);
          WebGPU.setStringView(infoStruct + 12, strPtr, architectureLen);
          strPtr += architectureLen;
          var deviceLen = lengthBytesUTF8(info.device);
          WebGPU.setStringView(infoStruct + 20, strPtr, deviceLen);
          strPtr += deviceLen;
          var descriptionLen = lengthBytesUTF8(info.description);
          WebGPU.setStringView(infoStruct + 28, strPtr, descriptionLen);
          strPtr += descriptionLen;
          HEAP32[infoStruct + 36 >> 2] = 2;
          var adapterType = info.isFallbackAdapter ? 3 : 4;
          HEAP32[infoStruct + 40 >> 2] = adapterType;
          HEAPU32[infoStruct + 44 >> 2] = 0;
          HEAPU32[infoStruct + 48 >> 2] = 0;
          WebGPU.iterateExtensions(infoStruct, {
            327739: (ext) => {
              let configCount = 0;
              let configsPtr = 0;
              if (info.subgroupMatrixConfigs) {
                configCount = info.subgroupMatrixConfigs.length;
                configsPtr = _malloc(configCount * 28);
                for (const [i3, cfg] of info.subgroupMatrixConfigs.entries()) {
                  const ptr = configsPtr + i3 * 28;
                  const componentType = WebGPU.SubgroupMatrixComponentType.indexOf(cfg.componentType);
                  const resultComponentType = WebGPU.SubgroupMatrixComponentType.indexOf(cfg.resultComponentType);
                  HEAP32[ptr >> 2] = componentType;
                  HEAP32[ptr + 4 >> 2] = resultComponentType;
                  HEAPU32[ptr + 8 >> 2] = cfg.M;
                  HEAPU32[ptr + 12 >> 2] = cfg.N;
                  HEAPU32[ptr + 16 >> 2] = cfg.K;
                }
              }
              HEAPU32[ext + 12 >> 2] = configsPtr;
              HEAPU32[ext + 8 >> 2] = configCount;
            }
          });
        },
        AddressMode: [, "clamp-to-edge", "repeat", "mirror-repeat"],
        BlendFactor: [, "zero", "one", "src", "one-minus-src", "src-alpha", "one-minus-src-alpha", "dst", "one-minus-dst", "dst-alpha", "one-minus-dst-alpha", "src-alpha-saturated", "constant", "one-minus-constant", "src1", "one-minus-src1", "src1-alpha", "one-minus-src1-alpha"],
        BlendOperation: [, "add", "subtract", "reverse-subtract", "min", "max"],
        BufferBindingType: [, , "uniform", "storage", "read-only-storage"],
        BufferMapState: [, "unmapped", "pending", "mapped"],
        CompareFunction: [, "never", "less", "equal", "less-equal", "greater", "not-equal", "greater-equal", "always"],
        CompilationInfoRequestStatus: [, "success", "callback-cancelled"],
        ComponentSwizzle: [, "0", "1", "r", "g", "b", "a"],
        CompositeAlphaMode: [, "opaque", "premultiplied", "unpremultiplied", "inherit"],
        CullMode: [, "none", "front", "back"],
        ErrorFilter: [, "validation", "out-of-memory", "internal"],
        FeatureLevel: [, "compatibility", "core"],
        FeatureName: {
          1: "core-features-and-limits",
          2: "depth-clip-control",
          3: "depth32float-stencil8",
          4: "texture-compression-bc",
          5: "texture-compression-bc-sliced-3d",
          6: "texture-compression-etc2",
          7: "texture-compression-astc",
          8: "texture-compression-astc-sliced-3d",
          9: "timestamp-query",
          10: "indirect-first-instance",
          11: "shader-f16",
          12: "rg11b10ufloat-renderable",
          13: "bgra8unorm-storage",
          14: "float32-filterable",
          15: "float32-blendable",
          16: "clip-distances",
          17: "dual-source-blending",
          18: "subgroups",
          19: "texture-formats-tier1",
          20: "texture-formats-tier2",
          21: "primitive-index",
          22: "texture-component-swizzle",
          23: "subgroup-size-control",
          24: "texture-compression-unaligned",
          25: "atomic-vec2u-min-max",
          327692: "chromium-experimental-unorm16-texture-formats",
          327729: "chromium-experimental-multi-draw-indirect",
          327732: "chromium-experimental-subgroup-matrix"
        },
        FilterMode: [, "nearest", "linear"],
        FrontFace: [, "ccw", "cw"],
        IndexFormat: [, "uint16", "uint32"],
        InstanceFeatureName: [, "timed-wait-any", "shader-source-spirv", "multiple-devices-per-adapter"],
        LoadOp: [, "load", "clear"],
        MipmapFilterMode: [, "nearest", "linear"],
        OptionalBool: ["false", "true"],
        PowerPreference: [, "low-power", "high-performance"],
        PredefinedColorSpace: [, "srgb", "display-p3"],
        PrimitiveTopology: [, "point-list", "line-list", "line-strip", "triangle-list", "triangle-strip"],
        QueryType: [, "occlusion", "timestamp"],
        SamplerBindingType: [, , "filtering", "non-filtering", "comparison"],
        Status: [, "success", "error"],
        StencilOperation: [, "keep", "zero", "replace", "invert", "increment-clamp", "decrement-clamp", "increment-wrap", "decrement-wrap"],
        StorageTextureAccess: [, , "write-only", "read-only", "read-write"],
        StoreOp: [, "store", "discard"],
        SubgroupMatrixComponentType: [, "f32", "f16", "u32", "i32", "u8", "i8"],
        SurfaceGetCurrentTextureStatus: [, "success-optimal", "success-suboptimal", "timeout", "outdated", "lost", "error"],
        TextureAspect: [, "all", "stencil-only", "depth-only"],
        TextureDimension: [, "1d", "2d", "3d"],
        TextureFormat: [, "r8unorm", "r8snorm", "r8uint", "r8sint", "r16unorm", "r16snorm", "r16uint", "r16sint", "r16float", "rg8unorm", "rg8snorm", "rg8uint", "rg8sint", "r32float", "r32uint", "r32sint", "rg16unorm", "rg16snorm", "rg16uint", "rg16sint", "rg16float", "rgba8unorm", "rgba8unorm-srgb", "rgba8snorm", "rgba8uint", "rgba8sint", "bgra8unorm", "bgra8unorm-srgb", "rgb10a2uint", "rgb10a2unorm", "rg11b10ufloat", "rgb9e5ufloat", "rg32float", "rg32uint", "rg32sint", "rgba16unorm", "rgba16snorm", "rgba16uint", "rgba16sint", "rgba16float", "rgba32float", "rgba32uint", "rgba32sint", "stencil8", "depth16unorm", "depth24plus", "depth24plus-stencil8", "depth32float", "depth32float-stencil8", "bc1-rgba-unorm", "bc1-rgba-unorm-srgb", "bc2-rgba-unorm", "bc2-rgba-unorm-srgb", "bc3-rgba-unorm", "bc3-rgba-unorm-srgb", "bc4-r-unorm", "bc4-r-snorm", "bc5-rg-unorm", "bc5-rg-snorm", "bc6h-rgb-ufloat", "bc6h-rgb-float", "bc7-rgba-unorm", "bc7-rgba-unorm-srgb", "etc2-rgb8unorm", "etc2-rgb8unorm-srgb", "etc2-rgb8a1unorm", "etc2-rgb8a1unorm-srgb", "etc2-rgba8unorm", "etc2-rgba8unorm-srgb", "eac-r11unorm", "eac-r11snorm", "eac-rg11unorm", "eac-rg11snorm", "astc-4x4-unorm", "astc-4x4-unorm-srgb", "astc-5x4-unorm", "astc-5x4-unorm-srgb", "astc-5x5-unorm", "astc-5x5-unorm-srgb", "astc-6x5-unorm", "astc-6x5-unorm-srgb", "astc-6x6-unorm", "astc-6x6-unorm-srgb", "astc-8x5-unorm", "astc-8x5-unorm-srgb", "astc-8x6-unorm", "astc-8x6-unorm-srgb", "astc-8x8-unorm", "astc-8x8-unorm-srgb", "astc-10x5-unorm", "astc-10x5-unorm-srgb", "astc-10x6-unorm", "astc-10x6-unorm-srgb", "astc-10x8-unorm", "astc-10x8-unorm-srgb", "astc-10x10-unorm", "astc-10x10-unorm-srgb", "astc-12x10-unorm", "astc-12x10-unorm-srgb", "astc-12x12-unorm", "astc-12x12-unorm-srgb"],
        TextureSampleType: [, , "float", "unfilterable-float", "depth", "sint", "uint"],
        TextureViewDimension: [, "1d", "2d", "2d-array", "cube", "cube-array", "3d"],
        ToneMappingMode: [, "standard", "extended"],
        VertexFormat: [, "uint8", "uint8x2", "uint8x4", "sint8", "sint8x2", "sint8x4", "unorm8", "unorm8x2", "unorm8x4", "snorm8", "snorm8x2", "snorm8x4", "uint16", "uint16x2", "uint16x4", "sint16", "sint16x2", "sint16x4", "unorm16", "unorm16x2", "unorm16x4", "snorm16", "snorm16x2", "snorm16x4", "float16", "float16x2", "float16x4", "float32", "float32x2", "float32x3", "float32x4", "uint32", "uint32x2", "uint32x3", "uint32x4", "sint32", "sint32x2", "sint32x3", "sint32x4", "unorm10-10-10-2", "unorm8x4-bgra", "snorm10-10-10-2"],
        VertexStepMode: [, "vertex", "instance"],
        WGSLLanguageFeatureName: [, "readonly_and_readwrite_storage_textures", "packed_4x8_integer_dot_product", "unrestricted_pointer_parameters", "pointer_composite_access", "uniform_buffer_standard_layout", "subgroup_id", "texture_and_sampler_let", "subgroup_uniformity", "texture_formats_tier1", "linear_indexing", "immediate_address_space", "buffer_view", "swizzle_assignment", "fragment_depth"]
      };
      var _emscripten_webgpu_get_device = () => {
        if (WebGPU.preinitializedDeviceId === void 0) {
          WebGPU.preinitializedDeviceId = WebGPU.importJsDevice(Module["preinitializedWebGPUDevice"]);
          _wgpuDeviceAddRef(WebGPU.preinitializedDeviceId);
        }
        _wgpuDeviceAddRef(WebGPU.preinitializedDeviceId);
        return WebGPU.preinitializedDeviceId;
      };
      var _emwgpuBufferDestroy = (bufferPtr) => {
        var buffer = WebGPU.getJsObject(bufferPtr);
        var onUnmap = WebGPU.Internals.bufferOnUnmaps[bufferPtr];
        if (onUnmap) {
          for (var i3 = 0; i3 < onUnmap.length; ++i3) {
            onUnmap[i3]();
          }
          delete WebGPU.Internals.bufferOnUnmaps[bufferPtr];
        }
        buffer.destroy();
      };
      var _emwgpuBufferGetMappedRange = (bufferPtr, offset, size) => {
        var buffer = WebGPU.getJsObject(bufferPtr);
        if (size == -1) size = void 0;
        var mapped;
        try {
          mapped = buffer.getMappedRange(offset, size);
        } catch (ex) {
          return 0;
        }
        var data = _memalign(16, mapped.byteLength);
        HEAPU8.fill(0, data, mapped.byteLength);
        WebGPU.Internals.bufferOnUnmaps[bufferPtr].push(() => {
          new Uint8Array(mapped).set(HEAPU8.subarray(data, data + mapped.byteLength));
          _free(data);
        });
        return data;
      };
      var _emwgpuBufferUnmap = (bufferPtr) => {
        var buffer = WebGPU.getJsObject(bufferPtr);
        var onUnmap = WebGPU.Internals.bufferOnUnmaps[bufferPtr];
        if (!onUnmap) {
          return;
        }
        for (var i3 = 0; i3 < onUnmap.length; ++i3) {
          onUnmap[i3]();
        }
        delete WebGPU.Internals.bufferOnUnmaps[bufferPtr];
        buffer.unmap();
      };
      var _emwgpuDelete = (ptr) => {
        delete WebGPU.Internals.jsObjects[ptr];
      };
      var _emwgpuDeviceCreateBuffer = (devicePtr, descriptor, bufferPtr) => {
        var mappedAtCreation = !!HEAPU32[descriptor + 32 >> 2];
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "usage": HEAPU32[descriptor + 16 >> 2],
          "size": readI53FromI64(descriptor + 24),
          "mappedAtCreation": mappedAtCreation
        };
        var device = WebGPU.getJsObject(devicePtr);
        var buffer;
        try {
          buffer = device.createBuffer(desc);
        } catch (ex) {
          return false;
        }
        WebGPU.Internals.jsObjectInsert(bufferPtr, buffer);
        if (mappedAtCreation) {
          WebGPU.Internals.bufferOnUnmaps[bufferPtr] = [];
        }
        return true;
      };
      var _emwgpuDeviceCreateComputePipelineAsync = function(devicePtr, futureId_low, futureId_high, descriptor, pipelinePtr) {
        var futureId = convertI32PairToI53Checked(futureId_low, futureId_high);
        var desc = WebGPU.makeComputePipelineDesc(descriptor);
        var device = WebGPU.getJsObject(devicePtr);
        WebGPU.Internals.futureInsert(futureId, device.createComputePipelineAsync(desc).then((pipeline) => {
          callUserCallback(() => {
            WebGPU.Internals.jsObjectInsert(pipelinePtr, pipeline);
            _emwgpuOnCreateComputePipelineCompleted(futureId, 1, pipelinePtr, 0);
          });
        }, (pipelineError) => {
          callUserCallback(() => {
            var sp = stackSave();
            var messagePtr = stringToUTF8OnStack(pipelineError.message);
            var status = pipelineError.reason === "validation" ? 3 : pipelineError.reason === "internal" ? 4 : 0;
            _emwgpuOnCreateComputePipelineCompleted(futureId, status, pipelinePtr, messagePtr);
            stackRestore(sp);
          });
        }));
      };
      var _emwgpuDeviceCreateRenderPipelineAsync = function(devicePtr, futureId_low, futureId_high, descriptor, pipelinePtr) {
        var futureId = convertI32PairToI53Checked(futureId_low, futureId_high);
        var desc = WebGPU.makeRenderPipelineDesc(descriptor);
        var device = WebGPU.getJsObject(devicePtr);
        WebGPU.Internals.futureInsert(futureId, device.createRenderPipelineAsync(desc).then((pipeline) => {
          callUserCallback(() => {
            WebGPU.Internals.jsObjectInsert(pipelinePtr, pipeline);
            _emwgpuOnCreateRenderPipelineCompleted(futureId, 1, pipelinePtr, 0);
          });
        }, (pipelineError) => {
          callUserCallback(() => {
            var sp = stackSave();
            var messagePtr = stringToUTF8OnStack(pipelineError.message);
            var status = pipelineError.reason === "validation" ? 3 : pipelineError.reason === "internal" ? 4 : 0;
            _emwgpuOnCreateRenderPipelineCompleted(futureId, status, pipelinePtr, messagePtr);
            stackRestore(sp);
          });
        }));
      };
      var _emwgpuDeviceCreateShaderModule = (devicePtr, descriptor, shaderModulePtr) => {
        var nextInChainPtr = HEAPU32[descriptor >> 2];
        var sType = HEAP32[nextInChainPtr + 4 >> 2];
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "code": ""
        };
        switch (sType) {
          case 2: {
            desc["code"] = WebGPU.makeStringFromStringView(nextInChainPtr + 8);
            break;
          }
        }
        var device = WebGPU.getJsObject(devicePtr);
        WebGPU.Internals.jsObjectInsert(shaderModulePtr, device.createShaderModule(desc));
      };
      var _emwgpuDeviceDestroy = (devicePtr) => {
        const device = WebGPU.getJsObject(devicePtr);
        device.onuncapturederror = null;
        device.destroy();
      };
      var _emwgpuWaitAny = (futurePtr, futureCount, timeoutMSPtr) => {
        abort("TODO: Implement asyncify-free WaitAny for timeout=0");
      };
      var ENV = {};
      var getExecutableName = () => thisProgram;
      var getEnvStrings = () => {
        if (!getEnvStrings.strings) {
          var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
          var env = {
            "USER": "web_user",
            "LOGNAME": "web_user",
            "PATH": "/",
            "PWD": "/",
            "HOME": "/home/web_user",
            "LANG": lang,
            "_": getExecutableName()
          };
          for (var x2 in ENV) {
            if (ENV[x2] === void 0) delete env[x2];
            else env[x2] = ENV[x2];
          }
          var strings = [];
          for (var x2 in env) {
            strings.push(`${x2}=${env[x2]}`);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      };
      var _environ_get = (__environ, environ_buf) => {
        var bufSize = 0;
        var envp = 0;
        for (var string of getEnvStrings()) {
          var ptr = environ_buf + bufSize;
          HEAPU32[__environ + envp >> 2] = ptr;
          bufSize += stringToUTF8(string, ptr, Infinity) + 1;
          envp += 4;
        }
        return 0;
      };
      var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        for (var string of strings) {
          bufSize += lengthBytesUTF8(string) + 1;
        }
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0;
      };
      function _fd_close(fd) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.close(stream);
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return e2.errno;
        }
      }
      var doReadv = (stream, iov, iovcnt, offset) => {
        var ret = 0;
        for (var i3 = 0; i3 < iovcnt; i3++) {
          var ptr = HEAPU32[iov >> 2];
          var len = HEAPU32[iov + 4 >> 2];
          iov += 8;
          try {
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
          } catch (e2) {
            if (ret > 0 && e2 instanceof FS.ErrnoError && (e2.errno == 6 || e2.errno == 6)) {
              break;
            }
            throw e2;
          }
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break;
          if (typeof offset != "undefined") {
            offset += curr;
          }
        }
        return ret;
      };
      function _fd_pread(fd, iov, iovcnt, offset_low, offset_high, pnum) {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        try {
          if (isNaN(offset)) return 22;
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doReadv(stream, iov, iovcnt, offset);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return e2.errno;
        }
      }
      function _fd_read(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doReadv(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return e2.errno;
        }
      }
      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        var offset = convertI32PairToI53Checked(offset_low, offset_high);
        try {
          if (isNaN(offset)) return 22;
          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.llseek(stream, offset, whence);
          tempI64 = [stream.position >>> 0, (tempDouble = stream.position, +Math.abs(tempDouble) >= 1 ? tempDouble > 0 ? +Math.floor(tempDouble / 4294967296) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[newOffset >> 2] = tempI64[0], HEAP32[newOffset + 4 >> 2] = tempI64[1];
          if (stream.getdents && !offset && whence === 0) stream.getdents = null;
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return e2.errno;
        }
      }
      var doWritev = (stream, iov, iovcnt, offset) => {
        if (iovcnt == 1) {
          return FS.write(stream, HEAP8, HEAPU32[iov >> 2], HEAPU32[iov + 4 >> 2], offset);
        }
        var total = 0;
        for (var i3 = 0, p2 = iov; i3 < iovcnt; i3++, p2 += 8) {
          total += HEAPU32[p2 + 4 >> 2];
        }
        var view = new Uint8Array(total);
        var voff = 0;
        for (var i3 = 0; i3 < iovcnt; i3++, iov += 8) {
          var ptr = HEAPU32[iov >> 2];
          var len = HEAPU32[iov + 4 >> 2];
          view.set(HEAPU8.subarray(ptr, ptr + len), voff);
          voff += len;
        }
        return FS.write(stream, view, 0, total, offset);
      };
      function _fd_write(fd, iov, iovcnt, pnum) {
        try {
          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = doWritev(stream, iov, iovcnt);
          HEAPU32[pnum >> 2] = num;
          return 0;
        } catch (e2) {
          if (typeof FS == "undefined" || !(e2.name === "ErrnoError")) throw e2;
          return e2.errno;
        }
      }
      var _emscripten_glActiveTexture = (x0) => GLctx.activeTexture(x0);
      var _glActiveTexture = _emscripten_glActiveTexture;
      var _emscripten_glAttachShader = (program, shader) => {
        GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _glAttachShader = _emscripten_glAttachShader;
      var _emscripten_glBindAttribLocation = (program, index, name) => {
        GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
      };
      var _glBindAttribLocation = _emscripten_glBindAttribLocation;
      var _emscripten_glBindBuffer = (target, buffer) => {
        if (buffer && !GL.buffers[buffer]) {
          var b2 = GLctx.createBuffer();
          b2.name = buffer;
          GL.buffers[buffer] = b2;
        }
        if (target == 34962) {
          GLctx.currentArrayBufferBinding = buffer;
        } else if (target == 34963) {
          GLctx.currentElementArrayBufferBinding = buffer;
        }
        if (target == 35051) {
          GLctx.currentPixelPackBufferBinding = buffer;
        } else if (target == 35052) {
          GLctx.currentPixelUnpackBufferBinding = buffer;
        }
        GLctx.bindBuffer(target, GL.buffers[buffer]);
      };
      var _glBindBuffer = _emscripten_glBindBuffer;
      var _emscripten_glBindBufferBase = (target, index, buffer) => {
        GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
      };
      var _glBindBufferBase = _emscripten_glBindBufferBase;
      var _emscripten_glBindFramebuffer = (target, framebuffer) => {
        GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
      };
      var _glBindFramebuffer = _emscripten_glBindFramebuffer;
      var _emscripten_glBindTexture = (target, texture) => {
        GLctx.bindTexture(target, GL.textures[texture]);
      };
      var _glBindTexture = _emscripten_glBindTexture;
      var _emscripten_glBindVertexArray = (vao) => {
        GLctx.bindVertexArray(GL.vaos[vao]);
        var ibo = GLctx.getParameter(34965);
        GLctx.currentElementArrayBufferBinding = ibo ? ibo.name | 0 : 0;
      };
      var _glBindVertexArray = _emscripten_glBindVertexArray;
      var _emscripten_glBlendEquation = (x0) => GLctx.blendEquation(x0);
      var _glBlendEquation = _emscripten_glBlendEquation;
      var _emscripten_glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
      var _glBlendFunc = _emscripten_glBlendFunc;
      var _emscripten_glBufferData = (target, size, data, usage) => {
        if (GL.currentContext.version >= 2) {
          if (data && size) {
            GLctx.bufferData(target, HEAPU8, usage, data, size);
          } else {
            GLctx.bufferData(target, size, usage);
          }
          return;
        }
        GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
      };
      var _glBufferData = _emscripten_glBufferData;
      var _emscripten_glClear = (x0) => GLctx.clear(x0);
      var _glClear = _emscripten_glClear;
      var _emscripten_glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
      var _glClearColor = _emscripten_glClearColor;
      var convertI32PairToI53 = (lo2, hi2) => (lo2 >>> 0) + hi2 * 4294967296;
      var _emscripten_glClientWaitSync = (sync, flags, timeout_low, timeout_high) => {
        var timeout = convertI32PairToI53(timeout_low, timeout_high);
        return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
      };
      var _glClientWaitSync = _emscripten_glClientWaitSync;
      var _emscripten_glColorMask = (red, green, blue, alpha) => {
        GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
      };
      var _glColorMask = _emscripten_glColorMask;
      var _emscripten_glCompileShader = (shader) => {
        GLctx.compileShader(GL.shaders[shader]);
      };
      var _glCompileShader = _emscripten_glCompileShader;
      var _emscripten_glCreateProgram = () => {
        var id = GL.getNewId(GL.programs);
        var program = GLctx.createProgram();
        program.name = id;
        program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
        program.uniformIdCounter = 1;
        GL.programs[id] = program;
        return id;
      };
      var _glCreateProgram = _emscripten_glCreateProgram;
      var _emscripten_glCreateShader = (shaderType) => {
        var id = GL.getNewId(GL.shaders);
        GL.shaders[id] = GLctx.createShader(shaderType);
        return id;
      };
      var _glCreateShader = _emscripten_glCreateShader;
      var _emscripten_glDeleteBuffers = (n2, buffers) => {
        for (var i3 = 0; i3 < n2; i3++) {
          var id = HEAP32[buffers + i3 * 4 >> 2];
          var buffer = GL.buffers[id];
          if (!buffer) continue;
          GLctx.deleteBuffer(buffer);
          buffer.name = 0;
          GL.buffers[id] = null;
          if (id == GLctx.currentArrayBufferBinding) GLctx.currentArrayBufferBinding = 0;
          if (id == GLctx.currentElementArrayBufferBinding) GLctx.currentElementArrayBufferBinding = 0;
          if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
          if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
        }
      };
      var _glDeleteBuffers = _emscripten_glDeleteBuffers;
      var _emscripten_glDeleteFramebuffers = (n2, framebuffers) => {
        for (var i3 = 0; i3 < n2; ++i3) {
          var id = HEAP32[framebuffers + i3 * 4 >> 2];
          var framebuffer = GL.framebuffers[id];
          if (!framebuffer) continue;
          GLctx.deleteFramebuffer(framebuffer);
          framebuffer.name = 0;
          GL.framebuffers[id] = null;
        }
      };
      var _glDeleteFramebuffers = _emscripten_glDeleteFramebuffers;
      var _emscripten_glDeleteProgram = (id) => {
        if (!id) return;
        var program = GL.programs[id];
        if (!program) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteProgram(program);
        program.name = 0;
        GL.programs[id] = null;
      };
      var _glDeleteProgram = _emscripten_glDeleteProgram;
      var _emscripten_glDeleteShader = (id) => {
        if (!id) return;
        var shader = GL.shaders[id];
        if (!shader) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteShader(shader);
        GL.shaders[id] = null;
      };
      var _glDeleteShader = _emscripten_glDeleteShader;
      var _emscripten_glDeleteSync = (id) => {
        if (!id) return;
        var sync = GL.syncs[id];
        if (!sync) {
          GL.recordError(1281);
          return;
        }
        GLctx.deleteSync(sync);
        sync.name = 0;
        GL.syncs[id] = null;
      };
      var _glDeleteSync = _emscripten_glDeleteSync;
      var _emscripten_glDeleteTextures = (n2, textures) => {
        for (var i3 = 0; i3 < n2; i3++) {
          var id = HEAP32[textures + i3 * 4 >> 2];
          var texture = GL.textures[id];
          if (!texture) continue;
          GLctx.deleteTexture(texture);
          texture.name = 0;
          GL.textures[id] = null;
        }
      };
      var _glDeleteTextures = _emscripten_glDeleteTextures;
      var _emscripten_glDeleteVertexArrays = (n2, vaos) => {
        for (var i3 = 0; i3 < n2; i3++) {
          var id = HEAP32[vaos + i3 * 4 >> 2];
          GLctx.deleteVertexArray(GL.vaos[id]);
          GL.vaos[id] = null;
        }
      };
      var _glDeleteVertexArrays = _emscripten_glDeleteVertexArrays;
      var _emscripten_glDetachShader = (program, shader) => {
        GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
      };
      var _glDetachShader = _emscripten_glDetachShader;
      var _emscripten_glDisable = (x0) => GLctx.disable(x0);
      var _glDisable = _emscripten_glDisable;
      var _emscripten_glDisableVertexAttribArray = (index) => {
        var cb = GL.currentContext.clientBuffers[index];
        cb.enabled = false;
        GLctx.disableVertexAttribArray(index);
      };
      var _glDisableVertexAttribArray = _emscripten_glDisableVertexAttribArray;
      var _emscripten_glDrawArrays = (mode, first, count) => {
        GL.preDrawHandleClientVertexAttribBindings(first + count);
        GLctx.drawArrays(mode, first, count);
        GL.postDrawHandleClientVertexAttribBindings();
      };
      var _glDrawArrays = _emscripten_glDrawArrays;
      var tempFixedLengthArray = [];
      var _emscripten_glDrawBuffers = (n2, bufs) => {
        var bufArray = tempFixedLengthArray[n2];
        for (var i3 = 0; i3 < n2; i3++) {
          bufArray[i3] = HEAP32[bufs + i3 * 4 >> 2];
        }
        GLctx.drawBuffers(bufArray);
      };
      var _glDrawBuffers = _emscripten_glDrawBuffers;
      var _emscripten_glEnable = (x0) => GLctx.enable(x0);
      var _glEnable = _emscripten_glEnable;
      var _emscripten_glEnableVertexAttribArray = (index) => {
        var cb = GL.currentContext.clientBuffers[index];
        cb.enabled = true;
        GLctx.enableVertexAttribArray(index);
      };
      var _glEnableVertexAttribArray = _emscripten_glEnableVertexAttribArray;
      var _emscripten_glFenceSync = (condition, flags) => {
        var sync = GLctx.fenceSync(condition, flags);
        if (sync) {
          var id = GL.getNewId(GL.syncs);
          sync.name = id;
          GL.syncs[id] = sync;
          return id;
        }
        return 0;
      };
      var _glFenceSync = _emscripten_glFenceSync;
      var _emscripten_glFinish = () => GLctx.finish();
      var _glFinish = _emscripten_glFinish;
      var _emscripten_glFlush = () => GLctx.flush();
      var _glFlush = _emscripten_glFlush;
      var _emscripten_glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
        GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
      };
      var _glFramebufferTexture2D = _emscripten_glFramebufferTexture2D;
      var _emscripten_glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
        GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
      };
      var _glFramebufferTextureLayer = _emscripten_glFramebufferTextureLayer;
      var _emscripten_glGenBuffers = (n2, buffers) => {
        GL.genObject(n2, buffers, "createBuffer", GL.buffers);
      };
      var _glGenBuffers = _emscripten_glGenBuffers;
      var _emscripten_glGenFramebuffers = (n2, ids) => {
        GL.genObject(n2, ids, "createFramebuffer", GL.framebuffers);
      };
      var _glGenFramebuffers = _emscripten_glGenFramebuffers;
      var _emscripten_glGenTextures = (n2, textures) => {
        GL.genObject(n2, textures, "createTexture", GL.textures);
      };
      var _glGenTextures = _emscripten_glGenTextures;
      var _emscripten_glGenVertexArrays = (n2, arrays) => {
        GL.genObject(n2, arrays, "createVertexArray", GL.vaos);
      };
      var _glGenVertexArrays = _emscripten_glGenVertexArrays;
      var _emscripten_glGetAttribLocation = (program, name) => GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
      var _glGetAttribLocation = _emscripten_glGetAttribLocation;
      var _emscripten_glGetError = () => {
        var error = GLctx.getError() || GL.lastError;
        GL.lastError = 0;
        return error;
      };
      var _glGetError = _emscripten_glGetError;
      var webglGetExtensions = () => {
        var exts = getEmscriptenSupportedExtensions(GLctx);
        exts = exts.concat(exts.map((e2) => "GL_" + e2));
        return exts;
      };
      var emscriptenWebGLGet = (name_, p2, type) => {
        if (!p2) {
          GL.recordError(1281);
          return;
        }
        var ret = void 0;
        switch (name_) {
          // Handle a few trivial GLES values
          case 36346:
            ret = 1;
            break;
          case 36344:
            if (type != 0 && type != 1) {
              GL.recordError(1280);
            }
            return;
          case 34814:
          // GL_NUM_PROGRAM_BINARY_FORMATS
          case 36345:
            ret = 0;
            break;
          case 34466:
            var formats = GLctx.getParameter(34467);
            ret = formats ? formats.length : 0;
            break;
          case 33309:
            if (GL.currentContext.version < 2) {
              GL.recordError(1282);
              return;
            }
            ret = webglGetExtensions().length;
            break;
          case 33307:
          // GL_MAJOR_VERSION
          case 33308:
            if (GL.currentContext.version < 2) {
              GL.recordError(1280);
              return;
            }
            ret = name_ == 33307 ? 3 : 0;
            break;
        }
        if (ret === void 0) {
          var result = GLctx.getParameter(name_);
          switch (typeof result) {
            case "number":
              ret = result;
              break;
            case "boolean":
              ret = result ? 1 : 0;
              break;
            case "string":
              GL.recordError(1280);
              return;
            case "object":
              if (result === null) {
                switch (name_) {
                  case 34964:
                  // ARRAY_BUFFER_BINDING
                  case 35725:
                  // CURRENT_PROGRAM
                  case 34965:
                  // ELEMENT_ARRAY_BUFFER_BINDING
                  case 36006:
                  // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                  case 36007:
                  // RENDERBUFFER_BINDING
                  case 32873:
                  // TEXTURE_BINDING_2D
                  case 34229:
                  // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                  case 36662:
                  // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                  case 36663:
                  // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                  case 35053:
                  // PIXEL_PACK_BUFFER_BINDING
                  case 35055:
                  // PIXEL_UNPACK_BUFFER_BINDING
                  case 36010:
                  // READ_FRAMEBUFFER_BINDING
                  case 35097:
                  // SAMPLER_BINDING
                  case 35869:
                  // TEXTURE_BINDING_2D_ARRAY
                  case 32874:
                  // TEXTURE_BINDING_3D
                  case 36389:
                  // TRANSFORM_FEEDBACK_BINDING
                  case 35983:
                  // TRANSFORM_FEEDBACK_BUFFER_BINDING
                  case 35368:
                  // UNIFORM_BUFFER_BINDING
                  case 34068: {
                    ret = 0;
                    break;
                  }
                  default: {
                    GL.recordError(1280);
                    return;
                  }
                }
              } else if (result instanceof Float32Array || result instanceof Uint32Array || result instanceof Int32Array || result instanceof Array) {
                for (var i3 = 0; i3 < result.length; ++i3) {
                  switch (type) {
                    case 0:
                      HEAP32[p2 + i3 * 4 >> 2] = result[i3];
                      break;
                    case 2:
                      HEAPF32[p2 + i3 * 4 >> 2] = result[i3];
                      break;
                    case 4:
                      HEAP8[p2 + i3] = result[i3] ? 1 : 0;
                      break;
                  }
                }
                return;
              } else {
                try {
                  ret = result.name | 0;
                } catch (e2) {
                  GL.recordError(1280);
                  err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e2})`);
                  return;
                }
              }
              break;
            default:
              GL.recordError(1280);
              err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`);
              return;
          }
        }
        switch (type) {
          case 1:
            writeI53ToI64(p2, ret);
            break;
          case 0:
            HEAP32[p2 >> 2] = ret;
            break;
          case 2:
            HEAPF32[p2 >> 2] = ret;
            break;
          case 4:
            HEAP8[p2] = ret ? 1 : 0;
            break;
        }
      };
      var _emscripten_glGetFloatv = (name_, p2) => emscriptenWebGLGet(name_, p2, 2);
      var _glGetFloatv = _emscripten_glGetFloatv;
      var _emscripten_glGetIntegerv = (name_, p2) => emscriptenWebGLGet(name_, p2, 0);
      var _glGetIntegerv = _emscripten_glGetIntegerv;
      var _emscripten_glGetProgramiv = (program, pname, p2) => {
        if (!p2) {
          GL.recordError(1281);
          return;
        }
        if (program >= GL.counter) {
          GL.recordError(1281);
          return;
        }
        program = GL.programs[program];
        if (pname == 35716) {
          var log = GLctx.getProgramInfoLog(program);
          if (log === null) log = "(unknown error)";
          HEAP32[p2 >> 2] = log.length + 1;
        } else if (pname == 35719) {
          if (!program.maxUniformLength) {
            var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
            for (var i3 = 0; i3 < numActiveUniforms; ++i3) {
              program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i3).name.length + 1);
            }
          }
          HEAP32[p2 >> 2] = program.maxUniformLength;
        } else if (pname == 35722) {
          if (!program.maxAttributeLength) {
            var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
            for (var i3 = 0; i3 < numActiveAttributes; ++i3) {
              program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i3).name.length + 1);
            }
          }
          HEAP32[p2 >> 2] = program.maxAttributeLength;
        } else if (pname == 35381) {
          if (!program.maxUniformBlockNameLength) {
            var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
            for (var i3 = 0; i3 < numActiveUniformBlocks; ++i3) {
              program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i3).length + 1);
            }
          }
          HEAP32[p2 >> 2] = program.maxUniformBlockNameLength;
        } else {
          HEAP32[p2 >> 2] = GLctx.getProgramParameter(program, pname);
        }
      };
      var _glGetProgramiv = _emscripten_glGetProgramiv;
      var _emscripten_glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = "(unknown error)";
        var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
        if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
      };
      var _glGetShaderInfoLog = _emscripten_glGetShaderInfoLog;
      var _emscripten_glGetShaderiv = (shader, pname, p2) => {
        if (!p2) {
          GL.recordError(1281);
          return;
        }
        if (pname == 35716) {
          var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
          if (log === null) log = "(unknown error)";
          var logLength = log ? log.length + 1 : 0;
          HEAP32[p2 >> 2] = logLength;
        } else if (pname == 35720) {
          var source = GLctx.getShaderSource(GL.shaders[shader]);
          var sourceLength = source ? source.length + 1 : 0;
          HEAP32[p2 >> 2] = sourceLength;
        } else {
          HEAP32[p2 >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
        }
      };
      var _glGetShaderiv = _emscripten_glGetShaderiv;
      var _emscripten_glGetString = (name_) => {
        var ret = GL.stringCache[name_];
        if (!ret) {
          switch (name_) {
            case 7939:
              ret = stringToNewUTF8(webglGetExtensions().join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              var s2 = GLctx.getParameter(name_);
              if (!s2) {
                GL.recordError(1280);
              }
              ret = s2 ? stringToNewUTF8(s2) : 0;
              break;
            case 7938:
              var webGLVersion = GLctx.getParameter(7938);
              var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
              if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
              ret = stringToNewUTF8(glVersion);
              break;
            case 35724:
              var glslVersion = GLctx.getParameter(35724);
              var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
              var ver_num = glslVersion.match(ver_re);
              if (ver_num !== null) {
                if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
                glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
              }
              ret = stringToNewUTF8(glslVersion);
              break;
            default:
              GL.recordError(1280);
          }
          GL.stringCache[name_] = ret;
        }
        return ret;
      };
      var _glGetString = _emscripten_glGetString;
      var _emscripten_glGetUniformBlockIndex = (program, uniformBlockName) => GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
      var _glGetUniformBlockIndex = _emscripten_glGetUniformBlockIndex;
      var jstoi_q = (str) => parseInt(str);
      var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
      var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
        var uniformLocsById = program.uniformLocsById, uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, i3, j2;
        if (!uniformLocsById) {
          program.uniformLocsById = uniformLocsById = {};
          program.uniformArrayNamesById = {};
          var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
          for (i3 = 0; i3 < numActiveUniforms; ++i3) {
            var u2 = GLctx.getActiveUniform(program, i3);
            var nm = u2.name;
            var sz = u2.size;
            var lb = webglGetLeftBracePos(nm);
            var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
            var id = program.uniformIdCounter;
            program.uniformIdCounter += sz;
            uniformSizeAndIdsByName[arrayName] = [sz, id];
            for (j2 = 0; j2 < sz; ++j2) {
              uniformLocsById[id] = j2;
              program.uniformArrayNamesById[id++] = arrayName;
            }
          }
        }
      };
      var _emscripten_glGetUniformLocation = (program, name) => {
        name = UTF8ToString(name);
        if (program = GL.programs[program]) {
          webglPrepareUniformLocationsBeforeFirstUse(program);
          var uniformLocsById = program.uniformLocsById;
          var arrayIndex = 0;
          var uniformBaseName = name;
          var leftBrace = webglGetLeftBracePos(name);
          if (leftBrace > 0) {
            arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
            uniformBaseName = name.slice(0, leftBrace);
          }
          var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
          if (sizeAndId && arrayIndex < sizeAndId[0]) {
            arrayIndex += sizeAndId[1];
            if (uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name)) {
              return arrayIndex;
            }
          }
        } else {
          GL.recordError(1281);
        }
        return -1;
      };
      var _glGetUniformLocation = _emscripten_glGetUniformLocation;
      var _emscripten_glLineWidth = (x0) => GLctx.lineWidth(x0);
      var _glLineWidth = _emscripten_glLineWidth;
      var _emscripten_glLinkProgram = (program) => {
        program = GL.programs[program];
        GLctx.linkProgram(program);
        program.uniformLocsById = 0;
        program.uniformSizeAndIdsByName = {};
      };
      var _glLinkProgram = _emscripten_glLinkProgram;
      var _emscripten_glPixelStorei = (pname, param) => {
        if (pname == 3317) {
          GL.unpackAlignment = param;
        } else if (pname == 3314) {
          GL.unpackRowLength = param;
        }
        GLctx.pixelStorei(pname, param);
      };
      var _glPixelStorei = _emscripten_glPixelStorei;
      var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
        function roundedToNextMultipleOf(x2, y2) {
          return x2 + y2 - 1 & -y2;
        }
        var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
        var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
        return height * alignedRowSize;
      };
      var colorChannelsInGlTextureFormat = (format) => {
        var colorChannels = {
          // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
          // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
          5: 3,
          6: 4,
          // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
          8: 2,
          29502: 3,
          29504: 4,
          // 0x1903 /* GL_RED */ - 0x1902: 1,
          26917: 2,
          26918: 2,
          // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
          29846: 3,
          29847: 4
        };
        return colorChannels[format - 6402] || 1;
      };
      var heapObjectForWebGLType = (type) => {
        type -= 5120;
        if (type == 0) return HEAP8;
        if (type == 1) return HEAPU8;
        if (type == 2) return HEAP16;
        if (type == 4) return HEAP32;
        if (type == 6) return HEAPF32;
        if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
        return HEAPU16;
      };
      var toTypedArrayIndex = (pointer, heap) => pointer >>> 31 - Math.clz32(heap.BYTES_PER_ELEMENT);
      var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels) => {
        var heap = heapObjectForWebGLType(type);
        var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
        var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
        return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
      };
      var _emscripten_glReadPixels = (x2, y2, width, height, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelPackBufferBinding) {
            GLctx.readPixels(x2, y2, width, height, format, type, pixels);
            return;
          }
          var heap = heapObjectForWebGLType(type);
          var target = toTypedArrayIndex(pixels, heap);
          GLctx.readPixels(x2, y2, width, height, format, type, heap, target);
          return;
        }
        var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels);
        if (!pixelData) {
          GL.recordError(1280);
          return;
        }
        GLctx.readPixels(x2, y2, width, height, format, type, pixelData);
      };
      var _glReadPixels = _emscripten_glReadPixels;
      var _emscripten_glShaderSource = (shader, count, string, length) => {
        var source = GL.getSource(shader, count, string, length);
        GLctx.shaderSource(GL.shaders[shader], source);
      };
      var _glShaderSource = _emscripten_glShaderSource;
      var _emscripten_glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            var index = toTypedArrayIndex(pixels, heap);
            GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
        GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
      };
      var _glTexImage2D = _emscripten_glTexImage2D;
      var _emscripten_glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
      var _glTexParameterf = _emscripten_glTexParameterf;
      var _emscripten_glTexParameterfv = (target, pname, params) => {
        var param = HEAPF32[params >> 2];
        GLctx.texParameterf(target, pname, param);
      };
      var _glTexParameterfv = _emscripten_glTexParameterfv;
      var _emscripten_glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
      var _glTexParameteri = _emscripten_glTexParameteri;
      var _emscripten_glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
      var _glTexStorage2D = _emscripten_glTexStorage2D;
      var _emscripten_glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
      var _glTexStorage3D = _emscripten_glTexStorage3D;
      var _emscripten_glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
        if (GL.currentContext.version >= 2) {
          if (GLctx.currentPixelUnpackBufferBinding) {
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
            return;
          }
          if (pixels) {
            var heap = heapObjectForWebGLType(type);
            GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, heap, toTypedArrayIndex(pixels, heap));
            return;
          }
        }
        var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels) : null;
        GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
      };
      var _glTexSubImage2D = _emscripten_glTexSubImage2D;
      var _emscripten_glTexSubImage3D = (target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels) => {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
        } else if (pixels) {
          var heap = heapObjectForWebGLType(type);
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, heap, toTypedArrayIndex(pixels, heap));
        } else {
          GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
        }
      };
      var _glTexSubImage3D = _emscripten_glTexSubImage3D;
      var webglGetProgramUniformLocation = (program, location) => {
        if (program) {
          var webglLoc = program.uniformLocsById[location];
          if (typeof webglLoc == "number") {
            program.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(program, program.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ""));
          }
          return webglLoc;
        } else {
          GL.recordError(1282);
        }
      };
      var webglGetUniformLocation = (location) => webglGetProgramUniformLocation(GLctx.currentProgram, location);
      var _emscripten_glUniform1f = (location, v0) => {
        GLctx.uniform1f(webglGetUniformLocation(location), v0);
      };
      var _glUniform1f = _emscripten_glUniform1f;
      var miniTempWebGLFloatBuffers = [];
      var _emscripten_glUniform1fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
          return;
        }
        if (count <= 288) {
          var view = miniTempWebGLFloatBuffers[count];
          for (var i3 = 0; i3 < count; ++i3) {
            view[i3] = HEAPF32[value + 4 * i3 >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 4 >> 2);
        }
        GLctx.uniform1fv(webglGetUniformLocation(location), view);
      };
      var _glUniform1fv = _emscripten_glUniform1fv;
      var _emscripten_glUniform1i = (location, v0) => {
        GLctx.uniform1i(webglGetUniformLocation(location), v0);
      };
      var _glUniform1i = _emscripten_glUniform1i;
      var _emscripten_glUniform2f = (location, v0, v1) => {
        GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
      };
      var _glUniform2f = _emscripten_glUniform2f;
      var _emscripten_glUniform2fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
          return;
        }
        if (count <= 144) {
          count *= 2;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i3 = 0; i3 < count; i3 += 2) {
            view[i3] = HEAPF32[value + 4 * i3 >> 2];
            view[i3 + 1] = HEAPF32[value + (4 * i3 + 4) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 8 >> 2);
        }
        GLctx.uniform2fv(webglGetUniformLocation(location), view);
      };
      var _glUniform2fv = _emscripten_glUniform2fv;
      var _emscripten_glUniform3f = (location, v0, v1, v2) => {
        GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
      };
      var _glUniform3f = _emscripten_glUniform3f;
      var _emscripten_glUniform4f = (location, v0, v1, v2, v3) => {
        GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
      };
      var _glUniform4f = _emscripten_glUniform4f;
      var _emscripten_glUniform4fv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          var view = miniTempWebGLFloatBuffers[4 * count];
          var heap = HEAPF32;
          value = value >> 2;
          count *= 4;
          for (var i3 = 0; i3 < count; i3 += 4) {
            var dst = value + i3;
            view[i3] = heap[dst];
            view[i3 + 1] = heap[dst + 1];
            view[i3 + 2] = heap[dst + 2];
            view[i3 + 3] = heap[dst + 3];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniform4fv(webglGetUniformLocation(location), view);
      };
      var _glUniform4fv = _emscripten_glUniform4fv;
      var miniTempWebGLIntBuffers = [];
      var _emscripten_glUniform4iv = (location, count, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          count *= 4;
          var view = miniTempWebGLIntBuffers[count];
          for (var i3 = 0; i3 < count; i3 += 4) {
            view[i3] = HEAP32[value + 4 * i3 >> 2];
            view[i3 + 1] = HEAP32[value + (4 * i3 + 4) >> 2];
            view[i3 + 2] = HEAP32[value + (4 * i3 + 8) >> 2];
            view[i3 + 3] = HEAP32[value + (4 * i3 + 12) >> 2];
          }
        } else {
          var view = HEAP32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniform4iv(webglGetUniformLocation(location), view);
      };
      var _glUniform4iv = _emscripten_glUniform4iv;
      var _emscripten_glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
        program = GL.programs[program];
        GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
      };
      var _glUniformBlockBinding = _emscripten_glUniformBlockBinding;
      var _emscripten_glUniformMatrix2fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
          return;
        }
        if (count <= 72) {
          count *= 4;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i3 = 0; i3 < count; i3 += 4) {
            view[i3] = HEAPF32[value + 4 * i3 >> 2];
            view[i3 + 1] = HEAPF32[value + (4 * i3 + 4) >> 2];
            view[i3 + 2] = HEAPF32[value + (4 * i3 + 8) >> 2];
            view[i3 + 3] = HEAPF32[value + (4 * i3 + 12) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 16 >> 2);
        }
        GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _glUniformMatrix2fv = _emscripten_glUniformMatrix2fv;
      var _emscripten_glUniformMatrix3fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
          return;
        }
        if (count <= 32) {
          count *= 9;
          var view = miniTempWebGLFloatBuffers[count];
          for (var i3 = 0; i3 < count; i3 += 9) {
            view[i3] = HEAPF32[value + 4 * i3 >> 2];
            view[i3 + 1] = HEAPF32[value + (4 * i3 + 4) >> 2];
            view[i3 + 2] = HEAPF32[value + (4 * i3 + 8) >> 2];
            view[i3 + 3] = HEAPF32[value + (4 * i3 + 12) >> 2];
            view[i3 + 4] = HEAPF32[value + (4 * i3 + 16) >> 2];
            view[i3 + 5] = HEAPF32[value + (4 * i3 + 20) >> 2];
            view[i3 + 6] = HEAPF32[value + (4 * i3 + 24) >> 2];
            view[i3 + 7] = HEAPF32[value + (4 * i3 + 28) >> 2];
            view[i3 + 8] = HEAPF32[value + (4 * i3 + 32) >> 2];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 36 >> 2);
        }
        GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _glUniformMatrix3fv = _emscripten_glUniformMatrix3fv;
      var _emscripten_glUniformMatrix4fv = (location, count, transpose, value) => {
        if (GL.currentContext.version >= 2) {
          count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
          return;
        }
        if (count <= 18) {
          var view = miniTempWebGLFloatBuffers[16 * count];
          var heap = HEAPF32;
          value = value >> 2;
          count *= 16;
          for (var i3 = 0; i3 < count; i3 += 16) {
            var dst = value + i3;
            view[i3] = heap[dst];
            view[i3 + 1] = heap[dst + 1];
            view[i3 + 2] = heap[dst + 2];
            view[i3 + 3] = heap[dst + 3];
            view[i3 + 4] = heap[dst + 4];
            view[i3 + 5] = heap[dst + 5];
            view[i3 + 6] = heap[dst + 6];
            view[i3 + 7] = heap[dst + 7];
            view[i3 + 8] = heap[dst + 8];
            view[i3 + 9] = heap[dst + 9];
            view[i3 + 10] = heap[dst + 10];
            view[i3 + 11] = heap[dst + 11];
            view[i3 + 12] = heap[dst + 12];
            view[i3 + 13] = heap[dst + 13];
            view[i3 + 14] = heap[dst + 14];
            view[i3 + 15] = heap[dst + 15];
          }
        } else {
          var view = HEAPF32.subarray(value >> 2, value + count * 64 >> 2);
        }
        GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
      };
      var _glUniformMatrix4fv = _emscripten_glUniformMatrix4fv;
      var _emscripten_glUseProgram = (program) => {
        program = GL.programs[program];
        GLctx.useProgram(program);
        GLctx.currentProgram = program;
      };
      var _glUseProgram = _emscripten_glUseProgram;
      var _emscripten_glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
        var cb = GL.currentContext.clientBuffers[index];
        if (!GLctx.currentArrayBufferBinding) {
          cb.size = size;
          cb.type = type;
          cb.normalized = normalized;
          cb.stride = stride;
          cb.ptr = ptr;
          cb.clientside = true;
          cb.vertexAttribPointerAdaptor = /** @this {WebGLRenderingContext} */
          function(index2, size2, type2, normalized2, stride2, ptr2) {
            this.vertexAttribPointer(index2, size2, type2, normalized2, stride2, ptr2);
          };
          return;
        }
        cb.clientside = false;
        GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
      };
      var _glVertexAttribPointer = _emscripten_glVertexAttribPointer;
      var _emscripten_glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
      var _glViewport = _emscripten_glViewport;
      function _mediapipe_find_canvas_event_target(canvasSelector) {
        let target = findCanvasEventTarget(canvasSelector);
        if (Module && !target) {
          target = Module.canvasWebGpu;
        }
        return Emval.toHandle(target);
      }
      function _mediapipe_webgl_tex_image_drawable(drawableHandle) {
        const drawable = Emval.toValue(drawableHandle);
        GLctx.texImage2D(GLctx.TEXTURE_2D, 0, GLctx.RGBA, GLctx.RGBA, GLctx.UNSIGNED_BYTE, drawable);
      }
      var _random_get = (buffer, size) => randomFill(HEAPU8.subarray(buffer, buffer + size));
      var _wgpuCommandEncoderBeginComputePass = (encoderPtr, descriptor) => {
        var desc;
        if (descriptor) {
          desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
            "timestampWrites": WebGPU.makePassTimestampWrites(HEAPU32[descriptor + 12 >> 2])
          };
        }
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var ptr = _emwgpuCreateComputePassEncoder(0);
        WebGPU.Internals.jsObjectInsert(ptr, commandEncoder.beginComputePass(desc));
        return ptr;
      };
      var _wgpuCommandEncoderBeginRenderPass = (encoderPtr, descriptor) => {
        function makeColorAttachment(caPtr) {
          var viewPtr = HEAPU32[caPtr + 4 >> 2];
          if (viewPtr === 0) {
            return void 0;
          }
          var depthSlice = HEAPU32[caPtr + 8 >> 2];
          if (depthSlice == 4294967295) depthSlice = void 0;
          return {
            "view": WebGPU.getJsObject(viewPtr),
            "depthSlice": depthSlice,
            "resolveTarget": WebGPU.getJsObject(HEAPU32[caPtr + 12 >> 2]),
            "clearValue": WebGPU.makeColor(caPtr + 24),
            "loadOp": WebGPU.LoadOp[HEAP32[caPtr + 16 >> 2]],
            "storeOp": WebGPU.StoreOp[HEAP32[caPtr + 20 >> 2]]
          };
        }
        function makeColorAttachments(count, caPtr) {
          var attachments = [];
          for (var i3 = 0; i3 < count; ++i3) {
            attachments.push(makeColorAttachment(caPtr + 56 * i3));
          }
          return attachments;
        }
        function makeDepthStencilAttachment(dsaPtr) {
          if (dsaPtr === 0) return void 0;
          return {
            "view": WebGPU.getJsObject(HEAPU32[dsaPtr + 4 >> 2]),
            "depthClearValue": HEAPF32[dsaPtr + 16 >> 2],
            "depthLoadOp": WebGPU.LoadOp[HEAP32[dsaPtr + 8 >> 2]],
            "depthStoreOp": WebGPU.StoreOp[HEAP32[dsaPtr + 12 >> 2]],
            "depthReadOnly": !!HEAPU32[dsaPtr + 20 >> 2],
            "stencilClearValue": HEAPU32[dsaPtr + 32 >> 2],
            "stencilLoadOp": WebGPU.LoadOp[HEAP32[dsaPtr + 24 >> 2]],
            "stencilStoreOp": WebGPU.StoreOp[HEAP32[dsaPtr + 28 >> 2]],
            "stencilReadOnly": !!HEAPU32[dsaPtr + 36 >> 2]
          };
        }
        function makeRenderPassDescriptor(descriptor2) {
          var nextInChainPtr = HEAPU32[descriptor2 >> 2];
          var maxDrawCount = void 0;
          if (nextInChainPtr !== 0) {
            var sType = HEAP32[nextInChainPtr + 4 >> 2];
            var renderPassMaxDrawCount = nextInChainPtr;
            maxDrawCount = readI53FromI64(renderPassMaxDrawCount + 8);
          }
          var desc2 = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor2 + 4),
            "colorAttachments": makeColorAttachments(HEAPU32[descriptor2 + 12 >> 2], HEAPU32[descriptor2 + 16 >> 2]),
            "depthStencilAttachment": makeDepthStencilAttachment(HEAPU32[descriptor2 + 20 >> 2]),
            "occlusionQuerySet": WebGPU.getJsObject(HEAPU32[descriptor2 + 24 >> 2]),
            "timestampWrites": WebGPU.makePassTimestampWrites(HEAPU32[descriptor2 + 28 >> 2]),
            "maxDrawCount": maxDrawCount
          };
          return desc2;
        }
        var desc = makeRenderPassDescriptor(descriptor);
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var ptr = _emwgpuCreateRenderPassEncoder(0);
        WebGPU.Internals.jsObjectInsert(ptr, commandEncoder.beginRenderPass(desc));
        return ptr;
      };
      var _wgpuCommandEncoderCopyBufferToTexture = (encoderPtr, srcPtr, dstPtr, copySizePtr) => {
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var copySize = WebGPU.makeExtent3D(copySizePtr);
        commandEncoder.copyBufferToTexture(WebGPU.makeTexelCopyBufferInfo(srcPtr), WebGPU.makeTexelCopyTextureInfo(dstPtr), copySize);
      };
      var _wgpuCommandEncoderCopyTextureToBuffer = (encoderPtr, srcPtr, dstPtr, copySizePtr) => {
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var copySize = WebGPU.makeExtent3D(copySizePtr);
        commandEncoder.copyTextureToBuffer(WebGPU.makeTexelCopyTextureInfo(srcPtr), WebGPU.makeTexelCopyBufferInfo(dstPtr), copySize);
      };
      var _wgpuCommandEncoderCopyTextureToTexture = (encoderPtr, srcPtr, dstPtr, copySizePtr) => {
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var copySize = WebGPU.makeExtent3D(copySizePtr);
        commandEncoder.copyTextureToTexture(WebGPU.makeTexelCopyTextureInfo(srcPtr), WebGPU.makeTexelCopyTextureInfo(dstPtr), copySize);
      };
      var _wgpuCommandEncoderFinish = (encoderPtr, descriptor) => {
        var commandEncoder = WebGPU.getJsObject(encoderPtr);
        var ptr = _emwgpuCreateCommandBuffer(0);
        WebGPU.Internals.jsObjectInsert(ptr, commandEncoder.finish());
        return ptr;
      };
      var _wgpuComputePassEncoderDispatchWorkgroups = (passPtr, x2, y2, z2) => {
        var pass = WebGPU.getJsObject(passPtr);
        pass.dispatchWorkgroups(x2, y2, z2);
      };
      var _wgpuComputePassEncoderEnd = (passPtr) => {
        var pass = WebGPU.getJsObject(passPtr);
        pass.end();
      };
      var _wgpuComputePassEncoderSetBindGroup = (passPtr, groupIndex, groupPtr, dynamicOffsetCount, dynamicOffsetsPtr) => {
        var pass = WebGPU.getJsObject(passPtr);
        var group = WebGPU.getJsObject(groupPtr);
        if (dynamicOffsetCount == 0) {
          pass.setBindGroup(groupIndex, group);
        } else {
          pass.setBindGroup(groupIndex, group, HEAPU32, dynamicOffsetsPtr >> 2, dynamicOffsetCount);
        }
      };
      var _wgpuComputePassEncoderSetPipeline = (passPtr, pipelinePtr) => {
        var pass = WebGPU.getJsObject(passPtr);
        var pipeline = WebGPU.getJsObject(pipelinePtr);
        pass.setPipeline(pipeline);
      };
      var _wgpuComputePipelineGetBindGroupLayout = (pipelinePtr, groupIndex) => {
        var pipeline = WebGPU.getJsObject(pipelinePtr);
        var ptr = _emwgpuCreateBindGroupLayout(0);
        WebGPU.Internals.jsObjectInsert(ptr, pipeline.getBindGroupLayout(groupIndex));
        return ptr;
      };
      var _wgpuDeviceCreateBindGroup = (devicePtr, descriptor) => {
        function makeEntry(entryPtr) {
          var bufferPtr = HEAPU32[entryPtr + 8 >> 2];
          var samplerPtr = HEAPU32[entryPtr + 32 >> 2];
          var textureViewPtr = HEAPU32[entryPtr + 36 >> 2];
          var externalTexturePtr = 0;
          WebGPU.iterateExtensions(entryPtr, {
            14: (ptr2) => {
              externalTexturePtr = HEAPU32[ptr2 + 8 >> 2];
            }
          });
          var resource;
          if (bufferPtr) {
            var size = readI53FromI64(entryPtr + 24);
            if (size == -1) size = void 0;
            resource = {
              "buffer": WebGPU.getJsObject(bufferPtr),
              "offset": readI53FromI64(entryPtr + 16),
              "size": size
            };
          } else {
            resource = WebGPU.getJsObject(samplerPtr || textureViewPtr || externalTexturePtr);
          }
          return {
            "binding": HEAPU32[entryPtr + 4 >> 2],
            "resource": resource
          };
        }
        function makeEntries(count, entriesPtrs) {
          var entries = [];
          for (var i3 = 0; i3 < count; ++i3) {
            entries.push(makeEntry(entriesPtrs + 40 * i3));
          }
          return entries;
        }
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "layout": WebGPU.getJsObject(HEAPU32[descriptor + 12 >> 2]),
          "entries": makeEntries(HEAPU32[descriptor + 16 >> 2], HEAPU32[descriptor + 20 >> 2])
        };
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateBindGroup(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createBindGroup(desc));
        return ptr;
      };
      var _wgpuDeviceCreateBindGroupLayout = (devicePtr, descriptor) => {
        function makeBufferEntry(substructPtr) {
          var typeInt = HEAPU32[substructPtr + 4 >> 2];
          if (!typeInt) return void 0;
          return {
            "type": WebGPU.BufferBindingType[typeInt],
            "hasDynamicOffset": !!HEAPU32[substructPtr + 8 >> 2],
            "minBindingSize": readI53FromI64(substructPtr + 16)
          };
        }
        function makeSamplerEntry(substructPtr) {
          var typeInt = HEAPU32[substructPtr + 4 >> 2];
          if (!typeInt) return void 0;
          return {
            "type": WebGPU.SamplerBindingType[typeInt]
          };
        }
        function makeTextureEntry(substructPtr) {
          var sampleTypeInt = HEAPU32[substructPtr + 4 >> 2];
          if (!sampleTypeInt) return void 0;
          return {
            "sampleType": WebGPU.TextureSampleType[sampleTypeInt],
            "viewDimension": WebGPU.TextureViewDimension[HEAP32[substructPtr + 8 >> 2]],
            "multisampled": !!HEAPU32[substructPtr + 12 >> 2]
          };
        }
        function makeStorageTextureEntry(substructPtr) {
          var accessInt = HEAPU32[substructPtr + 4 >> 2];
          if (!accessInt) return void 0;
          return {
            "access": WebGPU.StorageTextureAccess[accessInt],
            "format": WebGPU.TextureFormat[HEAP32[substructPtr + 8 >> 2]],
            "viewDimension": WebGPU.TextureViewDimension[HEAP32[substructPtr + 12 >> 2]]
          };
        }
        function makeEntry(entryPtr) {
          var entry = {
            "binding": HEAPU32[entryPtr + 4 >> 2],
            "visibility": HEAPU32[entryPtr + 8 >> 2],
            "buffer": makeBufferEntry(entryPtr + 24),
            "sampler": makeSamplerEntry(entryPtr + 48),
            "texture": makeTextureEntry(entryPtr + 56),
            "storageTexture": makeStorageTextureEntry(entryPtr + 72)
          };
          WebGPU.iterateExtensions(entryPtr, {
            13: (ptr2) => {
              entry["externalTexture"] = {};
            }
          });
          return entry;
        }
        function makeEntries(count, entriesPtrs) {
          var entries = [];
          for (var i3 = 0; i3 < count; ++i3) {
            entries.push(makeEntry(entriesPtrs + 88 * i3));
          }
          return entries;
        }
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "entries": makeEntries(HEAPU32[descriptor + 12 >> 2], HEAPU32[descriptor + 16 >> 2])
        };
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateBindGroupLayout(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createBindGroupLayout(desc));
        return ptr;
      };
      var _wgpuDeviceCreateCommandEncoder = (devicePtr, descriptor) => {
        var desc;
        if (descriptor) {
          desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4)
          };
        }
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateCommandEncoder(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createCommandEncoder(desc));
        return ptr;
      };
      var _wgpuDeviceCreateComputePipeline = (devicePtr, descriptor) => {
        var desc = WebGPU.makeComputePipelineDesc(descriptor);
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateComputePipeline(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createComputePipeline(desc));
        return ptr;
      };
      var _wgpuDeviceCreatePipelineLayout = (devicePtr, descriptor) => {
        var bglCount = HEAPU32[descriptor + 12 >> 2];
        var bglPtr = HEAPU32[descriptor + 16 >> 2];
        var bgls = [];
        for (var i3 = 0; i3 < bglCount; ++i3) {
          bgls.push(WebGPU.getJsObject(HEAPU32[bglPtr + 4 * i3 >> 2]));
        }
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "bindGroupLayouts": bgls,
          "immediateSize": HEAPU32[descriptor + 20 >> 2]
        };
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreatePipelineLayout(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createPipelineLayout(desc));
        return ptr;
      };
      var _wgpuDeviceCreateRenderPipeline = (devicePtr, descriptor) => {
        var desc = WebGPU.makeRenderPipelineDesc(descriptor);
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateRenderPipeline(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createRenderPipeline(desc));
        return ptr;
      };
      var _wgpuDeviceCreateSampler = (devicePtr, descriptor) => {
        var desc;
        if (descriptor) {
          desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
            "addressModeU": WebGPU.AddressMode[HEAP32[descriptor + 12 >> 2]],
            "addressModeV": WebGPU.AddressMode[HEAP32[descriptor + 16 >> 2]],
            "addressModeW": WebGPU.AddressMode[HEAP32[descriptor + 20 >> 2]],
            "magFilter": WebGPU.FilterMode[HEAP32[descriptor + 24 >> 2]],
            "minFilter": WebGPU.FilterMode[HEAP32[descriptor + 28 >> 2]],
            "mipmapFilter": WebGPU.MipmapFilterMode[HEAP32[descriptor + 32 >> 2]],
            "lodMinClamp": HEAPF32[descriptor + 36 >> 2],
            "lodMaxClamp": HEAPF32[descriptor + 40 >> 2],
            "compare": WebGPU.CompareFunction[HEAP32[descriptor + 44 >> 2]],
            "maxAnisotropy": HEAPU16[descriptor + 48 >> 1]
          };
        }
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateSampler(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createSampler(desc));
        return ptr;
      };
      var _wgpuDeviceCreateTexture = (devicePtr, descriptor) => {
        var nextInChainPtr = HEAPU32[descriptor >> 2];
        var textureBindingViewDimension;
        if (nextInChainPtr !== 0) {
          var sType = HEAP32[nextInChainPtr + 4 >> 2];
          var textureBindingViewDimensionDescriptor = nextInChainPtr;
          textureBindingViewDimension = WebGPU.TextureViewDimension[HEAP32[textureBindingViewDimensionDescriptor + 8 >> 2]];
        }
        var desc = {
          "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
          "size": WebGPU.makeExtent3D(descriptor + 28),
          "mipLevelCount": HEAPU32[descriptor + 44 >> 2],
          "sampleCount": HEAPU32[descriptor + 48 >> 2],
          "dimension": WebGPU.TextureDimension[HEAP32[descriptor + 24 >> 2]],
          "format": WebGPU.TextureFormat[HEAP32[descriptor + 40 >> 2]],
          "usage": HEAPU32[descriptor + 16 >> 2],
          "textureBindingViewDimension": textureBindingViewDimension
        };
        var viewFormatCount = HEAPU32[descriptor + 52 >> 2];
        if (viewFormatCount) {
          var viewFormatsPtr = HEAPU32[descriptor + 56 >> 2];
          desc["viewFormats"] = Array.from(HEAP32.subarray(viewFormatsPtr >> 2, viewFormatsPtr + viewFormatCount * 4 >> 2), (format) => WebGPU.TextureFormat[format]);
        }
        var device = WebGPU.getJsObject(devicePtr);
        var ptr = _emwgpuCreateTexture(0);
        WebGPU.Internals.jsObjectInsert(ptr, device.createTexture(desc));
        return ptr;
      };
      var _wgpuQueueSubmit = (queuePtr, commandCount, commands) => {
        var queue = WebGPU.getJsObject(queuePtr);
        var cmds = Array.from(HEAP32.subarray(commands >> 2, commands + commandCount * 4 >> 2), (id) => WebGPU.getJsObject(id));
        queue.submit(cmds);
      };
      function _wgpuQueueWriteBuffer(queuePtr, bufferPtr, bufferOffset_low, bufferOffset_high, data, size) {
        var bufferOffset = convertI32PairToI53Checked(bufferOffset_low, bufferOffset_high);
        var queue = WebGPU.getJsObject(queuePtr);
        var buffer = WebGPU.getJsObject(bufferPtr);
        var subarray = HEAPU8.subarray(data, data + size);
        queue.writeBuffer(buffer, bufferOffset, subarray, 0, size);
      }
      var _wgpuQueueWriteTexture = (queuePtr, destinationPtr, data, dataSize, dataLayoutPtr, writeSizePtr) => {
        var queue = WebGPU.getJsObject(queuePtr);
        var destination = WebGPU.makeTexelCopyTextureInfo(destinationPtr);
        var dataLayout = WebGPU.makeTexelCopyBufferLayout(dataLayoutPtr);
        var writeSize = WebGPU.makeExtent3D(writeSizePtr);
        var subarray = HEAPU8.subarray(data, data + dataSize);
        queue.writeTexture(destination, subarray, dataLayout, writeSize);
      };
      var _wgpuRenderPassEncoderDraw = (passPtr, vertexCount, instanceCount, firstVertex, firstInstance) => {
        firstVertex >>>= 0;
        firstInstance >>>= 0;
        var pass = WebGPU.getJsObject(passPtr);
        pass.draw(vertexCount, instanceCount, firstVertex, firstInstance);
      };
      var _wgpuRenderPassEncoderEnd = (encoderPtr) => {
        var encoder = WebGPU.getJsObject(encoderPtr);
        encoder.end();
      };
      var _wgpuRenderPassEncoderSetBindGroup = (passPtr, groupIndex, groupPtr, dynamicOffsetCount, dynamicOffsetsPtr) => {
        var pass = WebGPU.getJsObject(passPtr);
        var group = WebGPU.getJsObject(groupPtr);
        if (dynamicOffsetCount == 0) {
          pass.setBindGroup(groupIndex, group);
        } else {
          pass.setBindGroup(groupIndex, group, HEAPU32, dynamicOffsetsPtr >> 2, dynamicOffsetCount);
        }
      };
      var _wgpuRenderPassEncoderSetPipeline = (passPtr, pipelinePtr) => {
        var pass = WebGPU.getJsObject(passPtr);
        var pipeline = WebGPU.getJsObject(pipelinePtr);
        pass.setPipeline(pipeline);
      };
      var _wgpuRenderPipelineGetBindGroupLayout = (pipelinePtr, groupIndex) => {
        var pipeline = WebGPU.getJsObject(pipelinePtr);
        var ptr = _emwgpuCreateBindGroupLayout(0);
        WebGPU.Internals.jsObjectInsert(ptr, pipeline.getBindGroupLayout(groupIndex));
        return ptr;
      };
      var _wgpuTextureCreateView = (texturePtr, descriptor) => {
        var desc;
        if (descriptor) {
          var swizzle;
          var nextInChainPtr = HEAPU32[descriptor >> 2];
          if (nextInChainPtr !== 0) {
            var sType = HEAP32[nextInChainPtr + 4 >> 2];
            var swizzleDescriptor = nextInChainPtr;
            var swizzlePtr = swizzleDescriptor + 8;
            var r2 = WebGPU.ComponentSwizzle[HEAP32[swizzlePtr >> 2]] || "r";
            var g2 = WebGPU.ComponentSwizzle[HEAP32[swizzlePtr + 4 >> 2]] || "g";
            var b2 = WebGPU.ComponentSwizzle[HEAP32[swizzlePtr + 8 >> 2]] || "b";
            var a2 = WebGPU.ComponentSwizzle[HEAP32[swizzlePtr + 12 >> 2]] || "a";
            swizzle = `${r2}${g2}${b2}${a2}`;
          }
          var mipLevelCount = HEAPU32[descriptor + 24 >> 2];
          var arrayLayerCount = HEAPU32[descriptor + 32 >> 2];
          desc = {
            "label": WebGPU.makeStringFromOptionalStringView(descriptor + 4),
            "format": WebGPU.TextureFormat[HEAP32[descriptor + 12 >> 2]],
            "dimension": WebGPU.TextureViewDimension[HEAP32[descriptor + 16 >> 2]],
            "baseMipLevel": HEAPU32[descriptor + 20 >> 2],
            "mipLevelCount": mipLevelCount === 4294967295 ? void 0 : mipLevelCount,
            "baseArrayLayer": HEAPU32[descriptor + 28 >> 2],
            "arrayLayerCount": arrayLayerCount === 4294967295 ? void 0 : arrayLayerCount,
            "aspect": WebGPU.TextureAspect[HEAP32[descriptor + 36 >> 2]],
            "usage": HEAPU32[descriptor + 40 >> 2],
            "swizzle": swizzle
          };
        }
        var texture = WebGPU.getJsObject(texturePtr);
        var ptr = _emwgpuCreateTextureView(0);
        WebGPU.Internals.jsObjectInsert(ptr, texture.createView(desc));
        return ptr;
      };
      var _wgpuTextureDestroy = (texturePtr) => {
        WebGPU.getJsObject(texturePtr).destroy();
      };
      var _wgpuTextureGetFormat = (texturePtr) => {
        var texture = WebGPU.getJsObject(texturePtr);
        return WebGPU.TextureFormat.indexOf(texture.format);
      };
      var getCFunc = (ident) => {
        var func = Module["_" + ident];
        return func;
      };
      var writeArrayToMemory = (array, buffer) => {
        HEAP8.set(array, buffer);
      };
      var ccall = (ident, returnType, argTypes, args, opts) => {
        var toC = {
          "string": (str) => {
            var ret2 = 0;
            if (str !== null && str !== void 0 && str !== 0) {
              ret2 = stringToUTF8OnStack(str);
            }
            return ret2;
          },
          "array": (arr) => {
            var ret2 = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret2);
            return ret2;
          }
        };
        function convertReturnValue(ret2) {
          if (returnType === "string") {
            return UTF8ToString(ret2);
          }
          if (returnType === "boolean") return Boolean(ret2);
          return ret2;
        }
        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        if (args) {
          for (var i3 = 0; i3 < args.length; i3++) {
            var converter = toC[argTypes[i3]];
            if (converter) {
              if (!stack) stack = stackSave();
              cArgs[i3] = converter(args[i3]);
            } else {
              cArgs[i3] = args[i3];
            }
          }
        }
        var ret = func(...cArgs);
        function onDone(ret2) {
          if (stack) stackRestore(stack);
          return convertReturnValue(ret2);
        }
        ret = onDone(ret);
        return ret;
      };
      var FS_createPath = (...args) => FS.createPath(...args);
      var FS_unlink = (...args) => FS.unlink(...args);
      var FS_createLazyFile = (...args) => FS.createLazyFile(...args);
      var FS_createDevice = (...args) => FS.createDevice(...args);
      FS.createPreloadedFile = FS_createPreloadedFile;
      FS.preloadFile = FS_preloadFile;
      FS.staticInit();
      registerPreMainLoop(() => GL.newRenderingFrameStarted());
      for (let i3 = 0; i3 < 32; ++i3) tempFixedLengthArray.push(new Array(i3));
      var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
      for (var i2 = 0; i2 <= 288; ++i2) {
        miniTempWebGLFloatBuffers[i2] = miniTempWebGLFloatBuffersStorage.subarray(0, i2);
      }
      var miniTempWebGLIntBuffersStorage = new Int32Array(288);
      for (var i2 = 0; i2 <= 288; ++i2) {
        miniTempWebGLIntBuffers[i2] = miniTempWebGLIntBuffersStorage.subarray(0, i2);
      }
      {
        if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
        if (Module["print"]) out = Module["print"];
        if (Module["printErr"]) err = Module["printErr"];
        if (Module["arguments"]) programArgs = Module["arguments"];
        if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
        var preInit = Module["preInit"];
        if (preInit) {
          if (typeof preInit == "function") Module["preInit"] = preInit = [preInit];
          while (preInit.length > 0) {
            preInit.shift()();
          }
        }
      }
      Module["addRunDependency"] = addRunDependency;
      Module["removeRunDependency"] = removeRunDependency;
      Module["ccall"] = ccall;
      Module["stringToNewUTF8"] = stringToNewUTF8;
      Module["FS_preloadFile"] = FS_preloadFile;
      Module["FS_unlink"] = FS_unlink;
      Module["FS_createPath"] = FS_createPath;
      Module["FS_createDevice"] = FS_createDevice;
      Module["FS_createDataFile"] = FS_createDataFile;
      Module["FS_createLazyFile"] = FS_createLazyFile;
      var ASM_CONSTS = {
        1625684: ($0) => {
          const canvas2 = Emval.toValue($0);
          const context = canvas2.getContext("webgpu");
          return WebGPU.importJsTexture(context.getCurrentTexture());
        },
        1625827: ($0, $1, $2, $3, $4) => {
          const drawable = Emval.toValue($0);
          const device = WebGPU.getJsObject($1);
          const texture = WebGPU.getJsObject($2);
          const width = $3;
          const height = $4;
          device.queue.copyExternalImageToTexture({
            source: drawable
          }, {
            texture
          }, [width, height]);
        },
        1626086: ($0, $1, $2, $3) => {
          const sourceExtTex = Emval.toValue($0);
          const device = WebGPU.getJsObject($1);
          const sampler = WebGPU.getJsObject($2);
          const bgLayout = WebGPU.getJsObject($3);
          const bindGroup = device.createBindGroup({
            layout: bgLayout,
            entries: [{
              binding: 0,
              resource: sampler
            }, {
              binding: 1,
              resource: sourceExtTex
            }]
          });
          return WebGPU.importJsBindGroup(bindGroup);
        },
        1626456: ($0, $1) => {
          const input = Emval.toValue($0);
          const output = Emval.toValue($1);
          const ctx = output.getContext("2d");
          ctx.drawImage(input, 0, 0, output.width, output.height);
        },
        1626621: ($0, $1) => {
          const inputArray = Emval.toValue($0);
          const output = Emval.toValue($1);
          const ctx = output.getContext("2d");
          const image_data = new ImageData(inputArray, output.width, output.height);
          ctx.putImageData(image_data, 0, 0);
        },
        1626845: ($0, $1) => {
          const input = Emval.toValue($0);
          const outputArray = Emval.toValue($1);
          const ctx = input.getContext("2d");
          const data = ctx.getImageData(0, 0, input.width, input.height);
          outputArray.set(data.data);
        },
        1627049: () => typeof HTMLCanvasElement !== "undefined",
        1627104: () => !!Module["preinitializedWebGPUDevice"],
        1627155: () => {
          specialHTMLTargets["#canvas"] = Module.canvas;
        }
      };
      function BeginGlQueryTiming(calc_name, num_repetitions) {
        const gl = Module.canvas.getContext("webgl2");
        const query = gl.createQuery();
        Module.WEBGL_SHADER_CALC_METRICS = Module.WEBGL_SHADER_CALC_METRICS || {};
        Module.WEBGL_SHADER_CALC_METRICS[UTF8ToString(calc_name)] = {
          query,
          repetitions: num_repetitions
        };
        Module.WEBGL_QUERY_TIMER_EXT = Module.WEBGL_QUERY_TIMER_EXT || gl.getExtension("EXT_disjoint_timer_query_webgl2");
        gl.beginQuery(Module.WEBGL_QUERY_TIMER_EXT.TIME_ELAPSED_EXT, query);
      }
      function EndGlQueryTiming(calc_name) {
        const gl = Module.canvas.getContext("webgl2");
        gl.endQuery(Module.WEBGL_QUERY_TIMER_EXT.TIME_ELAPSED_EXT, Module.WEBGL_SHADER_CALC_METRICS[UTF8ToString(calc_name)].query);
      }
      function JsWrapImageConverter() {
        if (!Module._imageConverter) {
          Module._imageConverter = (binaryPtr, binarySize, width, height, numChannels, makeDeepCopy, outputType) => {
            const imageData = new outputType(makeDeepCopy ? Module.HEAPU8.slice(binaryPtr, binaryPtr + binarySize).buffer : Module.HEAPU8.buffer, binaryPtr, width * height * numChannels);
            return {
              data: imageData,
              width,
              height
            };
          };
        }
      }
      function JsOnUint8ArrayImageListener(output_stream_name, binary_ptr, binary_size, width, height, num_channels, make_deep_copy, timestamp_ms) {
        const image = Module._imageConverter(binary_ptr, binary_size, width, height, num_channels, make_deep_copy, Uint8Array);
        Module._wrapSimpleListenerOutput(output_stream_name, image, timestamp_ms);
      }
      function JsOnFloat32ArrayImageListener(output_stream_name, binary_ptr, binary_size, width, height, num_channels, make_deep_copy, timestamp_ms) {
        const image = Module._imageConverter(binary_ptr, binary_size, width, height, num_channels, make_deep_copy, Float32Array);
        Module._wrapSimpleListenerOutput(output_stream_name, image, timestamp_ms);
      }
      function JsOnWebGLTextureListener(output_stream_name, name, width, height, timestamp_ms) {
        Module._wrapSimpleListenerOutput(output_stream_name, {
          data: GL.textures[name],
          width,
          height
        }, timestamp_ms);
      }
      function JsOnUint8ArrayImageVectorListener(output_stream_name, binary_ptr, binary_size, width, height, num_channels, make_deep_copy, timestamp_ms) {
        const image = Module._imageConverter(binary_ptr, binary_size, width, height, num_channels, make_deep_copy, Uint8Array);
        Module._wrapSimpleListenerOutput(output_stream_name, image, false, timestamp_ms);
      }
      function JsOnFloat32ArrayImageVectorListener(output_stream_name, binary_ptr, binary_size, width, height, num_channels, make_deep_copy, timestamp_ms) {
        const image = Module._imageConverter(binary_ptr, binary_size, width, height, num_channels, make_deep_copy, Float32Array);
        Module._wrapSimpleListenerOutput(output_stream_name, image, false, timestamp_ms);
      }
      function JsOnWebGLTextureVectorListener(output_stream_name, name, width, height, timestamp_ms) {
        Module._wrapSimpleListenerOutput(output_stream_name, {
          data: GL.textures[name],
          width,
          height
        }, false, timestamp_ms);
      }
      function JsWrapLoggingHelpers() {
        if (!Module["_decodeBase64"]) {
          Module["_decodeBase64"] = function(encoded_key_ptr) {
            const encodedStr = UTF8ToString(encoded_key_ptr);
            return atob(encodedStr);
          };
        }
      }
      function JsOnEmptyPacketListener(output_stream_name, timestamp) {
        Module._wrapEmptyPacketListenerOutput(output_stream_name, timestamp);
      }
      function JsOnVectorFinishedListener(output_stream_name, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, void 0, true, timestamp);
      }
      function JsOnSimpleListenerBool(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
      }
      function JsOnVectorListenerBool(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, false, timestamp);
      }
      function JsOnSimpleListenerInt(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
      }
      function JsOnVectorListenerInt(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, false, timestamp);
      }
      function JsOnSimpleListenerUint(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
      }
      function JsOnVectorListenerUint(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, false, timestamp);
      }
      function JsOnSimpleListenerDouble(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
      }
      function JsOnVectorListenerDouble(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, false, timestamp);
      }
      function JsOnSimpleListenerFloat(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, timestamp);
      }
      function JsOnVectorListenerFloat(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, out_data, false, timestamp);
      }
      function JsOnSimpleListenerString(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, UTF8ToString(out_data), timestamp);
      }
      function JsOnVectorListenerString(output_stream_name, out_data, timestamp) {
        Module._wrapSimpleListenerOutput(output_stream_name, UTF8ToString(out_data), false, timestamp);
      }
      function JsOnVectorListenerProto(output_stream_name, proto_ptr, proto_size, make_deep_copy, timestamp) {
        const newProtoArray = make_deep_copy ? Module.HEAPU8.slice(proto_ptr, proto_ptr + proto_size) : new Uint8Array(Module.HEAPU8.buffer, proto_ptr, proto_size);
        Module._wrapSimpleListenerOutput(output_stream_name, newProtoArray, false, timestamp);
      }
      function JsWrapSimpleListeners() {
        if (!Module._wrapSimpleListenerOutput) {
          Module._wrapSimpleListenerOutput = (outputStreamName, ...args) => {
            if (Module.simpleListeners) {
              const streamName = UTF8ToString(outputStreamName);
              if (Module.simpleListeners[streamName]) {
                Module.simpleListeners[streamName](...args);
              }
            }
          };
        }
        if (!Module._wrapEmptyPacketListenerOutput) {
          Module._wrapEmptyPacketListenerOutput = (outputStreamName, timestamp) => {
            if (Module.emptyPacketListeners) {
              const streamName = UTF8ToString(outputStreamName);
              if (Module.emptyPacketListeners[streamName]) {
                Module.emptyPacketListeners[streamName](timestamp);
              }
            }
          };
        }
      }
      function JsOnSimpleListenerBinaryArray(output_stream_name, binary_ptr, binary_size, make_deep_copy, timestamp) {
        const newProtoArray = make_deep_copy ? Module.HEAPU8.slice(binary_ptr, binary_ptr + binary_size) : new Uint8Array(Module.HEAPU8.buffer, binary_ptr, binary_size);
        Module._wrapSimpleListenerOutput(output_stream_name, newProtoArray, timestamp);
      }
      function mediapipe_import_external_texture(device_handle, source_handle) {
        const device = WebGPU.getJsObject(device_handle);
        const source = Emval.toValue(source_handle);
        const externalTexture = device.importExternalTexture({
          source
        });
        return Emval.toHandle(externalTexture);
      }
      function mediapipe_create_utility_canvas2d() {
        let canvas2;
        if (typeof HTMLCanvasElement !== "undefined") {
          canvas2 = document.createElement("canvas");
          canvas2.style.display = "none";
        } else {
          canvas2 = new OffscreenCanvas(0, 0);
        }
        return Emval.toHandle(canvas2);
      }
      function GetAdapterArchitecture() {
        const device = Module["preinitializedWebGPUDevice"];
        const architecture = device.adapterInfo ? device.adapterInfo.architecture : "Unknown";
        return stringToNewUTF8(architecture);
      }
      function GetAdapterDescription() {
        const device = Module["preinitializedWebGPUDevice"];
        const description = device.adapterInfo ? device.adapterInfo.description : "Unknown";
        return stringToNewUTF8(description);
      }
      function GetAdapterDeviceName() {
        const device = Module["preinitializedWebGPUDevice"];
        const deviceName = device.adapterInfo ? device.adapterInfo.device : "Unknown";
        return stringToNewUTF8(deviceName);
      }
      function GetAdapterVendor() {
        const device = Module["preinitializedWebGPUDevice"];
        const vendor = device.adapterInfo ? device.adapterInfo.vendor : "Unknown";
        return stringToNewUTF8(vendor);
      }
      function __asyncjs__mediapipe_map_buffer_jspi(buffer_handle, data) {
        return Asyncify.handleAsync(async () => {
          const buffer = WebGPU.getJsObject(buffer_handle);
          if ("mapSync" in buffer) {
            buffer.mapSync(GPUMapMode.READ);
          } else {
            await buffer.mapAsync(GPUMapMode.READ);
          }
          const mapped = buffer.getMappedRange();
          HEAPU8.set(new Uint8Array(mapped), data);
          buffer.unmap();
        });
      }
      function hardware_concurrency() {
        var concurrency = 1;
        try {
          concurrency = self.navigator.hardwareConcurrency;
        } catch (e2) {
        }
        return concurrency;
      }
      function UseBottomLeftGpuOrigin() {
        return Module && Module.gpuOriginForWebTexturesIsBottomLeft;
      }
      function custom_emscripten_dbgn(str, len) {
        if (typeof dbg !== "undefined") {
          dbg(UTF8ToString(str, len));
        } else {
          if (typeof custom_dbg === "undefined") {
            let custom_dbg2 = function(text) {
              console.warn.apply(console, arguments);
            };
          }
          custom_dbg(UTF8ToString(str, len));
        }
      }
      function JsWrapErrorListenerInternal(code, message) {
        if (Module.errorListener) {
          const stringMessage = UTF8ToString(message);
          Module.errorListener(code, stringMessage);
        }
      }
      var _free, _malloc, _interactive_segmenter_create, _interactive_segmenter_set_image, _interactive_segmenter_segment, _interactive_segmenter_close, _wgpuDeviceAddRef, _addBoundTextureAsImageToStream, _attachImageListener, _attachImageVectorListener, _mediapipeLoggerGetEncodedApiKey, _registerModelResourcesGraphService, _bindTextureToStream, _addBoundTextureToStream, _addDoubleToInputStream, _addFloatToInputStream, _addBoolToInputStream, _addIntToInputStream, _addUintToInputStream, _addStringToInputStream, _addRawDataSpanToInputStream, _allocateBoolVector, _allocateFloatVector, _allocateDoubleVector, _allocateIntVector, _allocateUintVector, _allocateStringVector, _addBoolVectorEntry, _addFloatVectorEntry, _addDoubleVectorEntry, _addIntVectorEntry, _addUintVectorEntry, _addStringVectorEntry, _addBoolVectorToInputStream, _addFloatVectorToInputStream, _addDoubleVectorToInputStream, _addIntVectorToInputStream, _addUintVectorToInputStream, _addStringVectorToInputStream, _addFlatHashMapToInputStream, _addProtoToInputStream, _addEmptyPacketToInputStream, _addBoolToInputSidePacket, _addDoubleToInputSidePacket, _addFloatToInputSidePacket, _addIntToInputSidePacket, _addUintToInputSidePacket, _addStringToInputSidePacket, _addRawDataSpanToInputSidePacket, _addProtoToInputSidePacket, _addBoolVectorToInputSidePacket, _addDoubleVectorToInputSidePacket, _addFloatVectorToInputSidePacket, _addIntVectorToInputSidePacket, _addUintVectorToInputSidePacket, _addStringVectorToInputSidePacket, _attachBoolListener, _attachBoolVectorListener, _attachDoubleListener, _attachDoubleVectorListener, _attachFloatListener, _attachFloatVectorListener, _attachIntListener, _attachIntVectorListener, _attachUintListener, _attachUintVectorListener, _attachStringListener, _attachStringVectorListener, _attachProtoListener, _attachProtoVectorListener, _getGraphConfig, ___getTypeName, _emwgpuCreateBindGroup, _emwgpuCreateBindGroupLayout, _emwgpuCreateCommandBuffer, _emwgpuCreateCommandEncoder, _emwgpuCreateComputePassEncoder, _emwgpuCreateComputePipeline, _emwgpuCreateExternalTexture, _emwgpuCreatePipelineLayout, _emwgpuCreateQuerySet, _emwgpuCreateRenderBundle, _emwgpuCreateRenderBundleEncoder, _emwgpuCreateRenderPassEncoder, _emwgpuCreateRenderPipeline, _emwgpuCreateSampler, _emwgpuCreateSurface, _emwgpuCreateTexture, _emwgpuCreateTextureView, _emwgpuCreateAdapter, _emwgpuImportBuffer, _emwgpuCreateDevice, _emwgpuCreateQueue, _emwgpuCreateShaderModule, _emwgpuOnCreateComputePipelineCompleted, _emwgpuOnCreateRenderPipelineCompleted, _clearSubgraphs, _pushBinarySubgraph, _pushTextSubgraph, _changeBinaryGraph, _changeTextGraph, _processGl, _process, _bindTextureToCanvas, _requestShaderRefreshOnGraphChange, _waitUntilIdle, _closeGraph, _setAutoRenderToScreen, _emscripten_builtin_memalign, _memalign, __emscripten_tempret_set, __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current, dynCall_ji, dynCall_jii, dynCall_iiiijij, dynCall_vij, dynCall_viiji, dynCall_viji, dynCall_iij, dynCall_iiiijj, dynCall_viijj, dynCall_viiijjj, dynCall_iiiji, dynCall_jjj, dynCall_jiii, dynCall_viijii, dynCall_vijjj, dynCall_vj, dynCall_viij, dynCall_jiji, dynCall_iiiiij, dynCall_iiiiijj, dynCall_iiiiiijj, memory, _kVersionStampBuildChangelistStr, _kVersionStampCitcSnapshotStr, _kVersionStampCitcWorkspaceIdStr, _kVersionStampSourceUriStr, _kVersionStampBuildClientStr, _kVersionStampBuildClientMintStatusStr, _kVersionStampBuildCompilerStr, _kVersionStampBuildDateTimePstStr, _kVersionStampBuildDepotPathStr, _kVersionStampBuildIdStr, _kVersionStampBuildInfoStr, _kVersionStampBuildLabelStr, _kVersionStampBuildTargetStr, _kVersionStampBuildTimestampStr, _kVersionStampBuildToolStr, _kVersionStampG3BuildTargetStr, _kVersionStampVerifiableStr, _kVersionStampBuildFdoTypeStr, _kVersionStampBuildBaselineChangelistStr, _kVersionStampBuildLtoTypeStr, _kVersionStampBuildPropellerTypeStr, _kVersionStampBuildPghoTypeStr, _kVersionStampBuildFdoProfileChangelistStr, _kVersionStampBuildMemprofProfileChangelistStr, _kVersionStampBuildUsernameStr, _kVersionStampBuildHostnameStr, _kVersionStampBuildDirectoryStr, _kVersionStampBuildChangelistInt, _kVersionStampCitcSnapshotInt, _kVersionStampBuildClientMintStatusInt, _kVersionStampBuildTimestampInt, _kVersionStampVerifiableInt, _kVersionStampBuildCoverageEnabledInt, _kVersionStampBuildBaselineChangelistInt, _kVersionStampPrecookedTimestampStr, _kVersionStampPrecookedClientInfoStr, __indirect_function_table, _kVersionStampBuildHasHardeningAbsl, _kVersionStampBuildHasHardeningCfi, _kVersionStampBuildHasHardeningCfiRecover, _kVersionStampBuildHasHardeningLibcxx, _kVersionStampBuildHasHardeningLibcxxBoundedIterators, _kVersionStampBuildHasHardeningPie, _kVersionStampBuildHasHardeningSafeStack, _kVersionStampBuildHasHardeningSanitizeArrayBounds, _kVersionStampBuildHasHardeningStackAutoInit, _kVersionStampBuildHasHardeningStackProtectors, _kVersionStampBuildHasHardeningUcl, _kVersionStampBuildHasHardeningHeapAutoInit, _kVersionStampBuildHasHardeningProtobuf, _kVersionStampBuildHasHardeningScudoAlloc, _kVersionStampBuildHasHardeningWx, _kVersionStampBuildHasHardeningWxPropagate, wasmMemory, wasmTable;
      function assignWasmExports(wasmExports2) {
        _free = Module["_free"] = wasmExports2["de"];
        _malloc = Module["_malloc"] = wasmExports2["ee"];
        _interactive_segmenter_create = Module["_interactive_segmenter_create"] = wasmExports2["fe"];
        _interactive_segmenter_set_image = Module["_interactive_segmenter_set_image"] = wasmExports2["ge"];
        _interactive_segmenter_segment = Module["_interactive_segmenter_segment"] = wasmExports2["he"];
        _interactive_segmenter_close = Module["_interactive_segmenter_close"] = wasmExports2["ie"];
        _wgpuDeviceAddRef = wasmExports2["je"];
        _addBoundTextureAsImageToStream = Module["_addBoundTextureAsImageToStream"] = wasmExports2["ke"];
        _attachImageListener = Module["_attachImageListener"] = wasmExports2["le"];
        _attachImageVectorListener = Module["_attachImageVectorListener"] = wasmExports2["me"];
        _mediapipeLoggerGetEncodedApiKey = Module["_mediapipeLoggerGetEncodedApiKey"] = wasmExports2["ne"];
        _registerModelResourcesGraphService = Module["_registerModelResourcesGraphService"] = wasmExports2["oe"];
        _bindTextureToStream = Module["_bindTextureToStream"] = wasmExports2["pe"];
        _addBoundTextureToStream = Module["_addBoundTextureToStream"] = wasmExports2["qe"];
        _addDoubleToInputStream = Module["_addDoubleToInputStream"] = wasmExports2["re"];
        _addFloatToInputStream = Module["_addFloatToInputStream"] = wasmExports2["se"];
        _addBoolToInputStream = Module["_addBoolToInputStream"] = wasmExports2["te"];
        _addIntToInputStream = Module["_addIntToInputStream"] = wasmExports2["ue"];
        _addUintToInputStream = Module["_addUintToInputStream"] = wasmExports2["ve"];
        _addStringToInputStream = Module["_addStringToInputStream"] = wasmExports2["we"];
        _addRawDataSpanToInputStream = Module["_addRawDataSpanToInputStream"] = wasmExports2["xe"];
        _allocateBoolVector = Module["_allocateBoolVector"] = wasmExports2["ye"];
        _allocateFloatVector = Module["_allocateFloatVector"] = wasmExports2["ze"];
        _allocateDoubleVector = Module["_allocateDoubleVector"] = wasmExports2["Ae"];
        _allocateIntVector = Module["_allocateIntVector"] = wasmExports2["Be"];
        _allocateUintVector = Module["_allocateUintVector"] = wasmExports2["Ce"];
        _allocateStringVector = Module["_allocateStringVector"] = wasmExports2["De"];
        _addBoolVectorEntry = Module["_addBoolVectorEntry"] = wasmExports2["Ee"];
        _addFloatVectorEntry = Module["_addFloatVectorEntry"] = wasmExports2["Fe"];
        _addDoubleVectorEntry = Module["_addDoubleVectorEntry"] = wasmExports2["Ge"];
        _addIntVectorEntry = Module["_addIntVectorEntry"] = wasmExports2["He"];
        _addUintVectorEntry = Module["_addUintVectorEntry"] = wasmExports2["Ie"];
        _addStringVectorEntry = Module["_addStringVectorEntry"] = wasmExports2["Je"];
        _addBoolVectorToInputStream = Module["_addBoolVectorToInputStream"] = wasmExports2["Ke"];
        _addFloatVectorToInputStream = Module["_addFloatVectorToInputStream"] = wasmExports2["Le"];
        _addDoubleVectorToInputStream = Module["_addDoubleVectorToInputStream"] = wasmExports2["Me"];
        _addIntVectorToInputStream = Module["_addIntVectorToInputStream"] = wasmExports2["Ne"];
        _addUintVectorToInputStream = Module["_addUintVectorToInputStream"] = wasmExports2["Oe"];
        _addStringVectorToInputStream = Module["_addStringVectorToInputStream"] = wasmExports2["Pe"];
        _addFlatHashMapToInputStream = Module["_addFlatHashMapToInputStream"] = wasmExports2["Qe"];
        _addProtoToInputStream = Module["_addProtoToInputStream"] = wasmExports2["Re"];
        _addEmptyPacketToInputStream = Module["_addEmptyPacketToInputStream"] = wasmExports2["Se"];
        _addBoolToInputSidePacket = Module["_addBoolToInputSidePacket"] = wasmExports2["Te"];
        _addDoubleToInputSidePacket = Module["_addDoubleToInputSidePacket"] = wasmExports2["Ue"];
        _addFloatToInputSidePacket = Module["_addFloatToInputSidePacket"] = wasmExports2["Ve"];
        _addIntToInputSidePacket = Module["_addIntToInputSidePacket"] = wasmExports2["We"];
        _addUintToInputSidePacket = Module["_addUintToInputSidePacket"] = wasmExports2["Xe"];
        _addStringToInputSidePacket = Module["_addStringToInputSidePacket"] = wasmExports2["Ye"];
        _addRawDataSpanToInputSidePacket = Module["_addRawDataSpanToInputSidePacket"] = wasmExports2["Ze"];
        _addProtoToInputSidePacket = Module["_addProtoToInputSidePacket"] = wasmExports2["_e"];
        _addBoolVectorToInputSidePacket = Module["_addBoolVectorToInputSidePacket"] = wasmExports2["$e"];
        _addDoubleVectorToInputSidePacket = Module["_addDoubleVectorToInputSidePacket"] = wasmExports2["af"];
        _addFloatVectorToInputSidePacket = Module["_addFloatVectorToInputSidePacket"] = wasmExports2["bf"];
        _addIntVectorToInputSidePacket = Module["_addIntVectorToInputSidePacket"] = wasmExports2["cf"];
        _addUintVectorToInputSidePacket = Module["_addUintVectorToInputSidePacket"] = wasmExports2["df"];
        _addStringVectorToInputSidePacket = Module["_addStringVectorToInputSidePacket"] = wasmExports2["ef"];
        _attachBoolListener = Module["_attachBoolListener"] = wasmExports2["ff"];
        _attachBoolVectorListener = Module["_attachBoolVectorListener"] = wasmExports2["gf"];
        _attachDoubleListener = Module["_attachDoubleListener"] = wasmExports2["hf"];
        _attachDoubleVectorListener = Module["_attachDoubleVectorListener"] = wasmExports2["jf"];
        _attachFloatListener = Module["_attachFloatListener"] = wasmExports2["kf"];
        _attachFloatVectorListener = Module["_attachFloatVectorListener"] = wasmExports2["lf"];
        _attachIntListener = Module["_attachIntListener"] = wasmExports2["mf"];
        _attachIntVectorListener = Module["_attachIntVectorListener"] = wasmExports2["nf"];
        _attachUintListener = Module["_attachUintListener"] = wasmExports2["of"];
        _attachUintVectorListener = Module["_attachUintVectorListener"] = wasmExports2["pf"];
        _attachStringListener = Module["_attachStringListener"] = wasmExports2["qf"];
        _attachStringVectorListener = Module["_attachStringVectorListener"] = wasmExports2["rf"];
        _attachProtoListener = Module["_attachProtoListener"] = wasmExports2["sf"];
        _attachProtoVectorListener = Module["_attachProtoVectorListener"] = wasmExports2["tf"];
        _getGraphConfig = Module["_getGraphConfig"] = wasmExports2["uf"];
        ___getTypeName = wasmExports2["vf"];
        _emwgpuCreateBindGroup = wasmExports2["wf"];
        _emwgpuCreateBindGroupLayout = wasmExports2["xf"];
        _emwgpuCreateCommandBuffer = wasmExports2["yf"];
        _emwgpuCreateCommandEncoder = wasmExports2["zf"];
        _emwgpuCreateComputePassEncoder = wasmExports2["Af"];
        _emwgpuCreateComputePipeline = wasmExports2["Bf"];
        _emwgpuCreateExternalTexture = wasmExports2["Cf"];
        _emwgpuCreatePipelineLayout = wasmExports2["Df"];
        _emwgpuCreateQuerySet = wasmExports2["Ef"];
        _emwgpuCreateRenderBundle = wasmExports2["Ff"];
        _emwgpuCreateRenderBundleEncoder = wasmExports2["Gf"];
        _emwgpuCreateRenderPassEncoder = wasmExports2["Hf"];
        _emwgpuCreateRenderPipeline = wasmExports2["If"];
        _emwgpuCreateSampler = wasmExports2["Jf"];
        _emwgpuCreateSurface = wasmExports2["Kf"];
        _emwgpuCreateTexture = wasmExports2["Lf"];
        _emwgpuCreateTextureView = wasmExports2["Mf"];
        _emwgpuCreateAdapter = wasmExports2["Nf"];
        _emwgpuImportBuffer = wasmExports2["Of"];
        _emwgpuCreateDevice = wasmExports2["Pf"];
        _emwgpuCreateQueue = wasmExports2["Qf"];
        _emwgpuCreateShaderModule = wasmExports2["Rf"];
        _emwgpuOnCreateComputePipelineCompleted = wasmExports2["Sf"];
        _emwgpuOnCreateRenderPipelineCompleted = wasmExports2["Tf"];
        _clearSubgraphs = Module["_clearSubgraphs"] = wasmExports2["Uf"];
        _pushBinarySubgraph = Module["_pushBinarySubgraph"] = wasmExports2["Vf"];
        _pushTextSubgraph = Module["_pushTextSubgraph"] = wasmExports2["Wf"];
        _changeBinaryGraph = Module["_changeBinaryGraph"] = wasmExports2["Xf"];
        _changeTextGraph = Module["_changeTextGraph"] = wasmExports2["Yf"];
        _processGl = Module["_processGl"] = wasmExports2["Zf"];
        _process = Module["_process"] = wasmExports2["_f"];
        _bindTextureToCanvas = Module["_bindTextureToCanvas"] = wasmExports2["$f"];
        _requestShaderRefreshOnGraphChange = Module["_requestShaderRefreshOnGraphChange"] = wasmExports2["ag"];
        _waitUntilIdle = Module["_waitUntilIdle"] = wasmExports2["bg"];
        _closeGraph = Module["_closeGraph"] = wasmExports2["cg"];
        _setAutoRenderToScreen = Module["_setAutoRenderToScreen"] = wasmExports2["dg"];
        _emscripten_builtin_memalign = wasmExports2["ug"];
        _memalign = wasmExports2["vg"];
        __emscripten_tempret_set = wasmExports2["wg"];
        __emscripten_stack_restore = wasmExports2["xg"];
        __emscripten_stack_alloc = wasmExports2["yg"];
        _emscripten_stack_get_current = wasmExports2["zg"];
        dynCall_ji = wasmExports2["dynCall_ji"];
        dynCall_jii = wasmExports2["dynCall_jii"];
        dynCall_iiiijij = wasmExports2["dynCall_iiiijij"];
        dynCall_vij = wasmExports2["dynCall_vij"];
        dynCall_viiji = wasmExports2["dynCall_viiji"];
        dynCall_viji = wasmExports2["dynCall_viji"];
        dynCall_iij = wasmExports2["dynCall_iij"];
        dynCall_iiiijj = wasmExports2["dynCall_iiiijj"];
        dynCall_viijj = wasmExports2["dynCall_viijj"];
        dynCall_viiijjj = wasmExports2["dynCall_viiijjj"];
        dynCall_iiiji = wasmExports2["dynCall_iiiji"];
        dynCall_jjj = wasmExports2["dynCall_jjj"];
        dynCall_jiii = wasmExports2["dynCall_jiii"];
        dynCall_viijii = wasmExports2["dynCall_viijii"];
        dynCall_vijjj = wasmExports2["dynCall_vijjj"];
        dynCall_vj = wasmExports2["dynCall_vj"];
        dynCall_viij = wasmExports2["dynCall_viij"];
        dynCall_jiji = wasmExports2["dynCall_jiji"];
        dynCall_iiiiij = wasmExports2["dynCall_iiiiij"];
        dynCall_iiiiijj = wasmExports2["dynCall_iiiiijj"];
        dynCall_iiiiiijj = wasmExports2["dynCall_iiiiiijj"];
        memory = wasmMemory = wasmExports2["sd"];
        _kVersionStampBuildChangelistStr = Module["_kVersionStampBuildChangelistStr"] = wasmExports2["ud"].value;
        _kVersionStampCitcSnapshotStr = Module["_kVersionStampCitcSnapshotStr"] = wasmExports2["vd"].value;
        _kVersionStampCitcWorkspaceIdStr = Module["_kVersionStampCitcWorkspaceIdStr"] = wasmExports2["wd"].value;
        _kVersionStampSourceUriStr = Module["_kVersionStampSourceUriStr"] = wasmExports2["xd"].value;
        _kVersionStampBuildClientStr = Module["_kVersionStampBuildClientStr"] = wasmExports2["yd"].value;
        _kVersionStampBuildClientMintStatusStr = Module["_kVersionStampBuildClientMintStatusStr"] = wasmExports2["zd"].value;
        _kVersionStampBuildCompilerStr = Module["_kVersionStampBuildCompilerStr"] = wasmExports2["Ad"].value;
        _kVersionStampBuildDateTimePstStr = Module["_kVersionStampBuildDateTimePstStr"] = wasmExports2["Bd"].value;
        _kVersionStampBuildDepotPathStr = Module["_kVersionStampBuildDepotPathStr"] = wasmExports2["Cd"].value;
        _kVersionStampBuildIdStr = Module["_kVersionStampBuildIdStr"] = wasmExports2["Dd"].value;
        _kVersionStampBuildInfoStr = Module["_kVersionStampBuildInfoStr"] = wasmExports2["Ed"].value;
        _kVersionStampBuildLabelStr = Module["_kVersionStampBuildLabelStr"] = wasmExports2["Fd"].value;
        _kVersionStampBuildTargetStr = Module["_kVersionStampBuildTargetStr"] = wasmExports2["Gd"].value;
        _kVersionStampBuildTimestampStr = Module["_kVersionStampBuildTimestampStr"] = wasmExports2["Hd"].value;
        _kVersionStampBuildToolStr = Module["_kVersionStampBuildToolStr"] = wasmExports2["Id"].value;
        _kVersionStampG3BuildTargetStr = Module["_kVersionStampG3BuildTargetStr"] = wasmExports2["Jd"].value;
        _kVersionStampVerifiableStr = Module["_kVersionStampVerifiableStr"] = wasmExports2["Kd"].value;
        _kVersionStampBuildFdoTypeStr = Module["_kVersionStampBuildFdoTypeStr"] = wasmExports2["Ld"].value;
        _kVersionStampBuildBaselineChangelistStr = Module["_kVersionStampBuildBaselineChangelistStr"] = wasmExports2["Md"].value;
        _kVersionStampBuildLtoTypeStr = Module["_kVersionStampBuildLtoTypeStr"] = wasmExports2["Nd"].value;
        _kVersionStampBuildPropellerTypeStr = Module["_kVersionStampBuildPropellerTypeStr"] = wasmExports2["Od"].value;
        _kVersionStampBuildPghoTypeStr = Module["_kVersionStampBuildPghoTypeStr"] = wasmExports2["Pd"].value;
        _kVersionStampBuildFdoProfileChangelistStr = Module["_kVersionStampBuildFdoProfileChangelistStr"] = wasmExports2["Qd"].value;
        _kVersionStampBuildMemprofProfileChangelistStr = Module["_kVersionStampBuildMemprofProfileChangelistStr"] = wasmExports2["Rd"].value;
        _kVersionStampBuildUsernameStr = Module["_kVersionStampBuildUsernameStr"] = wasmExports2["Sd"].value;
        _kVersionStampBuildHostnameStr = Module["_kVersionStampBuildHostnameStr"] = wasmExports2["Td"].value;
        _kVersionStampBuildDirectoryStr = Module["_kVersionStampBuildDirectoryStr"] = wasmExports2["Ud"].value;
        _kVersionStampBuildChangelistInt = Module["_kVersionStampBuildChangelistInt"] = wasmExports2["Vd"].value;
        _kVersionStampCitcSnapshotInt = Module["_kVersionStampCitcSnapshotInt"] = wasmExports2["Wd"].value;
        _kVersionStampBuildClientMintStatusInt = Module["_kVersionStampBuildClientMintStatusInt"] = wasmExports2["Xd"].value;
        _kVersionStampBuildTimestampInt = Module["_kVersionStampBuildTimestampInt"] = wasmExports2["Yd"].value;
        _kVersionStampVerifiableInt = Module["_kVersionStampVerifiableInt"] = wasmExports2["Zd"].value;
        _kVersionStampBuildCoverageEnabledInt = Module["_kVersionStampBuildCoverageEnabledInt"] = wasmExports2["_d"].value;
        _kVersionStampBuildBaselineChangelistInt = Module["_kVersionStampBuildBaselineChangelistInt"] = wasmExports2["$d"].value;
        _kVersionStampPrecookedTimestampStr = Module["_kVersionStampPrecookedTimestampStr"] = wasmExports2["ae"].value;
        _kVersionStampPrecookedClientInfoStr = Module["_kVersionStampPrecookedClientInfoStr"] = wasmExports2["be"].value;
        __indirect_function_table = wasmTable = wasmExports2["ce"];
        _kVersionStampBuildHasHardeningAbsl = Module["_kVersionStampBuildHasHardeningAbsl"] = wasmExports2["eg"].value;
        _kVersionStampBuildHasHardeningCfi = Module["_kVersionStampBuildHasHardeningCfi"] = wasmExports2["fg"].value;
        _kVersionStampBuildHasHardeningCfiRecover = Module["_kVersionStampBuildHasHardeningCfiRecover"] = wasmExports2["gg"].value;
        _kVersionStampBuildHasHardeningLibcxx = Module["_kVersionStampBuildHasHardeningLibcxx"] = wasmExports2["hg"].value;
        _kVersionStampBuildHasHardeningLibcxxBoundedIterators = Module["_kVersionStampBuildHasHardeningLibcxxBoundedIterators"] = wasmExports2["ig"].value;
        _kVersionStampBuildHasHardeningPie = Module["_kVersionStampBuildHasHardeningPie"] = wasmExports2["jg"].value;
        _kVersionStampBuildHasHardeningSafeStack = Module["_kVersionStampBuildHasHardeningSafeStack"] = wasmExports2["kg"].value;
        _kVersionStampBuildHasHardeningSanitizeArrayBounds = Module["_kVersionStampBuildHasHardeningSanitizeArrayBounds"] = wasmExports2["lg"].value;
        _kVersionStampBuildHasHardeningStackAutoInit = Module["_kVersionStampBuildHasHardeningStackAutoInit"] = wasmExports2["mg"].value;
        _kVersionStampBuildHasHardeningStackProtectors = Module["_kVersionStampBuildHasHardeningStackProtectors"] = wasmExports2["ng"].value;
        _kVersionStampBuildHasHardeningUcl = Module["_kVersionStampBuildHasHardeningUcl"] = wasmExports2["og"].value;
        _kVersionStampBuildHasHardeningHeapAutoInit = Module["_kVersionStampBuildHasHardeningHeapAutoInit"] = wasmExports2["pg"].value;
        _kVersionStampBuildHasHardeningProtobuf = Module["_kVersionStampBuildHasHardeningProtobuf"] = wasmExports2["qg"].value;
        _kVersionStampBuildHasHardeningScudoAlloc = Module["_kVersionStampBuildHasHardeningScudoAlloc"] = wasmExports2["rg"].value;
        _kVersionStampBuildHasHardeningWx = Module["_kVersionStampBuildHasHardeningWx"] = wasmExports2["sg"].value;
        _kVersionStampBuildHasHardeningWxPropagate = Module["_kVersionStampBuildHasHardeningWxPropagate"] = wasmExports2["tg"].value;
      }
      var wasmImports = {
        /** @export */
        rd: BeginGlQueryTiming,
        /** @export */
        qd: EndGlQueryTiming,
        /** @export */
        pd: GetAdapterArchitecture,
        /** @export */
        od: GetAdapterDescription,
        /** @export */
        nd: GetAdapterDeviceName,
        /** @export */
        md: GetAdapterVendor,
        /** @export */
        ld: JsOnEmptyPacketListener,
        /** @export */
        kd: JsOnFloat32ArrayImageListener,
        /** @export */
        jd: JsOnFloat32ArrayImageVectorListener,
        /** @export */
        nb: JsOnSimpleListenerBinaryArray,
        /** @export */
        id: JsOnSimpleListenerBool,
        /** @export */
        hd: JsOnSimpleListenerDouble,
        /** @export */
        gd: JsOnSimpleListenerFloat,
        /** @export */
        fd: JsOnSimpleListenerInt,
        /** @export */
        ed: JsOnSimpleListenerString,
        /** @export */
        dd: JsOnSimpleListenerUint,
        /** @export */
        cd: JsOnUint8ArrayImageListener,
        /** @export */
        bd: JsOnUint8ArrayImageVectorListener,
        /** @export */
        S: JsOnVectorFinishedListener,
        /** @export */
        ad: JsOnVectorListenerBool,
        /** @export */
        $c: JsOnVectorListenerDouble,
        /** @export */
        _c: JsOnVectorListenerFloat,
        /** @export */
        Zc: JsOnVectorListenerInt,
        /** @export */
        Yc: JsOnVectorListenerProto,
        /** @export */
        Xc: JsOnVectorListenerString,
        /** @export */
        Wc: JsOnVectorListenerUint,
        /** @export */
        Vc: JsOnWebGLTextureListener,
        /** @export */
        Uc: JsOnWebGLTextureVectorListener,
        /** @export */
        Tc: JsWrapErrorListenerInternal,
        /** @export */
        mb: JsWrapImageConverter,
        /** @export */
        Sc: JsWrapLoggingHelpers,
        /** @export */
        v: JsWrapSimpleListeners,
        /** @export */
        lb: UseBottomLeftGpuOrigin,
        /** @export */
        wb: __asyncjs__mediapipe_map_buffer_jspi,
        /** @export */
        n: ___cxa_throw,
        /** @export */
        Rc: ___syscall_dup,
        /** @export */
        Qc: ___syscall_faccessat,
        /** @export */
        E: ___syscall_fcntl64,
        /** @export */
        Pc: ___syscall_fstat64,
        /** @export */
        Mb: ___syscall_ftruncate64,
        /** @export */
        Oc: ___syscall_getcwd,
        /** @export */
        Nc: ___syscall_getdents64,
        /** @export */
        Mc: ___syscall_getuid32,
        /** @export */
        Lc: ___syscall_ioctl,
        /** @export */
        Kc: ___syscall_lstat64,
        /** @export */
        Jc: ___syscall_mkdirat,
        /** @export */
        Ic: ___syscall_newfstatat,
        /** @export */
        Ra: ___syscall_openat,
        /** @export */
        Hc: ___syscall_readlinkat,
        /** @export */
        Gc: ___syscall_rmdir,
        /** @export */
        Fc: ___syscall_stat64,
        /** @export */
        kb: ___syscall_unlinkat,
        /** @export */
        Ec: ___syscall_utimensat,
        /** @export */
        zc: __abort_js,
        /** @export */
        Ib: __embind_register_bigint,
        /** @export */
        yc: __embind_register_bool,
        /** @export */
        xc: __embind_register_emval,
        /** @export */
        ib: __embind_register_float,
        /** @export */
        I: __embind_register_integer,
        /** @export */
        r: __embind_register_memory_view,
        /** @export */
        wc: __embind_register_std_string,
        /** @export */
        Pa: __embind_register_std_wstring,
        /** @export */
        vc: __embind_register_void,
        /** @export */
        ba: __emval_create_invoker,
        /** @export */
        q: __emval_decref,
        /** @export */
        Oa: __emval_get_global,
        /** @export */
        hb: __emval_get_property,
        /** @export */
        la: __emval_incref,
        /** @export */
        Na: __emval_instanceof,
        /** @export */
        aa: __emval_invoke,
        /** @export */
        va: __emval_new_cstring,
        /** @export */
        $: __emval_run_destructors,
        /** @export */
        gb: __emval_set_property,
        /** @export */
        uc: __emval_typeof,
        /** @export */
        Hb: __gmtime_js,
        /** @export */
        Gb: __localtime_js,
        /** @export */
        Fb: __mktime_js,
        /** @export */
        Eb: __mmap_js,
        /** @export */
        Db: __munmap_js,
        /** @export */
        tc: __tzset_js,
        /** @export */
        Lb: _clock_time_get,
        /** @export */
        sc: custom_emscripten_dbgn,
        /** @export */
        _: _emscripten_asm_const_int,
        /** @export */
        fb: _emscripten_asm_const_ptr,
        /** @export */
        Ma: _emscripten_errn,
        /** @export */
        rc: _emscripten_get_heap_max,
        /** @export */
        y: _emscripten_get_now,
        /** @export */
        R: _emscripten_has_asyncify,
        /** @export */
        qc: _emscripten_outn,
        /** @export */
        pc: _emscripten_pc_get_function,
        /** @export */
        oc: _emscripten_resize_heap,
        /** @export */
        eb: _emscripten_stack_snapshot,
        /** @export */
        nc: _emscripten_stack_unwind_buffer,
        /** @export */
        mc: _emscripten_webgl_create_context,
        /** @export */
        lc: _emscripten_webgl_destroy_context,
        /** @export */
        kc: _emscripten_webgl_get_context_attributes,
        /** @export */
        ka: _emscripten_webgl_get_current_context,
        /** @export */
        jc: _emscripten_webgl_make_context_current,
        /** @export */
        Q: _emscripten_webgpu_get_device,
        /** @export */
        ic: _emwgpuBufferDestroy,
        /** @export */
        hc: _emwgpuBufferGetMappedRange,
        /** @export */
        gc: _emwgpuBufferUnmap,
        /** @export */
        u: _emwgpuDelete,
        /** @export */
        fc: _emwgpuDeviceCreateBuffer,
        /** @export */
        Cb: _emwgpuDeviceCreateComputePipelineAsync,
        /** @export */
        Bb: _emwgpuDeviceCreateRenderPipelineAsync,
        /** @export */
        ec: _emwgpuDeviceCreateShaderModule,
        /** @export */
        dc: _emwgpuDeviceDestroy,
        /** @export */
        cc: _emwgpuWaitAny,
        /** @export */
        Dc: _environ_get,
        /** @export */
        Cc: _environ_sizes_get,
        /** @export */
        bc: _exit,
        /** @export */
        ma: _fd_close,
        /** @export */
        Kb: _fd_pread,
        /** @export */
        jb: _fd_read,
        /** @export */
        Jb: _fd_seek,
        /** @export */
        Qa: _fd_write,
        /** @export */
        b: _glActiveTexture,
        /** @export */
        ua: _glAttachShader,
        /** @export */
        ac: _glBindAttribLocation,
        /** @export */
        c: _glBindBuffer,
        /** @export */
        db: _glBindBufferBase,
        /** @export */
        t: _glBindFramebuffer,
        /** @export */
        a: _glBindTexture,
        /** @export */
        m: _glBindVertexArray,
        /** @export */
        cb: _glBlendEquation,
        /** @export */
        $b: _glBlendFunc,
        /** @export */
        j: _glBufferData,
        /** @export */
        P: _glClear,
        /** @export */
        O: _glClearColor,
        /** @export */
        fa: _glClientWaitSync,
        /** @export */
        ja: _glColorMask,
        /** @export */
        bb: _glCompileShader,
        /** @export */
        ab: _glCreateProgram,
        /** @export */
        La: _glCreateShader,
        /** @export */
        p: _glDeleteBuffers,
        /** @export */
        U: _glDeleteFramebuffers,
        /** @export */
        h: _glDeleteProgram,
        /** @export */
        ia: _glDeleteShader,
        /** @export */
        ta: _glDeleteSync,
        /** @export */
        D: _glDeleteTextures,
        /** @export */
        A: _glDeleteVertexArrays,
        /** @export */
        $a: _glDetachShader,
        /** @export */
        H: _glDisable,
        /** @export */
        o: _glDisableVertexAttribArray,
        /** @export */
        i: _glDrawArrays,
        /** @export */
        ha: _glDrawBuffers,
        /** @export */
        _b: _glEnable,
        /** @export */
        l: _glEnableVertexAttribArray,
        /** @export */
        _a: _glFenceSync,
        /** @export */
        sa: _glFinish,
        /** @export */
        x: _glFlush,
        /** @export */
        C: _glFramebufferTexture2D,
        /** @export */
        Za: _glFramebufferTextureLayer,
        /** @export */
        s: _glGenBuffers,
        /** @export */
        Z: _glGenFramebuffers,
        /** @export */
        G: _glGenTextures,
        /** @export */
        B: _glGenVertexArrays,
        /** @export */
        Ya: _glGetAttribLocation,
        /** @export */
        ga: _glGetError,
        /** @export */
        Zb: _glGetFloatv,
        /** @export */
        w: _glGetIntegerv,
        /** @export */
        Yb: _glGetProgramiv,
        /** @export */
        Xb: _glGetShaderInfoLog,
        /** @export */
        Wb: _glGetShaderiv,
        /** @export */
        N: _glGetString,
        /** @export */
        Vb: _glGetUniformBlockIndex,
        /** @export */
        d: _glGetUniformLocation,
        /** @export */
        Ub: _glLineWidth,
        /** @export */
        Xa: _glLinkProgram,
        /** @export */
        ra: _glPixelStorei,
        /** @export */
        qa: _glReadPixels,
        /** @export */
        Ka: _glShaderSource,
        /** @export */
        F: _glTexImage2D,
        /** @export */
        pa: _glTexParameterf,
        /** @export */
        Wa: _glTexParameterfv,
        /** @export */
        f: _glTexParameteri,
        /** @export */
        oa: _glTexStorage2D,
        /** @export */
        Tb: _glTexStorage3D,
        /** @export */
        T: _glTexSubImage2D,
        /** @export */
        Sb: _glTexSubImage3D,
        /** @export */
        M: _glUniform1f,
        /** @export */
        na: _glUniform1fv,
        /** @export */
        e: _glUniform1i,
        /** @export */
        Y: _glUniform2f,
        /** @export */
        Rb: _glUniform2fv,
        /** @export */
        Ja: _glUniform3f,
        /** @export */
        Va: _glUniform4f,
        /** @export */
        X: _glUniform4fv,
        /** @export */
        Qb: _glUniform4iv,
        /** @export */
        Pb: _glUniformBlockBinding,
        /** @export */
        Ob: _glUniformMatrix2fv,
        /** @export */
        Nb: _glUniformMatrix3fv,
        /** @export */
        Ia: _glUniformMatrix4fv,
        /** @export */
        g: _glUseProgram,
        /** @export */
        k: _glVertexAttribPointer,
        /** @export */
        W: _glViewport,
        /** @export */
        Ha: hardware_concurrency,
        /** @export */
        zb: mediapipe_create_utility_canvas2d,
        /** @export */
        yb: _mediapipe_find_canvas_event_target,
        /** @export */
        xb: mediapipe_import_external_texture,
        /** @export */
        vb: _mediapipe_webgl_tex_image_drawable,
        /** @export */
        Bc: _proc_exit,
        /** @export */
        Ac: _random_get,
        /** @export */
        Ga: _wgpuCommandEncoderBeginComputePass,
        /** @export */
        Fa: _wgpuCommandEncoderBeginRenderPass,
        /** @export */
        ub: _wgpuCommandEncoderCopyBufferToTexture,
        /** @export */
        tb: _wgpuCommandEncoderCopyTextureToBuffer,
        /** @export */
        sb: _wgpuCommandEncoderCopyTextureToTexture,
        /** @export */
        L: _wgpuCommandEncoderFinish,
        /** @export */
        Ea: _wgpuComputePassEncoderDispatchWorkgroups,
        /** @export */
        Da: _wgpuComputePassEncoderEnd,
        /** @export */
        Ca: _wgpuComputePassEncoderSetBindGroup,
        /** @export */
        Ba: _wgpuComputePassEncoderSetPipeline,
        /** @export */
        Aa: _wgpuComputePipelineGetBindGroupLayout,
        /** @export */
        ea: _wgpuDeviceCreateBindGroup,
        /** @export */
        rb: _wgpuDeviceCreateBindGroupLayout,
        /** @export */
        K: _wgpuDeviceCreateCommandEncoder,
        /** @export */
        qb: _wgpuDeviceCreateComputePipeline,
        /** @export */
        pb: _wgpuDeviceCreatePipelineLayout,
        /** @export */
        Ua: _wgpuDeviceCreateRenderPipeline,
        /** @export */
        V: _wgpuDeviceCreateSampler,
        /** @export */
        da: _wgpuDeviceCreateTexture,
        /** @export */
        J: _wgpuQueueSubmit,
        /** @export */
        Ab: _wgpuQueueWriteBuffer,
        /** @export */
        ob: _wgpuQueueWriteTexture,
        /** @export */
        za: _wgpuRenderPassEncoderDraw,
        /** @export */
        ya: _wgpuRenderPassEncoderEnd,
        /** @export */
        xa: _wgpuRenderPassEncoderSetBindGroup,
        /** @export */
        wa: _wgpuRenderPassEncoderSetPipeline,
        /** @export */
        Ta: _wgpuRenderPipelineGetBindGroupLayout,
        /** @export */
        z: _wgpuTextureCreateView,
        /** @export */
        Sa: _wgpuTextureDestroy,
        /** @export */
        ca: _wgpuTextureGetFormat
      };
      async function run() {
        preRun();
        if (runDependencies) {
          await resolveRunDependencies();
        }
        var setStatus = Module["setStatus"];
        if (setStatus) {
          setStatus("Running...");
          await new Promise((resolve) => setTimeout(resolve, 1));
          setTimeout(setStatus, 1, "");
        }
        if (ABORT) return;
        initRuntime();
        Module["onRuntimeInitialized"]?.();
        postRun();
      }
      var wasmExports;
      wasmExports = await createWasm();
      await run();
      return Module;
    };
  })();
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = ModuleFactory;
    module.exports.default = ModuleFactory;
  } else if (typeof define === "function" && define["amd"])
    define([], () => ModuleFactory);
  var vision_wasm_internal_default = ModuleFactory;

  // src/content/vision-models.js
  var asset = (path) => chrome.runtime.getURL(path);
  var FILESET = {
    wasmLoaderPath: "",
    // empty → MediaPipe skips its own script injection
    wasmBinaryPath: asset("wasm/vision_wasm_internal.wasm")
  };
  async function withGlue(create) {
    self.ModuleFactory = vision_wasm_internal_default;
    try {
      return await create();
    } finally {
      self.ModuleFactory = void 0;
    }
  }
  async function tryDelegates(build) {
    try {
      return await withGlue(() => build("GPU"));
    } catch (err) {
      console.info("[Snap Vanish] GPU delegate unavailable, using CPU", err);
      return withGlue(() => build("CPU"));
    }
  }
  var loading = null;
  function loadVisionModels() {
    loading ??= (async () => {
      const hands = await tryDelegates(
        (delegate) => Ac.createFromOptions(FILESET, {
          baseOptions: { modelAssetPath: asset("models/hand_landmarker.task"), delegate },
          runningMode: "VIDEO",
          numHands: 2,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.45,
          minTrackingConfidence: 0.45
        })
      );
      const people = await tryDelegates(
        (delegate) => Nc.createFromOptions(FILESET, {
          baseOptions: { modelAssetPath: asset("models/selfie_segmenter.tflite"), delegate },
          runningMode: "VIDEO",
          outputConfidenceMasks: true,
          outputCategoryMask: false
        })
      );
      return { hands, people };
    })();
    return loading;
  }

  // src/content/snap-gesture.js
  var L2 = {
    WRIST: 0,
    THUMB_TIP: 4,
    INDEX_MCP: 5,
    MIDDLE_MCP: 9,
    MIDDLE_TIP: 12,
    RING_MCP: 13,
    RING_TIP: 16,
    PINKY_MCP: 17,
    PINKY_TIP: 20
  };
  var dist = (a2, b2) => Math.hypot(a2.x - b2.x, a2.y - b2.y);
  function describeHand(points, aspect) {
    const p2 = points.map((q2) => ({ x: q2.x * aspect, y: q2.y }));
    const size = dist(p2[L2.WRIST], p2[L2.MIDDLE_MCP]) || 1e-3;
    const folded = (tip, mcp) => dist(p2[tip], p2[L2.WRIST]) < dist(p2[mcp], p2[L2.WRIST]) * 1.35;
    return {
      gap: dist(p2[L2.THUMB_TIP], p2[L2.MIDDLE_TIP]) / size,
      reach: dist(p2[L2.MIDDLE_TIP], p2[L2.WRIST]) / size,
      tip: p2[L2.MIDDLE_TIP],
      size,
      curled: (folded(L2.RING_TIP, L2.RING_MCP) ? 1 : 0) + (folded(L2.PINKY_TIP, L2.PINKY_MCP) ? 1 : 0)
    };
  }
  var SnapGesture = class {
    constructor() {
      this.tracks = /* @__PURE__ */ new Map();
      this.setSensitivity(5);
    }
    setSensitivity(level) {
      const s2 = Math.min(10, Math.max(1, Number(level) || 5)) / 10;
      this.loadGap = 0.2 + 0.18 * s2;
      this.fireGap = 0.75 - 0.2 * s2;
      this.reachDrop = 0.93 - 0.1 * s2;
      this.windowMs = 140 + 120 * s2;
      this.minCurled = s2 > 0.75 ? 0 : 1;
    }
    /**
     * @param {Array<{landmarks: Array, handedness: string}>} hands
     * @param {number} now   timestamp in ms
     * @param {number} aspect frame width / height
     * @returns {boolean} true on the frame a snap completes
     */
    update(hands, now, aspect) {
      let fired = false;
      const seen = /* @__PURE__ */ new Set();
      for (const { landmarks, handedness } of hands) {
        seen.add(handedness);
        const h2 = describeHand(landmarks, aspect);
        const track = this.tracks.get(handedness) ?? { loaded: null, loadedAt: -Infinity };
        if (h2.gap < this.loadGap && h2.curled >= this.minCurled) {
          track.loaded = h2;
          track.loadedAt = now;
        } else if (track.loaded && now - track.loadedAt <= this.windowMs) {
          const from = track.loaded;
          const opened = h2.gap > this.fireGap;
          const slammed = h2.reach < from.reach * this.reachDrop;
          const travel = dist(h2.tip, from.tip) / from.size;
          if (opened && slammed && travel > 0.35) {
            fired = true;
            track.loaded = null;
          }
        } else if (now - track.loadedAt > this.windowMs) {
          track.loaded = null;
        }
        this.tracks.set(handedness, track);
      }
      for (const [key, track] of this.tracks) {
        if (!seen.has(key) && now - track.loadedAt > this.windowMs) this.tracks.delete(key);
      }
      return fired;
    }
  };

  // src/content/empty-room.js
  var canvas = (w2, h2) => {
    const c2 = document.createElement("canvas");
    c2.width = w2;
    c2.height = h2;
    return c2;
  };
  var ROOM_W = 640;
  var EmptyRoom = class {
    constructor(width, height) {
      this.w = width;
      this.h = height;
      this.memory = canvas(width, height);
      this.memoryCtx = this.memory.getContext("2d", { willReadFrequently: true });
      this.cutout = canvas(width, height);
      this.cutoutCtx = this.cutout.getContext("2d");
      this.filler = canvas(width, height);
      this.fillerCtx = this.filler.getContext("2d");
      this.view = canvas(width, height);
      this.viewCtx = this.view.getContext("2d");
      this.aiBusy = false;
      this.aiReadyAt = 0;
      this.lastAiAsk = 0;
      this.learnedSinceAi = 0;
      this.holeShare = 1;
    }
    /** Blend the current frame into memory where no person is present. */
    learn(frame, personMask) {
      const { cutoutCtx: c2, memoryCtx: m2, w: w2, h: h2 } = this;
      c2.globalCompositeOperation = "copy";
      c2.drawImage(frame, 0, 0, w2, h2);
      c2.globalCompositeOperation = "destination-out";
      c2.drawImage(personMask, 0, 0, w2, h2);
      c2.globalCompositeOperation = "source-over";
      m2.globalCompositeOperation = "destination-over";
      m2.drawImage(this.cutout, 0, 0);
      m2.globalCompositeOperation = "source-over";
      m2.globalAlpha = 0.12;
      m2.drawImage(this.cutout, 0, 0);
      m2.globalAlpha = 1;
      this.learnedSinceAi++;
    }
    /** Known/unknown map at 1/4 resolution. A cell counts as known only if all
     *  of its pixels are fully learned, which keeps soft edges out of the AI's
     *  "trusted" area. */
    knownGrid() {
      const gw = Math.ceil(this.w / 4);
      const gh2 = Math.ceil(this.h / 4);
      const { data } = this.memoryCtx.getImageData(0, 0, this.w, this.h);
      const known = new Uint8Array(gw * gh2).fill(1);
      for (let y2 = 0; y2 < this.h; y2++) {
        for (let x2 = 0; x2 < this.w; x2++) {
          if (data[(y2 * this.w + x2) * 4 + 3] < 250) known[(y2 >> 2) * gw + (x2 >> 2)] = 0;
        }
      }
      let holes = 0;
      for (const k2 of known) holes += 1 - k2;
      this.holeShare = holes / known.length;
      return { known, gw, gh: gh2, data };
    }
    /** Fast fallback: push-pull pyramid fill of the holes (no AI). */
    quickFill() {
      const { known, gw, gh: gh2, data } = this.knownGrid();
      let level = { w: gw, h: gh2, rgb: new Float32Array(gw * gh2 * 3), wt: new Float32Array(gw * gh2) };
      for (let gy = 0; gy < gh2; gy++) {
        for (let gx = 0; gx < gw; gx++) {
          const i2 = gy * gw + gx;
          if (!known[i2]) continue;
          const p2 = (Math.min(this.h - 1, gy * 4 + 2) * this.w + Math.min(this.w - 1, gx * 4 + 2)) * 4;
          level.rgb[i2 * 3] = data[p2];
          level.rgb[i2 * 3 + 1] = data[p2 + 1];
          level.rgb[i2 * 3 + 2] = data[p2 + 2];
          level.wt[i2] = 1;
        }
      }
      const pyramid = [level];
      while (level.w > 1 || level.h > 1) {
        const w2 = Math.max(1, level.w >> 1);
        const h2 = Math.max(1, level.h >> 1);
        const next = { w: w2, h: h2, rgb: new Float32Array(w2 * h2 * 3), wt: new Float32Array(w2 * h2) };
        for (let y2 = 0; y2 < level.h; y2++) {
          for (let x2 = 0; x2 < level.w; x2++) {
            const s2 = y2 * level.w + x2;
            const d2 = Math.min(h2 - 1, y2 >> 1) * w2 + Math.min(w2 - 1, x2 >> 1);
            const wt2 = level.wt[s2];
            next.wt[d2] += wt2;
            next.rgb[d2 * 3] += level.rgb[s2 * 3] * wt2;
            next.rgb[d2 * 3 + 1] += level.rgb[s2 * 3 + 1] * wt2;
            next.rgb[d2 * 3 + 2] += level.rgb[s2 * 3 + 2] * wt2;
          }
        }
        for (let i2 = 0; i2 < w2 * h2; i2++) {
          if (next.wt[i2] > 0) {
            next.rgb[i2 * 3] /= next.wt[i2];
            next.rgb[i2 * 3 + 1] /= next.wt[i2];
            next.rgb[i2 * 3 + 2] /= next.wt[i2];
            next.wt[i2] = 1;
          }
        }
        pyramid.push(next);
        level = next;
      }
      for (let k2 = pyramid.length - 2; k2 >= 0; k2--) {
        const fine = pyramid[k2];
        const coarse = pyramid[k2 + 1];
        for (let y2 = 0; y2 < fine.h; y2++) {
          for (let x2 = 0; x2 < fine.w; x2++) {
            const i2 = y2 * fine.w + x2;
            if (fine.wt[i2] > 0) continue;
            const j2 = Math.min(coarse.h - 1, y2 >> 1) * coarse.w + Math.min(coarse.w - 1, x2 >> 1);
            fine.rgb[i2 * 3] = coarse.rgb[j2 * 3];
            fine.rgb[i2 * 3 + 1] = coarse.rgb[j2 * 3 + 1];
            fine.rgb[i2 * 3 + 2] = coarse.rgb[j2 * 3 + 2];
            fine.wt[i2] = 1;
          }
        }
      }
      const base = pyramid[0];
      const small = canvas(gw, gh2);
      const img = small.getContext("2d").createImageData(gw, gh2);
      for (let i2 = 0; i2 < gw * gh2; i2++) {
        img.data[i2 * 4] = base.rgb[i2 * 3];
        img.data[i2 * 4 + 1] = base.rgb[i2 * 3 + 1];
        img.data[i2 * 4 + 2] = base.rgb[i2 * 3 + 2];
        img.data[i2 * 4 + 3] = 255;
      }
      small.getContext("2d").putImageData(img, 0, 0);
      this.fillerCtx.imageSmoothingQuality = "high";
      this.fillerCtx.filter = "blur(6px)";
      this.fillerCtx.drawImage(small, 0, 0, this.w, this.h);
      this.fillerCtx.filter = "none";
    }
    get aiFresh() {
      return this.aiReadyAt > 0 && this.learnedSinceAi < 150;
    }
    /** Ask the offscreen MI-GAN worker to paint the unknown area. */
    async askAi({ force = false } = {}) {
      const now = performance.now();
      if (this.aiBusy || !force && now - this.lastAiAsk < 8e3) return;
      const { known, gw, gh: gh2 } = this.knownGrid();
      if (this.holeShare < 2e-3) {
        this.fillerCtx.drawImage(this.memory, 0, 0);
        this.aiReadyAt = now;
        this.learnedSinceAi = 0;
        return;
      }
      if (this.holeShare > 0.92) return;
      this.aiBusy = true;
      this.lastAiAsk = now;
      try {
        const maskSmall = canvas(gw, gh2);
        const mctx = maskSmall.getContext("2d");
        const mimg = mctx.createImageData(gw, gh2);
        known.forEach((k2, i2) => {
          const v2 = k2 ? 255 : 0;
          mimg.data.set([v2, v2, v2, 255], i2 * 4);
        });
        mctx.putImageData(mimg, 0, 0);
        const mask = canvas(this.w, this.h);
        const mk = mask.getContext("2d");
        mk.imageSmoothingEnabled = false;
        mk.drawImage(maskSmall, 0, 0, this.w, this.h);
        const photo = canvas(this.w, this.h);
        const pk = photo.getContext("2d");
        pk.drawImage(this.filler, 0, 0);
        pk.drawImage(this.memory, 0, 0);
        const learnedBefore = this.learnedSinceAi;
        const reply = await chrome.runtime.sendMessage({
          type: MSG.INPAINT,
          image: photo.toDataURL("image/png"),
          mask: mask.toDataURL("image/png")
        });
        if (!reply?.ok) throw new Error(reply?.error || "no reply from inpainter");
        const img = new Image();
        img.src = reply.image;
        await img.decode();
        this.fillerCtx.drawImage(img, 0, 0, this.w, this.h);
        this.aiReadyAt = performance.now();
        this.learnedSinceAi = Math.max(0, this.learnedSinceAi - learnedBefore);
      } catch (err) {
        console.warn("[Snap Vanish] AI room fill failed, using quick fill", err);
      } finally {
        this.aiBusy = false;
      }
    }
    /** Compose the room picture: AI/quick fill underneath, learned memory on top. */
    render() {
      this.viewCtx.drawImage(this.filler, 0, 0);
      this.viewCtx.drawImage(this.memory, 0, 0);
      return this.view;
    }
  };

  // src/content/dust-storm.js
  var ASH = [86, 78, 70];
  function hash(x2, y2) {
    let h2 = x2 * 374761393 + y2 * 668265263 | 0;
    h2 = Math.imul(h2 ^ h2 >>> 13, 1274126177);
    return ((h2 ^ h2 >>> 16) >>> 0) / 4294967295;
  }
  function blotch(x2, y2) {
    const xi2 = Math.floor(x2);
    const yi2 = Math.floor(y2);
    const fx = x2 - xi2;
    const fy = y2 - yi2;
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a2 = hash(xi2, yi2);
    const b2 = hash(xi2 + 1, yi2);
    const c2 = hash(xi2, yi2 + 1);
    const d2 = hash(xi2 + 1, yi2 + 1);
    return a2 + (b2 - a2) * sx + (c2 - a2) * sy + (a2 - b2 - c2 + d2) * sx * sy;
  }
  function windFor(direction, seed) {
    switch (direction) {
      case "left":
        return [-1, -0.25];
      case "up":
        return [0.15, -1];
      case "random": {
        const angle = -Math.PI * (0.1 + seed * 0.8);
        return [Math.cos(angle), Math.sin(angle)];
      }
      default:
        return [1, -0.25];
    }
  }
  var DustStorm = class {
    /**
     * @param {ImageData} pixels  snapshot of the frame (effect resolution)
     * @param {Uint8ClampedArray} alpha  person coverage 0..255, same size
     * @param {{seconds:number, direction:string}} opts
     */
    constructor(pixels, alpha, { seconds, direction }) {
      const { width: w2, height: h2, data } = pixels;
      this.w = w2;
      this.h = h2;
      this.seconds = seconds;
      this.out = new ImageData(w2, h2);
      this.out32 = new Uint32Array(this.out.data.buffer);
      let [wx, wy] = windFor(direction, Math.random());
      const len = Math.hypot(wx, wy);
      wx /= len;
      wy /= len;
      this.wind = [wx, wy];
      let count = 0;
      let minP = Infinity;
      let maxP = -Infinity;
      for (let i2 = 0; i2 < w2 * h2; i2++) {
        if (alpha[i2] > 90) {
          count++;
          const p2 = i2 % w2 * wx + (i2 / w2 | 0) * wy;
          if (p2 < minP) minP = p2;
          if (p2 > maxP) maxP = p2;
        }
      }
      this.count = count;
      this.x0 = new Float32Array(count);
      this.y0 = new Float32Array(count);
      this.start = new Float32Array(count);
      this.life = new Float32Array(count);
      this.speed = new Float32Array(count);
      this.phase = new Float32Array(count);
      this.rgb = new Uint32Array(count);
      const span = maxP - minP || 1;
      const peel = seconds * 0.62;
      let k2 = 0;
      for (let i2 = 0; i2 < w2 * h2; i2++) {
        if (alpha[i2] <= 90) continue;
        const x2 = i2 % w2;
        const y2 = i2 / w2 | 0;
        const along = 1 - (x2 * wx + y2 * wy - minP) / span;
        const n2 = blotch(x2 / 22, y2 / 22) * 0.65 + blotch(x2 / 6, y2 / 6) * 0.35;
        this.x0[k2] = x2;
        this.y0[k2] = y2;
        this.start[k2] = peel * (0.55 * along + 0.45 * n2);
        this.life[k2] = seconds * (0.18 + 0.22 * hash(x2 + 7, y2 + 3));
        this.speed[k2] = 0.6 + hash(x2 + 1, y2 + 9) * 0.9;
        this.phase[k2] = hash(x2 + 5, y2 + 2) * Math.PI * 2;
        const p2 = i2 * 4;
        this.rgb[k2] = data[p2] << 16 | data[p2 + 1] << 8 | data[p2 + 2];
        k2++;
      }
      this.total = peel + seconds * 0.42;
    }
    /** Total running time of the effect in seconds. */
    get duration() {
      return this.total;
    }
    /**
     * Draw the state at time t (seconds since the snap). For reappearing, call
     * with t running from duration down to 0.
     */
    paint(t2) {
      const { w: w2, h: h2, out32, wind } = this;
      out32.fill(0);
      const reach = Math.max(w2, h2) * 0.55;
      const [wx, wy] = wind;
      for (let k2 = 0; k2 < this.count; k2++) {
        const c2 = this.rgb[k2];
        const age = t2 - this.start[k2];
        let x2 = this.x0[k2];
        let y2 = this.y0[k2];
        let a2 = 255;
        let r2 = c2 >> 16 & 255;
        let g2 = c2 >> 8 & 255;
        let b2 = c2 & 255;
        if (age > 0) {
          const u2 = age / this.life[k2];
          if (u2 >= 1) continue;
          const s2 = this.speed[k2];
          const d2 = reach * s2 * (0.35 * u2 + 0.65 * u2 * u2);
          const curl = Math.sin(u2 * 5 + this.phase[k2]) * 14 * u2 * s2;
          x2 += wx * d2 - wy * curl;
          y2 += wy * d2 + wx * curl - 18 * u2 * u2;
          const ash = Math.min(1, u2 * 2.4);
          r2 += (ASH[0] - r2) * ash;
          g2 += (ASH[1] - g2) * ash;
          b2 += (ASH[2] - b2) * ash;
          a2 = 255 * (1 - u2) * (1 - u2 * 0.35);
          if ((k2 & 3) === 0 && u2 > 0.15) continue;
        } else if (age > -0.08) {
          const f2 = (age + 0.08) / 0.08;
          r2 *= 1 - 0.45 * f2;
          g2 *= 1 - 0.45 * f2;
          b2 *= 1 - 0.45 * f2;
        }
        const xi2 = x2 | 0;
        const yi2 = y2 | 0;
        if (xi2 < 0 || yi2 < 0 || xi2 >= w2 || yi2 >= h2) continue;
        const px = (a2 & 255) << 24 | (b2 & 255) << 16 | (g2 & 255) << 8 | r2 & 255;
        out32[yi2 * w2 + xi2] = px;
        if (age > 0 && k2 % 3 === 0 && xi2 + 1 < w2 && yi2 + 1 < h2) {
          out32[yi2 * w2 + xi2 + 1] = px;
          out32[(yi2 + 1) * w2 + xi2] = px;
        }
      }
      return this.out;
    }
  };

  // src/content/vanishing-act.js
  var MASK_W = 160;
  var COOLDOWN_MS = 1600;
  var makeCanvas = (w2, h2) => {
    const c2 = document.createElement("canvas");
    c2.width = w2;
    c2.height = h2;
    return c2;
  };
  var VanishingAct = class {
    constructor({ track, output, prefs: prefs2, ear: ear2, mic: mic2, onChange }) {
      this.track = track;
      this.output = output;
      this.outCtx = output.getContext("2d", { alpha: false });
      this.prefs = prefs2;
      this.ear = ear2;
      this.mic = mic2;
      this.onChange = onChange;
      this.state = "present";
      this.models = null;
      this.modelError = null;
      this.gesture = new SnapGesture();
      this.gesture.setSensitivity(prefs2.sensitivity);
      this.pendingSnapAt = 0;
      this.lastToggle = 0;
      this.frameNo = 0;
      this.closed = false;
      loadVisionModels().then((m2) => this.models = m2).catch((err) => {
        this.modelError = err;
        console.error("[Snap Vanish] could not load vision models", err);
      });
      this.run();
    }
    setPrefs(prefs2) {
      this.prefs = prefs2;
      this.gesture.setSensitivity(prefs2.sensitivity);
    }
    // ---------------------------------------------------------------- frames
    async run() {
      if ("MediaStreamTrackProcessor" in window) {
        const reader = new MediaStreamTrackProcessor({ track: this.track }).readable.getReader();
        while (!this.closed) {
          const { value: frame, done } = await reader.read().catch(() => ({ done: true }));
          if (done) break;
          try {
            this.tick(frame, frame.displayWidth, frame.displayHeight);
          } catch (err) {
            console.error("[Snap Vanish] frame error", err);
          } finally {
            frame.close();
          }
        }
      } else {
        const video = document.createElement("video");
        video.muted = true;
        video.playsInline = true;
        video.srcObject = new MediaStream([this.track]);
        await video.play().catch(() => {
        });
        const step = () => {
          if (this.closed || this.track.readyState === "ended") return this.close();
          if (video.videoWidth) this.tick(video, video.videoWidth, video.videoHeight);
          video.requestVideoFrameCallback(step);
        };
        video.requestVideoFrameCallback(step);
      }
      this.close();
    }
    ensureBuffers(w2, h2) {
      if (this.frameW === w2 && this.frameH === h2) return;
      this.frameW = w2;
      this.frameH = h2;
      this.output.width = w2;
      this.output.height = h2;
      const rh2 = Math.round(ROOM_W * h2 / w2);
      this.work = makeCanvas(ROOM_W, rh2);
      this.workCtx = this.work.getContext("2d", { willReadFrequently: true });
      const mh2 = Math.round(MASK_W * h2 / w2);
      this.maskW = MASK_W;
      this.maskH = mh2;
      this.coverage = new Uint8ClampedArray(MASK_W * mh2);
      this.grown = new Uint8ClampedArray(MASK_W * mh2);
      this.maskImg = new ImageData(MASK_W, mh2);
      this.maskSmall = makeCanvas(MASK_W, mh2);
      this.softMask = makeCanvas(ROOM_W, rh2);
      this.softCtx = this.softMask.getContext("2d");
      this.patch = makeCanvas(ROOM_W, rh2);
      this.patchCtx = this.patch.getContext("2d");
      this.dustLayer = makeCanvas(ROOM_W, rh2);
      this.dustCtx = this.dustLayer.getContext("2d");
      this.room = new EmptyRoom(ROOM_W, rh2);
      this.haveMask = false;
    }
    tick(source, w2, h2) {
      if (!w2 || !h2) return;
      this.ensureBuffers(w2, h2);
      const now = performance.now();
      this.frameNo++;
      this.workCtx.drawImage(source, 0, 0, this.work.width, this.work.height);
      const busy = this.state !== "present";
      if (this.models) {
        this.watchHands(now);
        if (busy || this.frameNo % 2 === 0) this.segment(now);
        if (this.haveMask && this.frameNo % 3 === 0) {
          this.room.learn(this.work, this.softMask);
          if (!busy) this.room.askAi();
        }
      }
      this.paint(source, now);
    }
    watchHands(now) {
      const res = this.models.hands.detectForVideo(this.work, now);
      const hands = (res.landmarks || []).map((landmarks, i2) => ({
        landmarks,
        handedness: res.handedness?.[i2]?.[0]?.categoryName || String(i2)
      }));
      const aspect = this.work.width / this.work.height;
      if (this.gesture.update(hands, now, aspect)) this.pendingSnapAt = now;
      if (this.pendingSnapAt) {
        const needSound = this.prefs.confirmWithSound && this.ear.listening;
        if (!needSound || this.ear.heardClickNear(this.pendingSnapAt)) {
          this.pendingSnapAt = 0;
          this.toggle("snap");
        } else if (now - this.pendingSnapAt > 450) {
          this.pendingSnapAt = 0;
        }
      }
    }
    segment(now) {
      this.models.people.segmentForVideo(this.work, now, (result) => {
        const mask = result.confidenceMasks?.[0];
        if (!mask) return;
        const conf = mask.getAsFloat32Array();
        this.shrinkMask(conf, mask.width, mask.height);
        mask.close?.();
      });
    }
    /** Downsample confidences, dilate, feather, and refresh softMask. */
    shrinkMask(conf, mw, mh2) {
      const { maskW: w2, maskH: h2, coverage, grown } = this;
      for (let y2 = 0; y2 < h2; y2++) {
        const sy = Math.min(mh2 - 1, Math.floor((y2 + 0.5) * mh2 / h2));
        for (let x2 = 0; x2 < w2; x2++) {
          const sx = Math.min(mw - 1, Math.floor((x2 + 0.5) * mw / w2));
          coverage[y2 * w2 + x2] = conf[sy * mw + sx] * 255;
        }
      }
      const r2 = 3;
      const tmp = new Uint8ClampedArray(w2 * h2);
      for (let y2 = 0; y2 < h2; y2++) {
        for (let x2 = 0; x2 < w2; x2++) {
          let m2 = 0;
          for (let k2 = -r2; k2 <= r2; k2++) {
            const xx = x2 + k2;
            if (xx >= 0 && xx < w2) m2 = Math.max(m2, coverage[y2 * w2 + xx]);
          }
          tmp[y2 * w2 + x2] = m2;
        }
      }
      for (let y2 = 0; y2 < h2; y2++) {
        for (let x2 = 0; x2 < w2; x2++) {
          let m2 = 0;
          for (let k2 = -r2; k2 <= r2; k2++) {
            const yy = y2 + k2;
            if (yy >= 0 && yy < h2) m2 = Math.max(m2, tmp[yy * w2 + x2]);
          }
          grown[y2 * w2 + x2] = m2 > 70 ? 255 : m2 * 3;
        }
      }
      const px = this.maskImg.data;
      for (let i2 = 0; i2 < w2 * h2; i2++) {
        px[i2 * 4] = px[i2 * 4 + 1] = px[i2 * 4 + 2] = 255;
        px[i2 * 4 + 3] = grown[i2];
      }
      this.maskSmall.getContext("2d").putImageData(this.maskImg, 0, 0);
      const s2 = this.softCtx;
      s2.clearRect(0, 0, this.softMask.width, this.softMask.height);
      s2.filter = "blur(5px)";
      s2.drawImage(this.maskSmall, 0, 0, this.softMask.width, this.softMask.height);
      s2.filter = "none";
      this.haveMask = true;
    }
    // ---------------------------------------------------------------- output
    /** Cover the person with the empty-room picture. */
    drawRoomOverPerson() {
      const p2 = this.patchCtx;
      const { width: w2, height: h2 } = this.patch;
      p2.globalCompositeOperation = "copy";
      p2.drawImage(this.softMask, 0, 0);
      p2.globalCompositeOperation = "source-in";
      p2.drawImage(this.room.render(), 0, 0);
      p2.globalCompositeOperation = "source-over";
      this.outCtx.drawImage(this.patch, 0, 0, w2, h2, 0, 0, this.frameW, this.frameH);
    }
    paint(source, now) {
      const ctx = this.outCtx;
      ctx.drawImage(source, 0, 0, this.frameW, this.frameH);
      if (this.state === "present" || !this.haveMask) return;
      this.drawRoomOverPerson();
      if (this.state === "dissolving" || this.state === "reforming") {
        const elapsed = (now - this.effectStart) / 1e3;
        const d2 = this.storm.duration;
        const t2 = this.state === "dissolving" ? elapsed : d2 - elapsed;
        this.dustCtx.putImageData(this.storm.paint(Math.max(0, Math.min(d2, t2))), 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(this.dustLayer, 0, 0, this.frameW, this.frameH);
        if (elapsed >= d2) {
          if (this.state === "dissolving") {
            this.setState("gone");
          } else {
            this.setState("present");
            if (this.prefs.muteMic) this.mic.unmute();
          }
          this.storm = null;
        }
      }
    }
    // ---------------------------------------------------------------- control
    /** Snapshot the person right now and turn them into a DustStorm. */
    captureStorm() {
      const { width: w2, height: h2 } = this.work;
      const pixels = this.workCtx.getImageData(0, 0, w2, h2);
      const a2 = makeCanvas(w2, h2);
      const actx = a2.getContext("2d", { willReadFrequently: true });
      const img = new ImageData(this.maskW, this.maskH);
      for (let i2 = 0; i2 < this.coverage.length; i2++) {
        img.data[i2 * 4 + 3] = this.coverage[i2];
      }
      const small = makeCanvas(this.maskW, this.maskH);
      small.getContext("2d").putImageData(img, 0, 0);
      actx.filter = "blur(1.5px)";
      actx.drawImage(small, 0, 0, w2, h2);
      const rgba = actx.getImageData(0, 0, w2, h2).data;
      const alpha = new Uint8ClampedArray(w2 * h2);
      for (let i2 = 0; i2 < alpha.length; i2++) alpha[i2] = rgba[i2 * 4 + 3];
      return new DustStorm(pixels, alpha, {
        seconds: Number(this.prefs.dustSeconds) || 3,
        direction: this.prefs.direction
      });
    }
    toggle(reason = "manual") {
      const now = performance.now();
      if (now - this.lastToggle < COOLDOWN_MS && reason === "snap") return;
      if (!this.haveMask) return;
      this.lastToggle = now;
      if (this.state === "present") {
        if (!this.room.aiFresh) {
          this.room.quickFill();
          this.room.askAi({ force: true });
        }
        this.storm = this.captureStorm();
        this.effectStart = now;
        this.setState("dissolving");
        if (this.prefs.muteMic) this.mic.mute();
      } else if (this.state === "gone") {
        this.storm = this.captureStorm();
        this.effectStart = now;
        this.setState("reforming");
      } else if (this.state === "dissolving" || this.state === "reforming") {
        const elapsed = (now - this.effectStart) / 1e3;
        this.effectStart = now - (this.storm.duration - elapsed) * 1e3;
        const reforming = this.state === "dissolving";
        this.setState(reforming ? "reforming" : "dissolving");
        if (!reforming && this.prefs.muteMic) this.mic.mute();
      }
      console.info(`[Snap Vanish] ${reason} \u2192 ${this.state}`);
    }
    setState(s2) {
      this.state = s2;
      this.onChange?.();
    }
    status() {
      return {
        state: this.state,
        ready: !!this.models && this.haveMask,
        error: this.modelError ? String(this.modelError.message || this.modelError) : null,
        aiFill: this.room?.aiReadyAt ? "ready" : this.room?.aiBusy ? "working" : "waiting",
        listening: this.ear.listening
      };
    }
    close() {
      if (this.closed) return;
      this.closed = true;
      if (this.state !== "present" && this.prefs.muteMic) this.mic.unmute();
      this.onChange?.(this);
    }
  };

  // src/content/click-ear.js
  var ClickEar = class {
    constructor() {
      this.ctx = null;
      this.source = null;
      this.copy = null;
      this.clicks = [];
      this.floor = 4e-3;
      this.setSensitivity(5);
    }
    get listening() {
      return !!this.copy && this.copy.readyState === "live";
    }
    setSensitivity(level) {
      const s2 = Math.min(10, Math.max(1, Number(level) || 5)) / 10;
      this.ratio = 9 - 5 * s2;
      this.minLevel = 0.03 - 0.018 * s2;
    }
    listenTo(micTrack) {
      if (this.listening) return;
      this.stop();
      try {
        this.origin = micTrack;
        this.copy = micTrack.clone();
        this.copy.enabled = true;
        this.ctx = new AudioContext({ latencyHint: "interactive" });
        this.source = this.ctx.createMediaStreamSource(new MediaStream([this.copy]));
        const tap = this.ctx.createScriptProcessor(512, 1, 1);
        const silent = this.ctx.createGain();
        silent.gain.value = 0;
        tap.onaudioprocess = (e2) => this.inspect(e2.inputBuffer.getChannelData(0));
        this.source.connect(tap).connect(silent).connect(this.ctx.destination);
        this.ctx.resume().catch(() => {
        });
      } catch (err) {
        console.warn("[Snap Vanish] mic confirmation unavailable", err);
        this.stop();
      }
    }
    inspect(samples) {
      let sum = 0;
      let peak = 0;
      for (let i2 = 1; i2 < samples.length; i2++) {
        const d2 = samples[i2] - samples[i2 - 1];
        sum += d2 * d2;
        const a2 = Math.abs(d2);
        if (a2 > peak) peak = a2;
      }
      const level = Math.sqrt(sum / (samples.length - 1));
      const crest = peak / (level || 1e-6);
      if (level > this.minLevel && level > this.floor * this.ratio && crest > 3.2) {
        const latency = (this.ctx.baseLatency || 0) * 1e3;
        this.clicks.push(performance.now() - latency);
        if (this.clicks.length > 12) this.clicks.shift();
      }
      const target = Math.min(level, this.floor * 3);
      this.floor += (target - this.floor) * 0.02;
      this.floor = Math.max(this.floor, 15e-4);
    }
    heardClickNear(t2, before = 300, after = 350) {
      return this.clicks.some((c2) => c2 >= t2 - before && c2 <= t2 + after);
    }
    stop() {
      try {
        this.source?.disconnect();
      } catch {
      }
      this.copy?.stop();
      this.ctx?.close().catch(() => {
      });
      this.ctx = this.source = this.copy = this.origin = null;
    }
  };

  // src/content/mic-switch.js
  var MicSwitch = class {
    constructor() {
      this.tracks = /* @__PURE__ */ new Set();
      this.mutedByUs = /* @__PURE__ */ new Set();
    }
    adopt(track) {
      this.tracks.add(track);
    }
    live() {
      for (const t2 of this.tracks) if (t2.readyState === "ended") this.tracks.delete(t2);
      return [...this.tracks];
    }
    mute() {
      for (const t2 of this.live()) {
        if (t2.enabled) {
          t2.enabled = false;
          this.mutedByUs.add(t2);
        }
      }
    }
    unmute() {
      for (const t2 of this.mutedByUs) if (t2.readyState === "live") t2.enabled = true;
      this.mutedByUs.clear();
    }
  };

  // src/content/main.js
  var prefs = { ...PREF_DEFAULTS };
  var acts = /* @__PURE__ */ new Set();
  var ear = new ClickEar();
  var mic = new MicSwitch();
  loadPrefs().then((p2) => applyPrefs(p2));
  watchPrefs((patch) => applyPrefs({ ...prefs, ...patch }));
  function applyPrefs(next) {
    prefs = next;
    ear.setSensitivity(prefs.sensitivity);
    for (const act of acts) act.setPrefs(prefs);
  }
  function hearWith(track) {
    if (!ear.listening && track.readyState === "live") ear.listenTo(track);
  }
  document.addEventListener(
    "snapvanish:port",
    (event) => {
      const port = event.target;
      const holder = port.querySelector("video");
      const stream = holder?.srcObject;
      if (!stream) return;
      for (const t2 of stream.getAudioTracks()) {
        mic.adopt(t2);
        hearWith(t2);
      }
      if (event.detail !== "camera" || !prefs.enabled) return;
      const track = stream.getVideoTracks()[0];
      const output = port.querySelector("canvas");
      if (!track || !output) return;
      const act = new VanishingAct({
        track,
        output,
        prefs,
        ear,
        mic,
        onChange: (closing) => {
          if (closing) acts.delete(closing);
        }
      });
      acts.add(act);
      port.setAttribute("data-accepted", "1");
    },
    true
  );
  var wakeAudio = () => ear.ctx?.state === "suspended" && ear.ctx.resume().catch(() => {
  });
  addEventListener("pointerdown", wakeAudio, true);
  addEventListener("keydown", wakeAudio, true);
  setInterval(() => {
    if (ear.origin && ear.origin.readyState === "ended") ear.stop();
    if (!ear.listening && acts.size) {
      const next = mic.live().find((t2) => t2.readyState === "live");
      if (next) ear.listenTo(next);
    }
  }, 1500);
  chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
    if (!acts.size) return false;
    const act = [...acts].at(-1);
    if (msg?.type === MSG.TOGGLE) {
      act.toggle(msg.reason || "button");
      reply(act.status());
    } else if (msg?.type === MSG.STATUS) {
      reply(act.status());
    }
    return false;
  });
})();
