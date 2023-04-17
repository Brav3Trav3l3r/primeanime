"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handle = void 0;

require("$lib/supabase");

var _authHelpersSveltekit = require("@supabase/auth-helpers-sveltekit");

var handle = function handle(_ref) {
  var event, resolve, error, _ref2, session, supabaseClient;

  return regeneratorRuntime.async(function handle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event = _ref.event, resolve = _ref.resolve, error = _ref.error;
          console.time("handle");
          _context.next = 4;
          return regeneratorRuntime.awrap((0, _authHelpersSveltekit.getSupabase)(event));

        case 4:
          _ref2 = _context.sent;
          session = _ref2.session;
          supabaseClient = _ref2.supabaseClient;
          event.locals.sb = supabaseClient;
          event.locals.session = session;
          console.timeEnd("handle");
          return _context.abrupt("return", resolve(event));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.handle = handle;