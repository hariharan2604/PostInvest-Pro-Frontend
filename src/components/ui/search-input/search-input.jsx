"use client";
import { useState, useEffect } from "react";
import styles from "./search-input.module.scss";
import Image from "next/image";
import Searchicon from "@icons/search-input.svg";
import UserIcon from "@icons/user.svg";

export default function SearchInput({
    placeholder = "Search...",
    fetchUrl,
    onSelect,
    enableDropdown = true,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedTerm, setDebouncedTerm] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const getQueryParam = (value) => {
        const trimmed = value.trim();
        if (/^\d+$/.test(trimmed)) return { key: "mobile", value: trimmed };
        if (/@/.test(trimmed)) return { key: "email", value: trimmed };
        return { key: "name", value: trimmed };
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(searchTerm.trim());
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        if (!debouncedTerm) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const fetchResults = async () => {
            setLoading(true);
            try {
                const { key, value } = getQueryParam(debouncedTerm);
                const res = await fetch(`${fetchUrl}?${key}=${encodeURIComponent(value)}`);
                if (!res.ok) throw new Error("Failed to fetch");
                const data = await res.json();

                const customers = data?.data?.customers || [];
                setResults(customers);
                setShowDropdown(true);
            } catch (err) {
                console.error("Search fetch error:", err.message);
                setResults([]);
                setShowDropdown(true);
            } finally {
                setLoading(false);
            }
        };

        if (enableDropdown) {
            fetchResults();
        }
    }, [debouncedTerm, fetchUrl, enableDropdown]);

    return (
        <div className={styles["search-wrapper"]}>
            <div className={styles["input_search"]}>
                <Image src={Searchicon} alt="Search Icon" className={styles["searchicon"]} />
                <input
                    className={styles["input"]}
                    type="search"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {enableDropdown && showDropdown && (
                <div className={styles["dropdown"]}>
                    {loading && <p className={styles["loading"]}>Loading...</p>}
                    {!loading && results.length === 0 && (
                        <p className={styles["noResult"]}>No results found</p>
                    )}

                    {!loading &&
                        results.map((user) => (
                            <div
                                key={user.id}
                                className={styles["dropdownItem"]}
                                onClick={() => {
                                    // setSearchTerm("");
                                    setShowDropdown(false);
                                    onSelect(user.id);
                                }}
                            >
                                <div className={styles["profileIcon"]}>
                                    <div
                                        className={`${styles["profile"]} ${user.status === "active"
                                                ? styles["profileActive"]
                                                : styles["profileInactive"]
                                            }`}
                                    >
                                        <Image src={UserIcon} alt="User Icon" />
                                    </div>
                                </div>
                                <div className={styles["userInfo"]}>
                                    <p className={styles["userName"]}>{user.name}</p>
                                    <p className={styles["userPhone"]}>{user.mobile}</p>
                                    <p className={styles["userEmail"]}>{user.email}</p>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}
