import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { LogService } from 'src/providers/services/log.service';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss', './../../add-incident.page.scss'],
})
export class ImageInputComponent implements OnChanges {

  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  @ViewChild('inputDiv', { static: false }) inputDiv: ElementRef;
  @ViewChild('viewerDiv', { static: false }) viewerDiv: ElementRef;


  @Output() cancelImageEmitter = new EventEmitter<void>();
  @Input() screenshot;

  public havePicture = false;

  private displayNone = 'none';
  private displayBlock = 'block';

  constructor(private logger: LogService) { }
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
  public uploadScreenshot(event) {
    this.logger.log('ImageInputComponent.uploadScreenshot enclenché');
    if (event.target.files && event.target.files[0]) {
      this.havePicture = true;
      this.displayScreenshot();

      const reader = new FileReader();
      reader.onload = (progressEvent: ProgressEvent) => {
        this.screenshot = (progressEvent.target as FileReader).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  /**
   * Annule l'image en la retirant dans l'objet Incident et remettant à disposition
   * les éléments permettant de choisir une image
   */
  public cancelImage() {
    if (confirm('Êtes vous sûr de vouloir supprimer l\'image?')) {

      this.logger.log('ImageInputComponent.cancelScreenshot enclenché');
      this.havePicture = false;
      this.screenshot = null;

      this.fileUpload.nativeElement.type = 'text';
      this.fileUpload.nativeElement.type = 'file';

      this.cancelImageEmitter.emit();

      this.viewerDiv.nativeElement.style.display = this.displayNone;
      this.inputDiv.nativeElement.style.display = this.displayBlock;
    }
  }

  public getFile(): any {
    return this.fileUpload.nativeElement.files[0];
  }

  /**
   * Active l'afficheur d'image
   */
  private displayScreenshot() {
    this.inputDiv.nativeElement.style.display = this.displayNone;
    this.viewerDiv.nativeElement.style.display = this.displayBlock;
  }
}
