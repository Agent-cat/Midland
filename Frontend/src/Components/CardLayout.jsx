import React, { useState, useEffect, useRef } from "react";

import Card from "./Card";
import Filters from "./Filters";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LoaderCircle } from "lucide-react";

const CardLayout = ({ initialProperties }) => {
  const [filteredProperties, setFilteredProperties] =
    useState(initialProperties);
  const [isFiltering, setIsFiltering] = useState(false);
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    setFilteredProperties(initialProperties);
  }, [initialProperties]);

  useEffect(() => {
    initialProperties.forEach((property) => {
      property.images.forEach((imageUrl) => {
        const img = new Image();

        img.src = imageUrl;
      });
    });
  }, [initialProperties]);

  const applyFilters = (filters) => {
    setIsFiltering(true);
    let result = initialProperties;

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (property) =>
          property.name.toLowerCase().includes(searchTerm) ||
          property.address.toLowerCase().includes(searchTerm) ||
          property.location.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.location) {
      result = result.filter(
        (property) => property.location === filters.location
      );
    }

    if (filters.bhk) {
      result = result.filter(
        (property) => property.bhk === parseInt(filters.bhk)
      );
    }

    if (filters.minPrice) {
      result = result.filter(
        (property) => property.price >= parseInt(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      result = result.filter(
        (property) => property.price <= parseInt(filters.maxPrice)
      );
    }

    if (filters.sqft) {
      const [min, max] = filters.sqft.split("-").map(Number);
      result = result.filter((property) => {
        const propertySqft = parseInt(property.sqft);
        if (max) {
          return propertySqft >= min && propertySqft <= max;
        } else {
          return propertySqft >= min;
        }
      });
    }

    if (filters.type) {
      result = result.filter((property) => property.type === filters.type);
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setFilteredProperties(result);
        setIsFiltering(false);
      },
    });
  };

  useGSAP(() => {
    if (!isFiltering) {
      gsap.to(containerRef.current, { opacity: 1, duration: 0.5 });
      cardRefs.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: "power2.out",
            }
          );
        }
      });
    } else {
      gsap.to(loaderRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "linear",
      });
    }
  }, [isFiltering, filteredProperties]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filteredProperties.length);
  }, [filteredProperties]);

  return (
    <>
      <div className="filter-container">
        <Filters props={initialProperties} onFilterChange={applyFilters} />
      </div>
      {!isFiltering && (
        <div
          ref={containerRef}
          className="grid grid-cols-1  cursor-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
        >
          {filteredProperties.map((property, index) => (
            <div
              key={property.id}
              className="card-item w-full"
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <Card props={property} />
            </div>
          ))}
        </div>
      )}
      {isFiltering && (
        <div className="flex justify-center items-center h-64">
          <div ref={loaderRef} className="text-red-500">
            <LoaderCircle size={50} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardLayout;
