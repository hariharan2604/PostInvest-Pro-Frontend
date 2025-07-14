'use client';
import { useState, useEffect, useRef,useCallback } from "react";
import SearchInput from "@/components/ui/search-input/search-input";
import style from "./search-header.module.scss";
import Button from "@/components/ui/button/button";
import RadioButton from "@/components/ui/radiobutton/radiobutton";
import FilterIcon from "@icons/filter_icon.svg";
import { routeOptions } from "./routeOptions";
import React from "react";
import Image from "next/image";

export default function SearchHead({
  enableAdd = false,
  redirect = true,
  enableDropdown = true,
  showRouteOptions = true,
  onDataFetched,
  onSelectResponse,
  fetchOnFocus,
  allowEmptySearch
}) {
  
  const [selectedType, setSelectedType] = useState(routeOptions[0]);
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef(null);

  const handleDataFetched = useCallback((results) => {
    if (onDataFetched) onDataFetched(results);
  }, [onDataFetched]);

  const handleSelect = useCallback((_, object) => {
    if (onSelectResponse) onSelectResponse(object);
  }, [onSelectResponse]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    }

    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  return (
    <div className={style.cardSplit}>
      <div className={style.inputWithFilter}>
        <div className={style.inputWrapper}>
          <SearchInput
            placeholder={`Search ${selectedType.label}`}
            fetchUrl={selectedType.url}
            fetchOnFocus={fetchOnFocus}
            redirectUrl={selectedType.redirectUrl}
            enableDropdown={enableDropdown}
            onSelect={handleSelect}
            onDataFetched={handleDataFetched}
            redirect={redirect}
            type={selectedType.key}
            allowEmptySearch={allowEmptySearch}
          />

          {showRouteOptions && (
            <Image
              alt="filter"
              src={FilterIcon}
              className={style.filterIconBtn}
              onClick={() => setShowFilter((prev) => !prev)}
            />
          )}
        </div>

        {showFilter && (
          <div className={style.radioDropdown} ref={filterRef}>
            {routeOptions.map((option) => (
              <RadioButton
                key={option.key}
                variant="radiobtns"
                id={option.key}
                name="selectedType"
                labeltext={option.label}
                value={option.key}
                checkedValue={selectedType.key}
                onChange={() => {
                  setSelectedType(option);
                  setShowFilter(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {enableAdd && (
        <Button variant="primary" showIcon={true} path={`/${selectedType.key}`}>
          Add {selectedType.label}
        </Button>
      )}
    </div>
  );
}
