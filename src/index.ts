import { connectDb } from './prisma';
import { listen } from './server';

async function start() {
    await connectDb();
    listen();
}

start();
