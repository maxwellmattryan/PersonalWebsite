Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.

<br>

```
router.put('/posts/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const postData = {
        _id:            req.body._id || new mongoose.Types.ObjectId(),
        uri:            req.body.uri,
        title:          req.body.title, 
        subtitle:       req.body.subtitle,
        topics:         req.body.topics,
        author:         req.body.author,
        description:    req.body.description,
        content:        req.body.content,
        imageURL:       req.body.imageURL,
        updated:        Date.now()
    };

    Profile.updateMany({}, {$addToSet: {posts: postData._id}}, (err, result) => {
        if(err) throw err;
    });

    Topic.updateMany({}, {$pull: {posts: postData._id}}, (err, result) => {
        if(err) throw err;
    });
    Topic.updateMany({_id: {$in: postData.topics}}, {$push: {posts: postData._id}}, (err, result) => {
        if(err) throw err;
    });

    Post.updateOne({_id: postData._id}, postData, (err, result) => {
        if(err) throw err;

        if(result.nModified === 0) {
            const newPost = new Post({
                ...postData,
                created: Date.now()
            });

            newPost.save((err, post) => {
                if(err) {
                    res.sendStatus(400);
                } else {    
                    res.sendStatus(201);
                }
            });
        } else {
            res.sendStatus(200);
        }
    });
});
```

<br>

Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.