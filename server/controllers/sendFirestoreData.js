import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

import serviceAccountFeedMeNow from '../feedmenowkey.json' with { type: 'json' };
import serviceAccountPortfolioSite from '../portfoliositekey.json' with { type: 'json' };

let promptsCollectionFeedMeNow;
let promptsCollectionPortfolioSite;

let samecount = 0;
let lastCTM = 0;

const initFirebaseFeedMeNow = async () => {
    const feedmenowApp = admin.initializeApp({
        credential: cert(serviceAccountFeedMeNow)
    }, );

    const db = getFirestore(feedmenowApp);
    promptsCollectionFeedMeNow = db.collection('Prompts');
    console.log("feed-me-now database initialized");
}

const initFirebasePortfolioSite = async () => {
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