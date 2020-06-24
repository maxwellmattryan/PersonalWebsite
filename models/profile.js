const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const profileSchema = Schema({
    _id:            { type: Schema.Types.ObjectId                   },
    uri:            { type: String, required: true, unique: true    },
    active:         { type: Boolean, required: true                 },
    name:           { type: String, required: true                  },
    landing:        {
        description:{ type: String, required: true                 },
        tagline:    { type: String, required: true                  }
    },
    about: {
        description: [{ type: String, required: true                }],
        technologies: [{ type: String, required: true               }]
    },
    projects:       [{ type: Schema.Types.ObjectId, ref: 'Project'  }],
    posts:          [{ type: Schema.Types.ObjectId, ref: 'Post'     }]
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;