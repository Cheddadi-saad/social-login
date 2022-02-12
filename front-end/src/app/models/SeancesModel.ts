// Generated by https://quicktype.io

export interface Seances {
    _embedded: Embedded;
    _links:    SeancesLinks;
    page:      Page;
}

export interface Embedded {
    seances: Seance[];
}

export interface Seance {
    dateSeance: string;
    prix:       number;
    _links:     SeanceLinks;
}

export interface SeanceLinks {
    self:         First;
    seance:       First;
    activite:     First;
    reservations: First;
    emplacement:  First;
    creneau:      First;
}

export interface First {
    href: string;
}

export interface SeancesLinks {
    first:   First;
    self:    First;
    next:    First;
    last:    First;
    profile: First;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
