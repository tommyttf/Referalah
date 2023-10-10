import { useMemo } from "react"

import useGetProvinceList from "@/hooks/api/location/get-province-list"

const useProvinceOptions = (countryUuid?: string) => {
  const { data } = useGetProvinceList()

  return useMemo(() => {
    return Array.isArray(data)
      ? data
          .filter((province) => province.country_uuid === countryUuid)
          .map((province) => {
            return {
              value: province.uuid,
              title: `${province.english_name} | ${province.cantonese_name}`,
            }
          })
      : []
  }, [countryUuid, data])
}

export default useProvinceOptions
