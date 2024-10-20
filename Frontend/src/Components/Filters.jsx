import React, { useState, useEffect, useRef } from "react";
import { X, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Filters = ({ props, onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    minPrice: "",
    maxPrice: "",
    sqft: "",
    search: "",
    type: "",
  });
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterRef = useRef(null);
  const appliedFiltersRef = useRef(null);

  const locations = [...new Set(props.map((item) => item.location))];
  const bhkOptions = [...new Set(props.map((item) => item.bhk))].sort(
    (a, b) => a - b
  );
  const maxPriceValue = Math.max(...props.map((item) => item.price));
  const sqftOptions = ["0-500", "501-1000", "1001-1500", "1501-2000", "2000+"];
  const typeOptions = [...new Set(props.map((item) => item.type))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const newFilters = Object.entries(filters)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => ({ key, value }));
    setAppliedFilters(newFilters);
    onFilterChange(filters);
  };

  const removeFilter = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: "" }));
    setAppliedFilters((prev) =>
      prev.filter((filter) => filter.key !== filterKey)
    );

    // Animate remaining filters
    gsap.to(appliedFiltersRef.current.children, {
      opacity: 0.5,
      scale: 0.95,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(appliedFiltersRef.current.children, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
      },
    });
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);

  useGSAP(() => {
    if (isFilterOpen && window.innerWidth < 768) {
      gsap.from(filterRef.current.children, {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isFilterOpen]);

  useGSAP(() => {
    if (appliedFiltersRef.current) {
      gsap.from(appliedFiltersRef.current.children, {
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [appliedFilters]);

  return (
    <div className="p-6 rounded-lg mb-6">
      <h2 className="text-2xl text-center font-['Onest',sans-serif] font-bold mb-6 text-red-500">
        Find Your Perfect Property
      </h2>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or address"
            className="w-full p-2 pl-10 border rounded-md"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="md:hidden p-2 bg-red-500 text-white rounded-md"
        >
          <Filter size={20} />
        </button>
      </div>
      <div className="md:block hidden">
        <div
          ref={filterRef}
          className="flex flex-wrap flex-col md:flex-row gap-4 mb-4 overflow-hidden"
        >
          <div>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-full md:w-auto"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="bhk"
              value={filters.bhk}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-full md:w-auto"
            >
              <option value="">Select BHK</option>
              {bhkOptions.map((bhk) => (
                <option key={bhk} value={bhk}>
                  {bhk} BHK
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="sqft"
              value={filters.sqft}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-full md:w-auto"
            >
              <option value="">Select Sq.ft</option>
              {sqftOptions.map((sqft) => (
                <option key={sqft} value={sqft}>
                  {sqft} sq.ft
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="p-2 border rounded-md w-full md:w-auto"
            >
              <option value="">Select Type</option>
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min Price"
              className="w-24 p-2 border rounded-md"
            />
            <span>-</span>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max Price"
              className="w-24 p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            ref={filterRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="md:hidden flex flex-col gap-4 mb-4 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="">Select Location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <select
                name="bhk"
                value={filters.bhk}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="">Select BHK</option>
                {bhkOptions.map((bhk) => (
                  <option key={bhk} value={bhk}>
                    {bhk} BHK
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <select
                name="sqft"
                value={filters.sqft}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="">Select Sq.ft</option>
                {sqftOptions.map((sqft) => (
                  <option key={sqft} value={sqft}>
                    {sqft} sq.ft
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="p-2 border rounded-md w-full"
              >
                <option value="">Select Type</option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="w-full p-2 border rounded-md"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {appliedFilters.length > 0 && (
          <motion.div
            ref={appliedFiltersRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {appliedFilters.map((filter) => (
              <span
                key={filter.key}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center shadow-sm"
              >
                {filter.key}: {filter.value}
                <button
                  onClick={() => removeFilter(filter.key)}
                  className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <X size={16} />
                </button>
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
