define(["app", "apps/devices/show/show_view"], function (DeviceManager, View) {
    "use strict";
    DeviceManager.module("DeviceApp.Show", function (Show, DeviceManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showDevice: function (id) {
                require(["common/views", "models/device"], function (CommonViews) {
                    var loadingView = new CommonViews.Loading({
                        title: "Artificial Loading Delay",
                        message: "Data loading is delayed to demonstrate using a loading view."
                    });
                    DeviceManager.mainRegion.show(loadingView);

                    var fetchingDevice = DeviceManager.request("device:entity", id);
                    $.when(fetchingDevice).done(function (device) {
                        var deviceView;
                        if (device !== undefined) {
                            deviceView = new View.Device({
                                model: device
                            });

                            deviceView.on("device:edit", function (device) {
                                DeviceManager.trigger("device:edit", device.get("id"));
                            });
                        }
                        else {
                            deviceView = new View.MissingDevice();
                        }

                        DeviceManager.mainRegion.show(deviceView);
                    });
                });
            }
        }
    });

    return DeviceManager.DeviceApp.Show.Controller;
});
