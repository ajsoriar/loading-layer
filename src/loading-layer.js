/**
 * loading-layer
 * Simple javascript spinner with dark semi transparent background to be used in js apps as an activity indicator.
 * @version v1.0.2 - 2019-03-06
 * @link https://github.com/ajsoriar/loading-layer
 * @author Andres J. Soria R. <ajsoriar@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function() { // An immediately invoked function will wrap our code

    "use strict";

    var el = null,
        theme = null;

    var loadingLayer = function (options, e) {

        var loadingLayerID = "LL-"+ Date.now(),
            htmlString= "";

        switch (theme) {

            case "bold-circle":
                break;
            default:
                htmlString += ''+
                '<div id="' + loadingLayerID + '" style="position: fixed;' +
                'top: 0;' +
                'left: 0;' +
                'width: 100%;' +
                'height: 100%;' +
                'background-color: rgba(0,0,0,0.25);' +
                'color: #fff;' +
                'font-family: Courier New, Courier, monospace;' +
                'font-size: 11px;' +
                'z-index: 99999;' +
                'overflow-x: hidden;' +
                'overflow-y: hidden;' +
                '"><div id="' + loadingLayerID + '-mov" class="mov"></div></div>';
        }
        createDivEl(htmlString);
    };

    var createDivEl  = function(htmlString) {
        el = document.getElementById("loading-layer");
        if ( el != null ) {
            cleanContent();
        } else {
            el = document.createElement('div');
            el.setAttribute("id", "loading-layer");
        }
        el.innerHTML = htmlString;
        document.body.appendChild(el);
    };

    var cleanContent = function () {
        if ( el != null) el.innerHTML = "";
    };

    var hideLayer = function () {
        cleanContent();
    };

    var showLayer = function () {
        loadingLayer();
    };

    window.LL = { // Use 'window' to share ny object in the global scope.
        // init: function( params ){
        //     params = {
        //         mainColor: "white",
        //         bgLayerColor: "black",
        //         bgLayerOpacity: "0.3",
        //         speed: '1s'
        //     };
        //     init( params );
        // },
        show: function (params) {
            if (params != null) overWriteDefauls(params);
            showLayer();
        },
        hide: function () {
            hideLayer();
        },
        // getStyles: function () {
        //     return ["light-circle","bold-circle","double-circle","dots",""]
        //     // main color, in-a-box
        // },
        setConf: function (params) {
            overWriteDefauls(params);
            
            /* // params example ...
            {
                "theme":"light-circle",
                "mainColor": "white",
                "bgLayerColor": "black",
                "bgLayerOpacity": "0.3",
                "speed": '1s'
            }
            */ 
        }
    };

}());