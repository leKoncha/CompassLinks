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
    
});

document.addEventListener('DOMContentLoaded', function() {
    var removes = document.getElementsByClassName("remove");
    for (var i = 0; i < removes.length; i++) {
        (function() {
            var button = removes[i];
            var idNumber = button.id;
            button.onclick = function (){ removeFunction(idNumber);
            };
        })();
    }
    
});
document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById("add");
    addButton.onclick = function() {addListing();

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
var addressList = 
//chrome.storage.sync.get('addressList',function(result){
  //return result;
//});
['sadlkfjhaslkdjfhlaskjdfhlaskjdfhlkasjdfh', '2', '3', '4'];
var urlList = 
//chrome.storage.sync.get('urlList',function(result){
  //return result;
//});
['1', '2', '3', '4'];

function fillSaved() {
    var addresses = addressList;
    var Urls = urlList;
    var ul = document.getElementById("fillable");
    if(addresses === undefined){
      chrome.storage.sync.set({"addressList":[]});
      chrome.storage.sync.set({"urlList":[]});
      addresses = addressList;
      Urls = urlList;
    }

    for (var i = 0; i < addresses.length; i++) {
        var RBT = document.createElement("button");
        RBT.appendChild(document.createTextNode("X"));
        RBT.setAttribute("class", "remove");
        RBT.setAttribute("id", i);
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

function addListing () {
  var createUrl;
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function(arrayOfTabs) {
     var activeTab = arrayOfTabs[0];
     var activeTabUrl = activeTab.url;
     createUrl = activeTabUrl; 
   });
  chrome.tabs.create({url:createUrl,active:false});
  console.log(createUrl);

}

function removeFunction(index) {
  var number = index;
  console.log(number);
  //addresses.splice(number, 1);
  //Urls.splice(number,1);

}
/*
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