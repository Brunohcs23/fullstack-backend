import app from "./controller/app"
import { imageRouter } from "./routes/ImageRoutes"
import { userRouter } from "./routes/UserRouter"

app.use("/user", userRouter)
app.use("/image", imageRouter)