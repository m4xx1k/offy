export interface IPaginatedResult<T> {
  items: T[];
  total: number;
  metadata: {
    nextCursor: string | null; // ID останнього елемента для наступного запиту
    hasMore: boolean;
  };
}
