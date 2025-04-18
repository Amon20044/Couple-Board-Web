export type MediaItem = {
    id: string;
    album_id: string;
    media_url: string;
    media_type: string;
    uploaded_at: string;
  };
  
  export type GroupedMedia = {
    [key: string]: MediaItem[];
  };
  
  const groupMediaByMonthYear = (media: MediaItem[]): GroupedMedia => {
    const grouped: GroupedMedia = media.reduce((acc: GroupedMedia, item: MediaItem) => {
      const date = new Date(item.uploaded_at);
      const monthYear = date.toLocaleString("en-US", { month: "long", year: "numeric" });
  
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(item);
      return acc;
    }, {});
  
    // Sort the grouped keys chronologically
    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  
    // Create a new sorted object
    const sortedGrouped: GroupedMedia = {};
    for (const key of sortedKeys) {
      sortedGrouped[key] = grouped[key].sort(
        (a, b) => new Date(a.uploaded_at).getTime() - new Date(b.uploaded_at).getTime()
      );
    }
  
    return sortedGrouped;
  };
  
  export { groupMediaByMonthYear };
  