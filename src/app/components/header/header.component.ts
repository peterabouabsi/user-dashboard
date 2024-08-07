import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs';

// Angular Materials
import { MatInputModule } from '@angular/material/input';

// Ngrx
import { Store } from '@ngrx/store';
// Actions
import { UserActions } from 'src/app/shared/ngrx/actions/user.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        FormsModule,
        ReactiveFormsModule,

        // Angular Materials
        MatInputModule,
    ]
})

export class HeaderComponent implements OnInit {

    nav_styles_config = { showIcon: true, showSearchBar: true }

    search = new FormControl('', []);

    constructor(private store: Store,
                private router: Router) { }
    ngOnInit() { 
        this.router.events.subscribe(() => {
            const currentUrl = this.router.url;
            const regex = /^\/users\/[^/]+$/;
            if (regex.test(currentUrl)) this.nav_styles_config = { ...this.nav_styles_config, showSearchBar: false }
            else this.nav_styles_config = { ...this.nav_styles_config, showSearchBar: true }
        })

        this.search.valueChanges
        .pipe(
            debounceTime(1000),
            distinctUntilChanged()
        )
        .subscribe(value => {            
            this.store.dispatch(UserActions.searchUser({ keyword: value?? '' }))
        })
    }

}