# ember-pushable

Make Ember controllers live with Pusher

## Installation

Install it directly with:

```
$ bower install ember-pushable
```

Or add it to your Rails app with rails-assets

```
gem 'rails-assets-ember-pushable'
```

This library depends on [ember-pusher](https://github.com/jamiebikies/ember-pusher)
so be sure to include it before you include `ember-pushable.js`

## Usage

`new Ember.Pushable(modelName)` returns a mixin that you can pass to your controllers like this:

```javascript
App.TasksController = Ember.ArrayController.extend(new Ember.Pushable('task'))
```

The `modelName` is the type of model in your controller `content` property.
After including it `TasksController` will start responding to Pusher events.

## Events

Channel: `pusher`

- Create
`task.destroy`

- Update
`task.update`

- Destroy
`task.destroy`

These events expect a payload containing a representation of the model(s), in this case:

```
{
  "task": {
    ...
  }
}
```

## Preventing duplicates

Sometimes Pusher can be faster than your server. In this scenario the Controller may end up with two models. One with no ID, which will be filled by the server later, and the Pusher entry with the ID.

In order to help ember-data to avoid these duplicates you can include the mixin `DS.Pushable` into your model. This will add a `client_id` attribute to the model payload when saving to the server.
Having this attribute in the server response will make sure that there will be no duplicate models in the client.

Example model:

```javascript
App.Task = DS.Model.extend(DS.Pushable);
```

Example response from the server:

```
{
  "task": {
    "title": "test",
    "client_id": "1234"
  }
}
```

You also have to add the newly created model to an array of `newRecords` in your controller. For example:

```javascript
actions:
  createTask: function() {
    var task = this.store.createRecord('task', { title: this.get('title') })

    this.get('newRecords').pushObject(task)
    task.save()
  }
```

## Integrations

This library works well with [pushable-rails](https://github.com/matteodepalo/pushable-rails)

