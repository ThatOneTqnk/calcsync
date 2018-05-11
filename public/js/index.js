$(document).ready(() => {
    $('#render').click(() => {
        let respdata;
        let inout = $('#latex').html();
        $.post("image", {image: inout})
        .done((data) => {
            console.log('bad');
            respdata = data;
            getImage(respdata, (returned) => {
                if(document.getElementById('garbage')) {
                    var elem = document.getElementById('garbage');
                    elem.parentNode.removeChild(elem);
                }
                var interimg = document.createElement("img");
                console.log(returned);
                interimg.src = returned;
                interimg.id = 'garbage';
                document.getElementById('dump').appendChild(interimg);
            });
        })
        .fail(() => {
            console.log('fail')
        });
    });
    function getImage(enter, callback) {
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
                ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
                output = canvas.toDataURL('image/png');
                callback(output);
            }
        }
    };
})