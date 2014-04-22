define([
    "app",
    "tpl!apps/devices/common/templates/form.tpl",
    "backbone.syphon"
], function(DeviceManager, formTpl){
  "use strict";
    DeviceManager.module("DevicesApp.Common.Views", function(Views, DeviceManager, Backbone, Marionette, $, _){
    Views.Form = Marionette.ItemView.extend({
      template: formTpl,

      events: {
        "click button.js-submit": "submitClicked"
      },

      submitClicked: function(e){
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("form:submit", data);
      }
    });
  });

  return DeviceManager.DevicesApp.Common.Views;
});
