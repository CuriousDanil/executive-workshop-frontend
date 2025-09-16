import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { LanguageService, Language } from './services/language.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-name">{{ getBrandName() }}</span>
        </div>

        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('solutions') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('services') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('industries') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('resources') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('about') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ getLocalizedText('contact') }}</a>
          </li>
        </ul>

        <div class="nav-auth">
          <!-- Language Selector -->
          <div class="language-selector-container">
            <select
              class="language-selector"
              [value]="languageService.language()"
              (change)="onLanguageChange($event)"
              [attr.aria-label]="getLocalizedText('selectLanguage')"
            >
              @for (lang of languageService.availableLanguages; track lang.code) {
                <option [value]="lang.code">{{ lang.flag }} {{ lang.nativeName }}</option>
              }
            </select>
          </div>

          <button class="btn-login" (click)="onLogin()">{{ getLocalizedText('login') }}</button>
          <button class="btn-signup" (click)="onRegister()">
            {{ getLocalizedText('register') }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content - Only show on home route -->
    @if (showMainContent()) {
      <main class="main-content">
        <div class="hero-section">
          <div class="hero-container">
            <div class="hero-content">
              <h1 class="hero-title">{{ heroTitle() }}</h1>
              <p class="hero-subtitle">{{ heroSubtitle() }}</p>
              <div class="hero-actions">
                <button class="btn-primary" (click)="onGetStarted()">
                  {{ getLocalizedText('getStarted') }}
                </button>
                <button class="btn-secondary" (click)="onLearnMore()">
                  {{ getLocalizedText('learnMore') }}
                </button>
              </div>
            </div>
            <div class="hero-image">
              <div class="placeholder-chart">
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 80%"></div>
                <div class="chart-bar" style="height: 40%"></div>
                <div class="chart-bar" style="height: 90%"></div>
                <div class="chart-bar" style="height: 70%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <section class="features-section">
          <div class="features-container">
            <h2 class="section-title">{{ getLocalizedText('whyChooseUs') }}</h2>
            <div class="features-grid">
              @for (feature of features(); track feature.title) {
                <div class="feature-card">
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <h3 class="feature-title">{{ feature.title }}</h3>
                  <p class="feature-description">{{ feature.description }}</p>
                </div>
              }
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-container">
          <p class="footer-text">© 2025 {{ getBrandName() }}. All rights reserved.</p>
        </div>
      </footer>
    }

    <!-- Router Outlet for future pages -->
    <router-outlet />
  `,
  styleUrl: './app.css',
})
export class App implements OnInit {
  // Inject services
  protected readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  // Signal to track current route for conditional content display
  private readonly currentUrl = signal<string>('');

  ngOnInit(): void {
    // Set initial URL
    this.currentUrl.set(this.location.path() || '/');

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  // Check if we should show main content (only on home route)
  protected readonly showMainContent = computed(() => {
    const url = this.currentUrl();
    return url === '/' || url === '';
  });

  // Define translations as a class property
  private readonly translations: Record<Language, Record<string, string>> = {
    en: {
      login: 'Login',
      register: 'Register',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      selectLanguage: 'Select Language',
      whyChooseUs: 'Why Choose Executive\'s Workshop?',
      solutions: 'Solutions',
      services: 'Services',
      industries: 'Industries',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      heroTitle: 'Transform Your Business Operations',
      heroSubtitle:
        'Streamline workflows, enhance productivity, and drive growth with our comprehensive executive management platform.',
      analyticsTitle: 'Analytics & Reporting',
      analyticsDescription:
        'Get deep insights into your business performance with advanced analytics and customizable reports.',
      automationTitle: 'Process Automation',
      automationDescription:
        'Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.',
      securityTitle: 'Enterprise Security',
      securityDescription:
        'Bank-level security with end-to-end encryption and compliance with industry standards.',
      collaborationTitle: 'Global Collaboration',
      collaborationDescription:
        'Connect teams worldwide with real-time collaboration tools and multi-language support.',
      mobileTitle: 'Mobile Ready',
      mobileDescription:
        'Access your dashboard and manage operations on-the-go with our mobile-optimized interface.',
      planningTitle: 'Strategic Planning',
      planningDescription:
        'Set goals, track progress, and make data-driven decisions with our strategic planning tools.',
    },
    ru: {
      login: 'Войти',
      register: 'Регистрация',
      getStarted: 'Начать',
      learnMore: 'Узнать больше',
      selectLanguage: 'Выберите язык',
      whyChooseUs: 'Почему Мастерская Директора?',
      solutions: 'Решения',
      services: 'Услуги',
      industries: 'Отрасли',
      resources: 'Ресурсы',
      about: 'О нас',
      contact: 'Контакты',
      heroTitle: 'Трансформируйте бизнес-процессы',
      heroSubtitle:
        'Оптимизируйте рабочие процессы, повышайте продуктивность и стимулируйте рост с помощью нашей комплексной платформы управления.',
      analyticsTitle: 'Аналитика и отчетность',
      analyticsDescription:
        'Получите глубокие инсайты о производительности бизнеса с помощью продвинутой аналитики и настраиваемых отчетов.',
      automationTitle: 'Автоматизация процессов',
      automationDescription:
        'Автоматизируйте повторяющиеся задачи и рабочие процессы для повышения эффективности и снижения операционных затрат.',
      securityTitle: 'Корпоративная безопасность',
      securityDescription:
        'Безопасность банковского уровня с end-to-end шифрованием и соответствием отраслевым стандартам.',
      collaborationTitle: 'Глобальное сотрудничество',
      collaborationDescription:
        'Объединяйте команды по всему миру с помощью инструментов совместной работы в реальном времени и многоязыковой поддержки.',
      mobileTitle: 'Мобильная готовность',
      mobileDescription:
        'Получайте доступ к панели управления и управляйте операциями в движении с помощью мобильно-оптимизированного интерфейса.',
      planningTitle: 'Стратегическое планирование',
      planningDescription:
        'Ставьте цели, отслеживайте прогресс и принимайте решения на основе данных с помощью наших инструментов стратегического планирования.',
    },
    zh: {
      login: '登录',
      register: '注册',
      getStarted: '开始使用',
      learnMore: '了解更多',
      selectLanguage: '选择语言',
      whyChooseUs: '为什么选择高管工作坊？',
      solutions: '解决方案',
      services: '服务',
      industries: '行业',
      resources: '资源',
      about: '关于我们',
      contact: '联系我们',
      heroTitle: '转型您的业务运营',
      heroSubtitle: '通过我们的综合执行管理平台简化工作流程、提高生产力并推动增长。',
      analyticsTitle: '分析与报告',
      analyticsDescription: '通过高级分析和可定制报告深入了解您的业务绩效。',
      automationTitle: '流程自动化',
      automationDescription: '自动化重复性任务和工作流程以提高效率并降低运营成本。',
      securityTitle: '企业安全',
      securityDescription: '银行级安全，具有端到端加密并符合行业标准。',
      collaborationTitle: '全球协作',
      collaborationDescription: '通过实时协作工具和多语言支持连接全球团队。',
      mobileTitle: '移动就绪',
      mobileDescription: '通过我们的移动优化界面随时访问您的仪表板并管理操作。',
      planningTitle: '战略规划',
      planningDescription: '使用我们的战略规划工具设定目标、跟踪进度并做出数据驱动的决策。',
    },
  };

  // Reactive computed properties that update when language changes
  protected readonly heroTitle = computed(() => {
    const currentLang = this.languageService.language();
    return this.translations[currentLang]?.['heroTitle'] || 'Transform Your Business Operations';
  });

  protected readonly heroSubtitle = computed(() => {
    const currentLang = this.languageService.language();
    return (
      this.translations[currentLang]?.['heroSubtitle'] ||
      'Streamline workflows, enhance productivity, and drive growth with our comprehensive executive management platform.'
    );
  });

  protected readonly features = computed(() => {
    const currentLang = this.languageService.language();
    const messages = this.translations[currentLang];

    return [
      {
        icon: '📊',
        title: messages?.['analyticsTitle'] || 'Analytics & Reporting',
        description:
          messages?.['analyticsDescription'] ||
          'Get deep insights into your business performance with advanced analytics and customizable reports.',
      },
      {
        icon: '⚡',
        title: messages?.['automationTitle'] || 'Process Automation',
        description:
          messages?.['automationDescription'] ||
          'Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.',
      },
      {
        icon: '🔒',
        title: messages?.['securityTitle'] || 'Enterprise Security',
        description:
          messages?.['securityDescription'] ||
          'Bank-level security with end-to-end encryption and compliance with industry standards.',
      },
      {
        icon: '🌐',
        title: messages?.['collaborationTitle'] || 'Global Collaboration',
        description:
          messages?.['collaborationDescription'] ||
          'Connect teams worldwide with real-time collaboration tools and multi-language support.',
      },
      {
        icon: '📱',
        title: messages?.['mobileTitle'] || 'Mobile Ready',
        description:
          messages?.['mobileDescription'] ||
          'Access your dashboard and manage operations on-the-go with our mobile-optimized interface.',
      },
      {
        icon: '🎯',
        title: messages?.['planningTitle'] || 'Strategic Planning',
        description:
          messages?.['planningDescription'] ||
          'Set goals, track progress, and make data-driven decisions with our strategic planning tools.',
      },
    ];
  });

  /**
   * Handle login button click
   */
  protected onLogin(): void {
    console.log('Login clicked');
    // TODO: Implement login functionality
  }

  /**
   * Handle register button click
   */
  protected onRegister(): void {
    console.log('Register clicked');
    this.router.navigate(['/registration']);
  }

  /**
   * Handle get started button click
   */
  protected onGetStarted(): void {
    console.log('Get Started clicked');
    // TODO: Implement get started flow
  }

  /**
   * Handle learn more button click
   */
  protected onLearnMore(): void {
    console.log('Learn More clicked');
    // TODO: Implement learn more functionality
  }

  /**
   * Handle language change
   */
  protected onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const languageCode = target.value as Language;
    this.languageService.setLanguage(languageCode);
  }

  /**
   * Get localized text for the current language
   */
  protected getLocalizedText(key: string): string {
    const currentLang = this.languageService.language();
    return this.translations[currentLang]?.[key] || key;
  }

  /**
   * Get brand name for current language
   */
  protected getBrandName(): string {
    const currentLang = this.languageService.language();
    const brandNames = {
      en: 'Executive\'s Workshop',
      ru: 'Мастерская Директора',
      zh: '高管工作坊',
    };
    return brandNames[currentLang] || brandNames.en;
  }
}
