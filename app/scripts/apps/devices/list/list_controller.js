define(["app", "apps/devices/list/list_view", "ext/detector"], function (DeviceManager, View, userDevice) {
    "use strict";
    DeviceManager.module("DevicesApp.List", function (List, DeviceManager, Backbone, Marionette, $, _) {
        List.Controller = {
            listDevices: function (criterion) {
                require(["common/views", "models/device"], function (CommonViews) {
                    var loadingView = new CommonViews.Loading();
                    DeviceManager.mainRegion.show(loadingView);

                    var fetchingDevices = DeviceManager.request("device:entities");

                    var devicesListLayout = new View.Layout();
                    var devicesListPanel = new View.Panel();

                    require(["models/filter"], function (FilteredCollection) {
                        $.when(fetchingDevices).done(function (devices) {
//                            var filteredDevices = DeviceManager.Entities.FilteredCollection({
//                                collection: devices,
//                                filterFunction: function (filterCriterion) {
//                                    var criterion = filterCriterion.toLowerCase();
//                                    return function (device) {
//                                        if (device.get('type').toLowerCase().indexOf(criterion) !== -1
//                                            || device.get('subType').toLowerCase().indexOf(criterion) !== -1
//                                            || device.get('os').toLowerCase().indexOf(criterion) !== -1
//                                            || device.get('orientation').toLowerCase().indexOf(criterion) !== -1
//                                            || device.get('browser').toLowerCase().indexOf(criterion) !== -1) {
//                                            return device;
//                                        }
//                                    };
//                                }
//                            });

                            if (criterion) {
                                devices.parameters.set({ criterion: criterion });
                                devicesListPanel.once("show", function () {
                                    devicesListPanel.triggerMethod("set:filter:criterion", criterion);
                                });
                            }

                            var devicesListPagination = new View.Pagination({paginatedCollection: devices});

                            devices.goTo(1);
                            var devicesListView = new View.Devices({
                                collection: devices,
                                mainView: List.Devices
                            });

                            devicesListPanel.on("devices:filter", function (filterCriterion) {
                                //devices.filter(filterCriterion);
                                devices.parameters.set({
                                    page: 1,
                                    criterion: filterCriterion
                                });
                                DeviceManager.trigger("devices:filter", filterCriterion);
                            });

                            devicesListPagination.on("page:change", function (page) {
                                //DeviceManager.trigger("page:change", page);
                                devices.paginate(page);
                            });

                            devicesListLayout.on("show", function () {
                                devicesListLayout.filterRegion.show(devicesListPanel);
                                devicesListLayout.paginationRegion.show(devicesListPagination);
                                devicesListLayout.devicesRegion.show(devicesListView);
                            });

                            if (!DeviceManager.deviceDetected) {
                                require(["apps/devices/new/new_view"], function (NewView) {
                                    var newDevice = DeviceManager.request("device:entity:new");
                                    DeviceManager.deviceDetected = true;
                                    newDevice.set("type", userDevice.type);
                                    newDevice.set("subType", userDevice.subType);
                                    newDevice.set("os", userDevice.os);
                                    newDevice.set("browser", userDevice.browser);
                                    newDevice.set("scr_height", userDevice.scrHeight);
                                    newDevice.set("scr_width", userDevice.scrWidth);
                                    newDevice.set("orientation", userDevice.orientation);
                                    var view = new NewView.Device({
                                        model: newDevice
                                    });

                                    view.on("form:submit", function (data) {
                                        if (newDevice.save(data)) {
                                            devices.add(newDevice);
                                            view.trigger("dialog:close");
                                            var newDeviceView = devicesListView.children.findByModel(newDevice);
                                            DeviceManager.deviceDetected = true;
                                            if (newDeviceView) {
                                                newDeviceView.flash("success");
                                            }
                                        }
                                    });

                                    DeviceManager.dialogRegion.show(view);
                                });
                            }

                            devicesListView.on("itemview:device:show", function (childView, args) {
                                DeviceManager.trigger("device:show", args.model.get("id"));
                            });

                            DeviceManager.mainRegion.show(devicesListLayout);
                        });
                    });
                });
            }
        }
    });

    return DeviceManager.DevicesApp.List.Controller;
});
