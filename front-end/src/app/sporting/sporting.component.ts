import { SeanceService } from './../services/seance.service';
import { ActiviteSportiveService } from './../services/activiteSportive.service';
import { VillesService } from './../services/villes.service';
import { Ville, Villes } from '../models/VillesModel';
import { Component, OnInit } from '@angular/core';
import { ActiviteSportive, ActivitesSportives } from '../models/ActivitesSportivesModel';
import { EmplacementService } from '../services/emplacement.service';
import { Emplacement, Emplacements } from '../models/EmplacementsModel';
import { SeanceElement, SeancesProjections } from '../models/SeanceProjection';
import { AppSettings } from '../constantes/constantes.commun';
import { ReservationElement, ReservationsProjection } from '../models/ReservationsProjection';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Seance } from '../models/SeancesModel';
import { ReservationService } from '../services/reservation.service';

/**
 * Component
 */
@Component({
  selector: 'app-sporting',
  templateUrl: './sporting.component.html',
  styleUrls: ['./sporting.component.css'],
})
export class SportingComponent implements OnInit {
  /**
   * Villes  of sporting component
   */
  villes!: Ville[];
  /**
   * Activites sportives of sporting component
   */
  activitesSportives!: ActiviteSportive[];
  /**
   * Emplacements  of sporting component
   */
  emplacements!: Emplacement[];
  /**
   * Current ville of sporting component
   */
  currentVille!: Ville;
  /**
   * Current activite sportive of sporting component
   */
  currentActiviteSportive!: ActiviteSportive;

  public selectedReservations: any[] = [];

  /**
   * Endpoint  of sporting component
   */
  public endpoint = AppSettings.API_ENDPOINT;
  public currentSeance!: SeanceElement;

  /**
   * Creates an instance of sporting component.
   * @param villesService
   * @param activiteSportiveService
   * @param emplacementService
   * @param seanceService
   */
  constructor(
    private http: HttpClient,
    private villesService: VillesService,
    private activiteSportiveService: ActiviteSportiveService,
    private emplacementService: EmplacementService,
    private seanceService: SeanceService,
    private reservationService: ReservationService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.villesService.getVilles().subscribe(
      (data: Villes) => {
        this.villes = data._embedded.villes;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public myObservable = (): Observable<boolean> => {
    console.log('retrieving the token in DB');
    return Observable.create((observer: { next: (arg0: boolean) => void; complete: () => void }) => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 5000);
    });
  };

  /**
   * Determines whether get activites sportives on
   * @param ville
   */
  onGetActivitesSportives(ville: Ville) {
    this.activitesSportives = [];
    this.emplacements = [];
    this.currentVille = ville;
    this.activiteSportiveService.getActivitesSportives(ville).subscribe((data: ActivitesSportives) => {
      this.activitesSportives = data._embedded.activiteSportives;
    });
  }

  /**
   * Determines whether get emplacements on
   * @param activiteSportive
   */
  onGetEmplacements(activiteSportive: ActiviteSportive) {
    this.currentActiviteSportive = activiteSportive;
    this.emplacementService.getEmplacements(activiteSportive).subscribe((data: Emplacements) => {
      this.emplacements = data._embedded.emplacements;
      this.emplacements.forEach((emplacement) => {
        this.seanceService.getSeancesProjection(emplacement).subscribe((data: SeancesProjections) => {
          emplacement.seancesProjections = data._embedded.seances;
        });
      });
    });
  }

  /**
   * Determines whether get reservation place on
   * @param seance
   */
  onGetReservationPlace(seance: SeanceElement) {
    this.currentSeance = seance;
    let url = seance._links.reservations.href.replace('{?projection}', '') + '?projection=res1';
    this.seanceService.getReservationPlaces(seance).subscribe((data: ReservationsProjection) => {
      this.currentSeance.reservations = data._embedded.reservations;
      this.selectedReservations = [];
    });
  }

  /**
   * Determines whether selected reservation on
   * @param reservation
   */
  onSelectedReservation(reservation: ReservationElement) {
    if (!reservation.selected) {
      reservation.selected = true;
      this.selectedReservations.push(reservation);
    } else {
      reservation.selected = false;
      this.selectedReservations.splice(this.selectedReservations.indexOf(reservation), 1);
    }
    console.log(this.selectedReservations);
  }

  /**
   * Gets css class reservation
   * @param reservation
   * @returns
   */
  getCssClassReservation(reservation: ReservationElement) {
    let str = '';
    if (reservation.reserve == true) {
      str = 'btn btn-secondary disabled button-reservation';
    } else if (reservation.selected) {
      str = 'btn btn-warning button-reservation';
    } else {
      str = 'btn btn-success button-reservation';
    }
    return str;
  }
  /**
   * Determines whether reserve place on
   * @param dataForm
   */
  onReservePlace(dataForm: any) {
    let reservations: any[] = [];
    this.selectedReservations.forEach((reservation) => {
      reservations.push(reservation.id);
    });
    dataForm.reservations = reservations;
    this.reservationService.reserverSeance(dataForm).subscribe((data: ReservationElement) => {
      alert('place reserver');
      this.onGetReservationPlace(this.currentSeance);
    });
  }
}
