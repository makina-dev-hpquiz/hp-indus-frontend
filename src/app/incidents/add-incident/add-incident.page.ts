import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Incident } from 'src/entities/incident';
import { IncidentPropertiesService } from 'src/providers/services/incident-properties.service';
import { IncidentService } from 'src/providers/services/incident.service';
import { ImageInputComponent } from './components/image-input/image-input.component';


@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.page.html',
  styleUrls: ['./add-incident.page.scss'],
})
export class AddIncidentPage implements OnInit {

  @ViewChild('imageInput') imageInput: ImageInputComponent;

  public incident: Incident;

  // Variables à afficher
  public typesList: string[];
  public prioritiesList: string[];
  public statusList: string[];
  public screenshot;
  public updatedAt: string;
  public createdAt: string;

  // Etat de la page
  public state: string;
  public readonly STATE_NEW = 'NEW';
  public readonly STATE_UPDATE = 'UPDATE';

  public readonly INCIDENTS_PAGE = '/incidents';

  constructor(private route: ActivatedRoute, private router: Router,
    private incidentService: IncidentService, public toastController: ToastController,
    public incidentPropertiesService: IncidentPropertiesService) {

    this.incident = new Incident();
  }


  async ngOnInit() {
    this.incident = new Incident();

    const incidentType = await this.incidentPropertiesService.getTypes();
    const incidentPriorities = await this.incidentPropertiesService.getPriorities();
    const incidentStatus = await this.incidentPropertiesService.getStatus();

    if (incidentType && incidentPriorities && incidentStatus) {
      this.typesList = incidentType.properties;
      this.prioritiesList = incidentPriorities.properties;
      this.incident.priority = incidentPriorities.defaultProperty;

      this.statusList = incidentStatus.properties;
      this.incident.status = incidentStatus.defaultProperty;
    }

    if (this.route.snapshot.data.special) {
      this.state = this.STATE_UPDATE;
      this.incident = await this.getIncident(this.route.snapshot.data.special.id);

      this.screenshot = this.incident.screenshotWebPath;
      this.updatedAt = this.incident.updatedAt.toISOString();
      this.createdAt = this.incident.createdAt.toISOString();

    } else {
      this.state = this.STATE_NEW;

      // Initialisation date du jour
      this.incident.createdAt = new Date();
      this.createdAt = this.incident.createdAt.toISOString();
      this.updatedAt = this.createdAt;

      this.incident.screenshotPath = '';
      this.incident.screenshotWebPath = '';
      this.incident.description = '';
    }
  }


  /**
   * Enclenché par le bouton submit du formulaire.
   * Permet d'utilsier les actions de sauvegarde en fonction de l'état de la page NEW ou UPDATE
   *
   * @param formValue
   */
  public saveAction(formValue) {

    if (this.formValueIsComplete()) {
      if (this.state === this.STATE_NEW) {
        this.addIncident(formValue);
      } else {
        formValue.updatedAt = new Date().toISOString();
        this.updateIncident(formValue);
      }
    }
  }



  /**
   * Enclenché lorsque l'input date est changé
   * Met à jour incident.date avec la date sélectionné
   */
  public updateDate() {
    this.updatedAt = this.createdAt;
  }

  /**
   * Enclenché lorsque le bouton supprimer est enclenché
   * Envoie une requête pour supprimer l'incident actuel
   */
  public deleteIncident() {
    if (confirm('Êtes vous sûr de vouloir supprimer l\'incident?')) {
      this.incidentService.deleteById(this.incident.id).then((event: any) => {
        this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
        });
      });
    }
  }

  /**
   * Enclenché depuis avec l'action du composant ImageInput
   * Retire les images de l'objet Incident
   */
  public cancelImage() {
    this.incident.screenshotPath = '';
    this.incident.screenshotWebPath = '';
  }

  /**
   * Valide si l'objet Incident est complet et prêt à être sauvegarder
   * Dans le cas contraîre fait apparaître un toast
   *
   * @returns Boolean
   */
  public formValueIsComplete(): boolean {
    if (!this.incident.title ||
      !this.incident.description ||
      !this.incident.priority ||
      !this.incident.status ||
      !this.incident.type) {
      this.presentToast();
      return false;
    }

    return true;
  }

  /**
   * Initie une requête pour sauvergarder un nouvel incident
   *
   * @param formValue
   */
  private async addIncident(formValue) {
    await this.incidentService.save(this.generateIncidentFormData(formValue)).then((event: any) => {
      this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
      });
    });
  }

  /**
   * Initie une requête pour mettre à jour un incident existant
   *
   * @param formValue
   */
  private async updateIncident(formValue) {
    await this.incidentService.update(this.generateIncidentFormData(formValue)).then((event: any) => {
      this.router.navigate([this.INCIDENTS_PAGE]).then(() => {
      });
    });
  }

  /**
   * Initie une requête pour récupérer un incident en fournissant son ID
   *
   * @param id
   * @returns Incident
   */
  private async getIncident(id): Promise<Incident> {
    return await this.incidentService.get(id);
  }

  /**
   * Fait apparaître un message
   */
  private async presentToast() {
    const toast = await this.toastController.create({
      message: 'L\'incident n\'est pas complet et ne peut être sauvegarder en l\'état',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  /**
   * Génére un object FormData à partir d'un objet form.value
   *
   * @param formValue
   * @returns FormData
   */
  private generateIncidentFormData(formValue) {
    const formData = new FormData();
    Object.keys(formValue).map((key) => formData.append(key, formValue[key]));
    formData.append('file', this.imageInput.getFile());
    console.log(formData);
    return formData;
  }
}
