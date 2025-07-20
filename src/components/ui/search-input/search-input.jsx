'use client';
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./search-input.module.scss";
import Image from "next/image";
import Searchicon from "@icons/search-input.svg";
import SearchDropdown from "./SearchDropdown";
import { useRouter } from "next/navigation";
import Profile from "../profile/profile";

export default function SearchInput({
    placeholder = "Search...",
    fetchUrl,
    onSelect,
    redirect,
    redirectUrl,
    fetchOnFocus = true,
    enableDropdown = true,
    onDataFetched,
    onError,
    debounceDelay = 300,
    minSearchLength = 1,
    allowEmptySearch = false,
    type = "customer",
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm.trim());
        }, debounceDelay);
        return () => clearTimeout(timer);
    }, [searchTerm, debounceDelay]);

    // Fetch logic
    useEffect(() => {
        const shouldFetch =
            (!fetchOnFocus) || (fetchOnFocus && showDropdown);

        const isTooShort = !allowEmptySearch && debouncedTerm.length < minSearchLength;

        if (!shouldFetch || isTooShort) return;

        const controller = new AbortController();

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${fetchUrl}?search=${encodeURIComponent(debouncedTerm)}`,
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                const list = (data?.data?.[type] || []).sort((a, b) => {
                    if (!a?.name || !b?.name) return 0;
                    return a.name.localeCompare(b.name);
                });
                setResults(list);
                onDataFetched?.(list);
                if (enableDropdown) setShowDropdown(true);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Search fetch error:", err.message);
                    onError?.(err);
                    setResults([]);
                    if (enableDropdown) setShowDropdown(true);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
        return () => controller.abort();
    }, [debouncedTerm, fetchUrl, fetchOnFocus, showDropdown, enableDropdown, type, minSearchLength, allowEmptySearch]);

    // Outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Dropdown trigger on input focus
    const handleInputFocus = () => {
        if (fetchOnFocus) {
            setShowDropdown(true);
        }
    };

    const renderCustomerItem = useCallback((user) => (
        <>
            <Profile variant="profileIcon" />
            <div className={styles.userInfo}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userPhone}>{user.mobile}</p>
                <p className={styles.userEmail}>{user.email}</p>
            </div>
        </>
    ), []);
    const renderInvestmentItem = useCallback((investment) => (
        <>
            <Profile variant="profileText"
                profileText={investment.scheme_code} />
            <div className={styles.userInfo}>
                <p className={styles.userName}>{investment.investment_acc_no}</p>
                <p className={styles.userPhone}>{investment.scheme_name}</p>
                <p className={styles.userEmail}>{investment.investment_status}</p>
            </div>
        </>
    ), []);
    let renderItem = {
        customer: renderCustomerItem,
        investment:renderInvestmentItem
    }
    // const renderCustomerItem = useCallback((user) => (
    //     <>
    //         <div className={styles.profileIcon}>
    //             <div
    //                 className={`${styles.profile} ${user.status === "active"
    //                     ? styles.profileActive
    //                     : styles.profileInactive}`}
    //             >
    //                 <Image src={UserIcon} alt="User Icon" />
    //             </div>
    //         </div>
    //         <div className={styles.userInfo}>
    //             <p className={styles.userName}>{user.name}</p>
    //             <p className={styles.userPhone}>{user.mobile}</p>
    //             <p className={styles.userEmail}>{user.email}</p>
    //         </div>
    //     </>
    // ), []);

    return (
        <div ref={wrapperRef} className={styles["search-wrapper"]}>
            <div className={styles["input_search"]}>
                <Image src={Searchicon} alt="Search Icon" className={styles["searchicon"]} />
                <input
                    className={styles["input"]}
                    type="search"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleInputFocus}
                />
            </div>

            {enableDropdown && showDropdown && (
                <SearchDropdown
                    results={results}
                    loading={loading}
                    onSelect={(id, item) => {
                        setShowDropdown(false);
                        if (redirect && redirectUrl) {
                            router.push(`${redirectUrl}/${id}`);
                        }
                        onSelect?.(id, item);
                    }}
                    renderItem={renderItem[type]}
                    keyExtractor={(item) => item.id}
                    noResultsMessage="No results found"
                />
            )}
        </div>
    );
}
