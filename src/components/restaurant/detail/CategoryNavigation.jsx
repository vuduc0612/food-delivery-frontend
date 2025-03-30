import React from 'react';
import { Container, Nav } from 'react-bootstrap';

const CategoryNavigation = ({ categories, activeCategory, onCategoryClick }) => {
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
      <Container>
        <Nav
          className="flex-nowrap overflow-auto hide-scrollbar"
          style={{
            whiteSpace: 'nowrap',
            margin: '0 -15px',
            position: 'relative'
          }}
        >
          {categories.map(category => (
            <Nav.Link
              key={category}
              onClick={() => onCategoryClick(category)}
              className={`category-tab py-3 px-4 text-dark border-0 position-relative ${activeCategory === category ? 'active' : ''
                }`}
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
      </Container>
    </div>
  );
};

export default CategoryNavigation; 