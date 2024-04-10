/*!
 * tinyImageViewer.js v1.0.0
 * (c) 2024-2024 JaxBBLL Liu
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.tinyImageViewer = factory()));
})(this, function () {
  "use strict";

  function tinyImageViewer(config) {
    var defaultConfig = {
      zIndex: 99999,
      space: 0,
      close: function () {},
    };
    var config;
    if (config instanceof HTMLImageElement) {
      config = mergeObjects(defaultConfig, {
        el: config,
      });
    } else {
      config = mergeObjects(defaultConfig, config || {});
    }
    if (config.el instanceof HTMLImageElement) {
      config.src = config.src || config.el.src;
    }
    var rect = config.el.getBoundingClientRect();
    var mask = document.createElement("div");

    addStyles(mask, {
      position: "fixed",
      backgroundColor: "rgba(0,0,0,0)",
      zIndex: config.zIndex,
      transition: "0.5s",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    });

    var maskImg = new Image();
    maskImg.src = config.src;
    mask.appendChild(maskImg);
    setBaseStyle();
    document.body.appendChild(mask);

    setFirstPosition();
    setLastPosition();

    function setBaseStyle() {
      addStyles(maskImg, {
        position: "fixed",
        maxWidth: "calc(100% - " + config.space * 2 + "px)",
        maxHeight: "calc(100% - " + config.space * 2 + "px)",
        transformOrigin: "0 0",
        margin: "auto",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      });
    }

    function setFirstPosition() {
      var lastRect = maskImg.getBoundingClientRect();
      var x = rect.left - lastRect.left;
      var y = rect.top - lastRect.top;
      var scale = rect.width / lastRect.width;

      maskImg.style.transform =
        "translate3d(" + x + "px, " + y + "px, 0) scale(" + scale + ")";
      document.body.clientWidth;
    }

    function setLastPosition() {
      mask.style.backgroundColor = "rgba(0,0,0,0.5)";

      addStyles(maskImg, {
        transition: "0.5s",
        transform: "translate3d(0, 0, 0) scale(1)",
      });

      mask.addEventListener("click", function () {
        mask.style.backgroundColor = "rgba(0,0,0,0)";
        setFirstPosition();

        mask.addEventListener("transitionend", function (e) {
          if (mask.parentNode) {
            mask.parentNode.removeChild(mask);
            config.close();
          }
        });
      });
    }
  }

  function addStyles(o, props) {
    for (var prop in props) {
      o.style[prop] = props[prop];
    }
  }

  function mergeObjects() {
    var mergedObj = {};

    for (var i = 0; i < arguments.length; i++) {
      var obj = arguments[i];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          mergedObj[key] = obj[key];
        }
      }
    }

    return mergedObj;
  }

  return tinyImageViewer;
});
