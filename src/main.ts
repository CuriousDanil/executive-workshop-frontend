/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import * as Sentry from '@sentry/angular';
import { environment } from './environments/environment';

// Initialize Sentry for error monitoring
if (environment.production) {
  Sentry.init({
    dsn: 'https://bceb649b7788241ae5710e3b095741c3@o4510042826932224.ingest.de.sentry.io/4510042830864464',
    environment: environment.production ? 'production' : 'development',
    tracesSampleRate: 1.0,
    integrations: [Sentry.browserTracingIntegration()],
  });
}

bootstrapApplication(App, appConfig).catch(err => console.error(err));
