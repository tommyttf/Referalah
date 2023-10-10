import React from "react"

import CardSkeleton from "@/components/customized-ui/skeletons /card"

const CardSkeletonList = () => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <CardSkeleton />
      <CardSkeleton /> <CardSkeleton /> <CardSkeleton /> <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export default CardSkeletonList
