import type { FontDetail, FontListResponse, FontListItem, FontViewData } from '../types/font.type'

export class FontViewModel {
  private readonly _data: FontDetail

  constructor(fontData: FontListItem) {
    this._data = {
      fontId: fontData.id,
      fontName: fontData.name,
      writerName: fontData.writerName,
      example: fontData.example,
      isBookmarked: fontData.bookmarked,
      fontAddr: fontData.woff,
      downloadCount: fontData.downloadCount,
      bookmarkCount: fontData.bookmarkCount,
    }
  }

  get fontId(): number {
    return this._data.fontId
  }

  get fontName(): string {
    return this._data.fontName
  }

  get writerName(): string {
    return this._data.writerName
  }

  get example(): string {
    return this._data.example
  }

  get isBookmarked(): boolean {
    return this._data.isBookmarked
  }

  get fontAddr(): string {
    return this._data.fontAddr
  }

  get downloadCount(): number {
    return this._data.downloadCount
  }

  get bookmarkCount(): number {
    return this._data.bookmarkCount
  }

  /** 접근성을 위한 폰트 설명 */
  get accessibilityLabel(): string {
    return `${this.fontName} by ${this.writerName}, ${this.downloadCount} 다운로드, ${this.bookmarkCount} 북마크`
  }

  /** 불변 데이터 반환 */
  toData(): Readonly<FontDetail> {
    return Object.freeze({ ...this._data })
  }

  /** 북마크 상태 토글된 새 인스턴스 생성 */
  withToggledBookmark(): FontViewModel {
    const newData = { ...this._data, isBookmarked: !this._data.isBookmarked }
    const newInstance = Object.create(FontViewModel.prototype)
    newInstance._data = newData
    return newInstance
  }

  /** 다운로드 수가 증가된 새 인스턴스 생성 */
  withIncrementedDownload(): FontViewModel {
    const newData = { ...this._data, downloadCount: this._data.downloadCount + 1 }
    const newInstance = Object.create(FontViewModel.prototype)
    newInstance._data = newData
    return newInstance
  }
}

/** 폰트 목록과 페이지네이션 정보를 관리 */
export class FontListViewModel {
  private readonly _fontList: FontViewModel[]
  private readonly _currentPage: number
  private readonly _totalPages: number

  constructor(response: FontListResponse) {
    this._fontList = response.content.map((item) => new FontViewModel(item))
    this._currentPage = response.number + 1
    this._totalPages = response.totalPages
  }

  get fontList(): readonly FontViewModel[] {
    return Object.freeze([...this._fontList])
  }

  get currentPage(): number {
    return this._currentPage
  }

  get totalPages(): number {
    return this._totalPages
  }

  get isEmpty(): boolean {
    return this._fontList.length === 0
  }

  get isFirstPage(): boolean {
    return this._currentPage === 1
  }

  get isLastPage(): boolean {
    return this._currentPage === this._totalPages
  }

  get nextPage(): number | null {
    return this.isLastPage ? null : this._currentPage + 1
  }

  get prevPage(): number | null {
    return this.isFirstPage ? null : this._currentPage - 1
  }

  /** 페이지 정보 텍스트 */
  get pageInfo(): string {
    if (this._totalPages === 0) return '결과 없음'
    return `${this._currentPage} / ${this._totalPages} 페이지`
  }

  /** UI용 뷰 데이터 변환 */
  toViewData(): FontViewData {
    return {
      fontList: this._fontList.map((font) => font.toData()),
      currentPage: this._currentPage,
      totalPages: this._totalPages,
    }
  }
}
