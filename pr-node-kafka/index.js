const kafka = require('kafka-node');

const kafkaHost = 'localhost:9092,localhost:9093,localhost:9094';
const client = new kafka.KafkaClient({
  kafkaHost
});

/**
 * Producer
 */
const Producer = kafka.Producer;
const producer = new Producer(client);

payloads = [
    { topic: 'test-topic', messages: "hello world message" }
]

producer.on('ready', () => {
    setInterval(() => {
        producer.send(payloads, (err, data) => {
          if(err) console.error(err);

          console.log('send', data);
        });
    }, 3000);
});

producer.on('error', err => {
  console.error(err);
});

/**
 * Consumer
 */
 const Consumer = kafka.Consumer;
 const consumer = new Consumer(client, [
     { topic: 'test-topic' }
 ]);

 consumer.on('message', message => {
     console.log('receive', message);
 });