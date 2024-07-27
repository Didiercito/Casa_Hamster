import amqp from 'amqplib';

export class ServiceRabbitMQ {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    constructor(private uri: string) {}

    async connect(): Promise<void> {
        this.connection = await amqp.connect(this.uri);
        this.channel = await this.connection.createChannel();
    }

    async consume(queue: string, onMessage: (msg: amqp.ConsumeMessage | null) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel not initialized. Call connect() first.');
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, onMessage, { noAck: true });
    }

    async sendToQueue(queue: string, message: any): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel not initialized. Call connect() first.');
        }
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }
}
