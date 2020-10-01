import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@ui/environments/environment';
import { ApiService } from '@ui/core/http';
import {
    PortfolioProfile,
    PortfolioProfileStatus,
    PortfolioProfileTechnology,
    PortfolioProject
} from '@ui/modules/portfolio/models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioApiService extends ApiService {
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

    createProject(project: PortfolioProject): Observable<PortfolioProject> {
        const headers = this.contentTypeHeader();

        return this.http.post<PortfolioProject>(
            `${environment.API_URL}/portfolio/projects`,
            project,
            { headers }
        );
    }

    deleteProject(id: number): Observable<any> {
        return this.http.delete<any>(`${environment.API_URL}/portfolio/projects/${id}`);
    }

    getProject(id: number): Observable<PortfolioProject> {
        return this.http.get<PortfolioProject>(`${environment.API_URL}/portfolio/projects/${id}`);
    }

    getProjects(): Observable<PortfolioProject[]> {
        return this.http.get<PortfolioProject[]>(`${environment.API_URL}/portfolio/projects`);
    }

    updateProject(project: PortfolioProject): Observable<PortfolioProject> {
        const headers = this.contentTypeHeader();

        return this.http.put<PortfolioProject>(
            `${environment.API_URL}/portfolio/projects/${project.id}`,
            project,
            { headers }
        );
    }
}
