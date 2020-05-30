const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const topicSchema = Schema({
    _id:            { type: Schema.Types.ObjectId                   },
    uri:            { type: String, required: true, unique: true    },
    name:           { type: String, required: true                  },
    description:    { type: String, required: true                  },
    imageURL:       { type: String, required: true                  }
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;