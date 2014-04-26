define(["app", "paginator"], function (DeviceManager, Paginator) {
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

        //Entities.DeviceCollection = Backbone.Collection.extend({
        Entities.DeviceCollection = Backbone.Paginator.clientPager.extend({
            //url: "/devices",
            model: Entities.Device,

            sortAttribute: "type",
            sortDirection: 1,

            paginator_core: {
                dataType: "json",
                url: "/devices"
            },

            paginator_ui: {
                firstPage: 1,
                currentPage: 1,
                perPage: 10,
                pagesInRange: 2
            },

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
//            getDeviceEntities: function () {
//                var devices = new Entities.DeviceCollection();
//                var defer = $.Deferred();
//                devices.fetch({
//                    success: function (data) {
//                        defer.resolve(data);
//                    }
//                });
//                var promise = defer.promise();
//                return promise;
//            },

            getDeviceEntities: function(options){
                var devices = new Entities.DeviceCollection([], {});// parameters: options.parameters
                //delete options.parameters;
                var defer = $.Deferred();
                options || (options = {});
                // for paginator, see https://github.com/backbone-paginator/backbone.paginator/pull/180
                options.reset = true;
                defer.then(options.success, options.error);
                var response = devices.fetch(_.omit(options, 'success', 'error'));
                response.done(function(){
                    defer.resolveWith(response, [devices]);
                });
                response.fail(function(){
                    defer.rejectWith(response, arguments);
                });
                return defer.promise();
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
