import { Component, OnInit } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { currentState } from '../../modules/root-store/router-store/router.selector';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbItems: any[] = [];
  private itemUrl: string = '';
  constructor(
    private store: Store<RouterReducerState>,
  ) { }

  ngOnInit(): void {
    this.store.select(currentState).subscribe(state => {
      this.breadcrumbItems = [];
      this.itemUrl = '';
      this.findChild(state.root);
    })
  }

  private findChild(root: any) {
    if (Array.isArray(root.children ) && root.children.length > 0) {
      const child = root.children[0];
      if (child.routeConfig && child.routeConfig.path) {
        this.itemUrl = this.itemUrl + '/' + child.routeConfig.path;
        this.breadcrumbItems.push({
          path: this.itemUrl,
          ...child.data
        })
      }
      if (child.children.length > 0) this.findChild(child);
    }
  }

}
