import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageInputComponent } from './image-input.component';

describe('ImageInputComponent', () => {
  let component: ImageInputComponent;
  let fixture: ComponentFixture<ImageInputComponent>;

  //Initialisation blob mock
  const lastModifiedDate = 'lastModifiedDate';
  const name = 'name';

  const typeFile = 'image/jpeg';
  const blob = new Blob([], { type: typeFile });
  blob[lastModifiedDate] = '';
  blob[name] = 'file.jpg';
  const fakeFile = blob as File;


  // Propriété privée
  const displayNone = 'displayNone';
  const displayBlock = 'displayBlock';

  //Méthode privée
  const displayScreenshot = 'displayScreenshot';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ImageInputComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Initialisation des éléments HTML
    component.viewerDiv.nativeElement.style.display = component[displayNone];
    component.inputDiv.nativeElement.style.display = component[displayBlock];
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TEST ngOnChange', () => {
    const displayScreenshotSpy =  spyOn<any>(component, displayScreenshot);
    component.ngOnChanges(null);
    expect(displayScreenshotSpy).toHaveBeenCalledTimes(0);
    component.screenshot = fakeFile;
    component.ngOnChanges(null);
    expect(displayScreenshotSpy).toHaveBeenCalledTimes(1);
  });

  it('TEST uploadScreenshot', async () => {
    const e = {
      target: {
        files: [fakeFile]
      }
    };
    component.uploadScreenshot(e);

    const pauseFor = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
    await pauseFor(100);

    expect(component.havePicture).toBeTrue();

    expect(component.screenshot).toBeTruthy();
    expect(component[displayNone]).toEqual(component.inputDiv.nativeElement.style.display);
    expect(component[displayBlock]).toEqual(component.viewerDiv.nativeElement.style.display);
  });

  it('TEST cancelScreenshot avec confirm == true', () => {
    spyOn(window, 'confirm').and.callFake(() => true);
    spyOn(component.cancelImageEmitter, 'emit');

    component.cancelImage();

    expect(component.havePicture).toBeFalse();
    expect(component.screenshot).toBeNull();

    expect(component[displayNone]).toEqual(component.viewerDiv.nativeElement.style.display);
    expect(component[displayBlock]).toEqual(component.inputDiv.nativeElement.style.display);
    expect(component.cancelImageEmitter.emit).toHaveBeenCalled();
  });

  it('TEST cancelScreenshot avec confirm == false', () => {
    spyOn(window, 'confirm').and.callFake(() => false);
    spyOn(component.cancelImageEmitter, 'emit');

    component.cancelImage();
    expect(component.cancelImageEmitter.emit).toHaveBeenCalledTimes(0);
  });

  it('TEST getFile', () => {
    expect(undefined).toEqual(component.getFile());

    spyOnProperty(component.fileUpload.nativeElement, 'files').and.returnValue([fakeFile]);
    expect(fakeFile).toEqual(component.getFile());
  });


  it('TEST private displayScreenshot', () => {
    expect(component[displayNone]).toEqual(component.viewerDiv.nativeElement.style.display);
    expect(component[displayBlock]).toEqual(component.inputDiv.nativeElement.style.display);
    component[displayScreenshot]();
    expect(component[displayNone]).toEqual(component.inputDiv.nativeElement.style.display);
    expect(component[displayBlock]).toEqual(component.viewerDiv.nativeElement.style.display);
  });
});
