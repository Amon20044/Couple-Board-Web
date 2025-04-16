#!/usr/bin/env node

import amqp from 'amqplib/callback_api';

const queue = 'hello';
const msg = 'Hello world';

amqp.connect('amqp://localhost', (error0: any | null, connection: any) => {
  if (error0 || !connection) {
    throw error0;
  }

  connection.createChannel((error1: Error | null, channel: any) => {
    if (error1 || !channel) {
      throw error1;
    }

    channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(' [x] Sent %s', msg);

    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
