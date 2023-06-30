import multer from 'multer';

export const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024
  }
})

export default Multer;
