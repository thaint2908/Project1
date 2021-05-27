import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as admin from 'firebase-admin';
import firebase from "firebase/app";

import {project_id, client_email, private_key} from '../service-account.json';
import {ValidationPipe} from "@nestjs/common";
import {getMongoManager} from "typeorm";
import {Product} from "./products/entities/product.entity";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = 8080;

    const firebaseConfig = {
        apiKey: "AIzaSyD50VL3I4VTErnkEdEzaj2CEKqOz2t-0z0",
        authDomain: "project1-86692.firebaseapp.com",
        projectId: "project1-86692",
        storageBucket: "project1-86692.appspot.com",
        messagingSenderId: "572279035126",
        appId: "1:572279035126:web:f3e68246813998f6e908d7",
        measurementId: "G-1TF2YWW049"
    };
    firebase.initializeApp(firebaseConfig);
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: project_id,
            clientEmail: client_email,
            privateKey: private_key
        })
    });

    app.useGlobalPipes(new ValidationPipe({transform: true}));
    app.enableCors();
    app.setGlobalPrefix('/api/v1');

    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);

    await getMongoManager().createCollectionIndexes(Product, [
        {
            key: {
                key_name: "text",
                price: 1,
                rating_average: 1
            }
        }
    ]);
}

bootstrap();
