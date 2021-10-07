import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  endpoint = 'https://api.themoviedb.org/3/';
  key = 'afed4d6b477d8f01d1f7a6a51fe4ac4f'
  constructor(private http: HttpClient) { }

  getMovieList() {
    let params = new HttpParams();
    params = params.append('api_key', this.key);
    return this.http.get(this.endpoint + 'discover' + '/' + 'movie', { params: params })
  }
  getMovieDetails(id: number) {
    let params = new HttpParams();
    params = params.append('api_key', this.key);
    return this.http.get(this.endpoint + 'movie' + '/' + id, { params: params })
  }

  searchMovie(query: any) {
    let params = new HttpParams();
    params = params.append('api_key', this.key);
    params = params.append('query', query);
    return this.http.get(this.endpoint + 'search' + '/' + 'movie', { params: params })
  }

  getReviews(id: any) {
    let params = new HttpParams();
    params = params.append('api_key', this.key);
    params = params.append('query', id);
    return this.http.get(this.endpoint + 'movie' + '/' + id + '/' + 'reviews', { params: params })
  }
  //getImages(movieId: any): Observable<File> {
  // let params = new HttpParams();
  // params = params.append('api_key', this.key);
  //let result: Observable<any> = this.http.get(this.endpoint + 'movie' + '/' + movieId + '/' + 'images', { params: params })
  // return result

  // }
}
