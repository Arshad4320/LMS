import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

export const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.pdf' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only PDFs and images allowed'))
    }
    cb(null, true)
  },
})
