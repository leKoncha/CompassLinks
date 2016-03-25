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
            button.onclick = function() {
                removeFunction(idNumber);
            };
        })();
    }

});


document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById("add");
    addButton.onclick = function() {
        addListing();

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
    fillSaved();
});

function fillSaved() {
    var listingsList = [];
    chrome.storage.sync.get("listings", function(listings) {
        listingsList = listings.listings;
        var ul = document.getElementById("fillable");
        var div = document.createElement('Div');
        div.setAttribute("class", "abreak");
        ul.insertBefore(div, ul.firstChild);
        for (var i = 0; i < listingsList.length; i++) {
              generateLi(listingsList.url, listingsList.address,i);
              }
        

    });
}

function addListing() {
    var listingsList = [];
    var newListing;
    chrome.storage.sync.get("listings", function(listings) {
        listingsList = Array.from(listings.listings);
    });
    chrome.tabs.query({
            active: true,
        },
        function(arrayOfTabs) {
            var activeTab = arrayOfTabs[0];
            var activeTabUrl = activeTab.url;
            var activeTabTitle = activeTab.title.split(',')[0];
            newListing = {
                "address": activeTabTitle,
                "url": activeTabUrl
            };
            var idNumber = listingsList.length;
            listingsList.push(newListing);
            chrome.storage.sync.set({
                "listings": listingsList
            });
            generateLi(activeTabUrl,activeTabTitle,idNumber);

        });

}

function cleanList(){
  var ul = document.getElementById('fillable');
  while (ul.firstChild){

   if (ul.firstChild.id === 'stay'){break;}else{
   ul.removeChild(ul.firstChild);
   }
  }

}
function generateLi(url, address, index){
            var ul = document.getElementById("fillable");
            var listingAddress = address;
            var listingUrl = url;
            var RBT = document.createElement("button");
            RBT.appendChild(document.createTextNode("X"));
            RBT.setAttribute("class", "remove");
            RBT.setAttribute("id", index);
            RBT.onclick = function() {
              var index = this.id;
              chrome.storage.sync.get('listings', function(listings){
              var removeFrom = Array.from(listings.listings);
              removeFrom.splice(index,1);
              chrome.storage.sync.set({'listings':removeFrom});
              var toRemove = document.getElementById(index);
              ul.removeChild(toRemove);
              console.log(index);
              });
            };
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(listingAddress));
            a.setAttribute("id", listingAddress);
            a.setAttribute("class", "blink");
            a.setAttribute("href", listingUrl);
            a.onclick = function(){
              chrome.tabs.create({
                    active: true,
                    url: listingUrl
                });
            };
            var li = document.createElement("li");
            li.appendChild(a);
            li.setAttribute("class", "new");
            li.setAttribute("id", index);
            li.appendChild(RBT);
            ul.insertBefore(li, (ul.firstChild).nextSibling);
        
}
