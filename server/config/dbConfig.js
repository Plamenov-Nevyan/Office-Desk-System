import mongoose from "mongoose"
import env from "./envConfig"

export default () => mongoose.connect(env.MONGO_URI)