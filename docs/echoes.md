---
id: echoes
title: Echoes
sidebar_label: Echoes
---

Echoes is an abstraction of [kafkajs](https://kafka.js.org/docs/consuming). It can be used as a standalone package without installing other orionjs packages.

```
yarn add @orion-js/echoes
```

## `startService`

See [Client configuration](https://kafka.js.org/docs/configuration#broker-discovery) for client params. See [Consuming messages](https://kafka.js.org/docs/consuming) for consumer params. See [Producing messages](https://kafka.js.org/docs/producing) for producer params.

`echoes` is an object containing all of the service `echo`

```js
import {startService} from '@orion-js/echoes'
import echoes from 'app/components/echoes'

startService({
  client: {
    clientId: 'appName',
    brokers: ['localhost:9092']
  },
  consumer: {
    groupId: 'microserviceId'
  },
  producer: {},
  echoes
})
```

## `echo`

An `echo` is a message handler. You can define multiple echoes in your app. All must be passed in the `echoes` param of `startService`. The key in the `echoes` params will be the name of the `topic`.

You must pass a resolve function, which has 2 arguments.

- `params`: The params passed when this event is called
- `context`: Contains the arguments in the [`eachMessage` Kafkajs function](https://kafka.js.org/docs/consuming#a-name-each-message-a-eachmessage)

```js
import {echo} from '@orion-js/echoes'

export default echo({
  async resolve(params, context) {
    console.log('Received an event', params)
  }
})
```

## `publish`

Publish sends a message that doesn't expects a response. It expects the following params:

- `topic`: Topic (`echo`) to send the message to
- `params`: The params that the `echo` will receive. This params are serialized using [`serialize-javascript`](https://github.com/yahoo/serialize-javascript) so you can pass all JavaScript basic types (not including functions).
- `ack`: See [Producing ack](https://kafka.js.org/docs/producing)
- `timeout`: See [Producing timeout](https://kafka.js.org/docs/producing)

```js
import {publish} from '@orion-js/echoes'

await publish({
  topic: 'onEvent',
  params: {
    hello: 'world',
    date: new Date(),
    number: 134433,
    bool: true,
    regexp: /alsothis/gi
  }
})
```

## `request`

It's the same as publish but expects a response. It uses the _request-response_ method. You can pass a timeout (defaults to `60000`)

```js
import {request} from '@orion-js/echoes'

const result = await request({
  topic: 'onDeliveryOrderAlertUpdated',
  params: {
    hello: 'world'
  }
})
```
