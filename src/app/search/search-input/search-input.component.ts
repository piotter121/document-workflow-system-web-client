import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  searchInput: FormControl;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.searchInput = new FormControl();
  }

  search() {
    const searchPhrase: string = this.searchInput.value;
    if (searchPhrase) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['./search'], {
        relativeTo: this.route,
        queryParams: {
          'phrase': searchPhrase
        }
      });
    }
  }

}
