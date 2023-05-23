import { PrismaClient } from '@prisma/client';
export declare const prismaClient: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import(".prisma/client").Prisma.RejectOnNotFound | import(".prisma/client").Prisma.RejectPerOperation | undefined>;
export declare function connectDb(): Promise<void>;
