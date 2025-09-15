import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('executive-workshop-frontend');

  // i18n test messages
  protected readonly welcomeMessage = signal($localize`Welcome to Executive Workshop`);
  protected readonly helloWorld = signal($localize`Hello, World!`);
  protected readonly description = signal(
    $localize`A modern Angular application for business management`
  );
}
