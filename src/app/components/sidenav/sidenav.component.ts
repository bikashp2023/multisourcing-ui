import {
  Component,
  HostListener,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavComponent {
  showSideNav!: Observable<boolean>;

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: string = 'left';

  constructor(private navService: NavigationService) {}

  ngOnInit(): void {
    console.log('Side nav comp');
    this.showSideNav = this.navService.getShowNav();
  }

  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.onSidebarClose();
  }

  getSideNavBarStyle(showNav: boolean | null) {
    console.log('showNav', showNav);
    let navBarStyle: any = {};

    navBarStyle.transition =
      this.direction +
      ' ' +
      this.duration +
      's, visibility ' +
      this.duration +
      's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (showNav ? 0 : this.navWidth * -1) + 'px';

    return navBarStyle;
  }
}
