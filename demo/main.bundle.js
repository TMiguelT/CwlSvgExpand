/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(6);
var ErrorCode_1 = __webpack_require__(1);
exports.ensureArray = function (map, key, valueKey) {
    // object is not defined or is null, return an empty array
    if (map === undefined || map === null)
        return [];
    if (Array.isArray(map)) {
        // if the object is already an array of objects, we don't want to transform it
        if (typeof map[0] === "object" || key === undefined) {
            return map.slice();
        }
        else {
            // if it's an array of something else, transform each element into {key: <any>item}
            return map.map(function (item) {
                return (_a = {}, _a[key] = item, _a);
                var _a;
            });
        }
    }
    // if the object is a primitive, wrap it in an array
    if (typeof map === "string" || typeof map === "number" || typeof map === "boolean") {
        return [map];
    }
    // if the object is a hashmap, transform it accordingly
    return Object.keys(map).map(function (prop) {
        /*
         if a valueKey is provided and the property isn't already an object, create an object from the valueKey
         e.g.: map = {foo: "bar"}, key = "id", valueKey = "type"

         return value is [ {id: "foo", type: "bar"} ];
         */
        if (valueKey && exports.checkMapValueType(map) !== "object" && exports.checkValueType(map[prop]) !== "object") {
            return __assign((_a = {}, _a[valueKey] = map[prop], _a), (_b = {}, _b[key] = prop, _b));
        }
        /*
         if they property is already an object, add its hashmap key under the property key provided as a param
         e.g.: map = {foo: {bar: "baz"}}, key = "id", valueKey = "type"

         return value is [ {id: "foo", bar: "baz"} ];
         */
        return __assign({}, map[prop], (_c = {}, _c[key] = prop, _c));
        var _a, _b, _c;
    });
};
/**
 * Checks the type of each property in a hashMap. Returns "mismatch" if property types are mixed,
 * otherwise returns type that corresponds to all properties.
 */
exports.checkMapValueType = function (map) {
    var type = null;
    Object.keys(map).forEach(function (key) {
        var valType = exports.checkValueType(map[key]);
        if (type && valType !== type) {
            type = "mismatch";
            return type;
        }
        else {
            type = valType;
        }
    });
    return type;
};
exports.checkValueType = function (value) {
    var valType;
    if (Array.isArray(value)) {
        valType = "array";
    }
    else if (value === null) {
        valType = "null";
    }
    else if (typeof value === "object") {
        valType = "object";
    }
    else {
        valType = typeof value;
    }
    return valType;
};
exports.incrementString = function (str) {
    var replaced = str.replace(/^(.*?)(\d+$)/gi, function (all, $1, $2) {
        return $1 + ++$2;
    });
    if (replaced === str)
        return str + "_1";
    return replaced;
};
exports.spreadAllProps = function (destObj, sourceObj) {
    return __assign({}, destObj, sourceObj);
};
exports.spreadSelectProps = function (sourceObj, destObj, keys) {
    Object.keys(sourceObj).forEach(function (key) {
        if (keys.indexOf(key) === -1 && sourceObj[key] !== undefined) {
            destObj[key] = sourceObj[key];
        }
    });
};
exports.intersection = function (arrA, arrB) {
    if (arrA === void 0) { arrA = []; }
    if (arrB === void 0) { arrB = []; }
    return arrA.filter(function (item) {
        return arrB.indexOf(item) !== -1;
    });
};
exports.commaSeparatedToArray = function (str) {
    if (!str)
        return [];
    if (Array.isArray(str))
        return str;
    return str.replace(/\s/g, "").split(",");
};
exports.charSeparatedToArray = function (str, pattern) {
    if (!str)
        return [];
    if (Array.isArray(str))
        return str;
    return str.split(pattern).map(function (s) { return s.trim(); });
};
exports.snakeCase = function (str) {
    if (str === void 0) { str = ""; }
    return str.replace(/[\s.\[\/\]-]+/g, "_").replace(/([A-Z])/g, function (match) { return "_" + match.toLowerCase(); });
};
exports.isEmpty = function (obj) {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    else if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).length === 0;
    }
};
exports.fetchByLoc = function (obj, loc) {
    // change "foo.bar[3]['baz']" to "foo.bar.3.'baz'"
    loc = loc.replace(/\[/g, ".[").replace(/[\[\]]/g, "");
    // to ["foo", "bar", "3", "'baz'"]
    var tokens = loc.split(".").filter(function (tok) { return tok.length; });
    var result = obj;
    while (tokens.length) {
        // take first token, remove quotes
        var token = tokens.shift().replace(/["']/g, "");
        // attempt to access property
        try {
            // if token is number, cast to int
            if (!isNaN(token)) {
                result = result[parseInt(token, 10)];
            }
            else {
                // otherwise access property
                result = result[token];
            }
        }
        catch (ex) {
            // if property doesn't exist, return undefined
            return undefined;
        }
    }
    return result;
};
exports.cleanupNull = function (obj) {
    var keys = Object.keys(obj);
    var tmp = __assign({}, obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (obj[key] === undefined || obj[key] === null) {
            delete tmp[key];
        }
    }
    return tmp;
};
exports.nullifyObjValues = function (obj) {
    var keys = Object.keys(obj);
    var tmp = __assign({}, obj);
    for (var i = 0; i < keys.length; i++) {
        tmp[keys[i]] = null;
    }
    return tmp;
};
exports.validateID = function (id) {
    if (!id) {
        throw new ErrorCode_1.ValidityError("ID must be set", ErrorCode_1.ErrorCode.ID_MISSING);
    }
    if (!constants_1.ID_REGEX.test(id)) {
        throw new ErrorCode_1.ValidityError("ID \"" + id + "\" contains invalid characters", ErrorCode_1.ErrorCode.ID_INVALID_CHAR);
    }
};
exports.incrementLastLoc = function (items, prefix) {
    if (items === void 0) { items = []; }
    if (items.length === 0) {
        return prefix + "[0]";
    }
    var lastItem = items[items.length - 1];
    var match = ((lastItem.loc.match(/\[(\d+)]$/g) || [""])[0].match(/\d+/g) || [""])[0];
    if (!match)
        return null;
    match = parseInt(match);
    return prefix + "[" + ++match + "]";
};
/**
 * Returns true if port is of type or type[]
 * If type is an array, will check if port is single item or array of any of types
 * @param port
 * @param type
 */
exports.isType = function (port, type) {
    if (!port.type || !port.type.type) {
        return false;
    }
    if (typeof type === "string")
        type = [type];
    return type.filter(function (t) { return port.type.type === t || port.type.items === t; }).length > 0;
};
exports.checkIfConnectionIsValid = function (pointA, pointB, ltr) {
    if (ltr === void 0) { ltr = true; }
    // if both ports belong to the same step, connection is not possible
    if (pointA.parentStep && pointB.parentStep && pointA.parentStep.id === pointB.parentStep.id) {
        throw new ErrorCode_1.ValidityError("Invalid connection. Source and destination ports belong to the same step", ErrorCode_1.ErrorCode.CONNECTION_SAME_STEP);
    }
    var getType = function (type) {
        if (typeof type === "string") {
            return type;
        }
        if (Array.isArray(type)) {
            return "union";
        }
        if (typeof type === "object" && type !== null) {
            return "object";
        }
    };
    // fetch type
    var pointAType = pointA.type.type;
    var pointBType = pointB.type.type;
    var pointAItems = getType(pointA.type.items);
    var pointBItems = getType(pointB.type.items);
    // match types, defined types can be matched with undefined types
    if (pointAType === pointBType // match exact type
        || ((pointAItems === pointBType || pointAItems === "union") && !ltr) //match File[] to File
        || ((pointBItems === pointAType || pointBItems === "union") && ltr) // match File to File[]
        || pointAType === "null"
        || pointBType === "null") {
        // If union[] -> any[] or vice versa
        if (pointBItems === "union" || pointAItems === "union") {
            return true;
        }
        // If record[] -> object[] or vice versa
        if ((pointBItems === "record" && pointAItems === "object")
            || (pointAItems === "record" && pointBItems === "object")) {
            return true;
        }
        // if both are arrays but not of the same type
        if (pointAItems && pointBItems && pointAItems !== pointBItems) {
            throw new ErrorCode_1.ValidityError("Invalid connection. Connection type mismatch, attempting to connect \"" + pointAItems + "[]\" to \"" + pointBItems + "[]\"", ErrorCode_1.ErrorCode.CONNECTION_TYPE);
        }
        // if type match is file, and fileTypes are defined on both ports,
        // match only if fileTypes match
        if ((pointAType === "File" || pointAItems === "File") && pointB.fileTypes.length && pointA.fileTypes.length) {
            if (!!exports.intersection(pointB.fileTypes.map(function (type) { return type.toLowerCase(); }), pointA.fileTypes.map(function (type) { return type.toLowerCase(); })).length) {
                return true;
            }
            else {
                throw new ErrorCode_1.ValidityError("Invalid connection. File type mismatch, connecting formats \"" + pointA.fileTypes + "\" to \"" + pointB.fileTypes + "\"", ErrorCode_1.ErrorCode.CONNECTION_FILE_TYPE);
            }
        }
        // if not file or fileTypes not defined
        return true;
    }
    // if types are both defined and do not match
    var pointATypeOutput = pointAItems ? "\"" + pointAItems + "[]\"" : "\"" + pointAType + "\"";
    var pointBTypeOutput = pointBItems ? "\"" + pointBItems + "[]\"" : "\"" + pointBType + "\"";
    throw new ErrorCode_1.ValidityError("Invalid connection. Connection type mismatch, attempting to connect " + pointATypeOutput + " to " + pointBTypeOutput, ErrorCode_1.ErrorCode.CONNECTION_TYPE);
};
exports.flatten = function (arr) {
    var _flatten = function (arr, res) {
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i];
            if (Array.isArray(a)) {
                _flatten(a, res);
            }
            else {
                res.push(a);
            }
        }
    };
    var res = [];
    _flatten(arr, res);
    return res;
};
exports.returnNumIfNum = function (s) {
    return isNaN(s) ? s : parseInt(s);
};
exports.isFileType = function (i, required) {
    var requiredMatches = required === undefined || i.type.isNullable !== required;
    return i.type && requiredMatches && (i.type.type === "File" || i.type.items === "File");
};
exports.hasFileType = function (port) {
    if (exports.isFileType(port))
        return true;
    if (Array.isArray(port.type.fields)) {
        for (var i = 0; i < port.type.fields.length; i++) {
            var field = port.type.fields[i];
            if (exports.hasFileType(field))
                return true;
        }
    }
    return false;
};
/**
 * Returns the next available ID based on the provided ID which is unique in the given array.
 * @param {string} id
 * @param {Array<{id: string}>} set
 * @returns {string}
 */
exports.getNextAvailableId = function (id, set) {
    var hasId = true;
    var result = id;
    var len = set.length;
    while (hasId) {
        hasId = false;
        // loop through all inputs and outputs to verify id uniqueness
        for (var i = 0; i < len; i++) {
            if (set[i].id === result) {
                hasId = true;
                // if id exists, increment and check the uniqueness of the incremented id
                result = exports.incrementString(result);
            }
        }
    }
    return result;
};
exports.checkIdValidity = function (id, scope) {
    exports.validateID(id);
    var next = exports.getNextAvailableId(id, scope);
    if (next !== id) {
        throw new ErrorCode_1.ValidityError("ID \"" + id + "\" already exists in this tool, the next available id is \"" + next + "\"", ErrorCode_1.ErrorCode.ID_DUPLICATE);
    }
};
exports.concatIssues = function (base, add, overwrite) {
    var addKeys = Object.keys(add);
    for (var i = 0; i < addKeys.length; i++) {
        var key = addKeys[i];
        // base[key] is an array and add[key] is an item or an array, can be concatenated
        if (base[key] && add[key] !== null) {
            if (overwrite) {
                base[key] = (Array.isArray(add[key]) ? add[key] : [add[key]]);
            }
            else {
                var toAdd = (Array.isArray(add[key]) ? add[key] : [add[key]]);
                for (var i_1 = 0; i_1 < toAdd.length; i_1++) {
                    if (!exports.issueExistsInArray(base[key], toAdd[i_1])) {
                        base[key].push(toAdd[i_1]);
                    }
                }
            }
        }
        else {
            if (Array.isArray(add[key]) || add[key] === null) {
                base[key] = add[key];
            }
            else {
                base[key] = [add[key]];
            }
        }
    }
    return base;
};
exports.issueExistsInArray = function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].code === item.code && arr[i].message === item.message) {
            return true;
        }
    }
    return false;
};
exports.checkPortIdUniqueness = function (ports) {
    var map = {};
    var duplicate = [];
    for (var i = 0; i < ports.length; i++) {
        var p = ports[i];
        if (map[p.id]) {
            duplicate.push(p);
        }
        else {
            map[p.id] = true;
        }
    }
    if (duplicate.length > 0) {
        for (var i = 0; i < duplicate.length; i++) {
            var port = duplicate[i];
            port.setIssue((_a = {},
                _a[port.loc + ".id"] = {
                    type: "error",
                    code: ErrorCode_1.ErrorCode.ID_DUPLICATE,
                    message: "Duplicate id found: \u201C" + port.id + "\u201D"
                },
                _a));
        }
    }
    var _a;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ALL"] = 0] = "ALL";
    ErrorCode[ErrorCode["ID_ALL"] = 100] = "ID_ALL";
    ErrorCode[ErrorCode["ID_INVALID_CHAR"] = 101] = "ID_INVALID_CHAR";
    ErrorCode[ErrorCode["ID_MISSING"] = 102] = "ID_MISSING";
    ErrorCode[ErrorCode["ID_DUPLICATE"] = 103] = "ID_DUPLICATE";
    ErrorCode[ErrorCode["EXPR_ALL"] = 200] = "EXPR_ALL";
    ErrorCode[ErrorCode["EXPR_SYNTAX"] = 201] = "EXPR_SYNTAX";
    ErrorCode[ErrorCode["EXPR_REFERENCE"] = 202] = "EXPR_REFERENCE";
    ErrorCode[ErrorCode["EXPR_TYPE"] = 203] = "EXPR_TYPE";
    ErrorCode[ErrorCode["EXPR_NOT_JSON"] = 204] = "EXPR_NOT_JSON";
    ErrorCode[ErrorCode["CONNECTION_ALL"] = 300] = "CONNECTION_ALL";
    ErrorCode[ErrorCode["CONNECTION_TYPE"] = 301] = "CONNECTION_TYPE";
    ErrorCode[ErrorCode["CONNECTION_FILE_TYPE"] = 302] = "CONNECTION_FILE_TYPE";
    ErrorCode[ErrorCode["CONNECTION_SAME_STEP"] = 303] = "CONNECTION_SAME_STEP";
    ErrorCode[ErrorCode["OUTPUT_ALL"] = 400] = "OUTPUT_ALL";
    ErrorCode[ErrorCode["OUTPUT_GLOB_MISSING"] = 401] = "OUTPUT_GLOB_MISSING";
    ErrorCode[ErrorCode["OUTPUT_EVAL_EXPR"] = 402] = "OUTPUT_EVAL_EXPR";
    ErrorCode[ErrorCode["OUTPUT_EVAL_INHERIT"] = 403] = "OUTPUT_EVAL_INHERIT";
    ErrorCode[ErrorCode["TYPE_ALL"] = 500] = "TYPE_ALL";
    ErrorCode[ErrorCode["TYPE_FIELDS_MISSING"] = 501] = "TYPE_FIELDS_MISSING";
    ErrorCode[ErrorCode["TYPE_ITEMS_MISSING"] = 502] = "TYPE_ITEMS_MISSING";
    ErrorCode[ErrorCode["TYPE_SYMBOLS_MISSING"] = 503] = "TYPE_SYMBOLS_MISSING";
    ErrorCode[ErrorCode["TYPE_NAME_MISSING"] = 504] = "TYPE_NAME_MISSING";
    ErrorCode[ErrorCode["TYPE_EXTRA_PROPS"] = 505] = "TYPE_EXTRA_PROPS";
    ErrorCode[ErrorCode["TYPE_UNSUPPORTED"] = 506] = "TYPE_UNSUPPORTED";
    ErrorCode[ErrorCode["TYPE_FIELD_DUPLICATE_ID"] = 507] = "TYPE_FIELD_DUPLICATE_ID";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var ValidityError = /** @class */ (function (_super) {
    __extends(ValidityError, _super);
    function ValidityError(str, code) {
        var _this = _super.call(this, str) || this;
        _this.code = code;
        return _this;
    }
    return ValidityError;
}(Error));
exports.ValidityError = ValidityError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ValidationBase = /** @class */ (function () {
    function ValidationBase(loc) {
        this.issues = {};
        this._errors = [];
        this._warnings = [];
        this.hasNewErrors = false;
        this.hasNewWarnings = false;
        this.modelListeners = [];
        this.loc = "";
        this.updateParentValidation = function (event) {
        };
        this.loc = loc || "";
        this.issues[this.loc] = [];
    }
    ValidationBase.prototype.clearListeners = function () {
        this.modelListeners.forEach(function (l) { return l(); });
    };
    ;
    Object.defineProperty(ValidationBase.prototype, "warnings", {
        get: function () {
            if (this.hasNewWarnings) {
                this._warnings = this.filterIssues("warning");
                this.hasNewWarnings = false;
            }
            return this._warnings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationBase.prototype, "errors", {
        get: function () {
            if (this.hasNewErrors) {
                this._errors = this.filterIssues("error");
                this.hasNewErrors = false;
            }
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    ValidationBase.prototype.updateValidity = function (event) {
        // sets these issues with the event received
        this.issues = utils_1.concatIssues(this.issues, event.data, event.overwrite);
        this.hasNewErrors = true;
        this.hasNewWarnings = true;
        // sometimes we want to contain warnings/info to the objects where they occur
        if (!event.stopPropagation) {
            this.updateParentValidation(event);
        }
    };
    ValidationBase.prototype.setIssue = function (data, stopPropagation) {
        if (stopPropagation === void 0) { stopPropagation = false; }
        this.updateValidity({ data: data, overwrite: false, stopPropagation: stopPropagation });
    };
    ValidationBase.prototype.clearIssue = function (code) {
        var hadIssue = false;
        var isGroup = code % 100 === 0;
        var group = code / 100;
        for (var key in this.issues) {
            if (this.issues[key].length) {
                if (code === ErrorCode_1.ErrorCode.ALL) {
                    hadIssue = true;
                    this.issues[key] = [];
                }
                else {
                    var initLen = this.issues[key].length;
                    this.issues[key] = this.issues[key].filter(function (i) {
                        if (isGroup) {
                            return Math.floor(i.code / 100) !== group;
                        }
                        return i.code !== code;
                    });
                    hadIssue = initLen !== this.issues[key].length || hadIssue;
                }
            }
        }
        if (hadIssue) {
            this.updateValidity({
                data: this.issues,
                overwrite: true
            });
        }
    };
    /**
     * @deprecated
     */
    ValidationBase.prototype.cleanValidity = function () {
    };
    /**
     * Updates location and propagates validity up the tree
     * @param newLoc
     */
    ValidationBase.prototype.updateLoc = function (newLoc) {
        var oldLoc = this.loc;
        this.issues[newLoc] = this.issues[oldLoc];
        delete this.issues[oldLoc];
        this.loc = newLoc;
        // @todo this doesn't change the location of all nested children!
        this.updateValidity({
            data: this.issues,
            overwrite: true
        });
    };
    ValidationBase.prototype.setValidationCallback = function (fn) {
        this.updateParentValidation = fn;
    };
    /**
     * @param {"warning" | "error" | "info"} type
     * @returns {Array}
     */
    ValidationBase.prototype.filterIssues = function (type) {
        if (type === void 0) { type = "error"; }
        var res = [];
        var _loop_1 = function (key) {
            if (this_1.issues[key].length) {
                var filter = this_1.issues[key].filter(function (i) { return i.type === type; });
                var map = filter.map(function (i) { return (__assign({}, i, { loc: key })); });
                res = res.concat(map);
            }
        };
        var this_1 = this;
        for (var key in this.issues) {
            _loop_1(key);
        }
        return res;
    };
    /**
     * @deprecated
     * @param args
     * @returns {Promise<any>}
     */
    ValidationBase.prototype.validate = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        new UnimplementedMethodException_1.UnimplementedMethodException("validate");
        return new Promise(function (res) {
            res(_this.issues);
        });
    };
    return ValidationBase;
}());
exports.ValidationBase = ValidationBase;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException = /** @class */ (function () {
    function UnimplementedMethodException(method, parent) {
        //Temporarily disabling this log so it doesn't pollute actual debugging
        // const prefix = `${parent || ""}${parent ? "." : ""}`;
        // console.warn(`Expected child class to implement ${prefix}${method}.`);
    }
    return UnimplementedMethodException;
}());
exports.UnimplementedMethodException = UnimplementedMethodException;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TypeResolver_1 = __webpack_require__(27);
var ValidationBase_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ParameterTypeModel = /** @class */ (function (_super) {
    __extends(ParameterTypeModel, _super);
    function ParameterTypeModel(type, fieldConstructor, nameBase, loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.customProps = {};
        _this.hasDirectoryType = false;
        _this._items = null;
        _this.isNullable = false;
        _this.isItemOrArray = false;
        _this.typeBinding = null;
        _this.fields = null;
        _this._symbols = null;
        _this.name = null;
        _this.unionType = null;
        _this.nameBase = "field";
        _this.fieldConstructor = fieldConstructor;
        _this.eventHub = eventHub;
        _this.nameBase = nameBase;
        _this.deserialize(type);
        return _this;
    }
    Object.defineProperty(ParameterTypeModel.prototype, "symbols", {
        get: function () {
            return this._symbols;
        },
        set: function (value) {
            this._symbols = value;
            if (this.eventHub) {
                this.eventHub.emit("io.change.type", this.loc);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (t) {
            if (t && this._type !== "array") {
                throw ("ParameterTypeModel: Items can only be set to inputs type Array");
            }
            else if (t !== undefined && this._items !== t) {
                switch (t) {
                    case "enum":
                        this._symbols = [];
                        this.removeAllFields();
                        break;
                    case "record":
                        this.fields = [];
                        this._symbols = null;
                        break;
                    default:
                        this._symbols = null;
                        this.removeAllFields();
                }
                this._items = t;
                if (this.eventHub) {
                    this.eventHub.emit("io.change.type", this.loc);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeModel.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (t) {
            if (t !== undefined && this._type === t) {
                return;
            }
            this._type = t;
            switch (t) {
                case "array":
                    this._symbols = null;
                    this.removeAllFields();
                    break;
                case "enum":
                    this._items = null;
                    this.removeAllFields();
                    this._symbols = this._symbols || [];
                    break;
                case "record":
                    this._items = null;
                    this._symbols = null;
                    this.fields = this.fields || [];
                    break;
                default:
                    this._items = null;
                    this._symbols = null;
                    this.removeAllFields();
            }
            if (this.eventHub) {
                this.eventHub.emit("io.change.type", this.loc);
            }
        },
        enumerable: true,
        configurable: true
    });
    ParameterTypeModel.prototype.validate = function (context) {
        var _this = this;
        if (context === void 0) { context = {}; }
        this.clearIssue(ErrorCode_1.ErrorCode.TYPE_ALL);
        var promises = [];
        // check type
        // if array, has items. Does not have symbols or items
        if (this.type === "array") {
            if (this.items === null) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        type: "error",
                        message: "Type array must have items",
                        code: ErrorCode_1.ErrorCode.TYPE_ITEMS_MISSING
                    },
                    _a));
            }
            if (this._symbols && this.items !== "enum") {
                this.setIssue((_b = {},
                    _b[this.loc + ".symbols"] = {
                        type: "error",
                        message: "Type array must not have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_SYMBOLS_MISSING
                    },
                    _b));
            }
            if (this.fields && this.items !== "record") {
                this.setIssue((_c = {},
                    _c[this.loc + ".fields"] = {
                        type: "error",
                        message: "Type array must not have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_FIELDS_MISSING
                    },
                    _c));
            }
        }
        // if enum, has symbols. Does not have items or fields. Has name.
        if (this.type === "enum") {
            if (this.items) {
                this.setIssue((_d = {},
                    _d[this.loc + ".items"] = {
                        type: "error",
                        message: "Type enum must not have items",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _d));
            }
            if (!this._symbols) {
                this.setIssue((_e = {},
                    _e[this.loc] = {
                        type: "error",
                        message: "Type enum must have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _e));
            }
            if (this.fields) {
                this.setIssue((_f = {},
                    _f[this.loc + ".fields"] = {
                        type: "error",
                        message: "Type enum must not have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _f));
            }
            if (!this.name) {
                this.setIssue((_g = {},
                    _g["" + this.loc] = {
                        type: "error",
                        message: "Type enum must have a name",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _g));
            }
        }
        // if record, has fields. Does not have items or symbols. Has name.
        if (this.type === "record") {
            if (this.items) {
                this.setIssue((_h = {},
                    _h[this.loc + ".items"] = {
                        type: "error",
                        message: "Type record must not have items",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _h));
            }
            if (this._symbols) {
                this.setIssue((_j = {},
                    _j[this.loc + ".symbols"] = {
                        type: "error",
                        message: "Type record must not have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _j));
            }
            if (!this.fields) {
                this.setIssue((_k = {},
                    _k["" + this.loc] = {
                        type: "error",
                        message: "Type record must have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _k));
            }
            else {
                // promises.concat(this.fields.map(field => field.validate(context)));
            }
            if (!this.name) {
                this.setIssue((_l = {},
                    _l[this.loc + ".type"] = {
                        type: "error",
                        message: "Type record must have a name",
                        code: ErrorCode_1.ErrorCode.TYPE_NAME_MISSING
                    },
                    _l));
            }
        }
        if (this.unionType) {
            this.setIssue((_m = {},
                _m[this.loc] = {
                    type: "info",
                    message: "Union type is not supported yet: " + this.unionType,
                    code: ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED
                },
                _m));
        }
        return Promise.all(promises).then(function (res) {
            return _this.issues;
        });
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    };
    ParameterTypeModel.prototype.serialize = function (version) {
        var type = TypeResolver_1.TypeResolver.serializeType(this, version);
        if (typeof type === "object" && !Array.isArray(type) && version !== "v1.0" && type !== null) {
            type = __assign({}, type, this.customProps);
        }
        return type;
    };
    ParameterTypeModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["type", "name", "_symbols", "fields", "items", "inputBinding", "outputBinding"];
        try {
            TypeResolver_1.TypeResolver.resolveType(attr, this);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc] = {
                    message: ex.message,
                    type: "error",
                    code: ex.code
                },
                _a));
        }
        // populates object with all custom attributes not covered in model
        if (typeof attr === "object" && attr !== null && !Array.isArray(attr)) {
            utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
        }
        if (this.fields) {
            this.fields = utils_1.ensureArray(this.fields, "name", "type").map(function (field, index) {
                var f = new _this.fieldConstructor(field, _this.loc + ".fields[" + index + "]", _this.eventHub);
                f.isField = true;
                f.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return f;
            });
        }
        var _a;
    };
    ParameterTypeModel.prototype.updateLoc = function (loc) {
        var _this = this;
        _super.prototype.updateLoc.call(this, loc);
        if (this.fields && this.fields.length) {
            this.fields.forEach(function (f, i) { return f.updateLoc(_this.loc + ".fields[" + i + "]"); });
        }
    };
    ParameterTypeModel.prototype.setType = function (t) {
        this._type = t;
        switch (t) {
            case "array":
                this._symbols = null;
                this.removeAllFields();
                break;
            case "enum":
                this._items = null;
                this.removeAllFields();
                break;
            case "record":
                this._items = null;
                this._symbols = null;
                break;
        }
        if (this.eventHub) {
            this.eventHub.emit("io.change.type", this.loc);
        }
    };
    ParameterTypeModel.prototype.getNextAvailableName = function (id) {
        var hasId = true;
        var result = id;
        var set = this.fields;
        var len = set.length;
        while (hasId) {
            hasId = false;
            // loop through all inputs and outputs to verify id uniqueness
            for (var i = 0; i < len; i++) {
                if (set[i].id === result) {
                    hasId = true;
                    // if id exists, increment and check the uniqueness of the incremented id
                    result = utils_1.incrementString(result);
                }
            }
        }
        return result;
    };
    ParameterTypeModel.prototype.addField = function (field) {
        var _this = this;
        if (field === void 0) { field = {}; }
        if (this.type !== "record" && this.items !== "record") {
            throw new Error("Fields can only be added to type or items record: type is " + this.type + ", items is " + this.items + ".");
        }
        else {
            if (field.id) {
                var duplicate = this.fields.filter(function (val) {
                    return val.id === field.name
                        || val.id === field.id;
                });
                if (duplicate.length > 0) {
                    this.setIssue((_a = {},
                        _a[this.loc] = {
                            message: "Field with name \"" + duplicate[0].id + "\" already exists",
                            type: "error",
                            code: ErrorCode_1.ErrorCode.TYPE_FIELD_DUPLICATE_ID
                        },
                        _a));
                }
            }
            if (field instanceof this.fieldConstructor) {
                field.loc = this.loc + ".fields[" + this.fields.length + "]";
                field.setValidationCallback(function (err) { return _this.updateValidity(err); });
                if (this.eventHub) {
                    this.eventHub.emit("field.create", field);
                }
                this.fields.push(field);
                return field;
            }
            else {
                field.name = field.name || this.getNextAvailableName(this.nameBase);
                var loc = utils_1.incrementLastLoc(this.fields, this.loc + ".fields");
                var f = new this.fieldConstructor(field, loc, this.eventHub);
                f.setValidationCallback(function (err) { return _this.updateValidity(err); });
                if (this.eventHub) {
                    this.eventHub.emit("field.create", f);
                }
                this.fields.push(f);
                return f;
            }
        }
        var _a;
    };
    ParameterTypeModel.prototype.removeField = function (field) {
        var found;
        if (typeof field === "string") {
            found = this.fields.filter(function (val) { return val.id === field; })[0];
        }
        else {
            found = field;
        }
        found.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var index = this.fields.indexOf(found);
        if (index < 0) {
            throw ("Field " + field + " does not exist on input");
        }
        this.fields.splice(index, 1);
        for (var i = index; i < this.fields.length; i++) {
            this.fields[i].updateLoc(this.loc + ".fields[" + i + "]");
        }
        if (this.eventHub) {
            this.eventHub.emit("field.remove", found);
        }
    };
    ParameterTypeModel.prototype.removeAllFields = function () {
        if (this.fields && this.fields.length) {
            this.fields.forEach(function (f) {
                f.clearIssue(ErrorCode_1.ErrorCode.ALL);
            });
        }
        this.fields = null;
    };
    return ParameterTypeModel;
}(ValidationBase_1.ValidationBase));
exports.ParameterTypeModel = ParameterTypeModel;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var ExpressionEvaluator_1 = __webpack_require__(17);
var V1ExpressionModel = /** @class */ (function (_super) {
    __extends(V1ExpressionModel, _super);
    function V1ExpressionModel(expression, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.value = "";
        _this.tokens = [];
        if (expression instanceof V1ExpressionModel) {
            expression = expression.serialize();
        }
        if (expression)
            _this.deserialize(expression);
        if (_this.eventHub) {
            _this.eventHub.emit("expression.create", _this);
        }
        return _this;
    }
    V1ExpressionModel.prototype.serialize = function () {
        if (this.type === "expression" && this.eventHub) {
            this.eventHub.emit("expression.serialize", true);
        }
        return this.value !== "" ? this.value : undefined;
    };
    V1ExpressionModel.prototype.deserialize = function (attr) {
        if (typeof attr === "string") {
            this.value = attr;
            this.tokenizeAndSetType(attr);
        }
    };
    V1ExpressionModel.prototype.tokenizeAndSetType = function (str) {
        // parse expression
        this.tokens = ExpressionEvaluator_1.ExpressionEvaluator.grabExpressions(str || "") || [];
        // if expression is literal, type is string, otherwise it's complex (expression or function)
        this.type = this.tokens.length === 1 && this.tokens[0].type === "literal" || this.tokens.length === 0 ? "string" : "expression";
        return this.tokens;
    };
    V1ExpressionModel.prototype.evaluate = function (context) {
        if (context === void 0) { context = this.cachedContext; }
        if (this.value !== undefined) {
            return this._evaluate(this.value, context, "v1.0");
        }
        return new Promise(function (res) {
            res(undefined);
        });
    };
    V1ExpressionModel.prototype.setValue = function (val, type) {
        this.result = undefined;
        this.tokenizeAndSetType(val);
        this.value = val;
        if (this.eventHub) {
            this.eventHub.emit("expression.change", this);
        }
    };
    V1ExpressionModel.prototype.getScript = function () {
        return this.value;
    };
    V1ExpressionModel.prototype.toString = function () {
        return this.value || "";
    };
    V1ExpressionModel.prototype.clone = function () {
        return new V1ExpressionModel(this.serialize(), this.loc, this.eventHub);
    };
    V1ExpressionModel.prototype.cloneStatus = function (clone) {
        this.setValue(clone.serialize());
        this.setIssue(__assign({}, clone.issues));
    };
    return V1ExpressionModel;
}(ExpressionModel_1.ExpressionModel));
exports.V1ExpressionModel = V1ExpressionModel;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.STEP_INPUT_CONNECTION_PREFIX = "in/";
exports.STEP_OUTPUT_CONNECTION_PREFIX = "out/";
exports.ID_REGEX = /^[a-zA-Z0-9_;/?\-:@&=+$,.#!~*'()\[\]]*$/;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var SBDraft2ExpressionModel = /** @class */ (function (_super) {
    __extends(SBDraft2ExpressionModel, _super);
    function SBDraft2ExpressionModel(value, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        // guard against passing something that is already wrapped
        if (value instanceof SBDraft2ExpressionModel) {
            value = value.serialize();
        }
        _this.deserialize(value);
        if (value) {
            _this.type = value.script ? "expression" : "string";
        }
        if (_this.eventHub) {
            _this.eventHub.emit("expression.create", _this);
        }
        return _this;
    }
    /**
     * Evaluates expression and sets its result to result property.
     *
     * If expression throws a SyntaxError, no result is returned and the syntax error is pushed to
     * validation.errors. If expression throws any other exception, it is pushed to validation.warnings
     *
     * @param context
     * @returns {any}
     */
    SBDraft2ExpressionModel.prototype.evaluate = function (context) {
        if (context === void 0) { context = this.cachedContext; }
        if (this.value !== undefined) {
            return this._evaluate(this.value, context, "draft-2");
        }
        return new Promise(function (res) { res(undefined); });
    };
    /**
     * Returns CWL representation.
     */
    SBDraft2ExpressionModel.prototype.serialize = function () {
        if (this.type === "expression" && this.eventHub) {
            this.eventHub.emit("expression.serialize", true);
        }
        if (this.value && this.value.hasOwnProperty("script") && this.value.script === "") {
            return undefined;
        }
        else if (this.value === "" || this.value === null) {
            return undefined;
        }
        return this.value;
    };
    /**
     * Sets CWL representation as internal value
     */
    SBDraft2ExpressionModel.prototype.deserialize = function (val) {
        if (val === void 0) { val = ""; }
        this.value = val;
    };
    /**
     * Sets value of expression.script or primitive based on type parameter.
     */
    SBDraft2ExpressionModel.prototype.setValue = function (val, type) {
        this.result = undefined;
        if (type === "expression" && typeof val === "string") {
            this.value = {
                "class": "Expression",
                engine: "#cwl-js-engine",
                script: val.trim() === "" ? "" : val
            };
        }
        else {
            this.value = val;
        }
        this.type = type;
        if (this.eventHub) {
            this.eventHub.emit("expression.change", this);
        }
    };
    /**
     * Returns string representation of expression.script or primitive value.
     * @returns {string}
     */
    SBDraft2ExpressionModel.prototype.toString = function () {
        if (this.type === "expression") {
            return this.value.script;
        }
        else if (this.value === null || this.value === undefined) {
            return "";
        }
        else {
            return this.value.toString();
        }
    };
    /**
     * Returns script value of expression.script, or undefined if not set.
     * @returns {string}
     */
    SBDraft2ExpressionModel.prototype.getScript = function () {
        return this.value !== undefined && this.value !== null ?
            this.value.script :
            undefined;
    };
    SBDraft2ExpressionModel.prototype.clone = function () {
        return new SBDraft2ExpressionModel(this.serialize(), this.loc, this.eventHub);
    };
    SBDraft2ExpressionModel.prototype.cloneStatus = function (clone) {
        this.setValue(clone.serialize(), clone.type);
        this.setIssue(__assign({}, clone.issues));
    };
    return SBDraft2ExpressionModel;
}(ExpressionModel_1.ExpressionModel));
exports.SBDraft2ExpressionModel = SBDraft2ExpressionModel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PluginBase = /** @class */ (function () {
    function PluginBase() {
    }
    PluginBase.prototype.registerWorkflow = function (workflow) {
        this.workflow = workflow;
    };
    PluginBase.prototype.registerOnBeforeChange = function (fn) {
        this.onBeforeChange = fn;
    };
    PluginBase.prototype.registerOnAfterChange = function (fn) {
        this.onAfterChange = fn;
    };
    PluginBase.prototype.registerOnAfterRender = function (fn) {
        this.onAfterRender = fn;
    };
    return PluginBase;
}());
exports.PluginBase = PluginBase;
//# sourceMappingURL=plugin-base.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var ExpressionEvaluator_1 = __webpack_require__(17);
var ErrorCode_1 = __webpack_require__(1);
var ExpressionModel = /** @class */ (function (_super) {
    __extends(ExpressionModel, _super);
    function ExpressionModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        _this.cachedContext = {};
        /** Internal type */
        _this._type = "string";
        return _this;
    }
    Object.defineProperty(ExpressionModel.prototype, "type", {
        /** Getter for model type. Returns internal representation */
        get: function () {
            return this._type;
        },
        /** Setter for model type. Model holds either expression or primitive like "string" */
        set: function (type) {
            if (type !== "string" && type !== "expression" && type !== "number") {
                throw new TypeError("Unknown ExpressionModel type. \"" + type + "\" does not exist or is not supported yet.");
            }
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpressionModel.prototype, "isExpression", {
        /** Flag if model contains expression */
        get: function () {
            return this.type === "expression";
        },
        enumerable: true,
        configurable: true
    });
    ;
    ExpressionModel.prototype.validate = function (context) {
        var _this = this;
        return this.evaluate(context).then(function (suc) {
            _this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        }, function (err) {
            _this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
            _this.setIssue((_a = {},
                _a[_this.loc] = {
                    type: err.type,
                    message: err.message,
                    code: err.code
                },
                _a));
            var _a;
        });
    };
    ExpressionModel.prototype._evaluate = function (value, context, version) {
        var _this = this;
        return new Promise(function (res, rej) {
            ExpressionEvaluator_1.ExpressionEvaluator.evaluate(value, context, version).then(function (suc) {
                _this.result = suc;
                res(suc);
            }, function (ex) {
                var message = ex.message;
                var code = ErrorCode_1.ErrorCode.EXPR_SYNTAX;
                if (ex.message.startsWith("Uncaught DataCloneError")) {
                    message = "Error: Return value should have transferable data (fully JSON-serializable)";
                    code = ErrorCode_1.ErrorCode.EXPR_NOT_JSON;
                }
                var err = { loc: _this.loc, message: message, code: code };
                if (ex.message.startsWith("Uncaught SyntaxError") || ex.name === "SyntaxError") {
                    rej(Object.assign({ type: "error" }, err));
                }
                else {
                    if (ex.message.startsWith("Uncaught ReferenceError") || ex.name === "ReferenceError") {
                        code = ErrorCode_1.ErrorCode.EXPR_REFERENCE;
                    }
                    else if (ex.message.startsWith("Uncaught TypeError") || ex.name === "TypeError") {
                        code = ErrorCode_1.ErrorCode.EXPR_TYPE;
                    }
                    rej(Object.assign({ type: "warning", code: code }, err));
                }
            });
        });
    };
    return ExpressionModel;
}(ValidationBase_1.ValidationBase));
exports.ExpressionModel = ExpressionModel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(CommandInputParameterModel, _super);
    function CommandInputParameterModel(loc, event) {
        var _this = _super.call(this, loc) || this;
        /** Flag if input is field of a parent record. Derived from type field */
        _this.isField = false;
        _this.customProps = {};
        _this.eventHub = event;
        return _this;
    }
    Object.defineProperty(CommandInputParameterModel.prototype, "isBound", {
        get: function () {
            return this.inputBinding !== undefined && this.inputBinding !== null;
        },
        enumerable: true,
        configurable: true
    });
    CommandInputParameterModel.prototype.removeInputBinding = function () {
        if (this.inputBinding) {
            this.inputBinding.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        }
        if (!this.hasSecondaryFilesInRoot) {
            this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
            this.secondaryFiles = [];
        }
        this.inputBinding = null;
    };
    CommandInputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    CommandInputParameterModel.prototype._addSecondaryFile = function (file, exprConstructor, locBase) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.secondaryFiles, locBase + ".secondaryFiles");
        var f = new exprConstructor(file, loc, this.eventHub);
        this.secondaryFiles.push(f);
        f.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return f;
    };
    CommandInputParameterModel.prototype._updateSecondaryFiles = function (files) {
        var _this = this;
        this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.secondaryFiles = [];
        files.forEach(function (f) { return _this.addSecondaryFile(f); });
    };
    CommandInputParameterModel.prototype._removeSecondaryFile = function (index) {
        var file = this.secondaryFiles[index];
        if (file) {
            file.setValue("", "string");
            this.secondaryFiles.splice(index, 1);
        }
    };
    CommandInputParameterModel.prototype.validate = function (context) {
        var promises = [];
        // id
        try {
            utils_1.validateID(this.id);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        // inputBinding
        if (this.inputBinding) {
            promises.push(this.inputBinding.validate(context));
        }
        // type
        if (this.type) {
            promises.push(this.type.validate(context));
        }
        // secondaryFiles
        if (this.secondaryFiles) {
            promises.concat(this.secondaryFiles.map(function (file) { return file.validate(context); }));
        }
        return Promise.all(promises);
        var _a;
    };
    CommandInputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandInputParameterModel");
        return undefined;
    };
    CommandInputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandInputParameterModel");
    };
    CommandInputParameterModel.prototype.attachFileTypeListeners = function () {
        var _this = this;
        if (this.eventHub) {
            this.modelListeners.push(this.eventHub.on("io.change.type", function (loc) {
                if (_this.loc + ".type" === loc) {
                    if (!utils_1.isFileType(_this)) {
                        _this.updateSecondaryFiles([]);
                    }
                }
            }));
        }
    };
    return CommandInputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.CommandInputParameterModel = CommandInputParameterModel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(6);
var EventHub_1 = __webpack_require__(40);
var Graph_1 = __webpack_require__(41);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ValidationBase_1 = __webpack_require__(2);
var V1WorkflowOutputParameterModel_1 = __webpack_require__(42);
var RequirementBaseModel_1 = __webpack_require__(14);
var StepModel_1 = __webpack_require__(18);
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var WorkflowOutputParameterModel_1 = __webpack_require__(16);
var WorkflowStepInputModel_1 = __webpack_require__(19);
var WorkflowStepOutputModel_1 = __webpack_require__(20);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowModel = /** @class */ (function (_super) {
    __extends(WorkflowModel, _super);
    function WorkflowModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this["class"] = "Workflow";
        _this.hasBatch = false;
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.hints = [];
        _this.customProps = {};
        _this.eventHub = new EventHub_1.EventHub([
            "step.create",
            "step.remove",
            "step.change",
            "step.update",
            "step.change.id",
            "step.inPort.show",
            "step.inPort.hide",
            "step.inPort.remove",
            "step.inPort.create",
            "step.outPort.remove",
            "step.outPort.create",
            "step.port.change",
            "connections.updated",
            "input.remove",
            "input.create",
            "output.create",
            "output.remove",
            "io.change",
            "io.change.id",
            "io.change.type",
            "connection.create",
            "connection.remove"
        ]);
        _this.initializeGraphWatchers();
        return _this;
    }
    Object.defineProperty(WorkflowModel.prototype, "connections", {
        get: function () {
            return Array.from(this.graph.edges);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowModel.prototype, "nodes", {
        get: function () {
            return Array.from(this.graph.vertices);
        },
        enumerable: true,
        configurable: true
    });
    WorkflowModel.prototype.addVertex = function (connectionId, node, graph) {
        if (graph === void 0) { graph = this.graph; }
        try {
            graph.addVertex(connectionId, node, function onConflict() {
                node.id = this.getNextAvailableId(node.connectionId, !(node instanceof StepModel_1.StepModel), graph);
                graph.addVertex(node.connectionId, node, onConflict);
            }.bind(this));
        }
        catch (ex) {
            node.setIssue((_a = {},
                _a[node.loc] = {
                    message: ex.message,
                    code: ex.code,
                    type: "error"
                },
                _a));
        }
        var _a;
    };
    WorkflowModel.prototype.initializeGraphWatchers = function () {
        var _this = this;
        /**
         * Adds inPort to graph
         * called on step update
         * @name step.inPort.create
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.inPort.create", function (port) {
            _this.addVertex(port.connectionId, port);
            _this.graph.addEdge({
                id: port.connectionId,
                type: "StepInput"
            }, {
                id: port.parentStep.id,
                type: "Step"
            }, false);
        });
        /**
         * Adds outPort to graph
         * called on step update
         * @name step.outPort.create
         * @see StepModel.compareOutPorts
         */
        this.eventHub.on("step.outPort.create", function (port) {
            _this.addVertex(port.connectionId, port);
            _this.graph.addEdge({
                id: port.parentStep.id,
                type: "Step"
            }, {
                id: port.connectionId,
                type: "StepOutput"
            }, false);
        });
        /**
         * Remove input port
         * called when step is updated StepModel.setRunProcess
         * @name step.inPort.remove
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.inPort.remove", function (port) {
            _this.clearPort(port);
            _this.graph.removeVertex(port.connectionId);
            // clean up connection between port and step
            _this.graph.removeEdge([port.connectionId, port.parentStep.connectionId]);
        });
        /**
         * Remove output port
         * called when step is updated
         * @name step.outPort.remove
         * @see StepModel.compareOutPorts
         */
        this.eventHub.on("step.outPort.remove", function (port) {
            _this.clearOutPort(port);
            _this.graph.removeVertex(port.connectionId);
            // clean up connection between step and port
            _this.graph.removeEdge([port.parentStep.connectionId, port.connectionId]);
        });
        /**
         * Changes value of existing node in workflow
         * called when step is updated
         * @name step.port.change
         * @see StepModel.compareOutPorts
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.port.change", function (port) {
            _this.graph.setVertexData(port.connectionId, port);
            // check if port is connected to a workflow output
            if (port instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel && _this.graph.hasOutgoing(port.connectionId)) {
                var temporaryEdges = Array.from(_this.graph.edges);
                temporaryEdges.forEach(function (e) {
                    if (e.source.id === port.connectionId) {
                        var oldOutput = _this.findById(e.destination.id);
                        // make sure the destination is a workflow output and is only connected to the port which changed
                        if (!(oldOutput instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) || oldOutput.source.length !== 1)
                            return;
                        // remove the outdated workflow output first to avoid an infinite loop and duplicate ids
                        _this.removeOutput(oldOutput);
                        // create a new workflow output in place of the one which changed
                        _this.createOutputFromPort(port.connectionId, { customProps: oldOutput.customProps });
                    }
                });
            }
        });
    };
    WorkflowModel.prototype.on = function (event, handler) {
        return {
            dispose: this.eventHub.on(event, handler)
        };
    };
    WorkflowModel.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        new UnimplementedMethodException_1.UnimplementedMethodException("serializeEmbedded", "WorkflowModel");
    };
    WorkflowModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowModel");
    };
    WorkflowModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowModel");
    };
    WorkflowModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "WorkflowModel");
        return null;
    };
    WorkflowModel.prototype.createReq = function (req, constructor, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, constructor, loc);
        reqModel.isHint = hint;
        this[property].push(reqModel);
        reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return reqModel;
    };
    WorkflowModel.prototype.setBatch = function (input, type) {
    };
    ;
    WorkflowModel.prototype.findById = function (connectionId) {
        return this.graph.getVertexData(connectionId);
    };
    WorkflowModel.prototype._exposePort = function (inPort, inputConstructor) {
        // remove extraneous connections to this port and set it as invisible
        this.clearPort(inPort);
        return this._createInputFromPort(inPort, inputConstructor, false, true);
    };
    /**
     * Expose creates an input on the workflow level and connects it with the exposed port
     * Sets inPort.isVisible to false
     * Sets input.isVisible to false
     */
    WorkflowModel.prototype.exposePort = function (inPort) {
        new UnimplementedMethodException_1.UnimplementedMethodException("exposePort", "WorkflowModel");
    };
    /**
     * Adds inPort to graph and makes a connection between it and its step
     * sets inPort.isVisible to true
     *
     * @name step.inPort.show
     */
    WorkflowModel.prototype.includePort = function (inPort) {
        // check if port was exposed before including it
        if (inPort.status === "exposed") {
            this.clearPort(inPort);
        }
        // add port to canvas
        inPort.isVisible = true;
        // if the port has not been added to the graph yet
        if (!this.graph.hasVertex(inPort.connectionId)) {
            this.addVertex(inPort.connectionId, inPort);
            this.graph.addEdge({
                id: inPort.parentStep.id,
                type: "StepInput"
            }, {
                id: inPort.connectionId,
                type: "Step"
            }, true);
        }
        this.eventHub.emit("step.inPort.show", inPort);
    };
    /**
     * Removes connections to port to out/inputs, removes dangling inputs, sets port to invisible
     *
     * @name step.inPort.hide
     */
    WorkflowModel.prototype.clearPort = function (inPort) {
        // loop through sources, removing their connections and clearing dangling inputs
        while (inPort.source.length) {
            // because disconnect will remove the source once disconnected, we'll just reference it here
            var source = inPort.source[0];
            var sourceConnectionId = this.getSourceConnectionId(source);
            // disconnect takes care of edges and dangling inputs
            this.disconnect(sourceConnectionId, inPort.connectionId);
        }
        // remove visibility on the port so it isn't shown on canvas anymore
        inPort.isVisible = false;
        // send an event so the canvas knows it should hide it
        this.eventHub.emit("step.inPort.hide", inPort);
        inPort.clearIssue(ErrorCode_1.ErrorCode.ALL);
    };
    WorkflowModel.prototype.clearOutPort = function (outPort) {
        var _this = this;
        this.graph.edges.forEach(function (e) {
            // if the edge is connected to the output, it needs to be cleared and removed
            if (e.source.id === outPort.connectionId) {
                // if a connection is found, disconnect it
                // this handles dangling outputs
                _this.disconnect(outPort.connectionId, e.destination.id);
            }
        });
        outPort.isVisible = false;
    };
    /**
     * Checks if a workflow input has been leftover after removing
     */
    WorkflowModel.prototype.removeDanglingInput = function (connectionId) {
        var _this = this;
        // remove dangling input if it has been left over
        if (!this.graph.hasOutgoing(connectionId)) {
            this.graph.removeVertex(connectionId);
            this.inputs = this.inputs.filter(function (input) {
                if (input.connectionId === connectionId) {
                    _this.eventHub.emit("input.remove", input);
                    return false;
                }
                return true;
            });
        }
    };
    WorkflowModel.prototype.removeDanglingOutput = function (connectionId) {
        var _this = this;
        if (!this.graph.hasIncoming(connectionId)) {
            this.graph.removeVertex(connectionId);
            this.outputs = this.outputs.filter(function (output) {
                if (output.connectionId === connectionId) {
                    output.clearIssue(ErrorCode_1.ErrorCode.ALL);
                    _this.eventHub.emit("output.remove", output);
                    return false;
                }
                return true;
            });
        }
    };
    /**
     * Removes step from workflow and from graph
     * removes all connections to step and cleans up dangling inputs
     * @param step
     */
    WorkflowModel.prototype.removeStep = function (step) {
        if (typeof step === "string") {
            step = this.graph.getVertexData(step);
        }
        // remove step from wf.steps
        for (var i = 0; i < this.steps.length; i++) {
            if (this.steps[i].id === step.id) {
                this.steps[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.steps.splice(i, 1);
                break;
            }
        }
        // remove step from graph and remove all connections
        this.removeStepFromGraph(step);
        // removes inputs that were connected solely to step.in
        var inp = this.inputs.length;
        while (inp--) {
            this.removeDanglingInput(this.inputs[inp].connectionId);
        }
        // removes outputs that were connected solely to step.out
        var out = this.outputs.length;
        while (out--) {
            this.removeDanglingOutput(this.outputs[out].connectionId);
        }
        var dests = this.gatherDestinations();
        for (var j = 0; j < dests.length; j++) {
            for (var i = 0; i < step.out.length; i++) {
                var indexOf = dests[j].source.indexOf(step.out[i].sourceId);
                if (indexOf > -1) {
                    dests[j].source.splice(indexOf, 1);
                    this.validateDestination(dests[j]);
                }
            }
        }
        step.cleanValidity();
        this.eventHub.emit("step.remove", step);
    };
    WorkflowModel.prototype.removeStepFromGraph = function (step) {
        var _this = this;
        // remove step node from graph
        this.graph.removeVertex(step.connectionId);
        var stepIn = step.in.map(function (i) { return i.connectionId; });
        var stepOut = step.out.map(function (o) { return o.connectionId; });
        // clean up connections between in/out ports and other nodes
        // and in/out ports and the step itself
        this.graph.edges.forEach(function (edge) {
            if (stepIn.indexOf(edge.destination.id) !== -1 ||
                stepOut.indexOf(edge.source.id) !== -1) {
                _this.eventHub.emit("connection.remove", _this.graph.getVertexData(edge.source.id), _this.graph.getVertexData(edge.destination.id));
                _this.graph.removeEdge(edge);
            }
            else if (edge.destination.id === step.connectionId ||
                edge.source.id === step.connectionId) {
                _this.graph.removeEdge(edge);
            }
        });
        // remove in ports and out ports from graph
        stepIn.forEach(function (input) { return _this.graph.removeVertex(input); });
        stepOut.forEach(function (output) { return _this.graph.removeVertex(output); });
    };
    /**
     * Removes input from workflow and from graph
     * removes all connections
     * @param input
     */
    WorkflowModel.prototype.removeInput = function (input) {
        if (typeof input === "string") {
            input = this.graph.getVertexData(input);
        }
        // remove input from list of inputs on workflow model
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i].id == input.id) {
                this.inputs[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.inputs.splice(i, 1);
                break;
            }
        }
        // remove input from graph and remove connections
        this.removeIONodeFromGraph(input);
        // remove dangling outputs, in case one was attached solely to the input being removed
        for (var i = 0; i < this.outputs.length; i++) {
            this.removeDanglingOutput(this.outputs[i].connectionId);
        }
        var dests = this.gatherDestinations();
        // remove source from step.in ports
        for (var i = 0; i < dests.length; i++) {
            var indexOf = dests[i].source.indexOf(input.sourceId);
            if (indexOf !== -1) {
                dests[i].source.splice(indexOf, 1);
            }
        }
        this.eventHub.emit("input.remove", input);
    };
    /**
     * Removes output from workflow and from graph
     * removes all connections
     * @param output
     */
    WorkflowModel.prototype.removeOutput = function (output) {
        if (typeof output === "string") {
            output = this.graph.getVertexData(output);
        }
        // remove output from list of outputs on workflow model
        for (var i = 0; i < this.outputs.length; i++) {
            if (this.outputs[i].id == output.id) {
                this.outputs[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.outputs.splice(i, 1);
                break;
            }
        }
        // removes dangling inputs in case one was attached solely to the output being removed
        for (var i = 0; i < this.inputs.length; i++) {
            this.removeDanglingInput(this.inputs[i].connectionId);
        }
        // remove output from the graph and remove connections
        this.removeIONodeFromGraph(output);
        this.eventHub.emit("output.remove", output);
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        throw new UnimplementedMethodException_1.UnimplementedMethodException("isSourceFromStep", "WorkflowModel");
    };
    /**
     * Checks if ID is valid and if it already exists on the graph
     * @param id
     * @param connectionId
     */
    WorkflowModel.prototype.checkIdValidity = function (id, connectionId) {
        utils_1.validateID(id);
        var next = this.getNextAvailableId(connectionId);
        if (next !== id) {
            throw new Error("ID already exists on graph, the next available id is \"" + next + "\"");
        }
    };
    /**
     * Changes ID of step, updates connections and nodes in graph
     */
    WorkflowModel.prototype.changeStepId = function (step, id) {
        var _this = this;
        if (id === step.id) {
            return;
        }
        this.checkIdValidity(id, id);
        var oldId = step.id;
        // remove references of step from graph
        this.removeStepFromGraph(step);
        // change id on step and add it to the graph
        step.id = id;
        this.addStepToGraph(step);
        // go through step inputs and re-add all connections
        step.in.forEach(function (input) {
            var destNode = {
                id: input.connectionId,
                type: "StepInput"
            };
            input.source.forEach(function (source) {
                _this.connectSource(source, input, destNode);
            });
        });
        // go through all destinations and reconnect step outputs
        this.gatherDestinations().forEach(function (dest) {
            var _loop_1 = function (i) {
                var source = dest.source[i];
                var stepOutput = _this.isSourceFromStep(source, oldId);
                if (stepOutput) {
                    dest.source[i] = step.out.find(function (o) { return o.id === stepOutput; }).sourceId;
                    var destination = {
                        id: dest.connectionId,
                        type: _this.getNodeType(dest)
                    };
                    _this.connectSource(dest.source[i], dest, destination);
                }
            };
            for (var i = 0; i < dest.source.length; i++) {
                _loop_1(i);
            }
        });
        this.eventHub.emit("step.change.id", step);
    };
    WorkflowModel.prototype.removeIONodeFromGraph = function (node) {
        var _this = this;
        this.graph.edges.forEach(function (edge) {
            if (edge.destination.id === node.connectionId || edge.source.id === node.connectionId) {
                _this.disconnect(edge.source.id, edge.destination.id);
            }
        });
        this.graph.removeVertex(node.connectionId);
    };
    WorkflowModel.prototype.changeIONodeId = function (node, id) {
        var _this = this;
        if (node.id === id)
            return;
        var pref = node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel ? constants_1.STEP_OUTPUT_CONNECTION_PREFIX : constants_1.STEP_INPUT_CONNECTION_PREFIX;
        this.checkIdValidity(id, "" + pref + id + "/" + id);
        var oldConnectionId = node.connectionId;
        var oldId = node.id;
        var oldSourceId = node.sourceId;
        node.id = id;
        this.graph.removeVertex(oldConnectionId);
        this.addVertex(node.connectionId, node);
        // if node is output, just change id, remove from graph, and re-add to graph
        if (node instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
            this.graph.edges.forEach(function (edge) {
                if (edge.destination.id === oldConnectionId) {
                    edge.destination.id = node.connectionId;
                }
            });
        }
        // if node is input, change id, remove from graph and re-add to graph, go through all destinations and change their source
        if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            this.graph.edges.forEach(function (edge) {
                if (edge.source.id === oldConnectionId) {
                    edge.source.id = node.connectionId;
                    var destNode = _this.graph.getVertexData(edge.destination.id);
                    for (var i = 0; i < destNode.source.length; i++) {
                        if (destNode.source[i] === oldSourceId) {
                            destNode.source[i] = node.sourceId;
                        }
                    }
                }
            });
        }
        this.eventHub.emit("io.change.id", node, oldId);
    };
    /**
     * Connects two vertices which have already been added to the graph
     */
    WorkflowModel.prototype.addEdge = function (source, destination, isVisible, isValid) {
        if (isVisible === void 0) { isVisible = true; }
        if (isValid === void 0) { isValid = true; }
        this.graph.addEdge(source, destination, isVisible, isValid);
    };
    WorkflowModel.prototype.checkSrcAndDest = function (source, destination) {
        // fetch source if connectionId is provided
        if (typeof source === "string") {
            source = this.graph.getVertexData(source);
        }
        // fetch destination if connectionId is provided
        if (typeof destination === "string") {
            destination = this.graph.getVertexData(destination);
        }
        if (!source || !destination) {
            throw new Error("Source and destination must be defined");
        }
        // type check source
        if (!(source instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) && !(source instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel)) {
            throw new Error("Expected source to be instanceof WorkflowInputParameterModel or WorkflowStepOutputModel, instead got " + source.constructor.name);
        }
        // type check destination
        if (!(destination instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) && !(destination instanceof WorkflowStepInputModel_1.WorkflowStepInputModel)) {
            throw new Error("Expected destination to be instanceof WorkflowOutputParameterModel or WorkflowStepInputModel, instead got " + destination.constructor.name);
        }
        return [source, destination];
    };
    WorkflowModel.prototype.disconnect = function (source, destination) {
        _a = this.checkSrcAndDest(source, destination), source = _a[0], destination = _a[1];
        if (this.graph.removeEdge({
            source: {
                id: source.connectionId
            },
            destination: {
                id: destination.connectionId
            }
        })) {
            var destLen = destination.source.length;
            while (destLen--) {
                if (destination.source[destLen] === source.sourceId) {
                    destination.source.splice(destLen, 1);
                }
            }
            this.validateDestination(destination);
            if (source instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
                this.removeDanglingInput(source.connectionId);
            }
            if (destination instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
                this.removeDanglingOutput(destination.connectionId);
            }
            this.eventHub.emit("connection.remove", source, destination);
        }
        else {
            throw new Error("Could not remove nonexistent connection between " + source.connectionId + " and " + destination.connectionId);
        }
        var _a;
    };
    WorkflowModel.prototype.connect = function (source, destination, show) {
        if (show === void 0) { show = true; }
        _a = this.checkSrcAndDest(source, destination), source = _a[0], destination = _a[1];
        if (destination.parentStep &&
            source.parentStep &&
            destination.parentStep.id === source.parentStep.id) {
            throw new Error("Cannot connect ports that belong to the same step: " + destination.parentStep.id);
        }
        // add source to destination
        destination.source.push(source.sourceId);
        var isValid = this.validateConnection(destination, source);
        // add edge to the graph
        this.addEdge({
            id: source.connectionId,
            type: this.getNodeType(source)
        }, {
            id: destination.connectionId,
            type: this.getNodeType(destination)
        }, show, isValid);
        this.eventHub.emit("connection.create", source, destination);
        return isValid;
        var _a;
    };
    WorkflowModel.prototype.addStepFromProcess = function (proc) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addStepFromProcess", "WorkflowModel");
        return undefined;
    };
    /**
     * Checks for naming collisions in vertex ids, in case of collisions,
     * it will increment the provided id, otherwise it returns the original id
     */
    WorkflowModel.prototype.getNextAvailableId = function (connectionId, isIO, graph) {
        if (isIO === void 0) { isIO = false; }
        if (graph === void 0) { graph = this.graph; }
        var hasId = true;
        var result = connectionId;
        var arr = [];
        if (connectionId.indexOf("/") !== -1 && isIO) {
            arr = result.split("/");
        }
        while (hasId) {
            if (isIO) {
                if (hasId = (graph.hasVertex(["in", arr[1], arr[2]].join("/")) || graph.hasVertex(["out", arr[1], arr[2]].join("/")))) {
                    arr = [arr[0], utils_1.incrementString(arr[1]), utils_1.incrementString(arr[2])];
                    result = arr.join("/");
                }
            }
            else {
                if (hasId = graph.hasVertex(result)) {
                    result = utils_1.incrementString(result);
                }
            }
        }
        if (result.indexOf("/") !== -1) {
            return result.split("/")[2];
        }
        return result;
    };
    WorkflowModel.prototype.isConnected = function () {
        try {
            if (!this.graph)
                this.graph = this.constructGraph();
            var isConnected = this.graph.isConnected();
            if (!isConnected) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Workflow is not connected",
                        type: "warning"
                    },
                    _a));
            }
            return isConnected;
        }
        catch (ex) {
            this.setIssue((_b = {},
                _b[this.loc] = {
                    message: ex,
                    type: "error"
                },
                _b));
            return false;
        }
        var _a, _b;
    };
    WorkflowModel.prototype.hasCycles = function () {
        try {
            if (!this.graph)
                this.graph = this.constructGraph();
            var hasCycles = this.graph.hasCycles();
            if (hasCycles) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Workflow contains cycles",
                        type: "error"
                    },
                    _a));
            }
            return hasCycles;
        }
        catch (ex) {
            this.setIssue((_b = {},
                _b[this.loc] = {
                    message: ex,
                    type: "error"
                },
                _b));
            return false;
        }
        var _a, _b;
    };
    /**
     * Finds matching ports to which pointA can connect within the workflow.
     * Looks at port type and fileTypes if they are specified.
     */
    WorkflowModel.prototype.gatherValidPorts = function (pointA, points, ltr) {
        return points.filter(function (pointB) {
            try {
                utils_1.checkIfConnectionIsValid(pointA, pointB, ltr);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    };
    /**
     * Finds valid destination ports (workflow.outputs and step.in)
     * for a given source port (workflow.inputs and step.out);
     * @param port
     * @returns {any[]}
     */
    WorkflowModel.prototype.gatherValidConnectionPoints = function (port) {
        if (typeof port === "string") {
            port = this.graph.getVertexData(port);
        }
        if (port instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel || port instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel) {
            var destinations = this.gatherDestinations();
            return this.gatherValidPorts(port, destinations, true);
        }
        else {
            var sources = this.gatherSources();
            return this.gatherValidPorts(port, sources, false);
        }
    };
    /**
     * Returns all possible sources on the graph
     */
    WorkflowModel.prototype.gatherSources = function () {
        var stepOut = this.steps.reduce(function (acc, curr) {
            return acc.concat(curr.out);
        }, []);
        return stepOut.concat(this.inputs);
    };
    /**
     * Returns all possible destinations on the graph
     */
    WorkflowModel.prototype.gatherDestinations = function () {
        var stepOut = this.steps.reduce(function (acc, curr) {
            return acc.concat(curr.in);
        }, []);
        return stepOut.concat(this.outputs);
    };
    WorkflowModel.prototype.addStepToGraph = function (step, graph) {
        var _this = this;
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(step.id, step, graph);
        // Sources don't have information about their destinations,
        // so we don't look through them for connections
        step.out.forEach(function (source) {
            _this.addVertex(source.connectionId, source, graph);
            graph.addEdge({
                id: source.parentStep.id,
                type: "Step"
            }, {
                id: source.connectionId,
                type: "StepOutput"
            }, false);
        });
        step.in.forEach(function (dest) {
            _this.addVertex(dest.connectionId, dest, graph);
            graph.addEdge({
                id: dest.connectionId,
                type: "StepInput"
            }, {
                id: dest.parentStep.id,
                type: "Step"
            }, false);
        });
    };
    /**
     * @param inPort
     * @param inputConstructor
     * @param show
     * @param create
     *
     * @param data
     * @private
     */
    WorkflowModel.prototype._createInputFromPort = function (inPort, inputConstructor, show, create, data) {
        var _this = this;
        if (show === void 0) { show = true; }
        if (create === void 0) { create = false; }
        if (data === void 0) { data = {}; }
        if (typeof inPort === "string") {
            inPort = this.graph.getVertexData(inPort);
        }
        if (!inPort || !this.graph.hasVertex(inPort.connectionId)) {
            if (!create) {
                throw new Error("WorkflowStepInputModel " + inPort.destinationId + " does not exist on the graph");
            }
            else {
                this.addVertex(inPort.connectionId, inPort);
                // connect in port to step
                this.addEdge({
                    id: inPort.connectionId,
                    type: "StepInput"
                }, {
                    id: inPort.parentStep.id,
                    type: "Step"
                }, false);
            }
        }
        // create new input on the workflow to connect with the port
        var inputParam = Object.assign((_a = {
                id: this.getNextAvailableId("" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + inPort.id + "/" + inPort.id, true),
                type: inPort.type ? inPort.type.serialize() : "null"
            },
            _a["sbg:fileTypes"] = inPort.fileTypes,
            _a.inputBinding = inPort["inputBinding"],
            _a), data.customProps);
        var input = new inputConstructor(inputParam, this.loc + ".inputs[" + this.inputs.length + "]", this.eventHub);
        // add it to the workflow tree
        input.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.inputs.push(input);
        // add input to graph
        this.addInputToGraph(input);
        input.isVisible = show;
        inPort.isVisible = show;
        this.eventHub.emit("input.create", input);
        // connect input with inPort
        this.connect(input, inPort, show);
        return input;
        var _a;
    };
    WorkflowModel.prototype._createOutputFromPort = function (outPort, outputConstructor, show, create, opts) {
        var _this = this;
        if (show === void 0) { show = true; }
        if (create === void 0) { create = false; }
        if (opts === void 0) { opts = {}; }
        if (typeof outPort === "string") {
            outPort = this.graph.getVertexData(outPort);
        }
        if (!outPort || !this.graph.hasVertex(outPort.connectionId)) {
            if (!create) {
                throw new Error("WorkflowStepInputModel " + outPort.sourceId + " does not exist on the graph");
            }
            else {
                this.addVertex(outPort.connectionId, outPort);
                // connect in port to step
                this.addEdge({
                    id: outPort.connectionId,
                    type: "StepInput"
                }, {
                    id: outPort.parentStep.id,
                    type: "Step"
                }, false);
            }
        }
        // create new input on the workflow to connect with the port
        var outputParam = Object.assign((_a = {
                id: this.getNextAvailableId("" + constants_1.STEP_INPUT_CONNECTION_PREFIX + outPort.id + "/" + outPort.id, true),
                type: outPort.type ? outPort.type.serialize() : "null"
            },
            _a["sbg:fileTypes"] = outPort.fileTypes,
            _a), opts.customProps);
        var output = new outputConstructor(outputParam, this.loc + ".outputs[" + this.outputs.length + "]", this.eventHub);
        // add it to the workflow tree
        output.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.outputs.push(output);
        // add output to graph
        this.addOutputToGraph(output);
        this.eventHub.emit("output.create", output);
        outPort.isVisible = show;
        // connect output with outPort
        this.connect(outPort, output, show);
        return output;
        var _a;
    };
    WorkflowModel.prototype.addInputToGraph = function (input, graph) {
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(input.connectionId, input, graph);
    };
    WorkflowModel.prototype.addOutputToGraph = function (output, graph) {
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(output.connectionId, output, graph);
    };
    /**
     * Helper function to connect source to destination
     */
    WorkflowModel.prototype.connectSource = function (sourceId, dest, destNode, graph) {
        if (graph === void 0) { graph = this.graph; }
        var sourceConnectionId = this.getSourceConnectionId(sourceId);
        // detect if source is a port of an input (has a step in its identifier),
        // if it is a port then add the prefix to form the connectionId
        // get source node by connectionId from graph's vertices
        var sourceModel = graph.getVertexData(sourceConnectionId);
        if (sourceModel === undefined) {
            dest.setIssue((_a = {},
                _a["" + dest.loc] = {
                    type: "error",
                    message: "Destination id " + dest.id + " has unknown source \"" + sourceId + "\". This may result in a cycle in the graph"
                },
                _a));
            return;
        }
        // all workflow inputs are visible by default and should be shown
        // except for those which are "exposed", these are explicitly hidden
        var isVisible = !(sourceModel instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel && !sourceModel.isVisible);
        // if workflow input isn't visible, its destination and connection
        // shouldn't be visible either
        dest.isVisible = isVisible;
        // add a connection between this destination and its source.
        // visibility depends on both nodes, for ports that were "exposed" for example
        // and are connected to nodes which are invisible
        var isValid = this.validateConnection(dest, sourceModel, graph);
        graph.addEdge({
            id: sourceModel.connectionId,
            type: this.getNodeType(sourceModel)
        }, destNode, isVisible, isValid);
        var _a;
    };
    ;
    WorkflowModel.prototype.constructGraph = function () {
        var _this = this;
        var destinations = this.gatherDestinations();
        // Create a blank Graph
        var graph = new Graph_1.Graph();
        // Add inputs to graph
        this.inputs.forEach(function (input) { return _this.addInputToGraph(input, graph); });
        // Add outputs to graph
        this.outputs.forEach(function (output) { return _this.addOutputToGraph(output, graph); });
        // Adding steps to graph adds their step.in and step.out as well as connecting in/out to step
        this.steps.forEach(function (step) { return _this.addStepToGraph(step, graph); });
        // Destinations contain all information about connections in .source property,
        // we loop through them and create the appropriate type of connection
        destinations.forEach(function (dest) {
            // create destination EdgeNode
            var destination = {
                id: dest.connectionId,
                type: _this.getNodeType(dest)
            };
            // No point in connecting if there's no source
            // @todo source should always be an array (just in case), change this check to dest.source.length
            if (dest.source) {
                // if source is an array, loop through all sources for this destination
                if (Array.isArray(dest.source)) {
                    dest.source.forEach(function (s) {
                        _this.connectSource(s, dest, destination, graph);
                    });
                }
                else {
                    _this.connectSource(dest.source, dest, destination, graph);
                }
            }
        });
        return graph;
    };
    /**
     * Returns type of node to be added to graph, for canvas rendering
     */
    WorkflowModel.prototype.getNodeType = function (node) {
        if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            return "WorkflowInput";
        }
        else if (node instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel) {
            return "StepOutput";
        }
        else if (node instanceof StepModel_1.StepModel) {
            return "Step";
        }
        else if (node instanceof WorkflowStepInputModel_1.WorkflowStepInputModel) {
            return "StepInput";
        }
        else if (node instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
            return "WorkflowOutput";
        }
    };
    WorkflowModel.prototype.getSourceConnectionId = function (source) {
        new UnimplementedMethodException_1.UnimplementedMethodException("getSourceConnectionId");
        return undefined;
    };
    /**
     * Validate all visible connections and sets correct validity state on destinations
     */
    WorkflowModel.prototype.validateConnections = function () {
        var _this = this;
        var sources = this.gatherSources();
        var destinations = this.gatherDestinations();
        this.connections.forEach(function (connection) {
            if (connection.isVisible) {
                var source = sources.find(function (item) {
                    return item.connectionId === connection.source.id;
                });
                var destination = destinations.find(function (item) {
                    return item.connectionId === connection.destination.id;
                });
                _this.validateConnection(destination, source);
            }
        });
    };
    /**
     * Validate connection between source and destination and sets correct validity state on destination
     */
    WorkflowModel.prototype.validateConnection = function (destination, source, graph) {
        if (graph === void 0) { graph = this.graph; }
        if (!source || !destination) {
            return;
        }
        var isValid = false;
        try {
            utils_1.checkIfConnectionIsValid(source, destination);
            isValid = true;
        }
        catch (e) {
            var sourceText = destination instanceof V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel ? "outputSource" : "source";
            destination.setIssue((_a = {},
                _a[destination.loc + ("." + sourceText + "[") + source.sourceId + "]"] = {
                    message: e.message,
                    type: "warning",
                    code: e.code
                },
                _a));
        }
        Array.from(graph.edges).filter(function (c) {
            return c.isVisible && (c.destination.id === destination.connectionId && c.source.id === source.connectionId);
        })
            .forEach(function (c) {
            c.isValid = isValid;
        });
        return isValid;
        var _a;
    };
    /**
     * Validate all connections made with given destination
     */
    WorkflowModel.prototype.validateDestination = function (destination) {
        var _this = this;
        destination.clearIssue(ErrorCode_1.ErrorCode.CONNECTION_ALL);
        // Find all sources connected to given destination
        var sources = this.connections.filter(function (connection) {
            return connection.isVisible && (connection.destination.id === destination.connectionId);
        }).map(function (connection) {
            return _this.findById(connection.source.id);
        });
        // Validate all connections
        sources.forEach(function (source) {
            _this.validateConnection(destination, source);
        });
    };
    /**
     * Validate all connections made with given IO port
     */
    WorkflowModel.prototype.validateConnectionsForIOPort = function (port) {
        var _this = this;
        if (port instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            var destinations = this.connections.filter(function (connection) {
                return connection.isVisible && (connection.source.id === port.connectionId);
            }).map(function (connection) {
                return _this.findById(connection.destination.id);
            });
            // Validate destination in case when connection goes from invalid > valid to remove warning
            // (This is because we do not have currently method to remove certain keys in issues - ValidationBase)
            destinations.forEach(function (destination) {
                _this.validateDestination(destination);
            });
        }
        else {
            // If port is output
            this.validateDestination(port);
        }
        this.eventHub.emit("connections.updated");
    };
    WorkflowModel.prototype.validateGraph = function () {
        try {
            this.graph.topSort();
        }
        catch (ex) {
            if (ex.message === "Graph has cycles") {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Graph has cycles",
                        type: "error"
                    },
                    _a));
            }
            else if (ex === "Can't sort unconnected graph") {
                this.setIssue((_b = {},
                    _b[this.loc] = {
                        message: "Graph is not connected",
                        type: "warning"
                    },
                    _b));
            }
        }
        var _a, _b;
    };
    return WorkflowModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowModel = WorkflowModel;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ProcessRequirementModel = /** @class */ (function (_super) {
    __extends(ProcessRequirementModel, _super);
    function ProcessRequirementModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this.customProps = {};
        return _this;
    }
    ProcessRequirementModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "ProcessRequirementModel");
        return null;
    };
    ProcessRequirementModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "ProcessRequirementModel");
    };
    return ProcessRequirementModel;
}(ValidationBase_1.ValidationBase));
exports.ProcessRequirementModel = ProcessRequirementModel;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(0);
var CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(CommandOutputParameterModel, _super);
    function CommandOutputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandOutputParameterModel.prototype.updateOutputBinding = function (binding) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateOutputBinding", "CommandOutputParameterModel");
    };
    CommandOutputParameterModel.prototype._addSecondaryFile = function (file, exprConstructor, locBase) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.secondaryFiles, locBase + ".secondaryFiles");
        var f = new exprConstructor(file, loc, this.eventHub);
        this.secondaryFiles.push(f);
        f.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return f;
    };
    CommandOutputParameterModel.prototype._updateSecondaryFiles = function (files) {
        var _this = this;
        this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.secondaryFiles = [];
        files.forEach(function (f) { return _this.addSecondaryFile(f); });
    };
    CommandOutputParameterModel.prototype._removeSecondaryFile = function (index) {
        var file = this.secondaryFiles[index];
        if (file) {
            file.setValue("", "string");
            this.secondaryFiles.splice(index, 1);
        }
    };
    CommandOutputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    CommandOutputParameterModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.outputBinding.validate(context));
        promises.push(this.type.validate(context));
        promises.concat(this.secondaryFiles.map(function (f) { return f.validate(context); }));
        return Promise.all(promises).then(function () { return _this.issues; });
    };
    CommandOutputParameterModel.prototype.attachFileTypeListeners = function () {
        var _this = this;
        if (this.eventHub) {
            this.modelListeners.push(this.eventHub.on("io.change.type", function (loc) {
                if (_this.loc + ".type" === loc) {
                    if (!utils_1.isFileType(_this)) {
                        _this.updateSecondaryFiles([]);
                        if (_this.outputBinding) {
                            _this.outputBinding.setInheritMetadataFrom(null);
                        }
                    }
                }
            }));
        }
    };
    return CommandOutputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.CommandOutputParameterModel = CommandOutputParameterModel;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
var ExpressionModel_1 = __webpack_require__(9);
var RequirementBaseModel = /** @class */ (function (_super) {
    __extends(RequirementBaseModel, _super);
    function RequirementBaseModel(req, exprConstructor, loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.exprConstructor = exprConstructor;
        _this.eventHub = eventHub;
        _this.customProps = {};
        _this.deserialize(req);
        return _this;
    }
    RequirementBaseModel.prototype.updateValue = function (value) {
        var _this = this;
        this.value = value;
        if (value instanceof ExpressionModel_1.ExpressionModel) {
            this.value.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.value.loc = this.loc + ".value";
        }
    };
    RequirementBaseModel.prototype.serialize = function () {
        // value stored in customProps was whole value of hint
        if (this.customProps.constructor.name !== "Object") {
            return this.customProps;
        }
        var base = {};
        if (this.class)
            base.class = this.class;
        var value;
        if (this.value instanceof ExpressionModel_1.ExpressionModel) {
            value = this.value.serialize();
        }
        else {
            value = this.value;
        }
        if (value) {
            base["value"] = value;
        }
        return Object.assign({}, base, this.customProps);
    };
    RequirementBaseModel.prototype.deserialize = function (attr) {
        var _this = this;
        // hint is not an object type, therefore it cannot be deserialized
        if (attr.constructor.name !== "Object") {
            this.customProps = attr;
            return;
        }
        this.class = attr.class;
        if (attr["value"] !== undefined && attr["value"] !== null) {
            this.value = attr["value"];
            if (typeof this.value === "string" || (this.value["script"] && this.exprConstructor === SBDraft2ExpressionModel_1.SBDraft2ExpressionModel)) {
                this.value = new this.exprConstructor(attr["value"], this.loc + ".value", this.eventHub);
                this.value.setValidationCallback(function (err) { return _this.updateValidity(err); });
            }
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["class", "value"]);
    };
    return RequirementBaseModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.RequirementBaseModel = RequirementBaseModel;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(6);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(WorkflowInputParameterModel, _super);
    function WorkflowInputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.fileTypes = [];
        _this.isVisible = true;
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(WorkflowInputParameterModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("io.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowInputParameterModel.prototype, "sourceId", {
        /**
         * ID to be used when adding as source
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowInputParameterModel.prototype, "connectionId", {
        /**
         * ID to be used in graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowInputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    WorkflowInputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowInputParameterModel");
    };
    WorkflowInputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowInputParameterModel");
    };
    WorkflowInputParameterModel.prototype.validate = function () {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.type.validate());
        return Promise.all(promises).then(function (res) { return _this.issues; });
    };
    return WorkflowInputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowInputParameterModel = WorkflowInputParameterModel;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(6);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(WorkflowOutputParameterModel, _super);
    function WorkflowOutputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.fileTypes = [];
        _this.isField = false;
        _this.isVisible = true;
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("io.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "destinationId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "connectionId", {
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowOutputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    WorkflowOutputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowOutputParameterModel");
    };
    WorkflowOutputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowOutputParameterModel");
    };
    WorkflowOutputParameterModel.prototype.validate = function () {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.type.validate());
        return Promise.all(promises).then(function (res) { return _this.issues; });
    };
    return WorkflowOutputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowOutputParameterModel = WorkflowOutputParameterModel;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionEvaluator = /** @class */ (function () {
    function ExpressionEvaluator() {
    }
    ExpressionEvaluator.evaluate = function (expr, context, version) {
        var _this = this;
        if (context === void 0) { context = {}; }
        if (version === "v1.0") {
            if (typeof expr === "number") {
                expr = expr.toString();
            }
            else if (typeof expr === "object") {
                return new Promise(function (res, rej) {
                    rej("Unexpected object type when evaluating v1.0 Expression: " + expr);
                });
            }
            try {
                var results = ExpressionEvaluator.grabExpressions(expr).map(function (token) {
                    switch (token.type) {
                        case "func":
                            return ExpressionEvaluator.evaluateExpression("(function() {" + _this.libraries.join("\n\n") + "\n\n"
                                + token.value + "})()", context);
                        case "expr":
                            return ExpressionEvaluator.evaluateExpression(_this.libraries.join("\n\n") + "\n\n" + token.value, context);
                        case "literal":
                            return new Promise(function (res) { return res(token.value); });
                    }
                });
                if (results.length === 1) {
                    return results[0];
                }
                else {
                    return Promise.all(results).then(function (res) { return res.join(""); });
                }
            }
            catch (ex) {
                return new Promise(function (res, rej) {
                    rej(ex);
                });
            }
        }
        else if (version === "draft-2") {
            if (typeof expr === "string" || typeof expr === "number") {
                return new Promise(function (res) { return res(expr); });
            }
            else {
                var script = expr.script.trim().charAt(0) === '{'
                    ? "(function()" + expr.script + ")()"
                    : expr.script;
                return ExpressionEvaluator.evaluateExpression(script, context);
            }
        }
    };
    ExpressionEvaluator.evaluateD2 = function (expr, context) {
        if (typeof expr === "string" || typeof expr === "number") {
            return new Promise(function (res) { return res(expr); });
        }
        else {
            var script = expr.script.trim().charAt(0) === '{'
                ? "(function()" + expr.script + ")()"
                : expr.script;
            return ExpressionEvaluator.evaluateExpression(script, context);
        }
    };
    ExpressionEvaluator.grabExpressions = function (exprStr) {
        var tokens = [];
        var i = 0;
        var state = State.LITERAL;
        var literal = "";
        var expr = "";
        var func = "";
        var bracketCount = 0;
        var parenCount = 0;
        // go through character by character
        while (i < exprStr.length) {
            var currentChar = exprStr[i];
            switch (state) {
                case State.LITERAL:
                    if (currentChar === "$" && exprStr[i + 1] === "(") {
                        // start expression and push past literal
                        if (literal) {
                            tokens.push({ type: "literal", value: literal });
                            literal = "";
                        }
                        i++;
                        expr = "";
                        state = State.EXPR;
                    }
                    else if (currentChar === "$" && exprStr[i + 1] === "{") {
                        // start expression and push past literal
                        if (literal) {
                            tokens.push({ type: "literal", value: literal });
                            literal = "";
                        }
                        i++;
                        func = "";
                        state = State.FUNC;
                    }
                    else if (currentChar === "\\" && exprStr[i + 1] === "$") {
                        literal += "\\$";
                        i++;
                    }
                    else {
                        literal += currentChar;
                    }
                    break;
                case State.EXPR:
                    switch (currentChar) {
                        case "(":
                            expr += currentChar;
                            parenCount++;
                            break;
                        case ")":
                            if (parenCount === 0) {
                                tokens.push({ type: "expr", value: expr });
                                state = State.LITERAL;
                            }
                            else {
                                expr += currentChar;
                                parenCount--;
                            }
                            break;
                        default:
                            expr += currentChar;
                    }
                    break;
                case State.FUNC:
                    switch (currentChar) {
                        case "{":
                            func += currentChar;
                            bracketCount++;
                            break;
                        case "}":
                            if (bracketCount === 0) {
                                tokens.push({ type: "func", value: func });
                                state = State.LITERAL;
                            }
                            else {
                                func += currentChar;
                                bracketCount--;
                            }
                            break;
                        default:
                            func += currentChar;
                            break;
                    }
                    break;
            }
            i++;
        }
        if (state === State.LITERAL && literal.length > 0) {
            tokens.push({ type: "literal", value: literal });
        }
        if (state === State.EXPR || state === State.FUNC) {
            // if expression is invalid, treat the whole thing as a literal
            tokens = [{ value: exprStr, type: "literal" }];
        }
        return tokens;
    };
    ExpressionEvaluator.evaluateExpression = null;
    ExpressionEvaluator.libraries = [];
    return ExpressionEvaluator;
}());
exports.ExpressionEvaluator = ExpressionEvaluator;
var State;
(function (State) {
    State[State["LITERAL"] = 0] = "LITERAL";
    State[State["FUNC"] = 1] = "FUNC";
    State[State["EXPR"] = 2] = "EXPR";
})(State || (State = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var RequirementBaseModel_1 = __webpack_require__(14);
var StepModel = /** @class */ (function (_super) {
    __extends(StepModel, _super);
    function StepModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.isVisible = true;
        _this.runPath = "";
        _this.hints = [];
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(StepModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("step.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepModel.prototype, "inAsMap", {
        get: function () {
            return this.in.reduce(function (acc, curr) {
                return __assign({}, acc, (_a = {}, _a[curr.id] = curr, _a));
                var _a;
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    StepModel.prototype.setRunProcess = function (process) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setRunProcess", "StepModel");
    };
    Object.defineProperty(StepModel.prototype, "connectionId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    StepModel.prototype.compareInPorts = function (isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
    };
    StepModel.prototype.compareOutPorts = function (isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
    };
    StepModel.prototype.serializeEmbedded = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serializeEmbedded", "StepModel");
    };
    StepModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "WorkflowModel");
        return null;
    };
    StepModel.prototype.createReq = function (req, constructor, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, constructor, loc);
        reqModel.isHint = hint;
        this[property].push(reqModel);
        reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return reqModel;
    };
    StepModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "StepModel");
    };
    StepModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "StepModel");
    };
    StepModel.portDifference = function (stepPorts, runParameters) {
        var inserted = []; // contains only InputParamModels from run.inputs
        var remaining = []; // contains whatever is left from inPorts that's still in run.inputs
        var removed = stepPorts.slice(); // contains what isn't in run.inputs
        var _loop_1 = function (i) {
            var index = removed.findIndex(function (inp) { return inp.id === runParameters[i].id; });
            if (index === -1) {
                inserted.push(runParameters[i]);
            }
            else {
                remaining = remaining.concat(removed.splice(index, 1));
            }
        };
        for (var i = 0; i < runParameters.length; i++) {
            _loop_1(i);
        }
        return [inserted, remaining, removed];
    };
    return StepModel;
}(ValidationBase_1.ValidationBase));
exports.StepModel = StepModel;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(6);
var WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(WorkflowStepInputModel, _super);
    function WorkflowStepInputModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this.source = [];
        _this.fileTypes = [];
        _this.isVisible = false;
        _this.customProps = {};
        return _this;
    }
    Object.defineProperty(WorkflowStepInputModel.prototype, "connectionId", {
        /**
         * The connectionId used within the graph, prefix with "in/" because it refers to the
         */
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepInputModel.prototype, "destinationId", {
        /**
         * The input's ID for scatter
         * @returns {string}
         */
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepInputModel.prototype, "status", {
        get: function () {
            //  A port is displayed on canvas (if it has connections or
            // if it is required file, by default)
            if (this.isVisible)
                return "port";
            // Neither included in ports nor "exposed"
            if (!this.source.length)
                return "editable";
            // An in port is "exposed" when it isn't visible but has
            // a workflow input to which it is solely connected
            if (this.source.length === 1)
                return "exposed";
        },
        enumerable: true,
        configurable: true
    });
    WorkflowStepInputModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize");
    };
    WorkflowStepInputModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize");
    };
    return WorkflowStepInputModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowStepInputModel = WorkflowStepInputModel;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(6);
var WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(WorkflowStepOutputModel, _super);
    function WorkflowStepOutputModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fileTypes = [];
        _this.customProps = {};
        _this.isVisible = true;
        return _this;
    }
    WorkflowStepOutputModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize");
    };
    WorkflowStepOutputModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize");
    };
    Object.defineProperty(WorkflowStepOutputModel.prototype, "sourceId", {
        /**
         * ID used for creating connections
         */
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepOutputModel.prototype, "connectionId", {
        /**
         * ID used for graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    return WorkflowStepOutputModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowStepOutputModel = WorkflowStepOutputModel;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineUtils_1 = __webpack_require__(70);
var EventHub_1 = __webpack_require__(40);
var JobHelper_1 = __webpack_require__(23);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ValidationBase_1 = __webpack_require__(2);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var CommandLineToolModel = /** @class */ (function (_super) {
    __extends(CommandLineToolModel, _super);
    function CommandLineToolModel(loc) {
        var _this = _super.call(this, loc || "document") || this;
        _this["class"] = "CommandLineTool";
        // CWL PROPERTIES //
        _this.baseCommand = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.arguments = [];
        _this.requirements = [];
        _this.hints = [];
        _this.successCodes = [];
        _this.temporaryFailCodes = [];
        _this.permanentFailCodes = [];
        /** Set of all expressions the tool contains */
        _this.expressions = new Set();
        /** Array of all validation processes that are currently occurring */
        _this.validationPromises = [];
        /** Dummy job.inputs value to be used in command line generation */
        _this.jobInputs = {};
        /** Dummy job.runtime value to be used in command line generation */
        _this.runtime = {};
        // MODEL HELPERS //
        /** Flag to indicate that the tool has finished deserializing */
        _this.constructed = false;
        /** Custom properties that weren't serialized */
        _this.customProps = {};
        /** Function which is called when the command line is changed */
        _this.commandLineWatcher = function () {
        };
        _this.eventHub = new EventHub_1.EventHub([
            "input.create",
            "input.remove",
            "input.change",
            "input.change.id",
            "io.change.type",
            "output.create",
            "output.remove",
            "output.change.id",
            "argument.create",
            "argument.remove",
            "field.create",
            "field.remove",
            "validate",
            "binding.shellQuote",
            "expression.create",
            "expression.change",
            "expression.serialize",
            "output.metadata.inherit"
        ]);
        return _this;
    }
    // EXPRESSION CONTEXT //
    CommandLineToolModel.prototype.setJobInputs = function (inputs) {
        this.jobInputs = inputs || JobHelper_1.JobHelper.getNullJobInputs(this);
        this.validateAllExpressions();
        this.updateCommandLine();
    };
    // EVENT HANDLING //
    CommandLineToolModel.prototype.on = function (event, handler) {
        return {
            dispose: this.eventHub.on(event, handler)
        };
    };
    CommandLineToolModel.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    CommandLineToolModel.prototype.initializeJobWatchers = function () {
        var _this = this;
        this.eventHub.on("input.change.id", function (data) {
            var root = _this.jobInputs;
            // check if port is a field (nested structure)
            if (data.port.isField) {
                root = _this.findFieldRoot(data.port, root);
                if (Array.isArray(root)) {
                    root.forEach(function (obj) {
                        obj[data.newId] = obj[data.oldId] || JobHelper_1.JobHelper.generateMockJobData(data.port);
                        delete obj[data.oldId];
                    });
                    return;
                }
            }
            // root is the object which holds changed input, either jobInputs or a record
            root[data.newId] = root[data.oldId] || JobHelper_1.JobHelper.generateMockJobData(data.port);
            delete root[data.oldId];
            _this.updateCommandLine();
        });
        this.eventHub.on("io.change.type", function (loc) {
            // make sure loc is within this tree and that belongs to one of the inputs
            if (loc.search(_this.loc) === 0 && loc.search("inputs") > -1) {
                // remove root part of loc and ignore type part of loc
                loc = loc.substr(_this.loc.length).replace(/type$/, "");
                // find port based on its loc
                var port = utils_1.fetchByLoc(_this, loc);
                if (!port) {
                    // newly added inputs will trigger this event before they are added to tool
                    return;
                }
                var root = _this.jobInputs;
                if (port.isField) {
                    root = _this.findFieldRoot(port, root);
                    if (Array.isArray(root)) {
                        for (var i = 0; i < root.length; i++) {
                            // add mock value of field to each record in array
                            root[i][port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                        }
                        _this.updateCommandLine();
                        return;
                    }
                }
                root[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                _this.updateCommandLine();
            }
        });
        this.eventHub.on("input.remove", function (port) {
            delete _this.jobInputs[port.id];
            _this.updateCommandLine();
        });
        this.eventHub.on("field.remove", function (port) {
            if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                var root = _this.findFieldRoot(port, _this.jobInputs);
                if (Array.isArray(root)) {
                    root.forEach(function (obj) { return delete obj[port.id]; });
                }
                else {
                    delete root[port.id];
                }
                _this.updateCommandLine();
            }
        });
        this.eventHub.on("input.create", function (port) {
            _this.jobInputs[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
            _this.updateCommandLine();
        });
        this.eventHub.on("field.create", function (port) {
            if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                var root = _this.findFieldRoot(port, _this.jobInputs);
                // in case parent is array of records, not a single record
                if (Array.isArray(root)) {
                    for (var i = 0; i < root.length; i++) {
                        // add mock value of field to each record in array
                        root[i][port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                    }
                }
                else {
                    // parent is single record, add mock value of field to that record
                    root[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                }
                _this.updateCommandLine();
            }
        });
    };
    CommandLineToolModel.prototype.initializeExprWatchers = function () {
        var _this = this;
        this.eventHub.on("expression.create", function (expr) {
            _this.expressions.add(expr);
            if (_this.constructed) {
                _this.validationPromises.push(_this.validateExpression(expr));
            }
        });
        this.eventHub.on("expression.change", function (expr) {
            _this.validationPromises.push(_this.validateExpression(expr));
        });
    };
    CommandLineToolModel.prototype.validateExpression = function (expression) {
        var input;
        if (/inputs|outputs/.test(expression.loc)) {
            var loc = /.*(?:inputs\[\d+]|.*outputs\[\d+]|.*fields\[\d+])/
                .exec(expression.loc)[0] // take the first match
                .replace("document", ""); // so loc is relative to root
            input = utils_1.fetchByLoc(this, loc);
        }
        return expression.validate(this.getContext(input));
    };
    CommandLineToolModel.prototype.validateAllExpressions = function () {
        var _this = this;
        this.expressions.forEach(function (e) {
            _this.validationPromises.push(_this.validateExpression(e));
        });
    };
    // DOCUMENT TREE TRAVERSAL //
    CommandLineToolModel.prototype.findFieldRoot = function (port, base) {
        // find ancestor that is in the inputs root, save ancestors
        var isField = true;
        // creating a path to the input inside the job, ignoring the id of the actual input for now
        var path = [];
        // location of the current port we're looking at
        var loc = port.loc;
        while (isField) {
            var parent_1 = this.findFieldParent(loc);
            // add parent id to the beginning of the path, we're traversing up the tree
            // keeping track if type is array so we can gather all child nodes where port has a value
            path.unshift({ id: parent_1.id, isArray: parent_1.type.type === "array" });
            // continue traversing if parent is a field
            isField = parent_1.isField;
            // parent becomes port we're looking at
            loc = parent_1.loc;
        }
        // traverse jobInputs with the ids generated from field parents, find root of field
        var traversePath = function (path, root) {
            // null is if the record itself is set to null,
            // undefined is if the id isn't even defined in the job object
            if (root === null || root === undefined) {
                return null;
            }
            // starting from the root of the tree, going down each level till we find the port
            if (path.length === 0) {
                return root;
            }
            // if node is an array, recursively traverse all it's elements
            var part = path[0];
            if (part.isArray) {
                if (!Array.isArray(root[part.id])) {
                    return null;
                }
                // flatten the nested array, if it contains arrays itself
                return utils_1.flatten(root[part.id].map(function (obj) { return traversePath(path.slice(1), obj); }));
            }
            // traverse the path for the root element
            return traversePath(path.slice(1), root[part.id]);
        };
        return traversePath(path, base);
    };
    CommandLineToolModel.prototype.findFieldParent = function (loc) {
        // remove base of location that's the same as this location
        // remove the ".type.fields[#]" which signifies the field so the loc points to its parent
        // before: "document.inputs[3].type.fields[3]
        // after: ".inputs[3]"
        loc = loc.substr(this.loc.length).replace(/\.type\.fields\[\d+]$/, "");
        return utils_1.fetchByLoc(this, loc);
    };
    // CRUD HELPER METHODS //
    CommandLineToolModel.prototype.changeIOId = function (port, id) {
        if (port.id === id) {
            return;
        }
        var oldId = port.id;
        var type;
        var scope;
        // emit set proper type so event can be emitted and validity can be scoped
        if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            type = "input";
        }
        else if (port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            type = "output";
        }
        if (port.isField) {
            scope = this.findFieldParent(port.loc).type.fields;
        }
        // verify that the new ID can be set
        utils_1.checkIdValidity(id, scope || this.inputs.concat(this.outputs));
        port.clearIssue(ErrorCode_1.ErrorCode.ID_ALL);
        port.id = id;
        if (utils_1.isType(port, ["record", "enum"])) {
            port.type.name = id;
        }
        // emit change event so CLT subclasses can change job values,
        // emits "input.change.id" or "output.change.id"
        this.eventHub.emit(type + ".change.id", { port: port, oldId: oldId, newId: port.id });
    };
    CommandLineToolModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.updateStream = function (stream, type) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateStream", "CommandLineToolModel");
    };
    CommandLineToolModel.prototype._addOutput = function (outputConstructor, output) {
        var _this = this;
        if (output === void 0) { output = { id: null }; }
        var loc = utils_1.incrementLastLoc(this.outputs, this.loc + ".outputs");
        output.id = output.id || utils_1.getNextAvailableId("output", this.inputs.concat(this.outputs));
        var o = new outputConstructor(output, loc, this.eventHub);
        o.setValidationCallback(function (err) { return _this.updateValidity(err); });
        try {
            utils_1.checkIdValidity(o.id, this.inputs.concat(this.outputs));
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[o.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        this.outputs.push(o);
        return o;
        var _a;
    };
    CommandLineToolModel.prototype.addOutput = function (output) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addOutput", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeOutput = function (output) {
        var index = this.outputs.indexOf(output);
        if (index < 0) {
            return;
        }
        this.outputs[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.outputs[index].clearListeners();
        this.outputs.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.outputs.length; i++) {
            this.outputs[i].updateLoc(this.loc + ".outputs[" + i + "]");
        }
        this.eventHub.emit("output.remove", output);
    };
    CommandLineToolModel.prototype._addInput = function (inputConstructor, input) {
        var _this = this;
        if (input === void 0) { input = { id: null }; }
        var loc = utils_1.incrementLastLoc(this.inputs, this.loc + ".inputs");
        input.id = input.id || utils_1.getNextAvailableId("input", this.inputs.concat(this.outputs));
        var i = new inputConstructor(input, loc, this.eventHub);
        i.setValidationCallback(function (err) { return _this.updateValidity(err); });
        try {
            utils_1.checkIdValidity(i.id, this.inputs.concat(this.outputs));
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[i.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        this.inputs.push(i);
        this.eventHub.emit("input.create", i);
        return i;
        var _a;
    };
    CommandLineToolModel.prototype.addInput = function (input) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addInput", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeInput = function (input) {
        var index = this.inputs.indexOf(input);
        if (index < 0) {
            return;
        }
        this.inputs[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.inputs[index].clearListeners();
        this.inputs.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.inputs.length; i++) {
            this.inputs[i].updateLoc(this.loc + ".inputs[" + i + "]");
        }
        this.eventHub.emit("input.remove", input);
    };
    CommandLineToolModel.prototype.addArgument = function (arg) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addArgument", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeArgument = function (arg) {
        var index = this.arguments.indexOf(arg);
        if (index < 0) {
            return;
        }
        this.arguments[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.arguments[index].clearListeners();
        this.arguments.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.arguments.length; i++) {
            this.arguments[i].updateLoc(this.loc + ".arguments[" + i + "]");
        }
        this.eventHub.emit("argument.remove", arg);
    };
    CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addBaseCommand", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setRequirement", "CommandLineToolModel");
    };
    // COMMAND LINE //
    CommandLineToolModel.prototype.updateCommandLine = function () {
        var _this = this;
        if (this.constructed) {
            this.generateCommandLineParts().then(function (res) {
                _this.commandLineWatcher(res);
            });
        }
    };
    CommandLineToolModel.prototype.onCommandLineResult = function (fn) {
        this.commandLineWatcher = fn;
    };
    CommandLineToolModel.prototype.generateCommandLine = function () {
        return this.generateCommandLineParts().then(function (parts) {
            var res = parts.filter(function (p) { return !!p.value; }).map(function (p) { return p.value; }).join(" ");
            return res.trim();
        });
    };
    CommandLineToolModel.prototype.generateCommandLineParts = function () {
        return CommandLineUtils_1.generateCommandLineParts(this, this.jobInputs, this.runtime);
    };
    // VALIDATION //
    CommandLineToolModel.prototype.validate = function () {
        var _this = this;
        return Promise.all(this.validationPromises).then(function () {
            _this.validationPromises = [];
        });
    };
    return CommandLineToolModel;
}(ValidationBase_1.ValidationBase));
exports.CommandLineToolModel = CommandLineToolModel;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var CommandArgumentModel = /** @class */ (function (_super) {
    __extends(CommandArgumentModel, _super);
    function CommandArgumentModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.hasBinding = false;
        _this.customProps = {};
        return _this;
    }
    Object.defineProperty(CommandArgumentModel.prototype, "prefix", {
        get: function () {
            return this.binding ? this.binding.prefix : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "position", {
        get: function () {
            return this.binding ? this.binding.position || 0 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "separate", {
        get: function () {
            return this.binding ? this.binding.separate !== false : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "itemSeparator", {
        get: function () {
            return this.binding ? this.binding.itemSeparator : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "valueFrom", {
        get: function () {
            return this.binding ? this.binding.valueFrom : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "shellQuote", {
        // if binding doesn't have shellQuote, it will return undefined anyway
        get: function () {
            return this.binding ? this.binding.shellQuote : undefined;
        },
        enumerable: true,
        configurable: true
    });
    CommandArgumentModel.prototype.toggleBinding = function (state) {
        new UnimplementedMethodException_1.UnimplementedMethodException("toggleBinding", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.updatePrimitive = function (str) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updatePrimitive", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.updateBinding = function (binding) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateBinding", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.toString = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("toString", "CommandArgumentModel");
        return null;
    };
    CommandArgumentModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandArgumentModel");
        return null;
    };
    CommandArgumentModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        if (this.hasBinding) {
            return this.binding.validate(context);
        }
        return new Promise(function (res) { res(_this.issues); });
    };
    return CommandArgumentModel;
}(ValidationBase_1.ValidationBase));
exports.CommandArgumentModel = CommandArgumentModel;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var V1CommandInputParameterModel_1 = __webpack_require__(31);
var V1WorkflowInputParameterModel_1 = __webpack_require__(46);
var JobHelper = /** @class */ (function () {
    function JobHelper() {
    }
    JobHelper.generateMockJobData = function (input) {
        var type = input.type.type;
        var items = input.type.items;
        var name = input.id;
        var symbols = input.type.symbols;
        var version = input instanceof V1CommandInputParameterModel_1.V1CommandInputParameterModel || input instanceof V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel ? "v1.0" : "sbg:draft-2";
        /**
         * Returns a random integer between min (included) and max (excluded)
         *
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        /**
         * Returns a random floating number between min (inclusive) and max (exclusive)
         *
         * @param {number} min
         * @param {number} max
         * @returns {float}
         */
        function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
        var file = function (name) {
            return {
                path: '/path/to/' + name + '.ext',
                'class': 'File',
                size: 0,
                contents: "file contents",
                secondaryFiles: []
            };
        };
        var map = {
            File: file(name),
            Directory: { path: "/path/to/" + name, "class": "Directory", basename: name },
            'enum': symbols ? symbols[0] : name,
            string: name + '-string-value',
            int: getRandomInt(0, 11),
            float: getRandomFloat(0, 11),
            boolean: true,
            record: {},
            map: {},
            array: {
                File: [
                    file(name + "-1"),
                    file(name + "-2")
                ],
                Directory: [
                    {
                        path: "/path/to/" + name,
                        "class": "Directory",
                        basename: name
                    },
                    {
                        path: "/path/to/" + name,
                        "class": "Directory",
                        basename: name
                    }
                ],
                string: [name + '-string-value-1', name + '-string-value-2'],
                int: [getRandomInt(0, 11), getRandomInt(0, 11)],
                float: [getRandomFloat(0, 11), getRandomFloat(0, 11)],
                record: [{}],
                map: [{}],
                'enum': [symbols ? symbols[0] || "" : name || ""],
                boolean: [true, true],
            }
        };
        var val = map[type];
        if (type === "array") {
            val = val[items];
            if (items === "record" && input.type.fields) {
                val = [];
                var obj_1 = {};
                input.type.fields.forEach(function (field) {
                    obj_1[field.id] = JobHelper.generateMockJobData(field);
                });
                // Objects must be cloned because of job management and later manipulation
                var obj1 = JSON.parse(JSON.stringify(obj_1));
                var obj2 = JSON.parse(JSON.stringify(obj_1));
                val.push(obj1);
                val.push(obj2);
            }
        }
        if (type === "record" && input.type.fields) {
            input.type.fields.forEach(function (field) {
                val[field.id] = JobHelper.generateMockJobData(field);
            });
        }
        if (type === "File" && version === "v1.0") {
            val = __assign({}, val, { basename: name + ".ext", nameroot: name, nameext: ".ext" });
        }
        return val !== undefined ? val : null;
    };
    JobHelper.getJobInputs = function (app) {
        var job = {};
        app.inputs.forEach(function (input) {
            job[input.id] = JobHelper.generateMockJobData(input);
        });
        return job;
    };
    JobHelper.getNullJobInputs = function (app) {
        var job = {};
        app.inputs.forEach(function (input) {
            job[input.id] = null;
        });
        return job;
    };
    return JobHelper;
}());
exports.JobHelper = JobHelper;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(25);
var html_utils_1 = __webpack_require__(100);
var svg_utils_1 = __webpack_require__(54);
var io_port_1 = __webpack_require__(53);
var GraphNode = /** @class */ (function () {
    function GraphNode(position, dataModel) {
        this.dataModel = dataModel;
        this.position = { x: 0, y: 0 };
        this.dataModel = dataModel;
        Object.assign(this.position, position);
    }
    GraphNode.makeIconFragment = function (model) {
        var iconStr = "";
        if (model instanceof models_1.StepModel && model.run) {
            if (model.run.class === "Workflow") {
                iconStr = this.workflowIconSvg;
            }
            else if (model.run.class === "CommandLineTool") {
                iconStr = this.toolIconSvg;
            }
        }
        else if (model instanceof models_1.WorkflowInputParameterModel && model.type) {
            if (model.type.type === "File" || (model.type.type === "array" && model.type.items === "File")) {
                iconStr = this.fileInputIconSvg;
            }
            else {
                iconStr = this.inputIconSvg;
            }
        }
        else if (model instanceof models_1.WorkflowOutputParameterModel && model.type) {
            if (model.type.type === "File" || (model.type.type === "array" && model.type.items === "File")) {
                iconStr = this.fileOutputIconSvg;
            }
            else {
                iconStr = this.outputIconSvg;
            }
        }
        return iconStr;
    };
    GraphNode.makeTemplate = function (dataModel, labelScale) {
        if (labelScale === void 0) { labelScale = 1; }
        var x = ~~(dataModel.customProps && dataModel.customProps["sbg:x"]);
        var y = ~~(dataModel.customProps && dataModel.customProps["sbg:y"]);
        var nodeTypeClass = "step";
        if (dataModel instanceof models_1.WorkflowInputParameterModel) {
            nodeTypeClass = "input";
        }
        else if (dataModel instanceof models_1.WorkflowOutputParameterModel) {
            nodeTypeClass = "output";
        }
        var inputs = (dataModel["in"] || []).filter(function (p) { return p.isVisible; });
        var outputs = (dataModel["out"] || []).filter(function (p) { return p.isVisible; });
        var maxPorts = Math.max(inputs.length, outputs.length);
        var radius = GraphNode.radius + maxPorts * io_port_1.IOPort.radius;
        var typeClass = "";
        var itemsClass = "";
        if (dataModel.type) {
            typeClass = "type-" + dataModel.type.type;
            if (dataModel.type.items) {
                itemsClass = "items-" + dataModel.type.items;
            }
        }
        var inputPortTemplates = inputs
            .sort(function (a, b) { return -a.id.localeCompare(b.id); })
            .map(function (p, i, arr) { return GraphNode.makePortTemplate(p, "input", svg_utils_1.SVGUtils.matrixToTransformAttr(GraphNode.createPortMatrix(arr.length, i, radius, "input"))); })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        var outputPortTemplates = outputs
            .sort(function (a, b) { return -a.id.localeCompare(b.id); })
            .map(function (p, i, arr) { return GraphNode.makePortTemplate(p, "output", svg_utils_1.SVGUtils.matrixToTransformAttr(GraphNode.createPortMatrix(arr.length, i, radius, "output"))); })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        return "\n            <g tabindex=\"-1\" class=\"node " + nodeTypeClass + " " + typeClass + " " + itemsClass + "\"\n               data-connection-id=\"" + dataModel.connectionId + "\"\n               transform=\"matrix(1, 0, 0, 1, " + x + ", " + y + ")\"\n               data-id=\"" + dataModel.id + "\">\n               \n                <g class=\"core\" transform=\"matrix(1, 0, 0, 1, 0, 0)\">\n                    <circle cx=\"0\" cy=\"0\" r=\"" + radius + "\" class=\"outer\"></circle>\n                    <circle cx=\"0\" cy=\"0\" r=\"" + radius * .75 + "\" class=\"inner\"></circle>\n                    \n                    " + GraphNode.makeIconFragment(dataModel) + "\n                </g>\n                \n                <text transform=\"matrix(" + labelScale + ",0,0," + labelScale + ",0," + (radius + 30) + ")\" class=\"title label\">" + html_utils_1.HtmlUtils.escapeHTML(dataModel.label || dataModel.id) + "</text>\n                \n                " + inputPortTemplates + "\n                " + outputPortTemplates + "\n            </g>\n        ";
    };
    GraphNode.makePortTemplate = function (port, type, transform) {
        if (transform === void 0) { transform = "matrix(1, 0, 0, 1, 0, 0)"; }
        var portClass = type === "input" ? "input-port" : "output-port";
        var label = port.label || port.id;
        return "\n            <g class=\"port " + portClass + "\" transform=\"" + (transform || "matrix(1, 0, 0, 1, 0, 0)") + "\"\n               data-connection-id=\"" + port.connectionId + "\"\n               data-port-id=\"" + port.id + "\"\n            >\n                <g class=\"io-port\">\n                    <circle cx=\"0\" cy=\"0\" r=\"7\" class=\"port-handle\"></circle>\n                </g>\n                <text x=\"0\" y=\"0\" transform=\"matrix(1,0,0,1,0,0)\" class=\"label unselectable\">" + label + "</text>\n            </g>\n            \n        ";
    };
    GraphNode.createPortMatrix = function (totalPortLength, portIndex, radius, type) {
        var availableAngle = 140;
        var rotationAngle = 
        // Starting rotation angle
        (-availableAngle / 2) +
            (
            // Angular offset by element index
            (portIndex + 1)
                // Angle between elements
                * availableAngle / (totalPortLength + 1));
        if (type === "input") {
            rotationAngle =
                // Determines the starting rotation angle
                180 - (availableAngle / -2)
                    // Determines the angular offset modifier for the current index
                    - (portIndex + 1)
                        // Determines the angular offset
                        * availableAngle / (totalPortLength + 1);
        }
        var matrix = svg_utils_1.SVGUtils.createMatrix();
        return matrix.rotate(rotationAngle).translate(radius, 0).rotate(-rotationAngle);
    };
    GraphNode.patchModelPorts = function (model) {
        var patch = [{ connectionId: model.connectionId, isVisible: true, id: model.id }];
        if (model instanceof models_1.WorkflowInputParameterModel) {
            var copy = Object.create(model);
            return Object.assign(copy, { out: patch });
        }
        else if (model instanceof models_1.WorkflowOutputParameterModel) {
            var copy = Object.create(model);
            return Object.assign(copy, { in: patch });
        }
        return model;
    };
    GraphNode.radius = 30;
    /**
     * @FIXME Making icons increases the rendering time by 50-100%. Try embedding the SVG directly.
     */
    GraphNode.workflowIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400.01 399.88\" x=\"-9\" y=\"-10\" width=\"20\" height=\"20\"><title>workflow</title><path d=\"M400,200a80,80,0,0,1-140.33,52.53L158.23,303.24a80,80,0,1,1-17.9-35.77l101.44-50.71a80.23,80.23,0,0,1,0-33.52L140.33,132.53a79.87,79.87,0,1,1,17.9-35.77l101.44,50.71A80,80,0,0,1,400,200Z\" transform=\"translate(0.01 -0.16)\"/></svg>";
    GraphNode.toolIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 398.39 397.78\" x=\"-10\" y=\"-8\" width=\"20\" height=\"15\"><title>tool2</title><polygon points=\"38.77 397.57 0 366 136.15 198.78 0 31.57 38.77 0 200.63 198.78 38.77 397.57\"/><rect x=\"198.39\" y=\"347.78\" width=\"200\" height=\"50\"/></svg>";
    GraphNode.fileInputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 462.86\" y=\"-10\" x=\"-11\" width=\"20\" height=\"20\"><title>file_input</title><path d=\"M386.06,0H175V58.29l50,50V50H337.81V163.38h25l86.19.24V412.86H225V353.71l-50,50v59.15H499V112.94Zm1.75,113.45v-41l41.1,41.1Z\"/><polygon points=\"387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06\"/><polygon points=\"290.36 231 176.68 344.68 141.32 309.32 194.64 256 0 256 0 206 194.64 206 142.32 153.68 177.68 118.32 290.36 231\"/></svg>";
    GraphNode.fileOutputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 462.86\" x=\"-7\" y=\"-11\" width=\"20\" height=\"20\"><title>file_output</title><polygon points=\"387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06\"/><polygon points=\"499 231 385.32 344.68 349.96 309.32 403.28 256 208.64 256 208.64 206 403.28 206 350.96 153.68 386.32 118.32 499 231\"/><path d=\"M187.81,163.38l77.69.22H324V112.94L211.06,0H0V462.86H324V298.5H274V412.86H50V50H162.81V163.38Zm25-90.92,41.1,41.1-41.1-.11Z\"/></svg>";
    GraphNode.inputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 365\" x=\"-11\" y=\"-10\" width=\"20\" height=\"20\"><title>type_input</title><g id=\"input\"><path d=\"M316.5,68a181.72,181.72,0,0,0-114.12,40.09L238,143.72a132.5,132.5,0,1,1,1.16,214.39L203.48,393.8A182.5,182.5,0,1,0,316.5,68Z\" transform=\"translate(0 -68)\"/><g id=\"Layer_22\" data-name=\"Layer 22\"><g id=\"Layer_9_copy_4\" data-name=\"Layer 9 copy 4\"><polygon points=\"290.36 182 176.68 295.68 141.32 260.32 194.64 207 0 207 0 157 194.64 157 142.32 104.68 177.68 69.32 290.36 182\"/></g></g></g></svg>";
    GraphNode.outputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500.36 365\" x=\"-9\" y=\"-10\" width=\"20\" height=\"20\"><title>type_output</title><g id=\"output\"><path d=\"M291.95,325.23a134,134,0,0,1-15.76,19,132.5,132.5,0,1,1,0-187.38,133.9,133.9,0,0,1,16.16,19.55l35.81-35.81A182.5,182.5,0,1,0,327.73,361Z\" transform=\"translate(0 -68)\"/><g id=\"circle_source_copy\" data-name=\"circle source copy\"><g id=\"Layer_22_copy\" data-name=\"Layer 22 copy\"><g id=\"Layer_9_copy_5\" data-name=\"Layer 9 copy 5\"><polygon points=\"500.36 182 386.68 295.68 351.32 260.32 404.64 207 210 207 210 157 404.64 157 352.32 104.68 387.68 69.32 500.36 182\"/></g></g></g></g></svg>";
    return GraphNode;
}());
exports.GraphNode = GraphNode;
//# sourceMappingURL=graph-node.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(67));
__export(__webpack_require__(94));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var V1WorkflowModel_1 = __webpack_require__(68);
var SBDraft2WorkflowModel_1 = __webpack_require__(88);
var WorkflowFactory = /** @class */ (function () {
    function WorkflowFactory() {
    }
    WorkflowFactory.from = function (workflow, loc) {
        // check if workflow passed has already been parsed to the model
        if (workflow instanceof WorkflowModel_1.WorkflowModel)
            return workflow;
        if (workflow) {
            switch (workflow.cwlVersion) {
                case "v1.0":
                    return new V1WorkflowModel_1.V1WorkflowModel(workflow, loc);
                case "sbg:draft-2":
                case "draft-2":
                default:
                    return new SBDraft2WorkflowModel_1.SBDraft2WorkflowModel(workflow, loc);
            }
        }
        return new SBDraft2WorkflowModel_1.SBDraft2WorkflowModel(workflow, loc);
    };
    return WorkflowFactory;
}());
exports.WorkflowFactory = WorkflowFactory;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = __webpack_require__(1);
/**
 * Name has to be present even if not initially added because of Avro compatibility
 * @name nameRequirement
 * @link https://docs.oracle.com/cd/E57769_01/html/GettingStartedGuide/avroschemas.html
 */
var TypeResolver = /** @class */ (function () {
    function TypeResolver() {
    }
    TypeResolver.resolveType = function (originalType, result) {
        result = result || {
            type: null,
            items: null,
            fields: null,
            symbols: null,
            isNullable: false,
            isItemOrArray: false,
            typeBinding: null,
            name: null,
            unionType: null
        };
        if (originalType === null || originalType === undefined) {
            result.isNullable = true;
            return result;
        }
        var tmp = originalType;
        if (typeof originalType.serialize === "function") {
            tmp = originalType.serialize();
        }
        var type;
        // clone type object because it will be sliced and modified later
        try {
            type = JSON.parse(JSON.stringify(tmp));
        }
        catch (err) {
            type = __assign({}, tmp);
            console.error(err);
        }
        if (typeof type === 'string') {
            var matches = /(\w+)([\[\]?]+)/g.exec(type);
            if (matches) {
                if (/\?/.test(matches[2])) {
                    result.isNullable = true;
                }
                if (/\[]/.test(matches[2])) {
                    result.type = 'array';
                    result.items = matches[1];
                }
                else {
                    result.type = matches[1];
                }
                return result;
            }
            else {
                result.type = type;
                return result;
            }
        }
        else if (Array.isArray(type)) {
            // check if type is required
            var nullIndex = type.indexOf('null');
            if (nullIndex > -1) {
                result.isNullable = true;
                type.splice(nullIndex, 1);
            }
            if (type.length !== 1) {
                // check if type has only two remaining values
                if (type.length === 2) {
                    // resolve types to TypeResolution
                    var type0 = TypeResolver.resolveType(type[0]);
                    var type1 = TypeResolver.resolveType(type[1]);
                    // check if types are actually item and item[]
                    if (type0.items === type1.type || type1.items === type0.type) {
                        // remove type which is array for encoding
                        type0.type === "array" ? type.splice(0, 1) : type.splice(1, 1);
                        result.isItemOrArray = true;
                    }
                    else {
                        result.unionType = type;
                        throw new ErrorCode_1.ValidityError("TypeResolverError: Union types not supported yet. Found type " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                    }
                }
                else {
                    result.unionType = type;
                    throw new ErrorCode_1.ValidityError("TypeResolverError: Union types not supported yet! Found type " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
            if (typeof type[0] === 'string') {
                return TypeResolver.resolveType(type[0], result);
            }
            else {
                if (typeof type[0] === 'object') {
                    return TypeResolver.resolveType(type[0], result);
                }
                else {
                    throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object, instead got " + type[0], ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
        }
        else if (typeof type === 'object') {
            if (type.type) {
                // result type has already been set, pass through is evaluating complex items type
                if (result.type === "array") {
                    result.items = type.type;
                }
                else {
                    // first pass through, type should be set  on result
                    result.type = type.type;
                }
                switch (type.type) {
                    case "array":
                        result.typeBinding = type.inputBinding || null;
                        if (typeof type.items === 'string') {
                            // primitive types don't need to be reevaluated
                            result.items = type.items;
                            return result;
                        }
                        else if (Array.isArray(type.items) || type.items.type === "array") {
                            // complex types that aren't currently supported but should be preserved
                            result.items = type.items;
                            return result;
                        }
                        else {
                            // complex types should be reevaluated to set fields/symbols/items properties
                            return TypeResolver.resolveType(type.items, result);
                        }
                    case "record":
                        result.fields = type.fields;
                        result.name = type.name || null;
                        return result;
                    case "enum":
                        result.symbols = type.symbols;
                        result.name = type.name || null;
                        return result;
                    case "string":
                    case "File":
                    case "null":
                    case "boolean":
                    case "int":
                    case "long":
                    case "Directory":
                    case "double":
                        return result;
                    default:
                        throw new ErrorCode_1.ValidityError("TypeResolverError: unmatched complex type, expected 'enum', 'array', or 'record', got '" + type.type + "'", ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
            else {
                throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object with type field, instead got " + JSON.stringify(type), ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
            }
        }
        else {
            throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object, array, or string, instead got " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
        }
    };
    TypeResolver.doesTypeMatch = function (type, value) {
        if (type) {
            switch (type) {
                case 'int':
                case 'float':
                case 'long':
                case 'double':
                    return typeof value === 'number';
                case 'File':
                case 'record':
                case "Directory":
                    return typeof value === 'object' && !Array.isArray(value);
                case 'array':
                    return Array.isArray(value);
                case 'enum':
                    return typeof value === 'string';
                default:
                    return typeof value === type;
            }
        }
        return true;
    };
    TypeResolver.serializeType = function (type, version) {
        var t;
        if (type.unionType) {
            var union = type.unionType;
            type.type === "array" ? type.items = union : type.type = union;
            if (type.isNullable) {
                union.push("null");
                type.isNullable = false;
            }
        }
        if (type.type === null || type.type === undefined) {
            return null;
        }
        switch (type.type) {
            case "array":
                if (type.items === "enum") {
                    t = {
                        type: "array",
                        items: {
                            type: "enum",
                            /** @see nameRequirement */
                            name: type.name || "",
                            symbols: type.symbols
                        }
                    };
                }
                else if (type.items === "record") {
                    t = {
                        type: "array",
                        items: {
                            type: "record",
                            /** @see nameRequirement */
                            name: type.name || "",
                            fields: type.fields.map(function (field) {
                                if (typeof field.serialize === "function") {
                                    return field.serialize();
                                }
                                else {
                                    return field;
                                }
                            })
                        }
                    };
                }
                else if (version === "v1.0" && !type.typeBinding && typeof type.items === "string") {
                    t = type.items + "[]";
                }
                else {
                    t = {
                        type: "array",
                        items: type.items
                    };
                    if (type.typeBinding)
                        t.inputBinding = type.typeBinding;
                }
                break;
            case "record":
                t = {
                    type: "record",
                    fields: type.fields.map(function (field) {
                        if (typeof field.serialize === "function") {
                            return field.serialize();
                        }
                        else {
                            return field;
                        }
                    }),
                    /** @see nameRequirement */
                    name: type.name || ""
                };
                if (type.typeBinding)
                    t.inputBinding = type.typeBinding;
                break;
            case "enum":
                t = {
                    type: "enum",
                    symbols: type.symbols,
                    /** @see nameRequirement */
                    name: type.name || ""
                };
                if (type.typeBinding)
                    t.inputBinding = type.typeBinding;
                break;
            default:
                t = type.type;
        }
        // type should be serialized as an array of ["item", "item[]"]
        if (type.isItemOrArray) {
            var tArr = {
                type: "array",
                items: t
            };
            t = [t];
            t.push(tArr);
            if (type.isNullable) {
                t.unshift("null");
            }
            return t;
        }
        if (type.isNullable) {
            t = version === "v1.0" && typeof t === "string" ? t + "?" : ["null", t];
        }
        else if (version !== "v1.0") {
            t = [t];
        }
        return t;
    };
    return TypeResolver;
}());
exports.TypeResolver = TypeResolver;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(21);
var V1CommandLineToolModel_1 = __webpack_require__(72);
var SBDraft2CommandLineToolModel_1 = __webpack_require__(78);
var CommandLineToolFactory = /** @class */ (function () {
    function CommandLineToolFactory() {
    }
    CommandLineToolFactory.from = function (tool, loc) {
        // check if tool passed has already been parsed to the model
        if (tool instanceof CommandLineToolModel_1.CommandLineToolModel)
            return tool;
        if (tool) {
            switch (tool.cwlVersion) {
                case "v1.0":
                    return new V1CommandLineToolModel_1.V1CommandLineToolModel(tool, loc);
                case "sbg:draft-2":
                case "draft-2":
                default:
                    return new SBDraft2CommandLineToolModel_1.SBDraft2CommandLineToolModel(tool, loc);
            }
        }
        return new SBDraft2CommandLineToolModel_1.SBDraft2CommandLineToolModel(tool, loc);
    };
    return CommandLineToolFactory;
}());
exports.CommandLineToolFactory = CommandLineToolFactory;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLinePart = /** @class */ (function () {
    function CommandLinePart(value, type, loc) {
        value = value === undefined ? '' : value; // in case expression returned undefined
        value = value.toString(); // in case expression returned something other than a string
        this.value = value.trim();
        this.type = type;
        this.loc = loc;
    }
    return CommandLinePart;
}());
exports.CommandLinePart = CommandLinePart;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(CommandLineBindingModel, _super);
    function CommandLineBindingModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        new UnimplementedMethodException_1.UnimplementedMethodException("validate", "CommandLineBindingModel");
        return new Promise(function (res, rej) { return res(_this.issues); });
    };
    CommandLineBindingModel.prototype.setValueFrom = function (val) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setValueFrom", "CommandLineBindingModel");
    };
    CommandLineBindingModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandLineBindingModel");
        return null;
    };
    CommandLineBindingModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandLineBindingModel");
    };
    CommandLineBindingModel.prototype.cloneStatus = function (clone) {
        this.setIssue(__assign({}, clone.issues));
        this.deserialize(clone.serialize());
    };
    ;
    return CommandLineBindingModel;
}(ValidationBase_1.ValidationBase));
exports.CommandLineBindingModel = CommandLineBindingModel;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandInputParameterModel_1 = __webpack_require__(10);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1CommandLineBindingModel_1 = __webpack_require__(45);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(V1CommandInputParameterModel, _super);
    function V1CommandInputParameterModel(attr, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = true;
        _this.hasSecondaryFilesInRoot = true;
        _this.hasStageInput = false;
        if (attr)
            _this.deserialize(attr);
        return _this;
    }
    V1CommandInputParameterModel.prototype.updateInputBinding = function (binding) {
        var _this = this;
        if (binding instanceof V1CommandLineBindingModel_1.V1CommandLineBindingModel) {
            //@todo breaks here for "serialize of undefined"
            this.inputBinding.cloneStatus(binding);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    V1CommandInputParameterModel.prototype.createInputBinding = function () {
        var _this = this;
        this.inputBinding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel({}, this.loc + ".inputBinding", this.eventHub);
        this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return this.inputBinding;
    };
    V1CommandInputParameterModel.prototype.addSecondaryFile = function (file) {
        return this._addSecondaryFile(file, V1ExpressionModel_1.V1ExpressionModel, this.loc);
    };
    V1CommandInputParameterModel.prototype.updateSecondaryFiles = function (files) {
        this._updateSecondaryFiles(files);
    };
    V1CommandInputParameterModel.prototype.removeSecondaryFile = function (index) {
        this._removeSecondaryFile(index);
    };
    V1CommandInputParameterModel.prototype.serialize = function () {
        var base = __assign({}, this.customProps);
        if (this.isField) {
            base.name = this.id || "";
        }
        else {
            base.id = this.id || "";
        }
        base.type = this.type.serialize("v1.0");
        if (this.inputBinding)
            base.inputBinding = this.inputBinding.serialize();
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.doc = this.description;
        if (this.fileTypes.length && !this.isField) {
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (this.streamable !== undefined && !this.isField) {
            base.streamable = this.streamable;
        }
        if (this.secondaryFiles && this.secondaryFiles.length && !this.isField) {
            base.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
        }
        return base;
    };
    V1CommandInputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["type", "doc", "inputBinding", "label", "secondaryFiles", "sbg:fileTypes", "streamable"];
        if (attr.name) {
            this.id = attr.name;
            this.isField = true;
            serializedKeys.push("name");
        }
        else {
            this.id = attr.id;
            serializedKeys.push("id");
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1CommandInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        if (attr.inputBinding) {
            this.inputBinding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr.inputBinding, this.loc + ".inputBinding", this.eventHub);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        this.label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join('\n');
        this.secondaryFiles = utils_1.ensureArray(attr.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.streamable = attr.streamable;
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1CommandInputParameterModel;
}(CommandInputParameterModel_1.CommandInputParameterModel));
exports.V1CommandInputParameterModel = V1CommandInputParameterModel;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(0);
var DockerRequirementModel = /** @class */ (function (_super) {
    __extends(DockerRequirementModel, _super);
    function DockerRequirementModel(req, loc) {
        var _this = _super.call(this, loc) || this;
        _this.class = "DockerRequirement";
        _this.customProps = {};
        _this.serializedKeys = [
            "class",
            "dockerFile",
            "dockerImageId",
            "dockerLoad",
            "dockerOutputDirectory",
            "dockerPull"
        ];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    DockerRequirementModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key])
                base[key] = _this[key];
        });
        // don't serialize if the only property that is being serialized is the class
        var keys = Object.keys(base);
        var customPropsKeys = Object.keys(this.customProps);
        if (keys.length === 1 && keys[0] === "class" && customPropsKeys.length === 0) {
            return undefined;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    DockerRequirementModel.prototype.deserialize = function (attr) {
        var _this = this;
        this.serializedKeys.forEach(function (key) {
            _this[key] = attr[key];
        });
        this.class = "DockerRequirement";
        utils_1.spreadSelectProps(attr, this.customProps, this.serializedKeys);
    };
    return DockerRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.DockerRequirementModel = DockerRequirementModel;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var ErrorCode_1 = __webpack_require__(1);
var CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(CommandOutputBindingModel, _super);
    function CommandOutputBindingModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandOutputBindingModel.prototype.setGlob = function (value, exprConstructor) {
        var _this = this;
        var val = value.serialize();
        this._glob.clearIssue(ErrorCode_1.ErrorCode.ALL);
        this._glob = new exprConstructor(val, this.loc + ".glob", this.eventHub);
        this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.validateGlob();
    };
    CommandOutputBindingModel.prototype.validateGlob = function () {
        if (!this._glob)
            return;
        if (this._glob.serialize() === undefined) {
            this._glob.setIssue((_a = {},
                _a[this.loc + ".glob"] = {
                    message: "Glob should be specified",
                    type: "warning",
                    code: ErrorCode_1.ErrorCode.OUTPUT_GLOB_MISSING
                },
                _a), true);
        }
        else {
            this._glob.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_GLOB_MISSING);
        }
        var _a;
    };
    CommandOutputBindingModel.prototype.setOutputEval = function (value, exprConstructor) {
        var _this = this;
        if (this._outputEval) {
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.ALL);
        }
        this._outputEval = new exprConstructor(value.serialize(), this.loc + ".outputEval", this.eventHub);
        this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    return CommandOutputBindingModel;
}(ValidationBase_1.ValidationBase));
exports.CommandOutputBindingModel = CommandOutputBindingModel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException_1 = __webpack_require__(3);
var ProcessRequirementModel_1 = __webpack_require__(12);
var ErrorCode_1 = __webpack_require__(1);
var CreateFileRequirementModel = /** @class */ (function (_super) {
    __extends(CreateFileRequirementModel, _super);
    function CreateFileRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        return _this;
    }
    CreateFileRequirementModel.prototype.addDirent = function (def) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addDirent", "CreateFileRequirementModel");
        return null;
    };
    CreateFileRequirementModel.prototype.addExpression = function (e) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addExpression", "CreateFileRequirementModel");
        return null;
    };
    CreateFileRequirementModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        return Promise.all(this.listing.map(function (dir) { return dir.validate(context); }))
            .then(function () { return _this.issues; }, function () { return _this.issues; });
    };
    return CreateFileRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.CreateFileRequirementModel = CreateFileRequirementModel;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var DirentModel = /** @class */ (function (_super) {
    __extends(DirentModel, _super);
    function DirentModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    DirentModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "DirentModel");
        return null;
    };
    DirentModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "DirentModel");
    };
    DirentModel.prototype.validate = function (context) {
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        return Promise.all([this.entry.validate(context), this.entryName.validate(context)]);
    };
    return DirentModel;
}(ValidationBase_1.ValidationBase));
exports.DirentModel = DirentModel;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(ResourceRequirementModel, _super);
    function ResourceRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.class = "ResourceRequirement";
        return _this;
    }
    return ResourceRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.ResourceRequirementModel = ResourceRequirementModel;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_events_1 = __webpack_require__(98);
var event_hub_1 = __webpack_require__(99);
var edge_1 = __webpack_require__(38);
var graph_node_1 = __webpack_require__(24);
var step_node_1 = __webpack_require__(55);
var template_parser_1 = __webpack_require__(56);
/**
 * @FIXME validation states of old and newly created edges
 */
var Workflow = /** @class */ (function () {
    function Workflow(parameters) {
        var _this = this;
        this.svgID = this.makeID();
        this.minScale = 0.2;
        this.maxScale = 2;
        this.editingEnabled = true;
        /** Scale of labels, they are different than scale of other elements in the workflow */
        this.labelScale = 1;
        this.plugins = [];
        this.handlersThatCanBeDisabled = [];
        this.disposers = [];
        this.pendingFirstDraw = true;
        /** Current scale of the document */
        this._scale = 1;
        this.svgRoot = parameters.svgRoot;
        this.plugins = parameters.plugins || [];
        this.domEvents = new dom_events_1.DomEvents(this.svgRoot);
        this.model = parameters.model;
        this.editingEnabled = parameters.editingEnabled !== false; // default to true if undefined
        this.svgRoot.classList.add(this.svgID);
        this.svgRoot.innerHTML = "\n            <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" class=\"pan-handle\" transform=\"matrix(1,0,0,1,0,0)\"></rect>\n            <g class=\"workflow\" transform=\"matrix(1,0,0,1,0,0)\"></g>\n        ";
        this.workflow = this.svgRoot.querySelector(".workflow");
        this.invokePlugins("registerWorkflow", this);
        this.eventHub = new event_hub_1.EventHub([
            "connection.create",
            "app.create.step",
            "app.create.input",
            "app.create.output",
            "beforeChange",
            "afterChange",
            "afterRender",
            "selectionChange"
        ]);
        this.hookPlugins();
        this.draw(parameters.model);
        this.eventHub.on("afterRender", function () { return _this.invokePlugins("afterRender"); });
    }
    Object.defineProperty(Workflow.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        // noinspection JSUnusedGlobalSymbols
        set: function (scale) {
            this.workflowBoundingClientRect = this.svgRoot.getBoundingClientRect();
            var x = (this.workflowBoundingClientRect.right + this.workflowBoundingClientRect.left) / 2;
            var y = (this.workflowBoundingClientRect.top + this.workflowBoundingClientRect.bottom) / 2;
            this.scaleAtPoint(scale, x, y);
        },
        enumerable: true,
        configurable: true
    });
    Workflow.canDrawIn = function (element) {
        return element.getBoundingClientRect().width !== 0;
    };
    Workflow.makeConnectionPath = function (x1, y1, x2, y2, forceDirection) {
        if (forceDirection === void 0) { forceDirection = "right"; }
        if (!forceDirection) {
            return "M " + x1 + " " + y1 + " C " + (x1 + x2) / 2 + " " + y1 + " " + (x1 + x2) / 2 + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "right") {
            var outDir = x1 + Math.abs(x1 - x2) / 2;
            var inDir = x2 - Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "left") {
            var outDir = x1 - Math.abs(x1 - x2) / 2;
            var inDir = x2 + Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
    };
    Workflow.prototype.draw = function (model) {
        var _this = this;
        if (model === void 0) { model = this.model; }
        // We will need to restore the transformations when we redraw the model, so save the current state
        var oldTransform = this.workflow.getAttribute("transform");
        var modelChanged = this.model !== model;
        if (modelChanged || this.pendingFirstDraw) {
            this.pendingFirstDraw = false;
            this.model = model;
            var stepChangeDisposer_1 = this.model.on("step.change", this.onStepChange.bind(this));
            var stepCreateDisposer_1 = this.model.on("step.create", this.onStepCreate.bind(this));
            var stepRemoveDisposer_1 = this.model.on("step.remove", this.onStepRemove.bind(this));
            var inputCreateDisposer_1 = this.model.on("input.create", this.onInputCreate.bind(this));
            var inputRemoveDisposer_1 = this.model.on("input.remove", this.onInputRemove.bind(this));
            var outputCreateDisposer_1 = this.model.on("output.create", this.onOutputCreate.bind(this));
            var outputRemoveDisposer_1 = this.model.on("output.remove", this.onOutputRemove.bind(this));
            var stepInPortShowDisposer_1 = this.model.on("step.inPort.show", this.onInputPortShow.bind(this));
            var stepInPortHideDisposer_1 = this.model.on("step.inPort.hide", this.onInputPortHide.bind(this));
            var connectionCreateDisposer_1 = this.model.on("connection.create", this.onConnectionCreate.bind(this));
            var connectionRemoveDisposer_1 = this.model.on("connection.remove", this.onConnectionRemove.bind(this));
            var stepOutPortCreateDisposer_1 = this.model.on("step.outPort.create", this.onOutputPortCreate.bind(this));
            var stepOutPortRemoveDisposer_1 = this.model.on("step.outPort.remove", this.onOutputPortRemove.bind(this));
            this.disposers.push(function () {
                stepChangeDisposer_1.dispose();
                stepCreateDisposer_1.dispose();
                stepRemoveDisposer_1.dispose();
                inputCreateDisposer_1.dispose();
                inputRemoveDisposer_1.dispose();
                outputCreateDisposer_1.dispose();
                outputRemoveDisposer_1.dispose();
                stepInPortShowDisposer_1.dispose();
                stepInPortHideDisposer_1.dispose();
                connectionCreateDisposer_1.dispose();
                connectionRemoveDisposer_1.dispose();
                stepOutPortCreateDisposer_1.dispose();
                stepOutPortRemoveDisposer_1.dispose();
            });
            this.invokePlugins("afterModelChange");
        }
        this.clearCanvas();
        var nodes = __spread(this.model.steps, this.model.inputs, this.model.outputs).filter(function (n) { return n.isVisible; });
        /**
         * If there is a missing sbg:x or sbg:y property on any node model,
         * graph should be arranged to avoid random placement.
         */
        var arrangeNecessary = false;
        var nodeTemplate = "";
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                var patched = graph_node_1.GraphNode.patchModelPorts(node);
                var missingX = isNaN(parseInt(patched.customProps["sbg:x"]));
                var missingY = isNaN(parseInt(patched.customProps["sbg:y"]));
                if (missingX || missingY) {
                    arrangeNecessary = true;
                }
                nodeTemplate += graph_node_1.GraphNode.makeTemplate(patched);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.workflow.innerHTML += nodeTemplate;
        this.redrawEdges();
        Array.from(this.workflow.querySelectorAll(".node")).forEach(function (e) {
            _this.workflow.appendChild(e);
        });
        this.addEventListeners();
        this.workflow.setAttribute("transform", oldTransform);
        this.scaleAtPoint(this.scale);
        this.invokePlugins("afterRender");
        var e_1, _a;
    };
    Workflow.prototype.findParent = function (el, parentClass) {
        if (parentClass === void 0) { parentClass = "node"; }
        var parentNode = el;
        while (parentNode) {
            if (parentNode.classList.contains(parentClass)) {
                return parentNode;
            }
            parentNode = parentNode.parentElement;
        }
    };
    /**
     * Retrieves a plugin instance
     * @param {{new(...args: any[]) => T}} plugin
     * @returns {T}
     */
    Workflow.prototype.getPlugin = function (plugin) {
        return this.plugins.find(function (p) { return p instanceof plugin; });
    };
    Workflow.prototype.on = function (event, handler) {
        this.eventHub.on(event, handler);
    };
    Workflow.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    /**
     * Scales the workflow to fit the available viewport
     */
    Workflow.prototype.fitToViewport = function (ignoreScaleLimits) {
        if (ignoreScaleLimits === void 0) { ignoreScaleLimits = false; }
        this.scaleAtPoint(1);
        Object.assign(this.workflow.transform.baseVal.getItem(0).matrix, {
            e: 0,
            f: 0
        });
        var clientBounds = this.svgRoot.getBoundingClientRect();
        var wfBounds = this.workflow.getBoundingClientRect();
        var padding = 100;
        if (clientBounds.width === 0 || clientBounds.height === 0) {
            throw new Error("Cannot fit workflow to the area that has no visible viewport.");
        }
        var verticalScale = (wfBounds.height) / (clientBounds.height - padding);
        var horizontalScale = (wfBounds.width) / (clientBounds.width - padding);
        var scaleFactor = Math.max(verticalScale, horizontalScale);
        // Cap the upscaling to 1, we don't want to zoom in workflows that would fit anyway
        var newScale = Math.min(this.scale / scaleFactor, 1);
        if (!ignoreScaleLimits) {
            newScale = Math.max(newScale, this.minScale);
        }
        this.scaleAtPoint(newScale);
        var scaledWFBounds = this.workflow.getBoundingClientRect();
        var moveY = clientBounds.top - scaledWFBounds.top + Math.abs(clientBounds.height - scaledWFBounds.height) / 2;
        var moveX = clientBounds.left - scaledWFBounds.left + Math.abs(clientBounds.width - scaledWFBounds.width) / 2;
        var matrix = this.workflow.transform.baseVal.getItem(0).matrix;
        matrix.e += moveX;
        matrix.f += moveY;
    };
    Workflow.prototype.redrawEdges = function () {
        var _this = this;
        var highlightedEdges = new Set();
        Array.from(this.workflow.querySelectorAll(".edge")).forEach(function (el) {
            if (el.classList.contains("highlighted")) {
                var edgeID = el.attributes["data-source-connection"].value + el.attributes["data-destination-connection"].value;
                highlightedEdges.add(edgeID);
            }
            el.remove();
        });
        var edgesTpl = this.model.connections
            .map(function (c) {
            var edgeId = c.source.id + c.destination.id;
            var edgeStates = highlightedEdges.has(edgeId) ? "highlighted" : "";
            return edge_1.Edge.makeTemplate(c, _this.workflow, edgeStates);
        })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        this.workflow.innerHTML = edgesTpl + this.workflow.innerHTML;
    };
    /**
     * Scale the workflow by the scaleCoefficient (not compounded) over given coordinates
     */
    Workflow.prototype.scaleAtPoint = function (scale, x, y) {
        if (scale === void 0) { scale = 1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._scale = scale;
        this.labelScale = 1 + (1 - this._scale) / (this._scale * 2);
        var transform = this.workflow.transform.baseVal;
        var matrix = transform.getItem(0).matrix;
        var coords = this.transformScreenCTMtoCanvas(x, y);
        matrix.e += matrix.a * coords.x;
        matrix.f += matrix.a * coords.y;
        matrix.a = matrix.d = scale;
        matrix.e -= scale * coords.x;
        matrix.f -= scale * coords.y;
        var nodeLabels = this.workflow.querySelectorAll(".node .label");
        try {
            for (var nodeLabels_1 = __values(nodeLabels), nodeLabels_1_1 = nodeLabels_1.next(); !nodeLabels_1_1.done; nodeLabels_1_1 = nodeLabels_1.next()) {
                var el = nodeLabels_1_1.value;
                var matrix_1 = el.transform.baseVal.getItem(0).matrix;
                Object.assign(matrix_1, {
                    a: this.labelScale,
                    d: this.labelScale
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (nodeLabels_1_1 && !nodeLabels_1_1.done && (_a = nodeLabels_1.return)) _a.call(nodeLabels_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    Workflow.prototype.transformScreenCTMtoCanvas = function (x, y) {
        var svg = this.svgRoot;
        var ctm = this.workflow.getScreenCTM();
        var point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        var t = point.matrixTransform(ctm.inverse());
        return {
            x: t.x,
            y: t.y
        };
    };
    Workflow.prototype.enableEditing = function (enabled) {
        this.invokePlugins("onEditableStateChange", enabled);
        this.editingEnabled = enabled;
    };
    // noinspection JSUnusedGlobalSymbols
    Workflow.prototype.destroy = function () {
        this.svgRoot.classList.remove(this.svgID);
        this.clearCanvas();
        this.eventHub.empty();
        this.invokePlugins("destroy");
        try {
            for (var _a = __values(this.disposers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var dispose = _b.value;
                dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _c;
    };
    Workflow.prototype.resetTransform = function () {
        this.workflow.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        this.scaleAtPoint();
    };
    Workflow.prototype.addEventListeners = function () {
        var _this = this;
        /**
         * Attach canvas panning
         */
        {
            var pane_1;
            var x_1;
            var y_1;
            var matrix_2;
            this.domEvents.drag(".pan-handle", function (dx, dy) {
                matrix_2.e = x_1 + dx;
                matrix_2.f = y_1 + dy;
            }, function (ev, el, root) {
                pane_1 = root.querySelector(".workflow");
                matrix_2 = pane_1.transform.baseVal.getItem(0).matrix;
                x_1 = matrix_2.e;
                y_1 = matrix_2.f;
            }, function () {
                pane_1 = undefined;
                matrix_2 = undefined;
            });
        }
        /**
         * On mouse over node, bring it to the front
         */
        this.domEvents.on("mouseover", ".node", function (ev, target, root) {
            if (_this.workflow.querySelector(".edge.dragged")) {
                return;
            }
            target.parentElement.appendChild(target);
        });
    };
    Workflow.prototype.clearCanvas = function () {
        this.domEvents.detachAll();
        this.workflow.innerHTML = "";
        this.workflow.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        this.workflow.setAttribute("class", "workflow");
    };
    Workflow.prototype.hookPlugins = function () {
        var _this = this;
        this.plugins.forEach(function (plugin) {
            plugin.registerOnBeforeChange(function (event) {
                _this.eventHub.emit("beforeChange", event);
            });
            plugin.registerOnAfterChange(function (event) {
                _this.eventHub.emit("afterChange", event);
            });
            plugin.registerOnAfterRender(function (event) {
                _this.eventHub.emit("afterRender", event);
            });
        });
    };
    Workflow.prototype.invokePlugins = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.plugins.forEach(function (plugin) {
            if (typeof plugin[methodName] === "function") {
                plugin[methodName].apply(plugin, __spread(args));
            }
        });
    };
    /**
     * Listener for “connection.create” event on model that renders new edges on canvas
     */
    Workflow.prototype.onConnectionCreate = function (source, destination) {
        if (!source.isVisible || !destination.isVisible) {
            return;
        }
        var sourceID = source.connectionId;
        var destinationID = destination.connectionId;
        edge_1.Edge.spawnBetweenConnectionIDs(this.workflow, sourceID, destinationID);
    };
    /**
     * Listener for "connection.remove" event on the model that disconnects nodes
     */
    Workflow.prototype.onConnectionRemove = function (source, destination) {
        if (!source.isVisible || !destination.isVisible) {
            return;
        }
        var sourceID = source.connectionId;
        var destinationID = destination.connectionId;
        var edge = this.svgRoot.querySelector(".edge[data-source-connection=\"" + sourceID + "\"][data-destination-connection=\"" + destinationID + "\"");
        edge.remove();
    };
    /**
     * Listener for “input.create” event on model that renders workflow inputs
     */
    Workflow.prototype.onInputCreate = function (input) {
        if (!input.isVisible) {
            return;
        }
        var patched = graph_node_1.GraphNode.patchModelPorts(input);
        var graphTemplate = graph_node_1.GraphNode.makeTemplate(patched, this.labelScale);
        var el = template_parser_1.TemplateParser.parse(graphTemplate);
        this.workflow.appendChild(el);
    };
    /**
     * Listener for “output.create” event on model that renders workflow outputs
     */
    Workflow.prototype.onOutputCreate = function (output) {
        if (!output.isVisible) {
            return;
        }
        var patched = graph_node_1.GraphNode.patchModelPorts(output);
        var graphTemplate = graph_node_1.GraphNode.makeTemplate(patched, this.labelScale);
        var el = template_parser_1.TemplateParser.parse(graphTemplate);
        this.workflow.appendChild(el);
    };
    Workflow.prototype.onStepCreate = function (step) {
        // if the step doesn't have x & y coordinates, check if they are in the run property
        if (!step.customProps["sbg:x"] && step.run.customProps && step.run.customProps["sbg:x"]) {
            Object.assign(step.customProps, {
                "sbg:x": step.run.customProps["sbg:x"],
                "sbg:y": step.run.customProps["sbg:y"]
            });
            // remove them from the run property once finished
            delete step.run.customProps["sbg:x"];
            delete step.run.customProps["sbg:y"];
        }
        var template = graph_node_1.GraphNode.makeTemplate(step, this.labelScale);
        var element = template_parser_1.TemplateParser.parse(template);
        this.workflow.appendChild(element);
    };
    Workflow.prototype.onStepChange = function (change) {
        var title = this.workflow.querySelector(".step[data-id=\"" + change.connectionId + "\"] .title");
        if (title) {
            title.textContent = change.label;
        }
    };
    Workflow.prototype.onInputPortShow = function (input) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + input.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, input.parentStep).update();
    };
    Workflow.prototype.onInputPortHide = function (input) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + input.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, input.parentStep).update();
    };
    Workflow.prototype.onOutputPortCreate = function (output) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + output.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, output.parentStep).update();
    };
    Workflow.prototype.onOutputPortRemove = function (output) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + output.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, output.parentStep).update();
    };
    /**
     * Listener for "step.remove" event on model which removes steps
     */
    Workflow.prototype.onStepRemove = function (step) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + step.connectionId + "\"]");
        stepEl.remove();
    };
    /**
     * Listener for "input.remove" event on model which removes inputs
     */
    Workflow.prototype.onInputRemove = function (input) {
        if (!input.isVisible)
            return;
        var inputEl = this.svgRoot.querySelector(".node.input[data-connection-id=\"" + input.connectionId + "\"]");
        inputEl.remove();
    };
    /**
     * Listener for "output.remove" event on model which removes outputs
     */
    Workflow.prototype.onOutputRemove = function (output) {
        if (!output.isVisible)
            return;
        var outputEl = this.svgRoot.querySelector(".node.output[data-connection-id=\"" + output.connectionId + "\"]");
        outputEl.remove();
    };
    Workflow.prototype.makeID = function (length) {
        if (length === void 0) { length = 6; }
        var output = "";
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < length; i++) {
            output += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return output;
    };
    return Workflow;
}());
exports.Workflow = Workflow;
//# sourceMappingURL=workflow.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geometry_1 = __webpack_require__(52);
var io_port_1 = __webpack_require__(53);
var workflow_1 = __webpack_require__(37);
var Edge = /** @class */ (function () {
    function Edge() {
    }
    Edge.makeTemplate = function (edge, containerNode, connectionStates) {
        if (!edge.isVisible || edge.source.type === "Step" || edge.destination.type === "Step") {
            return "";
        }
        var _a = __read(edge.source.id.split("/"), 3), sourceSide = _a[0], sourceStepId = _a[1], sourcePort = _a[2];
        var _b = __read(edge.destination.id.split("/"), 3), destSide = _b[0], destStepId = _b[1], destPort = _b[2];
        var sourceVertex = containerNode.querySelector(".node[data-id=\"" + sourceStepId + "\"] .output-port[data-port-id=\"" + sourcePort + "\"] .io-port");
        var destVertex = containerNode.querySelector(".node[data-id=\"" + destStepId + "\"] .input-port[data-port-id=\"" + destPort + "\"] .io-port");
        if (edge.source.type === edge.destination.type) {
            console.error("Can't update edge between nodes of the same type.", edge);
            return;
        }
        if (!sourceVertex) {
            console.error("Source vertex not found for edge " + edge.source.id, edge);
            return;
        }
        if (!destVertex) {
            console.error("Destination vertex not found for edge " + edge.destination.id, edge);
            return;
        }
        var sourceCTM = sourceVertex.getCTM();
        var destCTM = destVertex.getCTM();
        var wfMatrix = containerNode.transform.baseVal[0].matrix;
        var pathStr = workflow_1.Workflow.makeConnectionPath((sourceCTM.e - wfMatrix.e) / sourceCTM.a, (sourceCTM.f - wfMatrix.f) / sourceCTM.a, (destCTM.e - wfMatrix.e) / sourceCTM.a, (destCTM.f - wfMatrix.f) / sourceCTM.a);
        return "\n            <g tabindex=\"-1\" class=\"edge " + connectionStates + "\"\n               data-source-port=\"" + sourcePort + "\"\n               data-destination-port=\"" + destPort + "\"\n               data-source-node=\"" + sourceStepId + "\"\n               data-source-connection=\"" + edge.source.id + "\"\n               data-destination-connection=\"" + edge.destination.id + "\"\n               data-destination-node=\"" + destStepId + "\">\n                <path class=\"sub-edge outer\" d=\"" + pathStr + "\"></path>\n                <path class=\"sub-edge inner\" d=\"" + pathStr + "\"></path>\n            </g>\n        ";
    };
    Edge.spawn = function (pathStr, connectionIDs) {
        if (pathStr === void 0) { pathStr = ""; }
        if (connectionIDs === void 0) { connectionIDs = {}; }
        var ns = "http://www.w3.org/2000/svg";
        var edge = document.createElementNS(ns, "g");
        var _a = __read((connectionIDs.source || "//").split("/"), 3), sourceSide = _a[0], sourceStepId = _a[1], sourcePort = _a[2];
        var _b = __read((connectionIDs.destination || "//").split("/"), 3), destSide = _b[0], destStepId = _b[1], destPort = _b[2];
        edge.classList.add("edge");
        if (sourceStepId) {
            edge.classList.add(sourceStepId);
        }
        if (destStepId) {
            edge.classList.add(destStepId);
        }
        edge.setAttribute("tabindex", "-1");
        edge.setAttribute("data-destination-node", destStepId);
        edge.setAttribute("data-destination-port", destPort);
        edge.setAttribute("data-source-port", sourcePort);
        edge.setAttribute("data-source-node", sourceStepId);
        edge.setAttribute("data-source-connection", connectionIDs.source);
        edge.setAttribute("data-destination-connection", connectionIDs.destination);
        edge.innerHTML = "\n            <path class=\"sub-edge outer\" d=\"" + pathStr + "\"></path>\n            <path class=\"sub-edge inner\" d=\"" + pathStr + "\"></path>\n        ";
        return edge;
    };
    Edge.spawnBetweenConnectionIDs = function (root, source, destination) {
        if (source.startsWith("in")) {
            var tmp = source;
            source = destination;
            destination = tmp;
        }
        var sourceNode = root.querySelector(".port[data-connection-id=\"" + source + "\"]");
        var destinationNode = root.querySelector(".port[data-connection-id=\"" + destination + "\"]");
        var sourceCTM = geometry_1.Geometry.getTransformToElement(sourceNode, root);
        var destCTM = geometry_1.Geometry.getTransformToElement(destinationNode, root);
        var path = io_port_1.IOPort.makeConnectionPath(sourceCTM.e, sourceCTM.f, destCTM.e, destCTM.f);
        // If there is already a connection between these ports, update that one instead
        var existingEdge = root.querySelector(".edge[data-source-connection=\"" + source + "\"][data-destination-connection=\"" + destination + "\"]");
        if (existingEdge) {
            console.log("Updating existing edge");
            try {
                for (var _a = __values(existingEdge.querySelectorAll(".sub-edge")), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var sub = _b.value;
                    sub.setAttribute("d", path);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return existingEdge;
        }
        var edge = Edge.spawn(path, {
            source: source,
            destination: destination
        });
        var firstNode = root.querySelector(".node");
        root.insertBefore(edge, firstNode);
        return edge;
        var e_1, _c;
    };
    ;
    Edge.findEdge = function (root, sourceConnectionID, destinationConnectionID) {
        return root.querySelector("[data-source-connection=\"" + sourceConnectionID + "\"][data-destination-connection=\"" + destinationConnectionID + "\"]");
    };
    Edge.parseConnectionID = function (cid) {
        var _a = __read((cid || "//").split("/"), 3), side = _a[0], stepID = _a[1], portID = _a[2];
        return { side: side, stepID: stepID, portID: portID };
    };
    return Edge;
}());
exports.Edge = Edge;
//# sourceMappingURL=edge.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SelectionPlugin = /** @class */ (function (_super) {
    __extends(SelectionPlugin, _super);
    function SelectionPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selection = new Map();
        _this.cleanups = [];
        _this.selectionChangeCallbacks = [];
        _this.css = {
            selected: "__selection-plugin-selected",
            highlight: "__selection-plugin-highlight",
            fade: "__selection-plugin-fade",
            plugin: "__plugin-selection"
        };
        return _this;
    }
    SelectionPlugin.prototype.registerWorkflow = function (workflow) {
        var _this = this;
        _super.prototype.registerWorkflow.call(this, workflow);
        this.svg = this.workflow.svgRoot;
        this.svg.classList.add(this.css.plugin);
        var clickListener = this.onClick.bind(this);
        this.svg.addEventListener("click", clickListener);
        this.cleanups.push(function () { return _this.svg.removeEventListener("click", clickListener); });
    };
    SelectionPlugin.prototype.afterRender = function () {
        this.restoreSelection();
    };
    SelectionPlugin.prototype.afterModelChange = function () {
        if (typeof this.detachModelEvents === "function") {
            this.detachModelEvents();
        }
        this.detachModelEvents = this.bindModelEvents();
    };
    SelectionPlugin.prototype.destroy = function () {
        this.detachModelEvents();
        this.detachModelEvents = undefined;
        this.svg.classList.remove(this.css.plugin);
        try {
            for (var _a = __values(this.cleanups), _b = _a.next(); !_b.done; _b = _a.next()) {
                var fn = _b.value;
                fn();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SelectionPlugin.prototype.clearSelection = function () {
        var selection = this.svg.querySelectorAll("." + this.css.selected);
        var highlights = this.svg.querySelectorAll("." + this.css.highlight);
        try {
            for (var selection_1 = __values(selection), selection_1_1 = selection_1.next(); !selection_1_1.done; selection_1_1 = selection_1.next()) {
                var el = selection_1_1.value;
                el.classList.remove(this.css.selected);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (selection_1_1 && !selection_1_1.done && (_a = selection_1.return)) _a.call(selection_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var highlights_1 = __values(highlights), highlights_1_1 = highlights_1.next(); !highlights_1_1.done; highlights_1_1 = highlights_1.next()) {
                var el = highlights_1_1.value;
                el.classList.remove(this.css.highlight);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (highlights_1_1 && !highlights_1_1.done && (_b = highlights_1.return)) _b.call(highlights_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.svg.classList.remove(this.css.fade);
        this.selection.clear();
        this.emitChange(null);
        var e_2, _a, e_3, _b;
    };
    SelectionPlugin.prototype.getSelection = function () {
        return this.selection;
    };
    SelectionPlugin.prototype.registerOnSelectionChange = function (fn) {
        this.selectionChangeCallbacks.push(fn);
    };
    SelectionPlugin.prototype.selectStep = function (stepID) {
        var query = "[data-connection-id=\"" + stepID + "\"]";
        var el = this.svg.querySelector(query);
        if (el) {
            this.materializeClickOnElement(el);
        }
    };
    SelectionPlugin.prototype.bindModelEvents = function () {
        var _this = this;
        var handler = function () { return _this.restoreSelection(); };
        var cleanup = [];
        var events = ["connection.create", "connection.remove"];
        var _loop_1 = function (ev) {
            var dispose = this_1.workflow.model.on(ev, handler);
            cleanup.push(function () { return dispose.dispose(); });
        };
        var this_1 = this;
        try {
            for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                var ev = events_1_1.value;
                _loop_1(ev);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return function () { return cleanup.forEach(function (fn) { return fn(); }); };
        var e_4, _a;
    };
    SelectionPlugin.prototype.restoreSelection = function () {
        var _this = this;
        this.selection.forEach(function (type, connectionID) {
            if (type === "node") {
                var el = _this.svg.querySelector("[data-connection-id=\"" + connectionID + "\"]");
                if (el) {
                    _this.selectNode(el);
                }
            }
            else if (type === "edge") {
                var _a = __read(connectionID.split(SelectionPlugin.edgePortsDelimiter), 2), sID = _a[0], dID = _a[1];
                var edgeSelector = "[data-source-connection=\"" + sID + "\"][data-destination-connection=\"" + dID + "\"]";
                var edge = _this.svg.querySelector(edgeSelector);
                if (edge) {
                    _this.selectEdge(edge);
                }
            }
        });
    };
    SelectionPlugin.prototype.onClick = function (click) {
        var target = click.target;
        this.clearSelection();
        this.materializeClickOnElement(target);
    };
    SelectionPlugin.prototype.materializeClickOnElement = function (target) {
        var element;
        if (element = this.workflow.findParent(target, "node")) {
            this.selectNode(element);
            this.selection.set(element.getAttribute("data-connection-id"), "node");
            this.emitChange(element);
        }
        else if (element = this.workflow.findParent(target, "edge")) {
            this.selectEdge(element);
            var cid = [
                element.getAttribute("data-source-connection"),
                SelectionPlugin.edgePortsDelimiter,
                element.getAttribute("data-destination-connection")
            ].join("");
            this.selection.set(cid, "edge");
            this.emitChange(cid);
        }
    };
    SelectionPlugin.prototype.selectNode = function (element) {
        // Fade everything on canvas so we can highlight only selected stuff
        this.svg.classList.add(this.css.fade);
        // Mark this node as selected
        element.classList.add(this.css.selected);
        // Highlight it in case there are no edges on the graph
        element.classList.add(this.css.highlight);
        // Take all adjacent edges since we should highlight them and move them above the other edges
        var nodeID = element.getAttribute("data-id");
        var adjacentEdges = this.svg.querySelectorAll(".edge[data-source-node=\"" + nodeID + "\"]," +
            (".edge[data-destination-node=\"" + nodeID + "\""));
        // Find the first node to be an anchor, so we can put all those edges just before that one.
        var firstNode = this.svg.getElementsByClassName("node")[0];
        try {
            for (var adjacentEdges_1 = __values(adjacentEdges), adjacentEdges_1_1 = adjacentEdges_1.next(); !adjacentEdges_1_1.done; adjacentEdges_1_1 = adjacentEdges_1.next()) {
                var edge = adjacentEdges_1_1.value;
                // Highlight each adjacent edge
                edge.classList.add(this.css.highlight);
                // Move it above other edges
                this.workflow.workflow.insertBefore(edge, firstNode);
                // Find all adjacent nodes so we can highlight them
                var sourceNodeID = edge.getAttribute("data-source-node");
                var destinationNodeID = edge.getAttribute("data-destination-node");
                var connectedNodes = this.svg.querySelectorAll(".node[data-id=\"" + sourceNodeID + "\"]," +
                    (".node[data-id=\"" + destinationNodeID + "\"]"));
                try {
                    // Highlight each adjacent node
                    for (var connectedNodes_1 = __values(connectedNodes), connectedNodes_1_1 = connectedNodes_1.next(); !connectedNodes_1_1.done; connectedNodes_1_1 = connectedNodes_1.next()) {
                        var n = connectedNodes_1_1.value;
                        n.classList.add(this.css.highlight);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (connectedNodes_1_1 && !connectedNodes_1_1.done && (_a = connectedNodes_1.return)) _a.call(connectedNodes_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (adjacentEdges_1_1 && !adjacentEdges_1_1.done && (_b = adjacentEdges_1.return)) _b.call(adjacentEdges_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        var e_6, _b, e_5, _a;
    };
    SelectionPlugin.prototype.selectEdge = function (element) {
        element.classList.add(this.css.highlight);
        element.classList.add(this.css.selected);
        var sourceNode = element.getAttribute("data-source-node");
        var destNode = element.getAttribute("data-destination-node");
        var sourcePort = element.getAttribute("data-source-port");
        var destPort = element.getAttribute("data-destination-port");
        var inputPortSelector = ".node[data-id=\"" + destNode + "\"] .input-port[data-port-id=\"" + destPort + "\"]";
        var outputPortSelector = ".node[data-id=\"" + sourceNode + "\"] .output-port[data-port-id=\"" + sourcePort + "\"]";
        var connectedPorts = this.svg.querySelectorAll(inputPortSelector + ", " + outputPortSelector);
        try {
            for (var connectedPorts_1 = __values(connectedPorts), connectedPorts_1_1 = connectedPorts_1.next(); !connectedPorts_1_1.done; connectedPorts_1_1 = connectedPorts_1.next()) {
                var port = connectedPorts_1_1.value;
                port.classList.add(this.css.highlight);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (connectedPorts_1_1 && !connectedPorts_1_1.done && (_a = connectedPorts_1.return)) _a.call(connectedPorts_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var e_7, _a;
    };
    SelectionPlugin.prototype.emitChange = function (change) {
        try {
            for (var _a = __values(this.selectionChangeCallbacks), _b = _a.next(); !_b.done; _b = _a.next()) {
                var fn = _b.value;
                fn(change);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var e_8, _c;
    };
    SelectionPlugin.edgePortsDelimiter = "$!$";
    return SelectionPlugin;
}(plugin_base_1.PluginBase));
exports.SelectionPlugin = SelectionPlugin;
//# sourceMappingURL=selection.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventHub = /** @class */ (function () {
    function EventHub(validEventList) {
        this.handlers = validEventList.reduce(function (acc, ev) {
            return Object.assign(acc, (_a = {}, _a[ev] = [], _a));
            var _a;
        }, {});
    }
    EventHub.prototype.on = function (event, handler) {
        var _this = this;
        this.guard(event, "subscribe to");
        this.handlers[event].push(handler);
        return function () { return _this.off(event, handler); };
    };
    EventHub.prototype.off = function (event, handler) {
        this.guard(event, "unsubscribe from");
        return this.handlers[event].splice(this.handlers[event].findIndex(function (h) { return handler === h; }), 1);
    };
    EventHub.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.guard(event, "emit");
        for (var i = 0; i < this.handlers[event].length; i++) {
            (_a = this.handlers[event])[i].apply(_a, data);
        }
        var _a;
    };
    EventHub.prototype.empty = function () {
        for (var event_1 in this.handlers) {
            this.handlers[event_1] = [];
        }
    };
    EventHub.prototype.guard = function (event, verb) {
        if (!this.handlers[event]) {
            throw new Error("Cannot " + verb + " a non-supported event \u201C" + event + "\u201D. \n            Supported events are: " + Object.keys(this.handlers).join(", ") + "\u201D");
        }
    };
    return EventHub;
}());
exports.EventHub = EventHub;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = __webpack_require__(1);
var VertexMissing;
(function (VertexMissing) {
    VertexMissing[VertexMissing["CreateVertex"] = 0] = "CreateVertex";
    VertexMissing[VertexMissing["IgnoreEdge"] = 1] = "IgnoreEdge";
    VertexMissing[VertexMissing["AddEdge"] = 2] = "AddEdge";
    VertexMissing[VertexMissing["Error"] = 3] = "Error";
})(VertexMissing = exports.VertexMissing || (exports.VertexMissing = {}));
var Graph = /** @class */ (function () {
    function Graph(vertices, edges, missing) {
        if (missing === void 0) { missing = VertexMissing.Error; }
        this.vertices = new Map(vertices);
        this.edges = new Set();
        if (edges) {
            for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
                var item = _a[_i];
                this.addEdge({ id: item[0] }, { id: item[1] }, true, true, missing);
            }
        }
    }
    Graph.prototype.addVertex = function (key, data, onConflict) {
        if (data === void 0) { data = null; }
        if (this.hasVertex(key)) {
            if (onConflict) {
                data = onConflict(this.vertices.get(key));
            }
            else {
                throw (new ErrorCode_1.ValidityError("Vertex '" + key + "' already exists", ErrorCode_1.ErrorCode.ID_DUPLICATE));
            }
        }
        else {
            this.vertices.set(key, data);
        }
    };
    Graph.prototype.setVertexData = function (key, data) {
        if (data === void 0) { data = null; }
        this.throwMissingVertex(key);
        this.vertices.set(key, data);
    };
    Graph.prototype.getVertexData = function (key) {
        return this.vertices.get(key);
    };
    Graph.prototype.hasVertex = function (key) {
        return this.vertices.has(key);
    };
    Graph.prototype.removeVertex = function (key) {
        return this.vertices.delete(key);
    };
    Graph.prototype.addEdge = function (source, destination, isVisible, isValid, missing) {
        if (isVisible === void 0) { isVisible = true; }
        if (isValid === void 0) { isValid = true; }
        if (missing === void 0) { missing = VertexMissing.Error; }
        switch (missing) {
            case VertexMissing.Error:
                this.throwMissingVertex(source.id);
                this.throwMissingVertex(destination.id);
                break;
            case VertexMissing.CreateVertex:
                this.addVertex(source.id, null, function (old) {
                    return old;
                });
                this.addVertex(destination.id, null, function (old) {
                    return old;
                });
                break;
            case VertexMissing.IgnoreEdge:
                if (!(this.hasVertex(source.id) && this.hasVertex(destination.id))) {
                    return;
                }
                break;
        }
        this.edges.add({
            source: source, destination: destination, isVisible: isVisible, isValid: isValid
        });
    };
    Graph.prototype.removeEdge = function (edge) {
        if (Array.isArray(edge)) {
            edge = {
                source: { id: edge[0] },
                destination: { id: edge[1] }
            };
        }
        return this.edges.delete(Array.from(this.edges.values()).find(function (e) {
            return e.source.id === edge.source.id && e.destination.id === edge.destination.id;
        }));
    };
    Graph.prototype.topSort = function () {
        var _this = this;
        if (!this.isConnected()) {
            throw ("Can't sort unconnected graph");
        }
        if (this.vertices.size == 0) {
            return [];
        }
        if (this.vertices.size == 1) {
            return [this.vertices.keys().next().value];
        }
        // initialize set of all nodes
        var topNodesInit = new Set(this.vertices.keys());
        // initialize set of all edges
        var unusedEdges = new Set(this.edges.values());
        var sorted = [];
        // go through edges, remove nodes which are destinations (meaning they have incoming connections)
        // for (let e of Array.from(unusedEdges)) {
        //     topNodesInit.delete(e.destination.id);
        // }
        unusedEdges.forEach(function (e) {
            topNodesInit.delete(e.destination.id);
        });
        // create an array of strings from first nodes
        var topNodes = Array.from(topNodesInit);
        var _loop_1 = function () {
            // remove node from list and add it to sorted nodes
            var n = topNodes.shift();
            sorted.push(n);
            // for each remaining edge check if it originates from this starting node
            unusedEdges.forEach(function (e) {
                if (e.source.id == n) {
                    // delete the edge as used
                    unusedEdges.delete(e);
                    // if the destination node of this edge has no other sources
                    // (no edges contain it as a destination)
                    if (!_this.hasIncoming(e.destination.id, unusedEdges)) {
                        // add it as a new starting node
                        topNodes.push(e.destination.id);
                    }
                }
            });
        };
        // for each of the first nodes, go through tree
        while (topNodes.length > 0) {
            _loop_1();
        }
        // leftover edges are back-edges indicating cycles
        if (unusedEdges.size > 0) {
            throw new Error("Graph has cycles");
        }
        return sorted;
    };
    Graph.prototype.hasOutgoing = function (vertex, edges) {
        if (edges === void 0) { edges = this.edges; }
        for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.source.id === vertex) {
                return true;
            }
        }
        return false;
    };
    Graph.prototype.hasIncoming = function (vertex, edges) {
        if (edges === void 0) { edges = this.edges; }
        for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.destination.id == vertex) {
                return true;
            }
        }
        return false;
    };
    Graph.prototype.isConnected = function () {
        if (this.vertices.size == 0 || this.vertices.size == 1) {
            return true;
        }
        if (this.edges.size == 0) {
            return false;
        }
        var unvisited = new Set(this.vertices.keys());
        var starter = unvisited.values().next().value;
        unvisited.delete(starter);
        var unusedEdges = new Set(this.edges);
        return this.connectedIter(unvisited, unusedEdges, [starter]);
    };
    Graph.prototype.connectedIter = function (unvisited, unusedEdges, toExpand) {
        var reached = new Set();
        for (var _i = 0, toExpand_1 = toExpand; _i < toExpand_1.length; _i++) {
            var node = toExpand_1[_i];
            for (var _a = 0, _b = this.reached(unusedEdges, node); _a < _b.length; _a++) {
                var r = _b[_a];
                reached.add(r);
            }
        }
        for (var _c = 0, _d = Array.from(reached); _c < _d.length; _c++) {
            var item = _d[_c];
            var existing = unvisited.delete(item);
            if (!existing) {
                reached.delete(item);
            }
        }
        if (unvisited.size == 0) {
            return true;
        }
        if (reached.size == 0) {
            // console.log("Unreached nodes", Array.from(unvisited));
            return false;
        }
        return this.connectedIter(unvisited, unusedEdges, Array.from(reached));
    };
    Graph.prototype.reached = function (unusedEdges, from) {
        var reached = new Set();
        for (var _i = 0, _a = Array.from(unusedEdges); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.source.id == from) {
                reached.add(item.destination.id);
                unusedEdges.delete(item);
            }
            else if (item.destination.id == from) {
                reached.add(item.source.id);
                unusedEdges.delete(item);
            }
        }
        return Array.from(reached);
    };
    Graph.prototype.hasCycles = function () {
        if (this.vertices.size == 0) {
            return false;
        }
        if (this.edges.size == 0) {
            return false;
        }
        try {
            this.topSort();
            return false;
        }
        catch (ex) {
            return ex.message === "Graph has cycles";
        }
    };
    Graph.prototype.throwMissingVertex = function (key) {
        if (!this.hasVertex(key)) {
            throw new Error("Vertex '" + key + "' doesn't exist");
        }
    };
    return Graph;
}());
exports.Graph = Graph;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowOutputParameterModel_1 = __webpack_require__(16);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(V1WorkflowOutputParameterModel, _super);
    function V1WorkflowOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1WorkflowOutputParameterModel.prototype.deserialize = function (output) {
        var _this = this;
        var serializedKeys = ["id", "name", "outputSource", "type", "label", "doc", "sbg:fileTypes"];
        //@todo deserialization of outputBinding, streamable, linkMerge, secondaryFiles
        this.isField = !!output.name; // record fields don't have ids
        this.isField ? serializedKeys.push("name") : serializedKeys.push("id");
        if (this.isField) {
            this.id = output.name;
        }
        else {
            this.id = output.id;
        }
        if (!this.isField) {
            this.source = utils_1.ensureArray(output.outputSource);
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(output.type, V1WorkflowOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        this._label = output.label;
        this.description = utils_1.ensureArray(output.doc).join("\n\n");
        if (!this.isField) {
            this.fileTypes = utils_1.commaSeparatedToArray(output["sbg:fileTypes"]);
        }
        utils_1.spreadSelectProps(output, this.customProps, serializedKeys);
    };
    V1WorkflowOutputParameterModel.prototype.serialize = function () {
        var base = {};
        if (!this.isField) {
            base.id = this.id;
            if (this.source.length) {
                base.outputSource = this.source.slice();
            }
            if (this.fileTypes.length) {
                base["sbg:fileTypes"] = this.fileTypes.join(", ");
            }
        }
        else {
            base.name = this.id;
        }
        if (this.type)
            base.type = this.type.serialize("v1.0");
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.doc = this.description;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1WorkflowOutputParameterModel;
}(WorkflowOutputParameterModel_1.WorkflowOutputParameterModel));
exports.V1WorkflowOutputParameterModel = V1WorkflowOutputParameterModel;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineParsers_1 = __webpack_require__(71);
var CommandArgumentModel_1 = __webpack_require__(22);
var CommandInputParameterModel_1 = __webpack_require__(10);
var ExpressionModel_1 = __webpack_require__(9);
var CommandLinePrepare = /** @class */ (function () {
    function CommandLinePrepare() {
    }
    CommandLinePrepare.prepare = function (input, flatJobInputs, context, loc, cmdType) {
        var inputType = "primitive";
        if (!input) {
            inputType === "nullValue";
        }
        if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel || input.type === "record") {
            var value = flatJobInputs[input.id] || null;
            cmdType = "input";
            if (value === null) {
                inputType = "nullValue";
            }
            else if (Array.isArray(value)) {
                inputType = "array";
            }
            else if (typeof value === "boolean") {
                inputType = "boolean";
            }
            else if (typeof value === "object" && value.class !== "File" && value.class !== "Directory") {
                inputType = "record";
            }
        }
        if (input instanceof CommandArgumentModel_1.CommandArgumentModel) {
            inputType = "argument";
            cmdType = "argument";
        }
        if (input instanceof ExpressionModel_1.ExpressionModel) {
            inputType = "expression";
        }
        if (cmdType === "stdin" || cmdType === "stdout") {
            inputType = "stream";
        }
        if (typeof input === "string") {
            inputType = "string";
        }
        var parser = CommandLineParsers_1.CommandLineParsers[inputType];
        return parser(input, flatJobInputs, flatJobInputs[input.id || null], context, cmdType, loc);
    };
    ;
    CommandLinePrepare.flattenInputsAndArgs = function (inputs) {
        return inputs.filter(function (input) {
            if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                return !!input.inputBinding;
            }
            return true;
        }).reduce(function (acc, input, index) {
            var sortFn = function (a, b) {
                var c1, c2;
                _a = [a, b].map(function (a) {
                    return a instanceof CommandArgumentModel_1.CommandArgumentModel ?
                        { pos: ~~a.position, id: index.toString() } :
                        { pos: ~~a.inputBinding.position, id: a.id };
                }), c1 = _a[0], c2 = _a[1];
                return ~~c1.pos - ~~c2.pos || (c1.id ? c1.id.localeCompare(c2.id) : -1);
                var _a;
            };
            if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                if (input.type.fields) {
                    return acc.concat.apply(acc, [input].concat(CommandLinePrepare.flattenInputsAndArgs(input.type.fields).sort(sortFn)));
                }
            }
            return acc.concat(input).sort(sortFn);
        }, []);
    };
    CommandLinePrepare.flattenJob = function (job, master) {
        return Object.keys(job).reduce(function (acc, key) {
            if (job[key] === null)
                return Object.assign(master, (_a = {}, _a[key] = null, _a));
            if (typeof job[key] === "object" && job[key].class !== "File") {
                return Object.assign(master, (_b = {}, _b[key] = job[key], _b), CommandLinePrepare.flattenJob(job[key], {}));
            }
            return Object.assign(master, (_c = {}, _c[key] = job[key], _c));
            var _a, _b, _c;
        }, {});
    };
    return CommandLinePrepare;
}());
exports.CommandLinePrepare = CommandLinePrepare;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArgumentModel_1 = __webpack_require__(22);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandLineBindingModel_1 = __webpack_require__(45);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandArgumentModel = /** @class */ (function (_super) {
    __extends(V1CommandArgumentModel, _super);
    function V1CommandArgumentModel(arg, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasExprPrimitive = true;
        _this.hasShellQuote = true;
        if (arg)
            _this.deserialize(arg);
        return _this;
    }
    Object.defineProperty(V1CommandArgumentModel.prototype, "arg", {
        get: function () {
            return this.primitive || this.binding;
        },
        set: function (value) {
            this.deserialize(value);
        },
        enumerable: true,
        configurable: true
    });
    V1CommandArgumentModel.prototype.toggleBinding = function (state) {
        var _this = this;
        if (state) {
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel({}, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.primitive.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.primitive = undefined;
        }
        else {
            this.primitive = new V1ExpressionModel_1.V1ExpressionModel("", this.loc, this.eventHub);
            this.primitive.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.binding.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.binding = undefined;
        }
        this.hasBinding = state;
    };
    V1CommandArgumentModel.prototype.updatePrimitive = function (str) {
        this.hasBinding = false;
        this.binding = undefined;
        this.primitive.setValue(str);
    };
    V1CommandArgumentModel.prototype.updateBinding = function (binding) {
        var _this = this;
        this.binding.prefix = binding.prefix;
        this.binding.position = binding.position;
        this.binding.separate = binding.separate;
        this.binding.itemSeparator = binding.itemSeparator;
        this.binding.shellQuote = binding.shellQuote;
        this.binding.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(binding.valueFrom, this.loc + ".valueFrom");
        this.binding.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.primitive = undefined;
        this.hasBinding = true;
    };
    V1CommandArgumentModel.prototype.serialize = function () {
        if (this.binding) {
            return this.binding.serialize();
        }
        if (this.primitive) {
            return this.primitive.serialize();
        }
        return "";
    };
    V1CommandArgumentModel.prototype.toString = function () {
        if (this.primitive)
            return this.primitive.serialize();
        if (this.binding) {
            return this.binding.valueFrom.toString();
        }
    };
    V1CommandArgumentModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (typeof attr === 'string' || attr instanceof V1ExpressionModel_1.V1ExpressionModel) {
            this.hasBinding = false;
            this.primitive = new V1ExpressionModel_1.V1ExpressionModel(attr, this.loc, this.eventHub);
            this.primitive.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else if (attr instanceof V1CommandLineBindingModel_1.V1CommandLineBindingModel) {
            this.hasBinding = true;
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr.serialize(), this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else if (typeof attr === 'object') {
            this.hasBinding = true;
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    return V1CommandArgumentModel;
}(CommandArgumentModel_1.CommandArgumentModel));
exports.V1CommandArgumentModel = V1CommandArgumentModel;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineBindingModel_1 = __webpack_require__(30);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(V1CommandLineBindingModel, _super);
    function V1CommandLineBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.shellQuote = true;
        _this.hasSecondaryFiles = false;
        _this.hasShellQuote = true;
        _this.serializedKeys = [
            "position",
            "prefix",
            "separate",
            "itemSeparator",
            "valueFrom",
            "shellQuote",
            "loadContents"
        ];
        if (binding)
            _this.deserialize(binding);
        return _this;
    }
    V1CommandLineBindingModel.prototype.setValueFrom = function (val) {
        var _this = this;
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(val, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    V1CommandLineBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        this.position = !isNaN(binding.position) ? parseInt(binding.position) : 0;
        this.prefix = binding.prefix;
        this.separate = binding.separate !== false; // default is true if not specified
        this.itemSeparator = binding.itemSeparator;
        this.shellQuote = binding.shellQuote !== false; // default is true if not specified
        this.loadContents = binding.loadContents === true;
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(binding.valueFrom, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
        utils_1.spreadSelectProps(binding, this.customProps, this.serializedKeys);
    };
    V1CommandLineBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key] !== undefined && _this[key] !== null && key !== "valueFrom") {
                base[key] = _this[key];
            }
        });
        if (!base.loadContents)
            delete base.loadContents;
        if (base.shellQuote !== false) {
            delete base.shellQuote; // true by default
        }
        else if (base.shellQuote === false && this.eventHub) {
            this.eventHub.emit("binding.shellQuote", true);
        }
        if (base.separate !== false) {
            delete base.separate; // true by default
        }
        if (this.valueFrom.serialize() !== undefined) {
            base.valueFrom = this.valueFrom.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.valueFrom.validate(context));
        return Promise.all(promises).then(function () { return _this.issues; });
    };
    return V1CommandLineBindingModel;
}(CommandLineBindingModel_1.CommandLineBindingModel));
exports.V1CommandLineBindingModel = V1CommandLineBindingModel;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(V1WorkflowInputParameterModel, _super);
    function V1WorkflowInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (input)
            _this.deserialize(input);
        return _this;
    }
    V1WorkflowInputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["id", "name", "type", "label", "doc", "sbg:fileTypes"];
        // @todo serialization of secondaryFiles, streamable, inputBinding
        this._label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join("\n\n");
        this.id = attr.id || attr.name;
        this.isField = !!attr.name;
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1WorkflowInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.isVisible = !attr["sbg:exposed"];
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    V1WorkflowInputParameterModel.prototype.serialize = function () {
        var base = {};
        if (this.isField) {
            base.name = this.id;
        }
        else {
            base.id = this.id;
            if (this.fileTypes.length)
                base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (this.type.type)
            base.type = this.type.serialize("v1.0");
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.doc = this.description;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1WorkflowInputParameterModel;
}(WorkflowInputParameterModel_1.WorkflowInputParameterModel));
exports.V1WorkflowInputParameterModel = V1WorkflowInputParameterModel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1CommandOutputBindingModel_1 = __webpack_require__(48);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(V1CommandOutputParameterModel, _super);
    function V1CommandOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = true;
        _this.customProps = {};
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1CommandOutputParameterModel.prototype.addSecondaryFile = function (file) {
        if (file === void 0) { file = ""; }
        return this._addSecondaryFile(file, V1ExpressionModel_1.V1ExpressionModel, this.loc);
    };
    V1CommandOutputParameterModel.prototype.updateSecondaryFiles = function (files) {
        this._updateSecondaryFiles(files);
    };
    V1CommandOutputParameterModel.prototype.removeSecondaryFile = function (index) {
        this._removeSecondaryFile(index);
    };
    V1CommandOutputParameterModel.prototype.serialize = function () {
        var base = {};
        !this.isField ? base.id = this.id : base.name = this.id;
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        base.type = this.type.serialize("v1.0");
        if (this.outputBinding) {
            base.outputBinding = this.outputBinding.serialize();
        }
        if (!this.isField && this.secondaryFiles.length && (this.type.type === "File" || this.type.items === "File")) {
            base.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
        }
        if (!this.isField && this.fileTypes.length) {
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (!this.isField && this.streamable) {
            base.streamable = this.streamable;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1CommandOutputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["id", "type", "outputBinding", "label", "doc", "secondaryFiles", "sbg:fileTypes", "streamable"];
        this.isField = !!attr.name; // record fields don't have ids
        this.id = attr.id || attr.name;
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1CommandOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.outputBinding = new V1CommandOutputBindingModel_1.V1CommandOutputBindingModel(attr.outputBinding, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join("\n\n");
        // properties only on inputs, not on fields
        this.secondaryFiles = utils_1.ensureArray(attr.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.streamable = attr.streamable;
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1CommandOutputParameterModel;
}(CommandOutputParameterModel_1.CommandOutputParameterModel));
exports.V1CommandOutputParameterModel = V1CommandOutputParameterModel;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputBindingModel_1 = __webpack_require__(33);
var V1ExpressionModel_1 = __webpack_require__(5);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(V1CommandOutputBindingModel, _super);
    function V1CommandOutputBindingModel(binding, loc, eventHub) {
        if (binding === void 0) { binding = {}; }
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasSecondaryFiles = false;
        _this.hasMetadata = false;
        _this.hasInheritMetadata = true;
        if (binding)
            _this.deserialize(binding);
        return _this;
    }
    Object.defineProperty(V1CommandOutputBindingModel.prototype, "glob", {
        get: function () {
            return this._glob;
        },
        set: function (value) {
            this.setGlob(value, V1ExpressionModel_1.V1ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(V1CommandOutputBindingModel.prototype, "outputEval", {
        get: function () {
            return this._outputEval;
        },
        set: function (value) {
            if (!(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX).test(value.serialize())) && this.inheritMetadataFrom) {
                this.inheritMetadataFrom = null;
            }
            this.setOutputEval(value, V1ExpressionModel_1.V1ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    V1CommandOutputBindingModel.prototype.setInheritMetadataFrom = function (inputId) {
        var serialized = this._outputEval.serialize();
        // inherit was set
        if (inputId) {
            this.inheritMetadataFrom = inputId;
            this.eventHub.emit("output.metadata.inherit");
            var inheritExpr = "$(inheritMetadata(self, inputs." + inputId + "))";
            // output eval doesn't exist
            if (serialized === undefined) {
                this._outputEval.setValue(inheritExpr);
            }
            else {
                // remove existing inherit statements if they exist
                serialized = serialized.replace(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX), "");
                if (serialized) {
                    this._outputEval.setIssue((_a = {}, _a[this.loc + ".outputEval"] = {
                        type: "warning",
                        code: ErrorCode_1.ErrorCode.OUTPUT_EVAL_INHERIT,
                        message: "Inheriting metadata appended some code to outputEval, this might change its behavior"
                    }, _a));
                }
                // output eval exists and is something else
                this._outputEval.setValue((serialized + "\n\n" + inheritExpr).trim());
            }
        }
        else if (serialized !== undefined) {
            // inherit was removed and should be removed from outputEval
            var newOutputEval = serialized.replace(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX), "");
            this._outputEval.setValue(newOutputEval || undefined);
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_EVAL_INHERIT);
            // set inherit to empty value
            this.inheritMetadataFrom = inputId;
        }
        var _a;
    };
    V1CommandOutputBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        var glob = binding.glob;
        if (Array.isArray(binding.glob)) {
            glob = binding.glob[0];
        }
        this.loadContents = binding.loadContents === true;
        this._glob = new V1ExpressionModel_1.V1ExpressionModel(glob, this.loc + ".glob", this.eventHub);
        this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.validateGlob();
        this._outputEval = new V1ExpressionModel_1.V1ExpressionModel(binding.outputEval, this.loc + ".outputEval", this.eventHub);
        this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // populate inherit metadata if it existsr
        if (binding.outputEval) {
            // only going to look at the first one, should be the only one
            // have to make a new RegExp because otherwise .exec would be called multiple times on the same one
            var matches = new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX).exec(binding.outputEval);
            this.inheritMetadataFrom = matches ? matches[1] : null;
        }
    };
    V1CommandOutputBindingModel.prototype.serialize = function () {
        var base = {};
        if (this.loadContents)
            base.loadContents = true;
        if (this._glob && this._glob.serialize() !== undefined)
            base.glob = this._glob.serialize();
        if (this._outputEval && this._outputEval.serialize() !== undefined)
            base.outputEval = this._outputEval.serialize();
        return base;
    };
    V1CommandOutputBindingModel.INHERIT_REGEX = /\$\(inheritMetadata\(self, inputs.(.*?)\)\)/g;
    return V1CommandOutputBindingModel;
}(CommandOutputBindingModel_1.CommandOutputBindingModel));
exports.V1CommandOutputBindingModel = V1CommandOutputBindingModel;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineBindingModel_1 = __webpack_require__(30);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandLineBindingModel, _super);
    function SBDraft2CommandLineBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasSecondaryFiles = true;
        _this.hasShellQuote = false;
        _this.serializedKeys = [
            "position",
            "prefix",
            "separate",
            "itemSeparator",
            "valueFrom",
            "loadContents",
            "secondaryFiles"
        ];
        _this.deserialize(binding || {});
        return _this;
    }
    SBDraft2CommandLineBindingModel.prototype.setValueFrom = function (val) {
        var _this = this;
        this.valueFrom = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(val, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        var promises = [];
        if (this.valueFrom) {
            promises.push(this.valueFrom.validate(context));
        }
        return Promise.all(promises).then(function () { return _this.issues; }, function (ex) {
            console.warn("SBDraft2CommandLineBindingModel threw error in validation: " + ex);
            return _this.issues;
        });
    };
    SBDraft2CommandLineBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key] !== undefined && _this[key] !== null && key !== "valueFrom" && key !== "secondaryFiles") {
                base[key] = _this[key];
            }
        });
        if (!base.loadContents)
            delete base.loadContents;
        if (this.valueFrom.serialize() !== undefined) {
            base.valueFrom = this.valueFrom.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2CommandLineBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        if (binding && binding.constructor === Object) {
            this.position = !isNaN(binding.position) ? parseInt(binding.position) : 0;
            this.prefix = binding.prefix;
            this.separate = binding.separate;
            this.itemSeparator = binding.itemSeparator;
            this.loadContents = binding.loadContents === true;
            this.valueFrom = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.valueFrom, this.loc + ".valueFrom", this.eventHub);
            this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // populates object with all custom attributes not covered in model
            utils_1.spreadSelectProps(binding, this.customProps, this.serializedKeys);
        }
    };
    return SBDraft2CommandLineBindingModel;
}(CommandLineBindingModel_1.CommandLineBindingModel));
exports.SBDraft2CommandLineBindingModel = SBDraft2CommandLineBindingModel;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var V1CommandInputParameterModel_1 = __webpack_require__(31);
var V1CommandOutputParameterModel_1 = __webpack_require__(47);
var utils_1 = __webpack_require__(0);
var ExpressionToolModel = /** @class */ (function (_super) {
    __extends(ExpressionToolModel, _super);
    function ExpressionToolModel(tool, loc) {
        var _this = _super.call(this, loc) || this;
        _this["class"] = "ExperssionTool";
        _this.customProps = {};
        if (tool)
            _this.deserialize(tool);
        return _this;
    }
    ExpressionToolModel.prototype.serialize = function () {
        return utils_1.spreadAllProps({}, this.customProps);
    };
    ExpressionToolModel.prototype.deserialize = function (attr) {
        this.inputs = utils_1.ensureArray(attr.inputs, "id", "type").map(function (i) { return new V1CommandInputParameterModel_1.V1CommandInputParameterModel(i); });
        this.outputs = utils_1.ensureArray(attr.outputs, "id", "type").map(function (o) { return new V1CommandOutputParameterModel_1.V1CommandOutputParameterModel(o); });
        this.id = attr.id;
        this.label = attr.label;
        this.description = attr.doc || attr.description;
        utils_1.spreadSelectProps(attr, this.customProps, []);
    };
    return ExpressionToolModel;
}(ValidationBase_1.ValidationBase));
exports.ExpressionToolModel = ExpressionToolModel;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(37));
__export(__webpack_require__(55));
__export(__webpack_require__(57));
__export(__webpack_require__(60));
__export(__webpack_require__(64));
__export(__webpack_require__(62));
__export(__webpack_require__(61));
__export(__webpack_require__(39));
__export(__webpack_require__(59));
__export(__webpack_require__(65));
// for implementing third-party plugins
__export(__webpack_require__(8));
//# sourceMappingURL=index.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    Geometry.getTransformToElement = function (from, to) {
        var getPosition = function (node, addE, addF) {
            if (addE === void 0) { addE = 0; }
            if (addF === void 0) { addF = 0; }
            if (!node.ownerSVGElement) {
                // node is the root svg element
                var matrix = node.createSVGMatrix();
                matrix.e = addE;
                matrix.f = addF;
                return matrix;
            }
            else {
                // node still has parent elements
                var _a = node.transform.baseVal.getItem(0).matrix, e = _a.e, f = _a.f;
                return getPosition(node.parentNode, e + addE, f + addF);
            }
        };
        var toPosition = getPosition(to);
        var fromPosition = getPosition(from);
        var result = from.ownerSVGElement.createSVGMatrix();
        result.e = toPosition.e - fromPosition.e;
        result.f = toPosition.f - fromPosition.f;
        return result.inverse();
    };
    return Geometry;
}());
exports.Geometry = Geometry;
//# sourceMappingURL=geometry.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IOPort = /** @class */ (function () {
    function IOPort() {
    }
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param {"right" | "left" | string} forceDirection
     * @returns {string}
     */
    IOPort.makeConnectionPath = function (x1, y1, x2, y2, forceDirection) {
        if (forceDirection === void 0) { forceDirection = "right"; }
        if (!forceDirection) {
            return "M " + x1 + " " + y1 + " C " + (x1 + x2) / 2 + " " + y1 + " " + (x1 + x2) / 2 + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "right") {
            var outDir = x1 + Math.abs(x1 - x2) / 2;
            var inDir = x2 - Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "left") {
            var outDir = x1 - Math.abs(x1 - x2) / 2;
            var inDir = x2 + Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
    };
    IOPort.radius = 7;
    return IOPort;
}());
exports.IOPort = IOPort;
//# sourceMappingURL=io-port.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGUtils = /** @class */ (function () {
    function SVGUtils() {
    }
    SVGUtils.matrixToTransformAttr = function (matrix) {
        var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, e = matrix.e, f = matrix.f;
        return "matrix(" + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ")";
    };
    SVGUtils.createMatrix = function () {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    };
    return SVGUtils;
}());
exports.SVGUtils = SVGUtils;
//# sourceMappingURL=svg-utils.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_1 = __webpack_require__(38);
var graph_node_1 = __webpack_require__(24);
var template_parser_1 = __webpack_require__(56);
var StepNode = /** @class */ (function () {
    function StepNode(element, stepModel) {
        this.stepEl = element;
        this.svg = element.ownerSVGElement;
        this.model = stepModel;
    }
    StepNode.prototype.update = function () {
        var tpl = graph_node_1.GraphNode.makeTemplate(this.model);
        var el = template_parser_1.TemplateParser.parse(tpl);
        this.stepEl.innerHTML = el.innerHTML;
        // Reposition all edges
        var incomingEdges = this.svg.querySelectorAll(".edge[data-destination-node=\"" + this.model.connectionId + "\"]");
        var outgoingEdges = this.svg.querySelectorAll(".edge[data-source-node=\"" + this.model.connectionId + "\"");
        try {
            for (var _a = __values(__spread(incomingEdges, outgoingEdges)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var edge = _b.value;
                edge_1.Edge.spawnBetweenConnectionIDs(this.svg.querySelector(".workflow"), edge.getAttribute("data-source-connection"), edge.getAttribute("data-destination-connection"));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("Should redraw input port", incomingEdges);
        var e_1, _c;
    };
    return StepNode;
}());
exports.StepNode = StepNode;
//# sourceMappingURL=step-node.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TemplateParser = /** @class */ (function () {
    function TemplateParser() {
    }
    TemplateParser.parse = function (tpl) {
        var ns = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(ns, "g");
        node.innerHTML = tpl;
        return node.firstElementChild;
    };
    return TemplateParser;
}());
exports.TemplateParser = TemplateParser;
//# sourceMappingURL=template-parser.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var _1 = __webpack_require__(58);
var graph_node_1 = __webpack_require__(24);
var geometry_1 = __webpack_require__(52);
var edge_1 = __webpack_require__(38);
var edge_panning_1 = __webpack_require__(63);
var SVGPortDragPlugin = /** @class */ (function (_super) {
    __extends(SVGPortDragPlugin, _super);
    function SVGPortDragPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** How far away from the port you need to drag in order to create a new input/output instead of snapping */
        _this.snapRadius = 120;
        /** Map of CSS classes attached by this plugin */
        _this.css = {
            /** Added to svgRoot as a sign that this plugin is active */
            plugin: "__plugin-port-drag",
            /** Suggests that an element that contains it will be the one to snap to */
            snap: "__port-drag-snap",
            /** Added to svgRoot while dragging is in progress */
            dragging: "__port-drag-dragging",
            /** Will be added to suggested ports and their parent nodes */
            suggestion: "__port-drag-suggestion",
        };
        _this.detachDragListenerFn = undefined;
        _this.wheelPrevent = function (ev) { return ev.stopPropagation(); };
        _this.ghostX = 0;
        _this.ghostY = 0;
        return _this;
    }
    SVGPortDragPlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.panner = new edge_panning_1.EdgePanner(this.workflow);
        this.workflow.svgRoot.classList.add(this.css.plugin);
    };
    SVGPortDragPlugin.prototype.afterRender = function () {
        if (this.workflow.editingEnabled) {
            this.attachPortDrag();
        }
    };
    SVGPortDragPlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            this.attachPortDrag();
        }
        else {
            this.detachPortDrag();
        }
    };
    SVGPortDragPlugin.prototype.destroy = function () {
        this.detachPortDrag();
    };
    SVGPortDragPlugin.prototype.detachPortDrag = function () {
        if (typeof this.detachDragListenerFn === "function") {
            this.detachDragListenerFn();
        }
        this.detachDragListenerFn = undefined;
    };
    SVGPortDragPlugin.prototype.attachPortDrag = function () {
        this.detachPortDrag();
        this.detachDragListenerFn = this.workflow.domEvents.drag(".port", this.onMove.bind(this), this.onMoveStart.bind(this), this.onMoveEnd.bind(this));
    };
    SVGPortDragPlugin.prototype.onMove = function (dx, dy, ev, portElement) {
        var _this = this;
        document.addEventListener("mousewheel", this.wheelPrevent, true);
        var mouseOnSVG = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
        var scale = this.workflow.scale;
        var sdx = (dx - this.lastMouseMove.x) / scale;
        var sdy = (dy - this.lastMouseMove.y) / scale;
        /** We might have hit the boundary and need to start panning */
        this.panner.triggerCollisionDetection(ev.clientX, ev.clientY, function (sdx, sdy) {
            _this.ghostX += sdx;
            _this.ghostY += sdy;
            _this.translateGhostNode(_this.ghostX, _this.ghostY);
            _this.updateEdge(_this.portOnCanvas.x, _this.portOnCanvas.y, _this.ghostX, _this.ghostY);
        });
        var nodeToMouseDistance = geometry_1.Geometry.distance(this.nodeCoords.x, this.nodeCoords.y, mouseOnSVG.x, mouseOnSVG.y);
        var closestPort = this.findClosestPort(mouseOnSVG.x, mouseOnSVG.y);
        this.updateSnapPort(closestPort.portEl, closestPort.distance);
        this.ghostX += sdx;
        this.ghostY += sdy;
        this.translateGhostNode(this.ghostX, this.ghostY);
        this.updateGhostNodeVisibility(nodeToMouseDistance, closestPort.distance);
        this.updateEdge(this.portOnCanvas.x, this.portOnCanvas.y, this.ghostX, this.ghostY);
        this.lastMouseMove = { x: dx, y: dy };
    };
    /**
     * @FIXME: Add panning
     * @param {MouseEvent} ev
     * @param {SVGGElement} portEl
     */
    SVGPortDragPlugin.prototype.onMoveStart = function (ev, portEl) {
        this.lastMouseMove = { x: 0, y: 0 };
        this.originPort = portEl;
        var portCTM = portEl.getScreenCTM();
        this.portOnCanvas = this.workflow.transformScreenCTMtoCanvas(portCTM.e, portCTM.f);
        this.ghostX = this.portOnCanvas.x;
        this.ghostY = this.portOnCanvas.y;
        // Needed for collision detection
        this.boundingClientRect = this.workflow.svgRoot.getBoundingClientRect();
        var nodeMatrix = this.workflow.findParent(portEl).transform.baseVal.getItem(0).matrix;
        this.nodeCoords = {
            x: nodeMatrix.e,
            y: nodeMatrix.f
        };
        var workflowGroup = this.workflow.workflow;
        this.portType = portEl.classList.contains("input-port") ? "input" : "output";
        this.ghostNode = this.createGhostNode(this.portType);
        workflowGroup.appendChild(this.ghostNode);
        /** @FIXME: this should come from workflow */
        this.edgeGroup = edge_1.Edge.spawn();
        this.edgeGroup.classList.add(this.css.dragging);
        workflowGroup.appendChild(this.edgeGroup);
        this.workflow.svgRoot.classList.add(this.css.dragging);
        this.portOrigins = this.getPortCandidateTransformations(portEl);
        this.highlightSuggestedPorts(portEl.getAttribute("data-connection-id"));
    };
    SVGPortDragPlugin.prototype.onMoveEnd = function (ev) {
        document.removeEventListener("mousewheel", this.wheelPrevent, true);
        this.panner.stop();
        var ghostType = this.ghostNode.getAttribute("data-type");
        var ghostIsVisible = !this.ghostNode.classList.contains("hidden");
        var shouldSnap = this.snapPort !== undefined;
        var shouldCreateInput = ghostIsVisible && ghostType === "input";
        var shouldCreateOutput = ghostIsVisible && ghostType === "output";
        var portID = this.originPort.getAttribute("data-connection-id");
        if (shouldSnap) {
            this.createEdgeBetweenPorts(this.originPort, this.snapPort);
        }
        else if (shouldCreateInput || shouldCreateOutput) {
            var svgCoordsUnderMouse = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
            var customProps = {
                "sbg:x": svgCoordsUnderMouse.x,
                "sbg:y": svgCoordsUnderMouse.y
            };
            if (shouldCreateInput) {
                this.workflow.model.createInputFromPort(portID, { customProps: customProps });
            }
            else {
                this.workflow.model.createOutputFromPort(portID, { customProps: customProps });
            }
        }
        this.cleanMemory();
        this.cleanStyles();
    };
    SVGPortDragPlugin.prototype.updateSnapPort = function (closestPort, closestPortDistance) {
        var closestPortChanged = closestPort !== this.snapPort;
        var closestPortIsOutOfRange = closestPortDistance > this.snapRadius;
        // We might need to remove old class for snapping if we are closer to some other port now
        if (this.snapPort && (closestPortChanged || closestPortIsOutOfRange)) {
            var node_1 = this.workflow.findParent(this.snapPort);
            this.snapPort.classList.remove(this.css.snap);
            node_1.classList.remove(this.css.snap);
            delete this.snapPort;
        }
        // If closest port is further away than our snapRadius, no highlighting should be done
        if (closestPortDistance > this.snapRadius) {
            return;
        }
        var originID = this.originPort.getAttribute("data-connection-id");
        var targetID = closestPort.getAttribute("data-connection-id");
        if (this.findEdge(originID, targetID)) {
            delete this.snapPort;
            return;
        }
        this.snapPort = closestPort;
        var node = this.workflow.findParent(closestPort);
        var oppositePortType = this.portType === "input" ? "output" : "input";
        closestPort.classList.add(this.css.snap);
        node.classList.add(this.css.snap);
        node.classList.add(this.css.snap + "-" + oppositePortType);
    };
    SVGPortDragPlugin.prototype.updateEdge = function (fromX, fromY, toX, toY) {
        var subEdges = this.edgeGroup.children;
        try {
            for (var _a = __values(subEdges), _b = _a.next(); !_b.done; _b = _a.next()) {
                var subEdge = _b.value;
                var path = _1.Workflow.makeConnectionPath(fromX, fromY, toX, toY, this.portType === "input" ? "left" : "right");
                subEdge.setAttribute("d", path);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SVGPortDragPlugin.prototype.updateGhostNodeVisibility = function (distanceToMouse, distanceToClosestPort) {
        var isHidden = this.ghostNode.classList.contains("hidden");
        var shouldBeVisible = distanceToMouse > this.snapRadius && distanceToClosestPort > this.snapRadius;
        if (shouldBeVisible && isHidden) {
            this.ghostNode.classList.remove("hidden");
        }
        else if (!shouldBeVisible && !isHidden) {
            this.ghostNode.classList.add("hidden");
        }
    };
    SVGPortDragPlugin.prototype.translateGhostNode = function (x, y) {
        this.ghostNode.transform.baseVal.getItem(0).setTranslate(x, y);
    };
    SVGPortDragPlugin.prototype.getPortCandidateTransformations = function (portEl) {
        var nodeEl = this.workflow.findParent(portEl);
        var nodeConnectionID = nodeEl.getAttribute("data-connection-id");
        var otherPortType = this.portType === "input" ? "output" : "input";
        var portQuery = ".node:not([data-connection-id=\"" + nodeConnectionID + "\"]) .port." + otherPortType + "-port";
        var candidates = this.workflow.workflow.querySelectorAll(portQuery);
        var matrices = new Map();
        try {
            for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                var port = candidates_1_1.value;
                matrices.set(port, geometry_1.Geometry.getTransformToElement(port, this.workflow.workflow));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return matrices;
        var e_2, _a;
    };
    /**
     * Highlights ports that are model says are suggested.
     * Also marks their parent nodes as highlighted.
     *
     * @param {string} targetConnectionID ConnectionID of the origin port
     */
    SVGPortDragPlugin.prototype.highlightSuggestedPorts = function (targetConnectionID) {
        // Find all ports that we can validly connect to
        // Note that we can connect to any port, but some of them are suggested based on hypothetical validity.
        var portModels = this.workflow.model.gatherValidConnectionPoints(targetConnectionID);
        for (var i = 0; i < portModels.length; i++) {
            var portModel = portModels[i];
            if (!portModel.isVisible)
                continue;
            // Find port element by this connectionID and it's parent node element
            var portQuery = ".port[data-connection-id=\"" + portModel.connectionId + "\"]";
            var portElement = this.workflow.workflow.querySelector(portQuery);
            var parentNode = this.workflow.findParent(portElement);
            // Add highlighting classes to port and it's parent node
            parentNode.classList.add(this.css.suggestion);
            portElement.classList.add(this.css.suggestion);
        }
    };
    /**
     * @FIXME: GraphNode.radius should somehow come through Workflow,
     */
    SVGPortDragPlugin.prototype.createGhostNode = function (type) {
        var namespace = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(namespace, "g");
        node.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        node.setAttribute("data-type", type);
        node.classList.add("ghost");
        node.classList.add("node");
        node.innerHTML = "<circle class=\"ghost-circle\" cx=\"0\" cy=\"0\" r=\"" + graph_node_1.GraphNode.radius / 1.5 + "\"></circle>";
        return node;
    };
    /**
     * Finds a port closest to given SVG coordinates.
     */
    SVGPortDragPlugin.prototype.findClosestPort = function (x, y) {
        var closestPort = undefined;
        var closestDistance = Infinity;
        this.portOrigins.forEach(function (matrix, port) {
            var distance = geometry_1.Geometry.distance(x, y, matrix.e, matrix.f);
            if (distance < closestDistance) {
                closestPort = port;
                closestDistance = distance;
            }
        });
        return {
            portEl: closestPort,
            distance: closestDistance
        };
    };
    /**
     * Removes all dom elements and objects cached in-memory during dragging that are no longer needed.
     */
    SVGPortDragPlugin.prototype.cleanMemory = function () {
        this.edgeGroup.remove();
        this.ghostNode.remove();
        this.snapPort = undefined;
        this.edgeGroup = undefined;
        this.nodeCoords = undefined;
        this.originPort = undefined;
        this.portOrigins = undefined;
        this.boundingClientRect = undefined;
    };
    /**
     * Removes all css classes attached by this plugin
     */
    SVGPortDragPlugin.prototype.cleanStyles = function () {
        this.workflow.svgRoot.classList.remove(this.css.dragging);
        for (var cls in this.css) {
            var query = this.workflow.svgRoot.querySelectorAll("." + this.css[cls]);
            try {
                for (var query_1 = __values(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
                    var el = query_1_1.value;
                    el.classList.remove(this.css[cls]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (query_1_1 && !query_1_1.done && (_a = query_1.return)) _a.call(query_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var e_3, _a;
    };
    /**
     * Creates an edge (connection) between two elements determined by their connection IDs
     * This edge is created on the model, and not rendered directly on graph, as main workflow
     * is supposed to catch the creation event and draw it.
     */
    SVGPortDragPlugin.prototype.createEdgeBetweenPorts = function (source, destination) {
        // Find the connection ids of origin port and the highlighted port
        var sourceID = source.getAttribute("data-connection-id");
        var destinationID = destination.getAttribute("data-connection-id");
        // Swap their places in case you dragged out from input to output, since they have to be ordered output->input
        if (sourceID.startsWith("in")) {
            var tmp = sourceID;
            sourceID = destinationID;
            destinationID = tmp;
        }
        this.workflow.model.connect(sourceID, destinationID);
    };
    SVGPortDragPlugin.prototype.findEdge = function (sourceID, destinationID) {
        var ltrQuery = "[data-source-connection=\"" + sourceID + "\"][data-destination-connection=\"" + destinationID + "\"]";
        var rtlQuery = "[data-source-connection=\"" + destinationID + "\"][data-destination-connection=\"" + sourceID + "\"]";
        return this.workflow.workflow.querySelector(ltrQuery + "," + rtlQuery);
    };
    return SVGPortDragPlugin;
}(plugin_base_1.PluginBase));
exports.SVGPortDragPlugin = SVGPortDragPlugin;
//# sourceMappingURL=port-drag.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(37));
__export(__webpack_require__(59));
__export(__webpack_require__(60));
__export(__webpack_require__(61));
__export(__webpack_require__(62));
__export(__webpack_require__(57));
__export(__webpack_require__(39));
__export(__webpack_require__(64));
__export(__webpack_require__(65));
//# sourceMappingURL=index.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var ZoomPlugin = /** @class */ (function (_super) {
    __extends(ZoomPlugin, _super);
    function ZoomPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomPlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.svg = workflow.svgRoot;
        this.dispose = this.attachWheelListener();
    };
    ZoomPlugin.prototype.attachWheelListener = function () {
        var _this = this;
        var handler = this.onMouseWheel.bind(this);
        this.svg.addEventListener("mousewheel", handler, true);
        return function () { return _this.svg.removeEventListener("mousewheel", handler, true); };
    };
    ZoomPlugin.prototype.onMouseWheel = function (event) {
        var scale = this.workflow.scale;
        var scaleUpdate = scale - event.deltaY / 500;
        var zoominOut = scaleUpdate < scale;
        var zoomingIn = scaleUpdate > scale;
        if (zoomingIn && this.workflow.maxScale < scaleUpdate) {
            return;
        }
        if (zoominOut && this.workflow.minScale > scaleUpdate) {
            return;
        }
        this.workflow.scaleAtPoint(scaleUpdate, event.clientX, event.clientY);
        event.stopPropagation();
    };
    ZoomPlugin.prototype.destroy = function () {
        this.dispose();
        this.dispose = undefined;
    };
    return ZoomPlugin;
}(plugin_base_1.PluginBase));
exports.ZoomPlugin = ZoomPlugin;
//# sourceMappingURL=zoom.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graph_node_1 = __webpack_require__(24);
var svg_utils_1 = __webpack_require__(54);
var SVGArrangePlugin = /** @class */ (function () {
    function SVGArrangePlugin() {
    }
    SVGArrangePlugin.prototype.registerWorkflow = function (workflow) {
        this.workflow = workflow;
        this.svgRoot = workflow.svgRoot;
    };
    SVGArrangePlugin.prototype.registerOnBeforeChange = function (fn) {
        this.onBeforeChange = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.registerOnAfterChange = function (fn) {
        this.onAfterChange = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.registerOnAfterRender = function (fn) {
        this.triggerAfterRender = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.afterRender = function () {
        try {
            for (var _a = __values(this.workflow.model.steps), _b = _a.next(); !_b.done; _b = _a.next()) {
                var step = _b.value;
                if (step.isVisible) {
                    var missingCoordinate = isNaN(parseInt(step.customProps["sbg:x"]));
                    if (missingCoordinate) {
                        this.arrange();
                    }
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SVGArrangePlugin.prototype.arrange = function () {
        this.onBeforeChange();
        // We need to reset all transformations on the workflow for now.
        // @TODO Make arranging work without this
        this.workflow.resetTransform();
        // We need main graph and dangling nodes separately, they will be distributed differently
        var _a = this.makeNodeGraphs(), mainGraph = _a.mainGraph, danglingNodes = _a.danglingNodes;
        // Create an array of columns, each containing a list of NodeIOs
        var columns = this.distributeNodesIntoColumns(mainGraph);
        // Get total area in which we will fit the graph, and per-column dimensions
        var _b = this.calculateColumnSizes(columns), distributionArea = _b.distributionArea, columnDimensions = _b.columnDimensions;
        // This will be the vertical middle around which the graph should be centered
        var verticalBaseline = distributionArea.height / 2;
        var xOffset = 0;
        var maxYOffset = 0;
        // Here we will store positions for each node that is to be updated.
        // This should then be emitted as an afterChange event.
        var nodePositionUpdates = {};
        columns.forEach(function (column, index) {
            var colSize = columnDimensions[index];
            var yOffset = verticalBaseline - (colSize.height / 2) - column[0].rect.height / 2;
            column.forEach(function (node) {
                yOffset += node.rect.height / 2;
                var matrix = svg_utils_1.SVGUtils.createMatrix().translate(xOffset, yOffset);
                yOffset += node.rect.height / 2;
                if (yOffset > maxYOffset) {
                    maxYOffset = yOffset;
                }
                node.el.setAttribute("transform", svg_utils_1.SVGUtils.matrixToTransformAttr(matrix));
                nodePositionUpdates[node.connectionID] = {
                    x: matrix.e,
                    y: matrix.f
                };
            });
            xOffset += colSize.width;
        });
        var danglingNodeKeys = Object.keys(danglingNodes).sort(function (a, b) {
            var aIsInput = a.startsWith("out/");
            var aIsOutput = a.startsWith("in/");
            var bIsInput = b.startsWith("out/");
            var bIsOutput = b.startsWith("in/");
            var lowerA = a.toLowerCase();
            var lowerB = b.toLowerCase();
            if (aIsOutput) {
                if (bIsOutput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return 1;
                }
            }
            else if (aIsInput) {
                if (bIsOutput) {
                    return -1;
                }
                if (bIsInput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return 1;
                }
            }
            else {
                if (!bIsOutput && !bIsInput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return -1;
                }
            }
        });
        var danglingNodeMarginOffset = 30;
        var danglingNodeSideLength = graph_node_1.GraphNode.radius * 5;
        var maxNodeHeightInRow = 0;
        var row = 0;
        var indexWidthMap = new Map();
        var rowMaxHeightMap = new Map();
        xOffset = 0;
        var danglingRowAreaWidth = Math.max(distributionArea.width, danglingNodeSideLength * 3);
        danglingNodeKeys.forEach(function (connectionID, index) {
            var el = danglingNodes[connectionID];
            var rect = el.firstElementChild.getBoundingClientRect();
            indexWidthMap.set(index, rect.width);
            if (xOffset === 0) {
                xOffset -= rect.width / 2;
            }
            if (rect.height > maxNodeHeightInRow) {
                maxNodeHeightInRow = rect.height;
            }
            xOffset += rect.width + danglingNodeMarginOffset + Math.max(150 - rect.width, 0);
            if (xOffset >= danglingRowAreaWidth && index < danglingNodeKeys.length - 1) {
                rowMaxHeightMap.set(row++, maxNodeHeightInRow);
                maxNodeHeightInRow = 0;
                xOffset = 0;
            }
        });
        rowMaxHeightMap.set(row, maxNodeHeightInRow);
        var colYOffset = maxYOffset;
        xOffset = 0;
        row = 0;
        danglingNodeKeys.forEach(function (connectionID, index) {
            var el = danglingNodes[connectionID];
            var width = indexWidthMap.get(index);
            var rowHeight = rowMaxHeightMap.get(row);
            var left = xOffset + width / 2;
            var top = colYOffset
                + danglingNodeMarginOffset
                + Math.ceil(rowHeight / 2)
                + ((xOffset === 0 ? 0 : left) / danglingRowAreaWidth) * danglingNodeSideLength;
            if (xOffset === 0) {
                left -= width / 2;
                xOffset -= width / 2;
            }
            xOffset += width + danglingNodeMarginOffset + Math.max(150 - width, 0);
            var matrix = svg_utils_1.SVGUtils.createMatrix().translate(left, top);
            el.setAttribute("transform", svg_utils_1.SVGUtils.matrixToTransformAttr(matrix));
            nodePositionUpdates[connectionID] = { x: matrix.e, y: matrix.f };
            if (xOffset >= danglingRowAreaWidth) {
                colYOffset += Math.ceil(rowHeight) + danglingNodeMarginOffset;
                xOffset = 0;
                maxNodeHeightInRow = 0;
                row++;
            }
        });
        this.workflow.redrawEdges();
        this.workflow.fitToViewport();
        this.onAfterChange(nodePositionUpdates);
        this.triggerAfterRender();
        for (var id in nodePositionUpdates) {
            var pos = nodePositionUpdates[id];
            var nodeModel = this.workflow.model.findById(id);
            if (!nodeModel.customProps) {
                nodeModel.customProps = {};
            }
            Object.assign(nodeModel.customProps, {
                "sbg:x": pos.x,
                "sbg:y": pos.y
            });
        }
        return nodePositionUpdates;
    };
    /**
     * Calculates column dimensions and total graph area
     * @param {NodeIO[][]} columns
     */
    SVGArrangePlugin.prototype.calculateColumnSizes = function (columns) {
        var distributionArea = { width: 0, height: 0 };
        var columnDimensions = [];
        for (var i = 1; i < columns.length; i++) {
            var width = 0;
            var height = 0;
            for (var j = 0; j < columns[i].length; j++) {
                var entry = columns[i][j];
                height += entry.rect.height;
                if (width < entry.rect.width) {
                    width = entry.rect.width;
                }
            }
            columnDimensions[i] = { height: height, width: width };
            distributionArea.width += width;
            if (height > distributionArea.height) {
                distributionArea.height = height;
            }
        }
        return {
            columnDimensions: columnDimensions,
            distributionArea: distributionArea
        };
    };
    /**
     * Maps node's connectionID to a 1-indexed column number
     */
    SVGArrangePlugin.prototype.distributeNodesIntoColumns = function (graph) {
        var idToZoneMap = {};
        var sortedNodeIDs = Object.keys(graph).sort(function (a, b) { return b.localeCompare(a); });
        var zones = [];
        for (var i = 0; i < sortedNodeIDs.length; i++) {
            var nodeID = sortedNodeIDs[i];
            var node = graph[nodeID];
            // For outputs and steps, we calculate the zone as a longest path you can take to them
            if (node.type !== "input") {
                idToZoneMap[nodeID] = this.traceLongestNodePathLength(node, graph);
            }
            else {
                //
                // Longest trace methods would put all inputs in the first column,
                // but we want it just behind the leftmost step that it is connected to
                // So instead of:
                //
                // (input)<----------------->(step)---
                // (input)<---------->(step)----------
                //
                // It should be:
                //
                // ---------------(input)<--->(step)---
                // --------(input)<-->(step)-----------
                //
                var closestNodeZone = Infinity;
                for (var i_1 = 0; i_1 < node.outputs.length; i_1++) {
                    var successorNodeZone = idToZoneMap[node.outputs[i_1]];
                    if (successorNodeZone < closestNodeZone) {
                        closestNodeZone = successorNodeZone;
                    }
                }
                if (closestNodeZone === Infinity) {
                    idToZoneMap[nodeID] = 1;
                }
                else {
                    idToZoneMap[nodeID] = closestNodeZone - 1;
                }
            }
            var zone = idToZoneMap[nodeID];
            zones[zone] || (zones[zone] = []);
            zones[zone].push(graph[nodeID]);
        }
        return zones;
    };
    /**
     * Finds all nodes in the graph, and indexes them by their "data-connection-id" attribute
     */
    SVGArrangePlugin.prototype.indexNodesByID = function () {
        var indexed = {};
        var nodes = this.svgRoot.querySelectorAll(".node");
        for (var i = 0; i < nodes.length; i++) {
            indexed[nodes[i].getAttribute("data-connection-id")] = nodes[i];
        }
        return indexed;
    };
    /**
     * Finds length of the longest possible path from the graph root to a node.
     * Lengths are 1-indexed. When a node has no predecessors, it will have length of 1.
     */
    SVGArrangePlugin.prototype.traceLongestNodePathLength = function (node, nodeGraph, visited) {
        if (visited === void 0) { visited = new Set(); }
        visited.add(node);
        if (node.inputs.length === 0) {
            return 1;
        }
        var inputPathLengths = [];
        for (var i = 0; i < node.inputs.length; i++) {
            var el = nodeGraph[node.inputs[i]];
            if (visited.has(el)) {
                continue;
            }
            inputPathLengths.push(this.traceLongestNodePathLength(el, nodeGraph, visited));
        }
        return Math.max.apply(Math, __spread(inputPathLengths)) + 1;
    };
    SVGArrangePlugin.prototype.makeNodeGraphs = function () {
        // We need all nodes in order to find the dangling ones, those will be sorted separately
        var allNodes = this.indexNodesByID();
        // Make a graph representation where you can trace inputs and outputs from/to connection ids
        var nodeGraph = {};
        // Edges are the main source of information from which we will distribute nodes
        var edges = this.svgRoot.querySelectorAll(".edge");
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            var sourceConnectionID = edge.getAttribute("data-source-connection");
            var destinationConnectionID = edge.getAttribute("data-destination-connection");
            var _a = __read(sourceConnectionID.split("/"), 3), sourceSide = _a[0], sourceNodeID = _a[1], sourcePortID = _a[2];
            var _b = __read(destinationConnectionID.split("/"), 3), destinationSide = _b[0], destinationNodeID = _b[1], destinationPortID = _b[2];
            // Both source and destination are considered to be steps by default
            var sourceType = "step";
            var destinationType = "step";
            // Ports have the same node and port ids
            if (sourceNodeID === sourcePortID) {
                sourceType = sourceSide === "in" ? "output" : "input";
            }
            if (destinationNodeID === destinationPortID) {
                destinationType = destinationSide === "in" ? "output" : "input";
            }
            // Initialize keys on graph if they don't exist
            var sourceNode = this.svgRoot.querySelector(".node[data-id=\"" + sourceNodeID + "\"]");
            var destinationNode = this.svgRoot.querySelector(".node[data-id=\"" + destinationNodeID + "\"]");
            var sourceNodeConnectionID = sourceNode.getAttribute("data-connection-id");
            var destinationNodeConnectionID = destinationNode.getAttribute("data-connection-id");
            // Source and destination of this edge are obviously not dangling, so we can remove them
            // from the set of potentially dangling nodes
            delete allNodes[sourceNodeConnectionID];
            delete allNodes[destinationNodeConnectionID];
            // Ensure that the source node has its entry in the node graph
            (nodeGraph[sourceNodeID] || (nodeGraph[sourceNodeID] = {
                inputs: [],
                outputs: [],
                type: sourceType,
                connectionID: sourceNodeConnectionID,
                el: sourceNode,
                rect: sourceNode.getBoundingClientRect()
            }));
            // Ensure that the source node has its entry in the node graph
            (nodeGraph[destinationNodeID] || (nodeGraph[destinationNodeID] = {
                inputs: [],
                outputs: [],
                type: destinationType,
                connectionID: destinationNodeConnectionID,
                el: destinationNode,
                rect: destinationNode.getBoundingClientRect()
            }));
            nodeGraph[sourceNodeID].outputs.push(destinationNodeID);
            nodeGraph[destinationNodeID].inputs.push(sourceNodeID);
        }
        return {
            mainGraph: nodeGraph,
            danglingNodes: allNodes
        };
    };
    return SVGArrangePlugin;
}());
exports.SVGArrangePlugin = SVGArrangePlugin;
//# sourceMappingURL=arrange.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SVGValidatePlugin = /** @class */ (function (_super) {
    __extends(SVGValidatePlugin, _super);
    function SVGValidatePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modelDisposers = [];
        /** Map of CSS classes attached by this plugin */
        _this.css = {
            plugin: "__plugin-validate",
            invalid: "__validate-invalid"
        };
        return _this;
    }
    SVGValidatePlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        // add plugin specific class to the svgRoot for scoping
        this.workflow.svgRoot.classList.add(this.css.plugin);
    };
    SVGValidatePlugin.prototype.afterModelChange = function () {
        this.disposeModelListeners();
        // add listener for all subsequent edge validation
        var update = this.workflow.model.on("connections.updated", this.renderEdgeValidation.bind(this));
        var create = this.workflow.model.on("connection.create", this.renderEdgeValidation.bind(this));
        this.modelDisposers.concat([update.dispose, create.dispose]);
    };
    SVGValidatePlugin.prototype.destroy = function () {
        this.disposeModelListeners();
    };
    SVGValidatePlugin.prototype.afterRender = function () {
        // do initial validation rendering for edges
        this.renderEdgeValidation();
    };
    SVGValidatePlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            // only show validation if workflow is editable
            this.renderEdgeValidation();
        }
        else {
            this.removeClasses(this.workflow.workflow.querySelectorAll(".edge"));
        }
    };
    SVGValidatePlugin.prototype.disposeModelListeners = function () {
        try {
            for (var _a = __values(this.modelDisposers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var disposeListener = _b.value;
                disposeListener();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.modelDisposers = [];
        var e_1, _c;
    };
    SVGValidatePlugin.prototype.removeClasses = function (edges) {
        try {
            // remove validity class on all edges
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
                var e = edges_1_1.value;
                e.classList.remove(this.css.invalid);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    SVGValidatePlugin.prototype.renderEdgeValidation = function () {
        var _this = this;
        var graphEdges = this.workflow.workflow.querySelectorAll(".edge");
        this.removeClasses(graphEdges);
        // iterate through all modal connections
        this.workflow.model.connections.forEach(function (e) {
            // if the connection isn't valid (should be colored on graph)
            if (!e.isValid) {
                try {
                    // iterate through edges on the svg
                    for (var graphEdges_1 = __values(graphEdges), graphEdges_1_1 = graphEdges_1.next(); !graphEdges_1_1.done; graphEdges_1_1 = graphEdges_1.next()) {
                        var ge = graphEdges_1_1.value;
                        var sourceNodeID = ge.getAttribute("data-source-connection");
                        var destinationNodeID = ge.getAttribute("data-destination-connection");
                        // compare invalid edge source/destination with svg edge
                        if (e.source.id === sourceNodeID && e.destination.id === destinationNodeID) {
                            // if its a match, tag it with the appropriate class and break from the loop
                            ge.classList.add(_this.css.invalid);
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (graphEdges_1_1 && !graphEdges_1_1.done && (_a = graphEdges_1.return)) _a.call(graphEdges_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            var e_3, _a;
        });
    };
    return SVGValidatePlugin;
}(plugin_base_1.PluginBase));
exports.SVGValidatePlugin = SVGValidatePlugin;
//# sourceMappingURL=validate.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(58);
var plugin_base_1 = __webpack_require__(8);
var edge_panning_1 = __webpack_require__(63);
/**
 * This plugin makes node dragging and movement possible.
 *
 * @FIXME: attach events for before and after change
 */
var SVGNodeMovePlugin = /** @class */ (function (_super) {
    __extends(SVGNodeMovePlugin, _super);
    function SVGNodeMovePlugin(parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this) || this;
        /** How far from the edge of the viewport does mouse need to be before panning is triggered */
        _this.scrollMargin = 50;
        /** How fast does workflow move while panning */
        _this.movementSpeed = 10;
        _this.wheelPrevent = function (ev) { return ev.stopPropagation(); };
        _this.boundMoveHandler = _this.onMove.bind(_this);
        _this.boundMoveStartHandler = _this.onMoveStart.bind(_this);
        _this.boundMoveEndHandler = _this.onMoveEnd.bind(_this);
        _this.detachDragListenerFn = undefined;
        Object.assign(_this, parameters);
        return _this;
    }
    SVGNodeMovePlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            this.attachDrag();
        }
        else {
            this.detachDrag();
        }
    };
    SVGNodeMovePlugin.prototype.afterRender = function () {
        if (this.workflow.editingEnabled) {
            this.attachDrag();
        }
    };
    SVGNodeMovePlugin.prototype.destroy = function () {
        this.detachDrag();
    };
    SVGNodeMovePlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.edgePanner = new edge_panning_1.EdgePanner(this.workflow, {
            scrollMargin: this.scrollMargin,
            movementSpeed: this.movementSpeed
        });
    };
    SVGNodeMovePlugin.prototype.detachDrag = function () {
        if (typeof this.detachDragListenerFn === "function") {
            this.detachDragListenerFn();
        }
        this.detachDragListenerFn = undefined;
    };
    SVGNodeMovePlugin.prototype.attachDrag = function () {
        this.detachDrag();
        this.detachDragListenerFn = this.workflow.domEvents.drag(".node .core", this.boundMoveHandler, this.boundMoveStartHandler, this.boundMoveEndHandler);
    };
    SVGNodeMovePlugin.prototype.getWorkflowMatrix = function () {
        return this.workflow.workflow.transform.baseVal.getItem(0).matrix;
    };
    SVGNodeMovePlugin.prototype.onMove = function (dx, dy, ev) {
        var _this = this;
        /** We will use workflow scale to determine how our mouse movement translate to svg proportions */
        var scale = this.workflow.scale;
        /** Need to know how far did the workflow itself move since when we started dragging */
        var matrixMovement = {
            x: this.getWorkflowMatrix().e - this.startWorkflowTranslation.x,
            y: this.getWorkflowMatrix().f - this.startWorkflowTranslation.y
        };
        /** We might have hit the boundary and need to start panning */
        this.edgePanner.triggerCollisionDetection(ev.clientX, ev.clientY, function (sdx, sdy) {
            _this.sdx += sdx;
            _this.sdy += sdy;
            _this.translateNodeBy(_this.movingNode, sdx, sdy);
            _this.redrawEdges(_this.sdx, _this.sdy);
        });
        /**
         * We need to store scaled ∆x and ∆y because this is not the only place from which node is being moved.
         * If mouse is outside the viewport, and the workflow is panning, startScroll will continue moving
         * this node, so it needs to know where to start from and update it, so this method can take
         * over when mouse gets back to the viewport.
         *
         * If there was no handoff, node would jump back and forth to
         * last positions for each movement initiator separately.
         */
        this.sdx = (dx - matrixMovement.x) / scale;
        this.sdy = (dy - matrixMovement.y) / scale;
        var moveX = this.sdx + this.startX;
        var moveY = this.sdy + this.startY;
        this.translateNodeTo(this.movingNode, moveX, moveY);
        this.redrawEdges(this.sdx, this.sdy);
    };
    /**
     * Triggered from {@link attachDrag} when drag starts.
     * This method initializes properties that are needed for calculations during movement.
     */
    SVGNodeMovePlugin.prototype.onMoveStart = function (event, handle) {
        /** We will query the SVG dom for edges that we need to move, so store svg element for easy access */
        var svg = this.workflow.svgRoot;
        document.addEventListener("mousewheel", this.wheelPrevent, true);
        /** Our drag handle is not the whole node because that would include ports and labels, but a child of it*/
        var node = handle.parentNode;
        /** Store initial transform values so we know how much we've moved relative from the starting position */
        var nodeMatrix = node.transform.baseVal.getItem(0).matrix;
        this.startX = nodeMatrix.e;
        this.startY = nodeMatrix.f;
        /** We have to query for edges that are attached to this node because we will move them as well */
        var nodeID = node.getAttribute("data-id");
        /**
         * When user drags the node to the edge and waits while workflow pans to the side,
         * mouse movement stops, but workflow movement starts.
         * We then utilize this to get movement ∆ of the workflow, and use that for translation instead.
         */
        this.startWorkflowTranslation = {
            x: this.getWorkflowMatrix().e,
            y: this.getWorkflowMatrix().f
        };
        /** Used to determine whether dragged node is hitting the edge, so we can pan the Workflow*/
        this.boundingClientRect = svg.getBoundingClientRect();
        /** Node movement can be initiated from both mouse events and animationFrame, so make it accessible */
        this.movingNode = handle.parentNode;
        /**
         * While node is being moved, incoming and outgoing edges also need to be moved in order to stay attached.
         * We don't want to query them all the time, so we cache them in maps that point from their dom elements
         * to an array of numbers that represent their bezier curves, since we will update those curves.
         */
        this.inputEdges = new Map();
        this.outputEdges = new Map();
        var outputsSelector = ".edge[data-source-node='" + nodeID + "'] .sub-edge";
        var inputsSelector = ".edge[data-destination-node='" + nodeID + "'] .sub-edge";
        var query = svg.querySelectorAll([inputsSelector, outputsSelector].join(", "));
        try {
            for (var query_1 = __values(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
                var subEdge = query_1_1.value;
                var isInput = subEdge.parentElement.getAttribute("data-destination-node") === nodeID;
                var path = subEdge.getAttribute("d").split(" ").map(Number).filter(function (e) { return !isNaN(e); });
                isInput ? this.inputEdges.set(subEdge, path) : this.outputEdges.set(subEdge, path);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (query_1_1 && !query_1_1.done && (_a = query_1.return)) _a.call(query_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    SVGNodeMovePlugin.prototype.translateNodeBy = function (node, x, y) {
        var matrix = node.transform.baseVal.getItem(0).matrix;
        this.translateNodeTo(node, matrix.e + x, matrix.f + y);
    };
    SVGNodeMovePlugin.prototype.translateNodeTo = function (node, x, y) {
        node.transform.baseVal.getItem(0).setTranslate(x, y);
    };
    /**
     * Redraws stored input and output edges so as to transform them with respect to
     * scaled transformation differences, sdx and sdy.
     */
    SVGNodeMovePlugin.prototype.redrawEdges = function (sdx, sdy) {
        this.inputEdges.forEach(function (p, el) {
            var path = _1.Workflow.makeConnectionPath(p[0], p[1], p[6] + sdx, p[7] + sdy);
            el.setAttribute("d", path);
        });
        this.outputEdges.forEach(function (p, el) {
            var path = _1.Workflow.makeConnectionPath(p[0] + sdx, p[1] + sdy, p[6], p[7]);
            el.setAttribute("d", path);
        });
    };
    /**
     * Triggered from {@link attachDrag} after move event ends
     */
    SVGNodeMovePlugin.prototype.onMoveEnd = function () {
        this.edgePanner.stop();
        var id = this.movingNode.getAttribute("data-connection-id");
        var nodeModel = this.workflow.model.findById(id);
        if (!nodeModel.customProps) {
            nodeModel.customProps = {};
        }
        var matrix = this.movingNode.transform.baseVal.getItem(0).matrix;
        Object.assign(nodeModel.customProps, {
            "sbg:x": matrix.e,
            "sbg:y": matrix.f,
        });
        this.onAfterChange({ type: "node-move" });
        document.removeEventListener("mousewheel", this.wheelPrevent, true);
        delete this.startX;
        delete this.startY;
        delete this.movingNode;
        delete this.inputEdges;
        delete this.outputEdges;
        delete this.boundingClientRect;
        delete this.startWorkflowTranslation;
    };
    return SVGNodeMovePlugin;
}(plugin_base_1.PluginBase));
exports.SVGNodeMovePlugin = SVGNodeMovePlugin;
//# sourceMappingURL=node-move.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EdgePanner = /** @class */ (function () {
    function EdgePanner(workflow, config) {
        if (config === void 0) { config = {
            scrollMargin: 100,
            movementSpeed: 10
        }; }
        this.movementSpeed = 10;
        this.scrollMargin = 100;
        /**
         * Current state of collision on both axes, each negative if beyond top/left border,
         * positive if beyond right/bottom, zero if inside the viewport
         */
        this.collision = { x: 0, y: 0 };
        this.panningCallback = function (sdx, sdy) { return void 0; };
        var options = Object.assign({
            scrollMargin: 100,
            movementSpeed: 10
        }, config);
        this.workflow = workflow;
        this.scrollMargin = options.scrollMargin;
        this.movementSpeed = options.movementSpeed;
        this.viewportClientRect = this.workflow.svgRoot.getBoundingClientRect();
    }
    /**
     * Calculates if dragged node is at or beyond the point beyond which workflow panning should be triggered.
     * If collision state has changed, {@link onBoundaryCollisionChange} will be triggered.
     */
    EdgePanner.prototype.triggerCollisionDetection = function (x, y, callback) {
        var collision = { x: 0, y: 0 };
        this.panningCallback = callback;
        var _a = this.viewportClientRect, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        left = left + this.scrollMargin;
        right = right - this.scrollMargin;
        top = top + this.scrollMargin;
        bottom = bottom - this.scrollMargin;
        if (x < left) {
            collision.x = x - left;
        }
        else if (x > right) {
            collision.x = x - right;
        }
        if (y < top) {
            collision.y = y - top;
        }
        else if (y > bottom) {
            collision.y = y - bottom;
        }
        if (Math.sign(collision.x) !== Math.sign(this.collision.x)
            || Math.sign(collision.y) !== Math.sign(this.collision.y)) {
            var previous = this.collision;
            this.collision = collision;
            this.onBoundaryCollisionChange(collision, previous);
        }
    };
    /**
     * Triggered when {@link triggerCollisionDetection} determines that collision properties have changed.
     */
    EdgePanner.prototype.onBoundaryCollisionChange = function (current, previous) {
        this.stop();
        if (current.x === 0 && current.y === 0) {
            return;
        }
        this.start(this.collision);
    };
    EdgePanner.prototype.start = function (direction) {
        var _this = this;
        var startTimestamp;
        var scale = this.workflow.scale;
        var matrix = this.workflow.workflow.transform.baseVal.getItem(0).matrix;
        var sixtyFPS = 16.6666;
        var onFrame = function (timestamp) {
            var frameDeltaTime = timestamp - (startTimestamp || timestamp);
            startTimestamp = timestamp;
            // We need to stop the animation at some point
            // It should be stopped when there is no animation frame ID anymore,
            // which means that stopScroll() was called
            // However, don't do that if we haven't made the first move yet, which is a situation when ∆t is 0
            if (frameDeltaTime !== 0 && !_this.panAnimationFrame) {
                startTimestamp = undefined;
                return;
            }
            var moveX = Math.sign(direction.x) * _this.movementSpeed * frameDeltaTime / sixtyFPS;
            var moveY = Math.sign(direction.y) * _this.movementSpeed * frameDeltaTime / sixtyFPS;
            matrix.e -= moveX;
            matrix.f -= moveY;
            var frameDiffX = moveX / scale;
            var frameDiffY = moveY / scale;
            _this.panningCallback(frameDiffX, frameDiffY);
            _this.panAnimationFrame = window.requestAnimationFrame(onFrame);
        };
        this.panAnimationFrame = window.requestAnimationFrame(onFrame);
    };
    EdgePanner.prototype.stop = function () {
        window.cancelAnimationFrame(this.panAnimationFrame);
        this.panAnimationFrame = undefined;
    };
    return EdgePanner;
}());
exports.EdgePanner = EdgePanner;
//# sourceMappingURL=edge-panning.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SVGEdgeHoverPlugin = /** @class */ (function (_super) {
    __extends(SVGEdgeHoverPlugin, _super);
    function SVGEdgeHoverPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boundEdgeEnterFunction = _this.onEdgeEnter.bind(_this);
        _this.modelListener = {
            dispose: function () { return void 0; }
        };
        return _this;
    }
    SVGEdgeHoverPlugin.prototype.afterRender = function () {
        this.attachEdgeHoverBehavior();
    };
    SVGEdgeHoverPlugin.prototype.destroy = function () {
        this.detachEdgeHoverBehavior();
        this.modelListener.dispose();
    };
    SVGEdgeHoverPlugin.prototype.attachEdgeHoverBehavior = function () {
        this.detachEdgeHoverBehavior();
        this.workflow.workflow.addEventListener("mouseenter", this.boundEdgeEnterFunction, true);
    };
    SVGEdgeHoverPlugin.prototype.detachEdgeHoverBehavior = function () {
        this.workflow.workflow.removeEventListener("mouseenter", this.boundEdgeEnterFunction, true);
    };
    SVGEdgeHoverPlugin.prototype.onEdgeEnter = function (ev) {
        var _this = this;
        // Ignore if we did not enter an edge
        if (!ev.srcElement.classList.contains("edge"))
            return;
        var target = ev.srcElement;
        var tipEl;
        var onMouseMove = (function (ev) {
            var coords = _this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
            tipEl.setAttribute("x", String(coords.x));
            tipEl.setAttribute("y", String(coords.y - 16));
        }).bind(this);
        var onMouseLeave = (function (ev) {
            tipEl.remove();
            target.removeEventListener("mousemove", onMouseMove);
            target.removeEventListener("mouseleave", onMouseLeave);
        }).bind(this);
        this.modelListener = this.workflow.model.on("connection.remove", function (source, destination) {
            if (!tipEl)
                return;
            var _a = __read(tipEl.getAttribute("data-source-destination").split("$!$"), 2), tipS = _a[0], tipD = _a[1];
            if (tipS === source.connectionId && tipD === destination.connectionId) {
                tipEl.remove();
            }
        });
        var sourceNode = target.getAttribute("data-source-node");
        var destNode = target.getAttribute("data-destination-node");
        var sourcePort = target.getAttribute("data-source-port");
        var destPort = target.getAttribute("data-destination-port");
        var sourceConnect = target.getAttribute("data-source-connection");
        var destConnect = target.getAttribute("data-destination-connection");
        var sourceLabel = sourceNode === sourcePort ? sourceNode : sourceNode + " (" + sourcePort + ")";
        var destLabel = destNode === destPort ? destNode : destNode + " (" + destPort + ")";
        var coords = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
        var ns = "http://www.w3.org/2000/svg";
        tipEl = document.createElementNS(ns, "text");
        tipEl.classList.add("label");
        tipEl.classList.add("label-edge");
        tipEl.setAttribute("x", String(coords.x));
        tipEl.setAttribute("y", String(coords.y));
        tipEl.setAttribute("data-source-destination", sourceConnect + "$!$" + destConnect);
        tipEl.innerHTML = sourceLabel + " → " + destLabel;
        this.workflow.workflow.appendChild(tipEl);
        target.addEventListener("mousemove", onMouseMove);
        target.addEventListener("mouseleave", onMouseLeave);
    };
    return SVGEdgeHoverPlugin;
}(plugin_base_1.PluginBase));
exports.SVGEdgeHoverPlugin = SVGEdgeHoverPlugin;
//# sourceMappingURL=edge-hover.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var selection_1 = __webpack_require__(39);
var models_1 = __webpack_require__(25);
var DeletionPlugin = /** @class */ (function (_super) {
    __extends(DeletionPlugin, _super);
    function DeletionPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boundDeleteFunction = _this.onDelete.bind(_this);
        return _this;
    }
    DeletionPlugin.prototype.afterRender = function () {
        this.attachDeleteBehavior();
    };
    DeletionPlugin.prototype.onEditableStateChange = function (enable) {
        if (enable) {
            this.attachDeleteBehavior();
        }
        else {
            this.detachDeleteBehavior();
        }
    };
    DeletionPlugin.prototype.attachDeleteBehavior = function () {
        this.detachDeleteBehavior();
        window.addEventListener("keyup", this.boundDeleteFunction, true);
    };
    DeletionPlugin.prototype.detachDeleteBehavior = function () {
        window.removeEventListener("keyup", this.boundDeleteFunction, true);
    };
    DeletionPlugin.prototype.onDelete = function (ev) {
        if (ev.which !== 8 && ev.which !== 46 || !(ev.target instanceof SVGElement)) {
            return;
        }
        this.deleteSelection();
    };
    DeletionPlugin.prototype.deleteSelection = function () {
        var _this = this;
        var selection = this.workflow.getPlugin(selection_1.SelectionPlugin);
        if (!selection || !this.workflow.editingEnabled) {
            return;
        }
        var selected = selection.getSelection();
        selected.forEach(function (type, id) {
            if (type === "node") {
                var model = _this.workflow.model.findById(id);
                if (model instanceof models_1.StepModel) {
                    _this.workflow.model.removeStep(model);
                    selection.clearSelection();
                }
                else if (model instanceof models_1.WorkflowInputParameterModel) {
                    _this.workflow.model.removeInput(model);
                    selection.clearSelection();
                }
                else if (model instanceof models_1.WorkflowOutputParameterModel) {
                    _this.workflow.model.removeOutput(model);
                    selection.clearSelection();
                }
            }
            else {
                var _a = __read(id.split(selection_1.SelectionPlugin.edgePortsDelimiter), 2), source = _a[0], destination = _a[1];
                _this.workflow.model.disconnect(source, destination);
                selection.clearSelection();
            }
        });
    };
    DeletionPlugin.prototype.destroy = function () {
        this.detachDeleteBehavior();
    };
    return DeletionPlugin;
}(plugin_base_1.PluginBase));
exports.DeletionPlugin = DeletionPlugin;
//# sourceMappingURL=deletion.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./assets/styles/themes/rabix-dark/theme\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./plugins/port-drag/theme.dark.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./plugins/selection/theme.dark.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var models_1 = __webpack_require__(25);
var cwl_svg_1 = __webpack_require__(51);
var sample = "cwl-svg/cwl-samples/rna-seq-alignment.json";
var expand_1 = __webpack_require__(101);
var wf = models_1.WorkflowFactory.from(sample);
var svgRoot = document.getElementById("svg");
var workflow = new cwl_svg_1.Workflow({
    model: wf,
    svgRoot: svgRoot,
    plugins: [new expand_1.default()]
});


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Workflow
__export(__webpack_require__(26));
__export(__webpack_require__(11));
__export(__webpack_require__(18));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(19));
__export(__webpack_require__(20));
// Command Line Tool
__export(__webpack_require__(28));
__export(__webpack_require__(21));
__export(__webpack_require__(10));
__export(__webpack_require__(30));
__export(__webpack_require__(13));
__export(__webpack_require__(33));
__export(__webpack_require__(22));
__export(__webpack_require__(9));
// Common
__export(__webpack_require__(4));
__export(__webpack_require__(32));
__export(__webpack_require__(12));
__export(__webpack_require__(14));
__export(__webpack_require__(34));
__export(__webpack_require__(35));
__export(__webpack_require__(36));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var V1StepModel_1 = __webpack_require__(69);
var V1WorkflowInputParameterModel_1 = __webpack_require__(46);
var V1WorkflowOutputParameterModel_1 = __webpack_require__(42);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowModel = /** @class */ (function (_super) {
    __extends(V1WorkflowModel, _super);
    function V1WorkflowModel(workflow, loc) {
        var _this = _super.call(this, loc || "document") || this;
        _this.cwlVersion = "v1.0";
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.requirements = [];
        _this.customProps = {};
        if (workflow)
            _this.deserialize(workflow);
        _this.graph = _this.constructGraph();
        _this.validateGraph();
        return _this;
    }
    V1WorkflowModel.prototype.addStepFromProcess = function (proc) {
        var _this = this;
        var loc = this.loc + ".steps[" + this.steps.length + "]";
        var step = new V1StepModel_1.V1StepModel({
            in: [],
            out: [],
            run: proc
        }, loc, this.eventHub);
        step.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.steps.push(step);
        step.id = this.getNextAvailableId(step.id);
        this.addStepToGraph(step);
        this.eventHub.emit("step.create", step);
        return step;
    };
    /**
     * Adds Input, Output, or Step to workflow. Does not add them to the graph.
     */
    V1WorkflowModel.prototype.addEntry = function (entry, type) {
        var _this = this;
        entry.loc = this.loc + "." + type + "[" + this[type].length + "]";
        this[type].push(entry);
        entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return entry;
    };
    V1WorkflowModel.prototype.createInputFromPort = function (inPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createInputFromPort.call(this, inPort, V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel, undefined, undefined, data);
    };
    V1WorkflowModel.prototype.createOutputFromPort = function (outPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createOutputFromPort.call(this, outPort, V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel, undefined, undefined, data);
    };
    V1WorkflowModel.prototype.exposePort = function (inPort) {
        var port = _super.prototype._exposePort.call(this, inPort, V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel);
        port.customProps["sbg:exposed"] = true;
        port.isVisible = false;
    };
    V1WorkflowModel.prototype.getSourceConnectionId = function (source) {
        if (/[\/]+/.test(source)) {
            return constants_1.STEP_OUTPUT_CONNECTION_PREFIX + source;
        }
        else {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + source + "/" + source;
        }
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    V1WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        if (/[\/]+/.test(source)) {
            var split = source.split('/');
            if (split[0] === stepId)
                return split[1];
            return null;
        }
        return null;
    };
    V1WorkflowModel.prototype.addHint = function (hint) {
        return this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, undefined, true);
    };
    V1WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    V1WorkflowModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    V1WorkflowModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.class = "Workflow";
        base.cwlVersion = "v1.0";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        //@todo SERIALIZING HINTS AND REQUIREMENTS
        base.inputs = this.inputs.map(function (input) { return input.serialize(); });
        base.outputs = this.outputs.map(function (output) { return output.serialize(); });
        base.steps = this.steps.map(function (step) {
            if (embed) {
                return step.serializeEmbedded(retainSource);
            }
            else {
                return step.serialize();
            }
        });
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        // adding the proper requirements based on the features of the workflow
        var requirements = utils_1.ensureArray(this.customProps.requirements, "class", "value") || [];
        var allStepsHaveRun = true;
        var reqMap = {
            SubworkflowFeatureRequirement: false,
            ScatterFeatureRequirement: false,
            MultipleInputFeatureRequirement: false
        };
        // feature detection
        for (var i = 0; i < this.steps.length; i++) {
            var step = this.steps[i];
            if (step.run && step.run instanceof WorkflowModel_1.WorkflowModel) {
                reqMap.SubworkflowFeatureRequirement = true;
            }
            else if (!step.run) {
                allStepsHaveRun = false;
            }
            if (step.scatter.length) {
                reqMap.ScatterFeatureRequirement = true;
            }
            for (var j = 0; j < step.in.length; j++) {
                var inPort = step.in[j];
                if (inPort.source && inPort.source.length > 1) {
                    reqMap.MultipleInputFeatureRequirement = true;
                }
            }
        }
        var _loop_1 = function (req) {
            // only remove SubworkflowFeatureRequirement if we know the run type of all steps
            if (allStepsHaveRun || req !== "SubworkflowFeatureRequirement") {
                // remove each requirement first
                requirements = requirements.filter(function (r) { return r.class !== req; });
            }
            // re-add it only if it's needed
            if (reqMap[req]) {
                requirements.push({
                    class: req
                });
            }
        };
        // requirement setting
        for (var req in reqMap) {
            _loop_1(req);
        }
        base.requirements = requirements;
        delete this.customProps.requirements;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1WorkflowModel.prototype.deserialize = function (workflow) {
        var _this = this;
        var serializedKeys = [
            "class",
            "id",
            "inputs",
            "outputs",
            "steps",
            "cwlVersion",
            "doc",
            "label",
            "hints"
        ];
        //@todo DESERIALIZING HINTS AND REQUIREMENTS
        this.id = this.id = workflow["sbg:id"] && workflow["sbg:id"].split("/").length > 2 ?
            workflow["sbg:id"].split("/")[2] :
            utils_1.snakeCase(workflow.id);
        this.sbgId = workflow["sbg:id"];
        this.label = workflow.label;
        this.description = workflow.doc;
        utils_1.ensureArray(workflow.inputs, "id", "type").forEach(function (input, i) {
            _this.addEntry(new V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel(input, _this.loc + ".inputs[" + i + "]", _this.eventHub), "inputs");
        });
        utils_1.ensureArray(workflow.outputs, "id", "type").forEach(function (output, i) {
            _this.addEntry(new V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel(output, _this.loc + ".outputs[" + i + "]", _this.eventHub), "outputs");
        });
        utils_1.ensureArray(workflow.steps, "id").forEach(function (step, i) {
            if (step.run && typeof step.run !== "string") {
                step.run.cwlVersion = step.run.cwlVersion || "v1.0";
            }
            _this.addEntry(new V1StepModel_1.V1StepModel(step, _this.loc + ".steps[" + i + "]", _this.eventHub), "steps");
        });
        this.hints = utils_1.ensureArray(workflow.hints).map(function (hint, i) {
            return _this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(workflow, this.customProps, serializedKeys);
    };
    return V1WorkflowModel;
}(WorkflowModel_1.WorkflowModel));
exports.V1WorkflowModel = V1WorkflowModel;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolFactory_1 = __webpack_require__(28);
var ExpressionToolModel_1 = __webpack_require__(50);
var StepModel_1 = __webpack_require__(18);
var WorkflowFactory_1 = __webpack_require__(26);
var WorkflowModel_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(0);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowStepInputModel_1 = __webpack_require__(86);
var V1WorkflowStepOutputModel_1 = __webpack_require__(87);
var V1StepModel = /** @class */ (function (_super) {
    __extends(V1StepModel, _super);
    function V1StepModel(step, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this["in"] = [];
        _this.out = [];
        _this.hasMultipleScatter = true;
        _this.hasScatterMethod = true;
        if (step)
            _this.deserialize(step);
        return _this;
    }
    V1StepModel.prototype.addHint = function (hint) {
        return this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, undefined, true);
    };
    V1StepModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    V1StepModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    V1StepModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.id = this.id;
        base.in = this.in.map(function (i) { return i.serialize(); }).filter(function (i) {
            var keys = Object.keys(i);
            return !(keys.length === 1 && keys[0] === "id");
        });
        base.out = this.out.map(function (o) { return o.serialize(); });
        if (this.customProps["sbg:rdfId"] && !embed) {
            base.run = this.customProps["sbg:rdfId"];
        }
        else if (embed && this.run && this.run instanceof WorkflowModel_1.WorkflowModel) {
            base.run = this.run.serializeEmbedded();
        }
        else if (this.run && typeof this.run.serialize === "function") {
            base.run = this.run.serialize();
        }
        else {
            base.run = this.runPath;
        }
        // to preserve rdfId and rdfSource in the model
        var temp = __assign({}, this.customProps);
        if (!retainSource) {
            delete temp["sbg:rdfId"];
            delete temp["sbg:rdfSource"];
        }
        if (this._label)
            base.label = this.label;
        if (this.description)
            base.doc = this.description;
        if (this.scatter.length)
            base.scatter = this.scatter;
        if (this.scatterMethod)
            base.scatterMethod = this.scatterMethod;
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        return utils_1.spreadAllProps(base, temp);
    };
    V1StepModel.prototype.deserialize = function (step) {
        var _this = this;
        var serializedKeys = [
            "id",
            "doc",
            "label",
            "run",
            "scatter",
            "scatterMethod",
            "in",
            "out",
            "hints"
        ];
        this.id = step.id || "";
        this.description = step.doc;
        this._label = step.label;
        var hasRun = step.run && step.run.class;
        if (typeof step.run === "string") {
            console.warn("Expected to get json for step.run at " + this.loc + ", reading in and out from step");
            this.runPath = step.run;
        }
        else if (hasRun) {
            this.createRun(step.run);
        }
        this.in = utils_1.ensureArray(step.in, "id", "source")
            .map(function (i, index) { return new V1WorkflowStepInputModel_1.V1WorkflowStepInputModel(i, _this, _this.loc + ".in[" + index + "]"); });
        this.out = utils_1.ensureArray(step.out, "id")
            .map(function (o, index) { return new V1WorkflowStepOutputModel_1.V1WorkflowStepOutputModel(o, _this, _this.loc + ".out[" + index + "]"); });
        if (hasRun) {
            this.compareInPorts();
            this.compareOutPorts();
        }
        this.in.forEach(function (i) {
            // if in type is a required file/directory or required array of files/directories
            // include it by default
            if (i.type &&
                !i.type.isNullable &&
                (i.type.type === "File" ||
                    i.type.items === "File" ||
                    i.type.type === "Directory" ||
                    i.type.items === "Directory")) {
                i.isVisible = true;
            }
        });
        //@todo: generalize and parse requirements and hints
        this.requirements = utils_1.ensureArray(step.requirements, "class");
        this.hints = utils_1.ensureArray(step.hints).map(function (hint, i) {
            return _this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        this.scatter = utils_1.ensureArray(step.scatter);
        this.scatterMethod = step.scatterMethod;
        utils_1.spreadSelectProps(step, this.customProps, serializedKeys);
    };
    V1StepModel.prototype.setRunProcess = function (process) {
        if (process && process.class) {
            this.createRun(process);
            this.compareInPorts(true);
            this.compareOutPorts(true);
            this.eventHub.emit("step.update", this);
        }
    };
    V1StepModel.prototype.createRun = function (process) {
        switch (process.class) {
            case "Workflow":
                this.run = WorkflowFactory_1.WorkflowFactory.from(process, this.loc + ".run");
                break;
            case "CommandLineTool":
                this.run = CommandLineToolFactory_1.CommandLineToolFactory.from(process, this.loc + ".run");
                break;
            case "ExpressionTool":
                this.run = new ExpressionToolModel_1.ExpressionToolModel(process);
                break;
            default:
                throw new Error("Unknown process class \"" + process.class + "\" at " + this.loc + ".step. Expected \"CommandLineTool\", \"Workflow\", or \"ExpressionTool\"");
        }
        // when the step is being updated, the ID will not change
        this.id = this.id || utils_1.snakeCase(this.run.id) || utils_1.snakeCase(this.loc);
        this._label = this._label || this.run.label || "";
    };
    V1StepModel.prototype.compareInPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runInputs = this.run.inputs;
        var inserted = [], removed, remaining;
        remaining = this.in;
        // only send events for creating, removing and updating ports if the run is being updated
        // when the workflow is initialized the first time, all this will happen automatically
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.in, this.run.inputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            // emit an event about the in port being removed so the workflow can remove it from the graph
            removed.forEach(function (r) { return _this.eventHub.emit("step.inPort.remove", r); });
            // fyi: inserted and remaining nodes are updated in the graph after the model is created because
            // 1. inserted array is of InputParamModel and doesn't have connectionId (can't be added to graph)
            // 2. remaining array doesn't have now info yet (changed type, fileTypes, etc)
        }
        // because type cannot be check on the level of the step
        // (step.in is just the id of the incoming port),
        // type and fileTypes from the app's inputs are spliced into the in ports.
        // Type validation is done for connections based on this information
        this.in = runInputs.map(function (input, index) {
            var match = remaining.find(function (port) { return input.id === port.id; });
            // serialize the match to create a new input from it
            var serialized = match ? match.serialize() : { id: input.id };
            // here will set source and default if they exist
            var model = new V1WorkflowStepInputModel_1.V1WorkflowStepInputModel(__assign({ type: input.type, fileTypes: input.fileTypes || [], doc: input.description, label: input.label, "sbg:toolDefaultValue": input.customProps["sbg:toolDefaultValue"], "sbg:category": input.customProps["sbg:category"], "sbg:altPrefix": input.customProps["sbg:altPrefix"] }, serialized // serialized match goes last so changed properties are overwritten
            ), _this, _this.loc + ".in[" + index + "]");
            model.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // in case the port was inserted, signify to parent workflow that
            // it should be added to the graph
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.inPort.create", model);
            }
            // in case there is a match and the step is being updated, signify to parent workflow
            // to update node info in graph
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            // maintain the same visibility of the port
            // if the match was found, set to old visibility. If not, show if it's a required file
            model.isVisible = match ? (match.isVisible || utils_1.isFileType(model, true)) : utils_1.isFileType(model, true);
            var matchExistedAndWasChanged = (match ? match.isVisible !== model.isVisible : true);
            // notify the canvas that it should display this port but only if its visibility has changed
            if (model.isVisible && isUpdate && matchExistedAndWasChanged) {
                // wrapping this in a setTimeout so it will execute in the next tick
                // the svg relies on model.parentStep being correct, which can only happen
                // after this.in is set, so after all iterations
                setTimeout(function () {
                    _this.eventHub.emit("step.inPort.show", model);
                });
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    V1StepModel.prototype.compareOutPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runOutputs = this.run.outputs;
        var inserted = [], removed, remaining;
        // only send events for creating, removing, and updating ports if the run is being updated
        // when the workflow is initialized the first time, all this will happen automatically
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.out, this.run.outputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            // emit an event about the in port being removed so the workflow can remove it from the graph
            removed.forEach(function (r) { return _this.eventHub.emit("step.outPort.remove", r); });
        }
        this.out = runOutputs.map(function (output, index) {
            var match = _this.out.find(function (port) { return port.id === output.id; });
            match = match ? match.serialize() : { id: output.id };
            var model = new V1WorkflowStepOutputModel_1.V1WorkflowStepOutputModel(__assign({ type: output.type, format: output.fileTypes || [], doc: output.description, label: output.label }, match), _this, _this.loc + ".out[" + index + "]");
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.outPort.create", model);
            }
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    return V1StepModel;
}(StepModel_1.StepModel));
exports.V1StepModel = V1StepModel;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLinePart_1 = __webpack_require__(29);
var CommandLinePrepare_1 = __webpack_require__(43);
var utils_1 = __webpack_require__(0);
var JobHelper_1 = __webpack_require__(23);
exports.generateCommandLineParts = function (tool, jobInputs, runtime) {
    var flatInputs = CommandLinePrepare_1.CommandLinePrepare.flattenInputsAndArgs([].concat(tool.arguments).concat(tool.inputs));
    var job = utils_1.isEmpty(jobInputs) ? // if job has not been populated
     __assign({ inputs: JobHelper_1.JobHelper.getJobInputs(tool) }, { runtime: runtime }) : // supply dummy values
        tool.getContext(); // otherwise use job
    var flatJobInputs = CommandLinePrepare_1.CommandLinePrepare.flattenJob(job.inputs || job, {});
    var baseCmdPromise = tool.baseCommand.map(function (cmd, index) {
        var loc = tool.loc + ".baseCommand[" + index + "]";
        return CommandLinePrepare_1.CommandLinePrepare.prepare(cmd, flatJobInputs, tool.getContext(), loc, "baseCommand").then(function (suc) {
            if (suc instanceof CommandLinePart_1.CommandLinePart)
                return suc;
            return new CommandLinePart_1.CommandLinePart(suc, "baseCommand", loc);
        }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
        });
    });
    var inputPromise = flatInputs.map(function (input) {
        return CommandLinePrepare_1.CommandLinePrepare.prepare(input, flatJobInputs, tool.getContext(input), input.loc);
    }).filter(function (i) { return i instanceof Promise; }).map(function (promise) {
        return promise.then(function (succ) { return succ; }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type);
        });
    });
    var stdOutPromise = CommandLinePrepare_1.CommandLinePrepare.prepare(tool.stdout, flatJobInputs, tool.getContext(), tool.stdout.loc, "stdout");
    var stdInPromise = CommandLinePrepare_1.CommandLinePrepare.prepare(tool.stdin, flatJobInputs, tool.getContext(), tool.stdin.loc, "stdin");
    return Promise.all([].concat(baseCmdPromise, inputPromise, stdOutPromise, stdInPromise)).then(function (parts) {
        return parts.filter(function (part) { return part !== null; });
    });
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var CommandLinePart_1 = __webpack_require__(29);
var CommandLinePrepare_1 = __webpack_require__(43);
var TypeResolver_1 = __webpack_require__(27);
var V1CommandArgumentModel_1 = __webpack_require__(44);
var V1ExpressionModel_1 = __webpack_require__(5);
var CommandLineParsers = /** @class */ (function () {
    function CommandLineParsers() {
    }
    CommandLineParsers.primitive = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        var valueExists = value !== undefined && value !== null;
        var checkedValue = valueExists ? value : job[input.id];
        if (checkedValue !== null && checkedValue !== undefined) {
            if (checkedValue.hasOwnProperty("path")) {
                checkedValue = checkedValue.path;
            }
            else if (checkedValue.hasOwnProperty("location")) {
                checkedValue = checkedValue.location;
            }
        }
        if (input.inputBinding.valueFrom && input.inputBinding.valueFrom.serialize() !== undefined) {
            return input.inputBinding.valueFrom.evaluate(context)
                .then(function (res) {
                return new CommandLinePart_1.CommandLinePart(prefix + separator + res, cmdType, loc);
            }, function (err) {
                return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
            });
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix + separator + checkedValue, cmdType, loc));
        });
    };
    CommandLineParsers.string = function (input, job, value, context, type, loc) {
        return new Promise(function (res, rej) {
            res(new CommandLinePart_1.CommandLinePart(input, type, loc));
        });
    };
    CommandLineParsers.boolean = function (input, job, value, context, type, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var result = "";
        var prefix = input.inputBinding.prefix || "";
        var itemsPrefix = (input.type.typeBinding && input.type.typeBinding.prefix)
            ? input.type.typeBinding.prefix : '';
        var separator = input.inputBinding.separate !== false ? " " : "";
        value = value || job[input.id];
        if (value) {
            prefix = input.type.items === "boolean" ? itemsPrefix : prefix;
            if (input.inputBinding.valueFrom && input.inputBinding.valueFrom.serialize() !== undefined) {
                return input.inputBinding.valueFrom.evaluate(context)
                    .then(function (res) {
                    return new CommandLinePart_1.CommandLinePart(prefix + separator + res, type, loc);
                }, function (err) {
                    return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
                });
            }
            result = prefix;
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(result, type, loc));
        });
    };
    CommandLineParsers.record = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix + separator, cmdType, loc));
        });
    };
    CommandLineParsers.array = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        value = value || job[input.id] || [];
        value = value.map(function (val) { return val && val.hasOwnProperty("path") ? val.path : val; });
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        var itemSeparator = typeof input.inputBinding.itemSeparator === "string" ?
            input.inputBinding.itemSeparator : " ";
        return Promise.all(value.map(function (val, index) {
            return Object.assign({}, input, {
                id: index,
                type: input.type.items,
                inputBinding: input.type.typeBinding || {}
            }, { items: undefined });
        }).map(function (item) {
            return CommandLinePrepare_1.CommandLinePrepare.prepare(item, value, value[item.id]);
        })).then(function (res) {
            return new CommandLinePart_1.CommandLinePart(prefix + separator + res.map(function (part) { return part.value; }).join(itemSeparator), cmdType, loc);
        });
    };
    CommandLineParsers.expression = function (expr, job, value, context, cmdType, loc) {
        return expr.evaluate(context).then(function (res) {
            return res === undefined ? "" : res;
        }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
        });
    };
    CommandLineParsers.argument = function (arg, job, value, context, cmdType, loc) {
        if (arg.primitive) {
            if (arg instanceof V1CommandArgumentModel_1.V1CommandArgumentModel) {
                var expr = new V1ExpressionModel_1.V1ExpressionModel(arg.primitive, arg.loc);
                if (expr.isExpression) {
                    return CommandLineParsers.expression(expr, job, value, context, cmdType, loc).then(function (res) {
                        if (res instanceof CommandLinePart_1.CommandLinePart)
                            return res;
                        return new CommandLinePart_1.CommandLinePart(res, "argument", loc);
                    });
                }
            }
            return new Promise(function (res) {
                res(new CommandLinePart_1.CommandLinePart(arg.primitive, "argument", loc));
            });
        }
        var prefix = arg.prefix || "";
        var separator = arg.separate !== false ? " " : "";
        if (arg.valueFrom) {
            return CommandLinePrepare_1.CommandLinePrepare.prepare(arg.valueFrom, job, context, loc).then(function (res) {
                if (res instanceof CommandLinePart_1.CommandLinePart) {
                    return res;
                }
                return new CommandLinePart_1.CommandLinePart(prefix + separator + res, cmdType, loc);
            });
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix, "input", loc));
        });
    };
    CommandLineParsers.stream = function (stream, job, value, context, cmdType, loc) {
        if (stream instanceof ExpressionModel_1.ExpressionModel) {
            return CommandLineParsers.expression(stream, job, value, context, cmdType, loc).then(function (res) {
                if (res instanceof CommandLinePart_1.CommandLinePart) {
                    return res;
                }
                else {
                    var prefix = res ? (cmdType === "stdin" ? "< " : "> ") : "";
                    return new CommandLinePart_1.CommandLinePart(prefix + res, cmdType, loc);
                }
            });
        }
    };
    CommandLineParsers.nullValue = function () {
        return new Promise(function (res) {
            res(null);
        });
    };
    CommandLineParsers.checkMismatch = function (input, job, value) {
        value = value || job[input.id];
        if (input === null || input.type === null) {
            return;
        }
        // If type declared does not match type of value, throw error
        if (!TypeResolver_1.TypeResolver.doesTypeMatch(input.type.type, value)) {
            // If there are items, only throw exception if items don't match either
            if (!input.type.items || !TypeResolver_1.TypeResolver.doesTypeMatch(input.type.items, value)) {
                // should be warning on input, not throw an exception
                // throw(`Mismatched value and type definition expected for ${input.id}. ${input.type.type}
                // or ${input.type.items}, but instead got ${typeof value}`);
            }
        }
    };
    return CommandLineParsers;
}());
exports.CommandLineParsers = CommandLineParsers;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(21);
var DockerRequirementModel_1 = __webpack_require__(32);
var RequirementBaseModel_1 = __webpack_require__(14);
var JobHelper_1 = __webpack_require__(23);
var utils_1 = __webpack_require__(0);
var V1CommandArgumentModel_1 = __webpack_require__(44);
var V1CommandInputParameterModel_1 = __webpack_require__(31);
var V1CommandOutputParameterModel_1 = __webpack_require__(47);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1InitialWorkDirRequirementModel_1 = __webpack_require__(73);
var V1InlineJavascriptRequirementModel_1 = __webpack_require__(75);
var V1ResourceRequirementModel_1 = __webpack_require__(76);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var sbg_expression_lib_1 = __webpack_require__(77);
var ExpressionEvaluator_1 = __webpack_require__(17);
var V1CommandOutputBindingModel_1 = __webpack_require__(48);
var V1CommandLineToolModel = /** @class */ (function (_super) {
    __extends(V1CommandLineToolModel, _super);
    function V1CommandLineToolModel(json, loc) {
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "v1.0";
        _this.inputs = [];
        _this.outputs = [];
        _this.baseCommand = [];
        _this.arguments = [];
        _this.hasStdErr = true;
        // Context for JavaScript execution
        _this.runtime = {};
        _this.initializeExprWatchers();
        if (json)
            _this.deserialize(json);
        _this.constructed = true;
        _this.validateAllExpressions();
        _this.initializeJobWatchers();
        _this.initializeInlineJSWatchers();
        return _this;
    }
    V1CommandLineToolModel.prototype.initializeInlineJSWatchers = function () {
        var _this = this;
        this.eventHub.on("output.metadata.inherit", function () {
            _this.inlineJavascriptRequirement.addExpressionLib(sbg_expression_lib_1.sbgHelperLibrary);
        });
    };
    // EXPRESSION CONTEXT //
    V1CommandLineToolModel.prototype.setRuntime = function (runtime) {
        if (runtime === void 0) { runtime = {}; }
        this.runtime.cores = runtime.cores !== undefined ? runtime.cores : this.runtime.cores;
        this.runtime.ram = runtime.ram !== undefined ? runtime.ram : this.runtime.ram;
    };
    V1CommandLineToolModel.prototype.resetJobDefaults = function () {
        this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        this.updateCommandLine();
    };
    V1CommandLineToolModel.prototype.getContext = function (port) {
        var context = {
            runtime: this.runtime,
            inputs: this.jobInputs
        };
        ExpressionEvaluator_1.ExpressionEvaluator.libraries = this.inlineJavascriptRequirement.expressionLib;
        if (port && port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            if (port.isField) {
                var root = this.findFieldRoot(port, this.jobInputs);
                context.self = root ? root[port.id] : null;
            }
            else {
                context.self = this.jobInputs ? this.jobInputs[port.id] : null;
            }
        }
        if (port && port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            context.self = JobHelper_1.JobHelper.generateMockJobData({
                type: {
                    type: "array",
                    items: "File"
                }
            });
        }
        return context;
    };
    ;
    V1CommandLineToolModel.prototype.addHint = function (hint) {
        var _this = this;
        var h = new RequirementBaseModel_1.RequirementBaseModel(hint, V1ExpressionModel_1.V1ExpressionModel, this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        h.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.hints.push(h);
        return h;
    };
    V1CommandLineToolModel.prototype.addOutput = function (output) {
        return _super.prototype._addOutput.call(this, V1CommandOutputParameterModel_1.V1CommandOutputParameterModel, output);
    };
    V1CommandLineToolModel.prototype.addInput = function (input) {
        return _super.prototype._addInput.call(this, V1CommandInputParameterModel_1.V1CommandInputParameterModel, input);
    };
    V1CommandLineToolModel.prototype.addArgument = function (arg) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.arguments, this.loc + ".arguments");
        var a = new V1CommandArgumentModel_1.V1CommandArgumentModel(arg, loc, this.eventHub);
        this.arguments.push(a);
        a.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.eventHub.emit("argument.create", arg);
        return a;
    };
    V1CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        this.baseCommand.push(cmd);
    };
    V1CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        this.createReq(req, null, hint);
    };
    V1CommandLineToolModel.prototype.createReq = function (req, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        switch (req.class) {
            case "DockerRequirement":
                this.docker = new DockerRequirementModel_1.DockerRequirementModel(req, this.docker ? this.docker.loc || loc : loc);
                this.docker.isHint = hint;
                this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "InitialWorkDirRequirement":
                loc = this.fileRequirement ? this.fileRequirement.loc || loc : loc;
                this.fileRequirement = new V1InitialWorkDirRequirementModel_1.V1InitialWorkDirRequirementModel(req, loc, this.eventHub);
                this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.fileRequirement.isHint = hint;
                return;
            case "ResourceRequirement":
                loc = this.resources ? this.resources.loc || loc : loc;
                this.resources = new V1ResourceRequirementModel_1.V1ResourceRequirementModel(req, loc, this.eventHub);
                this.resources.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.resources.isHint = hint;
                return;
            case "InlineJavascriptRequirement":
                loc = this.inlineJavascriptRequirement ? this.inlineJavascriptRequirement.loc || loc : loc;
                this.inlineJavascriptRequirement = new V1InlineJavascriptRequirementModel_1.V1InlineJavascriptRequirementModel(req, loc);
                this.inlineJavascriptRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.inlineJavascriptRequirement.isHint = hint;
                this.inlineJavascriptRequirement.wasPresent = true;
                return;
            default:
                reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, V1ExpressionModel_1.V1ExpressionModel, loc, this.eventHub);
                reqModel.isHint = hint;
        }
        if (reqModel) {
            this[property].push(reqModel);
            reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    V1CommandLineToolModel.prototype.updateStream = function (stream, type) {
        var _this = this;
        this[type] = stream;
        stream.loc = this.loc + "." + type;
        stream.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    // SERIALIZATION //
    V1CommandLineToolModel.prototype.deserialize = function (tool) {
        var _this = this;
        var serializedKeys = [
            "baseCommand",
            "stdout",
            "stdin",
            "stderr",
            "successCodes",
            "temporaryFailCodes",
            "permanentFailCodes",
            "inputs",
            "outputs",
            "id",
            "class",
            "cwlVersion",
            "doc",
            "label",
            "arguments",
            "hints",
            "requirements"
        ];
        this.id = this.id = tool["sbg:id"] && tool["sbg:id"].split("/").length > 2 ?
            tool["sbg:id"].split("/")[2] :
            utils_1.snakeCase(tool.id);
        this.description = tool.doc;
        this.label = tool.label;
        this.baseCommand = utils_1.charSeparatedToArray(tool.baseCommand, /\s+/);
        utils_1.ensureArray(tool.inputs, "id", "type").map(function (inp) { return _this.addInput(inp); });
        utils_1.ensureArray(tool.outputs, "id", "type").map(function (out) { return _this.addOutput(out); });
        this.arguments = utils_1.ensureArray(tool.arguments).map(function (arg) { return _this.addArgument(arg); });
        utils_1.ensureArray(tool.hints, "class", "value").map(function (h, i) { return _this.createReq(h, null, true); });
        utils_1.ensureArray(tool.requirements, "class", "value").map(function (r, i) { return _this.createReq(r); });
        var counter = this.requirements.length;
        // create DockerRequirement for manipulation
        if (!this.docker) {
            this.docker = new DockerRequirementModel_1.DockerRequirementModel({}, this.loc + ".requirements[" + ++counter + "]");
        }
        this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create InitialWorkDirRequirement for manipulation
        if (!this.fileRequirement) {
            this.fileRequirement = new V1InitialWorkDirRequirementModel_1.V1InitialWorkDirRequirementModel({}, this.loc + ".requirements[" + ++counter + "]", this.eventHub);
        }
        this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create ResourceRequirement for manipulation
        if (!this.resources) {
            this.resources = new V1ResourceRequirementModel_1.V1ResourceRequirementModel({}, this.loc + ".requirements[" + ++counter + "]", this.eventHub);
        }
        this.resources.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create InlineJavascriptRequirement for manipulation
        if (!this.inlineJavascriptRequirement) {
            this.inlineJavascriptRequirement = new V1InlineJavascriptRequirementModel_1.V1InlineJavascriptRequirementModel({}, this.loc + ".requirements[" + ++counter + "]");
        }
        this.stdin = new V1ExpressionModel_1.V1ExpressionModel(tool.stdin, this.loc + ".stdin", this.eventHub);
        this.stdin.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.stdout = new V1ExpressionModel_1.V1ExpressionModel(tool.stdout, this.loc + ".stdout", this.eventHub);
        this.stdout.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.stderr = new V1ExpressionModel_1.V1ExpressionModel(tool.stderr, this.loc + ".stderr", this.eventHub);
        this.stderr.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.runtime = { cores: 1, ram: 1000 };
        if (tool["sbg:job"]) {
            this.jobInputs = __assign({}, JobHelper_1.JobHelper.getNullJobInputs(this), tool["sbg:job"].inputs);
            this.runtime = __assign({}, this.runtime, tool["sbg:job"].runtime);
        }
        else {
            this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        }
        this.sbgId = tool["sbg:id"];
        this.successCodes = utils_1.ensureArray(tool.successCodes);
        this.temporaryFailCodes = utils_1.ensureArray(tool.temporaryFailCodes);
        this.permanentFailCodes = utils_1.ensureArray(tool.permanentFailCodes);
        utils_1.spreadSelectProps(tool, this.customProps, serializedKeys);
    };
    V1CommandLineToolModel.prototype.serialize = function () {
        var base = {};
        var hasShellQuote = false;
        var hasExpression = false;
        var shellWatcherDispose = this.eventHub.on("binding.shellQuote", function (data) {
            hasShellQuote = data;
        });
        var expressionWatcherDispose = this.eventHub.on("expression.serialize", function (data) {
            hasExpression = data;
        });
        base.class = "CommandLineTool";
        base.cwlVersion = "v1.0";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        base.baseCommand = this.baseCommand.filter(function (b) { return !!b; });
        base.inputs = this.inputs.map(function (i) { return i.serialize(); });
        base.outputs = this.outputs.map(function (o) { return o.serialize(); });
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        if (this.arguments.length) {
            base.arguments = this.arguments.map(function (a) { return a.serialize(); }).filter(function (a) { return !!a; });
        }
        // Add ShellCommandRequirement if any CommandLineBinding has shellQuote
        // remove requirement if no CommandLineBinding has shellQuote
        var shellReqIndex = this.requirements.findIndex((function (req) { return req.class === "ShellCommandRequirement"; }));
        if (hasShellQuote) {
            base.requirements = [];
            if (shellReqIndex === -1) {
                base.requirements.push({
                    "class": "ShellCommandRequirement"
                });
            }
        }
        else if (shellReqIndex > -1) {
            this.requirements.splice(shellReqIndex, 1);
        }
        shellWatcherDispose();
        // REQUIREMENTS && HINTS
        base.requirements = base.requirements || [];
        base.hints = [];
        if (this.requirements.length) {
            this.requirements.filter(function (r) { return !!r; }).forEach(function (r) { return base.requirements.push(r.serialize()); });
        }
        if (this.hints.length) {
            this.hints.forEach(function (h) { return base.hints.push(h.serialize()); });
        }
        if (this.resources.serialize()) {
            var dest = this.resources.isHint ? "hints" : "requirements";
            base[dest].push(this.resources.serialize());
        }
        if (this.docker.serialize()) {
            var dest = this.docker.isHint ? "hints" : "requirements";
            base[dest].push(this.docker.serialize());
        }
        if (this.fileRequirement.serialize()) {
            var dest = this.fileRequirement.isHint ? "hints" : "requirements";
            base[dest].push(this.fileRequirement.serialize());
        }
        if (!base.requirements.length)
            delete base.requirements;
        if (!base.hints.length)
            delete base.hints;
        if (this.stdin.serialize() !== undefined)
            base.stdin = this.stdin.serialize();
        if (this.stdout.serialize() !== undefined)
            base.stdout = this.stdout.serialize();
        if (this.stderr.serialize() !== undefined)
            base.stderr = this.stderr.serialize();
        if (this.successCodes.length) {
            base.successCodes = this.successCodes;
        }
        if (this.temporaryFailCodes.length) {
            base.temporaryFailCodes = this.temporaryFailCodes;
        }
        if (this.permanentFailCodes.length) {
            base.permanentFailCodes = this.permanentFailCodes;
        }
        // remove expression lib if it is no longer necessary (no output inherits metadata)
        var hasMetadataScript = false;
        for (var i = 0; i < base.outputs.length; i++) {
            var out = base.outputs[i];
            if (out.outputBinding && new RegExp(V1CommandOutputBindingModel_1.V1CommandOutputBindingModel.INHERIT_REGEX).test(out.outputBinding.outputEval)) {
                hasMetadataScript = true;
                break;
            }
        }
        if (!hasMetadataScript) {
            this.inlineJavascriptRequirement.removeExpressionLib(sbg_expression_lib_1.sbgHelperLibrary);
        }
        // for the InlineJavascriptRequirement,
        // serialize it if there are expression libs so they aren't lost
        if (this.inlineJavascriptRequirement.expressionLib.length > 0 || this.inlineJavascriptRequirement.wasPresent) {
            base.requirements = base.requirements || [];
            base.requirements.push(this.inlineJavascriptRequirement.serialize());
            // if there are no expression libs,
            // create requirement only if there are expressions
        }
        else if (hasExpression) {
            base.requirements = base.requirements || [];
            base.requirements.push({
                "class": "InlineJavascriptRequirement"
            });
        }
        expressionWatcherDispose();
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1CommandLineToolModel;
}(CommandLineToolModel_1.CommandLineToolModel));
exports.V1CommandLineToolModel = V1CommandLineToolModel;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateFileRequirementModel_1 = __webpack_require__(34);
var V1DirentModel_1 = __webpack_require__(74);
var utils_1 = __webpack_require__(0);
var ExpressionModel_1 = __webpack_require__(9);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1InitialWorkDirRequirementModel = /** @class */ (function (_super) {
    __extends(V1InitialWorkDirRequirementModel, _super);
    function V1InitialWorkDirRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this['class'] = "InitialWorkDirRequirement";
        _this.listing = [];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1InitialWorkDirRequirementModel.prototype.addDirent = function (d) {
        var _this = this;
        var dirent = new V1DirentModel_1.V1DirentModel(d, this.loc + ".listing[" + this.listing.length + "]", this.eventHub);
        dirent.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.listing.push(dirent);
        return dirent;
    };
    V1InitialWorkDirRequirementModel.prototype.addExpression = function (e) {
        var _this = this;
        if (e === void 0) { e = ""; }
        var expression = new V1ExpressionModel_1.V1ExpressionModel(e, this.loc + ".listing[" + this.listing.length + "]", this.eventHub);
        expression.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.listing.push(expression);
        return expression;
    };
    V1InitialWorkDirRequirementModel.prototype.serialize = function () {
        var base = {
            'class': "InitialWorkDirRequirement",
            listing: this.listing.reduce(function (acc, item) {
                var serialized = item.serialize();
                if (serialized && ((item instanceof ExpressionModel_1.ExpressionModel) || serialized.entryname || serialized.entry)) {
                    acc.push(serialized);
                }
                return acc;
            }, [])
        };
        if (this.customProps.listing) {
            base.listing = base.listing.concat(this.customProps.listing);
            var c = __assign({}, this.customProps);
            delete c.listing;
            return utils_1.spreadAllProps(base, c);
        }
        // don't serialize if the only property that is being serialized is the class
        var keys = Object.keys(base);
        var customPropsKeys = Object.keys(this.customProps);
        if (keys.length === 2 &&
            keys[0] === "class" &&
            keys[1] === "listing" &&
            !base.listing.length &&
            customPropsKeys.length === 0) {
            return undefined;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1InitialWorkDirRequirementModel.prototype.deserialize = function (attr) {
        var _this = this;
        var listings = [];
        var customProperties = [];
        var serializedKeys = ["class"];
        if (Array.isArray(attr.listing)) {
            attr.listing.forEach(function (listing) {
                if (listing) {
                    if (listing.entryname || listing.entry) {
                        var any = _this.addDirent(listing);
                        listings.push(any);
                    }
                    else if (typeof listing === "string") {
                        listings.push(_this.addExpression(listing));
                    }
                    else {
                        customProperties.push(listing);
                    }
                }
            });
        }
        if (listings.length) {
            serializedKeys.push("listing");
        }
        if (customProperties.length) {
            this.customProps.listing = customProperties;
        }
        this.listing = listings;
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1InitialWorkDirRequirementModel;
}(CreateFileRequirementModel_1.CreateFileRequirementModel));
exports.V1InitialWorkDirRequirementModel = V1InitialWorkDirRequirementModel;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DirentModel_1 = __webpack_require__(35);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var V1DirentModel = /** @class */ (function (_super) {
    __extends(V1DirentModel, _super);
    function V1DirentModel(dirent, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (dirent)
            _this.deserialize(dirent);
        return _this;
    }
    V1DirentModel.prototype.serialize = function () {
        var base = {};
        if (this.entryName.serialize() !== undefined) {
            base.entryname = this.entryName.serialize();
        }
        if (this.entry.serialize() !== undefined) {
            base.entry = this.entry.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1DirentModel.prototype.deserialize = function (attr) {
        var _this = this;
        this.entryName = new V1ExpressionModel_1.V1ExpressionModel(attr.entryname, this.loc + ".entryname", this.eventHub);
        this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.entry = new V1ExpressionModel_1.V1ExpressionModel(attr.entry, this.loc + ".entry", this.eventHub);
        this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        utils_1.spreadSelectProps(attr, this.customProps, ["entry", "entryname"]);
    };
    return V1DirentModel;
}(DirentModel_1.DirentModel));
exports.V1DirentModel = V1DirentModel;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(0);
var V1InlineJavascriptRequirementModel = /** @class */ (function (_super) {
    __extends(V1InlineJavascriptRequirementModel, _super);
    function V1InlineJavascriptRequirementModel(req, loc) {
        var _this = _super.call(this, loc) || this;
        _this.class = "InlineJavascriptRequirement";
        _this.wasPresent = false;
        _this.expressionLib = [];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1InlineJavascriptRequirementModel.prototype.addExpressionLib = function (lib) {
        if (this.expressionLib.indexOf(lib) === -1) {
            this.expressionLib.push(lib);
        }
    };
    V1InlineJavascriptRequirementModel.prototype.removeExpressionLib = function (lib) {
        var index = this.expressionLib.indexOf(lib);
        if (index !== -1) {
            this.expressionLib.splice(index, 1);
        }
    };
    V1InlineJavascriptRequirementModel.prototype.deserialize = function (attr) {
        this.expressionLib = attr.expressionLib || [];
        utils_1.spreadSelectProps(attr, this.customProps, ["expressionLib", "class"]);
    };
    V1InlineJavascriptRequirementModel.prototype.serialize = function () {
        var base = {};
        base.class = this.class;
        if (this.expressionLib.length)
            base.expressionLib = this.expressionLib;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1InlineJavascriptRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.V1InlineJavascriptRequirementModel = V1InlineJavascriptRequirementModel;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceRequirementModel_1 = __webpack_require__(36);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var V1ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(V1ResourceRequirementModel, _super);
    function V1ResourceRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.class = "ResourceRequirement";
        _this.mem = new V1ExpressionModel_1.V1ExpressionModel("", _this.loc + ".ramMin", _this.eventHub);
        _this.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.cores = new V1ExpressionModel_1.V1ExpressionModel("", _this.loc + ".coresMin", _this.eventHub);
        _this.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1ResourceRequirementModel.prototype.serialize = function () {
        var mem = this.mem.serialize();
        var cores = this.cores.serialize();
        // in case neither mem nor cores have been defined, and no custom props were specified
        if (mem === undefined && cores === undefined && !Object.keys(this.customProps).length) {
            // indicate that there is nothing to serialize
            return undefined;
        }
        // mem and cores were cast to string during serialization, turn back to numbers if applicable
        mem = utils_1.returnNumIfNum(mem);
        cores = utils_1.returnNumIfNum(cores);
        var base = {
            "class": "ResourceRequirement"
        };
        if (mem !== undefined)
            base.ramMin = mem;
        if (cores !== undefined)
            base.coresMin = cores;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1ResourceRequirementModel.prototype.deserialize = function (attr) {
        //@todo cover maximum values
        var _this = this;
        if (attr.ramMin !== undefined && attr.ramMin !== null) {
            this.mem = new V1ExpressionModel_1.V1ExpressionModel(attr.ramMin.toString(), this.loc + ".ramMin", this.eventHub);
            this.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        if (attr.coresMin !== undefined && attr.coresMin !== null) {
            this.cores = new V1ExpressionModel_1.V1ExpressionModel(attr.coresMin.toString(), this.loc + ".coresMin", this.eventHub);
            this.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["class", "ramMin", "coresMin"]);
    };
    V1ResourceRequirementModel.prototype.validate = function (context) {
        return Promise.all([this.mem.validate(context), this.cores.validate(context)]);
    };
    return V1ResourceRequirementModel;
}(ResourceRequirementModel_1.ResourceRequirementModel));
exports.V1ResourceRequirementModel = V1ResourceRequirementModel;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sbgHelperLibrary = "\nvar setMetadata = function(file, metadata) {\n    if (!('metadata' in file))\n        file['metadata'] = metadata;\n    else {\n        for (var key in metadata) {\n            file['metadata'][key] = metadata[key];\n        }\n    }\n    return file\n};\n\nvar inheritMetadata = function(o1, o2) {\n    var commonMetadata = {};\n    if (!Array.isArray(o2)) {\n        o2 = [o2]\n    }\n    for (var i = 0; i < o2.length; i++) {\n        var example = o2[i]['metadata'];\n        for (var key in example) {\n            if (i == 0)\n                commonMetadata[key] = example[key];\n            else {\n                if (!(commonMetadata[key] == example[key])) {\n                    delete commonMetadata[key]\n                }\n            }\n        }\n    }\n    if (!Array.isArray(o1)) {\n        o1 = setMetadata(o1, commonMetadata)\n    } else {\n        for (var i = 0; i < o1.length; i++) {\n            o1[i] = setMetadata(o1[i], commonMetadata)\n        }\n    }\n    return o1;\n};";


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(21);
var DockerRequirementModel_1 = __webpack_require__(32);
var RequirementBaseModel_1 = __webpack_require__(14);
var JobHelper_1 = __webpack_require__(23);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandArgumentModel_1 = __webpack_require__(79);
var SBDraft2CommandInputParameterModel_1 = __webpack_require__(80);
var SBDraft2CommandOutputParameterModel_1 = __webpack_require__(81);
var SBDraft2CreateFileRequirementModel_1 = __webpack_require__(83);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2ResourceRequirementModel_1 = __webpack_require__(85);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandLineToolModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandLineToolModel, _super);
    function SBDraft2CommandLineToolModel(json, loc) {
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "sbg:draft-2";
        _this.baseCommand = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.requirements = [];
        _this.hints = [];
        _this.arguments = [];
        _this.hasStdErr = false;
        _this.initializeExprWatchers();
        if (json)
            _this.deserialize(json);
        _this.constructed = true;
        _this.validateAllExpressions();
        _this.initializeJobWatchers();
        return _this;
    }
    // EXPRESSION CONTEXT //
    SBDraft2CommandLineToolModel.prototype.setRuntime = function (runtime) {
        if (runtime === void 0) { runtime = {}; }
        this.runtime.cpu = runtime.cpu !== undefined ? runtime.cpu : this.runtime.cpu;
        this.runtime.mem = runtime.mem !== undefined ? runtime.mem : this.runtime.mem;
    };
    /**
     * Returns the context object for expressions in supplied port
     * @param port
     * @returns {{$job?: {inputs?: any; allocatedResources?: any}; $self?: any}}
     */
    SBDraft2CommandLineToolModel.prototype.getContext = function (port) {
        var context = {
            $job: {
                inputs: this.jobInputs,
                allocatedResources: this.runtime
            }
        };
        if (port && port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            if (port.isField) {
                var root = this.findFieldRoot(port, this.jobInputs);
                context.$self = root ? root[port.id] : null;
            }
            else {
                context.$self = this.jobInputs ? this.jobInputs[port.id] : null;
            }
        }
        if (port && port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            context.$self = JobHelper_1.JobHelper.generateMockJobData({ type: { type: "array", items: "File" } });
        }
        return context;
    };
    /**
     * Resets job value to dummy values
     */
    SBDraft2CommandLineToolModel.prototype.resetJobDefaults = function () {
        this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        this.updateCommandLine();
    };
    // CRUD HELPER METHODS //
    SBDraft2CommandLineToolModel.prototype.addHint = function (hint) {
        var _this = this;
        var h = new RequirementBaseModel_1.RequirementBaseModel(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        h.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.hints.push(h);
        return h;
    };
    SBDraft2CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        var _this = this;
        if (cmd === void 0) { cmd = ""; }
        var loc = utils_1.incrementLastLoc(this.baseCommand, this.loc + ".baseCommand");
        var c = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(cmd, loc, this.eventHub);
        this.baseCommand.push(c);
        c.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return c;
    };
    SBDraft2CommandLineToolModel.prototype.updateBaseCommand = function (cmd) {
        var _this = this;
        this.baseCommand.forEach(function (c) { return c.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.baseCommand = [];
        cmd.forEach(function (c) { return _this.addBaseCommand(c.serialize()); });
    };
    SBDraft2CommandLineToolModel.prototype.addArgument = function (arg) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.arguments, this.loc + ".arguments");
        var argument = new SBDraft2CommandArgumentModel_1.SBDraft2CommandArgumentModel(arg, loc, this.eventHub);
        this.arguments.push(argument);
        argument.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return argument;
    };
    SBDraft2CommandLineToolModel.prototype.addInput = function (input) {
        return _super.prototype._addInput.call(this, SBDraft2CommandInputParameterModel_1.SBDraft2CommandInputParameterModel, input);
    };
    SBDraft2CommandLineToolModel.prototype.addOutput = function (output) {
        return _super.prototype._addOutput.call(this, SBDraft2CommandOutputParameterModel_1.SBDraft2CommandOutputParameterModel, output);
    };
    SBDraft2CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        var prop = hint ? "hints" : "requirements";
        this.createReq(req, this.loc + "." + prop + "[" + this[prop].length + "]", hint);
    };
    SBDraft2CommandLineToolModel.prototype.updateStream = function (stream, type) {
        var _this = this;
        this[type] = stream;
        stream.loc = this.loc + "." + type;
        stream.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandLineToolModel.prototype.createReq = function (req, loc, hint) {
        var _this = this;
        var reqModel;
        var property = hint ? "hints" : "requirements";
        switch (req.class) {
            case "DockerRequirement":
                this.docker = new DockerRequirementModel_1.DockerRequirementModel(req, loc);
                this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "CreateFileRequirement":
                reqModel = new SBDraft2CreateFileRequirementModel_1.SBDraft2CreateFileRequirementModel(req, loc, this.eventHub);
                this.fileRequirement = reqModel;
                reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "sbg:CPURequirement":
                this.resources.cores = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(req.value, loc + ".value", this.eventHub);
                this.resources.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "sbg:MemRequirement":
                this.resources.mem = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(req.value, loc + ".value", this.eventHub);
                this.resources.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            default:
                reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, loc);
        }
        if (reqModel) {
            this[property].push(reqModel);
            reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    // SERIALIZATION //
    SBDraft2CommandLineToolModel.prototype.deserialize = function (tool) {
        var _this = this;
        var serializedAttr = [
            "baseCommand",
            "class",
            "id",
            "label",
            "description",
            "inputs",
            "hints",
            "requirements",
            "arguments",
            "outputs",
            "stdin",
            "stdout",
            "successCodes",
            "temporaryFailCodes",
            "permanentFailCodes",
            "cwlVersion"
        ];
        this.id = tool["sbg:id"] && tool["sbg:id"].split("/").length > 2 ?
            tool["sbg:id"].split("/")[2] :
            utils_1.snakeCase(tool.id);
        this.sbgId = tool["sbg:id"];
        this.label = tool.label;
        this.description = tool.description;
        utils_1.ensureArray(tool.inputs).forEach(function (i) { return _this.addInput(i); });
        utils_1.ensureArray(tool.outputs).forEach(function (o) { return _this.addOutput(o); });
        // Validate inputs and output uniqueness
        // this method sets an error on the second input/output with a repeat identifier
        utils_1.checkPortIdUniqueness(this.inputs.concat(this.outputs));
        if (tool.arguments) {
            tool.arguments.forEach(function (arg) {
                _this.addArgument(arg);
            });
        }
        this.resources = this.resources || new SBDraft2ResourceRequirementModel_1.SBDraft2ResourceRequirementModel(this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        this.resources.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        if (tool.requirements) {
            tool.requirements.forEach(function (req, index) {
                _this.createReq(req, _this.loc + ".requirements[" + index + "]");
            });
        }
        if (tool.hints) {
            tool.hints.forEach(function (hint, index) {
                _this.createReq(hint, _this.loc + ".hints[" + index + "]", true);
            });
        }
        this.docker = this.docker || new DockerRequirementModel_1.DockerRequirementModel({}, this.loc + ".hints[" + this.hints.length + "]");
        this.docker.isHint = true;
        this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.fileRequirement = this.fileRequirement || new SBDraft2CreateFileRequirementModel_1.SBDraft2CreateFileRequirementModel({}, this.loc + ".requirements[" + this.requirements.length + "]", this.eventHub);
        this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.updateStream(new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(tool.stdin, this.loc + ".stdin", this.eventHub), "stdin");
        this.updateStream(new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(tool.stdout, this.loc + ".stdout", this.eventHub), "stdout");
        this.successCodes = utils_1.ensureArray(tool.successCodes);
        this.temporaryFailCodes = utils_1.ensureArray(tool.temporaryFailCodes);
        this.permanentFailCodes = utils_1.ensureArray(tool.permanentFailCodes);
        tool.baseCommand = tool.baseCommand || [''];
        // wrap to array
        tool.baseCommand = !Array.isArray(tool.baseCommand)
            ? [tool.baseCommand]
            : tool.baseCommand;
        this.baseCommand = [];
        tool.baseCommand.reduce(function (acc, curr) {
            if (typeof curr === "string") {
                if (typeof acc[acc.length - 1] === "string") {
                    acc[acc.length - 1] += " " + curr;
                    return acc;
                }
                else {
                    return acc.concat([curr]);
                }
            }
            else {
                return acc.concat([curr]);
            }
        }, []).forEach(function (cmd) {
            _this.addBaseCommand(cmd);
        });
        this.runtime = { mem: 1000, cpu: 1 };
        if (tool["sbg:job"]) {
            this.jobInputs = __assign({}, JobHelper_1.JobHelper.getNullJobInputs(this), tool["sbg:job"].inputs);
            this.runtime = __assign({}, this.runtime, tool["sbg:job"].allocatedResources);
        }
        else {
            this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        }
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(tool, this.customProps, serializedAttr);
    };
    SBDraft2CommandLineToolModel.prototype.serialize = function () {
        var base = {};
        var hasExpression = false;
        base.cwlVersion = "sbg:draft-2";
        base.class = "CommandLineTool";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        var expressionWatcherDispose = this.eventHub.on("expression.serialize", function (data) {
            hasExpression = data;
        });
        // BASECOMMAND
        base.baseCommand = this.baseCommand
            .map(function (cmd) { return cmd.serialize(); })
            .filter(function (cmd) { return !!cmd; })
            .reduce(function (acc, curr) {
            if (typeof curr === "string") {
                //@todo implement not splitting quoted text
                return acc.concat(curr.split(/\s+/));
            }
            else {
                return acc.concat([curr]);
            }
        }, []);
        // INPUTS
        base.inputs = this.inputs
            .map(function (input) { return input.serialize(); });
        // OUTPUTS
        base.outputs = this.outputs
            .map(function (output) { return output.serialize(); });
        // REQUIREMENTS
        base.requirements = [];
        if (this.requirements.length) {
            base.requirements = this.requirements.map(function (req) { return req.serialize(); });
        }
        if (this.fileRequirement.serialize())
            base.requirements.push(this.fileRequirement.serialize());
        if (!base.requirements.length)
            delete base.requirements;
        // HINTS
        base.hints = [];
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        if (this.resources.cores.serialize() !== undefined) {
            base.hints.push({
                "class": "sbg:CPURequirement",
                value: utils_1.returnNumIfNum(this.resources.cores.serialize())
            });
        }
        if (this.resources.mem.serialize() !== undefined) {
            base.hints.push({
                "class": "sbg:MemRequirement",
                value: utils_1.returnNumIfNum(this.resources.mem.serialize())
            });
        }
        if (this.docker.serialize())
            base.hints.push(this.docker.serialize());
        if (!base.hints.length)
            delete base.hints;
        // ARGUMENTS
        if (this.arguments.length) {
            base.arguments = this.arguments.map(function (arg) { return arg.serialize(); }).filter(function (arg) { return !!arg; });
        }
        // STREAM
        if (this.stdin.serialize()) {
            base.stdin = this.stdin.serialize();
        }
        if (this.stdout.serialize()) {
            base.stdout = this.stdout.serialize();
        }
        if (this.successCodes.length) {
            base.successCodes = this.successCodes;
        }
        if (this.temporaryFailCodes.length) {
            base.temporaryFailCodes = this.temporaryFailCodes;
        }
        if (this.permanentFailCodes.length) {
            base.permanentFailCodes = this.permanentFailCodes;
        }
        var exprReqIndex = this.requirements.findIndex((function (req) { return req.class === "ExpressionEngineRequirement"; }));
        if (hasExpression) {
            base.requirements = base.requirements || [];
            if (exprReqIndex === -1) {
                base.requirements.push({
                    id: "#cwl-js-engine",
                    "class": "ExpressionEngineRequirement",
                    requirements: [
                        {
                            dockerPull: "rabix/js-engine",
                            "class": "DockerRequirement"
                        }
                    ]
                });
            }
        }
        expressionWatcherDispose();
        base = Object.assign({}, base, this.customProps);
        return base;
    };
    return SBDraft2CommandLineToolModel;
}(CommandLineToolModel_1.CommandLineToolModel));
exports.SBDraft2CommandLineToolModel = SBDraft2CommandLineToolModel;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArgumentModel_1 = __webpack_require__(22);
var SBDraft2CommandLineBindingModel_1 = __webpack_require__(49);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandArgumentModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandArgumentModel, _super);
    function SBDraft2CommandArgumentModel(arg, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasExprPrimitive = false;
        _this.hasShellQuote = false;
        _this.deserialize(arg || {});
        return _this;
    }
    SBDraft2CommandArgumentModel.prototype.updateBinding = function (binding) {
        this.hasBinding = true;
        this.primitive = undefined;
        this.binding.prefix = binding.prefix;
        this.binding.position = binding.position;
        this.binding.separate = binding.separate;
        this.binding.itemSeparator = binding.itemSeparator;
    };
    SBDraft2CommandArgumentModel.prototype.updatePrimitive = function (str) {
        this.hasBinding = false;
        this.binding = undefined;
        this.primitive = str;
    };
    SBDraft2CommandArgumentModel.prototype.toggleBinding = function (state) {
        var _this = this;
        if (state) {
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel({}, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.primitive = undefined;
        }
        else {
            this.primitive = "";
            this.binding.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.binding = undefined;
        }
        this.hasBinding = state;
    };
    Object.defineProperty(SBDraft2CommandArgumentModel.prototype, "arg", {
        get: function () {
            return this.primitive || this.binding;
        },
        set: function (value) {
            this.deserialize(value);
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CommandArgumentModel.prototype.toString = function () {
        if (this.primitive)
            return this.primitive;
        if (this.binding) {
            return this.binding.valueFrom.toString();
        }
        return "";
    };
    SBDraft2CommandArgumentModel.prototype.serialize = function () {
        if (this.primitive) {
            return this.primitive;
        }
        else if (this.binding) {
            return this.binding.serialize();
        }
    };
    SBDraft2CommandArgumentModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (typeof attr === "string") {
            this.hasBinding = false;
            this.primitive = attr;
        }
        else if (attr instanceof SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel) {
            this.hasBinding = true;
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(attr.serialize(), this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else {
            this.hasBinding = true;
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(attr, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    return SBDraft2CommandArgumentModel;
}(CommandArgumentModel_1.CommandArgumentModel));
exports.SBDraft2CommandArgumentModel = SBDraft2CommandArgumentModel;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandInputParameterModel_1 = __webpack_require__(10);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandLineBindingModel_1 = __webpack_require__(49);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandInputParameterModel, _super);
    function SBDraft2CommandInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        /** Binding for inclusion in command line */
        _this.inputBinding = null;
        _this.hasSecondaryFiles = false;
        _this.hasSecondaryFilesInRoot = false;
        _this.hasStageInput = true;
        _this.secondaryFiles = [];
        _this.deserialize(input);
        return _this;
    }
    SBDraft2CommandInputParameterModel.prototype.serialize = function () {
        var base = __assign({}, this.customProps);
        base.type = this.type.serialize();
        if (this.inputBinding) {
            base.inputBinding = this.inputBinding.serialize();
            if (this.type.type === "File" || this.type.items === "File" && this.secondaryFiles.length) {
                base.inputBinding.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
            }
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        if (this.isField) {
            base.name = this.id;
            return base;
        }
        else {
            base.id = this.id ? "#" + this.id : "";
            return base;
        }
    };
    SBDraft2CommandInputParameterModel.prototype.deserialize = function (input) {
        var _this = this;
        var serializedAttr = ["label", "description", "inputBinding", "type", "sbg:fileTypes"];
        input = input || {};
        this.isField = !!input.name; // record fields don't have ids
        this.isField ? serializedAttr.push("name") : serializedAttr.push("id");
        if (input.id && input.id.charAt(0) === "#") {
            this.id = input.id.substr(1);
        }
        else {
            this.id = input.id
                || input.name || ""; // for record fields
        }
        try {
            utils_1.validateID(this.id);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc + ".id"] = {
                    type: "error",
                    code: ex.code,
                    message: ex.message
                },
                _a));
        }
        this.label = input.label;
        this.description = input.description;
        this.fileTypes = utils_1.commaSeparatedToArray(input["sbg:fileTypes"]);
        // if inputBinding isn't defined in input, it shouldn't exist as an object in model
        if (input.inputBinding !== undefined) {
            this.inputBinding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(input.inputBinding, this.loc + ".inputBinding", this.eventHub);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
            if (input.inputBinding.secondaryFiles) {
                this.secondaryFiles = utils_1.ensureArray(input.inputBinding.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
            }
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(input.type, SBDraft2CommandInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.attachFileTypeListeners();
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(input, this.customProps, serializedAttr);
        var _a;
    };
    SBDraft2CommandInputParameterModel.prototype.updateInputBinding = function (binding) {
        var _this = this;
        if (binding instanceof SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel) {
            //@todo breaks here for serialize of undefined
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.inputBinding.cloneStatus(binding);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.createInputBinding = function () {
        var _this = this;
        this.inputBinding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel({}, this.loc + ".inputBinding", this.eventHub);
        this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return this.inputBinding;
    };
    SBDraft2CommandInputParameterModel.prototype.addSecondaryFile = function (file) {
        if (this.inputBinding) {
            return this._addSecondaryFile(file, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.inputBinding.loc);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.updateSecondaryFiles = function (files) {
        if (this.inputBinding) {
            this._updateSecondaryFiles(files);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.removeSecondaryFile = function (index) {
        if (this.inputBinding) {
            this._removeSecondaryFile(index);
        }
    };
    return SBDraft2CommandInputParameterModel;
}(CommandInputParameterModel_1.CommandInputParameterModel));
exports.SBDraft2CommandInputParameterModel = SBDraft2CommandInputParameterModel;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandOutputBindingModel_1 = __webpack_require__(82);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandOutputParameterModel, _super);
    function SBDraft2CommandOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = false;
        _this.hasSecondaryFilesInRoot = false;
        _this.deserialize(output || {});
        return _this;
    }
    SBDraft2CommandOutputParameterModel.prototype.updateSecondaryFiles = function (files) {
        if (this.outputBinding) {
            this._updateSecondaryFiles(files);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.addSecondaryFile = function (file) {
        if (this.outputBinding) {
            return this._addSecondaryFile(file, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.outputBinding.loc);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.removeSecondaryFile = function (index) {
        if (this.outputBinding) {
            this._removeSecondaryFile(index);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.updateOutputBinding = function (binding) {
        var _this = this;
        this.outputBinding = new SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel(binding instanceof SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel ?
            binding.serialize() : {}, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandOutputParameterModel.prototype.serialize = function () {
        var base = {};
        base.type = this.type.serialize();
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes && this.fileTypes.length) {
            base["sbg:fileTypes"] = (this.fileTypes || []).join(", ");
        }
        if (this.outputBinding) {
            base.outputBinding = this.outputBinding.serialize();
            // only type File or File[] can have secondaryFiles, loadContents and fileTypes
            if (!utils_1.isFileType(this)) {
                delete base.outputBinding.secondaryFiles;
                delete base.outputBinding.loadContents;
                delete base["sbg:fileTypes"];
            }
            if (utils_1.isFileType(this) && this.secondaryFiles.length > 0) {
                base.outputBinding.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
            }
            if (!Object.keys(base.outputBinding).length) {
                delete base.outputBinding;
            }
        }
        if (this.isField) {
            base.name = this.id || "";
        }
        else {
            base.id = this.id ? "#" + this.id : "";
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2CommandOutputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedAttr = [
            "id",
            "label",
            "description",
            "outputBinding",
            "type",
            "sbg:fileTypes"
        ];
        this.isField = !!attr.name; // record fields don't have ids
        this.isField ? serializedAttr.push("name") : serializedAttr.push("id");
        if (attr.id && attr.id.charAt(0) === "#") {
            this.id = attr.id.substr(1);
        }
        else {
            this.id = attr.id
                || attr.name || ""; // for record fields
        }
        this.label = attr.label;
        this.description = attr.description;
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.outputBinding = new SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel(attr.outputBinding, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (attr.outputBinding && attr.outputBinding.secondaryFiles) {
            this.secondaryFiles = attr.outputBinding.secondaryFiles.map(function (f) { return _this.addSecondaryFile(f); });
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, SBDraft2CommandOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedAttr);
    };
    return SBDraft2CommandOutputParameterModel;
}(CommandOutputParameterModel_1.CommandOutputParameterModel));
exports.SBDraft2CommandOutputParameterModel = SBDraft2CommandOutputParameterModel;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputBindingModel_1 = __webpack_require__(33);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandOutputBindingModel, _super);
    function SBDraft2CommandOutputBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.metadata = {};
        _this.hasSecondaryFiles = true;
        _this.hasMetadata = true;
        _this.hasInheritMetadata = true;
        _this.customProps = {};
        _this.deserialize(binding || {});
        return _this;
    }
    Object.defineProperty(SBDraft2CommandOutputBindingModel.prototype, "glob", {
        get: function () {
            return this._glob;
        },
        set: function (value) {
            this.setGlob(value, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2CommandOutputBindingModel.prototype, "outputEval", {
        get: function () {
            return this._outputEval;
        },
        set: function (value) {
            this.setOutputEval(value, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel);
            this.validateOutputEval();
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CommandOutputBindingModel.prototype.validateOutputEval = function () {
        if (this._outputEval.type !== "expression" && this._outputEval.serialize() !== undefined) {
            this._outputEval.setIssue((_a = {},
                _a[this.loc + ".outputEval"] = {
                    type: "error",
                    message: "outputEval must be an expression",
                    code: ErrorCode_1.ErrorCode.OUTPUT_EVAL_EXPR
                },
                _a));
        }
        else {
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_EVAL_EXPR);
        }
        var _a;
    };
    SBDraft2CommandOutputBindingModel.prototype.setInheritMetadataFrom = function (inputId) {
        this.inheritMetadataFrom = inputId;
    };
    SBDraft2CommandOutputBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        if (this._glob && this._glob.serialize()) {
            base.glob = this._glob.serialize();
        }
        if (Object.keys(this.metadata).length) {
            base["sbg:metadata"] = {};
            Object.keys(this.metadata).filter(function (key) { return key; }).forEach(function (key) {
                var serialized = _this.metadata[key].serialize();
                if (serialized !== undefined) {
                    base["sbg:metadata"][key] = serialized;
                }
            });
        }
        if (this.inheritMetadataFrom) {
            base["sbg:inheritMetadataFrom"] = this.inheritMetadataFrom.substr(0) === "#" ? this.inheritMetadataFrom : "#" + this.inheritMetadataFrom;
        }
        if (this.loadContents)
            base.loadContents = true;
        if (this._outputEval.serialize()) {
            base.outputEval = this._outputEval.serialize();
        }
        return Object.assign({}, this.customProps, base);
    };
    SBDraft2CommandOutputBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        var serializedKeys = [
            "glob",
            "secondaryFiles",
            "outputEval",
            "loadContents",
            "sbg:metadata",
            "sbg:inheritMetadataFrom"
        ];
        if (binding && binding.constructor === Object) {
            if (!Array.isArray(binding.glob)) {
                this._glob = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.glob, this.loc + '.glob', this.eventHub);
                this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.validateGlob();
            }
            else {
                console.warn("Not supporting glob which is string[] at " + this.loc + ". Glob cannot be edited via model");
                serializedKeys.splice(0, 1);
            }
            this.loadContents = binding.loadContents === true;
            this.inheritMetadataFrom = null;
            if (binding["sbg:inheritMetadataFrom"]) {
                this.inheritMetadataFrom = binding["sbg:inheritMetadataFrom"].charAt(0) === "#" ?
                    binding["sbg:inheritMetadataFrom"].substr(1) :
                    binding["sbg:inheritMetadataFrom"];
            }
            if (this.eventHub) {
                this.modelListeners.push(this.eventHub.on("input.change.id", function (data) {
                    if (data.oldId === _this.inheritMetadataFrom) {
                        _this.inheritMetadataFrom = data.newId;
                    }
                }));
            }
            this._outputEval = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.outputEval, this.loc + ".outputEval", this.eventHub);
            this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.validateOutputEval();
            if (binding["sbg:metadata"] && binding["sbg:metadata"].constructor === Object) {
                Object.keys(binding["sbg:metadata"]).filter(function (key) { return key; }).forEach(function (key) {
                    var metadata = binding["sbg:metadata"][key];
                    if (metadata !== undefined) {
                        _this.metadata[key] = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(metadata, _this.loc + "[\"sbg:metadata\"]." + key, _this.eventHub);
                        _this.metadata[key].setValidationCallback(function (err) { return _this.updateValidity(err); });
                    }
                });
            }
            Object.keys(binding).forEach(function (key) {
                if (serializedKeys.indexOf(key) === -1) {
                    _this.customProps[key] = binding[key];
                }
            });
        }
    };
    return SBDraft2CommandOutputBindingModel;
}(CommandOutputBindingModel_1.CommandOutputBindingModel));
exports.SBDraft2CommandOutputBindingModel = SBDraft2CommandOutputBindingModel;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CreateFileRequirementModel_1 = __webpack_require__(34);
var SBDraft2FileDefModel_1 = __webpack_require__(84);
var SBDraft2CreateFileRequirementModel = /** @class */ (function (_super) {
    __extends(SBDraft2CreateFileRequirementModel, _super);
    function SBDraft2CreateFileRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this['class'] = "CreateFileRequirement";
        _this._listing = [];
        _this.deserialize(req);
        return _this;
    }
    Object.defineProperty(SBDraft2CreateFileRequirementModel.prototype, "listing", {
        get: function () {
            return this._listing;
        },
        set: function (value) {
            var _this = this;
            this._listing = [];
            value.forEach(function (def, index) {
                if (!(def instanceof SBDraft2FileDefModel_1.SBDraft2FileDefModel)) {
                    def = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, _this.loc + ".fileDef[" + index + "]", _this.eventHub);
                }
                _this._listing.push(def);
                def.setValidationCallback(function (err) { return _this.updateValidity(err); });
            });
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CreateFileRequirementModel.prototype.addDirent = function (def) {
        var _this = this;
        if (def instanceof SBDraft2FileDefModel_1.SBDraft2FileDefModel) {
            //@todo remove this if possible
            this._listing.push(def);
            def.setValidationCallback(function (err) { return _this.updateValidity(err); });
            def.loc = this.loc + ".fileDef[" + this._listing.length + "]";
            return def;
        }
        else {
            var d = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, this.loc + ".fileDef[" + this._listing.length + "]", this.eventHub);
            d.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this._listing.push(d);
            return d;
        }
    };
    SBDraft2CreateFileRequirementModel.prototype.deserialize = function (req) {
        var _this = this;
        if (req.fileDef && Array.isArray(req.fileDef)) {
            this._listing = req.fileDef.map(function (def, index) {
                var d = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, _this.loc + ".fileDef[" + index + "]", _this.eventHub);
                d.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return d;
            });
        }
        Object.keys(req).forEach(function (key) {
            if (key !== "fileDef" && key !== "class")
                _this.customProps[key] = req[key];
        });
    };
    SBDraft2CreateFileRequirementModel.prototype.serialize = function () {
        var base = {};
        base.class = "CreateFileRequirement";
        base.fileDef = this._listing.map(function (def) { return def.serialize(); });
        // don't serialize if the only property that is being serialized is the class
        var customPropsKeys = Object.keys(this.customProps);
        if (base.fileDef.length === 0 && customPropsKeys.length === 0) {
            return undefined;
        }
        return Object.assign({}, base, this.customProps);
    };
    return SBDraft2CreateFileRequirementModel;
}(CreateFileRequirementModel_1.CreateFileRequirementModel));
exports.SBDraft2CreateFileRequirementModel = SBDraft2CreateFileRequirementModel;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DirentModel_1 = __webpack_require__(35);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2FileDefModel = /** @class */ (function (_super) {
    __extends(SBDraft2FileDefModel, _super);
    function SBDraft2FileDefModel(fileDef, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.entryName = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", _this.loc + ".filename", _this.eventHub);
        _this.entry = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", _this.loc + ".fileContent", _this.eventHub);
        _this.customProps = {};
        _this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.deserialize(fileDef);
        return _this;
    }
    SBDraft2FileDefModel.prototype.serialize = function () {
        var base = {};
        if (this.entryName.serialize() !== undefined) {
            base.filename = this.entryName.serialize();
        }
        if (this.entry.serialize() !== undefined) {
            base.fileContent = this.entry.serialize();
        }
        return Object.assign({}, base, this.customProps);
    };
    SBDraft2FileDefModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (attr) {
            this.entryName = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(attr.filename, this.loc + ".filename", this.eventHub);
            this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.entry = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(attr.fileContent, this.loc + ".fileContent", this.eventHub);
            this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["filename", "fileContent"]);
    };
    return SBDraft2FileDefModel;
}(DirentModel_1.DirentModel));
exports.SBDraft2FileDefModel = SBDraft2FileDefModel;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceRequirementModel_1 = __webpack_require__(36);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(SBDraft2ResourceRequirementModel, _super);
    function SBDraft2ResourceRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        var locBase = _this.loc.slice(0, -1);
        _this.mem = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", locBase + "].value", _this.eventHub);
        _this.mem.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        _this.cores = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", utils_1.incrementString(locBase) + "].value", _this.eventHub);
        _this.cores.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        return _this;
    }
    return SBDraft2ResourceRequirementModel;
}(ResourceRequirementModel_1.ResourceRequirementModel));
exports.SBDraft2ResourceRequirementModel = SBDraft2ResourceRequirementModel;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepInputModel_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(0);
var ParameterTypeModel_1 = __webpack_require__(4);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(V1WorkflowStepInputModel, _super);
    function V1WorkflowStepInputModel(stepInput, step, loc) {
        var _this = _super.call(this, loc) || this;
        /**
         * Should in port be shown on the canvas
         */
        _this.isVisible = false;
        _this.parentStep = step;
        if (stepInput)
            _this.deserialize(stepInput);
        return _this;
    }
    V1WorkflowStepInputModel.prototype.serialize = function () {
        var base = {
            id: this.id
        };
        if (this.default !== undefined && this.default !== null)
            base.default = this.default;
        if (this.source.length)
            base.source = this.source.slice();
        if (this.valueFrom && this.valueFrom.serialize())
            base.valueFrom = this.valueFrom.serialize();
        base = utils_1.spreadAllProps(base, this.customProps);
        delete base["sbg:toolDefaultValue"];
        delete base["sbg:category"];
        delete base["sbg:altPrefix"];
        return base;
    };
    V1WorkflowStepInputModel.prototype.deserialize = function (attr) {
        var serializedKeys = [
            "id",
            "default",
            "source",
            "type",
            "doc",
            "label",
            "fileTypes"
        ];
        this.id = attr.id;
        this.default = attr.default;
        this.source = utils_1.ensureArray(attr.source);
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(attr.valueFrom, this.loc + ".valueFrom");
        // properties that will not be serialized on the step.in,
        // but are necessary for internal functions
        this.type = attr["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        this.type.hasDirectoryType = true;
        this.description = attr["doc"];
        this.label = attr["label"];
        this.fileTypes = attr["fileTypes"];
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1WorkflowStepInputModel;
}(WorkflowStepInputModel_1.WorkflowStepInputModel));
exports.V1WorkflowStepInputModel = V1WorkflowStepInputModel;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepOutputModel_1 = __webpack_require__(20);
var ParameterTypeModel_1 = __webpack_require__(4);
var V1WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(V1WorkflowStepOutputModel, _super);
    function V1WorkflowStepOutputModel(output, step, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = step;
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1WorkflowStepOutputModel.prototype.serialize = function () {
        return {
            id: this.id
        };
    };
    Object.defineProperty(V1WorkflowStepOutputModel.prototype, "sourceId", {
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    V1WorkflowStepOutputModel.prototype.deserialize = function (output) {
        this.id = output.id;
        // properties that will not be serialized on the step.out,
        // but are necessary for internal functions
        this.type = output["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        this.type.hasDirectoryType = true;
        this.description = output["doc"];
        this.label = output["label"];
        this.fileTypes = output["format"];
    };
    return V1WorkflowStepOutputModel;
}(WorkflowStepOutputModel_1.WorkflowStepOutputModel));
exports.V1WorkflowStepOutputModel = V1WorkflowStepOutputModel;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var SBDraft2StepModel_1 = __webpack_require__(89);
var SBDraft2WorkflowInputParameterModel_1 = __webpack_require__(92);
var SBDraft2WorkflowOutputParameterModel_1 = __webpack_require__(93);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2WorkflowModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowModel, _super);
    function SBDraft2WorkflowModel(workflow, loc) {
        if (loc === void 0) { loc = "document"; }
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "sbg:draft-2";
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.hasBatch = true;
        if (workflow)
            _this.deserialize(workflow);
        _this.graph = _this.constructGraph();
        _this.validateGraph();
        _this.eventHub.on("io.change.id", function (node, oldId) {
            if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel && _this.batchInput === oldId) {
                _this.batchInput = node.id;
            }
        });
        return _this;
    }
    SBDraft2WorkflowModel.prototype.createInputFromPort = function (inPort, data) {
        if (data === void 0) { data = {}; }
        var port = _super.prototype._createInputFromPort.call(this, inPort, SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel, undefined, undefined, data);
        port.customProps["sbg:includeInPorts"] = true;
        return port;
    };
    SBDraft2WorkflowModel.prototype.createOutputFromPort = function (outPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createOutputFromPort.call(this, outPort, SBDraft2WorkflowOutputParameterModel_1.SBDraft2WorkflowOutputParameterModel, undefined, undefined, data);
    };
    SBDraft2WorkflowModel.prototype.exposePort = function (inPort) {
        _super.prototype._exposePort.call(this, inPort, SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel);
    };
    SBDraft2WorkflowModel.prototype.getSourceConnectionId = function (source) {
        // source comes from a step
        if (/[.]+/.test(source)) {
            var _a = source.split("."), step = _a[0], id = _a[1];
            step = step.charAt(0) === "#" ? step.substr(1) : step;
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + step + "/" + id;
        }
        else {
            var s = source.charAt(0) === "#" ? source.substr(1) : source;
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + s + "/" + s;
        }
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    SBDraft2WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        if (/[.]+/.test(source)) {
            var split = source.split('.');
            if (split[0] === "#" + stepId)
                return split[1];
            return null;
        }
        return null;
    };
    SBDraft2WorkflowModel.prototype.addStepFromProcess = function (proc) {
        var _this = this;
        var loc = this.loc + ".steps[" + this.steps.length + "]";
        var step = new SBDraft2StepModel_1.SBDraft2StepModel({
            inputs: [],
            outputs: [],
            run: proc
        }, loc, this.eventHub);
        step.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.steps.push(step);
        step.id = this.getNextAvailableId(step.id);
        this.addStepToGraph(step);
        this.eventHub.emit("step.create", step);
        return step;
    };
    SBDraft2WorkflowModel.prototype.setBatch = function (input, value) {
        if (!value || value === "none") {
            this.batchByValue = null;
            this.batchInput = null;
            return;
        }
        this.batchInput = input;
        this.batchByValue = value;
    };
    SBDraft2WorkflowModel.prototype.addHint = function (hint) {
        return this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, undefined, true);
    };
    SBDraft2WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    SBDraft2WorkflowModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    SBDraft2WorkflowModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.class = "Workflow";
        base.cwlVersion = "sbg:draft-2";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        base.inputs = this.inputs.map(function (i) { return i.serialize(); });
        base.outputs = this.outputs.map(function (o) { return o.serialize(); });
        base.steps = this.steps.map(function (s) {
            if (embed) {
                return s.serializeEmbedded(retainSource);
            }
            else {
                return s.serialize();
            }
        });
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        if (this.batchInput)
            base["sbg:batchInput"] = "#" + this.batchInput;
        if (this.batchByValue) {
            var valueIsArray = Array.isArray(this.batchByValue);
            var batchBy = {
                type: valueIsArray ? "criteria" : "item"
            };
            if (valueIsArray) {
                batchBy.criteria = this.batchByValue;
            }
            base["sbg:batchBy"] = batchBy;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2WorkflowModel.prototype.deserialize = function (workflow) {
        var _this = this;
        var serializedKeys = [
            "id",
            "class",
            "cwlVersion",
            "steps",
            "inputs",
            "outputs",
            "label",
            "hints",
            "description",
            "sbg:batchBy",
            "sbg:batchInput"
        ];
        this.label = workflow.label;
        this.description = workflow.description;
        this.id = workflow["sbg:id"] && workflow["sbg:id"].split("/").length > 2 ?
            workflow["sbg:id"].split("/")[2] :
            utils_1.snakeCase(workflow.id);
        this.sbgId = workflow["sbg:id"];
        this.steps = utils_1.ensureArray(workflow.steps).map(function (step, index) {
            if (step.run && typeof step.run !== "string") {
                step.run.cwlVersion = step.run.cwlVersion || "sbg:draft-2";
            }
            var stepModel = new SBDraft2StepModel_1.SBDraft2StepModel(step, _this.loc + ".steps[" + index + "]", _this.eventHub);
            stepModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return stepModel;
        });
        this.inputs = utils_1.ensureArray(workflow.inputs).map(function (input, index) {
            var inputParameterModel = new SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel(input, _this.loc + ".inputs[" + index + "]", _this.eventHub);
            inputParameterModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return inputParameterModel;
        });
        this.outputs = utils_1.ensureArray(workflow.outputs).map(function (output, index) {
            var outputParameterModel = new SBDraft2WorkflowOutputParameterModel_1.SBDraft2WorkflowOutputParameterModel(output, _this.loc + ".outputs[" + index + "]", _this.eventHub);
            outputParameterModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return outputParameterModel;
        });
        this.hints = utils_1.ensureArray(workflow.hints).map(function (hint, i) {
            return _this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        if (workflow["sbg:batchInput"]) {
            // Remove # in front of id
            if (workflow["sbg:batchInput"].indexOf("#") === 0) {
                this.batchInput = workflow["sbg:batchInput"].substring(1);
            }
            if (workflow["sbg:batchBy"].type === "item") {
                this.batchByValue = "item";
            }
            else {
                this.batchByValue = workflow["sbg:batchBy"].criteria;
            }
        }
        else {
            this.batchByValue = null;
            this.batchInput = null;
        }
        utils_1.spreadSelectProps(workflow, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowModel;
}(WorkflowModel_1.WorkflowModel));
exports.SBDraft2WorkflowModel = SBDraft2WorkflowModel;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var StepModel_1 = __webpack_require__(18);
var WorkflowModel_1 = __webpack_require__(11);
var ExpressionToolModel_1 = __webpack_require__(50);
var SBDraft2WorkflowStepInputModel_1 = __webpack_require__(90);
var SBDraft2WorkflowStepOutputModel_1 = __webpack_require__(91);
var utils_1 = __webpack_require__(0);
var WorkflowFactory_1 = __webpack_require__(26);
var CommandLineToolFactory_1 = __webpack_require__(28);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2StepModel = /** @class */ (function (_super) {
    __extends(SBDraft2StepModel, _super);
    function SBDraft2StepModel(step, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasMultipleScatter = false;
        _this.hasScatterMethod = false;
        if (step)
            _this.deserialize(step);
        return _this;
    }
    SBDraft2StepModel.prototype.setRunProcess = function (process) {
        if (process && process.class) {
            this.createRun(process);
            this.compareInPorts(true);
            this.compareOutPorts(true);
            this.eventHub.emit("step.update", this);
        }
    };
    SBDraft2StepModel.prototype.addHint = function (hint) {
        return this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, undefined, true);
    };
    SBDraft2StepModel.prototype.compareInPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runInputs = this.run.inputs;
        var inserted = [], removed, remaining;
        remaining = this.in;
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.in, this.run.inputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            removed.forEach(function (r) { return _this.eventHub.emit("step.inPort.remove", r); });
        }
        // because type cannot be check on the level of the step
        // (step.in is just the id of the incoming port),
        // type and fileTypes from the app's inputs are spliced into the in ports.
        // Type validation is done for connections based on this information
        this.in = runInputs.map(function (input, index) {
            var match = remaining.find(function (port) { return input.id === port.id; });
            var serialized = match ? match.serialize() : { id: _this.id + "." + input.id };
            // here will set source and default if they exist
            var newPort = new SBDraft2WorkflowStepInputModel_1.SBDraft2WorkflowStepInputModel(__assign({ type: input.type, fileTypes: input.fileTypes || [], description: input.description, label: input.label }, serialized, { "sbg:toolDefaultValue": input.customProps["sbg:toolDefaultValue"], "sbg:category": input.customProps["sbg:category"], "sbg:altPrefix": input.customProps["sbg:altPrefix"] }), _this, _this.loc + ".inputs[" + index + "]");
            newPort.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // in case the port was inserted, signify to parent workflow that
            // it should be added to the graph
            if (inserted.find(function (i) { return i.id === newPort.id; })) {
                _this.eventHub.emit("step.inPort.create", newPort);
            }
            // in case there is a match and the step is being updated, signify to parent workflow
            // to update node info in graph
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", newPort);
            }
            // for some absurd reason, visibility is kept inside the run property, on the actual input
            newPort.isVisible = (match ? match.isVisible : !!input["customProps"]["sbg:includeInPorts"]) || utils_1.isFileType(input, true);
            var matchExistedAndWasChanged = (match ? match.isVisible !== newPort.isVisible : true);
            // notify the canvas that it should display this port but only if its visibility has changed
            if (newPort.isVisible && isUpdate && matchExistedAndWasChanged) {
                // wrapping this in a setTimeout so it will execute in the next tick
                // the svg relies on model.parentStep being correct, which can only happen
                // after this.in is set, so after all iterations
                setTimeout(function () {
                    _this.eventHub.emit("step.inPort.show", newPort);
                });
            }
            return newPort;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    SBDraft2StepModel.prototype.compareOutPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runOutputs = this.run.outputs;
        var inserted = [], removed, remaining;
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.out, this.run.outputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            removed.forEach(function (r) { return _this.eventHub.emit("step.outPort.remove", r); });
        }
        this.out = runOutputs.map(function (output, index) {
            var match = _this.out.find(function (port) { return output.id === port.id; });
            match = match ? match.serialize() : { id: _this.id + "." + output.id };
            var model = new SBDraft2WorkflowStepOutputModel_1.SBDraft2WorkflowStepOutputModel(__assign({ type: output.type, fileTypes: output.fileTypes, description: output.description, label: output.label }, match), _this, _this.loc + ".outputs[" + index + "]");
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.outPort.create", model);
            }
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    SBDraft2StepModel.prototype.createRun = function (process) {
        var _this = this;
        switch (process.class) {
            case "Workflow":
                this.run = WorkflowFactory_1.WorkflowFactory.from(process, this.loc + ".run");
                this.run.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
                break;
            case "CommandLineTool":
                this.run = CommandLineToolFactory_1.CommandLineToolFactory.from(process, this.loc + ".run");
                this.run.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
                break;
            case "ExpressionTool":
                this.run = new ExpressionToolModel_1.ExpressionToolModel(process);
                break;
            default:
                throw new Error("Unknown process class \"" + process.class + "\" at " + this.loc + ".step. Expected \"CommandLineTool\", \"Workflow\", or \"ExpressionTool\"");
        }
        // when the step is being updated, the ID will not change
        this.id = this.id || utils_1.snakeCase(this.run.id) || utils_1.snakeCase(this.run.label) || utils_1.snakeCase(this.loc);
        this.id = this.id.charAt(0) === "#" ? this.id.substr(1) : this.id;
        this._label = this._label || this.run.label || "";
    };
    SBDraft2StepModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    SBDraft2StepModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    SBDraft2StepModel.prototype._serialize = function (embed, retainSource) {
        var _this = this;
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.id = "#" + this.id;
        base.inputs = this.in.map(function (i) { return i.serialize(); }).filter(function (i) {
            var keys = Object.keys(i);
            return !(keys.length === 1 && keys[0] === "id");
        });
        base.outputs = this.out.map(function (o) { return o.serialize(); });
        if (this.customProps["sbg:rdfId"] && !embed) {
            base.run = this.customProps["sbg:rdfId"];
        }
        else if (embed && this.run && this.run instanceof WorkflowModel_1.WorkflowModel) {
            base.run = this.run.serializeEmbedded();
        }
        else if (this.run && typeof this.run.serialize === "function") {
            base.run = this.run.serialize();
        }
        else {
            base.run = this.runPath;
        }
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        var temp = __assign({}, this.customProps);
        if (!retainSource) {
            delete temp["sbg:rdfId"];
            delete temp["sbg:rdfSource"];
        }
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        if (this.scatter)
            base.scatter = this.in.filter(function (i) { return _this.scatter === i.id; })[0].destinationId;
        return utils_1.spreadAllProps(base, temp);
    };
    SBDraft2StepModel.prototype.deserialize = function (step) {
        var _this = this;
        var serializedKeys = [
            "id",
            "description",
            "label",
            "run",
            "scatter",
            "inputs",
            "outputs",
            "hints"
        ];
        this.id = step.id || "";
        this.description = step.description;
        this._label = step.label;
        this.scatter = step.scatter ? step.scatter.split(".")[1] : null;
        this.hints = utils_1.ensureArray(step.hints).map(function (hint, i) {
            return _this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        if (step.run && typeof step.run === "string") {
            this.runPath = step.run;
        }
        else if (step.run && typeof step.run !== "string" && step.run.class) {
            this.createRun(step.run);
        }
        this.id = this.id.charAt(0) === "#" ? this.id.substr(1) : this.id;
        this.in = utils_1.ensureArray(step.inputs).map(function (step, index) {
            return new SBDraft2WorkflowStepInputModel_1.SBDraft2WorkflowStepInputModel(step, _this, _this.loc + ".inputs[" + index + "]");
        });
        this.out = utils_1.ensureArray(step.outputs).map(function (step, index) {
            return new SBDraft2WorkflowStepOutputModel_1.SBDraft2WorkflowStepOutputModel(step, _this, _this.loc + ".outputs[" + index + "]");
        });
        if (typeof step.run === "string") {
            console.warn("Expected to get json for step.run at " + this.loc + ", reading in and out from step");
        }
        else {
            this.compareInPorts();
            this.compareOutPorts();
        }
        this.in.forEach(function (i) {
            // if in type is a required file or required array of files, include it by default
            if (utils_1.isFileType(i, true)) {
                i.isVisible = true;
            }
        });
        utils_1.spreadSelectProps(step, this.customProps, serializedKeys);
    };
    return SBDraft2StepModel;
}(StepModel_1.StepModel));
exports.SBDraft2StepModel = SBDraft2StepModel;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepInputModel_1 = __webpack_require__(19);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var ParameterTypeModel_1 = __webpack_require__(4);
var SBDraft2WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowStepInputModel, _super);
    function SBDraft2WorkflowStepInputModel(input, parentStep, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = parentStep || {};
        if (input)
            _this.deserialize(input);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "connectionId", {
        /**
         * The connectionId used within the graph, prefix with "in/" because it refers to the
         */
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "destinationId", {
        /**
         * ID used for scatter
         * @returns {string}
         */
        get: function () {
            return "#" + this.parentStep.id + "." + this._id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowStepInputModel.prototype.serialize = function () {
        var base = {};
        base.id = "#" + this.parentStep.id + "." + this._id;
        if (this.source.length)
            base.source = this.source.slice();
        if (this.linkMerge)
            base.linkMerge = this.linkMerge;
        if (this.default !== undefined && this.default !== null)
            base.default = this.default;
        base = utils_1.spreadAllProps(base, this.customProps);
        delete base["sbg:toolDefaultValue"];
        delete base["sbg:category"];
        delete base["sbg:altPrefix"];
        return base;
    };
    SBDraft2WorkflowStepInputModel.prototype.deserialize = function (attr) {
        var serializedKeys = [
            "default",
            "id",
            "fileTypes",
            "type",
            "description",
            "label",
            "source"
        ];
        this.default = attr.default;
        this._id = attr.id.split(".")[1];
        // properties that will not be serialized on the step.in,
        // but are necessary for internal functions
        this.fileTypes = attr["fileTypes"];
        this.description = attr["description"];
        this.label = attr["label"];
        this.source = utils_1.ensureArray(attr.source);
        this.type = attr["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowStepInputModel;
}(WorkflowStepInputModel_1.WorkflowStepInputModel));
exports.SBDraft2WorkflowStepInputModel = SBDraft2WorkflowStepInputModel;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepOutputModel_1 = __webpack_require__(20);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var ParameterTypeModel_1 = __webpack_require__(4);
var SBDraft2WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowStepOutputModel, _super);
    function SBDraft2WorkflowStepOutputModel(output, parentStep, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = parentStep || {};
        if (output)
            _this.deserialize(output);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "connectionId", {
        /**
         * ID used in graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "sourceId", {
        /**
         * ID used for creating connections
         */
        get: function () {
            return "#" + this.parentStep.id + "." + this._id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowStepOutputModel.prototype.serialize = function () {
        return {
            id: "#" + this.parentStep.id + "." + this._id
        };
    };
    SBDraft2WorkflowStepOutputModel.prototype.deserialize = function (attr) {
        var serializedKeys = ["id", "sbg:fileTypes"];
        this._id = attr.id.split(".")[1];
        // properties that will not be serialized on the step.out,
        // but are necessary for internal functions
        this.fileTypes = attr["fileTypes"];
        this.type = attr["type"];
        this.description = attr["description"];
        this.label = attr["label"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowStepOutputModel;
}(WorkflowStepOutputModel_1.WorkflowStepOutputModel));
exports.SBDraft2WorkflowStepOutputModel = SBDraft2WorkflowStepOutputModel;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var ParameterTypeModel_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(0);
var SBDraft2WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowInputParameterModel, _super);
    function SBDraft2WorkflowInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (input)
            _this.deserialize(input);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowInputParameterModel.prototype, "connectionId", {
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowInputParameterModel.prototype, "sourceId", {
        get: function () {
            return "#" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowInputParameterModel.prototype.deserialize = function (input) {
        var _this = this;
        var serializedKeys = ["name", "id", "type", "label", "description", "sbg:fileTypes"];
        this.isField = !!input.name;
        if (input.id && input.id.charAt(0) === "#") {
            this.id = input.id.substr(1);
        }
        else {
            this.id = input.id
                || input.name || ""; // for record fields
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(input.type, SBDraft2WorkflowInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) {
            _this.updateValidity(err);
        });
        this.fileTypes = utils_1.commaSeparatedToArray(input["sbg:fileTypes"]);
        this._label = input.label;
        this.description = input.description;
        // only show inputs which are type File or File[], or should be explicitly shown
        this.isVisible = this.type.type === "File" || this.type.items === "File" || !!input["sbg:includeInPorts"];
        utils_1.spreadSelectProps(input, this.customProps, serializedKeys);
    };
    SBDraft2WorkflowInputParameterModel.prototype.serialize = function () {
        var base = {};
        base.type = this.type.serialize();
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        if (this.isField) {
            base.name = this.id;
        }
        else {
            base.id = "#" + this.id;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return SBDraft2WorkflowInputParameterModel;
}(WorkflowInputParameterModel_1.WorkflowInputParameterModel));
exports.SBDraft2WorkflowInputParameterModel = SBDraft2WorkflowInputParameterModel;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowOutputParameterModel_1 = __webpack_require__(16);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowOutputParameterModel, _super);
    function SBDraft2WorkflowOutputParameterModel(attr, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (attr)
            _this.deserialize(attr);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowOutputParameterModel.prototype, "destinationId", {
        get: function () {
            return "#" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowOutputParameterModel.prototype.serialize = function () {
        var base = {};
        base.id = "#" + this.id;
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        base.source = utils_1.ensureArray(this.source);
        if (this.type)
            base.type = this.type.serialize();
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2WorkflowOutputParameterModel.prototype.deserialize = function (output) {
        var serializedKeys = ["id", "type", "source", "label", "description", "sbg:fileTypes"];
        if (output.id && output.id.charAt(0) === "#") {
            this.id = output.id.substr(1);
        }
        else {
            this.id = output.id || ""; // for record fields
        }
        this.source = utils_1.ensureArray(output.source);
        this.type = new ParameterTypeModel_1.ParameterTypeModel(output.type, SBDraft2WorkflowOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this._label = output.label;
        this.description = output.description;
        this.fileTypes = utils_1.commaSeparatedToArray(output["sbg:fileTypes"]);
        utils_1.spreadSelectProps(output, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowOutputParameterModel;
}(WorkflowOutputParameterModel_1.WorkflowOutputParameterModel));
exports.SBDraft2WorkflowOutputParameterModel = SBDraft2WorkflowOutputParameterModel;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(17));
__export(__webpack_require__(29));
__export(__webpack_require__(95));
__export(__webpack_require__(41));
__export(__webpack_require__(27));
__export(__webpack_require__(6));
__export(__webpack_require__(0));


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm = __webpack_require__(96);
var JSExecutor = /** @class */ (function () {
    function JSExecutor() {
    }
    JSExecutor.evaluate = function (expr, context) {
        return new Promise(function (res, rej) {
            try {
                var result = vm.runInNewContext(expr, context || {}, { timeout: 1000 });
                res(result);
            }
            catch (ex) {
                rej(ex);
            }
        });
    };
    return JSExecutor;
}());
exports.JSExecutor = JSExecutor;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var indexOf = __webpack_require__(97);

var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
    });

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DomEvents = /** @class */ (function () {
    function DomEvents(root) {
        this.root = root;
        this.handlers = new Map();
    }
    DomEvents.prototype.on = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var event = args.shift();
        var selector = typeof args[0] === "string" ? args.shift() : undefined;
        var handler = typeof args[0] === "function" ? args.shift() : function () {
        };
        var root = args.shift();
        var eventHolder = root || this.root;
        if (!this.handlers.has(eventHolder)) {
            this.handlers.set(eventHolder, {});
        }
        if (!this.handlers.get(eventHolder)[event]) {
            this.handlers.get(eventHolder)[event] = [];
        }
        var evListener = function (ev) {
            var target;
            if (selector) {
                var selected = Array.from(_this.root.querySelectorAll(selector));
                target = ev.target;
                while (target) {
                    if (selected.find(function (el) { return el === target; })) {
                        break;
                    }
                    target = target.parentNode;
                }
                if (!target) {
                    return;
                }
            }
            var handlerOutput = handler(ev, target || ev.target, _this.root);
            if (handlerOutput === false) {
                return false;
            }
            return false;
        };
        eventHolder.addEventListener(event, evListener);
        this.handlers.get(eventHolder)[event].push(evListener);
        return function off() {
            eventHolder.removeEventListener(event, evListener);
        };
    };
    DomEvents.prototype.keyup = function () {
    };
    DomEvents.prototype.adaptedDrag = function (selector, move, start, end) {
        var _this = this;
        var dragging = false;
        var lastMove;
        var draggedEl;
        var moveEventCount = 0;
        var mouseDownEv;
        var threshold = 3;
        var mouseOverListeners;
        var onMouseDown = function (ev, el) {
            dragging = true;
            lastMove = ev;
            draggedEl = el;
            mouseDownEv = ev;
            ev.preventDefault();
            mouseOverListeners = _this.detachHandlers("mouseover");
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", upHandler);
            return false;
        };
        var off = this.on("mousedown", selector, onMouseDown);
        var moveHandler = function (ev) {
            if (!dragging) {
                return;
            }
            var dx = ev.screenX - lastMove.screenX;
            var dy = ev.screenY - lastMove.screenY;
            moveEventCount++;
            if (moveEventCount === threshold && typeof start === "function") {
                start(mouseDownEv, draggedEl, _this.root);
            }
            if (moveEventCount >= threshold && typeof move === "function") {
                move(dx, dy, ev, draggedEl, _this.root);
            }
        };
        var upHandler = function (ev) {
            if (moveEventCount >= threshold) {
                if (dragging) {
                    if (typeof end === "function") {
                        end(ev, draggedEl, _this.root);
                    }
                }
                var parentNode_1 = draggedEl.parentNode;
                var clickCancellation_1 = function (ev) {
                    ev.stopPropagation();
                    parentNode_1.removeEventListener("click", clickCancellation_1, true);
                };
                parentNode_1.addEventListener("click", clickCancellation_1, true);
            }
            dragging = false;
            draggedEl = undefined;
            lastMove = undefined;
            moveEventCount = 0;
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("mousemove", moveHandler);
            for (var i in mouseOverListeners) {
                _this.root.addEventListener("mouseover", mouseOverListeners[i]);
                _this.handlers.get(_this.root)["mouseover"] = [];
                _this.handlers.get(_this.root)["mouseover"].push(mouseOverListeners[i]);
            }
        };
        return off;
    };
    DomEvents.prototype.drag = function (selector, move, start, end) {
        var _this = this;
        var dragging = false;
        var lastMove;
        var draggedEl;
        var moveEventCount = 0;
        var mouseDownEv;
        var threshold = 3;
        var mouseOverListeners;
        var onMouseDown = function (ev, el, root) {
            dragging = true;
            lastMove = ev;
            draggedEl = el;
            mouseDownEv = ev;
            ev.preventDefault();
            mouseOverListeners = _this.detachHandlers("mouseover");
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", upHandler);
            return false;
        };
        var off = this.on("mousedown", selector, onMouseDown);
        var moveHandler = function (ev) {
            if (!dragging) {
                return;
            }
            var dx = ev.screenX - lastMove.screenX;
            var dy = ev.screenY - lastMove.screenY;
            moveEventCount++;
            if (moveEventCount === threshold && typeof start === "function") {
                start(mouseDownEv, draggedEl, _this.root);
            }
            if (moveEventCount >= threshold && typeof move === "function") {
                move(dx, dy, ev, draggedEl, _this.root);
            }
        };
        var upHandler = function (ev) {
            if (moveEventCount >= threshold) {
                if (dragging) {
                    if (typeof end === "function") {
                        end(ev, draggedEl, _this.root);
                    }
                }
                // When releasing the mouse button, if it happens over the same element that we initially had
                // the mouseDown event, it will trigger a click event. We want to stop that, so we intercept
                // it by capturing click top-down and stopping its propagation.
                // However, if the mouseUp didn't happen above the starting element, it wouldn't trigger a click,
                // but it would intercept the next (unrelated) click event unless we prevent interception in the
                // first place by checking if we released above the starting element.
                if (draggedEl.contains(ev.target)) {
                    var parentNode_2 = draggedEl.parentNode;
                    var clickCancellation_2 = function (ev) {
                        ev.stopPropagation();
                        parentNode_2.removeEventListener("click", clickCancellation_2, true);
                    };
                    parentNode_2.addEventListener("click", clickCancellation_2, true);
                }
            }
            dragging = false;
            draggedEl = undefined;
            lastMove = undefined;
            moveEventCount = 0;
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("mousemove", moveHandler);
            for (var i in mouseOverListeners) {
                _this.root.addEventListener("mouseover", mouseOverListeners[i]);
                _this.handlers.get(_this.root)["mouseover"] = [];
                _this.handlers.get(_this.root)["mouseover"].push(mouseOverListeners[i]);
            }
        };
        return off;
    };
    DomEvents.prototype.hover = function (element, hover, enter, leave) {
        var _this = this;
        if (hover === void 0) { hover = function () {
        }; }
        if (enter === void 0) { enter = function () {
        }; }
        if (leave === void 0) { leave = function () {
        }; }
        var hovering = false;
        element.addEventListener("mouseenter", function (ev) {
            hovering = true;
            enter(ev, element, _this.root);
        });
        element.addEventListener("mouseleave", function (ev) {
            hovering = false;
            leave(ev, element, _this.root);
        });
        element.addEventListener("mousemove", function (ev) {
            if (!hovering) {
                return;
            }
            hover(ev, element, _this.root);
        });
    };
    DomEvents.prototype.detachHandlers = function (evName, root) {
        root = root || this.root;
        var eventListeners = [];
        this.handlers.forEach(function (handlers, listenerRoot) {
            if (listenerRoot.id !== root.id || listenerRoot !== root) {
                return;
            }
            var _loop_1 = function (eventName) {
                if (eventName !== evName) {
                    return "continue";
                }
                handlers[eventName].forEach(function (handler) {
                    eventListeners.push(handler);
                    listenerRoot.removeEventListener(eventName, handler);
                });
            };
            for (var eventName in handlers) {
                _loop_1(eventName);
            }
        });
        delete this.handlers.get(this.root)[evName];
        return eventListeners;
    };
    DomEvents.prototype.detachAll = function () {
        this.handlers.forEach(function (handlers, listenerRoot) {
            var _loop_2 = function (eventName) {
                handlers[eventName].forEach(function (handler) { return listenerRoot.removeEventListener(eventName, handler); });
            };
            for (var eventName in handlers) {
                _loop_2(eventName);
            }
        });
        this.handlers.clear();
    };
    return DomEvents;
}());
exports.DomEvents = DomEvents;
//# sourceMappingURL=dom-events.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventHub = /** @class */ (function () {
    function EventHub(validEventList) {
        this.handlers = validEventList.reduce(function (acc, ev) {
            return Object.assign(acc, (_a = {}, _a[ev] = [], _a));
            var _a;
        }, {});
    }
    EventHub.prototype.on = function (event, handler) {
        var _this = this;
        this.guard(event, "subscribe to");
        this.handlers[event].push(handler);
        return function () { return _this.off(event, handler); };
    };
    EventHub.prototype.off = function (event, handler) {
        this.guard(event, "unsubscribe from");
        return this.handlers[event].splice(this.handlers[event].findIndex(function (h) { return handler === h; }), 1);
    };
    EventHub.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.guard(event, "emit");
        for (var i = 0; i < this.handlers[event].length; i++) {
            (_a = this.handlers[event])[i].apply(_a, __spread(data));
        }
        var _a;
    };
    EventHub.prototype.empty = function () {
        for (var event_1 in this.handlers) {
            this.handlers[event_1] = [];
        }
    };
    EventHub.prototype.guard = function (event, verb) {
        if (!this.handlers[event]) {
            console.warn("Trying to " + verb + " a non-supported event \u201C" + event + "\u201D. \n            Supported events are: " + Object.keys(this.handlers).join(", ") + "\u201D");
        }
    };
    return EventHub;
}());
exports.EventHub = EventHub;
//# sourceMappingURL=event-hub.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HtmlUtils = /** @class */ (function () {
    function HtmlUtils() {
    }
    HtmlUtils.escapeHTML = function (source) {
        return String(source).replace(/[&<>"'\/]/g, function (s) { return HtmlUtils.entityMap[s]; });
    };
    HtmlUtils.entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"\"": "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    return HtmlUtils;
}());
exports.HtmlUtils = HtmlUtils;
//# sourceMappingURL=html-utils.js.map

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cwl_svg_1 = __webpack_require__(51);
var WorkflowExpansionPlugin = /** @class */ (function (_super) {
    __extends(WorkflowExpansionPlugin, _super);
    function WorkflowExpansionPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkflowExpansionPlugin.prototype.afterRender = function () {
        var _this = this;
        window.addEventListener("dblclick", function (event) {
            var element = _this.workflow.findParent(event.target, "node");
            if (element) {
                var id = element.getAttribute("data-connection-id");
                var model = _this.workflow.model.findById(id);
                console.log(JSON.stringify(model));
            }
        }, true);
    };
    return WorkflowExpansionPlugin;
}(cwl_svg_1.PluginBase));
exports.default = WorkflowExpansionPlugin;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map