define([
    "app",
    "tpl!apps/devices/list/templates/layout.tpl",
    "tpl!apps/devices/list/templates/filter.tpl",
    "tpl!apps/devices/list/templates/none.tpl",
    "tpl!apps/devices/list/templates/list.tpl",
    "tpl!apps/devices/list/templates/list_item.tpl"
],function (DeviceManager, layoutTpl, filterlTpl, noneTpl, listTpl, listItemTpl) {
    "use strict";    
    DeviceManager.module("DevicesApp.List.View", function (View, DeviceManager, Backbone, Marionette, $, _) {
            View.Layout = Marionette.Layout.extend({
                template: layoutTpl,

                regions: {
                    filterRegion: "#filter-region",
                    devicesRegion: "#devices-region"
                }
            });

            View.Panel = Marionette.ItemView.extend({
                template: filterlTpl,

                events: {
                    "submit #filter-form": "filterDevices"
                },

                ui: {
                    criterion: "input.js-filter-criterion"
                },

                filterDevices: function (e) {
                    e.preventDefault();
                    var criterion = this.$(".js-filter-criterion").val();
                    this.trigger("devices:filter", criterion);
                },

                onSetFilterCriterion: function (criterion) {
                    this.ui.criterion.val(criterion);
                }
            });

            View.Device = Marionette.ItemView.extend({
                tagName: "tr",
                template: listItemTpl,

                triggers: {
                    "click td .js-show-device": "device:show"
                },

                flash: function (cssClass) {
                    var $view = this.$el;
                    $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                        setTimeout(function () {
                            $view.toggleClass(cssClass)
                        }, 500);
                    });
                },

                remove: function () {
                    var self = this;
                    this.$el.fadeOut(function () {
                        Marionette.ItemView.prototype.remove.call(self);
                    });
                }
            });

            var NoDevicesView = Marionette.ItemView.extend({
                template: noneTpl,
                tagName: "tr",
                className: "alert"
            });

            View.Devices = Marionette.CompositeView.extend({
                tagName: "table",
                className: "table table-hover",
                template: listTpl,
                emptyView: NoDevicesView,
                itemView: View.Device,
                itemViewContainer: "tbody",

                initialize: function () {
                    this.listenTo(this.collection, "reset", function () {
                        this.appendHtml = function (collectionView, itemView, index) {
                            collectionView.$el.append(itemView.el);
                        }
                    });
                },

                onCompositeCollectionRendered: function () {
                    this.appendHtml = function (collectionView, itemView, index) {
                        collectionView.$el.prepend(itemView.el);
                    }
                }
            });
        });

        return DeviceManager.DevicesApp.List.View;
    });
