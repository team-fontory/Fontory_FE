import {
  type ApiErrorData,
  BadRequestError,
  NetworkError,
  NotFoundError,
  ServerError,
} from '@/shared/apis/api.error'

/* 폰트 이름 검증 에러 */
export class FontNameValidationError extends BadRequestError {
  constructor(message = '폰트 이름이 올바르지 않습니다.', data?: ApiErrorData) {
    super(message, data)
    this.name = 'FONT_NAME_VALIDATION_ERROR'
    Object.setPrototypeOf(this, FontNameValidationError.prototype)
  }
}

/* 폰트를 찾을 수 없음 에러 */
export class FontNotFoundError extends NotFoundError {
  constructor(
    message = '요청한 폰트를 찾을 수 없습니다.',
    data?: ApiErrorData,
  ) {
    super(message, data)
    this.name = 'FONT_NOT_FOUND_ERROR'
    Object.setPrototypeOf(this, FontNotFoundError.prototype)
  }
}

/* 폰트 목록 로드 실패 에러 */
export class FontListLoadError extends ServerError {
  constructor(
    message = '폰트 목록을 불러오는데 실패했습니다',
    data?: ApiErrorData,
  ) {
    super(message, data)
    this.name = 'FONT_LIST_LOAD_ERROR'
    Object.setPrototypeOf(this, FontListLoadError.prototype)
  }
}

/* 폰트 파일 업로드 에러 */
export class FontUploadError extends ServerError {
  constructor(
    message = '폰트 파일 업로드에 실패했습니다.',
    data?: ApiErrorData,
  ) {
    super(message, data)
    this.name = 'FONT_UPLOAD_ERROR'
    Object.setPrototypeOf(this, FontUploadError.prototype)
  }
}

/* 폰트 생성 실패 에러 */
export class FontCreationError extends ServerError {
  constructor(message = '폰트 생성에 실패했습니다.', data?: ApiErrorData) {
    super(message, data)
    this.name = 'FONT_CREATION_ERROR'
    Object.setPrototypeOf(this, FontCreationError.prototype)
  }
}

/* 폰트 다운로드 에러 */
export class FontDownloadError extends NetworkError {
  constructor(message = '폰트 다운로드에 실패했습니다.', data?: ApiErrorData) {
    super(message, data)
    this.name = 'FONT_DOWNLOAD_ERROR'
    Object.setPrototypeOf(this, FontDownloadError.prototype)
  }
}

export const isFontNameValidationError = (error: unknown) =>
  error instanceof FontNameValidationError
export const isFontNotFoundError = (error: unknown) =>
  error instanceof FontNotFoundError
export const isFontListLoadError = (error: unknown) =>
  error instanceof FontListLoadError
export const isFontUploadError = (error: unknown) =>
  error instanceof FontUploadError
export const isFontCreationError = (error: unknown) =>
  error instanceof FontCreationError
export const isFontDownloadError = (error: unknown) =>
  error instanceof FontDownloadError
