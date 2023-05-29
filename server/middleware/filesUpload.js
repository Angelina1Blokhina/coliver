const multer=require('multer')

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
      cb(null, 'static');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
  });
  
module.exports = multer({ storage: storage });