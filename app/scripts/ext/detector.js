/**
 * code source form https://github.com/matthewhudson/detector.js
 */
define([
    'marionette'
], function (Marionette) {
    "use strict";

    var detector = {};
    detector.userDevice = {};

    detector._doc_element = window.document.documentElement;
    detector._user_agent = window.navigator.userAgent.toLowerCase();

    detector.ios = function () {
        return detector.iphone() || detector.ipod() || detector.ipad();
    };

    detector.iphone = function () {
        return detector._find('iphone');
    };

    detector.ipod = function () {
        return detector._find('ipod');
    };

    detector.ipad = function () {
        return detector._find('ipad');
    };

    detector.android = function () {
        return detector._find('android');
    };

    detector.androidPhone = function () {
        return detector.android() && detector._find('mobile');
    };

    detector.androidTablet = function () {
        return detector.android() && !detector._find('mobile');
    };

    detector.blackberry = function () {
        return detector._find('blackberry') || detector._find('bb10') || detector._find('rim');
    };

    detector.blackberryPhone = function () {
        return detector.blackberry() && !detector._find('tablet');
    };

    detector.blackberryTablet = function () {
        return detector.blackberry() && detector._find('tablet');
    };

    detector.windows = function () {
        return detector._find('windows');
    };

    detector.windowsPhone = function () {
        return detector.windows() && detector._find('phone');
    };

    detector.windowsTablet = function () {
        return detector.windows() && detector._find('touch');
    };

    detector.fxos = function () {
        return (detector._find('(mobile;') || detector._find('(tablet;')) && detector._find('; rv:');
    };

    detector.fxosPhone = function () {
        return detector.fxos() && detector._find('mobile');
    };

    detector.fxosTablet = function () {
        return detector.fxos() && detector._find('tablet');
    };

    detector.meego = function () {
        return detector._find('meego');
    };

    detector.mobile = function () {
        return detector.androidPhone() || detector.iphone() || detector.ipod() || detector.windowsPhone() || detector.blackberryPhone() || detector.fxosPhone() || detector.meego();
    };

    detector.tablet = function () {
        return detector.ipad() || detector.androidTablet() || detector.blackberryTablet() || detector.windowsTablet() || detector.fxosTablet();
    };

    detector.portrait = function () {
        return Math.abs(window.orientation) !== 90;
    };

    detector.landscape = function () {
        return Math.abs(window.orientation) === 90;
    };

    detector._find = function (needle) {
        return detector._user_agent.indexOf(needle) !== -1;
    };

    detector._getBrowser = function () {
        var N = navigator.appName, ua = navigator.userAgent, tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M[0];
    };

    detector._getBrowserVersion = function () {
        var N = navigator.appName, ua = navigator.userAgent, tem;
        var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        M = M ? [M[1], M[2]] : [N, navigator.appVersion, '-?'];
        return M[1];
    };

    detector._getBrowserData = function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
        return M.join(' ');
    };

    detector._getOs = function () {
        if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1) return"Linux";
        return "Unknown OS";
    };

    detector._set = function (data) {
        var data = data.split(" ");
        detector.userDevice.type = data[0] || null;
        detector.userDevice.os = data[1] || null;
        detector.userDevice.subType = data[2] || null
        detector.userDevice.scrHeight = screen.height;
        detector.userDevice.scrWidth = screen.width;
        detector.userDevice.browser = detector._getBrowserData();
        detector.userDevice.orientation = (detector.landscape()) ? "landscape" : "portrait";
    }

    if (detector.ios()) {
        if (detector.ipad()) {
            detector._set("tablet ios ipad");
        } else if (detector.iphone()) {
            detector._set("mobile ios iphone");
        } else if (detector.ipod()) {
            detector._set("mobile ios ipod");
        }
    } else if (detector.android()) {
        if (detector.androidTablet()) {
            detector._set("tablet android");
        } else {
            detector._set("mobile android");
        }
    } else if (detector.blackberry()) {
        if (detector.blackberryTablet()) {
            detector._set("tablet blackberry");
        } else {
            detector._set("mobile blackberry");
        }
    } else if (detector.windows()) {
        if (detector.windowsTablet()) {
            detector._set("tablet windows");
        } else if (detector.windowsPhone()) {
            detector._set("mobile windows");
        } else {
            detector._set("desktop windows");
        }
    } else if (detector.fxos()) {
        if (detector.fxosTablet()) {
            detector._set("tablet fxos");
        } else {
            detector._set("mobile fxos");
        }
    } else if (detector.meego()) {
        detector._set("mobile meego");
    } else {
        detector._set("desktop " + detector._getOs());
    }

    return detector.userDevice;
});