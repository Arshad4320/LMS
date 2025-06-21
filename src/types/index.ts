// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IUploadFile {
  allowedFileTypes?: string[]
  maxFileSize?: number
  uploadPath?: string
  errorMessage?: string
}
