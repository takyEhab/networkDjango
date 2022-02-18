"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkfullstacknetwork"] = self["webpackChunkfullstacknetwork"] || []).push([["network_frontend_src_components_SignUp_js"],{

/***/ "./network/frontend/src/components/SignUp.js":
/*!***************************************************!*\
  !*** ./network/frontend/src/components/SignUp.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SignUp)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var _mui_material_Avatar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @mui/material/Avatar */ \"./node_modules/@mui/material/Avatar/Avatar.js\");\n/* harmony import */ var _mui_material_Button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @mui/material/Button */ \"./node_modules/@mui/material/Button/Button.js\");\n/* harmony import */ var _mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @mui/material/CssBaseline */ \"./node_modules/@mui/material/CssBaseline/CssBaseline.js\");\n/* harmony import */ var _mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @mui/material/TextField */ \"./node_modules/@mui/material/TextField/TextField.js\");\n/* harmony import */ var _mui_material_Link__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @mui/material/Link */ \"./node_modules/@mui/material/Link/Link.js\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @mui/material/Grid */ \"./node_modules/@mui/material/Grid/Grid.js\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @mui/material/Box */ \"./node_modules/@mui/material/Box/Box.js\");\n/* harmony import */ var _mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mui/icons-material/LockOutlined */ \"./node_modules/@mui/icons-material/LockOutlined.js\");\n/* harmony import */ var _mui_material_Typography__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @mui/material/Typography */ \"./node_modules/@mui/material/Typography/Typography.js\");\n/* harmony import */ var _mui_material_Container__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @mui/material/Container */ \"./node_modules/@mui/material/Container/Container.js\");\n/* harmony import */ var _mui_material_Alert__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @mui/material/Alert */ \"./node_modules/@mui/material/Alert/Alert.js\");\n/* harmony import */ var _mui_material_Slide__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @mui/material/Slide */ \"./node_modules/@mui/material/Slide/Slide.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/material/styles/createTheme.js\");\n/* harmony import */ var _mui_material_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @mui/material/styles */ \"./node_modules/@mui/system/esm/ThemeProvider/ThemeProvider.js\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router/esm/react-router.js\");\n/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! notistack */ \"./node_modules/notistack/dist/notistack.esm.js\");\n/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./axios */ \"./network/frontend/src/components/axios.js\");\n/* harmony import */ var _userContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./userContext */ \"./network/frontend/src/components/userContext.js\");\n/* harmony import */ var _store_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store/actions */ \"./network/frontend/src/components/store/actions.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar theme = (0,_mui_material_styles__WEBPACK_IMPORTED_MODULE_9__[\"default\"])();\nfunction SignUp(props) {\n  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useDispatch)(); // const { dispatch } = useContext(UserContext)\n\n  var _useSnackbar = (0,notistack__WEBPACK_IMPORTED_MODULE_4__.useSnackbar)(),\n      enqueueSnackbar = _useSnackbar.enqueueSnackbar;\n\n  var history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useHistory)();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_3__.useState({\n    message: '',\n    close: false,\n    isError: false\n  }),\n      _React$useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(_React$useState, 2),\n      error = _React$useState2[0],\n      setError = _React$useState2[1];\n\n  var register = /*#__PURE__*/function () {\n    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(username, email, password, password2) {\n      var res, config, _error, message, errors, i;\n\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.prev = 0;\n              _context.next = 3;\n              return _axios__WEBPACK_IMPORTED_MODULE_5__.api.post('register/', {\n                username: username,\n                email: email,\n                password: password,\n                password2: password2\n              });\n\n            case 3:\n              res = _context.sent;\n              config = {\n                headers: {\n                  Authorization: \"Token \".concat(res.data.token)\n                }\n              };\n              localStorage.setItem('CONFIG', JSON.stringify(config));\n              dispatch((0,_store_actions__WEBPACK_IMPORTED_MODULE_7__.logIn)(res.data.user, config));\n              enqueueSnackbar('you are registered successfully!', {\n                variant: 'success'\n              });\n              history.push('/');\n              _context.next = 15;\n              break;\n\n            case 11:\n              _context.prev = 11;\n              _context.t0 = _context[\"catch\"](0);\n              _error = _context.t0.response;\n\n              if (_error) {\n                message = _error.data;\n                errors = ['username', 'password', 'email'];\n\n                for (i = 0; i < errors.length; i++) {\n                  if (message[errors[i]]) {\n                    setError({\n                      close: false,\n                      isError: true,\n                      message: message[errors[i]].isArray ? message[errors[i]][0] : message[errors[i]]\n                    });\n                  }\n                }\n              }\n\n            case 15:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee, null, [[0, 11]]);\n    }));\n\n    return function register(_x, _x2, _x3, _x4) {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  var handleSubmit = function handleSubmit(event) {\n    setError({\n      isError: false,\n      message: '',\n      close: true\n    });\n    event.preventDefault();\n    var data = new FormData(event.currentTarget);\n    register(data.get('username'), data.get('email'), data.get('password'), data.get('password2'));\n  };\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_styles__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    theme: theme\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Container__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n    component: \"main\",\n    maxWidth: \"xs\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_CssBaseline__WEBPACK_IMPORTED_MODULE_13__[\"default\"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    sx: {\n      marginTop: 8,\n      display: 'flex',\n      flexDirection: 'column',\n      alignItems: 'center'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Avatar__WEBPACK_IMPORTED_MODULE_15__[\"default\"], {\n    sx: {\n      m: 1,\n      bgcolor: 'secondary.main'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_icons_material_LockOutlined__WEBPACK_IMPORTED_MODULE_16__[\"default\"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Typography__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n    component: \"h1\",\n    variant: \"h5\"\n  }, \"Register\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Box__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n    component: \"form\",\n    validate: true,\n    onSubmit: handleSubmit,\n    sx: {\n      mt: 3\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    container: true,\n    spacing: 2\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    autoComplete: \"given-name\",\n    name: \"username\",\n    required: true,\n    fullWidth: true,\n    id: \"username\",\n    label: \"Username\",\n    autoFocus: true\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    required: true,\n    fullWidth: true,\n    id: \"email\",\n    label: \"Email Address\",\n    name: \"email\",\n    type: \"email\",\n    autoComplete: \"email\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    required: true,\n    fullWidth: true,\n    name: \"password\",\n    label: \"Password\",\n    type: \"password\",\n    id: \"password\",\n    autoComplete: \"new-password\"\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true,\n    xs: 12\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_TextField__WEBPACK_IMPORTED_MODULE_19__[\"default\"], {\n    required: true,\n    fullWidth: true,\n    name: \"password2\",\n    label: \"Password Confirmation\",\n    type: \"password\",\n    id: \"password2\",\n    autoComplete: \"new-password\"\n  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Slide__WEBPACK_IMPORTED_MODULE_20__[\"default\"], {\n    direction: \"up\",\n    \"in\": error.isError,\n    mountOnEnter: true,\n    unmountOnExit: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Alert__WEBPACK_IMPORTED_MODULE_21__[\"default\"], {\n    severity: \"error\"\n  }, error.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Button__WEBPACK_IMPORTED_MODULE_22__[\"default\"], {\n    disabled: error.close,\n    hidden: true,\n    type: \"submit\",\n    fullWidth: true,\n    variant: \"contained\",\n    sx: {\n      mt: 3,\n      mb: 2\n    }\n  }, \"Register\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    container: true,\n    justifyContent: \"flex-end\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n    item: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_mui_material_Link__WEBPACK_IMPORTED_MODULE_23__[\"default\"], {\n    href: \"/login\",\n    variant: \"body2\"\n  }, \"Already have an account? Log In\")))))));\n}\n\n//# sourceURL=webpack://fullstacknetwork/./network/frontend/src/components/SignUp.js?");

/***/ })

}]);