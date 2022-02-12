// Generated by https://quicktype.io

export interface Places {
    _embedded: Embedded;
    _links:    PlacesLinks;
    page:      Page;
}

export interface Embedded {
    places: Place[];
}

export interface Place {
    numero:    number;
    longitude: number;
    latitude:  number;
    altitude:  number;
    _links:    PlaceLinks;
}

export interface PlaceLinks {
    self:         First;
    place:        First;
    emplacement:  First;
    reservations: First;
}

export interface First {
    href: string;
}

export interface PlacesLinks {
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