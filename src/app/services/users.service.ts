import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,) { }

  updateMetadata(metadata: Record<string, any>) {
    return this.httpClient.put<any>(environment.backend_api.updateUserMetadata, {metadata});
  }
}
