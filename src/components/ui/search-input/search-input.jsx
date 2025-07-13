'use client';
import { useState, useEffect, useRef } from "react";
import styles from "./search-input.module.scss";
import Image from "next/image";
import Searchicon from "@icons/search-input.svg";
import SearchDropdown from "./SearchDropdown";
import UserIcon from "@icons/user.svg";
import { useRouter } from "next/navigation";

export default function SearchInput({
    placeholder = "Search...",
    fetchUrl,
    onSelect,
    redirect,
    redirectUrl,
    enableDropdown = true,
    onDataFetched,
    type = "customer",
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasInputFocus, setHasInputFocus] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm.trim());
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch logic
    useEffect(() => {
        const shouldFetch = (!enableDropdown) || (enableDropdown && hasInputFocus);
        if (!shouldFetch) return;

        const fetchResults = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${fetchUrl}?search=${encodeURIComponent(debouncedTerm)}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();
                const list = (data?.data?.[type] || []).sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setResults(list);
                if (onDataFetched) onDataFetched(list);
                if (enableDropdown) setShowDropdown(true);
            } catch (err) {
                console.error("Search fetch error:", err.message);
                setResults([]);
                if (enableDropdown) setShowDropdown(true);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedTerm, fetchUrl, enableDropdown, hasInputFocus]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const renderCustomerItem = (user) => (
        <>
            <div className={styles.profileIcon}>
                <div
                    className={`${styles.profile} ${user.status === "active"
                        ? styles.profileActive
                        : styles.profileInactive}`}
                >
                    <Image src={UserIcon} alt="User Icon" />
                </div>
            </div>
            <div className={styles.userInfo}>
                <p className={styles.userName}>{user.name}</p>
                <p className={styles.userPhone}>{user.mobile}</p>
                <p className={styles.userEmail}>{user.email}</p>
            </div>
        </>
    );

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
                    onFocus={() => setHasInputFocus(true)}
                    onBlur={() => setHasInputFocus(false)}
                />
            </div>

            {enableDropdown && showDropdown && (
                <SearchDropdown
                    results={results}
                    loading={loading}
                    onSelect={(id, item) => {
                        setShowDropdown(false);
                        redirect && router.push(`${redirectUrl}/${id}`);
                        if (onSelect) onSelect(id, item);
                    }}
                    renderItem={renderCustomerItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </div>
    );
}
