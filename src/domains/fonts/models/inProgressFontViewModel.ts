import type { InProgressFontResponse } from '../types/font.type'

/** 제작 중인 폰트 뷰모델 */
export class InProgressFontViewModel {
  private readonly _data: InProgressFontResponse

  constructor(fontData: InProgressFontResponse) {
    this._data = fontData
  }

  get id(): number {
    return this._data.id
  }

  get name(): string {
    return this._data.name
  }

  get createdAt(): string {
    return this._data.createdAt
  }

  get status(): string {
    return this._data.status
  }

  /** 생성일을 포맷팅된 문자열로 반환 */
  get formattedCreatedAt(): string {
    const date = new Date(this._data.createdAt)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  /** 상태를 한글로 반환 */
  get statusText(): string {
    switch (this._data.status) {
      case 'pending':
        return '대기 중'
      case 'processing':
        return '제작 중'
      case 'reviewing':
        return '검토 중'
      default:
        return this._data.status
    }
  }
}

/** 제작 중인 폰트 목록 뷰모델 */
export class InProgressFontListViewModel {
  private readonly _fontList: InProgressFontViewModel[]

  constructor(response: InProgressFontResponse[]) {
    this._fontList = response.map((item) => new InProgressFontViewModel(item))
  }

  get fontList(): readonly InProgressFontViewModel[] {
    return Object.freeze([...this._fontList])
  }

  get isEmpty(): boolean {
    return this._fontList.length === 0
  }

  get count(): number {
    return this._fontList.length
  }
}
