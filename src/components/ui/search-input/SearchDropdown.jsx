'use client';
import styles from "./search-input.module.scss";

export default function SearchDropdown({
    results = [],
    loading = false,
    onSelect = () => { },
    renderItem = null,
    keyExtractor = (item) => item.id,
    emptyText = "No results found",
    loadingText = "Loading...",
}) {
    return (
        <div className={styles.dropdown}>
            {loading && <p className={styles.loading}>{loadingText}</p>}
            {!loading && results.length === 0 && (
                <p className={styles.noResult}>{emptyText}</p>
            )}
            {!loading &&
                results.map((item) => (
                    <div
                        key={keyExtractor(item)}
                        className={styles.dropdownItem}
                        onClick={() => onSelect(keyExtractor(item), item)}
                    >
                        {renderItem ? renderItem(item) : <span>{JSON.stringify(item)}</span>}
                    </div>
                ))}
        </div>
    );
}
