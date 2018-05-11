$(document).ready(() => {
    $('#render').click(() => {
        let respdata;
        let inout = $('#latex').html();
        $.post("image", {image: inout})
        .done((data) => {
            respdata = data;
            getImage(respdata);
        })
        .fail(() => {
            console.log('fail')
        });
        
    function getImage(enter) {
        var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
        let background;
        let output;
        var image = new Image();
        image.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(enter.img)));
        image.onload = function() {
            console.log(image.width + 75);
            canvas.width = image.width + 75;
            canvas.height = image.height + 75;
            background = new Image();
            background.width = image.width + 75;
            background.height = image.height + 75;
            // White 150x150 DataURI: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABfElEQVR4Xu3SMQEAAAzDoPk33anIBxq4QUAsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIrA9pZ1E87RkRjMAAAAASUVORK5CYII=
            background.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABfElEQVR4Xu3SMQEAAAzDoPk33anIBxq4QUAsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIrA9pZ1E87RkRjMAAAAASUVORK5CYII=";
            background.onload = function() {
                ctx.drawImage(background, 0, 0);
                // var canvas1 = document.createElement('canvas');
                // canvas1.width = image.width;
                // canvas1.height = image.height;
                // var context = canvas1.getContext('2d');
                // context.drawImage(image, 0, 0);
                ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
                output = canvas.toDataURL('image/png');
                console.log(output); 
            }
        }
        return output;
    };

    })
})