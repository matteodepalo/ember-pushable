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
After including it `TasksController` will start responding to the following Pusher events:

Channel: `pusher`

Events:

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

Sometimes Pusher can be faster than your server. In this scenario it may happen that the Controller ends up with 2 models. One with no ID, which will be filled by the server later, and the Pusher entry with the ID.
In order to help ember-data to avoid these duplicates you can pass a `client_id` with the model payload when saving to the server. This can be as simple as:

```javascript
clientId: DS.attr('string', defaultValue: -> new Date().getTime().toString())
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

