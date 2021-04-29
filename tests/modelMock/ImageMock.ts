import { Image } from "../../src/model/Media";

export const imageMock = new Image(
    "imageId",
    "imageSubtitle",
    "imageAuthor",
    new Date(),
    "imageFileString",
    ["imageTag1", "imageTag2", "imageTag3"],
    "imageCollection"
)