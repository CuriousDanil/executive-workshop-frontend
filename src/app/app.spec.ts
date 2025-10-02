import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NoopAnimationsModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar with correct title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toolbar-title')?.textContent).toContain('мастерская директора');
  });

  it('should have sidenav with navigation items', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check sidenav exists
    expect(compiled.querySelector('mat-sidenav')).toBeTruthy();
    
    // Check navigation items
    const navItems = compiled.querySelectorAll('mat-nav-list a[mat-list-item]');
    expect(navItems.length).toBe(3);
    
    // Check specific navigation text (icon + text are concatenated)
    const navTexts = Array.from(navItems).map(item => item.textContent?.trim());
    expect(navTexts[0]).toContain('Представления');
    expect(navTexts[1]).toContain('Атрибуты');
    expect(navTexts[2]).toContain('Рабочий стол');
  });

  it('should have organization selector in toolbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check organization selector exists
    expect(compiled.querySelector('.organization-select')).toBeTruthy();
    expect(compiled.querySelector('mat-select')).toBeTruthy();
    expect(compiled.querySelector('mat-label')?.textContent).toContain('Организация');
  });

  it('should display Views section by default', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check default section
    expect(compiled.querySelector('.section-content h2')?.textContent).toContain('Представления');
    expect(compiled.querySelector('mat-grid-list')).toBeTruthy();
  });

  it('should have correct number of function tiles', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check grid tiles
    const tiles = compiled.querySelectorAll('mat-grid-tile');
    expect(tiles.length).toBe(14);
    
    // Check first tile content
    expect(tiles[0]?.textContent?.trim()).toBe('РЕЕСТРОМ');
  });

  it('should have two organizations in selector', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    // Check organizations signal
    expect(app['organizations']().length).toBe(2);
    expect(app['organizations']()[0].name).toBe('организация 1');
    expect(app['organizations']()[1].name).toBe('организация 2');
  });

  it('should switch sections when navigation is clicked', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    // Initially should be on views
    expect(app['activeSection']()).toBe('views');
    
    // Switch to attributes
    app['setActiveSection']('attributes');
    fixture.detectChanges();
    expect(app['activeSection']()).toBe('attributes');
    
    // Switch to workspace
    app['setActiveSection']('workspace');
    fixture.detectChanges();
    expect(app['activeSection']()).toBe('workspace');
  });

  it('should select organization correctly', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    
    // Initially should be organization 1
    expect(app['selectedOrganizationId']()).toBe(1);
    expect(app['selectedOrganization']().name).toBe('организация 1');
    
    // Switch to organization 2
    app['selectOrganization'](2);
    fixture.detectChanges();
    expect(app['selectedOrganizationId']()).toBe(2);
    expect(app['selectedOrganization']().name).toBe('организация 2');
  });

  it('should have menu toggle button', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.menu-button')).toBeTruthy();
    expect(compiled.querySelector('.menu-button mat-icon')?.textContent?.trim()).toBe('menu');
  });

  it('should have proper CSS classes for styling', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check main layout classes
    expect(compiled.querySelector('.app-container')).toBeTruthy();
    expect(compiled.querySelector('.sidenav-container')).toBeTruthy();
    expect(compiled.querySelector('.content')).toBeTruthy();
    expect(compiled.querySelector('.section-content')).toBeTruthy();
  });
});
