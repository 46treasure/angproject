import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Films} from '../models/Films';
import {catchError} from 'rxjs/operators';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:8080/';
  constructor(private http: HttpClient, private router: Router) {
  }
  headersOption = new HttpHeaders()
    .set('Authorization', localStorage.getItem('_token'))
    .set('CurrentUser', localStorage.getItem('_currentUser'));

  static handleError(err) {
    if (err instanceof HttpErrorResponse) {
      console.log('403');
    }
    return throwError(err);
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'getAllUsers');
  }
//asd
  findSearchingUser(name: string): Observable<User[]> {
    return this.http.post<User[]>(this.url + 'findSearchingUser', name);
  }

  Login(user: string) {
    return this.http.post(this.url + 'login', user,
      {observe: 'response'}).pipe(catchError(UserService.handleError));
  }

  addUserFilm(idFilm: number): Observable<Films[]> {
    return this.http.post<Films[]>
    (this.url + 'adduserfilm', idFilm,
      {headers: this.headersOption});
  }

  getUserFilms(id: number): Observable<Films[]> {
    return this.http.post<Films[]>
    (this.url + 'userpage-userfilms', id,
      {headers: this.headersOption});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.url + 'get', {headers: this.headersOption});
  }

  getUserById(id: number): Observable<User> {
    return this.http.post<User>(this.url + 'getUserById', id);
  }

  compareUser(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'currentPage', id);
  }

  addSubscribes(id: number) {
    return this.http.post(this.url + 'subscribe', id);
  }

  unSubscribes(id: number) {
    return this.http.post(this.url + 'unSubscribe', id);
  }

  existIntFriends(id: number): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'exist', id);
  }

  getSubscribes(id: number): Observable<User[]> {
    return this.http.post<User[]>(this.url + 'getSubscribers', id);
  }

  setAvatar(ava: FormData): Observable<User> {
    return this.http.post<User>(this.url + 'setAvatar', ava);
  }

  getFolowing(id: number): Observable<User[]> {
    return this.http.post<User[]>(this.url + 'getFolowing', id);
  }

  finishReg() {
    return this.http.get(this.url + 'finishReg/' + this.router.url.substr(11));
  }

  setStatus(status: string) {
    return this.http.post(this.url + 'setStatus', status);
  }

}
