"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bcrypt = require("bcrypt");
var middleware_1 = require("./middleware");
var user_1 = require("../models/user");
var passport = require("passport");
var post_1 = require("../models/post");
var router = express.Router();
router.get('/', middleware_1.isLoggedIn, function (req, res) {
    var user = req.user.toJSON();
    delete user.password;
    return res.json(user);
});
router.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, hashedPassword, newUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, user_1["default"].findOne({
                        where: {
                            userId: req.body.userId
                        }
                    })];
            case 1:
                exUser = _a.sent();
                if (exUser) {
                    return [2 /*return*/, res.status(403).send("이미 사용 중인 아이디입니다.")];
                }
                return [4 /*yield*/, bcrypt.hash(req.body.passport, 12)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, user_1["default"].create({
                        nickname: req.body.nickname,
                        userId: req.body.userId,
                        password: hashedPassword
                    })];
            case 3:
                newUser = _a.sent();
                return [2 /*return*/, res.status(200).json(newUser)];
            case 4:
                err_1 = _a.sent();
                console.error(err_1);
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.post('/login', middleware_1.isNotLoggedIn, function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.message);
        }
        return req.login(user, function (loginErr) { return __awaiter(void 0, void 0, void 0, function () {
            var fullUser, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (loginErr) {
                            return [2 /*return*/, next(loginErr)];
                        }
                        return [4 /*yield*/, user_1["default"].findOne({
                                where: { id: user.id },
                                include: [{
                                        model: post_1["default"],
                                        as: 'Posts',
                                        attributes: ['id']
                                    }, {
                                        model: user_1["default"],
                                        as: 'Followings',
                                        attributes: ['id']
                                    }, {
                                        model: user_1["default"],
                                        as: 'Followers',
                                        attributes: ['id']
                                    }],
                                attributes: {
                                    exclude: ['password']
                                }
                            })];
                    case 1:
                        fullUser = _a.sent();
                        return [2 /*return*/, res.json(fullUser)];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [2 /*return*/, next(err_2)];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    })(req, res, next);
});
router.post('/logout', middleware_1.isLoggedIn, function (req, res) {
    req.logout();
    req.session.destroy(function () {
        res.send('logout 성공');
    });
});
router.get('/:id', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jsonUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].findOne({
                        where: { id: parseInt(req.params.id, 10) },
                        include: [{
                                model: post_1["default"],
                                as: 'Posts',
                                attributes: ['id']
                            }, {
                                model: user_1["default"],
                                as: 'Followings',
                                attributes: ['id']
                            }, {
                                model: user_1["default"],
                                as: 'Followers',
                                attributes: ['id']
                            }],
                        attributes: {
                            exclude: ['password']
                        }
                    })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).send('no user')];
                }
                jsonUser = user.toJSON();
                jsonUser.PostCount = jsonUser.Posts ? jsonUser.Posts.length : 0;
                jsonUser.FollowingCount = jsonUser.Followings ? jsonUser.Followings.length : 0;
                jsonUser.FollowerCount = jsonUser.Followers ? jsonUser.Followers.length : 0;
                return [2 /*return*/, res.json(jsonUser)];
            case 2:
                err_3 = _a.sent();
                console.error(err_3);
                return [2 /*return*/, next(err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// router.get('/:id/followings', isLoggedIn, async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: { id: parseInt(req.params.id, 10) || (req.user && req.user.id) || 0 },
//     });
//     if (!user) return res.status(404).send('no user');
//     const follower = await user.getFollowings({
//       attributes: ['id', 'nickname'],
//     });
//   } catch (err) {
//     console.error(err);
//     return next(err);
//   }
// });
