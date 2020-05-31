import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Post } from 'src/app/models';

import { BlogService, EditorService } from '../../services';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    post: Post;
    postForm: FormGroup;

    topics = [];

    constructor(
        private blogService: BlogService,
        private editorService: EditorService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.post = this.editorService.getPost();
        if(this.post) {
            this.postForm = this.formBuilder.group({
                title: this.formBuilder.control(this.post.title, [Validators.requiredTrue]),
                subtitle: this.formBuilder.control(this.post.subtitle, [Validators.requiredTrue]),
                topics: new FormArray([]),
                author: this.formBuilder.control(this.post.author, [Validators.requiredTrue]),
                description: this.formBuilder.control(this.post.description, [Validators.requiredTrue]),
                content: this.formBuilder.control(this.post.content, [Validators.requiredTrue]),
                imageURL: this.formBuilder.control(this.post.imageURL, [Validators.requiredTrue])
            });
        } else {
            this.postForm = this.formBuilder.group({
                title: this.formBuilder.control('', [Validators.requiredTrue]),
                subtitle: this.formBuilder.control('', [Validators.requiredTrue]),
                topics: new FormArray([]),
                author: this.formBuilder.control('', [Validators.requiredTrue]),
                description: this.formBuilder.control('', [Validators.requiredTrue]),
                content: this.formBuilder.control('', [Validators.requiredTrue]),
                imageURL: this.formBuilder.control('', [Validators.requiredTrue])
            });
        }

        this.blogService.getTopics().subscribe(topics => {
            this.topics = topics.map(t => t.name);

            this.topics.forEach((topic, idx) => {
                const control = new FormControl();
                (this.postForm.controls.topics as FormArray).push(control);
            });
        });
    }

    onEditorSubmit() {
        console.log('TODO: Submit the post.');
    }
}
