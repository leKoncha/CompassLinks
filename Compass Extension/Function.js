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
['sadlkfjhaslkdjfhlaskjdfhlaskjdfhlkasjdfh', '2', '3', '4'];
var urlList = 
['1', '2', '3', '4'];

function fillSaved() {
  chrome.storage.sync.get("Listings",function(listings){
    var ul = document.getElementById("fillable");
    for (var i = 0; i < listings.length; i++) {
        var listingAddress = listings[i].address;
        var listingUrl = listings[i].url;
        var RBT = document.createElement("button");
        RBT.appendChild(document.createTextNode("X"));
        RBT.setAttribute("class", "remove");
        RBT.setAttribute("id", i);
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(listingAddress));
        a.setAttribute("id", listingAddress);
        a.setAttribute("class", "blink");
        a.setAttribute("href", listingUrl);
        var li = document.createElement("li");
        li.appendChild(a);
        li.setAttribute("class", "new");
        li.setAttribute("id", listingAddress);
        li.appendChild(RBT);
        ul.insertBefore(li, ul.firstChild);

    }
    var div = document.createElement('Div');
    div.setAttribute("class","abreak");
    ul.insertBefore(div, ul.firstChild);
});}

function addListing () {
    try {
      chrome.storage.sync.get("listings",function(listings){
        chrome.tabs.query({
          active: true,
          }, 
          function(arrayOfTabs) {
          var listingList = [];
          listingList.concat(listings);
          var activeTab = arrayOfTabs[0];
          var activeTabUrl = activeTab.url;
          var activeTabTitle = activeTab.title.split(',')[0];
          listingList.push({"address": activeTabTitle,"url":activeTabUrl});
          chrome.storage.sync.set({"listings": listingList});
          console.log(activeTabUrl,activeTabTitle);
        });
    });}catch(err){
        chrome.tabs.query({
          active: true,
          }, 
          function(arrayOfTabs) {
          var activeTab = arrayOfTabs[0];
          var activeTabUrl = activeTab.url;
          var activeTabTitle = activeTab.title.split(',')[0];
          var listings = [{"address":activeTabTitle,"url":activeTabUrl}];
          chrome.sync.set({'listings':listings});
        });
      }
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