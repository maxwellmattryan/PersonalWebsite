const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = Schema({
    _id:            { type: Schema.Types.ObjectId                   },
    title:          { type: String, required: true, unique: true    },
    subtitle:       { type: String, required: true                  },
    description:    { type: String, required: true                  },
    imageURLs:      [
                        { url: { type: String, required: true } }
                    ],    
    created:        { type: Date                                    },
    updated:        { type: Date, default: Date.now                 }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;