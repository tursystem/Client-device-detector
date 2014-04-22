define([
    "app",
    "tpl!apps/devices/show/templates/missing.tpl",
    "tpl!apps/devices/show/templates/view.tpl"
], function (DeviceManager, missingTpl, viewTpl) {
    "use strict";
    DeviceManager.module("DevicesApp.Show.View", function (View, DeviceManager, Backbone, Marionette, $, _) {
        View.MissingDevice = Marionette.ItemView.extend({
            template: missingTpl
        });

        View.Device = Marionette.ItemView.extend({
            template: viewTpl,

            events: {
                "click .js-show-device": "showClicked"
            },

            showClicked: function (e) {
                e.preventDefault();
                this.trigger("device:edit", this.model);
            }
        });
    });

    return DeviceManager.DevicesApp.Show.View;
});
