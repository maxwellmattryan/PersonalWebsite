INSERT INTO blog_author(first_name, last_name) VALUES ('Matthew', 'Maxwell');

INSERT INTO blog_post_status(status) VALUES ('DRAFT');
INSERT INTO blog_post_status(status) VALUES ('PUBLISHED');
INSERT INTO blog_post_status(status) VALUES ('ARCHIVED');

INSERT INTO blog_topic(name, description) VALUES ('Audio Development', 'Any and all things related to audio development and audio programming.');
INSERT INTO blog_topic(name, description) VALUES ('Game Development', 'Any and all things related to game development.');
INSERT INTO blog_topic(name, description) VALUES ('Digital Signal Processing', 'Any and all things related to digital signal processing.');
INSERT INTO blog_topic(name, description) VALUES ('Software Architecture', 'Any and all things related to software architecture.');
INSERT INTO blog_topic(name, description) VALUES ('Software Design', 'Any and all things related to software design.');
INSERT INTO blog_topic(name, description) VALUES ('Software Engineering', 'Any and all things related to software engineering.');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       2,
       'The Constraints of Audio Programming',
       'Restrictions of the digital audio domain',
       'Programming for audio software is such a fascinating problem domain and requires some interesting ways of thinking to write optimal code.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/rotor.png');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       2,
       'Making a Game for the 2019 Global Game Jam',
       'No sleep, only game development',
       'Making a game for a game jam is quite an intense experience, but is beyond rewarding if you''re willing to learn new skills or hone some old ones.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/operation-home.png');

INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url)
VALUES (1,
       1,
       'My First Internship Experience',
       'Navigating a new tech environment in Japanese',
       'This post is going to be about going through my first internship experience and the things I learned throughout the process.',
        '# TITLE

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```typescript
ngOnInit(): void {
    this.isAdmin = this.authService.isLoggedIn();

    this.apiService.getPost(this.router.url).subscribe(post => {
        if(post.status.status !== ''PUBLISHED'' && !this.isAdmin) {
            this.notificationService.createNotification(''Unable to view the blog post.'');
            this.router.navigate(['''']);
        }

        this.post = post;
        this.post.topics.sort(this.comparisonService.topics);

        this.isLoaded = true;
    }, (error: HttpErrorResponse) => {
        this.notificationService.createNotification(error.error.message);
    });
}
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'assets/images/projects/green-foot.png');

INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (1, 1), (1, 4);
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (2, 1), (2, 2);
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (3, 3), (3, 4);
