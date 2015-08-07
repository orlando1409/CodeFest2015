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
    var jsData = $('#formBear').serializeObject();

    if ($('#txtId') === '') {
        createBear(jsData);
    }
    else {
        updateBear(jsData);
    }
});

function getBears() {
    $.ajax({
        url: $('#divBears').data('api-url') + '/bears',
        async: true,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            renderBears(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getBear(id)
{
    $.ajax({
        url: $('#divBears').data('api-url') + '/bears/' + id,
        async: true,
        type: 'GET',       
        dataType: 'json',
        success: function (data) {
            renderBear(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function deleteBear(id) {
    $.ajax({
        url: $('#divBears').data('api-url') + '/bears/' + id,
        async: true,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function updateBear(jsData)
{
    $.ajax({
        url: $('#divBears').data('api-url') + '/bears/'+ jsData.id,
        async: true,
        type: 'PUT',
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

function createBear(jsData) {
    $.ajax({
        url: $('#divBears').data('api-url') + '/bears/',
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

function renderBears(data) {
    $.each(data, function (index, item) {
        $('#divBears ul').append('<li><a class="aItem" data-id="' + item._id + '" onclick="getBear(' + "'" + item._id + "'" + ')">' + item.name + '</a><a onclick="deleteBear(' + "'" + item._id.trim() + "'"+ ')">x</a></li>');
    });
}

function renderBear(item) {
    $('input[name*="id"]').val(item._id);
    $('input[name*="name"]').val(item.name);
}

