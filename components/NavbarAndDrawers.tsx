"use client";
import React from "react";
import Navbar from "./Navbar";
import MobileDrawer from "./MobileDrawer";
import SearchModal from "./SearchModal";

interface NavbarAndDrawersProps {
  setActiveCategory: (cat: string) => void;
  setActiveSubCategory: (subCat: string) => void;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  wishlist: number[];
  cartRef: React.RefObject<HTMLButtonElement | null>;
  setIsCartOpen: (open: boolean) => void;
  cart: any[];
  setIsAuthOpen: (open: boolean) => void;
  categoriesData: { [key: string]: any };
  isCategoryDropdownOpen: boolean;
  setIsCategoryDropdownOpen: (open: boolean) => void;
  hoveredCategory: string | null;
  setHoveredCategory: (cat: string | null) => void;
  activeCategory: string;
  activeSubCategory: string;
  expandedMobileCategory: string | null;
  setExpandedMobileCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function NavbarAndDrawers(props: NavbarAndDrawersProps) {
  // Safe Active SubCategory String Conversion
  const safeActiveSubCategory = Array.isArray(props.activeSubCategory)
    ? (props.activeSubCategory as string[]).join(" / ")
    : String(props.activeSubCategory || "All");

  const navbarProps = {
    ...props,
    activeSubCategory: safeActiveSubCategory,
  };

  return (
    <>
      <Navbar {...navbarProps} />
      <MobileDrawer {...props} />
      <SearchModal {...props} />
    </>
  );
}