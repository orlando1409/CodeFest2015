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

function getHelp(id)
{
    $.ajax({
        url: $('#divBears').data('api-url') + '/help/' + id,
        async: true,
        type: 'GET',       
        dataType: 'json',
        success: function (data) {
            renderHelp(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function renderHelp(item) {
    $('input[name*="description"]').val(item.description);
    $('input[name*="examples"]').val(item.example);
}

