// Generated by https://quicktype.io

import { ReservationElement } from "./ReservationsProjection";

export interface SeancesProjections {
    _embedded: Embedded;
    _links:    SeancesProjectionsLinks;
}

export interface Embedded {
    seances: SeanceElement[];
}

export interface SeanceElement {
    id:           string;
    prix:         number;
    reservations: ReservationElement[];
    emplacement:  Emplacement;
    dateSeance:   string;
    creneau:      Creneau;
    activite:     Activite;
    _links:       SeanceLinks;
}

export interface SeanceLinks {
    self:         Self;
    seance:       LinksSeance;
    emplacement:  Self;
    creneau:      Self;
    activite:     Self;
    reservations: Self;
}

export interface Self {
    href: string;
}

export interface LinksSeance {
    href:      string;
    templated: boolean;
}

export interface Activite {
    id:          string;
    name:        string;
    description: string;
    realisateur: string;
    duree:       number;
}

export interface Creneau {
    heureDebut: string;
}

export interface Emplacement {
    id:       string;
    name:     string;
    nbrPlace: number;
    photo:    string;
}


export interface SeancesProjectionsLinks {
    self: Self;
}