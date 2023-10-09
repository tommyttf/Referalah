import React from "react"

import { IReferralResponse } from "@/types/api/response/referral"
import { MessageType } from "@/types/common/message-type"
import { ReferralType } from "@/types/common/referral-type"
import useSearchReferral from "@/hooks/api/referral/search-referral"
import { Input } from "@/components/ui/input"
import BaseInfiniteScroll from "@/components/customized-ui/Infinite-scroll/base"
import ReferralCard from "@/components/customized-ui/cards/referral"
import SearchPopover from "@/components/customized-ui/pop-overs/search"
import CardSkeletonList from "@/components/customized-ui/skeletons /card-list"

interface IRefererPageTemplateProps {}
const RefererPageTemplate: React.FunctionComponent<
  IRefererPageTemplateProps
> = () => {
  const {
    result,
    handleCompanyChange,
    handleCountryChange,
    handleProvinceChange,
    handleCityChange,
    handleSortingChange,
    handleIndustryChange,
    handleYeoMinChange,
    handleYeoMaxChange,
    provinceUuid,
    cityUuid,
    countryUuid,
    industryUuid,
    yoeMax,
    yoeMin,
    sorting,
  } = useSearchReferral(ReferralType.REFERRER)

  const {
    data: refererListData,
    isLoading: isRefererListLoading,
    fetchNextPage,
    isFetching,
  } = result

  const list = refererListData
    ? (refererListData?.pages.flatMap((d) => d) as IReferralResponse[])
    : []

  return (
    <>
      <div className="flex flex-row mt-8 gap-4 w-full h-full">
        <Input onChange={handleCompanyChange} placeholder="公司名稱" />
        <SearchPopover
          provinceUuid={provinceUuid}
          countryUuid={countryUuid}
          onCityChange={handleCityChange}
          onCountryChange={handleCountryChange}
          onProvinceChange={handleProvinceChange}
          onIndustryChange={handleIndustryChange}
          onSortingChange={handleSortingChange}
          onYeoMinChange={handleYeoMinChange}
          onYeoMaxChange={handleYeoMaxChange}
          currentSorting={sorting}
          currentCityUuid={cityUuid}
          currentCountryUuid={countryUuid}
          currentIndustryUuid={industryUuid}
          currentProvinceUuid={provinceUuid}
          currentYeoMax={yoeMax}
          currentYeoMin={yoeMin}
          type={MessageType.REFERRAL}
        />
      </div>
      {!isRefererListLoading && !isFetching && list.length === 0 && (
        <div className="p-4 rounded-lg text-center mt-8 border-2">
          冇資料🥲不如成為推薦人？
        </div>
      )}

      {isRefererListLoading && <CardSkeletonList />}

      {!isRefererListLoading && list.length > 0 && (
        <BaseInfiniteScroll
          dataLength={list ? list.length : 0} //This is important field to render the next data
          next={fetchNextPage}
          hasMore={
            (refererListData &&
              refererListData.pages &&
              refererListData.pages[refererListData.pages.length - 1].length !==
                0) ??
            true
          }
        >
          <div className="grid grid-cols-1 gap-4  w-full overflow-hidden mt-8">
            {list.map((referer) => {
              return (
                <ReferralCard
                  jobTitle={referer.job_title}
                  username={referer.username}
                  photoUrl={referer.avatar_url}
                  province={referer.province.cantonese_name}
                  country={referer.country.cantonese_name}
                  city={referer.city.cantonese_name}
                  companyName={referer.company_name}
                  description={referer.description}
                  industry={referer.industry.cantonese_name}
                  socialMediaUrl={referer.social_media_url}
                  yearOfExperience={referer.year_of_experience}
                  uuid={referer.uuid}
                  key={referer.uuid}
                  messageType={MessageType.REFERRAL}
                  postUuid={referer.uuid}
                  toUuid={referer.uuid}
                  receiverType={ReferralType.REFERRER}
                />
              )
            })}
          </div>
        </BaseInfiniteScroll>
      )}
    </>
  )
}

export default RefererPageTemplate
