import {Schema, model, models} from "mongoose";

const distanceSchema = new Schema ({
    location: String,
    destination: String,
    distance: Number
});

const Distance = models.Distance ||  model('Distance', distanceSchema);

export default Distance