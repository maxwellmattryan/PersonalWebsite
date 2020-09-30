import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@app/core/http';
import { environment } from '@app/environments/environment';
import { PortfolioProject } from '@app/modules/portfolio/models';

@Injectable({
  providedIn: 'root'
})
export class PortfolioProjectApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http);
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