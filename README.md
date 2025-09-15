# Executive Workshop Frontend

A modern Angular 20 application for business management and executive workshops, built with cutting-edge web technologies and best practices.

## 🚀 Tech Stack

### Core Framework
- **Angular 20.3** - Latest Angular with standalone components
- **TypeScript 5.9** - Strong typing with modern JavaScript features
- **Zoneless Change Detection** - Enhanced performance without Zone.js
- **Server-Side Rendering (SSR)** - Full SSR support with Express

### UI & Styling
- **Angular Material 20** - Official Material Design components
- **PrimeNG 20** - Rich set of UI components
- **AG-Grid Community** - Advanced data grid with enterprise features
- **Native CSS Animations** - Hardware-accelerated animations (no @angular/animations)
- **CSS Custom Properties** - Modern CSS with design tokens

### State & Data Management
- **Angular Signals** - Built-in reactive state management (no NgRx needed)
- **Angular HttpClient** - Modern HTTP client with interceptors and caching
- **RxJS 7.8** - Reactive programming for complex data flows
- **Draft Service** - Custom SessionStorage service for form persistence

### Development Tools
- **ESLint 9** - Code linting with Angular-specific rules
- **Prettier 3.6** - Code formatting with Angular HTML parser
- **Husky 9** - Git hooks for code quality
- **Commitlint** - Conventional commit message enforcement

### Testing & Quality
- **Jasmine/Karma** - Unit testing framework
- **Cypress 15** - End-to-end testing
- **GitHub Actions** - Automated CI pipeline
- **Sentry** - Error monitoring and performance tracking

### Progressive Web App
- **Angular PWA** - Service worker with offline support
- **Web App Manifest** - Native app-like experience
- **Caching Strategies** - Intelligent resource caching

### Internationalization
- **@angular/localize** - Built-in i18n support
- **Multi-language ready** - English, Russian, Chinese support configured

## 📦 Project Structure

```
src/
├── app/
│   ├── services/
│   │   └── draft.service.ts       # Form draft persistence
│   ├── app.config.ts              # Application providers
│   ├── app.routes.ts              # Routing configuration
│   ├── app.ts                     # Root component
│   └── app.html                   # Root template
├── environments/
│   ├── environment.ts             # Development config
│   └── environment.prod.ts        # Production config
├── public/
│   ├── icons/                     # PWA icons
│   └── manifest.webmanifest       # PWA manifest
├── styles.css                     # Global styles
└── main.ts                        # Application bootstrap
```

## 🛠️ Development Setup

### Prerequisites
- **Node.js 20.x** or higher
- **npm** (comes with Node.js)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd executive-workshop-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

## 📜 Available Scripts

### Development
- `npm start` - Start dev server with hot reload
- `npm run build` - Build for production
- `npm run watch` - Build with file watching

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting

### Testing
- `npm test` - Run unit tests
- `npm run test:ci` - Run tests in CI mode
- `npm run e2e` - Run end-to-end tests
- `npm run cypress:open` - Open Cypress GUI
- `npm run cypress:run` - Run Cypress headless

## 🏗️ Architecture Decisions

### Why No NgRx?
**Angular 20's Signals** provide built-in reactive state management that's simpler and more performant than NgRx for most applications. Use Signals for local and shared state.

### Why No TanStack Query?
**Angular HttpClient + Signals** combination provides excellent data fetching capabilities with built-in caching, error handling, and reactive updates.

### Why No Tailwind CSS?
**Native CSS + Angular Material** provides better integration with Angular's component system and avoids compatibility issues with Angular 20's new build system.

### Why No @angular/animations?
**Native CSS animations** are deprecated in Angular 20 in favor of hardware-accelerated CSS animations that perform better and have smaller bundle sizes.

## 🔧 Key Features

### Form Draft Management
```typescript
// Auto-save form drafts to SessionStorage
this.draftService.startAutoSave(this.formGroup, 'user-profile');
```

### Internationalization
```typescript
// Use $localize for all user-facing strings
protected welcomeMessage = signal($localize`Welcome to Executive Workshop`);
```

### Environment Configuration
```typescript
// Different configs for dev/prod
import { environment } from '../environments/environment';
```

### PWA Capabilities
- Offline functionality
- Push notifications (production only)
- App-like installation experience

## 🚧 Development Guidelines

### Component Creation
```bash
ng generate component feature-name --standalone
```

### Service Creation
```bash
ng generate service services/service-name
```

### Code Style
- Use **standalone components** only
- Prefer **signals** over observables for simple state
- Use **inject()** function instead of constructor injection
- Follow **conventional commits** for Git messages
- Write **unit tests** for all services and components

### State Management
```typescript
// Use signals for reactive state
private readonly loading = signal(false);
private readonly data = signal<User[]>([]);

// Use computed for derived state
protected readonly filteredData = computed(() => 
  this.data().filter(user => user.active)
);
```

## 🔍 Performance Best Practices

1. **OnPush Change Detection** - All components use OnPush strategy
2. **Lazy Loading** - Feature modules are lazy-loaded
3. **Tree Shaking** - Only used code is bundled
4. **Service Worker** - Assets cached for offline use
5. **Bundle Analysis** - Webpack Bundle Analyzer configured

## 🚀 CI/CD Pipeline

The project includes a comprehensive GitHub Actions pipeline:

- **Lint & Format** - Code quality checks
- **Unit Tests** - Automated testing with coverage
- **Build** - Production build verification
- **E2E Tests** - End-to-end testing with Cypress
- **Security Scan** - Dependency vulnerability scanning

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Message Format
```
feat: add new user management feature
fix: resolve navigation issue on mobile
docs: update API documentation
style: format code with prettier
refactor: improve performance of data loading
test: add unit tests for user service
chore: update dependencies
```

## 📞 Getting Help

- **Angular Documentation**: [angular.dev](https://angular.dev)
- **Material Design**: [material.angular.io](https://material.angular.io)
- **PrimeNG Documentation**: [primeng.org](https://primeng.org)
- **Project Issues**: Create an issue in this repository

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy coding! 🎉**