import { Component, OnInit } from '@angular/core';
import {Films} from '../../models/Films';
import {FilmService} from '../../services/film.service';
import {nativeInsertBefore} from "@angular/core/src/render3/node_manipulation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  films: Films [] = [];
  partFilms: Films[] = [];
  public page = 1;
  public collectionSize: number;
  public maxSize = 2;
  count = 0;
  images = ['assets\\slide1.jpg', 'assets\\slide2.jpg', 'assets\\slide3.jpg', 'assets\\slide4.jpg', 'assets\\slide5.jpg'];
  image = this.images[this.count];

  constructor(private filmsS: FilmService) {
  }

  next() {
    this.count++;
    if (this.count >= this.images.length) {
      this.count = 0;
    }
    this.image = this.images[this.count];
  }

  ngOnInit(): void {
    setInterval(() => this.next(), 5000);
    this.filmsS.getFilms().subscribe((res) => {
      this.films = res;
      this.collectionSize = this.films.length;
      this.films = this.films.reverse();
      this.partFilms = this.films.slice(0, this.maxSize).reverse();
    });

  }
  onPageChange(p: number) {
    const url = location.href;
    location.href = '#up';
    history.replaceState(null, null, url);
    if ( p === 1) {
      this.partFilms = this.films.slice(0, this.maxSize);
    } else {
      const first = Number(this.maxSize) * Number(p) - Number(this.maxSize);
      const last = Number(this.maxSize) * Number(p);
      this.partFilms = this.films.slice(first, last );
    }

  }

}
