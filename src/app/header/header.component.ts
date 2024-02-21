import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { share } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.router.navigateByUrl("/presentation#aboutme");
  }
  activeFragment = this.route.fragment.pipe(share());

}
