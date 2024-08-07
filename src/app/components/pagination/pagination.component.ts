import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class PaginationComponent implements OnChanges {
  @Input() page: number = 1;
  @Input() per_page: number = 6;
  @Input() total: number = 0;
  @Input() total_pages: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['total'] || changes['per_page'] || changes['page'] || changes['total_pages']) {
      this.pages = Array.from({ length: this.total_pages }, (_, i) => i + 1);
    }
  }

  changePage(page: number): void {
    if (page < 1 || page > this.total_pages) return;
    this.pageChange.emit(page);
  }
}
