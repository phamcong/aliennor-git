import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EcocasesService } from '../../services/ecocases.service';
import { HelpersService } from '../../../shared/services/helpers.service';
import { UserService } from '../../../auth/services/user.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-ecocase-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {
  @Input() ecocaseId: string;
  @Input() width: number;
  currentUser: string;

  commentsData: {
    comments: any[],
    currentPage: number,
    totalPages: number,
    itemsPerPage: number
  };
  commentForm: FormGroup;
  postingComment = false;
  commentsPageNr$ = new BehaviorSubject<number>(1);

  constructor(
    private es: EcocasesService,
    private fb: FormBuilder,
    private helpers: HelpersService,
    public us: UserService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.currentUser = this.us.getOrSetUserName();
    this.commentsPageNr$
      .pipe(
        mergeMap(page => this.es.getComments(this.ecocaseId, page)),
        map(res => res.data),
        map(comments => {
        return {
          comments: comments.comments.reverse(),
          currentPage: comments.current_page,
          totalPages: comments.total_pages,
          itemsPerPage: comments.items_per_page
        };
      }))
      .subscribe(commentsObj => {
        this.commentsData = commentsObj;
      });
  }

  changePage(ev: number): void {
    this.commentsPageNr$.next(ev);
  }

  postComent(): void {
    if (!this.commentForm.valid) {
      return;
    }

    const commentBody = this.commentForm.value['comment'];
    this.postingComment = true;
    this.es.postComment(this.ecocaseId, commentBody)
      .subscribe(res => {
        this.postingComment = false;
        this.commentForm.reset();

        // reload comments from page 1
        this.commentsPageNr$.next(1);
      });
  }

  removeComment(id: string): void {
    this.es.removeComment(id)
      .subscribe(
        res => {
          // reload current comments page
          this.commentsPageNr$.next(this.commentsData.currentPage);
        },
        err => this.helpers.showMessage('The comment could not be removed')
      );
  }
}
