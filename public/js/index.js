$(document).ready(() => {
    $('.integral').click(() => {
        mathField.write('\\int\\left(\\right)');
        mathField.focus();
    })
    $('.pi').click(() => {
        mathField.write('\\pi');
        mathField.focus();
    })
    $('.lastcop').click(() => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = 'Copied to clipboard!';
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    })
    $('#render').click(() => {
        $('#addimg').attr('href', '#');
        $('#addimg').attr('target', '');
        $('#dispense').attr('value', '')
        $('.spin').css('display', 'inline');
        $('.imgarea').css('display', 'none')
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
                $('.placehold').html('');
                interimg.src = returned;
                interimg.id = 'garbage';
                document.getElementById('addimg').appendChild(interimg);
                //$('#garbage').addClass('centered')
                zucc(returned);
                $('.spin').css('display', 'none');
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
            background.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABfElEQVR4Xu3SMQEAAAzDoPk33anIBxq4QUAsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIrA9pZ1E87RkRjMAAAAASUVORK5CYII=";
            background.width = image.width + 75;
            background.height = image.height + 75;
            // White 150x150 DataURI: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABfElEQVR4Xu3SMQEAAAzDoPk33anIBxq4QUAsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIiEWCbFIiEVCLBJikRCLhFgkxCIhFgmxSIhFQiwSYpEQi4RYJMQiIRYJsUiIRUIsEmKREIuEWCTEIrA9pZ1E87RkRjMAAAAASUVORK5CYII=
            background.onload = function() {
                ctx.drawImage(background, 0, 0, image.width + 75, image.height + 75);
                ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.height / 2);
                output = canvas.toDataURL('image/png');
                callback(output);
            }
        }
    };

    function zucc(img) {
        let oof = img.replace('data:image/png;base64,', '');
        $.post("imgapi", {interimg: oof})
        .done((data) => {
            console.log(data);
            // $('#resimgur').html(data);
            // $('#resimgur').attr("href", data);
            $('#dispense').attr('value', data)
            $('#addimg').attr('href', data);
            $('#addimg').attr('target', '_blank');
        })
        .fail(() => {
            console.log('fail')
        })
    }
})