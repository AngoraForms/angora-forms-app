"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    OpenGraphMetadata: null,
    TwitterMetadata: null,
    AppLinksMeta: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    OpenGraphMetadata: function() {
        return OpenGraphMetadata;
    },
    TwitterMetadata: function() {
        return TwitterMetadata;
    },
    AppLinksMeta: function() {
        return AppLinksMeta;
    }
});
const _react = /*#__PURE__*/ _interop_require_default(require("react"));
const _meta = require("./meta");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function OpenGraphMetadata({ openGraph  }) {
    var _openGraph_title, _openGraph_url, _openGraph_ttl;
    if (!openGraph) {
        return null;
    }
    let typedOpenGraph;
    if ("type" in openGraph) {
        switch(openGraph.type){
            case "website":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "website"
                });
                break;
            case "article":
                var _openGraph_publishedTime, _openGraph_modifiedTime, _openGraph_expirationTime;
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "article"
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "article:published_time",
                    content: (_openGraph_publishedTime = openGraph.publishedTime) == null ? void 0 : _openGraph_publishedTime.toString()
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "article:modified_time",
                    content: (_openGraph_modifiedTime = openGraph.modifiedTime) == null ? void 0 : _openGraph_modifiedTime.toString()
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "article:expiration_time",
                    content: (_openGraph_expirationTime = openGraph.expirationTime) == null ? void 0 : _openGraph_expirationTime.toString()
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "article:author",
                    contents: openGraph.authors
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "article:section",
                    content: openGraph.section
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "article:tag",
                    contents: openGraph.tags
                }));
                break;
            case "book":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "book"
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "book:isbn",
                    content: openGraph.isbn
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "book:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "book:author",
                    contents: openGraph.authors
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "book:tag",
                    contents: openGraph.tags
                }));
                break;
            case "profile":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "profile"
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "profile:first_name",
                    content: openGraph.firstName
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "profile:last_name",
                    content: openGraph.lastName
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "profile:username",
                    content: openGraph.username
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "profile:gender",
                    content: openGraph.gender
                }));
                break;
            case "music.song":
                var _openGraph_duration;
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "music.song"
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "music:duration",
                    content: (_openGraph_duration = openGraph.duration) == null ? void 0 : _openGraph_duration.toString()
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:album",
                    contents: openGraph.albums
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:musician",
                    contents: openGraph.musicians
                }));
                break;
            case "music.album":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "music.album"
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:song",
                    contents: openGraph.songs
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:musician",
                    contents: openGraph.musicians
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "music:release_date",
                    content: openGraph.releaseDate
                }));
                break;
            case "music.playlist":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "music.playlist"
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:song",
                    contents: openGraph.songs
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:creator",
                    contents: openGraph.creators
                }));
                break;
            case "music.radio_station":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "music.radio_station"
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "music:creator",
                    contents: openGraph.creators
                }));
                break;
            case "video.movie":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "video.movie"
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:actor",
                    contents: openGraph.actors
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:director",
                    contents: openGraph.directors
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:writer",
                    contents: openGraph.writers
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "video:duration",
                    content: openGraph.duration
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "video:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:tag",
                    contents: openGraph.tags
                }));
                break;
            case "video.episode":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "video.episode"
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:actor",
                    contents: openGraph.actors
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:director",
                    contents: openGraph.directors
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:writer",
                    contents: openGraph.writers
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "video:duration",
                    content: openGraph.duration
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "video:release_date",
                    content: openGraph.releaseDate
                }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
                    propertyPrefix: "video:tag",
                    contents: openGraph.tags
                }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "video:series",
                    content: openGraph.series
                }));
                break;
            case "video.tv_show":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "video.tv_show"
                });
                break;
            case "video.other":
                typedOpenGraph = /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
                    property: "og:type",
                    content: "video.other"
                });
                break;
            default:
                throw new Error("Invalid OpenGraph type: " + openGraph.type);
        }
    }
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:determiner",
        content: openGraph.determiner
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:title",
        content: (_openGraph_title = openGraph.title) == null ? void 0 : _openGraph_title.absolute
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:description",
        content: openGraph.description
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:url",
        content: (_openGraph_url = openGraph.url) == null ? void 0 : _openGraph_url.toString()
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:site_name",
        content: openGraph.siteName
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:locale",
        content: openGraph.locale
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:country_name",
        content: openGraph.countryName
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        property: "og:ttl",
        content: (_openGraph_ttl = openGraph.ttl) == null ? void 0 : _openGraph_ttl.toString()
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:image",
        contents: openGraph.images
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:video",
        contents: openGraph.videos
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:audio",
        contents: openGraph.audio
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:email",
        contents: openGraph.emails
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:phone_number",
        contents: openGraph.phoneNumbers
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:fax_number",
        contents: openGraph.faxNumbers
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "og:locale:alternate",
        contents: openGraph.alternateLocale
    }), typedOpenGraph);
}
function TwitterAppItem({ app , type  }) {
    var _app_url, _app_url_type;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: `twitter:app:name:${type}`,
        content: app.name
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: `twitter:app:id:${type}`,
        content: app.id[type]
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: `twitter:app:url:${type}`,
        content: (_app_url = app.url) == null ? void 0 : (_app_url_type = _app_url[type]) == null ? void 0 : _app_url_type.toString()
    }));
}
function TwitterMetadata({ twitter  }) {
    var _twitter_title;
    if (!twitter) return null;
    const { card  } = twitter;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:card",
        content: card
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:site",
        content: twitter.site
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:site:id",
        content: twitter.siteId
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:creator",
        content: twitter.creator
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:creator:id",
        content: twitter.creatorId
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:title",
        content: (_twitter_title = twitter.title) == null ? void 0 : _twitter_title.absolute
    }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
        name: "twitter:description",
        content: twitter.description
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        namePrefix: "twitter:image",
        contents: twitter.images
    }), card === "player" ? twitter.players.map((player, index)=>/*#__PURE__*/ _react.default.createElement(_react.default.Fragment, {
            key: index
        }, /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            name: "twitter:player",
            content: player.playerUrl.toString()
        }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            name: "twitter:player:stream",
            content: player.streamUrl.toString()
        }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            name: "twitter:player:width",
            content: player.width
        }), /*#__PURE__*/ _react.default.createElement(_meta.Meta, {
            name: "twitter:player:height",
            content: player.height
        }))) : null, card === "app" ? /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "iphone"
    }), /*#__PURE__*/ _react.default.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "ipad"
    }), /*#__PURE__*/ _react.default.createElement(TwitterAppItem, {
        app: twitter.app,
        type: "googleplay"
    })) : null);
}
function AppLinksMeta({ appLinks  }) {
    if (!appLinks) return null;
    return /*#__PURE__*/ _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:ios",
        contents: appLinks.ios
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:iphone",
        contents: appLinks.iphone
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:ipad",
        contents: appLinks.ipad
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:android",
        contents: appLinks.android
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:windows_phone",
        contents: appLinks.windows_phone
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:windows",
        contents: appLinks.windows
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:windows_universal",
        contents: appLinks.windows_universal
    }), /*#__PURE__*/ _react.default.createElement(_meta.MultiMeta, {
        propertyPrefix: "al:web",
        contents: appLinks.web
    }));
}

//# sourceMappingURL=opengraph.js.map