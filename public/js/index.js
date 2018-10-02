$(document).ready(() => {
    var image;
    let inprogress = false;
    $('.sigma').click(() => {
        mathField.write('\\sum');
        mathField.focus();
    })
    $('.subsc').click(() => {
        mathField.write('\\subscript1');
        mathField.focus();
    })
    $('.integral').click(() => {
        mathField.write('\\int\\left(\\right)');
        mathField.focus();
    })
    $('.pi').click(() => {
        mathField.write('\\pi');
        mathField.focus();
    })
    $('.sqrt').click(() => {
        mathField.write('\\sqrt[]{}');
        mathField.focus();
    })
    $('.squared').click(() => {
        mathField.write('^2');
        mathField.focus();
    })
    $('.fraction').click(() => {
        mathField.write('\\frac{ }{ }');
        mathField.focus();
    })
    $('.lastcop').click(() => {
        snacc('Copied to clipboard!')
    })
    function snacc(render) {
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = render;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $('#render').click(() => {
        if(inprogress) {
            snacc('Request in progress!')
            $('.lastcop').prop("disabled", false);
            return;
        }
        inprogress = true;
        $('.lastcop').prop("disabled", true);
        let inout = $('#latex').html();
        console.log(inout);
        if(inout === '') {
            errored('Invalid input.');
            return;
        }
        if(inout.length === ((inout.split(" ").length - 1) + (inout.split("\\").length - 1))) {
            errored('Bad input.');
            return;
        }
        $('#addimg').attr('href', 'javascript:void 0');
        $('#addimg').attr('target', '');
        $('#dispense').attr('value', 'Uploading to imgur...')
        $('.spin').css('display', 'inline');
        $('.imgarea').css('display', 'none')
        let respdata;
        $.post("image", {image: inout})
        .done((data) => {
            console.log('bad');
            respdata = data;
            if(respdata.zuccess === 0) {
                $('.spin').css('display', 'none');
                errored('Could not process image.');
                return;
            }
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
            inprogress = false;
            resetImgur('');
            snacc('Image failed to render.');
            console.log('fail')
        });
    });
    function getImage(enter, callback) {
        var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
        let background;
        let output;
        image = new Image();
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
        $.post("imgapi", {interimg: oof, height: image.height + 75, width: image.width + 75})
        .done((data) => {
            // console.log(data);
            // $('#resimgur').html(data);
            // $('#resimgur').attr("href", data);
            if(data.zuccerror) {
                inprogress = false;
                resetImgur('');
                if(data.zuccerror === 1) {
                    snacc('Imgur failed. Height must be < 340.')
                } else if(data.zuccerror === 2) {
                    snacc('Imgur failed. Width must be < 1100.') 
                }
                return; 
            }
            $('.lastcop').prop("disabled", false);
            $('#dispense').attr('value', data)
            $('#addimg').attr('href', data);
            $('#addimg').attr('target', '_blank');
            inprogress = false;
        })
        .fail(() => {
            inprogress = false;
            resetImgur('');
            snacc('Imgur upload failed.');
            console.log('fail')
        })
    }

    function resetImgur(content) {
        $('#dispense').attr('value', content)
    }

    function errored(content) {
        inprogress = false;
        snacc(content);
        resetImgur('');
        $('.lastcop').prop("disabled", true);
        return;
    }
})
