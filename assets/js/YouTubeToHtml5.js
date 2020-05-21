/**
 * Skipped minification because the original files appears to be already minified.
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
'use strict';

function _typeof(a) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a
    }, _typeof(a)
}

function YouTubeToHtml5() {
    var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
    for (var b in this.hooks = {}, this.options = {}, this.defaultOptions) this.options[b] = b in a ? a[b] : this.defaultOptions[b];
    this.options.autoload && this.load()
}
YouTubeToHtml5.prototype.defaultOptions = {
    selector: "video[data-yt2html5]",
    attribute: "data-yt2html5",
    formats: "*",
    autoload: true,
    withAudio: false
},
YouTubeToHtml5.prototype.globalHooks = {}, YouTubeToHtml5.prototype.getHooks = function(a, b) {
    var c = [];
    if (a in this.globalHooks) {
        var d = this.globalHooks[a];
        d = d.filter(function(a) {
            return a.name === b
        }), d = d.sort(function(c, a) {
            return c.priority - a.priority
        }), c = c.concat(d)
    }
    if (a in this.hooks) {
        var e = this.hooks[a];
        e = e.filter(function(a) {
            return a.name === b
        }), e = e.sort(function(c, a) {
            return c.priority - a.priority
        }), c = c.concat(e)
    }
    return c
}, YouTubeToHtml5.prototype.doAction = function(a) {
    for (var b = this.getHooks("actions", a), c = arguments.length, d = Array(1 < c ? c - 1 : 0), e = 1; e < c; e++) d[e - 1] = arguments[e];
    for (var f = 0; f < b.length; f++) {
        var g;
        (g = b[f]).callback.apply(g, d)
    }
},
YouTubeToHtml5.prototype.applyFilters = function(name, value, ...args) {
    const hooks = this.getHooks('filters', name);
    for (let i = 0; i < hooks.length; i++)
        value = hooks[i].callback(value, ...args);
    return value;
},
YouTubeToHtml5.prototype.itagMap = {
    5: "240x400",
    6: "???",
    13: "???",
    17: "144x176",
    18: "360p",
    22: "720p",
    34: "360x640",
    35: "480x854",
    36: "240x320",
    37: "1080p",
    38: "3072p",
    43: "360x640",
    44: "480x854",
    45: "720x1280",
    46: "1080x1920",
    82: "360p3d",
    83: "480p3d",
    84: "720p3d",
    85: "1080p3d",
    92: "240p",
    93: "360p",
    94: "480p",
    95: "720p",
    96: "1080p",
    100: "360p",
    101: "480p",
    102: "720p",
    151: "72p",
	132: "240p",
    133: "240pna",
    134: "360pna",
    135: "480pna",
    136: "720pna",
    137: "1080pna",
    138: ">1080p",
    139: "48kbps",
    140: "128kbps",
    141: "256kbps",
    160: "144pna",
    171: "128k",
    172: "256k",
    242: "240p",
    243: "360p",
    244: "480p",
    245: "480p",
    246: "480p",
    247: "720p",
    248: "1080p",
	264: "1440pna",
    298: "720p60",
    299: "1080p60na"
},
YouTubeToHtml5.prototype.urlToId = function(url) {
    const regex = /^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|(?:(?:youtube-nocookie\.com\/|youtube\.com\/)(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/)))([a-zA-Z0-9\-_]*)/;
    const matches = url.match(regex);
    return Array.isArray(matches)&&matches[1]?matches[1]:url;
},
YouTubeToHtml5.prototype.getAllowedFormats = function() {
    let allowedFormats = [];
    if (Array.isArray(this.options.formats)) allowedFormats = this.options.formats;
    else if (this.itagMap[this.options.formats]) allowedFormats = [this.options.formats];
    else if (this.options.formats === '*') allowedFormats = Object.values(this.itagMap).reverse()/*.sort()*/;
    return allowedFormats;
},
YouTubeToHtml5.prototype.getElements = function(selector) {
    var elements = null;
    if (selector) {
        if (NodeList.prototype.isPrototypeOf(selector) || HTMLCollection.prototype.isPrototypeOf(selector)) elements = selector;
        else if (typeof selector === 'object' && 'nodeType' in selector && selector.nodeType) elements = [selector];
        else elements = document.querySelectorAll(this.options.selector);
    }
    elements = Array.from( elements || '' );
    return this.applyFilters( 'elements', elements );
},
YouTubeToHtml5.prototype.parseUriString = function(string) {
    return string.split('&').reduce(function(params, param) {
        const paramParts = param.split('=').map(function(value) {
            return decodeURIComponent(value.replace('+', ' '));
        });
        params[ paramParts[ 0 ] ] = paramParts[ 1 ];
        return params;
    }, {});
},
YouTubeToHtml5.prototype.canPlayType = function(type) {
    var phantomEl = null;
    if (/^audio/i.test(type)) phantomEl = document.createElement( 'audio' );
    else phantomEl = document.createElement( 'video' );
    const value = phantomEl && typeof phantomEl.canPlayType === 'function' ? phantomEl.canPlayType( type ) : 'unknown';
    return value ? value : 'no';
},
YouTubeToHtml5.prototype.load = function() {
    const elements = this.getElements( this.options.selector );
    if ( elements && elements.length ) {
        elements.forEach( element => {
            this.loadSingle( element );
        } );
    }
},
YouTubeToHtml5.prototype.loadSingle = function( element, attr = null ) {
    var b = this;
    const attribute = attr || this.options.attribute;
    if ( element.getAttribute( attribute ) ) {
        const videoId = this.urlToId( element.getAttribute( attribute ) );
        this.doAction( 'api.before', element );
        let results = [];
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "/yt_info.php?url=https://youtu.be/" + videoId, true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                streams = JSON.parse(xmlhttp.responseText)["links"];
                for (var k in streams) {
                    var stream = streams[k];
                    if ( stream && 'itag' in stream && b.itagMap[ stream.itag ] ) {
                        let thisData = {
                            _raw: stream,
                            itag: stream.itag,
                            url: null,
                            label: null,
                            type: 'unknown',
                            mime: 'unknown',
                            hasAudio: false,
                            browserSupport: 'unknown'
                        };
                        if ( 'url' in stream && stream.url )
                            thisData.url = stream.url;
                        var tmp_f = stream.format.split(", ");
                        if ( 'audioQuality' in stream && stream.audioQuality || tmp_f.indexOf("audio") !== -1)
                            thisData.hasAudio = true;
                        if ( 'qualityLabel' in stream && stream.qualityLabel )
                            thisData.label = stream.qualityLabel;
                        else
                            thisData.label = b.itagMap[stream.itag];
                        if (tmp_f != null) {
                            if (tmp_f.indexOf("video") !== -1)
                                thisData.type = "video";
                            else if (tmp_f.indexOf("audio") !== -1)
                                thisData.type = "audio";
                            thisData.mime = tmp_f[0];
                            thisData.browserSupport = b.canPlayType( `${thisData.type}/${thisData.mime}` );
                        }
                        if ( thisData.url )
                            results.push( thisData );
                    }
                }
                var streams = results;
                //
                if ( streams && Array.isArray( streams ) ) {
                    streams = streams.filter( function( item ) {
                        return item.type === element.tagName.toLowerCase();
                    } );
                    streams.sort( function( aaa, bbb ) {
                        const sortVals = {
                            'unknown': -1,
                            'no': -1,
                            'maybe': 0,
                            'probably': 1
                        };
                        return sortVals[ aaa.browserSupport ] + sortVals[ bbb.browserSupport ];
                    });
                    if ( b.options.withAudio ) {
                        streams = streams.filter( function( item ) {
                            return item.hasAudio;
                        } );
                    }
                    const allowedFormats = b.getAllowedFormats();
                    var selectedStream = null;
                    var selectedFormat = null;
                    for ( let i = 0; i < allowedFormats.length; i++ ) {
                        const format = allowedFormats[i];
                        const search = streams.filter( item => {
                            return b.itagMap[ item.itag ] === format;
                        } );

                        if ( search && search.length ) {
                            selectedStream = search.shift();
                            selectedFormat = format;
                            break;
                        }
                    }
                    selectedStream = b.applyFilters( 'video.stream', selectedStream, element, selectedFormat, streams );
                    let domAttrs = {
                        src: '',
                        type: ''
                    };
                    if ( selectedStream && 'url' in selectedStream && selectedStream.url )
                        domAttrs.src = selectedStream.url;
                    if ( selectedStream.type && selectedStream.type !== 'unknown' && selectedStream.mime && selectedStream.mime !== 'unknown' )
                        domAttrs.type = `${selectedStream.type}/${selectedStream.mime}`;
                    domAttrs.src = b.applyFilters( 'video.source', domAttrs.src, selectedStream, element, selectedFormat, streams );
                    if ( domAttrs.src && typeof domAttrs.src.toString === 'function' && domAttrs.src.toString().length ) {
                        element.src = domAttrs.src;
                        if ( domAttrs.type && domAttrs.type.length )
                            element.type = domAttrs.type;
                    } else
                        console.warn( `YouTubeToHtml5 unable to load video for ID: ${videoId}` );
                }
            }
        }
        xmlhttp.send();
    }
}, "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) && (module.exports = YouTubeToHtml5);