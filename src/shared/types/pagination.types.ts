export interface IPaginatedResult<T> {
  items: T[];
  metadata: {
    nextCursor: string | null; // ID останнього елемента для наступного запиту
    hasMore: boolean;
  };
}
