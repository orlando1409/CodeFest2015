/// <autosync enabled="true" />
/// <reference path="../gulpfile.js" />
/// <reference path="js/app/bears.js" />
/// <reference path="js/site.js" />
/// <reference path="lib/jquery/src/jquery.intellisense.js" />
/// <reference path="lib/jquery/src/jquery.js" />
/// <reference path="lib/jquery/src/jquery.serialize-object.js" />


$(function () {
    getBears();
});

$(document).ready(function () {


});

$('#btnSave').click(function () {
    var jsData = $('#formTrouble').serializeObject();
    if ($('#txtId') === '') {
        createBear(jsData);
    }
});

function createBear(jsData) {
    $.ajax({
        url: $('#divTrouble').data('api-url') + '/trouble/',
        async: true,
        type: 'POST',
        data: jsData,
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


