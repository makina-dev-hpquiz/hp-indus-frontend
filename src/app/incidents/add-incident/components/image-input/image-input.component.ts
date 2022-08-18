import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss'],
})
export class ImageInputComponent implements OnChanges {

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
  @ViewChild('viewerDiv', { static: false }) viewerDiv: ElementRef;


  @Output() cancelImage = new EventEmitter<void>();
  @Input() screenshot;

  public havePicture = false;

  private displayNone = 'none';
  private displayBlock = 'block';

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.screenshot) {
      this.displayScreenshot();
    }
  }

  /**
   * Charge l'image envoyé par l'input
   *
   * @param event
   */
  loadScreenshot(event) {
    this.havePicture = true;
    this.displayScreenshot();

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (progressEvent: ProgressEvent) => {
        this.screenshot = (progressEvent.target as FileReader).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  /**
   * Active l'afficheur d'image
   */
  displayScreenshot() {
    this.inputDiv.nativeElement.style.display = this.displayNone;
    this.viewerDiv.nativeElement.style.display = this.displayBlock;
  }

  /**
   * Annule l'image en la retirant dans l'objet Incident et remettant à disposition
   * les éléments permettant de choisir une image
   */
  cancelScreenshot() {
    if (confirm('Êtes vous sûr de vouloir supprimer l\'image?')) {
      this.havePicture = false;
      this.screenshot = null;

      this.fileUpload.nativeElement.type = 'text';
      this.fileUpload.nativeElement.type = 'file';

      this.cancelImage.emit();

      this.viewerDiv.nativeElement.style.display = this.displayNone;
      this.inputDiv.nativeElement.style.display = this.displayBlock;
    }
  }

  public getFile(): any{
    return this.fileUpload.nativeElement.files[0];
  }

}
