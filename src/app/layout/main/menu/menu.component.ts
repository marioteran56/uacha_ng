import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  tags: any;
  filterTags: String[] = [];

  constructor(private http: HttpClient, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((res) => {
      // this.tags = <any>res.tags;
      this.tags = res;
    });
  }

  changeTagState(tag: String) {
    if(this.filterTags.includes(tag)) {
      this.filterTags.splice(this.filterTags.indexOf(tag), 1);
    } else {
      this.filterTags.push(tag);
    }
  }

  getNumberPct(value: any, total: any) {
    return value / total * 100;
  }
}
