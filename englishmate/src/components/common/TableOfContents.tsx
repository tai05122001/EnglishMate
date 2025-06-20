import React, { useCallback, useState, useEffect } from "react";

interface TableItem {
  id: string;
  title: string;
  number: number;
}

interface TableOfContentsProps {
  items: TableItem[];
  className?: string;
  onItemClick?: () => void; // Optional callback for mobile view
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className = "",
  onItemClick,
}) => {
  const [activeId, setActiveId] = useState<string>("");

  // Hàm tính toán offset dựa trên kích thước màn hình
  const calculateOffset = useCallback(() => {
    const width = window.innerWidth;

    if (width < 768) {
      return 120; // Mobile
    } else if (width >= 768 && width < 1024) {
      return 110; // Tablet và màn hình trung bình
    } else {
      return 96; // Desktop
    }
  }, []);

  const handleScrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const isMoblie = window.innerWidth < 1024;
      e.preventDefault();
      const element = document.getElementById(id);
      const offset = calculateOffset();
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset - (isMoblie ? 334 : 0),
          behavior: "smooth",
        });

        setActiveId(id);

        if (onItemClick) {
          setTimeout(() => {
            onItemClick();
          }, 300);
        }
      }
    },
    [onItemClick, calculateOffset]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = calculateOffset() + 24; // Thêm một chút offset cho việc xác định phần tử hiện tại
      const scrollPosition = window.scrollY + scrollOffset;

      let currentActiveId = "";

      // Kiểm tra nếu người dùng đã cuộn đến cuối trang
      // Nếu scrollY + innerHeight đủ gần với document.body.scrollHeight (trong 1px), kích hoạt mục cuối cùng
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;

      if (isAtBottom && items.length > 0) {
        currentActiveId = items[items.length - 1].id;
      } else {
        for (let i = items.length - 1; i >= 0; i--) {
          const item = items[i];
          const element = document.getElementById(item.id);

          if (element) {
            const { offsetTop } = element;

            if (scrollPosition >= offsetTop) {
              currentActiveId = item.id;
              break;
            }
          }
        }
      }

      if (currentActiveId && currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [items, activeId, calculateOffset]);

  return (
    <div className={`${className}`}>
      <h2 className="text-lg font-medium text-black mb-4 md:mb-6">
        Table of Contents
      </h2>
      <nav className="space-y-4 md:space-y-6">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleScrollToSection(e, item.id)}
            className={`
              block text-sm relative pl-4 transition-all duration-300 
            ${
              activeId === item.id
                ? "text-teal-500 font-medium"
                : "text-[#525252] hover:text-black"
            }
            `}
          >
            {item.number}. {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
