import React, { useRef } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryNavigation = ({ categories, activeCategory, onCategoryClick }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="bg-white border-bottom sticky-top"
      style={{
        zIndex: 1020,
        top: '80px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
        backgroundColor: '#fff'
      }}
    >
      <Container className="position-relative">
        {/* Nút điều hướng trái */}
        <button
          onClick={() => scroll('left')}
          className="btn position-absolute start-0 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            left: '-10px'
          }}
        >
          <FaChevronLeft />
        </button>

        <Nav
          ref={scrollContainerRef}
          className="flex-nowrap overflow-auto hide-scrollbar"
          style={{
            whiteSpace: 'nowrap',
            margin: '0 15px',
            position: 'relative',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map(category => (
            <Nav.Link
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`category-tab py-3 px-4 text-dark border-0 position-relative ${activeCategory === category ? 'active' : ''}`}
              style={{
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: activeCategory === category ? '600' : '400',
                transition: 'all 0.2s ease',
                color: activeCategory === category ? '#1db954' : '#2d3436',
                backgroundColor: 'transparent'
              }}
            >
              {category}
              {activeCategory === category && (
                <div
                  className="position-absolute bottom-0 start-0 w-100"
                  style={{
                    height: '3px',
                    backgroundColor: '#7ed6df',
                    transition: 'all 0.3s ease',
                    transform: 'scaleX(0.8)',
                    opacity: '1'
                  }}
                />
              )}
            </Nav.Link>
          ))}
        </Nav>

        {/* Nút điều hướng phải */}
        <button
          onClick={() => scroll('right')}
          className="btn position-absolute end-0 top-50 translate-middle-y"
          style={{
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            right: '-10px'
          }}
        >
          <FaChevronRight />
        </button>
      </Container>
    </div>
  );
};

export default CategoryNavigation; 