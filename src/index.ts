import app from "./controller/app"
import { collectionRouter } from "./routes/CollectionRouter"
import { imageRouter } from "./routes/ImageRoutes"
import { userRouter } from "./routes/UserRouter"

app.use("/user", userRouter)
app.use("/image", imageRouter)
app.use("/collection", collectionRouter)