define(["app"], function (DeviceManager) {
    "use strict";
    DeviceManager.module("Entities", function (Entities, DeviceManager, Backbone, Marionette, $, _) {

        Entities.Device = Backbone.Model.extend({

            urlRoot: "/devices",
            defaults: {
                type: "",
                os: "",
                subType: "",
                scr_height: "",
                scr_width: "",
                browser: "",
                orientation: ""
            }
        });

        Entities.DeviceCollection = Backbone.Collection.extend({
            url: "/devices",
            model: Entities.Device,

            sortAttribute: "type",
            sortDirection: 1,

            sortDevices: function (attr) {
                this.sortAttribute = attr;
                this.sort();
            },

            comparator: function(a, b) {
                var a = a.get(this.sortAttribute),
                    b = b.get(this.sortAttribute);

                //if (a == b)
                    //return 0;

                if (this.sortDirection == 1) {
                    return a > b ? 1 : -1;
                } else {
                    return a < b ? 1 : -1;
                }
            }
        });

        var API = {
            getDeviceEntities: function () {
                var devices = new Entities.DeviceCollection();
                var defer = $.Deferred();
                devices.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    }
                });
                var promise = defer.promise();
                return promise;
            },

            getDeviceEntity: function (deviceId) {
                var device = new Entities.Device({id: deviceId});
                var defer = $.Deferred();
                device.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (data) {
                        defer.resolve(undefined);
                    }
                });
                return defer.promise();
            }
        };

        DeviceManager.reqres.setHandler("device:entities", function () {
            return API.getDeviceEntities();
        });

        DeviceManager.reqres.setHandler("device:entity", function (id) {
            return API.getDeviceEntity(id);
        });

        DeviceManager.reqres.setHandler("device:entity:new", function (id) {
            return new Entities.Device();
        });
    });

    return;
});
