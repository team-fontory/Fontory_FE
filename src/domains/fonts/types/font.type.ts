export type FilterType = 'all' | 'most-downloaded' | 'most-bookmarked'

export type FontDetails = {
  fontId: number
  fontName: string
  writerName: string
  example: string
  isBookmarked: boolean
  fontAddr: string
  downloadCount: number
  bookmarkCount: number
}
