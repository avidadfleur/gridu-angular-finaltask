import { Component, forwardRef, HostBinding, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating-input',
  template: `
    <span
      *ngFor="let starred of stars; let i = index"
      (click)="rate(i + (starred ? (value > i + 1 ? 1 : 0) : 1))"
    >
      <ng-container *ngIf="starred; else noStar">⭐</ng-container>
      <ng-template #noStar>·</ng-template>
    </span>
  `,
  styles: [`
    span {
      display: inline-block;
      width: 25px;
      line-height: 25px;
      text-align: center;
      cursor: pointer;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor{
  stars: boolean[] = Array(5).fill(false);

  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  onChange = (rating: number) => {};

  onTouched = () => {};

  get value(): number {
    return this.stars.reduce((total, starred) => {
      return total + (starred ? 1 : 0);
    }, 0);
  }

  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  writeValue(rating: number): void {
    this.stars = this.stars.map((_, i) => rating > i);
    this.onChange(this.value);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
