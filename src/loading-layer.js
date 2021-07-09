(function () {
    // An immediately invoked function will wrap our code

    'use strict';

    var overWriteDefauls = function () {};

    var el = null,
        theme = null,
        loadingLayerID = 'LL-' + Date.now();

    var loadingLayer = function (options, e) {
        var htmlString = '',
            spinnerStyle = LL.config.rainbow ? 'rainbow' : '';

        switch (theme) {
            case 'bold-circle':
                break;
            default:
                htmlString +=
                    '' +
                    '<div id="' +
                    loadingLayerID +
                    '-container" class="LL-container" style="position: fixed;' +
                    'top: 50%;' +
                    'left: 50%;' +
                    // 'width: 100%;' +
                    // 'height: 100%;' +
                    // 'background-color: rgba(0,0,0,0.25);' +
                    // 'color: #fff;' +
                    // 'font-family: Courier New, Courier, monospace;' +
                    // 'font-size: 11px;' +
                    // 'z-index: 99999;' +
                    // 'overflow-x: hidden;' +
                    // 'overflow-y: hidden;' +
                    '"><div id="' +
                    loadingLayerID +
                    '-spinner" class="LL-spinner ' +
                    spinnerStyle +
                    '"></div></div>';
        }
        createDivEl(htmlString);
    };

    var createDivEl = function (htmlString) {
        el = document.getElementById('loading-layer');
        if (el != null) {
            cleanContent();
        } else {
            el = document.createElement('div');
            el.setAttribute('id', loadingLayerID);
            el.setAttribute('class', 'LL loading-layer');
        }
        el.innerHTML = htmlString;
        document.body.appendChild(el);
    };

    var cleanContent = function () {
        if (el != null) el.innerHTML = '';
    };

    function removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    var destroyLayers = function () {
        removeElementsByClass('LL');
    };

    var create = function (newId) {
        if (window.LL.config.multipleInstances == false && document.getElementsByClassName('LL').length > 0) {
            console.warn('LL.config.multipleInstances is false, and a loading-layer component already is present in DOM. Use LL.hide() before creating new instances.');
            return;
        }
        if (!newId) loadingLayerID = 'LL-' + Date.now();
        else loadingLayerID = newId;
        loadingLayer(loadingLayerID);
    };

    window.LL = {
        // Use 'window' to share ny object in the global scope.
        // init: function( params ){
        //     params = {
        //         mainColor: "white",
        //         bgLayerColor: "black",
        //         bgLayerOpacity: "0.3",
        //         speed: '1s'
        //     };
        //     init( params );
        // },
        show: function (id, params) {
            if (params != null) overWriteDefauls(params);
            create(id);
        },
        hide: function () {
            destroyLayers();
        },
        // getStyles: function () {
        //     return ["light-circle","bold-circle","double-circle","dots",""]
        //     // main color, in-a-box
        // },
        destroy: destroyLayers,
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
        },
        list: function () {
            var elements = document.getElementsByClassName('LL');
            for (var i = 0; i < elements.length; i++) {
                console.log(elements[i]);
            }
        },
        config: {
            multipleInstances: false,
            rainbow: false
        }
    };
})();
