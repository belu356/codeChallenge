import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MovieService } from '../movie.service';
import { ThemePalette } from "@angular/material/core";
import { NgxStarsComponent } from 'ngx-stars';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(NgxStarsComponent) starsCsomponent: NgxStarsComponent;

  ratingDisplay: number;
  movies: any[] = [];
  query: any;
  searchMode: boolean;
  notFound: boolean = false;
  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
  }
  viewDetails(id: number) {
    this.router.navigate(['./movieDetails', id]);
  }
  searchMovie(text: any) {
    this.query = text;
    if (text == '' || null) {
      this.getAllMovies();
      this.notFound = false
    }
  }
  search() {
    this.movieService.searchMovie(this.query).subscribe((r: any) => {
      this.searchMode = true
      this.movies = r.results
      this.movies = this.movies.filter(r => {
        return r.vote_average <= this.ratingDisplay && r.vote_average >= 0
      })
      if (this.movies.length == 0) {
        this.notFound = true
      } else {
        this.notFound = false
      }
    })
  }

  onRatingSet(rating: number): void {
    this.ratingDisplay = rating *= 2;
  }

  getAllMovies() {
    this.movieService.getMovieList().subscribe((r: any) => {
      this.movies = r.results
      this.movies.sort((a: any, b: any) => b.popularity - a.popularity)
    })
  }
}