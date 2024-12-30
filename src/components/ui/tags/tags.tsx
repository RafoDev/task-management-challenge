import { useEffect, useRef, useState } from "react";
import { TaskTag } from "../../../types";
import { Tag } from "../tag/tag";
import styles from "./tags.module.scss";

type TagsType = {
  tags: TaskTag[];
  className?: string;
};

export const Tags = ({ tags, className }: TagsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleTags, setVisibleTags] = useState<TaskTag[]>(tags);
  const [hiddenCount, setHiddenCount] = useState(0);

  const calculateVisibleTags = () => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    let currentWidth = 0;
    let visibleCount = 0;

    setVisibleTags(tags);
    setHiddenCount(0);

    requestAnimationFrame(() => {
      tagsRefs.current = tagsRefs.current.slice(0, tags.length);

      for (let i = 0; i < tagsRefs.current.length; i++) {
        const tagElement = tagsRefs.current[i];
        if (!tagElement) continue;

        const tagWidth = tagElement.offsetWidth;
        const totalTagWidth = tagWidth + 8;

        const needsIndicator = i < tags.length - 1;
        const indicatorWidth = needsIndicator ? 50 : 0;

        if (currentWidth + totalTagWidth + indicatorWidth <= containerWidth) {
          currentWidth += totalTagWidth;
          visibleCount++;
        } else {
          const newVisibleTags = tags.slice(0, visibleCount);
          const newHiddenCount = tags.length - visibleCount;

          setVisibleTags(newVisibleTags);
          setHiddenCount(newHiddenCount);
          break;
        }
      }
    });
  };

  useEffect(() => {
    calculateVisibleTags();

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleTags();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [tags]);

  const hiddenMeasureContainer = (
    <div className={styles.measurementContainer}>
      {tags.map((tag, index) => (
        <div
          key={`measure-${tag}`}
          ref={(el) => (tagsRefs.current[index] = el)}
          className={styles.tagMeasurementContainer}
        >
          <Tag style={tag}>
            <span className="body-m-bold">{tag}</span>
          </Tag>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {hiddenMeasureContainer}
      <div ref={containerRef} className={`${styles.container} ${className}`}>
        {visibleTags.map((tag) => (
          <Tag key={tag} style={tag}>
            <span className="body-m-bold">{tag}</span>
          </Tag>
        ))}
        {hiddenCount > 0 && (
          <Tag style="neutral">
            <span className="body-m-bold">+{hiddenCount}</span>
          </Tag>
        )}
      </div>
    </>
  );
};
