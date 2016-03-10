document.addEventListener('DOMContentLoaded', function() {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function() {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function() {
                chrome.tabs.create({
                    active: true,
                    url: location
                });
            };
        })();
    }
    var addButton = document.getElementById("add");
    addButton.onclick = function() {
        ButtonFunction();

    };
});




function prepareList() {
    $('#expList').find('li:has(ul)')
        .click(function(event) {
            if (this == event.target) {
                $(this).toggleClass('expanded');
                $(this).children('ul').slideToggle('medium');
            }
            return false;
        })
        .addClass('collapsed')
        .children('ul').hide();
}

$(document).ready(function() {
    prepareList();
    //loadLists();
    fillSaved();

});
var addressList = ['sadlkfjhaslkdjfhlaskjdfhlaskjdfhlkasjdfh', '2', '3', '4'];
var urlList = ['1', '2', '3', '4'];

function fillSaved() {
    var addresses = addressList;
    var Urls = urlList;
    var ul = document.getElementById("fillable");
    for (var i = 0; i < addresses.length; i++) {
        var RBT = document.createElement("button");
        RBT.appendChild(document.createTextNode("X"));
        RBT.setAttribute("class", "remove");
        RBT.setAttribute("id", addresses[i]);
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(addresses[i]));
        a.setAttribute("id", addresses[i]);
        a.setAttribute("class", "blink");
        a.setAttribute("href", Urls[i]);
        var li = document.createElement("li");
        li.appendChild(a);
        li.setAttribute("class", "new");
        li.setAttribute("id", addresses[i]);
        li.appendChild(RBT);
        ul.insertBefore(li, ul.firstChild);

    }
    var div = document.createElement('Div');
    div.setAttribute("class","abreak");
    ul.insertBefore(div, ul.firstChild);
}


/*
function ButtonFunction() {

}

function saveGroups() {
    chrome.storage.local.set({
        'addressList': addressList
    });
    chrome.storage.local.set({
        'urlList': addressList
    });
}

function loadLists() {
    try {
        chrome.storage.local.get('addressList', function(result) {
            var addressList = result;
            return addressList;
        });
    } catch (e) {
        console.log(e);
    }
    try {
        chrome.storage.local.get('urlList', function(result) {
            var urlList = result;
            return urlList;
        });
    } catch (e) {
        console.log(e);
    }
}
*/