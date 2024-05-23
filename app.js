import express from 'express';
import fileUpload from 'express-fileupload';
import galleryRoutes from './routes/gallery.route.js'

const app = express();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));

app.use(express.static('images'));

app.set('port', 4000);

app.use(express.json());

app.use('/api/v1/gallery', galleryRoutes);

export default app;