/*
 * This loader is responsible for extracting the metadata image info for rendering in html
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    raw: null,
    default: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    raw: function() {
        return raw;
    },
    default: function() {
        return _default;
    }
});
const _promises = /*#__PURE__*/ _interop_require_default(require("fs/promises"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _loaderutils3 = /*#__PURE__*/ _interop_require_default(require("next/dist/compiled/loader-utils3"));
const _imageoptimizer = require("../../../server/image-optimizer");
const _mimetype = require("../../../lib/mime-type");
const _fileexists = require("../../../lib/file-exists");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function nextMetadataImageLoader(content) {
    const options = this.getOptions();
    const { type , segment , pageExtensions , basePath  } = options;
    const numericSizes = type === "twitter" || type === "openGraph";
    const { resourcePath , rootContext: context  } = this;
    const { name: fileNameBase , ext  } = _path.default.parse(resourcePath);
    let extension = ext.slice(1);
    if (extension === "jpg") {
        extension = "jpeg";
    }
    const opts = {
        context,
        content
    };
    // No hash query for favicon.ico
    const contentHash = type === "favicon" ? "" : _loaderutils3.default.interpolateName(this, "[contenthash]", opts);
    const interpolatedName = _loaderutils3.default.interpolateName(this, "[name].[ext]", opts);
    const isDynamicResource = pageExtensions.includes(extension);
    const pageSegment = isDynamicResource ? fileNameBase : interpolatedName;
    const hashQuery = contentHash ? "?" + contentHash : "";
    const pathnamePrefix = _path.default.join(basePath, segment);
    if (isDynamicResource) {
        // re-export and spread as `exportedImageData` to avoid non-exported error
        return `\
    import * as exported from ${JSON.stringify(resourcePath)}
    import { fillMetadataSegment } from 'next/dist/lib/metadata/get-metadata-route'

    const imageModule = { ...exported }
    export default async function (props) {
      const { __metadata_id__: _, ...params } = props.params
      const imageUrl = fillMetadataSegment(${JSON.stringify(pathnamePrefix)}, params, ${JSON.stringify(pageSegment)})

      const { generateImageMetadata } = imageModule

      function getImageMetadata(imageMetadata, idParam) {
        const data = {
          alt: imageMetadata.alt,
          type: imageMetadata.contentType || 'image/png',
          url: imageUrl + (idParam ? ('/' + idParam) : '') + ${JSON.stringify(hashQuery)},
        }
        const { size } = imageMetadata
        if (size) {
          ${type === "twitter" || type === "openGraph" ? "data.width = size.width; data.height = size.height;" : 'data.sizes = size.width + "x" + size.height;'}
        }
        return data
      }

      if (generateImageMetadata) {
        const imageMetadataArray = await generateImageMetadata({ params })
        return imageMetadataArray.map((imageMetadata, index) => {
          const idParam = (imageMetadata.id || index) + ''
          return getImageMetadata(imageMetadata, idParam)
        })
      } else {
        return [getImageMetadata(imageModule, '')]
      }
    }`;
    }
    const imageSize = await (0, _imageoptimizer.getImageSize)(content, extension).catch((err)=>err);
    if (imageSize instanceof Error) {
        const err = imageSize;
        err.name = "InvalidImageFormatError";
        throw err;
    }
    const imageData = {
        ...extension in _mimetype.imageExtMimeTypeMap && {
            type: _mimetype.imageExtMimeTypeMap[extension]
        },
        ...numericSizes ? {
            width: imageSize.width,
            height: imageSize.height
        } : {
            sizes: extension === "ico" ? "any" : `${imageSize.width}x${imageSize.height}`
        }
    };
    if (type === "openGraph" || type === "twitter") {
        const altPath = _path.default.join(_path.default.dirname(resourcePath), fileNameBase + ".alt.txt");
        if (await (0, _fileexists.fileExists)(altPath)) {
            imageData.alt = await _promises.default.readFile(altPath, "utf8");
        }
    }
    return `\
  import { fillMetadataSegment } from 'next/dist/lib/metadata/get-metadata-route'

  export default (props) => {
    const imageData = ${JSON.stringify(imageData)}
    const imageUrl = fillMetadataSegment(${JSON.stringify(pathnamePrefix)}, props.params, ${JSON.stringify(pageSegment)})

    return [{
      ...imageData,
      url: imageUrl + ${JSON.stringify(type === "favicon" ? "" : hashQuery)},
    }]
  }`;
}
const raw = true;
const _default = nextMetadataImageLoader;

//# sourceMappingURL=next-metadata-image-loader.js.map