define([
    "app",
    "tpl!apps/devices/list/templates/layout.tpl",
    "tpl!apps/devices/list/templates/filter.tpl",
    "tpl!apps/devices/list/templates/pagination.tpl",
    "tpl!apps/devices/list/templates/none.tpl",
    "tpl!apps/devices/list/templates/list.tpl",
    "tpl!apps/devices/list/templates/list_item.tpl"
], function (DeviceManager, layoutTpl, filterlTpl, paginationTpl, noneTpl, listTpl, listItemTpl) {
    "use strict";
    DeviceManager.module("DevicesApp.List.View", function (View, DeviceManager, Backbone, Marionette, $, _) {
        View.Layout = Marionette.Layout.extend({
            template: layoutTpl,

            regions: {
                filterRegion: "#filter-region",
                paginationRegion: "#pagination-region",
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

        View.Pagination = Marionette.ItemView.extend({
            template: paginationTpl,

            initialize: function(options){
                this.paginatedCollection = options.paginatedCollection;
                this.listenTo(this.paginatedCollection, "page:change:after", this.render);
            },

            events: {
                "click a[class=navigatable]": "navigateToPage"
            },

            navigateToPage: function(e){
                e.preventDefault();
                var page = parseInt($(e.target).data("page"), 10);
                this.paginatedCollection.parameters.set("page", page);
                this.trigger("page:change", page);
            },

            serializeData: function(){
                return _.clone(this.paginatedCollection.info());
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

            sortUpIcon: 'glyphicon glyphicon-chevron-up',
            sortDnIcon: 'glyphicon glyphicon-chevron-down',

            events: {
                "click th": "headerClick"
            },


            initialize: function () {
                this.listenTo(this.collection, "reset", function () {
                    this.appendHtml = function (collectionView, itemView, index) {
                        collectionView.$el.append(itemView.el);
                    }
                });

                this.listenTo(this.collection, "sort", function () {
                    this.render();

                });
            },

            onRender: function () {
                this.$el.find('th div')
                    .append($('<span>'))
                    .closest('thead')
                    .find('span')
                    .addClass('sort-ic icon-none')
                    .end()
                    .find('[column="' + this.collection.sortAttribute + '"] span')
                    .removeClass('icon-none').addClass(this.sortUpIcon);
            },

            onCompositeCollectionRendered: function () {
                this.appendHtml = function (collectionView, itemView, index) {
                    collectionView.$el.prepend(itemView.el);
                }
            },

            headerClick: function (e) {
                var $el = $(e.currentTarget),
                    ns = $el.attr('column'),
                    cs = this.collection.sortAttribute;

                // Toggle sort if the current column is sorted
                if (ns == cs) {
                    this.collection.sortDirection *= -1;
                } else {
                    this.collection.sortDirection = 1;
                }

                // Adjust the indicators.  Reset everything to hide the indicator
                $el.closest('thead').find('span').attr('class', 'icon-none');

                // Now show the correct icon on the correct column
                if (this.collection.sortDirection == 1) {
                    $el.find('span').removeClass('icon-none').addClass(this.sortUpIcon);
                } else {
                    $el.find('span').removeClass('icon-none').addClass(this.sortDnIcon);
                }
                this.collection.sortDevices(ns);
            }
        });
    });

    return DeviceManager.DevicesApp.List.View;
});
