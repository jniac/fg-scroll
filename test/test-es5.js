var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	'use strict';

	/**
  * event.js module
  * a very permissive event module, with great options
  * second version built on WeakMap
  * inspired by jQuery (chaining, iterations), express (flexibility) etc.
  */

	var isIterable = function isIterable(obj) {
		return obj ? typeof obj[Symbol.iterator] === 'function' : false;
	};

	var whitespace = function whitespace(obj) {
		return typeof obj === 'string' && /\s/.test(obj);
	};

	var weakmap = new WeakMap();

	function createListenersArray(target) {

		var listeners = [];

		weakmap.set(target, listeners);

		return listeners;
	}

	function deleteListenersArray(target) {

		weakmap.delete(target);
	}

	function _getAllListeners(target) {
		var createMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


		return weakmap.get(target) || (createMode ? createListenersArray(target) : null);
	}

	function getListenersMatching(target, type) {
		var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;


		var listeners = weakmap.get(target);

		if (!listeners) return [];

		var result = [];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var listener = _step.value;

				if (listener.match(type, callback, options)) result.push(listener);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return result;
	}

	function _addEventListener(target, type, callback) {
		var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;


		if (isIterable(target)) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {

				for (var _iterator2 = target[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var element = _step2.value;

					_addEventListener(element, type, callback, options);
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return target;
		}

		if (whitespace(type)) {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {

				for (var _iterator3 = type.split(/\s/)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var sub = _step3.value;

					_addEventListener(target, sub, callback, options);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			return target;
		}

		var listener = new Listener(_getAllListeners(target, true), type, callback, options);

		return target;
	}

	function _once(target, type, callback) {
		var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


		options.max = 1;

		return _addEventListener(target, type, callback, options);
	}

	function _removeEventListener(target, type) {
		var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
		var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


		if (isIterable(target)) {
			var _iteratorNormalCompletion4 = true;
			var _didIteratorError4 = false;
			var _iteratorError4 = undefined;

			try {

				for (var _iterator4 = target[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
					var element = _step4.value;

					_removeEventListener(element, type, callback);
				}
			} catch (err) {
				_didIteratorError4 = true;
				_iteratorError4 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion4 && _iterator4.return) {
						_iterator4.return();
					}
				} finally {
					if (_didIteratorError4) {
						throw _iteratorError4;
					}
				}
			}

			return target;
		}

		if (whitespace(type)) {
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {

				for (var _iterator5 = type.split(/\s/)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var sub = _step5.value;

					_removeEventListener(target, type, callback);
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}

			return target;
		}

		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			for (var _iterator6 = getListenersMatching(target, type, callback, options)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				var listener = _step6.value;

				listener.kill();
			}
		} catch (err) {
			_didIteratorError6 = true;
			_iteratorError6 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion6 && _iterator6.return) {
					_iterator6.return();
				}
			} finally {
				if (_didIteratorError6) {
					throw _iteratorError6;
				}
			}
		}

		return target;
	}

	function _clearEventListener(target) {

		var listeners = weakmap.get(target);

		if (!listeners) return target;

		while (listeners.length) {
			listeners.pop().kill();
		}deleteListenersArray(target);

		return target;
	}

	function _dispatchEvent(target, event) {
		var eventOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


		if (!target) return null;

		if (isIterable(target)) {
			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {

				for (var _iterator7 = target[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var element = _step7.value;

					_dispatchEvent(element, event, eventOptions);
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}

			return target;
		}

		if (typeof event === 'string') {

			if (whitespace(event)) {
				var _iteratorNormalCompletion8 = true;
				var _didIteratorError8 = false;
				var _iteratorError8 = undefined;

				try {

					for (var _iterator8 = event.split(/\s/)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
						var sub = _step8.value;

						_dispatchEvent(target, sub, eventOptions);
					}
				} catch (err) {
					_didIteratorError8 = true;
					_iteratorError8 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion8 && _iterator8.return) {
							_iterator8.return();
						}
					} finally {
						if (_didIteratorError8) {
							throw _iteratorError8;
						}
					}
				}

				return target;
			}

			return _dispatchEvent(target, new Event(target, event, eventOptions));
		}

		event.currentTarget = target;

		var listeners = getListenersMatching(target, event.type).sort(function (A, B) {
			return B.priority - A.priority;
		});

		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = listeners[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var listener = _step9.value;


				listener.call(event);

				if (event.canceled) break;
			}
		} catch (err) {
			_didIteratorError9 = true;
			_iteratorError9 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion9 && _iterator9.return) {
					_iterator9.return();
				}
			} finally {
				if (_didIteratorError9) {
					throw _iteratorError9;
				}
			}
		}

		if (event.propagateTo) _dispatchEvent(event.propagateTo(event.currentTarget), event);

		return target;
	}

	var EventOptions = {

		cancelable: true,
		priority: 0,
		propagateTo: null

	};

	var Event = function () {
		function Event(target, type, options) {
			_classCallCheck(this, Event);

			options = Object.assign({}, EventOptions, options);

			Object.defineProperty(this, 'target', {

				value: target

			});

			Object.defineProperty(this, 'currentTarget', {

				writable: true,
				value: target

			});

			Object.defineProperty(this, 'type', { value: type });

			for (var k in options) {

				Object.defineProperty(this, k, {

					enumerable: k in EventOptions,
					value: options[k]

				});
			}

			Object.defineProperty(this, 'canceled', {

				writable: this.cancelable,
				value: false

			});
		}

		_createClass(Event, [{
			key: 'cancel',
			value: function cancel() {

				if (this.cancelable) this.canceled = true;
			}
		}]);

		return Event;
	}();

	var Listener = function () {
		function Listener(array, type, callback) {
			var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

			_classCallCheck(this, Listener);

			this.count = 0;

			this.array = array;
			this.array.push(this);

			this.enabled = true;
			this.priority = 0;

			Object.assign(this, options);

			this.type = type;
			this.callback = callback;
		}

		_createClass(Listener, [{
			key: 'match',
			value: function match(str) {
				var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


				if (options !== null && this.match(str, callback)) {

					for (var k in options) {
						if (this[k] !== options[k]) return false;
					}return true;
				}

				if (callback !== null) return this.match(str) && this.callback === callback;

				if (this.type instanceof RegExp) return this.type.test(str);

				if (this.type instanceof Array) return this.type.indexOf(str) !== -1;

				if (typeof this.type === 'function') return this.type(str);

				return this.type === str;
			}
		}, {
			key: 'call',
			value: function call(event) {
				var _callback;

				(_callback = this.callback).call.apply(_callback, [this.thisArg || event.currentTarget, event].concat(_toConsumableArray(this.args || [])));

				this.count++;

				if (this.count === this.max) this.kill();
			}
		}, {
			key: 'kill',
			value: function kill() {

				var index = this.array.indexOf(this);

				this.array.splice(index, 1);

				delete this.array;
				delete this.type;
				delete this.callback;
				delete this.options;
			}
		}]);

		return Listener;
	}();

	var EventDispatcherPrototype = {
		getAllListeners: function getAllListeners() {
			var createMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


			return _getAllListeners(this, createMode);
		},
		clearEventListener: function clearEventListener() {

			return _clearEventListener(this);
		},
		addEventListener: function addEventListener(type, callback) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;


			return _addEventListener(this, type, callback, options);
		},
		on: function on(type, callback) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;


			return _addEventListener(this, type, callback, options);
		},
		once: function once(type, callback) {
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


			return _once(this, type, callback, options);
		},
		removeEventListener: function removeEventListener(type) {
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;


			return _removeEventListener(this, type, callback, options);
		},
		off: function off(type) {
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
			var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;


			return _removeEventListener(this, type, callback, options);
		},
		dispatchEvent: function dispatchEvent(event) {
			var eventOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			return _dispatchEvent(this, event, eventOptions);
		}
	};

	var EventDispatcher = function EventDispatcher() {
		_classCallCheck(this, EventDispatcher);
	};

	Object.assign(EventDispatcher.prototype, EventDispatcherPrototype);

	var Value = function () {
		function Value() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			_classCallCheck(this, Value);

			this.value_old = value;
			this.value = value;
		}

		_createClass(Value, [{
			key: 'reset',
			value: function reset(value) {

				this.value_old = this.value = value;
			}
		}, {
			key: 'newValue',
			value: function newValue(value) {

				this.value_old = this.value;
				this.value = value;
			}
		}, {
			key: 'newValueIncrement',
			value: function newValueIncrement(value) {

				this.value_old = this.value;
				this.value += value;
			}

			/**
    * Check if the variable's value move across a threshold
    * Return a Number (that could be used as a Boolean):
    *     -1 if the variable has dropped below the threshold
    * 	   +1 if the variable passed above the threshold
    *      0 if the variable remained below or above the threshold
    */

		}, {
			key: 'through',
			value: function through(threshold) {

				var d = this.value - threshold;
				var d_old = this.value_old - threshold;

				return d >= 0 && d_old < 0 ? 1 : d <= 0 && d_old > 0 ? -1 : 0;
			}
		}]);

		return Value;
	}();

	var Variable = function (_Value) {
		_inherits(Variable, _Value);

		function Variable() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var nDerivative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
			var variableLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;

			_classCallCheck(this, Variable);

			var _this = _possibleConstructorReturn(this, (Variable.__proto__ || Object.getPrototypeOf(Variable)).call(this, value));

			_this.variableLength = variableLength;

			_this.index = 0;
			_this.values = [];

			_this.sum = new Value();
			_this.average = new Value();
			_this.growth = new Value();

			_this.reset(value);

			if (nDerivative) _this.derivative = new Variable(0, nDerivative - 1, variableLength);

			return _this;
		}

		_createClass(Variable, [{
			key: 'getValues',
			value: function getValues() {

				return this.values.slice(this.index).concat(this.values.slice(0, this.index));
			}
		}, {
			key: 'reset',
			value: function reset(value) {

				_get(Variable.prototype.__proto__ || Object.getPrototypeOf(Variable.prototype), 'reset', this).call(this, value);

				this.index = 0;

				this.sum.reset(value * this.variableLength);
				this.average.reset(value);
				this.growth.reset(1);

				for (var i = 0; i < this.variableLength; i++) {
					this.values[i] = value;
				}return this;
			}
		}, {
			key: 'newValue',
			value: function newValue(value) {

				_get(Variable.prototype.__proto__ || Object.getPrototypeOf(Variable.prototype), 'newValue', this).call(this, value);

				this.sum.newValueIncrement(-this.values[this.index] + this.value);
				this.average.newValue(this.sum.value / this.variableLength);
				this.growth.newValue(this.value / this.value_old);

				this.values[this.index] = value;
				this.index = (this.index + 1) % this.variableLength;

				if (this.derivative) this.derivative.newValue(this.value - this.value_old);

				return this;
			}
		}]);

		return Variable;
	}(Value);

	var ScrollItem = function (_EventDispatcher) {
		_inherits(ScrollItem, _EventDispatcher);

		function ScrollItem() {
			_classCallCheck(this, ScrollItem);

			return _possibleConstructorReturn(this, (ScrollItem.__proto__ || Object.getPrototypeOf(ScrollItem)).apply(this, arguments));
		}

		_createClass(ScrollItem, [{
			key: 'trigger',
			value: function trigger(type) {

				this.dispatchEvent(type);
			}
		}, {
			key: 'update',
			value: function update(state, local) {

				var state_old = this.state_old = this.state;
				this.state = state;

				this.local_old = this.local;
				this.local = local;

				if (state !== state_old) {

					if (state === 0 && state_old !== 0) this.trigger('enter');

					if (state !== 0 && state_old === 0) this.trigger('exit');

					if (state !== 0 && state_old !== 0) {

						this.trigger('touch');
						this.trigger('leave');
					}
				}
			}
		}]);

		return ScrollItem;
	}(EventDispatcher);

	var StopType = {

		bound: 'bound',
		trigger: 'trigger'

	};

	var stopCount = 0;

	var Stop = function (_ScrollItem) {
		_inherits(Stop, _ScrollItem);

		_createClass(Stop, null, [{
			key: 'Type',
			get: function get() {
				return StopType;
			}
		}]);

		function Stop(scroll, position) {
			var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bound';
			var margin = arguments[3];

			_classCallCheck(this, Stop);

			var _this3 = _possibleConstructorReturn(this, (Stop.__proto__ || Object.getPrototypeOf(Stop)).call(this));

			_this3.scroll = scroll;

			_this3.position = position;
			_this3.type = type;
			_this3.margin = margin;
			_this3.name = name || 'stop-' + stopCount;

			stopCount++;

			return _this3;
		}

		_createClass(Stop, [{
			key: 'set',
			value: function set(params) {

				for (var k in params) {
					this[k] = params[k];
				}return this;
			}
		}, {
			key: 'update',
			value: function update(position, position_old) {

				var local = position - this.position;
				var state = local < -this.margin ? -1 : local > this.margin ? 1 : 0;

				_get(Stop.prototype.__proto__ || Object.getPrototypeOf(Stop.prototype), 'update', this).call(this, state, local);
			}
		}, {
			key: 'remove',
			value: function remove() {

				if (!this.scroll) return this;

				var index = this.scroll.stops.indexOf(this);

				scroll.stops.splice(index, 1);

				return this;
			}
		}, {
			key: 'toInterval',
			value: function toInterval(_ref) {
				var offset = _ref.offset,
				    _ref$type = _ref.type,
				    type = _ref$type === undefined ? null : _ref$type;


				return this.scroll.createInterval({ position: this.position - offset, width: offset * 2, type: type });
			}
		}]);

		return Stop;
	}(ScrollItem);

	var Interval = function (_ScrollItem2) {
		_inherits(Interval, _ScrollItem2);

		function Interval(scroll, stopA, stopB) {
			_classCallCheck(this, Interval);

			var _this4 = _possibleConstructorReturn(this, (Interval.__proto__ || Object.getPrototypeOf(Interval)).call(this));

			_this4.scroll = scroll;
			_this4.stopA = stopA;
			_this4.stopB = stopB;

			return _this4;
		}

		_createClass(Interval, [{
			key: 'update',
			value: function update(position) {

				var local = (position - this.stopA.position) / (this.stopB.position - this.stopA.position);
				var state = local < 0 ? -1 : local > 1 ? 1 : 0;

				_get(Interval.prototype.__proto__ || Object.getPrototypeOf(Interval.prototype), 'update', this).call(this, state, local);

				if (this.local >= 0 && this.local <= 1 || this.local_old >= 0 && this.local_old <= 1) this.dispatchEvent('update');
			}
		}, {
			key: 'remove',
			value: function remove() {

				if (!this.scroll) return this;

				var index = this.scroll.intervals.indexOf(this);

				scroll.intervals.splice(index, 1);

				this.stopA.remove();
				this.stopB.remove();

				return this;
			}
		}]);

		return Interval;
	}(ScrollItem);

	var scrolls = [];

	var Scroll = function (_EventDispatcher2) {
		_inherits(Scroll, _EventDispatcher2);

		function Scroll() {
			_classCallCheck(this, Scroll);

			var _this5 = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this));

			_this5.id = 'scroll-' + (scrolls.push(_this5) - 1);

			_this5._position = 0;
			_this5._position_new = 0;
			_this5._position_old = 0;

			_this5._velocity = 0;
			_this5._velocity_new = 0;
			_this5._velocity_old = 0;

			_this5.friction = 0.001;

			_this5.stops = [];
			_this5.intervals = [];

			_this5.epsilon = 1e-3;

			_this5.createStop({ position: 0 });

			return _this5;
		}

		_createClass(Scroll, [{
			key: 'update',
			value: function update() {
				var dt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1 / 60;


				this._position_old = this._position_new;
				this._velocity_old = this._velocity_new;

				this._velocity_new *= Math.pow(this.friction, dt);
				this._position_new += (this._velocity_new + this._velocity_old) / 2 * dt;

				if (Math.abs(this._position - this._position_new) < this.epsilon) return this;

				this._position = this._position_new;
				this._velocity = this._velocity_new;

				var _iteratorNormalCompletion10 = true;
				var _didIteratorError10 = false;
				var _iteratorError10 = undefined;

				try {
					for (var _iterator10 = this.stops[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
						var stop = _step10.value;

						stop.update(this._position, this._position_old);
					}
				} catch (err) {
					_didIteratorError10 = true;
					_iteratorError10 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion10 && _iterator10.return) {
							_iterator10.return();
						}
					} finally {
						if (_didIteratorError10) {
							throw _iteratorError10;
						}
					}
				}

				var _iteratorNormalCompletion11 = true;
				var _didIteratorError11 = false;
				var _iteratorError11 = undefined;

				try {
					for (var _iterator11 = this.intervals[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
						var interval = _step11.value;

						interval.update(this._position, this.position_old);
					}
				} catch (err) {
					_didIteratorError11 = true;
					_iteratorError11 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion11 && _iterator11.return) {
							_iterator11.return();
						}
					} finally {
						if (_didIteratorError11) {
							throw _iteratorError11;
						}
					}
				}

				this.dispatchEvent('update');

				return this;
			}
		}, {
			key: 'stopByIndex',
			value: function stopByIndex(index) {

				return this.stops[index < 0 ? this.stops.length + index : index];
			}
		}, {
			key: 'stopByName',
			value: function stopByName(name) {
				var _iteratorNormalCompletion12 = true;
				var _didIteratorError12 = false;
				var _iteratorError12 = undefined;

				try {

					for (var _iterator12 = this.stops[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
						var stop = _step12.value;

						if (stop.name === name) return stop;
					}
				} catch (err) {
					_didIteratorError12 = true;
					_iteratorError12 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion12 && _iterator12.return) {
							_iterator12.return();
						}
					} finally {
						if (_didIteratorError12) {
							throw _iteratorError12;
						}
					}
				}

				return null;
			}
		}, {
			key: 'getStop',
			value: function getStop(_ref2) {
				var position = _ref2.position,
				    _ref2$type = _ref2.type,
				    type = _ref2$type === undefined ? null : _ref2$type,
				    _ref2$tolerance = _ref2.tolerance,
				    tolerance = _ref2$tolerance === undefined ? 1e-9 : _ref2$tolerance;
				var _iteratorNormalCompletion13 = true;
				var _didIteratorError13 = false;
				var _iteratorError13 = undefined;

				try {

					for (var _iterator13 = this.stops[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
						var stop = _step13.value;

						if ((type === null || type === stop.type) && Math.abs(stop.position - position) < tolerance) return stop;
					}
				} catch (err) {
					_didIteratorError13 = true;
					_iteratorError13 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion13 && _iterator13.return) {
							_iterator13.return();
						}
					} finally {
						if (_didIteratorError13) {
							throw _iteratorError13;
						}
					}
				}

				return null;
			}
		}, {
			key: 'nearestStop',
			value: function nearestStop(_ref3) {
				var position = _ref3.position,
				    _ref3$type = _ref3.type,
				    type = _ref3$type === undefined ? null : _ref3$type;


				var best = {

					d: Infinity,
					stop: null

				};

				var _iteratorNormalCompletion14 = true;
				var _didIteratorError14 = false;
				var _iteratorError14 = undefined;

				try {
					for (var _iterator14 = this.stops[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
						var stop = _step14.value;


						if (type !== null && type !== stop.type) continue;

						var d = Math.abs(position - stop.position);

						if (d < best.d) {

							best.d = d;
							best.stop = stop;
						}
					}
				} catch (err) {
					_didIteratorError14 = true;
					_iteratorError14 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion14 && _iterator14.return) {
							_iterator14.return();
						}
					} finally {
						if (_didIteratorError14) {
							throw _iteratorError14;
						}
					}
				}

				return best.stop;
			}
		}, {
			key: 'createStop',
			value: function createStop(_ref4) {
				var position = _ref4.position,
				    _ref4$type = _ref4.type,
				    type = _ref4$type === undefined ? 'bound' : _ref4$type,
				    _ref4$margin = _ref4.margin,
				    margin = _ref4$margin === undefined ? .1 : _ref4$margin,
				    _ref4$name = _ref4.name,
				    name = _ref4$name === undefined ? null : _ref4$name;


				var stop = new Stop(this, position, type, margin, name);

				var i = 0,
				    n = this.stops.length;

				for (i; i < n; i++) {
					if (this.stops[i].position > stop.position) break;
				}this.stops.splice(i, 0, stop);

				return stop;
			}
		}, {
			key: 'createInterval',
			value: function createInterval(_ref5) {
				var position = _ref5.position,
				    width = _ref5.width,
				    _ref5$type = _ref5.type,
				    type = _ref5$type === undefined ? 'trigger' : _ref5$type;


				var stopA = void 0,
				    stopB = void 0;

				stopA = this.createStop({ position: position, type: type });
				stopB = this.createStop({ position: position + width, type: type });

				var interval = new Interval(this, stopA, stopB);

				this.intervals.push(interval);

				return interval;
			}
		}, {
			key: 'shoot',
			value: function shoot() {

				var prevision = this.position - this.velocity / Math.log(this.friction);

				var target = this.nearestStop({ position: prevision, type: StopType.bound });

				this.velocity = (this.position - target.position) * Math.log(this.friction);
			}

			// shorthands:

		}, {
			key: 'stop',
			value: function stop(position) {
				var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : StopType.bound;


				if (typeof position === 'string' && position.slice(0, 2) === '+=') position = (this.stops.length ? this.stops[this.stops.length - 1].position : 0) + parseFloat(position.slice(2));

				var stop = this.getStop({ position: position, type: type }) || this.createStop({ position: position, type: type });

				return stop;
			}
		}, {
			key: 'trigger',
			value: function trigger(position) {

				return this.stop(position, Stop.Type.trigger);
			}
		}, {
			key: 'position',
			get: function get() {
				return this._position;
			},
			set: function set(value) {
				this._position_new = value;
			}
		}, {
			key: 'velocity',
			get: function get() {
				return this._velocity;
			},
			set: function set(value) {
				this._velocity_new = value;
			}
		}]);

		return Scroll;
	}(EventDispatcher);

	function udpateScrolls() {

		requestAnimationFrame(udpateScrolls);

		var _iteratorNormalCompletion15 = true;
		var _didIteratorError15 = false;
		var _iteratorError15 = undefined;

		try {
			for (var _iterator15 = scrolls[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
				var _scroll = _step15.value;

				_scroll.update();
			}
		} catch (err) {
			_didIteratorError15 = true;
			_iteratorError15 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion15 && _iterator15.return) {
					_iterator15.return();
				}
			} finally {
				if (_didIteratorError15) {
					throw _iteratorError15;
				}
			}
		}
	}

	udpateScrolls();

	var wheelDiscreteInterval = 120;

	function onMouseWheel(handler, event) {

		event.preventDefault();

		var wheelX = handler.vars.wheelX;
		var wheelY = handler.vars.wheelY;
		var wheelSpeedX = handler.vars.wheelSpeedX;
		var wheelSpeedY = handler.vars.wheelSpeedY;

		// https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
		var unit = event.deltaMode === 0x00 ? 1 : 16;
		var dx = event.deltaX * unit;
		var dy = event.deltaY * unit;

		if (!handler.mouseWheelID) {

			wheelX.reset(dx);
			wheelY.reset(dy);

			wheelSpeedX.reset(0);
			wheelSpeedY.reset(0);

			handler.dispatchEvent('wheel-start');

			handler.mouseWheelID = setTimeout(function () {
				return mouseWheelStop(handler);
			}, wheelDiscreteInterval);
		} else {

			wheelX.newValue(dx);
			wheelY.newValue(dy);

			wheelSpeedX.newValue(wheelX.average.value);
			wheelSpeedY.newValue(wheelY.average.value);

			var through = void 0;

			if (wheelSpeedX.growth.value > 1) handler.dispatchEvent('wheel-increase-speed-x');

			if (wheelSpeedY.growth.value > 1) handler.dispatchEvent('wheel-increase-speed-y', { speed: wheelSpeedY.value });

			if (through = wheelSpeedX.growth.through(1)) handler.dispatchEvent(through === -1 ? 'wheel-max-speed-x' : 'wheel-min-speed-x');

			if (through = wheelSpeedY.growth.through(1)) handler.dispatchEvent(through === -1 ? 'wheel-max-speed-y' : 'wheel-min-speed-y');

			clearTimeout(handler.mouseWheelID);
			handler.mouseWheelID = setTimeout(function () {
				return mouseWheelStop(handler);
			}, wheelDiscreteInterval);
		}
	}

	function mouseWheelStop(handler) {

		handler.mouseWheelID = null;
		handler.dispatchEvent('wheel-stop');
	}

	var ScrollHandler = function (_EventDispatcher3) {
		_inherits(ScrollHandler, _EventDispatcher3);

		function ScrollHandler(element) {
			_classCallCheck(this, ScrollHandler);

			var _this6 = _possibleConstructorReturn(this, (ScrollHandler.__proto__ || Object.getPrototypeOf(ScrollHandler)).call(this));

			if (typeof element === 'string') element = document.querySelector(element);

			_this6.vars = {

				wheelX: new Variable(0, 0, 10),
				wheelY: new Variable(0, 0, 10),

				wheelSpeedX: new Variable(0, 2, 10),
				wheelSpeedY: new Variable(0, 2, 10)

			};

			element.addEventListener('mousewheel', function (event) {
				return onMouseWheel(_this6, event);
			});

			return _this6;
		}

		return ScrollHandler;
	}(EventDispatcher);

	var svgNS = 'http://www.w3.org/2000/svg';

	function svg(node, attributes) {

		if (node === 'svg') {

			node = document.createElementNS(svgNS, 'svg');
			node.setAttributeNS(svgNS, 'width', 300);
			node.setAttributeNS(svgNS, 'height', 300);
		}

		if (typeof node === 'string') node = document.createElementNS(svgNS, node);

		if (attributes && attributes.parent) {

			attributes.parent.appendChild(node);
			delete attributes.parent;
		}

		for (var k in attributes) {
			node.setAttributeNS(null, k, attributes[k]);
		}return node;
	}

	var svgCSS = {

		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%'

	};

	var ScrollSVG = function () {
		function ScrollSVG(options) {
			_classCallCheck(this, ScrollSVG);

			this.options = Object.assign({

				scale: 1

			}, options);

			this.svg = svg('svg');

			for (var k in svgCSS) {
				this.svg.style.setProperty(k, svgCSS[k]);
			}this.g = svg('g', {

				parent: this.svg,

				fill: 'none',
				stroke: 'red',
				transform: 'translate(20, 20)'

			});

			if (this.options.scroll) this.init(this.options.scroll);
		}

		_createClass(ScrollSVG, [{
			key: 'init',
			value: function init(scroll) {
				var _this7 = this;

				this.scroll = scroll;

				var s = this.options.scale;

				this.line = svg('line', {

					parent: this.g,

					x1: this.scroll.stopByIndex(0).position * s,
					x2: this.scroll.stopByIndex(-1).position * s,

					y1: 0,
					y2: 0

				});

				var scrollPosition = svg('line', {

					parent: this.g,

					x1: this.scroll.position * s,
					x2: this.scroll.position * s,

					y1: -4,
					y2: 4,

					'stroke-width': 3

				});

				this.scroll.on('update', function (event) {

					svg(scrollPosition, {

						x1: _this7.scroll.position * s,
						x2: _this7.scroll.position * s

					});
				});

				this.stops = this.scroll.stops.map(function (stop) {

					return svg('line', {

						parent: _this7.g,

						x1: stop.position * s,
						x2: stop.position * s,

						y1: -4,
						y2: 4

					});
				});

				return this;
			}
		}]);

		return ScrollSVG;
	}();

	var PScroll = Object.freeze({
		Stop: Stop,
		Interval: Interval,
		Scroll: Scroll,
		ScrollHandler: ScrollHandler,
		ScrollSVG: ScrollSVG
	});

	// import { Scroll, ScrollHandler, ScrollSVG } from '../build/p-scroll.module.js'


	// creating the scroll

	var scrollA = new Scroll();

	var _iteratorNormalCompletion16 = true;
	var _didIteratorError16 = false;
	var _iteratorError16 = undefined;

	try {
		for (var _iterator16 = document.querySelectorAll('.wrapper-a .block')[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
			var element = _step16.value;


			var stop = scrollA.stop('+=' + element.offsetHeight);

			element.innerHTML = stop.position;
		}
	} catch (err) {
		_didIteratorError16 = true;
		_iteratorError16 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion16 && _iterator16.return) {
				_iterator16.return();
			}
		} finally {
			if (_didIteratorError16) {
				throw _iteratorError16;
			}
		}
	}

	scrollA.on('update', function (event) {

		document.querySelector('.wrapper-a .blocks').style.setProperty('transform', 'translateY(' + (-scrollA.position).toFixed(2) + 'px)');
	});

	// display an SVG for debug

	var scrollASVG = new ScrollSVG({ scroll: scrollA, scale: .5 });
	document.body.appendChild(scrollASVG.svg);

	// use an handler to detect some fundamental events (wheel max speed)

	var scrollAHandler = new ScrollHandler('.wrapper-a');

	scrollAHandler.on('wheel-increase-speed-y', function (event) {

		scrollA.velocity = event.speed * 20;
	});

	scrollAHandler.on('wheel-max-speed-y wheel-stop', function (event) {

		scrollA.shoot();
	});

	var testA = Object.freeze({
		scrollA: scrollA,
		scrollAHandler: scrollAHandler
	});

	// import { Scroll, ScrollHandler, ScrollSVG } from '../build/p-scroll.module.js'


	// creating the scroll

	var scrollB = new Scroll();

	scrollB.friction = .000001;

	var sum = 0;

	Array.prototype.forEach.call(document.querySelectorAll('.wrapper-b .block'), function (element) {

		var height = element.offsetHeight;

		var stop = scrollB.stop(sum + height / 2);

		stop.toInterval({ offset: 50 }).on('enter', function (event) {

			element.classList.add('enter');
		}).on('exit', function (event) {

			element.classList.remove('enter');
		}).on('update', function (event) {
			console.log('update', event.target);
		});

		element.innerHTML = '<span>' + stop.position + '</span>';

		sum += height;
	});

	scrollB.on('update', function (event) {

		document.querySelector('.wrapper-b .blocks').style.setProperty('transform', 'translateY(' + (-scrollB.position).toFixed(2) + 'px)');
	});

	scrollB.stop(0).set({

		type: 'trigger'

	});
	scrollB.shoot();

	// display an SVG for debug

	var scrollBSVG = new ScrollSVG({ scroll: scrollB, scale: .5 });
	scrollBSVG.svg.style.setProperty('top', '20px');
	document.body.appendChild(scrollBSVG.svg);

	// use an handler to detect some fundamental events (wheel max speed)

	var scrollBHandler = new ScrollHandler('.wrapper-b');

	scrollBHandler.on('wheel-increase-speed-y', function (event) {

		scrollB.velocity = event.speed * 20;
	});

	scrollBHandler.on('wheel-max-speed-y wheel-stop', function (event) {

		scrollB.shoot();
	});

	var testB = Object.freeze({
		scrollB: scrollB,
		scrollBHandler: scrollBHandler
	});

	// exposing the local variables globally

	Object.assign(window, testA, testB, PScroll);
})();
