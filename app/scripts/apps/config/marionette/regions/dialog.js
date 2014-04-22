define(["marionette", "jquery-ui"], function (Marionette) {
    "use strict";
    Marionette.Region.Dialog = Marionette.Region.extend({
        onShow: function (view) {
            this.listenTo(view, "dialog:close", this.closeDialog);

            var self = this;
            this.$el.dialog({
                modal: true,
                title: view.title,
                width: "auto",
                resizable: "false",
                close: function (e, ui) {
                    self.closeDialog();
                }
            });
        },

        closeDialog: function () {
            this.stopListening();
            this.close();
            this.$el.dialog("destroy");
        }
    });

    return Marionette.Region.Dialog;
});