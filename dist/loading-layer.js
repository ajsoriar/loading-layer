/**
 * loading-layer
 * Simple javascript spinner with a dark semi-transparent background to be used in javascript Apps as an activity indicator.
 * @version v1.1.2 - 2021-07-09
 * @link https://github.com/ajsoriar/loading-layer
 * @author Andres J. Soria R. <ajsoriar@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function () {

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
        show: function (id, params) {
            if (params != null) overWriteDefauls(params);
            create(id);
        },
        hide: function () {
            destroyLayers();
        },
        destroy: destroyLayers,
        setConf: function (params) {
            overWriteDefauls(params);
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
