// Generated by https://quicktype.io

export interface Activites {
    _embedded: Embedded;
    _links:    ActivitesLinks;
    page:      Page;
}

export interface Embedded {
    activites: Activite[];
}

export interface Activite {
    name:        string;
    description: null;
    realisateur: null;
    duree:       number;
    _links:      ActiviteLinks;
}

export interface ActiviteLinks {
    self:      Profile;
    activite:  Profile;
    categorie: Profile;
    seances:   Profile;
}

export interface Profile {
    href: string;
}

export interface ActivitesLinks {
    self:    Profile;
    profile: Profile;
}

export interface Page {
    size:          number;
    totalElements: number;
    totalPages:    number;
    number:        number;
}
