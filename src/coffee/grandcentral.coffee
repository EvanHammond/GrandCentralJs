(() ->
  _guid = (() ->
    s4 = () ->
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

    return () ->
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  )()

  _queue = []
  _timerId = null
  _current = 0
  _interval = 1

  GrandCentral = () ->
    this.debug = false

  GrandCentral.prototype = {
    add: (o) ->
      o._gcGuid = _guid()
      o._gcNext = _current
      o._gcCount = 0
      o.gcIterations = o.gcIterations or 0
      o.gcScope = o.gcScope or o
      o.gcInterval = o.gcInterval or _interval

      if typeof o.gcCallback is 'function' then _queue.push(o)
      if _timerId is null and _queue.length > 0 then this.start()

      return o

    find: (guid) ->
      for i in _queue
        if i._gcGuid is guid then return i

    remove: (index) ->
      Array.prototype.splice.apply(_queue, [index,1])

      if _queue.length <= 0
        this.log('Queue empty')
        this.stop()

      return true

    start: () ->
      if _queue.length > 0
        this.log('Spool started.')
        gc = this
        _timerId = window.setInterval(() ->
          gc.log(gc._proc())
        _interval * 1000)
      else
        this.log('No items in queue. Spool aborted.')

    stop: () ->
      this.log('Spool stopped.')
      window.clearInterval(_timerId)
      _timerId = null

      return true

    _proc: () ->
      for i in _queue
        if i._gcNext is _current
          if typeof i.gcCallback is 'function' then i.gcCallback.apply(i.gcScope, [i])

          i._gcNext += +i.gcInterval
          i._gcCount++

        if i.gcIterations > 0 and i._gcCount >= i.gcIterations then this.remove(i)

        _current++

      return "ping"

    log: (msg) ->
      if this.debug is true then console.log('Grand Central: ' + msg)
      return true
  }

  window.GrandCentral = new GrandCentral()
)()