import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movieId: any;
  movieDetail: any;
  title: any;
  releaseDate: any;
  overview: any;
  voteAverage: any;
  rated: any;
  poster: any;
  tagline: any;
  genres: any;
  reviews: any[] = [];
  constructor(private movieService: MovieService, private router: ActivatedRoute) {
    this.movieId = this.router.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getDetail();
    this.getReviews();
    window.scroll(0, 0);
  }
  getDetail() {
    this.movieService.getMovieDetails(this.movieId).subscribe((d: any) => {
      console.log(d, 'detail')
      this.title = d.title;
      this.releaseDate = d.release_date;
      this.overview = d.overview
      this.voteAverage = d.vote_average
      this.rated = d.adult
      this.poster = d.poster_path
      this.tagline = d.tagline
      this.genres = d.genres
    })
  }

  getReviews() {
    this.movieService.getReviews(this.movieId).subscribe((r: any) => {
      this.reviews = r.results
      console.log(this.reviews)
    })
  }
}
