import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-7f402',
        appId: '1:109071834789:web:0f1fcaf9adf7568300374c',
        storageBucket: 'simple-crm-7f402.appspot.com',
        apiKey: 'AIzaSyC8MbdQeLxfvlZP8iu55z3j6gpSxNZUmi4',
        authDomain: 'simple-crm-7f402.firebaseapp.com',
        messagingSenderId: '109071834789',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
