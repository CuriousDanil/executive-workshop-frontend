/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import * as Sentry from '@sentry/angular';
import { environment } from './environments/environment';

// Initialize Sentry for error monitoring
if (environment.production) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN', // Replace with your actual Sentry DSN
    environment: environment.production ? 'production' : 'development',
    tracesSampleRate: 1.0,
    integrations: [Sentry.browserTracingIntegration()],
  });
}

bootstrapApplication(App, appConfig).catch(err => console.error(err));
