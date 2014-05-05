(function() {
  DS.Pushable = Ember.Mixin.create({
    clientId: DS.attr('string', {
      defaultValue: function() {
        return new Date().getTime().toString();
      }
    })
  });

  Ember.Pushable = function(modelName) {
    var actions = {};

    actions[modelName + "Create"] = function(payload) {
      if (!this.get('newRecords').anyBy('clientId', payload[modelName].client_id)) {
        return this.store.pushPayload(payload);
      }
    };

    actions[modelName + "Update"] = function(payload) {
      return this.store.pushPayload(payload);
    };

    actions[modelName + "Destroy"] = function(payload) {
      var model;
      model = this.store.getById(modelName, payload[modelName].id);
      if (model !== null && !model.get('isDirty')) {
        return model.unloadRecord();
      }
    };

    return Ember.Mixin.create(EmberPusher.Bindings, {
      PUSHER_SUBSCRIPTIONS: {
        pusher: [modelName + ".create", modelName + ".update", modelName + ".destroy"]
      },
      newRecords: Ember.A([]),
      actions: actions
    });
  };

}).call(this);
