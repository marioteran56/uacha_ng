import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputMolecule } from './image-input.molecule';

describe('ImageInputMolecule', () => {
  let component: ImageInputMolecule;
  let fixture: ComponentFixture<ImageInputMolecule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageInputMolecule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputMolecule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
