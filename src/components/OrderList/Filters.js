import React, { useEffect, useState } from "react";
import { FilterItem } from "../FilterItem";
import FilterSearch from "../FilterSearch";
import { GetAuthData, getRetailerBrands } from "../../lib/store";

const Filters = ({ value, onChange, resetFilter }) => {
  const [manufacturerData,setManufacturerData ] = useState([]);
  useEffect(()=>{
    GetAuthData().then((user)=>{
      let rawData={accountId:user.data.accountId,key:user.data.x_access_token}
      getRetailerBrands({rawData}).then((resManu)=>{
        setManufacturerData(resManu);
      }).catch((err)=>{
        console.log({err});
      })
    }).catch((error)=>{
      console.log({error});
    })
  },[])
  const handleMonthFilter = (v) => onChange("month", v);
  const handleManufacturerFilter = (v) => onChange("manufacturer", v);
  const handleSearchFilter = (v) => onChange("search", v);

  return (
    <>
      <FilterItem
        label="Months"
        name="Months"
        value={value.month}
        options={[
          {
            label: "Last 6 Months",
            value: "last-6-months",
          },
          {
            label: "Current Year",
            value: `${new Date().getFullYear()}`,
          },
          {
            label: `${new Date().getFullYear() - 1}`,
            value: `${new Date().getFullYear() - 1}`,
          },
        ]}
        onChange={handleMonthFilter}
      />
      <FilterItem
        label="MANUFACTURER"
        name="MANUFACTURER"
        value={value.manufacturer}
        options={
          Array.isArray(manufacturerData)
            ? manufacturerData?.map((manufacturer) => ({
                label: manufacturer.Name,
                value: manufacturer.Id,
              }))
            : []
        }
        onChange={handleManufacturerFilter}
      />
      {/* <FilterSearch
        onChange={(e) => handleSearchFilter(e.target.value)}
        value={value.search}
        placeholder="Search By Account"
        minWidth="167px"
      /> */}
      <button
        className="border px-2.5 py-1 leading-tight"
        onClick={resetFilter}
      >
        CLEAR ALL
      </button>
    </>
  );
};

export default Filters;
