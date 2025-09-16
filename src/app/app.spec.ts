import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render brand name in navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain("Executive's Workshop");
  });

  it('should render hero title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.hero-title')?.textContent).toContain(
      'Transform Your Business Operations',
    );
  });

  it('should have navigation menu items', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('.nav-link');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  it('should have login and register buttons with localized text', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const loginBtn = compiled.querySelector('.btn-login');
    const registerBtn = compiled.querySelector('.btn-signup');
    expect(loginBtn).toBeTruthy();
    expect(registerBtn).toBeTruthy();
    expect(loginBtn?.textContent?.trim()).toBe('Login');
    expect(registerBtn?.textContent?.trim()).toBe('Register');
  });

  it('should have language selector with 3 language options', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const languageSelector = compiled.querySelector('.language-selector');
    const languageOptions = compiled.querySelectorAll('.language-selector option');
    expect(languageSelector).toBeTruthy();
    expect(languageOptions.length).toBe(3);
    expect(languageOptions[0].textContent).toContain('English');
    expect(languageOptions[1].textContent).toContain('Русский');
    expect(languageOptions[2].textContent).toContain('中文');
  });

  it('should have feature cards', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(6);
  });

  it('should have primary and secondary action buttons with localized text', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryBtn = compiled.querySelector('.btn-primary');
    const secondaryBtn = compiled.querySelector('.btn-secondary');
    expect(primaryBtn?.textContent?.trim()).toBe('Get Started');
    expect(secondaryBtn?.textContent?.trim()).toBe('Learn More');
  });
});
