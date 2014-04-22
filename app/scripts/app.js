define(["marionette", "apps/config/marionette/regions/dialog"], function (Marionette, Dialog) {
    "use strict";
    var DeviceManager = new Marionette.Application();

    DeviceManager.addRegions({
        headerRegion: "#header-region",
        mainRegion: "#main-region",
        dialogRegion: Marionette.Region.Dialog.extend({
            el: "#dialog-region"
        })
    });

    DeviceManager.navigate = function (route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    DeviceManager.getCurrentRoute = function () {
        return Backbone.history.fragment
    };

    DeviceManager.startSubApp = function (appName, args) {
        var currentApp = appName ? DeviceManager.module(appName) : null;
        if (DeviceManager.currentApp === currentApp) {
            return;
        }

        if (DeviceManager.currentApp) {
            DeviceManager.currentApp.stop();
        }

        DeviceManager.currentApp = currentApp;
        if (currentApp) {
            currentApp.start(args);
        }
    };

    DeviceManager.on("initialize:after", function () {

        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            options.crossDomain = true;
            options.xhrFields = {
                withCredentials: true
            };
            options.url = '/device/api/web/app_dev.php/api/v1' + options.url;
        });

        if (Backbone.history) {
            require(["apps/devices/devices_app"], function () {
                Backbone.history.start();

                if (DeviceManager.getCurrentRoute() === "") {
                    DeviceManager.trigger("device:list");
                }
            });
        }
    });

    return DeviceManager;
});
