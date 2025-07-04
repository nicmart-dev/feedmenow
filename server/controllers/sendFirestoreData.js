import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

import dotenv from 'dotenv';
import {json} from "express";

//import serviceAccountFeedMeNow from '../feedmenowkey.json' with { type: 'json' };
//import serviceAccountPortfolioSite from '../portfoliositekey.json' with { type: 'json' };

const serviceAccountFeedMeNow = {
    "type": "service_account",
    "project_id": "feedmenow-data",
    "client_email": "firebase-adminsdk-fbsvc@feedmenow-data.iam.gserviceaccount.com",
    "client_id": "116724178811012516127",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40feedmenow-data.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

const serviceAccountPortfolioSite = {
    "type": "service_account",
    "project_id": "portfolio-site-ec542",
    "client_email": "firebase-adminsdk-fbsvc@portfolio-site-ec542.iam.gserviceaccount.com",
    "client_id": "105800646651063859051",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40portfolio-site-ec542.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

let promptsCollectionFeedMeNow;
let promptsCollectionPortfolioSite;

let samecount = 0;
let lastCTM = 0;

const initFirebaseFeedMeNow = async () => {
    serviceAccountFeedMeNow['private_key_id'] = process.env.FEEDMENOW_KEY_ID
    serviceAccountFeedMeNow['private_key'] = process.env.FEEDMENOW_KEY

    const feedmenowApp = admin.initializeApp({
        credential: cert(serviceAccountFeedMeNow)
    }, );

    const db = getFirestore(feedmenowApp);
    promptsCollectionFeedMeNow = db.collection('Prompts');
    console.log("feed-me-now database initialized");
}

const initFirebasePortfolioSite = async () => {
    serviceAccountPortfolioSite['private_key_id'] = process.env.PORTFOLIOSITE_KEY_ID
    serviceAccountPortfolioSite['private_key'] = process.env.PORTFOLIOSITE_KEY

    const portfoliositeApp = initializeApp({
        credential: cert(serviceAccountPortfolioSite)
    }, "PortfolioSite");

    const db = getFirestore(portfoliositeApp);
    promptsCollectionPortfolioSite = db.collection('visits');
    console.log("portfolio-site database initialized");
}

const sendFirestoreDataFeedMeNow = (data) => {
    const currentTimeMs = Timestamp.now().toMillis();

    //in case there is a change the milliseconds will be the same
    if(lastCTM === currentTimeMs) samecount++;
    else samecount = 0;

    const dataTitle = `${currentTimeMs}-${samecount}`;

    try {
        promptsCollectionFeedMeNow.add({
            id: dataTitle,
            ...data
        });    
    } catch(error) {
        console.error(error);
    }
};

const sendFirestoreDataPortfolioSite = (data) => {
    const currentTimeMs = Timestamp.now().toMillis();

    //in case there is a change the milliseconds will be the same
    if(lastCTM === currentTimeMs) samecount++;
    else samecount = 0;

    const id = `${currentTimeMs}-${samecount}`;

    try {
        promptsCollectionPortfolioSite.doc(id).set({
            time: Timestamp.now().toDate(),
            ...data
        });
    } catch(error) {
        console.error(error);
    }
};

export {
    initFirebaseFeedMeNow,
    initFirebasePortfolioSite,
    sendFirestoreDataFeedMeNow,
    sendFirestoreDataPortfolioSite
}