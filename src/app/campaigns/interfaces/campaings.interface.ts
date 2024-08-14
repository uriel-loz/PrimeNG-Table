import { FilterMetadata } from "primeng/api";

export interface Pagination {
    current_page:   number;
    data:           Campaigns[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Campaigns {
    id:                      number;
    campaign_name:           string;
    version:                 string;
    temporality:             string;
    start_date:              Date;
    end_date:                Date;
    url_commercial_proposal: null | string;
    url_contract:            null | string;
    rebate:                  Rebate;
    payment_type:            PaymentType;
    client_id:               number;
    created_at:              Date;
    updated_at:              Date;
    deleted_at:              null;
    manager_cdmx_id:         number;
    manager_internal_id:     number;
    manager_design_id:       null;
    partial_temporality:     null;
    form_id:                 null;
    notification_install:    number;
    periodically:            Periodically;
    operation_date:          null;
    type:                    CampaignAim;
    campaign_aim:            CampaignAim;
    admin_manager_id:        null;
}

export enum CampaignAim {
    Buses = "buses",
}

export enum PaymentType {
    The100Anticipo = "100% Anticipo",
    The100Diferido = "100% Diferido",
    The50AnticipoY50Diferido = "50% Anticipo y 50% Diferido",
}

export enum Periodically {
    Si = "SI",
}

export enum Rebate {
    The0 = "0%",
    The15 = "15%",
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}

export interface LazyLoadFilters {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
}
