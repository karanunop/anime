"use client";
import { useRouter } from "next/navigation";
import type { SearchableReview } from '@/lib/review';

import {
  Combobox,
} from "@headlessui/react";
import { useState } from "react";

export interface SearchBoxProps {
  reviews: SearchableReview[];
}

export default function SearchBox({ reviews }: any) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const filtered = reviews.filter((review:any) =>
        review.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    const handleChange = (review: SearchableReview) => {
      router.push(`/reviews/${review.slug}`);
    };

    return (
        <div className="relative w-48">
            <Combobox onChange={handleChange}>
                <Combobox.Input placeholder="Search…"
                    value={query} onChange={(event) => setQuery(event.target.value)}
                    className="border px-2 py-1 rounded w-full"
                />
                <Combobox.Options className="absolute bg-white py-1 w-full">
                    {filtered.map((review:any) => (
                        <Combobox.Option key={review.slug} value={review}>
                            {({ active }) => (
                                <span className={`block px-2 truncate w-full ${active ? 'bg-orange-100' : ''
                                    }`}>
                                    {review.title}
                                </span>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    );
}
