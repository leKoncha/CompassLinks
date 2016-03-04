$(document).ready(function() {
    prepareList();
    fillSaved();
    loadLinks();
});


document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById("add");
    addButton.onclick = function() {
        acquireAddress();
    };

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
    var removes = document.getElementsByClassName("remove");
    for(var j = 0; j < removes.length; j++){
      var removeButton = removes[i];
      removeBotton.onclick = function(){
        removeFromList();
      };
    }
});

function fillSaved() {
    loadLinks();
    var address = links;
    var addressUrl = ['http://www.google.com', 'http://WWW.COMPASS.COM', 'http://www.gmail.com', 'http:www.bettercloud.com'];
    var ul = document.getElementById("fillable");
    for (var i = 0; i < address.length; i++) {
        var RBT = document.createElement("button");
        RBT.appendChild(document.createTextNode("X"));
        RBT.setAttribute("class", "remove");
        RBT.setAttribute("id", address[i]);
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(address[i]));
        a.setAttribute("id", address[i]);
        a.setAttribute("class", "blink");
        a.setAttribute("href", addressUrl[i]);
        var li = document.createElement("li");
        li.appendChild(a);
        li.setAttribute("class", "new");
        li.setAttribute("id", address[i]);
        li.appendChild(RBT);
        ul.insertBefore(li, ul.firstChild);
    }
}

function acquireAddress() {
    var update = chrome.storage.syn.get("links");
    var currentUrl = chrome.tabs.query({
        active: true
    }, function(arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        var activeTabUrl = activeTab.url;
        return activeTabUrl;

        /*chrome.tabs.create({
            active: true,
            url: activeTabUrl

        });*/

    });
    update.push(activeTabUrl);
    chrome.storage.sync.set("links", update);

}

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

function removeFromList(){
  prompt(test);
}

function loadLiks(){
  var links = [];
  var Get = chrome.storage.sync.get("links");
  if (!Get) {
    chrome.stoarage.sync.set("links", links);
  }
  links = get;
  return links;


}




