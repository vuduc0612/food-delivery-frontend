import { useEffect } from 'react';

const useCategoryObserver = (categories, setActiveCategory) => {
  useEffect(() => {
    let currentSection = null;
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        // Lưu section đang trong viewport
        if (entry.isIntersecting) {
          const categoryId = entry.target.id;
          const category = categoryId.replace('category-', '');
          
          // Kiểm tra vị trí của section
          const rect = entry.target.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
          
          // Nếu section này hiển thị nhiều hơn section hiện tại
          if (!currentSection || entry.intersectionRatio > currentSection.ratio) {
            currentSection = {
              category,
              ratio: entry.intersectionRatio,
              visibleHeight
            };
          }
        }
      });

      // Cập nhật active category nếu có section mới
      if (currentSection) {
        setActiveCategory(currentSection.category);
        currentSection = null;
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-140px 0px -50% 0px', // Điều chỉnh vùng quan sát
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] // Theo dõi nhiều ngưỡng hơn
    });

    categories.forEach(category => {
      const element = document.getElementById(`category-${category}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories, setActiveCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    const element = document.getElementById(`category-${category}`);
    if (element) {
      const headerOffset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return { handleCategoryClick };
};

export default useCategoryObserver; 