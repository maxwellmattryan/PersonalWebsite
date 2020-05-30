const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = Schema({
    _id:            { type: Schema.Types.ObjectId                   },
    uri:            { type: String, required: true, unique: true    },
    title:          { type: String, required: true                  },
    subtitle:       { type: String, required: true                  },
    topics:         [{ type: Schema.Types.ObjectId, ref: 'Topic'    }],
    author:         { type: String, required: true                  },
    description:    { type: String, required: true                  },
    content:        { type: String, required: true                  },
    imageURL:       { type: String, required: true                  }, 
    created:        { type: Date                                    },
    updated:        { type: Date, default: Date.now                 }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;