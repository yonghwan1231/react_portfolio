const priceRangeList = [
  { type: "priceRangeAll", minPrice: "0", maxPrice: Infinity, desc: "전체" },
  { type: "priceRange1", minPrice: "0", maxPrice: "50000", desc: "~50,000" },
  { type: "priceRange2", minPrice: 50001, maxPrice: 100000, desc: "50,001~100,000" },
  { type: "priceRange3", minPrice: 100001, maxPrice: Infinity, desc: "100,001~" },
];

const sortTypeList = [
  { type: 'like', desc: '인기순' },
  { type: 'name', desc: '이름순' },
  { type: 'ascending', desc: '높은가격순' },
  { type: 'descending', desc: '낮은가격순' },
]

export {
  priceRangeList,
  sortTypeList
}