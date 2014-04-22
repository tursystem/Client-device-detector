define([
    "app", 
    "apps/devices/common/views"
], function (DeviceManager, CommonViews) {
    "use strict";
    DeviceManager.module("DevicesApp.New.View", function (View, DeviceManager, Backbone, Marionette, $, _) {
        View.Device = CommonViews.Form.extend({
            title: "Your device information",

            onRender: function () {
                this.$(".js-submit").text("Save data");
            }
        });
    });

    return DeviceManager.DevicesApp.New.View;
});
