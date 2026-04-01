"use client";

import { ChevronDown, ChevronUp, Mail, MessageCircle, X } from "lucide-react";
import Link from "next/link";

const categoriesList = [
    "Fashion and Apparel",
    "Electronics",
    "Home and Living",
    "Beauty and Personal Care",
    "Sports and Fitness",
    "Toys, Kids and Baby",
    "Automotive",
    "Books and Stationery",
    "Office Supplies",
    "Pet Supplies",
    "Gifts and Lifestyle",
];

export default function BusinessStep({
    form,
    setForm,
    selectedCategories,
    setSelectedCategories,
    categoryOpen,
    setCategoryOpen,
    customCategory,
    setCustomCategory,
    selectedCountry
}: any) {

    const handleCategorySelect = (cat: string) => {
        if (selectedCategories.includes(cat)) {
            setSelectedCategories(
                selectedCategories.filter((c: string) => c !== cat)
            );
        } else {
            if (selectedCategories.length >= 5) return;
            setSelectedCategories([...selectedCategories, cat]);
        }
    };

    const handleCustomCategory = () => {
        if (!customCategory.trim()) return;
        if (selectedCategories.length >= 5) return;

        setSelectedCategories([
            ...selectedCategories,
            customCategory.trim(),
        ]);
        setCustomCategory("");
    };

    return (
        <div className="space-y-4">

            {/* Business Name */}
            <input
                placeholder="Business name"
                className="w-full p-3 rounded-lg border border-[var(--border-muted)] outline-none focus:border-[var(--primary)]"
                value={form.businessName}
                onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                }
            />

            {/* Category Dropdown */}
            <div className="relative">

                {/* Trigger */}
                <button
                    type="button"
                    onClick={() => setCategoryOpen(!categoryOpen)}
                    className="w-full min-h-[50px] px-3 py-2 rounded-lg border border-[var(--border-muted)] bg-white flex items-center justify-between"
                >
                    <div className="flex flex-wrap gap-2 flex-1">

                        {selectedCategories.length > 0 ? (
                            selectedCategories.map((cat: string) => (
                                <span
                                    key={cat}
                                    className="flex items-center gap-1 px-2 py-1 text-xs rounded-full border border-[var(--border-muted)] bg-[var(--primary-light)] text-[var(--primary)]"
                                >
                                    {cat}

                                    {/* Remove */}
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCategories((prev: any) =>
                                                prev.filter((c: string) => c !== cat)
                                            );
                                        }}
                                        className="ml-1 cursor-pointer"
                                    >
                                        <X size={12} className="text-[var(--text-muted)]" />
                                    </span>
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-[var(--text-muted)]">
                                Select categories you wish to sell
                            </span>
                        )}

                    </div>

                    {/* Arrow */}
                    {categoryOpen ? (
                        <ChevronUp size={16} className="text-[var(--text-muted)]" />
                    ) : (
                        <ChevronDown size={16} className="text-[var(--text-muted)]" />
                    )}
                </button>

                {/* Dropdown */}
                {categoryOpen && (
                    <div className="absolute z-50 mt-1 w-full bg-white border border-[var(--border-muted)] rounded-lg shadow-md max-h-50 overflow-y-auto p-2">

                        {/* Static Categories */}
                        {categoriesList.map((cat) => (
                            <div
                                key={cat}
                                onClick={() => handleCategorySelect(cat)}
                                className={`px-3 py-2 rounded-md text-sm cursor-pointer flex justify-between items-center
                  ${selectedCategories.includes(cat)
                                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                                        : "hover:bg-gray-100"
                                    }
                `}
                            >
                                {cat}
                            </div>
                        ))}

                        {/* Divider */}
                        <div className="h-px bg-gray-200 my-2" />

                        {/* Custom Category */}
                        <div className="px-2 pb-2">
                            <p className="text-xs text-[var(--text-muted)] mb-1">
                                Didn’t find your category?
                            </p>

                            <div className="flex gap-2">
                                <input
                                    value={customCategory}
                                    onChange={(e) => setCustomCategory(e.target.value)}
                                    placeholder="Type here..."
                                    className="flex-1 p-2 text-sm border rounded-md outline-none focus:border-[var(--primary)]"
                                />
                                <button
                                    type="button"
                                    onClick={handleCustomCategory}
                                    className="px-3 text-sm rounded-md text-white"
                                    style={{ backgroundColor: "var(--primary)" }}
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Submit */}
            <button
                className="w-full mt-4 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: "var(--primary)" }}
            >
                Sign up
            </button>

            {/* terms and privacy text */}
            <p className="text-xs text-[var(--text-muted)] text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="text-[var(--primary)] hover:underline">
                    Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[var(--primary)] hover:underline">
                    Privacy Policy
                </Link>.
            </p>

        </div >
    );
}