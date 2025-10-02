import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';

interface Organization {
  id: number;
  name: string;
}

interface GridTile {
  text: string;
  cols: number;
  rows: number;
  color: string;
}

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-container">
      <mat-sidenav-container class="sidenav-container">
        <!-- Sidenav -->
        <mat-sidenav #drawer class="sidenav" fixedInViewport mode="side" opened>
          <mat-nav-list>
            <a mat-list-item 
               (click)="setActiveSection('views')"
               (keyup.enter)="setActiveSection('views')"
               (keyup.space)="setActiveSection('views')"
               tabindex="0"
               role="button"
               [attr.aria-pressed]="activeSection() === 'views'">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Представления</span>
            </a>
            <a mat-list-item 
               (click)="setActiveSection('attributes')"
               (keyup.enter)="setActiveSection('attributes')"
               (keyup.space)="setActiveSection('attributes')"
               tabindex="0"
               role="button"
               [attr.aria-pressed]="activeSection() === 'attributes'">
              <mat-icon matListItemIcon>settings</mat-icon>
              <span matListItemTitle>Атрибуты</span>
            </a>
            <a mat-list-item 
               (click)="setActiveSection('workspace')"
               (keyup.enter)="setActiveSection('workspace')"
               (keyup.space)="setActiveSection('workspace')"
               tabindex="0"
               role="button"
               [attr.aria-pressed]="activeSection() === 'workspace'">
              <mat-icon matListItemIcon>work</mat-icon>
              <span matListItemTitle>Рабочий стол</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <!-- Main Content -->
        <mat-sidenav-content>
          <!-- Toolbar -->
          <mat-toolbar color="primary">
            <button
              type="button"
              aria-label="Toggle sidenav"
              mat-icon-button
              (click)="drawer.toggle()"
              class="menu-button">
              <mat-icon aria-label="Side nav toggle icon">menu</mat-icon>
            </button>
            
            <span class="toolbar-title">мастерская директора</span>
            
            <!-- Organization Dropdown -->
            <mat-form-field appearance="outline" class="organization-select">
              <mat-label>Организация</mat-label>
              <mat-select
                [value]="selectedOrganization().id"
                (selectionChange)="selectOrganization($event.value)">
                @for (org of organizations(); track org.id) {
                  <mat-option [value]="org.id">{{ org.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>
            
            <span class="spacer"></span>
          </mat-toolbar>

          <!-- Content Area -->
          <div class="content">
            @switch (activeSection()) {
              @case ('views') {
                <div class="section-content">
                  <h2>Представления</h2>
                  <mat-grid-list cols="4" rowHeight="120px" gutterSize="16px">
                    @for (tile of functionTiles(); track tile.text) {
                      <mat-grid-tile
                        [colspan]="tile.cols"
                        [rowspan]="tile.rows"
                        [style.background]="tile.color"
                        class="function-tile">
                        <div class="tile-content">{{tile.text}}</div>
                      </mat-grid-tile>
                    }
                  </mat-grid-list>
              </div>
              }
              @case ('attributes') {
                <div class="section-content">
                  <h2>Атрибуты</h2>
                  <p>Hello World - Содержимое раздела "Атрибуты"</p>
          </div>
              }
              @case ('workspace') {
                <div class="section-content">
                  <h2>Рабочий стол</h2>
                  <p>Hello World - Содержимое раздела "Рабочий стол"</p>
                </div>
              }
            }
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
        </div>
  `,
  styles: [`
    .app-container {
      padding-top: 10px;
      height: 100vh;
      box-sizing: border-box;
    }
    
    .sidenav-container {
      position: absolute;
      top: 10px;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .sidenav {
      width: 250px;
    }

    .sidenav .mat-toolbar {
      background: inherit;
    }

    .mat-toolbar.mat-primary {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .menu-button {
      margin-right: 16px;
    }

    .toolbar-title {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .organization-select {
      min-width: 200px;
      margin-left: 16px;
    }

    .organization-select .mat-mdc-form-field-outline {
      color: rgba(255, 255, 255, 0.5) !important;
    }

    .organization-select.mat-mdc-form-field.mat-focused .mat-mdc-form-field-outline {
      color: rgba(255, 255, 255, 0.8) !important;
    }

    .organization-select .mat-mdc-form-field-label {
      color: rgba(255, 255, 255, 0.7) !important;
    }

    .organization-select .mat-mdc-select-value,
    .organization-select .mat-mdc-select-arrow {
      color: white !important;
    }

    ::ng-deep .organization-select .mat-mdc-form-field-wrapper {
      padding-bottom: 0;
    }

    ::ng-deep .organization-select .mat-mdc-form-field-subscript-wrapper {
      display: none;
    }

    .content {
      padding: 24px;
      min-height: calc(100vh - 64px);
      background-color: #fafafa;
    }

    .section-content {
      max-width: 1200px;
      margin: 0 auto;
      background: #ffffff;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .section-content h2 {
      margin-top: 0;
      color: #333333;
      font-size: 1.8rem;
      margin-bottom: 16px;
    }

    .section-content p {
      color: #666666;
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .function-tile {
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
      border: 2px solid #ddd;
    }

    .function-tile:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .tile-content {
      text-align: center;
      font-weight: 500;
      line-height: 1.3;
      padding: 8px;
      color: #333;
    }

    /* Mobile styles */
    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }
      
      .toolbar-title {
        font-size: 1rem;
      }
      
      .organization-select {
        min-width: 150px;
      }
      
      .content {
        padding: 16px;
      }
      
      .section-content {
        padding: 16px;
      }
    }
  `],
})
export class App {
  // State signals
  protected readonly organizations = signal<Organization[]>([
    { id: 1, name: 'организация 1' },
    { id: 2, name: 'организация 2' },
  ]);

  protected readonly selectedOrganizationId = signal<number>(1);
  protected readonly activeSection = signal<'views' | 'attributes' | 'workspace'>('views');

  // Computed to get selected organization
  protected readonly selectedOrganization = computed(() => {
    const selectedId = this.selectedOrganizationId();
    return this.organizations().find(org => org.id === selectedId) || this.organizations()[0];
  });

  // Function tiles data from the image - all grey
  protected readonly functionTiles = signal<GridTile[]>([
    { text: 'РЕЕСТРОМ', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Поток Задач Организации (ПЗО)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Конструктор РЕЕСТРОМА организации (КРО)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Схема Архитектуры Организации (САО)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Организационно-Штатная Структура (ОШС)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Штатное Расписание (ШР)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Дерево Целей СтейкХолдеров Организации (ДЦ СХО)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Версия Стратегии Развития (ВСР)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Деревья Текущей Реальности по СамоВоспроизводящимся Проблемам (ДТР по СВП)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Деревья Будущей Реальности по Системным Требованиям (ДБР по СТ)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Деревья Перехода по Целевым Стратегическим Задачам (ДП по ЦСЗ)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'SwimLane-Диаграммы по Шаблонным Дискретным Задачам (SL-Д по ШДЗ)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Бюджет Потока Задач Организации (БПЗО)', cols: 1, rows: 1, color: '#f5f5f5' },
    { text: 'Реестр Оценки Статистики по Показателям Целевых Результатов Задач (РОС по ПЦРЗ)', cols: 1, rows: 1, color: '#f5f5f5' },
  ]);

  /**
   * Select organization from dropdown
   */
  protected selectOrganization(orgId: number): void {
    this.selectedOrganizationId.set(orgId);
  }

  /**
   * Set active section from sidenav
   */
  protected setActiveSection(section: 'views' | 'attributes' | 'workspace'): void {
    this.activeSection.set(section);
  }
}
