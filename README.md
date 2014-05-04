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

Once you've done it your controller will start responding to the following Pusher events:

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
