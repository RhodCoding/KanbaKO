import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'; // Adjusted import to AppComponent

describe('AppComponent', () => {
  let component: AppComponent; // Change to AppComponent
  let fixture: ComponentFixture<AppComponent>; // Change to AppComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Change to AppComponent
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent); // Change to AppComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
