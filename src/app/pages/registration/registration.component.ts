import { Component, ChangeDetectionStrategy, signal, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService, Language } from '../../services/language.service';
import { DraftService } from '../../services/draft.service';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="registration-container">
      <div class="registration-card">
        <header class="registration-header">
          <button class="back-button" (click)="goBack()" type="button">
            ← {{ getLocalizedText('back') }}
          </button>
          <h1 class="registration-title">{{ getLocalizedText('createAccount') }}</h1>
          <p class="registration-subtitle">{{ getLocalizedText('joinWorkshop') }}</p>
        </header>

        <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()" class="registration-form">
          <!-- Personal Information -->
          <div class="form-section">
            <h2 class="section-title">{{ getLocalizedText('personalInfo') }}</h2>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="firstName"
                  >{{ getLocalizedText('firstName') }} *</label
                >
                <input
                  type="text"
                  id="firstName"
                  class="form-input"
                  formControlName="firstName"
                  [placeholder]="getLocalizedText('firstNamePlaceholder')"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="lastName"
                  >{{ getLocalizedText('lastName') }} *</label
                >
                <input
                  type="text"
                  id="lastName"
                  class="form-input"
                  formControlName="lastName"
                  [placeholder]="getLocalizedText('lastNamePlaceholder')"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">{{ getLocalizedText('email') }} *</label>
              <input
                type="email"
                id="email"
                class="form-input"
                formControlName="email"
                [placeholder]="getLocalizedText('emailPlaceholder')"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="phone">{{ getLocalizedText('phone') }}</label>
              <input
                type="tel"
                id="phone"
                class="form-input"
                formControlName="phone"
                [placeholder]="getLocalizedText('phonePlaceholder')"
              />
            </div>
          </div>

          <!-- Professional Information -->
          <div class="form-section">
            <h2 class="section-title">{{ getLocalizedText('professionalInfo') }}</h2>

            <div class="form-group">
              <label class="form-label" for="company">{{ getLocalizedText('company') }} *</label>
              <input
                type="text"
                id="company"
                class="form-input"
                formControlName="company"
                [placeholder]="getLocalizedText('companyPlaceholder')"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="position"
                  >{{ getLocalizedText('position') }} *</label
                >
                <input
                  type="text"
                  id="position"
                  class="form-input"
                  formControlName="position"
                  [placeholder]="getLocalizedText('positionPlaceholder')"
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="experience">{{
                  getLocalizedText('experience')
                }}</label>
                <select id="experience" class="form-select" formControlName="experience">
                  <option value="">{{ getLocalizedText('selectExperience') }}</option>
                  <option value="0-2">0-2 {{ getLocalizedText('years') }}</option>
                  <option value="3-5">3-5 {{ getLocalizedText('years') }}</option>
                  <option value="6-10">6-10 {{ getLocalizedText('years') }}</option>
                  <option value="10+">10+ {{ getLocalizedText('years') }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="form-section">
            <h2 class="section-title">{{ getLocalizedText('additionalInfo') }}</h2>

            <div class="form-group">
              <label class="form-label" for="motivation">{{
                getLocalizedText('motivation')
              }}</label>
              <textarea
                id="motivation"
                class="form-textarea"
                formControlName="motivation"
                rows="4"
                [placeholder]="getLocalizedText('motivationPlaceholder')"
              ></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="expectations">{{
                getLocalizedText('expectations')
              }}</label>
              <textarea
                id="expectations"
                class="form-textarea"
                formControlName="expectations"
                rows="3"
                [placeholder]="getLocalizedText('expectationsPlaceholder')"
              ></textarea>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="form-actions">
            <button type="submit" class="submit-button" [disabled]="registrationForm.invalid">
              {{ getLocalizedText('createAccount') }}
            </button>
            <p class="draft-status">
              {{ getDraftStatusText() }}
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  private readonly draftService = inject(DraftService);

  private readonly DRAFT_KEY = 'registration_form';

  // Form state
  protected readonly registrationForm: FormGroup;
  protected readonly draftStatus = signal<string>('');

  constructor() {
    // Initialize form
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      experience: [''],
      motivation: [''],
      expectations: [''],
    });

    // Load draft data
    this.loadDraft();

    // Setup auto-save
    this.setupAutoSave();
  }

  ngOnDestroy(): void {
    // Save current form state as draft before component is destroyed
    this.saveDraft();
  }

  /**
   * Load draft data from DraftService
   */
  private loadDraft(): void {
    const draft = this.draftService.loadDraft(this.DRAFT_KEY, this.registrationForm);
    if (draft) {
      this.draftStatus.set(this.getLocalizedText('draftLoaded'));
    }
  }

  /**
   * Setup auto-save functionality
   */
  private setupAutoSave(): void {
    // Start auto-save with the existing DraftService method
    this.draftService.startAutoSave(this.registrationForm, this.DRAFT_KEY);

    // Update status when draft is saved
    this.registrationForm.valueChanges.subscribe(() => {
      setTimeout(() => {
        this.draftStatus.set(this.getLocalizedText('draftSaved'));
      }, 1000); // Delay to show save status after debounce
    });
  }

  /**
   * Save current form data as draft
   */
  private saveDraft(): void {
    this.draftService.saveDraft(this.DRAFT_KEY, this.registrationForm.value);
  }

  /**
   * Handle form submission
   */
  protected onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration submitted:', this.registrationForm.value);

      // Clear draft after successful submission
      this.draftService.removeDraft(this.DRAFT_KEY);

      // Show success message and redirect
      alert(this.getLocalizedText('registrationSuccess'));
      this.router.navigate(['/']);
    }
  }

  /**
   * Go back to home page
   */
  protected goBack(): void {
    this.router.navigate(['/']);
  }

  /**
   * Get draft status text
   */
  protected getDraftStatusText(): string {
    const status = this.draftStatus();
    return status || this.getLocalizedText('autoSaveEnabled');
  }

  /**
   * Get localized text for current language
   */
  protected getLocalizedText(key: string): string {
    const currentLang = this.languageService.language();
    const translations: Record<Language, Record<string, string>> = {
      en: {
        back: 'Back',
        createAccount: 'Create Account',
        joinWorkshop: 'Join Executive\'s Workshop and transform your leadership skills',
        personalInfo: 'Personal Information',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phone: 'Phone Number',
        firstNamePlaceholder: 'Enter your first name',
        lastNamePlaceholder: 'Enter your last name',
        emailPlaceholder: 'Enter your email address',
        phonePlaceholder: '+1 (555) 123-4567',
        professionalInfo: 'Professional Information',
        company: 'Company',
        position: 'Position',
        experience: 'Years of Experience',
        companyPlaceholder: 'Enter your company name',
        positionPlaceholder: 'Enter your job title',
        selectExperience: 'Select experience level',
        years: 'years',
        additionalInfo: 'Additional Information',
        motivation: 'What motivates you to join?',
        expectations: 'What are your expectations?',
        motivationPlaceholder: 'Tell us what drives you to improve your leadership skills...',
        expectationsPlaceholder: 'What do you hope to achieve from this workshop?',
        registrationSuccess: 'Registration successful! Welcome to Executive\'s Workshop.',
        draftLoaded: 'Draft loaded from previous session',
        draftSaved: 'Draft saved automatically',
        autoSaveEnabled: 'Auto-save enabled - your progress is saved automatically',
      },
      ru: {
        back: 'Назад',
        createAccount: 'Создать аккаунт',
        joinWorkshop:
          'Присоединяйтесь к Мастерской Директора и трансформируйте свои лидерские навыки',
        personalInfo: 'Личная информация',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Электронная почта',
        phone: 'Номер телефона',
        firstNamePlaceholder: 'Введите ваше имя',
        lastNamePlaceholder: 'Введите вашу фамилию',
        emailPlaceholder: 'Введите ваш email адрес',
        phonePlaceholder: '+7 (999) 123-45-67',
        professionalInfo: 'Профессиональная информация',
        company: 'Компания',
        position: 'Должность',
        experience: 'Опыт работы',
        companyPlaceholder: 'Введите название компании',
        positionPlaceholder: 'Введите вашу должность',
        selectExperience: 'Выберите уровень опыта',
        years: 'лет',
        additionalInfo: 'Дополнительная информация',
        motivation: 'Что мотивирует вас присоединиться?',
        expectations: 'Каковы ваши ожидания?',
        motivationPlaceholder: 'Расскажите, что побуждает вас улучшать лидерские навыки...',
        expectationsPlaceholder: 'Чего вы ожидаете от этого мастер-класса?',
        registrationSuccess: 'Регистрация прошла успешно! Добро пожаловать в Мастерскую Директора.',
        draftLoaded: 'Черновик загружен из предыдущей сессии',
        draftSaved: 'Черновик сохранен автоматически',
        autoSaveEnabled: 'Автосохранение включено - ваш прогресс сохраняется автоматически',
      },
      zh: {
        back: '返回',
        createAccount: '创建账户',
        joinWorkshop: '加入高管工作坊，提升您的领导技能',
        personalInfo: '个人信息',
        firstName: '名字',
        lastName: '姓氏',
        email: '电子邮箱',
        phone: '电话号码',
        firstNamePlaceholder: '输入您的名字',
        lastNamePlaceholder: '输入您的姓氏',
        emailPlaceholder: '输入您的邮箱地址',
        phonePlaceholder: '+86 138 0013 8000',
        professionalInfo: '职业信息',
        company: '公司',
        position: '职位',
        experience: '工作经验',
        companyPlaceholder: '输入您的公司名称',
        positionPlaceholder: '输入您的职位',
        selectExperience: '选择经验水平',
        years: '年',
        additionalInfo: '附加信息',
        motivation: '什么促使您加入？',
        expectations: '您的期望是什么？',
        motivationPlaceholder: '告诉我们是什么驱使您提升领导技能...',
        expectationsPlaceholder: '您希望从这个工作坊中获得什么？',
        registrationSuccess: '注册成功！欢迎来到高管工作坊。',
        draftLoaded: '已加载上次会话的草稿',
        draftSaved: '草稿已自动保存',
        autoSaveEnabled: '自动保存已启用 - 您的进度会自动保存',
      },
    };

    return translations[currentLang]?.[key] || key;
  }
}
