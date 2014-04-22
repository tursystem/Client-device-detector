<form class="form-horizontal">
    <div class="form-group">
        <label for="device-type" class="col-sm-4 control-label">type:</label>

        <div class="col-sm-8">
            <input id="device-type" name="type" type="text" value="<%- type %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-subType" class="col-sm-4 control-label">subType:</label>

        <div class="col-sm-8">
            <input id="device-subType" name="subType" type="text" value="<%- subType %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-os" class="col-sm-4 control-label">os:</label>

        <div class="col-sm-8">
            <input id="device-os" name="os" type="text" value="<%- os %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-browser" class="col-sm-4 control-label">browser:</label>

        <div class="col-sm-8">
            <input id="device-browser" name="browser" type="text" value="<%- browser %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-scr_height" class="col-sm-4 control-label">scr_height:</label>

        <div class="col-sm-8">
            <input id="device-scr_height" name="scr_height" type="text" value="<%- scr_height %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-scr_width" class="col-sm-4 control-label">scr_width:</label>

        <div class="col-sm-8">
            <input id="device-scr_width" name="scr_width" type="text" value="<%- scr_width %>" disabled/>
        </div>
    </div>
    <div class="form-group">
        <label for="device-orientation" class="col-sm-4 control-label">orientation:</label>

        <div class="col-sm-8">
            <input id="device-orientation" name="orientation" type="text" value="<%- orientation %>" disabled/>
        </div>
    </div>
    <div style="text-align: center">
        <button class="btn js-submit">save</button>
    </div>
</form>