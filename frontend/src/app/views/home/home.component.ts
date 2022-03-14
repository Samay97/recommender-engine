import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category, Product } from '../../core/dto';
import { ProductService } from '../../core/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public categories: Observable<Category[]>;

    constructor(private categoryService: CategoryService, private router: Router) {
        this.categories = this.categoryService.getAllCategories();
    }

    ngOnInit(): void {}

    public onCategoryClicked(category: Category) {
        this.router.navigate(['/browse', category._id]);
    }
}
