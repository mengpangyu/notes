class EventEmitter {
  eventMap = {};
  on(eventName, callback) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = [];
    } else {
      this.eventMap[eventName].push(callback);
    }
    return this;
  }

  off(eventName, callback) {
    if (!this.eventMap[eventName]) {
      return this;
    }
    if (!callback) {
      delete this.eventMap[eventName];
    }
    const index = this.eventMap[eventName].indexOf(callback);
    if (index >= 0) {
      this.eventMap[eventName].splice(index, 1);
    }
    return this;
  }

  emit(eventName, ...args) {
    if (!this.eventMap[eventName]) {
      return this;
    }
    this.eventMap[eventName].forEach((fn) => fn.apply(this, args));
    return this;
  }

  once(eventName, callback) {
    const only = () => {
      callback.apply(this, arguments);
      this.off(eventName, only);
    };
    this.on(eventName, only);
    return this;
  }
}
