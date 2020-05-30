const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const topicSchema = Schema({
    _id:            { type: Schema.Types.ObjectId                   },
    uri:            { type: String, required: true, unique: true    },
    name:           { type: String, required: true, unique: true    },
    description:    { type: String, required: true                  },
    imageUrl:       { type: String, required: true                  }
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;