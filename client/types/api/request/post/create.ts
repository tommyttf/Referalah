export interface ICreatePostRequest {
  url?: string
  countryUuid: string
  provinceUuid: string
  industryUuid: string
  cityUuid: string
  yearOfExperience: number
  createdBy: string
  type: string
  companyName: string
  jobTitle: string
  description: string
}

export interface IFilterMeta {
  companyName: any
  cityUuid: string | undefined
  countryUuid: string | undefined
  industryUuid: string | undefined
  provinceUuid: string | undefined
  sorting: string
  yoeMin: string | undefined
  yoeMax: string | undefined
}
