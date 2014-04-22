define(["app"], function (DeviceManager) {
    "use strict";
    DeviceManager.module("DevicesApp", function (DevicesApp, DeviceManager, Backbone, Marionette, $, _) {
        DevicesApp.startWithParent = false;

        DevicesApp.onStart = function () {
            console.log("starting DevicesApp");
        };

        DevicesApp.onStop = function () {
            console.log("stopping DevicesApp");
        };
    });

    DeviceManager.module("Routers.DevicesApp", function (DevicesAppRouter, DeviceManager, Backbone, Marionette, $, _) {
        DevicesAppRouter.Router = Marionette.AppRouter.extend({
            appRoutes: {
                "devices(/filter/criterion::criterion)": "listDevices",
                "devices/:id": "showDevice"
            }
        });

        var executeAction = function (action, arg) {
            DeviceManager.startSubApp("DevicesApp");
            action(arg);
        };

        var API = {
            listDevices: function (criterion) {
                require(["apps/devices/list/list_controller"], function (ListController) {
                    executeAction(ListController.listDevices, criterion);
                });
            },

            showDevice: function (id) {
                require(["apps/devices/show/show_controller"], function (ShowController) {
                    executeAction(ShowController.showDevice, id);
                });
            }
        };

        DeviceManager.on("device:list", function () {
            DeviceManager.navigate("devices");
            API.listDevices();
        });

        DeviceManager.on("devices:filter", function (criterion) {
            if (criterion) {
                DeviceManager.navigate("devices/filter/criterion:" + criterion);
            }
            else {
                DeviceManager.navigate("devices");
            }
        });

        DeviceManager.on("device:show", function (id) {
            DeviceManager.navigate("devices/" + id);
            API.showDevice(id);
        });

        DeviceManager.addInitializer(function () {
            new DevicesAppRouter.Router({
                controller: API
            });
        });
    });

    return DeviceManager.DevicesAppRouter;
});
