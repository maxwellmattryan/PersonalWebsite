import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@app/core/http';
import { environment } from '@app/environments/environment';
import { PortfolioProfile, PortfolioProfileStatus, PortfolioProfileTechnology } from '@app/modules/portfolio/models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProfileApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
    }

    activateProfile(profileId: number): Observable<PortfolioProfile> {
        const headers = this.contentTypeHeader();

        return this.http.put<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles/${profileId}/activate`,
            {},
            { headers }
        );
    }

    createProfile(profile: PortfolioProfile): Observable<PortfolioProfile> {
        const headers = this.contentTypeHeader();

        return this.http.post<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles`,
            profile,
            { headers }
        );
    }

    deleteProfile(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/portfolio/profiles/${id}`)
    }

    getProfiles(): Observable<PortfolioProfile[]> {
        return this.http.get<PortfolioProfile[]>(`${environment.API_URL}/portfolio/profiles`);
    }

    getProfileStatuses(): Observable<PortfolioProfileStatus[]> {
        return this.http.get<PortfolioProfileStatus[]>(`${environment.API_URL}/portfolio/profiles/statuses`);
    }

    getProfileTechnologies(id: number): Observable<PortfolioProfileTechnology[]> {
        return this.http.get<PortfolioProfileTechnology[]>(`${environment.API_URL}/portfolio/profiles/${id}/technologies`);
    }

    updateProfile(profile: PortfolioProfile): Observable<PortfolioProfile> {
        const headers = this.contentTypeHeader();

        return this.http.put<PortfolioProfile>(
            `${environment.API_URL}/portfolio/profiles/${profile.id}`,
            profile,
            { headers }
        )
    }
}