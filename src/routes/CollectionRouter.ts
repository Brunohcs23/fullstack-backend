import express from "express"
import collectionController from "../controller/CollectionController"

export const collectionRouter = express.Router()

collectionRouter.put("/create", collectionController.createCollection)