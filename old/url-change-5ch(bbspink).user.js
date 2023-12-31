// ==UserScript==
// @name         5ch-script-for-me
// @namespace    idk
// @version      1.0.5
// @description  5ch, open2chで簡単なurlの改変を行うスクリプト
// @author       Chibiaoiro
// @match        https://*.open2ch.net/*
// @match        https://*.5ch.net/*
// @match        https://*.bbspink.com/*
// @grant        none
// @updateURL    https://github.com/Chibiaoiro/5ch-script-for-me/raw/main/url-change-5ch.user.js
// @downloadURL  https://github.com/Chibiaoiro/5ch-script-for-me/raw/main/url-change-5ch.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Get the current page's URL
    var currentUrl = window.location.href;

    console.log("current url is " + currentUrl + " (by URL mod Script)")

    var observer = new MutationObserver(function(mutationsList) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                var links = document.querySelectorAll('a[href]');

                links.forEach(function(link) {
                    var href = link.getAttribute('href');

                    //5ch.net
                    if (currentUrl.includes("5ch.net" || "bbspink.com")){
                         //5ch.home.page
                        if (currentUrl == 'https://5ch.net/' && !href.includes("/read.cgi/c/")){
                          var modifiedUrl = href.replace("/read.cgi/", "/read.cgi/c/");
                          link.setAttribute('href', modifiedUrl);
                          console.log("The [5ch.home.page] worked on this site");
                        }//5ch.primary
                        if ((href.includes("/l50")) && !currentUrl.includes("/test/read.cgi/")){
                          var modifiedUrl = href.replace("/read.cgi/", "/read.cgi/c/");
                          modifiedUrl = modifiedUrl.replace("/l50", "");
                          link.setAttribute('href', modifiedUrl);
                          console.log("The [5ch.primary] worked on this site");
                        }//5ch.find.page
                        if (currentUrl.includes('find.5ch.net/') && !href.includes("/read.cgi/c/")){
                          var modifiedUrl = href.replace("/read.cgi/", "/read.cgi/c/");
                          link.setAttribute('href', modifiedUrl);
                          console.log("The [5ch.find.page] worked on this site");
                        }//5ch.read.cgi
                        if (currentUrl.includes("test/read.cgi/") && !href.includes("/c/")){ 
                          var modifiedUrl = href.replace("/read.cgi/", "/read.cgi/c/");
                          link.setAttribute('href', modifiedUrl);
                          console.log("The [5ch.read.cgi] worked on this site");
                        }
                    }

                    //open2ch
                    if ((window.location.hostname.includes("open2ch.net")) && !currentUrl.includes("/read.cgi")){
                        if (href.includes("/l30")){
                            var modifiedUrl = href.replace("/l30", "/")
                            link.setAttribute('href', modifiedUrl);
                            console.log("The [open2ch.l30] worked on this site");
                        }
                        if (href.includes("/l10")){
                            var modifiedUrl = href.replace("/l10", "/")
                            link.setAttribute('href', modifiedUrl);
                            console.log("The [open2ch.l10] worked on this site");
                        }
                        if (href.includes("/l50")){
                            var modifiedUrl = href.replace("/l50", "/")
                            link.setAttribute('href', modifiedUrl);
                            console.log("The [open2ch.l50] worked on this site");
                        }
                    }

               });
            }
        }
    });

    var targetNode = document.body;

    observer.observe(targetNode, { childList: true, subtree: true });
})();
