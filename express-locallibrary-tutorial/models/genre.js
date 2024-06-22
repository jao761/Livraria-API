import { Schema as _Schema, model } from 'mongoose'

const Schema = _Schema

const GenreSchema = new Schema ({
    name: {type: String , required: true, minLength: 3, maxLength: 100 },

})

GenreSchema.virtual("url").get(function() {
    return `/catalog/genre/${this._id}`
})

export default model("Genre", GenreSchema)