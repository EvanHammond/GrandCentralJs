GrandCentral
========

Introduction
-------
GrandCentral sets up a 1 second interval in which server polling, DOM updating, or any other timed events can be subscribed to. The system work by crafting an object with a few parameters required by the event bus. Events will be triggered based on their given properties, then modified for the next iteration.

Features
-------
Setting up server polling is as easy as building objects and adding them to the GrandCentral queue. GrandCentral works by triggering callbacks on queued objects, and is 100% agnostic of any implementation it might trigger.

Installation
-------
To install, use bower and reference the repository directly, as such:

```
bower install grandcentraljs=https://github.com/EvanHammond/grandcentraljs.git^0.1.0 --save
```

Usage
-------
GrandCentral requires objects in its queue to have (at least) a minimal number of properties (but in no way limits the amount of properties a queued object can contain), these properties are used by GrandCentral to process triggers in the queue. GrandCentral, by design, is attached to the window object and is globally accessible.

__Basic Queue Object__

```javascript
var o = GrandCentral.add({
  callback: function() {
    console.log('Test');
  }
});
```

Object Properties
-------
### callback (required)
__type:__ function

The callback property is what will get triggered when the spooler procs one of events in the queue. 

### scope (optional)
__type:__ object
__default:__ self

This will be the scope that the callback is bound to when it gets triggered. If no scope is provided, the default scope will be set to the object that the callback is a property of.

### interval (optional)
__type:__ number
__default:__ 1 second (GrandCentral's internal interval)

The interval property will dictate how often the spooler procs the event. Each time an event is triggered, the next proc will be at ```current + interval``` seconds in the future.

### iterations (optional)
__type:__ number
__default:__ 0

The iterations property defines the maximum number of times in which an event can be triggered. Once this limit has been reached, the event is removed from the queue.


API
-------
### add
__returns:__ queue object

Adds object to the queue. If this is the first object in the queue, the spooler will be started.

### find
__param:__ guid (guid property on queue object)
__returns:__ number (index in the queue)

Finds and returns a given object in the queue.

### remove
__param:__ index (index in queue)
__returns:__ boolean

Removes given index from the queue. Works in conjunction with find to clean extraneous events from the queue. If, upon removal, there are no events left in the queue, the spooler will be stopped.

### start
__returns:__ boolean

Starts the spooling service. If there are no events in the queue, initialization will be aborted.

### stop
__returns:__ boolean

Stops the spooling service. This action also clears the queue.


Bugs and Feedback
-------


FAQ
-------
> Why GrandCentral?

GrandCentral gives a one stop shop for timed events by leveraging a global ticker to trigger callbacks in on triggers waiting in the spooler.

License
--------
The MIT License (MIT)

Copyright (c) 2014 Evan Hammond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.