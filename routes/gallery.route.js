import { Router } from "express";
import { methods as galleryController } from "../controllers/gallery.controller.js";

const router = Router();

router.post("/files", galleryController.postPicture);
router.get("/files", galleryController.getGallery);
router.get("/file/:fileName", galleryController.findGallery);
router.get("/file/:category", galleryController.getGalleryByCategory);
router.get("/downloadFile/:fileName", galleryController.downloadGallery);

export default router;
