import getConnection from "../database/database.js";
import Gallery from "../models/gallery.js";
import {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  getFileURL,
} from "../config/s3.js";

const postPicture = async (req, res) => {
  const { name, size } = req.files.file;
  const category = req.category;

  const picture = new Gallery(name, size, category);
  const connection = await getConnection();
  const dbResult = await connection.query("INSERT INTO gallery SET ?", picture);
  const s3Result = await uploadFile(req.files.file);

  res.json({
    "Database Response": dbResult,
    "Bucket Response": s3Result,
  });
};

const getGallery = async (req, res) => {
  const result = await getFiles();
  res.json(result.Contents);
};

const getGalleryByCategory = async (req, res) => {
  const category = req.category;
  const connection = await getConnection();
  const result = await connection.query(
    "SELECT name FROM gallery WHERE category =?",
    category
  );

  const galleryUrls = await Promise.all(
    result.map(async (gallery) => {
      const url = await getFileURL(gallery.name);
      return { url };
    })
  );

  res.json(galleryUrls);
};

const findGallery = async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({
    url: result,
  });
};

const downloadGallery = async (req, res) => {
  await downloadFile(req.params.fileName);
  res.json({
    message: "File Downloaded",
  });
};

export const methods = {
  postPicture,
  getGallery,
  getGalleryByCategory,
  findGallery,
  downloadGallery,
};
