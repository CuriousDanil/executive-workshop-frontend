import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

interface DraftData {
  data: unknown;
  timestamp: string;
  version: string;
}

/**
 * Service for managing form drafts in SessionStorage
 * Automatically saves form changes with debounce to prevent excessive storage operations
 */
@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private readonly STORAGE_PREFIX = 'draft_';
  private readonly DEBOUNCE_TIME = 500; // 500ms debounce

  /**
   * Start auto-saving form changes to SessionStorage
   * @param formGroup - The reactive form to monitor
   * @param key - Unique identifier for this draft
   */
  startAutoSave(formGroup: FormGroup, key: string): void {
    // Subscribe to form changes with debounce
    formGroup.valueChanges.pipe(debounceTime(this.DEBOUNCE_TIME)).subscribe((value) => {
      this.saveDraft(key, value);
    });

    // Load existing draft on initialization
    this.loadDraft(key, formGroup);
  }

  /**
   * Save form data as draft to SessionStorage
   * @param key - Unique identifier for this draft
   * @param data - Form data to save
   */
  saveDraft(key: string, data: unknown): void {
    try {
      const storageKey = this.STORAGE_PREFIX + key;
      const draftData = {
        data,
        timestamp: new Date().toISOString(),
        version: '1.0',
      };
      sessionStorage.setItem(storageKey, JSON.stringify(draftData));
    } catch (error) {
      console.warn('Failed to save draft to SessionStorage:', error);
    }
  }

  /**
   * Load draft data from SessionStorage and patch form
   * @param key - Unique identifier for the draft
   * @param formGroup - Form to patch with draft data
   * @returns The loaded draft data or null if not found
   */
  loadDraft(key: string, formGroup?: FormGroup): unknown {
    try {
      const storageKey = this.STORAGE_PREFIX + key;
      const draftJson = sessionStorage.getItem(storageKey);

      if (!draftJson) {
        return null;
      }

      const draft = JSON.parse(draftJson) as DraftData;

      // Patch form if provided
      if (formGroup && draft.data) {
        formGroup.patchValue(draft.data, { emitEvent: false });
      }

      return draft;
    } catch (error) {
      console.warn('Failed to load draft from SessionStorage:', error);
      return null;
    }
  }

  /**
   * Check if a draft exists for the given key
   * @param key - Unique identifier for the draft
   * @returns true if draft exists, false otherwise
   */
  hasDraft(key: string): boolean {
    const storageKey = this.STORAGE_PREFIX + key;
    return sessionStorage.getItem(storageKey) !== null;
  }

  /**
   * Remove draft from SessionStorage
   * @param key - Unique identifier for the draft to remove
   */
  removeDraft(key: string): void {
    const storageKey = this.STORAGE_PREFIX + key;
    sessionStorage.removeItem(storageKey);
  }

  /**
   * Clear all drafts from SessionStorage
   */
  clearAllDrafts(): void {
    const keysToRemove = [];

    // Find all keys with our prefix
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(this.STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }

    // Remove all draft keys
    keysToRemove.forEach((key) => sessionStorage.removeItem(key));
  }

  /**
   * Get metadata about a draft (timestamp, version)
   * @param key - Unique identifier for the draft
   * @returns Draft metadata or null if not found
   */
  getDraftMetadata(key: string): { timestamp: string; version: string } | null {
    const draft = this.loadDraft(key) as DraftData | null;
    return draft ? { timestamp: draft.timestamp, version: draft.version } : null;
  }

  /**
   * Check if a draft is older than specified minutes
   * @param key - Unique identifier for the draft
   * @param minutes - Age threshold in minutes
   * @returns true if draft is older than threshold
   */
  isDraftOlderThan(key: string, minutes: number): boolean {
    const metadata = this.getDraftMetadata(key);
    if (!metadata) return false;

    const draftTime = new Date(metadata.timestamp);
    const thresholdTime = new Date(Date.now() - minutes * 60 * 1000);

    return draftTime < thresholdTime;
  }
}
